import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaInfoCircle, FaCalendarAlt, FaMusic, FaTshirt, FaHandsHelping, FaEnvelope, FaSignOutAlt, FaRunning } from 'react-icons/fa';
import MerchDropdown from './MerchDropdown';
import { useAuth } from '../contexts/AuthContext';
import { logoutUser } from '../firebase/authService';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [nav, setNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMerchDropdown, setShowMerchDropdown] = useState(false);
  const location = useLocation();

  const links = [
    {
      id: 2,
      link: '/about',
      text: 'ABOUT',
      icon: <FaInfoCircle className="mb-1 mx-auto text-lg" />
    },
    {
      id: 3,
      link: '/events',
      text: 'EVENTS',
      icon: <FaCalendarAlt className="mb-1 mx-auto text-lg" />
    },
    {
      id: 4,
      link: '/merch',
      text: 'MERCH',
      icon: <FaTshirt className="mb-1 mx-auto text-lg" />,
      hasDropdown: true
    },
    {
      id: 5,
      link: '/marathon',
      text: 'MARATHON',
      icon: <FaRunning className="mb-1 mx-auto text-lg" />
    },
    {
      id: 6,
      link: '/omifa',
      text: 'OMIFA',
      icon: <FaHandsHelping className="mb-1 mx-auto text-lg" />
    },
    {
      id: 7,
      link: '/pakare-paye',
      text: 'PAKARE PAYE',
      icon: <FaMusic className="mb-1 mx-auto text-lg" />
    },
    {
      id: 8,
      link: '/contact',
      text: 'CONTACT',
      icon: <FaEnvelope className="mb-1 mx-auto text-lg" />
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full bg-gradient-to-r from-accent via-secondary to-primary text-white z-50 rounded-bl-3xl rounded-br-3xl ${isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'}`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <div>
          <Link to="/">
            <h1 className='text-3xl font-signature ml-2 text-white hover:text-white/80 transition-colors'>TUKU LEGACY</h1>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setNav(!nav)}>
            {nav ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-3 items-center">
          {links.map(({ id, link, text, icon, hasDropdown }) => (
            <li
              key={id}
              className='relative px-2 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-200'
              onMouseEnter={() => hasDropdown && setShowMerchDropdown(true)}
              onMouseLeave={() => hasDropdown && setShowMerchDropdown(false)}
            >
              <Link 
                to={link} 
                className={`text-white hover:text-white/80 transition-colors flex flex-col items-center ${location.pathname === link ? 'text-accent' : ''}`}
              >
                {icon}
                {text}
              </Link>
              {hasDropdown && (
                <MerchDropdown 
                  isHovered={showMerchDropdown} 
                  parentPath={link}
                />
              )}
            </li>
          ))}
          {isAuthenticated && (
            <li
              className='relative px-2 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-200'
            >
              <div 
                onClick={async () => {
                  const result = await logoutUser();
                  if (result.error) {
                    toast.error('Failed to log out');
                  } else {
                    toast.success('Logged out successfully');
                  }
                }}
                className={`text-white hover:text-white/80 transition-colors flex flex-col items-center cursor-pointer`}
              >
                <FaSignOutAlt className="mb-1 mx-auto text-lg" />
                LOGOUT
              </div>
            </li>
          )}
        </ul>

        {/* Mobile Navigation */}
        {nav && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-64 bg-gradient-to-r from-accent via-secondary to-primary p-8 md:hidden"
          >
            <ul className="space-y-6">
              {links.filter(link => link.link !== '/').map(({ id, link, text, icon }) => (
                <li key={id}>
                  <Link 
                    to={link} 
                    className="block text-white hover:text-white/80 flex items-center gap-3"
                    onClick={() => setNav(false)}
                  >
                    {icon}
                    {text}
                  </Link>
                </li>
              ))}
              {isAuthenticated && (
                <li>
                  <div 
                    onClick={async () => {
                      const result = await logoutUser();
                      if (result.error) {
                        toast.error('Failed to log out');
                      } else {
                        toast.success('Logged out successfully');
                        setNav(false);
                      }
                    }}
                    className="block text-white hover:text-white/80 flex items-center gap-3 cursor-pointer"
                  >
                    <FaSignOutAlt className="text-lg" />
                    LOGOUT
                  </div>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
