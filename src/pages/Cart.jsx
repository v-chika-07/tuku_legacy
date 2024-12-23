import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { getCart, updateCartItemQuantity, removeFromCart, clearUserCart } from '../firebase/services/cartService';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalCheckout from '../components/PayPalCheckout';
import { toast } from 'react-toastify';
import { 
  initializePaynowTransaction, 
  createPendingPaynowOrder, 
  listenToOrderStatus,
  listenForPaynowTransaction
} from '../services/paynowService';

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [showPayPal, setShowPayPal] = useState(false);
  const [paynowLoading, setPaynowLoading] = useState(false);
  const { user } = useAuth();
  const { cart, setCart, cartItemCount, clearCart } = useCart();
  const navigate = useNavigate();
  const paynowUnsubscribeRef = useRef(null);

  const fetchCart = async () => {
    if (user) {
      const cartData = await getCart(user.uid);
      if (cartData) {
        setCart(cartData.items || []);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const handleQuantityChange = async (index, change) => {
    const item = cart[index];
    const newQuantity = Math.max(1, item.quantity + change);
    
    const result = await updateCartItemQuantity(
      user.uid, 
      index, 
      newQuantity
    );
    if (result.success) {
      // Update local cart state
      const updatedCart = [...cart];
      updatedCart[index] = { ...item, quantity: newQuantity };
      setCart(updatedCart);
    }
  };

  const handleRemoveItem = async (index) => {
    const result = await removeFromCart(
      user.uid, 
      index
    );
    if (result.success) {
      // Update local cart state
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
    } else {
      toast.error('Failed to remove item');
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckoutSuccess = (orderId) => {
    // Clear the cart
    clearCart();
    
    // Navigate to order success page
    navigate('/order-confirmation', { 
      state: { 
        orderId: orderId,
        total: total,
        items: cart 
      } 
    });
  };

  const handlePaynowCheckout = async () => {
    if (!user) {
      toast.error('Please log in to proceed with checkout');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setPaynowLoading(true);
    try {
      // Initialize Paynow transaction
      const result = await initializePaynowTransaction(
        cart,  // Pass cart directly
        user.email, 
        user
      );

      if (result.success) {
        // Open PayNow URL in a popup window
        const popupWidth = 600;
        const popupHeight = 700;
        const left = (window.screen.width / 2) - (popupWidth / 2);
        const top = (window.screen.height / 2) - (popupHeight / 2);
        
        const paymentWindow = window.open(
          result.url, 
          'PayNow Payment', 
          `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );

        // Create a promise that resolves when transaction is complete
        const transactionPromise = new Promise((resolve, reject) => {
          // Set up listener for PayNow transaction
          const unsubscribe = listenForPaynowTransaction(
            user.email, 
            result.orderId, 
            async (transactionResult) => {
              if (transactionResult.success) {
                resolve(transactionResult);
              } else {
                reject(new Error(transactionResult.error || 'Payment failed'));
              }
              
              // Always unsubscribe
              if (typeof unsubscribe === 'function') {
                unsubscribe();
              }
            }
          );

          // Optional: Add a timeout to prevent indefinite waiting
          setTimeout(() => {
            if (typeof unsubscribe === 'function') {
              unsubscribe();
            }
            reject(new Error('Payment verification timed out'));
          }, 5 * 60 * 1000); // 5 minutes timeout
        });

        try {
          // Wait for transaction to complete
          await transactionPromise;

          // Close the popup window if it's still open
          if (paymentWindow && !paymentWindow.closed) {
            paymentWindow.close();
          }

          // Clear cart and show success message
          await clearUserCart(user.uid);
          clearCart();
          toast.success('Payment successful! Your order has been processed.');
          navigate('/order-confirmation');
        } catch (error) {
          // Handle any errors during transaction
          toast.error(error.message || 'Payment processing failed');
          
          // Close popup if still open
          if (paymentWindow && !paymentWindow.closed) {
            paymentWindow.close();
          }
        } finally {
          setPaynowLoading(false);
        }
      } else {
        toast.error('Failed to initialize PayNow transaction');
        setPaynowLoading(false);
      }
    } catch (error) {
      console.error('PayNow Checkout Error:', error);
      toast.error('An error occurred during checkout');
      setPaynowLoading(false);
    }
  };

  // Cleanup listener on component unmount
  useEffect(() => {
    return () => {
      if (paynowUnsubscribeRef.current) {
        paynowUnsubscribeRef.current();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
          <p className="mt-4 text-lg">Loading cart...</p>
        </div>
      </div>
    );
  }

  const total = calculateTotal();

  return (
    <PayPalScriptProvider options={{ 
      "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
      currency: "USD"
    }}>
      <div className="min-h-screen pt-24 pb-12">
        {paynowLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-white"></div>
          </div>
        )}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 max-w-4xl"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>
          
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-lg p-6 shadow-md flex items-center justify-between space-x-8"
                  >
                    <div className="flex items-center space-x-8">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-black">{item.name}</h3>
                        <p className="text-black">Color: {item.color}</p>
                        <p className="text-black">Size: {item.size}</p>
                        <p className="font-medium text-black">${item.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(index, -1)}
                          className="p-2 bg-white border border-black rounded hover:bg-gray-50 transition-colors"
                        >
                          <FaMinus className="text-black" />
                        </button>
                        <span className="w-8 text-center text-black">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(index, 1)}
                          className="p-2 bg-white border border-black rounded hover:bg-gray-50 transition-colors"
                        >
                          <FaPlus className="text-black" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="p-2 bg-white border border-black rounded hover:bg-gray-50 transition-colors"
                      >
                        <FaTrash className="text-red-500 hover:text-red-600 transition-colors" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold text-black">Total:</span>
                  <span className="text-xl font-bold text-black">${total.toFixed(2)}</span>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  {showPayPal ? (
                    <PayPalCheckout 
                      items={cart}
                      total={total}
                      userId={user.uid}
                      onSuccess={handleCheckoutSuccess}
                    />
                  ) : (
                    <>
                      <button
                        onClick={() => setShowPayPal(true)}
                        className="w-1/2 bg-black text-white py-3 rounded-full hover:bg-black/90 transition-all duration-300 font-medium"
                      >
                        Proceed to Checkout
                      </button>
                      <button
                        onClick={handlePaynowCheckout}
                        disabled={paynowLoading || cart.length === 0}
                        className="w-1/2 bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-medium disabled:opacity-50"
                      >
                        {paynowLoading ? 'Processing...' : 'PayNow Checkout'}
                      </button>
                      <button
                        onClick={() => navigate('/marathon-merch')}
                        className="w-1/2 bg-white text-black py-3 rounded-full border border-black hover:bg-gray-50 transition-all duration-300 font-medium"
                      >
                        Continue Shopping
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Cart;
