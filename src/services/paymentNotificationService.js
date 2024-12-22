import { db } from '../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const listenToPaymentNotifications = (callback) => {
  // Create a query to listen for completed payment notifications
  const notificationsRef = collection(db, 'paymentNotifications');
  const q = query(notificationsRef, where('status', '==', 'completed'));

  // Set up real-time listener
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const paymentData = change.doc.data();
        
        // Trigger toast notification
        toast.success(`Payment received: ${paymentData.reference}`);
        
        // Call provided callback with payment data
        if (callback) {
          callback(paymentData);
        }
      }
    });
  }, (error) => {
    console.error('Payment notification listener error:', error);
    toast.error('Error listening to payment notifications');
  });

  // Return unsubscribe function to stop listening
  return unsubscribe;
};

// Helper function to update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { 
      paymentStatus: status 
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    toast.error('Failed to update order status');
  }
};
