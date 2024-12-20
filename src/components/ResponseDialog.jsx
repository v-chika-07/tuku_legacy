import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSpinner } from 'react-icons/fa';

const ResponseDialog = ({ isOpen, onClose, onSubmit, messageDetails }) => {
  const [response, setResponse] = useState('');
  const [isResponding, setIsResponding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsResponding(true);
    onSubmit(response).finally(() => {
      setIsResponding(false);
      setResponse('');
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-gradient-to-br from-primary via-secondary to-accent p-6 rounded-2xl shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Respond to Message</h3>
              <p className="text-white/60">From: {messageDetails?.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          <div className="bg-black/20 rounded-lg p-4 mb-4">
            <p className="text-white/80">{messageDetails?.message}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your response..."
              className="w-full h-32 px-4 py-2 rounded-lg bg-black/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 mb-4 resize-none"
              required
            />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-black/30 hover:bg-black/40 text-white transition-colors font-medium"
                disabled={isResponding}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors font-medium flex items-center gap-2"
                disabled={isResponding}
              >
                {isResponding ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Response'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResponseDialog;
