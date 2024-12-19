import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const OLIFA = () => {
  return (
    <div className="relative min-h-screen">
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 pt-20"
      >
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-[80vh] flex items-center justify-center text-center bg-gradient-to-br from-primary via-secondary to-accent"
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 text-text-light px-4">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              OLIFA - Oliver Mtukudzi Foundation
            </motion.h1>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto"
            >
              The Oliver Mtukudzi Foundation is preparing to launch its initiatives supporting young athletic talent in Zimbabwe. Join us in nurturing the next generation of athletes while preserving Tuku's legacy of excellence.
            </motion.div>

            {/* Animated Border */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative mx-auto w-64 h-64 mb-12"
            >
              <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-pulse" />
              <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-white/50 border-b-white/30 border-l-white/10 animate-spin-slow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl font-bold">Coming Soon</span>
              </div>
            </motion.div>

            {/* Back to Home Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link 
                to="/"
                className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm group"
              >
                <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Home
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OLIFA;
