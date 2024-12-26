import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTicketAlt, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const TicketOrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Retrieve order details from navigation state
    const details = location.state?.orderDetails;
    
    if (!details) {
      // If no order details, redirect back to events
      navigate('/events');
      return;
    }

    // Set order details
    setOrderDetails(details);
  }, [location.state, navigate]);

  // If no order details, return null
  if (!orderDetails) return null;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-xl p-8 max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-4" />
          <h1 className="text-4xl font-bold text-black mb-4">
            Ticket Purchase Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your tickets are confirmed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-black mb-4 flex items-center">
              <FaTicketAlt className="mr-2 text-primary" /> Ticket Details
            </h2>
            {orderDetails.tickets.map((ticket, index) => (
              ticket.quantity > 0 && (
                <div key={index} className="mb-2 p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-black">
                    {ticket.name} x {ticket.quantity}
                  </p>
                  <p className="text-gray-600">
                    ${(ticket.price * ticket.quantity).toFixed(2)}
                  </p>
                </div>
              )
            ))}
            <div className="mt-4 font-bold text-black">
              Total: ${orderDetails.totalAmount.toFixed(2)}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-4 flex items-center">
              <FaCalendarAlt className="mr-2 text-primary" /> Event Information
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-black">{orderDetails.eventName}</p>
              <div className="text-gray-600 mt-2">
                <p>Purchased by: {orderDetails.customerDetails.fullName}</p>
                <p>Email: {orderDetails.customerDetails.email}</p>
                {orderDetails.customerDetails.phone && (
                  <p>Phone: {orderDetails.customerDetails.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/events')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Back to Events
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TicketOrderSuccess;
