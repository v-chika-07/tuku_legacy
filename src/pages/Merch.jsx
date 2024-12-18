import React from 'react';
import { motion } from 'framer-motion';
import { FaTshirt, FaRunning, FaGem } from 'react-icons/fa';

const Merch = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-text-light">Merchandise</h1>
          <p className="text-xl mb-12 text-text-light/90">
            Official Tuku Legacy merchandise and exclusive race gear.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaRunning className="text-4xl text-accent" />,
                title: "Race Gear",
                items: ["Race Day T-Shirt", "Running Shorts", "Performance Socks"]
              },
              {
                icon: <FaTshirt className="text-4xl text-accent" />,
                title: "Apparel",
                items: ["Tuku Legacy T-Shirts", "Hoodies", "Caps"]
              },
              {
                icon: <FaGem className="text-4xl text-accent" />,
                title: "Accessories",
                items: ["Water Bottles", "Wristbands", "Race Medals"]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 shadow-xl"
              >
                <div className="flex items-center justify-center mb-6">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold mb-4 text-text-light text-center">{category.title}</h2>
                <ul className="space-y-3 text-text-light/90">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Merch;
