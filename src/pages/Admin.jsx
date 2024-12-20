import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaShoppingCart, FaUserPlus, FaBoxes } from 'react-icons/fa';
import { db } from '../firebase/config.js';
import { collection, query, onSnapshot } from 'firebase/firestore';

const Admin = () => {
  const [messageCount, setMessageCount] = useState(0);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    // Messages Listener
    const messagesQuery = query(collection(db, 'contact_submissions'));
    const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map(doc => doc.data());
      setMessageCount(snapshot.size);
      setUnreadMessageCount(messages.filter(msg => !msg.read).length);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });

    // Registrations Listener
    const registrationsQuery = query(collection(db, 'event_registrations'));
    const unsubscribeRegistrations = onSnapshot(registrationsQuery, (snapshot) => {
      setRegistrationCount(snapshot.size);
    }, (error) => {
      console.error("Error fetching registrations:", error);
    });

    // Products Listener
    const productsQuery = query(collection(db, 'products'));
    const unsubscribeProducts = onSnapshot(productsQuery, (snapshot) => {
      setProductCount(snapshot.size);
    }, (error) => {
      console.error("Error fetching products:", error);
    });

    return () => {
      unsubscribeMessages();
      unsubscribeRegistrations();
      unsubscribeProducts();
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-primary via-secondary to-accent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-4 rounded-full bg-black/20 backdrop-blur-sm mb-6"
          >
            <FaLock className="text-4xl text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Admin Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-lg"
          >
            Manage your website content and monitor activity
          </motion.p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Messages Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-black/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaEnvelope className="text-2xl" />
              <h2 className="text-xl font-semibold">Messages</h2>
            </div>
            <p className="text-white/80">
              View and manage messages from users
            </p>
            <div className="mt-4 text-3xl font-bold">
              {unreadMessageCount}/{messageCount}
            </div>
            <p className="text-white/60 text-sm mb-4">
              Unread messages
            </p>
            <Link 
              to="/admin/messages" 
              className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              View Details
            </Link>
          </motion.div>

          {/* Orders Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-black/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaShoppingCart className="text-2xl" />
              <h2 className="text-xl font-semibold">Orders</h2>
            </div>
            <p className="text-white/80">
              Track and manage merchandise orders
            </p>
            <div className="mt-4 text-3xl font-bold">
              0
            </div>
            <p className="text-white/60 text-sm mb-4">
              Pending orders
            </p>
            <button 
              className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white cursor-not-allowed opacity-50"
              disabled
            >
              View Details
            </button>
          </motion.div>

          {/* Registrations Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-black/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaUserPlus className="text-2xl" />
              <h2 className="text-xl font-semibold">Marathon Registrations</h2>
            </div>
            <p className="text-white/80">
              Monitor event registrations and participants
            </p>
            <div className="mt-4 text-3xl font-bold">
              {registrationCount}
            </div>
            <p className="text-white/60 text-sm mb-4">
              Total registrations
            </p>
            <Link 
              to="/admin/registrations" 
              className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              View Details
            </Link>
          </motion.div>

          {/* Inventory Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-black/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaBoxes className="text-2xl" />
              <h2 className="text-xl font-semibold">Inventory</h2>
            </div>
            <p className="text-white/80">
              Manage products and track inventory levels
            </p>
            <div className="mt-4 text-3xl font-bold">
              {productCount}
            </div>
            <p className="text-white/60 text-sm mb-4">
              Total products
            </p>
            <Link 
              to="/admin/inventory" 
              className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              View Details
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Admin;
