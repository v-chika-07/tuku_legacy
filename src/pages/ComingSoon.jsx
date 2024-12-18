import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';

const ComingSoon = () => {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-sm p-12 rounded-lg border border-white/20 shadow-xl max-w-2xl mx-auto"
        >
          <FaClock className="text-6xl text-accent mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-light">Coming Soon</h1>
          <p className="text-xl mb-8 text-text-light/90">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
          <Link to="/">
            <button className="bg-accent hover:bg-primary text-text-light px-8 py-3 rounded-full transition-colors">
              Return Home
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
