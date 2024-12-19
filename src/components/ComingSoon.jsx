import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import image1 from '../assets/images/IMG-20241218-WA0005.jpg';
import image2 from '../assets/images/IMG-20241218-WA0006.jpg';
import image3 from '../assets/images/IMG-20241218-WA0007.jpg';
import image4 from '../assets/images/IMG-20241218-WA0008.jpg';

const ComingSoon = ({ title, description }) => {
  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Background Image Collage */}
      <div className="absolute inset-0 grid grid-cols-2 gap-1">
        <div className="relative overflow-hidden">
          <motion.div 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-transparent mix-blend-multiply" />
        </div>
        <div className="relative overflow-hidden">
          <motion.div 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-primary/60 to-transparent mix-blend-multiply" />
        </div>
        <div className="relative overflow-hidden">
          <motion.div 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image3})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-transparent mix-blend-multiply" />
        </div>
        <div className="relative overflow-hidden">
          <motion.div 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image4})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tl from-primary/60 to-transparent mix-blend-multiply" />
        </div>
      </div>

      {/* Overall gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary/60 mix-blend-multiply" />
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-[85vw] mx-auto px-4 py-16 text-center -mt-[15vh]"
      >
        <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {title}
          </motion.h1>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl text-white/90 mb-12 max-w-4xl mx-auto"
          >
            {description}
          </motion.div>

          {/* Animated Border */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative mx-auto w-48 h-48 mb-12"
          >
            <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-pulse" />
            <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-white/50 border-b-white/30 border-l-white/10 animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-lg font-bold">Coming Soon</span>
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
              className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm group text-xl"
            >
              <FaArrowLeft className="mr-3 transform group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
