import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import image1 from '../assets/images/IMG-20241218-WA0007.jpg';
import image2 from '../assets/images/IMG-20241218-WA0008.jpg';

const Contact = () => {
  return (
    <div className="pt-20 min-h-screen relative">
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
              Get in touch with us for any inquiries about the Tuku Legacy Half Marathon
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-text-light">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <FaPhone className="text-accent text-xl" />
                  <div>
                    <h3 className="font-bold text-text-light">Phone</h3>
                    <p className="text-text-light">+263 77 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaEnvelope className="text-accent text-xl" />
                  <div>
                    <h3 className="font-bold text-text-light">Email</h3>
                    <p className="text-text-light">info@tukulegacy.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaMapMarkerAlt className="text-accent text-xl" />
                  <div>
                    <h3 className="font-bold text-text-light">Location</h3>
                    <p className="text-text-light">Harare, Zimbabwe</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-text-light">Send a Message</h2>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-text-light placeholder-text-light/50 focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-text-light placeholder-text-light/50 focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <textarea
                    rows="4"
                    placeholder="Your Message"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-text-light placeholder-text-light/50 focus:outline-none focus:border-accent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent text-text-light py-3 px-6 rounded-lg hover:bg-primary transition-colors duration-300"
                >
                  Send Message
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
