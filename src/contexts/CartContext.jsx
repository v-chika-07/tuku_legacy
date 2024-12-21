import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { getCart } from '../firebase/services/cartService';

// Create the CartContext with a default value
const CartContext = createContext({
  cartItemCount: 0,
  setCartItemCount: () => {},
  updateCartCount: () => {}
});

// Custom hook to use the cart context with error handling
export const useCart = () => {
  const context = useContext(CartContext);
  
  // Throw an error if used outside of CartProvider
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { user } = useAuth();

  // Fetch initial cart count when user changes
  useEffect(() => {
    const fetchInitialCartCount = async () => {
      if (user) {
        try {
          const cart = await getCart(user.uid);
          if (cart && cart.items) {
            const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
            setCartItemCount(totalItems);
          }
        } catch (error) {
          console.error('Error fetching cart count:', error);
          setCartItemCount(0);
        }
      }
    };

    fetchInitialCartCount();
  }, [user]);

  // Method to update cart count
  const updateCartCount = async () => {
    if (user) {
      try {
        const cart = await getCart(user.uid);
        if (cart && cart.items) {
          const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
          setCartItemCount(totalItems);
        }
      } catch (error) {
        console.error('Error updating cart count:', error);
      }
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    cartItemCount, 
    setCartItemCount,
    updateCartCount
  }), [cartItemCount]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
