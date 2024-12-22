import { db } from '../firebase/config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const handlePaynowNotification = async (paymentData) => {
  try {
    // Extract relevant payment information
    const {
      Paynow_Reference,
      Customer_Name,
      Customer_Email,
      Customer_Phone,
      Transaction_Amount,
      Amount_Paid,
      Hash
    } = paymentData;

    // Validate payment data
    if (parseFloat(Transaction_Amount) !== parseFloat(Amount_Paid)) {
      toast.error('Payment verification failed: Amount mismatch');
      return false;
    }

    // Find the corresponding order in Firestore
    const orderRef = doc(db, 'orders', Paynow_Reference);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      toast.error('No matching order found');
      return false;
    }

    // Update order status
    await updateDoc(orderRef, {
      paymentStatus: 'completed',
      amountPaid: parseFloat(Amount_Paid),
      paymentReference: Paynow_Reference,
      paymentMethod: 'Paynow',
      customerDetails: {
        name: decodeURIComponent(Customer_Name),
        email: decodeURIComponent(Customer_Email),
        phone: Customer_Phone
      }
    });

    // Trigger success toast
    toast.success('Payment processed successfully!');

    return true;
  } catch (error) {
    console.error('Payment notification error:', error);
    toast.error('Payment processing failed');
    return false;
  }
};

// Frontend webhook endpoint simulation
export const simulatePaynowWebhook = async (webhookData) => {
  try {
    // In a real-world scenario, you'd validate the hash here
    const result = await handlePaynowNotification(webhookData);
    return result;
  } catch (error) {
    console.error('Webhook simulation error:', error);
    return false;
  }
};
