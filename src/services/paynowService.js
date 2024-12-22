import { toast } from 'react-toastify';
import { processPaynowNotification, handlePaynowReturn } from './paynowNotificationService';
import { getFirestore, collection, addDoc, doc, onSnapshot } from 'firebase/firestore';

// Paynow configuration
const MERCHANT_ID = import.meta.env.VITE_PAYNOW_INTEGRATION_ID;
const INTEGRATION_KEY = import.meta.env.VITE_PAYNOW_INTEGRATION_KEY;
const RETURN_URL = import.meta.env.VITE_PAYNOW_RETURN_URL;
const RESULT_URL = import.meta.env.VITE_PAYNOW_RESULT_URL;
const NOTIFICATION_URL = 'https://www.zunzorunningclub.com/paynow/notification';

export const initializePaynowTransaction = async (cart, userEmail, user) => {
  try {
    // Calculate total
    const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Generate transaction reference
    const transactionRef = `ZunzoOrder_${Date.now()}`;

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
    const ordersCollection = collection(db, 'orders');

    // Calculate total
    const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Prepare order data
    const orderData = {
      userId: user.uid,
      transactionReference: transactionRef,
      items: cart.items,
      total: total,
      status: 'Pending', // Initial status
      paymentMethod: 'Paynow',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add order to Firestore
    const orderRef = await addDoc(ordersCollection, orderData);

    return {
      success: true,
      orderId: orderRef.id,
      transactionReference: transactionRef
    };
  } catch (error) {
    console.error('Error creating pending order:', error);
    toast.error('Failed to create order');
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

// Expose notification and return handlers for backend integration
export { 
  processPaynowNotification, 
  handlePaynowReturn 
};
