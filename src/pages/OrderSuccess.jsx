import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaShoppingCart } from 'react-icons/fa';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, total, items } = location.state || {};

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-zunzo-primary/20 to-orange-500/20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3 
            }}
            className="flex justify-center mb-6"
          >
            <div className="bg-black p-4 rounded-full">
              <FaShoppingCart className="text-white text-7xl" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Order Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-gray-600 mb-8 text-lg"
          >
            {orderId ? `Order #${orderId} has been processed.` : 'Thank you for your purchase!'}
          </motion.p>

          {items && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 text-left max-h-48 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between border-b pb-2">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-4"
          >
            <p className="text-gray-600 mb-6">
              Your order is being prepared and will be shipped soon. 
              You can track your order status in your account dashboard.
            </p>

            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 bg-zunzo-primary text-white rounded-full hover:bg-orange-600 transition-colors duration-300 shadow-lg group"
            >
              <FaHome className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Return to Home
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-8 pt-6 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500">
              If you have any questions about your order, please contact our customer support.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
