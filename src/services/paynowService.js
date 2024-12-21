import { toast } from 'react-toastify';

const INTEGRATION_ID = import.meta.env.VITE_PAYNOW_INTEGRATION_ID;
const INTEGRATION_KEY = import.meta.env.VITE_PAYNOW_INTEGRATION_KEY;
const RESULT_URL = import.meta.env.VITE_PAYNOW_RESULT_URL;
const RETURN_URL = import.meta.env.VITE_PAYNOW_RETURN_URL;

const PAYNOW_API_URL = 'https://www.paynow.co.zw/interface/initiatetransaction';

export const initializePaynowTransaction = async (cart, userEmail) => {
  try {
    // Validate cart and user email
    if (!cart || !cart.items || cart.items.length === 0) {
      toast.error('Cart is empty');
      return { success: false, error: 'Empty cart' };
    }

    // Prepare transaction details
    const transactionRef = `ZunzoOrder_${Date.now()}`;
    
    // Calculate total
    const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Prepare form data
    const formData = new URLSearchParams({
      id: INTEGRATION_ID,
      reference: transactionRef,
      amount: total.toFixed(2),
      email: userEmail,
      returnurl: RETURN_URL,
      resulturl: RESULT_URL,
      status: 'Pending'
    });

    // Add items to description
    const itemsDescription = cart.items
      .map(item => `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`)
      .join(', ');
    formData.append('description', itemsDescription);

    // Send request to Paynow
    const response = await fetch(PAYNOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${INTEGRATION_KEY}`
      },
      body: formData
    });

    // Check response
    if (!response.ok) {
      const errorText = await response.text();
      toast.error('Paynow transaction failed');
      console.error('Paynow error:', errorText);
      return { 
        success: false, 
        error: errorText || 'Failed to initialize transaction' 
      };
    }

    // Parse response
    const responseText = await response.text();
    const parsedResponse = parsePaynowResponse(responseText);

    return {
      success: true,
      redirectUrl: parsedResponse.redirectUrl,
      pollUrl: parsedResponse.pollUrl,
      transactionReference: transactionRef
    };

  } catch (error) {
    console.error('Paynow transaction error', error);
    toast.error('An error occurred during checkout');
    return {
      success: false,
      error: error.message
    };
  }
};

// Helper function to parse Paynow response
const parsePaynowResponse = (responseText) => {
  // This is a mock implementation. You'll need to adjust based on actual Paynow response format
  const parts = responseText.split('&');
  const responseMap = {};
  parts.forEach(part => {
    const [key, value] = part.split('=');
    responseMap[key] = decodeURIComponent(value);
  });

  return {
    success: responseMap.status === 'Ok',
    redirectUrl: responseMap.browserurl,
    pollUrl: responseMap.pollurl,
    error: responseMap.error
  };
};

export const checkPaynowTransactionStatus = async (pollUrl) => {
  try {
    const response = await fetch(pollUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${INTEGRATION_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to check transaction status');
    }

    const statusText = await response.text();
    const status = parsePaynowResponse(statusText);

    return {
      paid: status.success,
      status: status
    };

  } catch (error) {
    console.error('Error checking Paynow transaction status', error);
    return {
      paid: false,
      error: error.message
    };
  }
};
