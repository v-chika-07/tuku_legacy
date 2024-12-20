import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase/config.js';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { FaUserPlus, FaSpinner } from 'react-icons/fa';

const RegistrationDetails = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const registrationsQuery = query(collection(db, 'event_registrations'));
    const unsubscribe = onSnapshot(registrationsQuery, (snapshot) => {
      const registrationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRegistrations(registrationsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching registrations:", error);
      setLoading(false);
    });

    return () => unsubscribe();
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
            <FaUserPlus className="text-4xl text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Marathon Registrations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-lg"
          >
            View and manage participant registrations
          </motion.p>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 overflow-x-auto"
        >
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <FaSpinner className="animate-spin text-4xl text-white" />
            </div>
          ) : (
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-4">Full Name</th>
                  <th className="text-left py-4 px-4">Email</th>
                  <th className="text-left py-4 px-4">Phone</th>
                  <th className="text-left py-4 px-4">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration) => (
                  <tr 
                    key={registration.id}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      {registration.firstName} {registration.lastName}
                    </td>
                    <td className="py-4 px-4">{registration.email}</td>
                    <td className="py-4 px-4">{registration.phone}</td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-300">
                        Unpaid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegistrationDetails;
