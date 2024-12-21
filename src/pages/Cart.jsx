import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { getCart, updateCartItemQuantity, removeFromCart } from '../firebase/services/cartService';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalCheckout from '../components/PayPalCheckout';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [showPayPal, setShowPayPal] = useState(false);
  const { user } = useAuth();
  const { updateCartCount } = useCart();
  const navigate = useNavigate();

  const fetchCart = async () => {
    if (user) {
      const cartData = await getCart(user.uid);
      if (cartData) {
        setCart(cartData);
        // Update cart count in context
        updateCartCount();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const handleQuantityChange = async (index, change) => {
    const item = cart.items[index];
    const newQuantity = Math.max(1, item.quantity + change);
    
    const result = await updateCartItemQuantity(
      user.uid, 
      index, 
      newQuantity
    );
    if (result.success) {
      setCart(prev => ({
        ...prev,
        items: result.items
      }));
      // Update cart count
      updateCartCount();
    } else {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (index) => {
    const result = await removeFromCart(
      user.uid, 
      index
    );
    if (result.success) {
      setCart(prev => ({
        ...prev,
        items: result.items
      }));
      // Update cart count
      updateCartCount();
    } else {
      toast.error('Failed to remove item');
    }
  };

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckoutSuccess = async (orderId) => {
    toast.success('Payment successful!');
    setShowPayPal(false);
    await fetchCart(); // Refresh cart after successful payment
    // You could navigate to an order confirmation page here
    // navigate(`/order-confirmation/${orderId}`);
  };

  const generatePaynowLink = () => {
    // Calculate total using the method
    const total = calculateTotal();
    
    // Debug: log cart and total
    console.log('Cart:', cart);
    console.log('Total:', total);
    
    // Use the merchant ID from the previous example
    const merchantId = '19725';
    
    // Format total to two decimal places
    const amount = total.toFixed(2);
    
    // Debug: log amount
    console.log('Amount for Paynow:', amount);
    
    // Construct the query string
    const queryParams = `id=${merchantId}&amount=${amount}&amount_quantity=${amount}&l=0`;
    
    // Base64 encode the query string
    const base64EncodedParams = btoa(queryParams);
    
    // Construct the full Paynow URL
    return `https://www.paynow.co.zw/Payment/BillPaymentLink/?q=${base64EncodedParams}`;
  };

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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 max-w-4xl"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>
          
          {cart.items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.items.map((item, index) => (
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
                      items={cart.items}
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
                      <a 
                        href={generatePaynowLink()}
                        target='_blank' 
                        rel="noopener noreferrer"
                        className="w-1/2 bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-medium text-center inline-block"
                      >
                        PayNow Checkout
                      </a>
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
