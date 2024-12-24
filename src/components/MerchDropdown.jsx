import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MerchDropdown = ({ isHovered, parentPath }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    let timeoutId;
    if (!isHovered) {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 2000); // 2 second delay before hiding
    } else {
      setIsVisible(true);
    }
    return () => clearTimeout(timeoutId);
  }, [isHovered]);

  const handleItemClick = () => {
    setIsVisible(false);
  };

  const menuItems = [
    { name: 'LEGACY', path: '/coming-soon' },
    { name: 'HAI-KOBO', path: '/coming-soon' },
    { name: 'MARATHON', path: '/marathon-merch' },
    { name: 'OMIFA', path: '/coming-soon' },
    { name: 'ARTWORK', path: '/coming-soon' }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-2 py-2 w-48 bg-gradient-to-r from-accent via-secondary to-primary rounded-lg shadow-xl z-50"
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Link
                to={item.path}
                className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                onClick={handleItemClick}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MerchDropdown;
