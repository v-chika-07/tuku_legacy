import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase/config.js';
import { collection, query, onSnapshot, where, doc, updateDoc } from 'firebase/firestore';
import { FaUserPlus, FaSpinner, FaSearch, FaTimes, FaUser, FaEnvelope, FaPhone, FaRunning, FaCalendar, FaCreditCard, FaMapMarker, FaIdCard, FaHeartbeat, FaUserFriends, FaTshirt } from 'react-icons/fa';

const RegistrationDetails = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('21.1km');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  // Race Categories
  const raceCategories = [
    '21.1km',
    '10km',
    '5km'
  ];

  useEffect(() => {
    const registrationsQuery = query(
      collection(db, 'event_registrations'),
      where('raceCategory', '==', activeCategory)
    );
    const unsubscribe = onSnapshot(registrationsQuery, (snapshot) => {
      const registrationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        checkedIn: doc.data().checkedIn || false,
        ...doc.data()
      }));
      setRegistrations(registrationsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching registrations:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeCategory]);

  // Handle Check-in Toggle
  const handleCheckInToggle = async (registrationId, currentCheckedInStatus) => {
    try {
      const registrationRef = doc(db, 'event_registrations', registrationId);
      await updateDoc(registrationRef, {
        checkedIn: !currentCheckedInStatus
      });
      
      // Optimistic update for immediate UI feedback
      setRegistrations(prevRegistrations => 
        prevRegistrations.map(reg => 
          reg.id === registrationId 
            ? { ...reg, checkedIn: !currentCheckedInStatus }
            : reg
        )
      );
    } catch (error) {
      console.error("Error updating check-in status:", error);
    }
  };

  // Filtered and Searched Registrations
  const filteredRegistrations = useMemo(() => {
    if (!searchTerm) return registrations;

    const searchTermLower = searchTerm.toLowerCase();
    return registrations.filter(registration => 
      registration.firstName.toLowerCase().includes(searchTermLower) ||
      registration.lastName.toLowerCase().includes(searchTermLower) ||
      registration.email.toLowerCase().includes(searchTermLower) ||
      registration.phone.toLowerCase().includes(searchTermLower) ||
      (registration.paynow_reference && 
       registration.paynow_reference.toLowerCase().includes(searchTermLower))
    );
  }, [registrations, searchTerm]);

  // Registration Details Modal
  const RegistrationDetailsModal = ({ registration, onClose }) => {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black">
                Registration Details
              </h2>
              <button 
                onClick={onClose}
                className="p-0 hover:opacity-75 bg-white"
              >
                <FaTimes className="text-2xl text-black" />
              </button>
            </div>

            {/* Details Grid */}
            <div className="space-y-4 text-black">
              <div className="flex items-center">
                <FaUser className="mr-3 text-primary" />
                <div>
                  <span className="font-semibold">Full Name:</span>
                  <span className="ml-2">{registration.firstName} {registration.lastName}</span>
                </div>
              </div>

              <div className="flex items-center">
                <FaIdCard className="mr-3 text-primary" />
                <div>
                  <span className="font-semibold">ID Number:</span>
                  <span className="ml-2">{registration.idNumber || 'N/A'}</span>
                </div>
              </div>

              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-primary" />
                <div>
                  <span className="font-semibold">Email:</span>
                  <span className="ml-2">{registration.email}</span>
                </div>
              </div>

              <div className="flex items-center">
                <FaPhone className="mr-3 text-primary" />
                <div>
                  <span className="font-semibold">Phone:</span>
                  <span className="ml-2">{registration.phone}</span>
                </div>
              </div>

              <div className="flex items-center">
                <FaUserFriends className="mr-3 text-primary" />
                <div>
                  <span className="font-semibold">Next of Kin:</span>
                  <span className="ml-2">{registration.nextOfKinName || 'N/A'}</span>
                </div>
              </div>

              <div className="flex items-center">
                <FaPhone className="mr-3 text-primary" />
                <div>
                  <span className="font-semibold">Next of Kin Phone:</span>
                  <span className="ml-2">{registration.nextOfKinPhone || 'N/A'}</span>
                </div>
              </div>

              <div className="flex items-center">
                <FaHeartbeat className="mr-3 text-primary" />
                <div>
                  <span className="font-semibold">Medical Aid Status:</span>
                  <span className="ml-2">
                    {registration.hasMedicalAid || 'N/A'}
                  </span>
                </div>
              </div>

              {registration.hasMedicalAid === 'Yes' && (
                <div className="flex items-center">
                  <FaIdCard className="mr-3 text-primary" />
                  <div>
                    <span className="font-semibold">Medical Aid Number:</span>
                    <span className="ml-2">{registration.medicalAidNumber || 'N/A'}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <FaTshirt className="mr-3 text-primary" />
                <div>
                  <span className="font-semibold">T-Shirt Size:</span>
                  <span className="ml-2">{registration.tShirtSize || 'N/A'}</span>
                </div>
              </div>

              <div className="flex items-center">
                <FaCalendar className="mr-3 text-primary" />
                <div>
                  <span className="font-semibold">Registration Date:</span>
                  <span className="ml-2">
                    {registration.registrationDate 
                      ? new Date(registration.registrationDate.seconds * 1000).toLocaleDateString() 
                      : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <FaCreditCard className="mr-3 text-primary" />
                <div>
                  <span className="font-semibold">Payment Reference:</span>
                  <span className="ml-2">{registration.paynow_reference || 'N/A'}</span>
                </div>
              </div>

              <div className="flex items-center">
                <FaMapMarker className="mr-3 text-primary" />
                <div>
                  <span className="font-semibold text-black">Check-in Status:</span>
                  <span className={`ml-2 ${registration.checkedIn ? 'text-green-600' : 'text-red-600'}`}>
                    {registration.checkedIn ? 'Checked In' : 'Not Checked In'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

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

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-full p-2 flex space-x-2">
            {raceCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-white text-black' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {category === '21.1km' ? 'Half Marathon' : 
                 category === '10km' ? 'Fun Run' : 
                 category === '5km' ? 'Walk' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search participants by name, email, phone, or payment reference"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-full bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
          </div>
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
            <>
              <div className="text-white text-center mb-4 text-xl font-semibold">
                {activeCategory === '21.1km' ? 'Half Marathon' : 
                 activeCategory === '10km' ? 'Fun Run' : 
                 activeCategory === '5km' ? 'Walk' : activeCategory} 
                - {filteredRegistrations.length} Participants
              </div>
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 px-4">Full Name</th>
                    <th className="text-left py-4 px-4">Email</th>
                    <th className="text-left py-4 px-4">Phone</th>
                    <th className="text-left py-4 px-4">Payment Reference</th>
                    <th className="text-left py-4 px-4">Check-in</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((registration) => (
                    <tr 
                      key={registration.id}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={(e) => {
                        // Prevent modal from opening if checkbox is clicked
                        if (e.target.type !== 'checkbox') {
                          setSelectedRegistration(registration);
                        }
                      }}
                    >
                      <td className="py-4 px-4">
                        {registration.firstName} {registration.lastName}
                      </td>
                      <td className="py-4 px-4">{registration.email}</td>
                      <td className="py-4 px-4">{registration.phone}</td>
                      <td className="py-4 px-4">
                        {registration.paynow_reference || 'N/A'}
                      </td>
                      <td className="py-4 px-4">
                        <input 
                          type="checkbox"
                          checked={registration.checkedIn || false}
                          onChange={() => handleCheckInToggle(registration.id, registration.checkedIn)}
                          className="form-checkbox h-5 w-5 text-accent bg-white/20 border-transparent rounded focus:ring-accent focus:ring-2"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredRegistrations.length === 0 && (
                <div className="text-center text-white/60 py-8">
                  No registrations found
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* Registration Details Modal */}
        <AnimatePresence>
          {selectedRegistration && (
            <RegistrationDetailsModal 
              registration={selectedRegistration}
              onClose={() => setSelectedRegistration(null)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RegistrationDetails;
