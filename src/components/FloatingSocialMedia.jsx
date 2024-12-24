import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaInstagram, 
  FaFacebook, 
  FaTwitter, 
  FaTiktok 
} from 'react-icons/fa';

const FloatingSocialMedia = () => {
  const socialLinks = [
    { 
      icon: FaInstagram, 
      color: 'bg-pink-500', 
      link: 'https://www.instagram.com/tuku.legacy' 
    },
    { 
      icon: FaFacebook, 
      color: 'bg-blue-600', 
      link: 'https://www.facebook.com/tuku.legacy' 
    },
    { 
      icon: FaTwitter, 
      color: 'bg-black', 
      link: 'https://www.x.com/tuku_legacy' 
    },
    { 
      icon: FaTiktok, 
      color: 'bg-gray-800', 
      link: 'https://www.tiktok.com/@tuku.legacy' 
    }
  ];

  const handleSocialClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="fixed left-8 bottom-8 z-40 flex flex-col space-y-2"
    >
      {socialLinks.map(({ icon: Icon, color, link }, index) => (
        <motion.button
          key={link}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => handleSocialClick(link)}
          className={`${color} text-white p-2 rounded-full shadow-lg hover:opacity-80 transition-all duration-300`}
        >
          <Icon size={12} />
        </motion.button>
      ))}
    </motion.div>
  );
};

export default FloatingSocialMedia;
