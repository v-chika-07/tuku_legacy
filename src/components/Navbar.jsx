import React, { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaCalendarAlt, FaMusic, FaTshirt, FaHandsHelping, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: <FaHome className="mb-1 mx-auto text-lg" /> },
    { name: 'About', path: '/about', icon: <FaInfoCircle className="mb-1 mx-auto text-lg" /> },
    { name: 'Events', path: '/events', icon: <FaCalendarAlt className="mb-1 mx-auto text-lg" /> },
    { name: 'Music', path: '/music', icon: <FaMusic className="mb-1 mx-auto text-lg" /> },
    { name: 'Merch', path: '/merch', icon: <FaTshirt className="mb-1 mx-auto text-lg" /> },
    { name: 'OLIFA', path: '/olifa', icon: <FaHandsHelping className="mb-1 mx-auto text-lg" /> },
    { name: 'Contact', path: '/contact', icon: <FaEnvelope className="mb-1 mx-auto text-lg" /> }
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full bg-primary text-text-light z-50"
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-accent transition-colors">
            <span className="font-oswald font-bold text-2xl tracking-wider text-text-light hover:text-accent transition-colors">
              TUKU LEGACY
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className="text-text-light hover:text-accent transition-colors flex flex-col items-center"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-64 bg-primary p-8 md:hidden"
          >
            <ul className="space-y-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="block text-text-light hover:text-accent flex items-center gap-3"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
