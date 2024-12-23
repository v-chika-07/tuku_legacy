import { toast } from 'react-toastify';
import { processPaynowNotification, handlePaynowReturn } from './paynowNotificationService';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  limit, 
  updateDoc 
} from 'firebase/firestore';

// Paynow configuration
const MERCHANT_ID = import.meta.env.VITE_PAYNOW_INTEGRATION_ID;
const INTEGRATION_KEY = import.meta.env.VITE_PAYNOW_INTEGRATION_KEY;
const RETURN_URL = import.meta.env.VITE_PAYNOW_RETURN_URL;
const RESULT_URL = import.meta.env.VITE_PAYNOW_RESULT_URL;
const NOTIFICATION_URL = 'https://www.zunzorunningclub.com/paynow/notification';

export const initializePaynowTransaction = async (cart, userEmail, user) => {
  try {
    // Calculate total (now using direct cart array)
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Generate transaction reference
    const transactionRef = `T_legacy_${Date.now()}`;

    // Create pending order first
    const pendingOrderResult = await createPendingPaynowOrder(cart, user, transactionRef);
    
    if (!pendingOrderResult.success) {
      throw new Error('Failed to create pending order');
    }

    // Construct Paynow payment link parameters
    const paymentParams = new URLSearchParams({
      id: MERCHANT_ID,
      amount: total.toFixed(2),
      amount_quantity: '0.00',
      l: '1' // Likely a language or additional parameter
    });

    // Generate Paynow payment link
    const paynowPaymentLink = `https://www.paynow.co.zw/Payment/BillPaymentLink/?q=${btoa(paymentParams.toString())}`;

    return {
      success: true,
      url: paynowPaymentLink,
      orderId: pendingOrderResult.orderId,
      transactionReference: transactionRef
    };
  } catch (error) {
    console.error('Paynow Transaction Initialization Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const createPendingPaynowOrder = async (cart, user, transactionRef) => {
  try {
    const db = getFirestore();
    const ordersRef = collection(db, 'orders');

    // Create order document
    const orderData = {
      userId: user.uid,
      userEmail: user.email,
      transactionReference: transactionRef,
      items: cart, // Now directly using cart array
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'Pending',
      createdAt: new Date().toISOString(),
      paymentMethod: 'Paynow',
      paymentStatus: 'Pending'
    };

    // Add order to Firestore
    const orderDocRef = await addDoc(ordersRef, orderData);

    return {
      success: true,
      orderId: orderDocRef.id
    };
  } catch (error) {
    console.error('Create Pending Paynow Order Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const listenToOrderStatus = (orderId, callback) => {
  const db = getFirestore();
  const orderRef = doc(db, 'orders', orderId);

  // Set up real-time listener
  const unsubscribe = onSnapshot(orderRef, (doc) => {
    if (doc.exists()) {
      const orderData = doc.data();
      
      // Trigger callback with order status
      callback({
        status: orderData.status,
        transactionReference: orderData.transactionReference
      });

      // Automatically unsubscribe if order is in final state
      if (['Paid', 'Failed'].includes(orderData.status)) {
        unsubscribe();
      }
    }
  }, (error) => {
    console.error('Error listening to order status:', error);
    toast.error('Error tracking order status');
    callback({ status: 'Error', error: error.message });
  });

  return unsubscribe;
};

export const listenForPaynowTransaction = (userEmail, orderId, callback) => {
  const db = getFirestore();
  const paynowTransactionsRef = collection(db, 'paynow_transactions');
  
  // Create a query to listen for new documents matching user email
  const q = query(
    paynowTransactionsRef, 
    where('customer_email', '==', userEmail),
    limit(1)
  );

  // Set up real-time listener
  const unsubscribe = onSnapshot(q, async (snapshot) => {
    if (!snapshot.empty) {
      const transactionDoc = snapshot.docs[0];
      const transactionData = transactionDoc.data();

      try {
        // Update the order document's payment status
        const db = getFirestore();
        const orderRef = doc(db, 'orders', orderId);
        
        await updateDoc(orderRef, {
          paymentStatus: 'Paid',
          paidAt: new Date().toISOString()
        });

        // Call callback to handle UI updates
        callback({
          success: true,
          transactionData: transactionData
        });

        // Unsubscribe after successful processing
        unsubscribe();
      } catch (error) {
        console.error('Error updating order status:', error);
        callback({
          success: false,
          error: error.message
        });
      }
    }
  }, (error) => {
    console.error('Error listening to PayNow transactions:', error);
    callback({
      success: false,
      error: error.message
    });
  });

  return unsubscribe;
};
