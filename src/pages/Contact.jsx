import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { submitContactForm } from '../firebase/services/contactService';
import { toast } from 'react-toastify';
import image1 from '../assets/images/IMG-20241218-WA0007.jpg';
import image2 from '../assets/images/IMG-20241218-WA0008.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-10 min-h-screen relative">
      {/* Background Images */}
      <div className="fixed inset-0 z-0">
        {/* Left Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute left-0 top-0 bottom-0 w-1/3"
        >
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundImage: `url(${image1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-primary" />
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute right-0 top-0 bottom-0 w-1/3"
        >
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundImage: `url(${image2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-primary/60 to-primary" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="relative z-10 container mx-auto py-12"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-light">Contact Us</h1>
            <p className="text-text-light text-lg">
              Get in touch with Tuku Music & Promotions Oct Ltd for any inquiries about the Oliver Mtukudzi Memorial Half Marathon
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-text-light text-center">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <FaPhone className="text-accent text-xl" />
                    <div className="text-center">
                      <h3 className="font-bold text-text-light">Phone</h3>
                      <p className="text-text-light">+263 772 388 112</p>
                      <p className="text-text-light">+263 781 110 655</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <FaEnvelope className="text-accent text-xl" />
                    <div className="text-center">
                      <h3 className="font-bold text-text-light">Email</h3>
                      <p className="text-text-light">info@tukumusic.africa</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <FaMapMarkerAlt className="text-accent text-xl" />
                    <div className="text-center">
                      <h3 className="font-bold text-text-light">Location</h3>
                      <p className="text-text-light">238 Galloway Rd, Norton</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10 text-center w-full">
                    <h3 className="font-bold text-text-light mb-2">Organization Details</h3>
                    <p className="text-text-light">Tuku Music & Promotions Oct Ltd</p>
                    <p className="text-text-light">Owner: Daisy K. Mtukudzi</p>
                    <p className="text-text-light text-sm italic mt-2">Visual Arts and related activities</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-text-light">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-text-light placeholder-text-light/50 focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-text-light placeholder-text-light/50 focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Your Message"
                    required
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-text-light placeholder-text-light/50 focus:outline-none focus:border-accent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-accent text-text-light py-3 px-6 rounded-lg hover:bg-primary transition-colors duration-300 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
