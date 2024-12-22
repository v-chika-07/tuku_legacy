import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCart } from '../firebase/services/cartService';
import { toast } from 'react-toastify';
import { listenToPaymentNotifications } from '../services/paymentNotificationService';

// Create the CartContext with a default value
const CartContext = createContext({
  cart: [],
  setCart: () => {},
  cartItemCount: 0,
  paymentNotification: null,
  clearCart: () => {}
});

// Custom hook to use the cart context with error handling
export const useCart = () => {
  const context = useContext(CartContext);
  
  // Throw an error if used outside of CartProvider
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [paymentNotification, setPaymentNotification] = useState(null);
  const { user } = useAuth();

  // Clear entire cart
  const clearCart = async () => {
    try {
      // Implement your cart clearing logic here
      setCart([]);
      setCartItemCount(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  // Fetch initial cart
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const cartData = await getCart(user.uid);
          if (cartData && cartData.items) {
            setCart(cartData.items);
            setCartItemCount(cartData.items.reduce((sum, item) => sum + item.quantity, 0));
          }
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      }
    };
    fetchCart();
  }, [user]);

  // Listen for payment notifications
  useEffect(() => {
    const unsubscribe = listenToPaymentNotifications((notificationData) => {
      // Update payment notification state
      setPaymentNotification(notificationData);
      
      // Clear cart after successful payment
      clearCart();
      
      // Show success toast
      toast.success(`Payment received for order: ${notificationData.reference}`);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <CartContext.Provider value={{ 
      cart, 
      setCart, 
      cartItemCount, 
      setCartItemCount,
      paymentNotification,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
