import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const FloatingCart = () => {
  const { cartItemCount = 0 } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/cart');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="fixed right-8 top-24 z-40"
    >
      <button
        onClick={handleClick}
        className="relative bg-white text-black p-4 rounded-full shadow-lg hover:bg-white/90 transition-all duration-300"
      >
        <FaShoppingCart size={24} />
        {cartItemCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-3 -right-3 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
          >
            {cartItemCount}
          </motion.div>
        )}
      </button>
    </motion.div>
  );
};

export default FloatingCart;
