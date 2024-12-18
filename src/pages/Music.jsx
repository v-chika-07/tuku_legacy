import React from 'react';
import { motion } from 'framer-motion';

const Music = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-text-light">Tuku Music Legacy</h1>
          <p className="text-xl mb-12 text-text-light/90">
            Celebrating the timeless music of Oliver Mtukudzi through performances and events.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-text-light">Featured Songs</h2>
              <ul className="space-y-4 text-text-light/90">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Neria</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Todii</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Hear Me Lord</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-text-light">Upcoming Performances</h2>
              <div className="space-y-6 text-text-light/90">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-semibold text-accent">Legacy Concert</h3>
                  <p className="mt-2">A tribute to Tuku's greatest hits</p>
                  <p className="text-sm mt-1">Date: Coming Soon</p>
                </div>
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-semibold text-accent">Youth Showcase</h3>
                  <p className="mt-2">Young artists performing Tuku's songs</p>
                  <p className="text-sm mt-1">Date: Coming Soon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Music;
