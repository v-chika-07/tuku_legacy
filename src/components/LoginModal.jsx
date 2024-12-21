import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginUser, registerUser } from '../firebase/authService';
import { toast } from 'react-toastify';

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = isLogin
        ? await loginUser(email, password)
        : await registerUser(email, password);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(isLogin ? 'Logged in successfully!' : 'Account created successfully!');
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden w-full max-w-md"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-primary opacity-80"></div>
        
        <div className="relative p-8">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-2 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-black/40 text-white border border-white/20 focus:border-white/50 focus:outline-none backdrop-blur-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-white mb-2 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-black/40 text-white border border-white/20 focus:border-white/50 focus:outline-none backdrop-blur-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white/10 backdrop-blur-sm text-white py-2 rounded hover:bg-white/20 transition-colors disabled:opacity-50 border border-white/20"
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
            </button>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
