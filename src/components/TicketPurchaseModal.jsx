import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTicketAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { 
  initializePaynowTransaction, 
  listenForPaynowTransaction 
} from '../services/paynowService';

const TicketPurchaseModal = ({ 
  isOpen, 
  onClose, 
  event 
}) => {
  const [ticketQuantities, setTicketQuantities] = useState(
    event.ticketTypes.reduce((acc, ticket) => {
      acc[ticket.id] = 0;
      return acc;
    }, {})
  );

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const [paynowLoading, setPaynowLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleQuantityChange = (ticketId, quantity) => {
    setTicketQuantities(prev => ({
      ...prev,
      [ticketId]: Math.max(0, quantity)
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return event.ticketTypes.reduce((total, ticket) => {
      return total + (ticket.price * ticketQuantities[ticket.id]);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    const totalTickets = Object.values(ticketQuantities).reduce((a, b) => a + b, 0);
    if (totalTickets === 0) {
      alert('Please select at least one ticket');
      return;
    }

    // Prepare order details
    const orderDetails = {
      eventId: event.id,
      eventName: event.name,
      customerDetails: formData,
      tickets: event.ticketTypes.map(ticket => ({
        id: ticket.id,
        name: ticket.name,
        quantity: ticketQuantities[ticket.id],
        price: ticket.price
      })),
      totalAmount: calculateTotal()
    };

    // Initiate PayNow transaction
    const initiatePaynowTransaction = async () => {
      if (!user) {
        toast.error('Please log in to proceed with ticket purchase');
        return;
      }

      setPaynowLoading(true);
      try {
        // Prepare ticket items for PayNow
        const ticketItems = orderDetails.tickets
          .filter(ticket => ticket.quantity > 0)
          .map(ticket => ({
            name: ticket.name,
            quantity: ticket.quantity,
            price: ticket.price
          }));

        // Initialize PayNow transaction
        const result = await initializePaynowTransaction(
          ticketItems,
          user.email,
          user
        );

        if (result.success) {
          // Open PayNow URL in a popup window
          const popupWidth = 600;
          const popupHeight = 700;
          const left = (window.screen.width / 2) - (popupWidth / 2);
          const top = (window.screen.height / 2) - (popupHeight / 2);
          
          const paymentWindow = window.open(
            result.url, 
            'PayNow Payment', 
            `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes`
          );

          // Create a promise that resolves when transaction is complete
          const transactionPromise = new Promise((resolve, reject) => {
            // Set up listener for PayNow transaction
            const unsubscribe = listenForPaynowTransaction(
              user.email, 
              result.orderId, 
              async (transactionResult) => {
                if (transactionResult.success) {
                  resolve(transactionResult);
                } else {
                  reject(new Error(transactionResult.error || 'Payment failed'));
                }
                
                // Always unsubscribe
                if (typeof unsubscribe === 'function') {
                  unsubscribe();
                }
              },
              'ticket_purchase', // Specify transaction type
              {
                ticketPurchaseData: {
                  eventId: event.id,
                  eventName: event.name,
                  customerDetails: formData,
                  tickets: orderDetails.tickets,
                  totalAmount: orderDetails.totalAmount
                }
              }
            );

            // Optional: Add a timeout to prevent indefinite waiting
            setTimeout(() => {
              if (typeof unsubscribe === 'function') {
                unsubscribe();
              }
              reject(new Error('Payment verification timed out'));
            }, 5 * 60 * 1000); // 5 minutes timeout
          });

          try {
            // Wait for transaction to complete
            await transactionPromise;

            // Close the popup window if it's still open
            if (paymentWindow && !paymentWindow.closed) {
              paymentWindow.close();
            }

            // Navigate to success page with order details
            navigate('/ticket-order-success', { 
              state: { orderDetails } 
            });
          } catch (error) {
            // Handle any errors during transaction
            toast.error(error.message || 'Payment processing failed');
            
            // Close popup if still open
            if (paymentWindow && !paymentWindow.closed) {
              paymentWindow.close();
            }
          } finally {
            setPaynowLoading(false);
            onClose(); // Close the modal
          }
        } else {
          toast.error('Failed to initialize PayNow transaction');
          setPaynowLoading(false);
        }
      } catch (error) {
        console.error('PayNow Checkout Error:', error);
        toast.error('An error occurred during checkout');
        setPaynowLoading(false);
      }
    };

    // Call the transaction initiation function
    initiatePaynowTransaction();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-8 relative text-black"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
          >
            <FaTimes size={24} />
          </button>

          <h2 className="text-3xl font-bold mb-6 text-center text-black">
            Buy Tickets for {event.name}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block mb-2 font-semibold text-black">
                  Full Name *
                </label>
                <input 
                  type="text" 
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white border border-black text-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-semibold text-black">
                  Email *
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-white border border-black text-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 font-semibold text-black">
                Phone Number
              </label>
              <input 
                type="tel" 
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-black text-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Ticket Types Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-black text-left">Select Tickets</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {event.ticketTypes.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="bg-white border border-black rounded-lg p-3 text-left"
                  >
                    <div className="mb-1">
                      <h4 className="font-bold text-black text-sm">{ticket.name}</h4>
                      <p className="text-black text-xs">${ticket.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        type="button"
                        onClick={() => handleQuantityChange(ticket.id, ticketQuantities[ticket.id] - 1)}
                        className="bg-white border border-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                      >
                        <FaMinus className="text-black w-3 h-3" />
                      </button>
                      <span className="text-black text-sm">{ticketQuantities[ticket.id]}</span>
                      <button 
                        type="button"
                        onClick={() => handleQuantityChange(ticket.id, ticketQuantities[ticket.id] + 1)}
                        className="bg-white border border-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                      >
                        <FaPlus className="text-black w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Amount */}
            <div className="text-right text-xl font-bold text-black">
              Total: ${calculateTotal().toFixed(2)}
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
            >
              <FaTicketAlt />
              <span>Purchase Tickets</span>
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TicketPurchaseModal;
