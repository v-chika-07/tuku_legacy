import { createOrder } from '../firebase/services/orderService';
import { toast } from 'react-toastify';
import crypto from 'crypto';

const INTEGRATION_KEY = import.meta.env.VITE_PAYNOW_INTEGRATION_KEY;
const API_URL = import.meta.env.VITE_API_URL || 'https://www.zunzorunningclub.com/api';

// Function to verify Paynow hash
const verifyPaynowHash = (data, suppliedHash) => {
  // Concatenate all values in order
  const hashString = Object.keys(data)
    .filter(key => key !== 'Hash')
    .map(key => data[key])
    .join('') + INTEGRATION_KEY;

  // Generate SHA512 hash
  const generatedHash = crypto
    .createHash('sha512')
    .update(hashString, 'utf8')
    .digest('hex')
    .toUpperCase();

  return generatedHash === suppliedHash;
};

export const processPaynowNotification = async (notificationData) => {
  try {
    // Verify hash first
    if (!verifyPaynowHash(notificationData, notificationData.Hash)) {
      console.error('Paynow hash verification failed');
      return { success: false, message: 'Hash verification failed' };
    }

    // Extract relevant transaction details
    const orderDetails = {
      transactionReference: notificationData.Paynow_Reference,
      customerName: notificationData.Customer_Name,
      customerEmail: notificationData.Customer_Email,
      transactionAmount: parseFloat(notificationData.Transaction_Amount),
      amountPaid: parseFloat(notificationData.Amount_Paid),
      status: notificationData.Status || 'Pending'
    };

    // Create order in Firebase
    const orderResult = await createOrder({
      ...orderDetails,
      paymentMethod: 'Paynow',
      status: orderDetails.status === 'Completed' ? 'Paid' : 'Pending'
    });

    if (!orderResult.success) {
      console.error('Failed to create order:', orderResult.error);
      return { success: false, message: 'Failed to create order' };
    }

    // Notify user (this would typically be done via email or push notification)
    toast.success(`Payment received: ${orderDetails.transactionReference}`);

    return {
      success: true,
      message: 'Paynow notification processed successfully',
      orderId: orderResult.orderId
    };

  } catch (error) {
    console.error('Error processing Paynow notification:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

// Function to handle Paynow return URLs
export const handlePaynowReturn = async (returnData) => {
  try {
    // Determine status based on return data
    const status = returnData.status === 'success' ? 'Completed' : 'Failed';

    // Update order status in Firebase or trigger appropriate action
    // This is a placeholder - you'd implement the actual logic based on your system
    toast.info(`Transaction ${status.toLowerCase()}`);

    return {
      success: status === 'Completed',
      message: `Payment ${status.toLowerCase()}`
    };
  } catch (error) {
    console.error('Error handling Paynow return:', error);
    return {
      success: false,
      message: error.message
    };
  }
};
