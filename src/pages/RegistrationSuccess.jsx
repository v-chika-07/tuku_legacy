import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHome } from 'react-icons/fa';

const RegistrationSuccess = () => {
  const navigate = useNavigate();

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
              <FaCheckCircle className="text-white text-7xl" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Registration Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-gray-600 mb-8 text-lg"
          >
            Thank you for registering for the event. We've sent a confirmation email with all the details.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-4"
          >
            <p className="text-gray-600 mb-6">
              Get ready for an amazing experience! We can't wait to see you at the event.
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
              If you have any questions, please don't hesitate to contact us.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationSuccess;
