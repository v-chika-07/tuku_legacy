import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase/config.js';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { FaEnvelope, FaSpinner, FaReply, FaCheck } from 'react-icons/fa';
import ResponseDialog from '../components/ResponseDialog';
import { toast } from 'react-toastify';
import { sendResponseEmail } from '../firebase/services/emailService';

const MessageDetails = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    const messagesQuery = query(collection(db, 'contact_submissions'));
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching messages:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRespond = (message) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

  const handleSubmitResponse = async (response) => {
    setResponding(true);
    try {
      // Update Firebase
      const messageRef = doc(db, 'contact_submissions', selectedMessage.id);
      await updateDoc(messageRef, {
        response: response,
        read: true,
        respondedAt: new Date().toISOString()
      });

      // Send Email
      const emailResult = await sendResponseEmail(
        selectedMessage.name,
        selectedMessage.email,
        selectedMessage.message,
        response
      );

      if (!emailResult.success) {
        throw new Error('Failed to send email');
      }

      setIsDialogOpen(false);
      toast.success('Response sent successfully!');
    } catch (error) {
      console.error('Error handling response:', error);
      toast.error('Failed to send response. Please try again.');
    } finally {
      setResponding(false);
    }
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
            <FaEnvelope className="text-4xl text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Contact Messages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-lg"
          >
            View and respond to messages from users
          </motion.p>
        </div>

        {/* Messages List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <FaSpinner className="animate-spin text-4xl text-white" />
            </div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 text-white"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{message.name}</h3>
                    <p className="text-white/60">{message.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {message.read && (
                      <span className="flex items-center gap-1 text-green-300">
                        <FaCheck /> Responded
                      </span>
                    )}
                    {!message.read && (
                      <button
                        onClick={() => handleRespond(message)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
                      >
                        <FaReply />
                        Respond
                      </button>
                    )}
                  </div>
                </div>
                <div className="prose prose-invert">
                  <p className="text-white/80">{message.message}</p>
                  {message.response && (
                    <div className="mt-4 p-4 bg-white/10 rounded-lg">
                      <p className="text-sm text-white/60 mb-2">Your response:</p>
                      <p className="text-white/90">{message.response}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>

      <ResponseDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmitResponse}
        messageDetails={selectedMessage}
        isResponding={responding}
      />
    </div>
  );
};

export default MessageDetails;
