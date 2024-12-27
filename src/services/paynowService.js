import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  updateDoc,
  getDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  addDoc
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { processPaynowNotification, handlePaynowReturn } from './paynowNotificationService';
import { sendRegistrationEmail } from './emailService';

// Paynow configuration
const MERCHANT_ID = '19725';
const INTEGRATION_KEY = '4fe1bd4a-c9f7-4f62-a90a-0a16d32debab';
const RETURN_URL = 'https://example.com/paynow/return';
const RESULT_URL = 'https://example.com/paynow/result';
const NOTIFICATION_URL = 'https://www.zunzorunningclub.com/paynow/notification';

export const initializePaynowTransaction = async (cart, userEmail, user, transactionType = 'default') => {
  try {
    // Calculate total (now using direct cart array)
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Generate transaction reference
    const transactionRef = `T_legacy_${Date.now()}`;

    // For cart transactions, create a pending order
    let pendingOrderId = null;
    if (transactionType === 'default') {
      const db = getFirestore();
      const ordersRef = collection(db, 'orders');
      const pendingOrderRef = await addDoc(ordersRef, {
        userId: user.uid,
        userEmail: userEmail,
        updatedAt: new Date().toISOString(),
        items: cart,
        total: total,
        status: 'Pending',
        paymentStatus: 'Pending',
        transactionReference: transactionRef,
        createdAt: new Date().toISOString()
      });
      pendingOrderId = pendingOrderRef.id;
    }

    // Construct Paynow payment link parameters
    const paymentParams = new URLSearchParams({
      id: MERCHANT_ID,
      amount: total.toFixed(2),
      amount_quantity: '0.00',
      l: '1', // Likely a language or additional parameter
      reference: transactionRef, // Add transaction reference
      returnurl: RETURN_URL, // Add return URL
      resulturl: RESULT_URL, // Add result URL
      status: 'pending', // Add initial status
      authemail: userEmail // Add customer email
    });

    // Generate Paynow payment link
    console.log(`Generating Paynow payment link for transaction reference ${transactionRef} and user ${userEmail}...`);
    const paynowPaymentLink = `https://www.paynow.co.zw/Payment/BillPaymentLink/?q=${btoa(paymentParams.toString())}`;
    console.log(`Generated Paynow payment link: ${paynowPaymentLink}`);

    return {
      success: true,
      url: paynowPaymentLink,
      orderId: transactionRef,
      pendingOrderId: pendingOrderId,
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

export const listenForPaynowTransaction = async (
  userEmail, 
  orderId, 
  callback,
  transactionType = 'default',  
  additionalData = null  
) => {
  const db = getFirestore();
  const paynowTransactionsRef = collection(db, 'paynow_transactions');
  
  // First, collect existing document IDs
  const existingDocsQuery = query(
    paynowTransactionsRef, 
    where('customer_email', '==', userEmail)
  );

  // Set up real-time listener
  const unsubscribe = onSnapshot(existingDocsQuery, async (existingSnapshot) => {
    // Collect IDs of existing documents
    const existingDocIds = existingSnapshot.docs.map(doc => doc.id);

    // Create a new query to listen for new documents
    const newDocsQuery = query(
      paynowTransactionsRef, 
      where('customer_email', '==', userEmail)
    );

    // Set up listener for new documents
    const newDocsUnsubscribe = onSnapshot(newDocsQuery, async (newSnapshot) => {
      // Find documents that are not in the existing set
      const newDocs = newSnapshot.docs.filter(doc => 
        !existingDocIds.includes(doc.id)
      );

      if (newDocs.length > 0) {
        try {
          // Take the first new document
          const newTransactionDoc = newDocs[0];
          const transactionData = newTransactionDoc.data();

          // Extract paynow_reference directly from the transaction document
          const paynowReference = transactionData.paynow_reference;
          if (!paynowReference) {
            console.error('Paynow reference is missing from the transaction document');
            return;
          }

          // Handle different transaction types
          switch(transactionType) {
            case 'registration':
              // Ensure registration data is available
              if (!additionalData?.registrationData) {
                console.error('No registration data found');
                callback({
                  success: false,
                  error: 'No registration data available'
                });
                return;
              }

              // Create the registration document with the paynow_reference
              const registrationsRef = collection(db, 'event_registrations');
              const registrationDocRef = await addDoc(registrationsRef, {
                ...additionalData.registrationData,
                paynow_reference: paynowReference,
                paymentStatus: 'completed',
                createdAt: new Date().toISOString(),
                submittedAt: new Date().toISOString()
              });

              // Call callback to handle UI updates
              callback({
                success: true,
                transactionData: {
                  ...transactionData,
                  paynow_reference: paynowReference
                },
                registrationId: registrationDocRef.id
              });
              break;

          

            case 'ticket_purchase':
              // Ensure ticket purchase data is available
              if (!additionalData?.ticketPurchaseData) {
                console.error('No ticket purchase data found');
                callback({
                  success: false,
                  error: 'No ticket purchase data available'
                });
                return;
              }

              // Create ticket purchase record
              const ticketPurchasesRef = collection(db, 'ticket_purchases');
              const ticketPurchaseDocRef = await addDoc(ticketPurchasesRef, {
                ...additionalData.ticketPurchaseData,
                paynow_reference: paynowReference,
                paymentStatus: 'completed',
                createdAt: new Date().toISOString(),
                purchaseDate: new Date().toISOString()
              });

              // Call callback to handle UI updates
              callback({
                success: true,
                orderId: orderId,
                ticketPurchaseId: ticketPurchaseDocRef.id,
                paynowReference: paynowReference
              });
              break;

            default:
              // Ensure order data is available
              if (!additionalData?.pendingOrderId) {
                console.error('No pending order found');
                callback({
                  success: false,
                  error: 'No pending order available'
                });
                return;
              }

              // Create reference to the existing pending order
              const orderRef = doc(db, 'orders', additionalData.pendingOrderId);

              // Update the existing pending order
              await updateDoc(orderRef, {
                paymentStatus: 'Completed',
                paynow_reference: paynowReference,
                paidAt: new Date().toISOString()
              });

              // Call callback to handle UI updates
              callback({
                success: true,
                transactionData: {
                  ...transactionData,
                  paynow_reference: paynowReference
                },
                orderId: additionalData.pendingOrderId
              });
              break;
          }

          // Unsubscribe from both listeners
          newDocsUnsubscribe();
          unsubscribe();
        } catch (error) {
          console.error('Error processing new transaction:', error);
          callback({
            success: false,
            error: error.message
          });
        }
      }
    }, (error) => {
      console.error('Error listening to new PayNow transactions:', error);
      callback({
        success: false,
        error: error.message
      });
    });

    return newDocsUnsubscribe;
  }, (error) => {
    console.error('Error collecting existing PayNow transactions:', error);
    callback({
      success: false,
      error: error.message
    });
  });

  // Return a function to unsubscribe from both listeners
  return () => {
    unsubscribe();
  };
};
