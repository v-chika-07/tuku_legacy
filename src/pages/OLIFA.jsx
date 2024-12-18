import React from 'react';
import { motion } from 'framer-motion';
import { FaRunning, FaTrophy, FaGraduationCap } from 'react-icons/fa';

const OLIFA = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-text-light">OLIFA</h1>
          <p className="text-xl mb-12 text-text-light/90">
            Supporting and nurturing young athletic talent in Zimbabwe through the Oliver Mtukudzi Foundation.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 shadow-xl"
            >
              <div className="flex items-center justify-center mb-6">
                <FaGraduationCap className="text-4xl text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-6 text-text-light text-center">Our Mission</h2>
              <div className="space-y-4 text-text-light/90">
                <p className="leading-relaxed">
                  OLIFA aims to discover, develop, and support young athletic talent across Zimbabwe, 
                  providing opportunities for growth and excellence in sports.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Talent identification programs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Professional coaching support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Educational scholarships</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 shadow-xl"
            >
              <div className="flex items-center justify-center mb-6">
                <FaTrophy className="text-4xl text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-6 text-text-light text-center">Success Stories</h2>
              <div className="space-y-6 text-text-light/90">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-semibold text-accent">Youth Development</h3>
                  <p className="mt-2">Supporting over 100 young athletes across various sports disciplines</p>
                </div>
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-semibold text-accent">Competition Success</h3>
                  <p className="mt-2">Multiple national and regional championship victories</p>
                </div>
                <div className="pb-4">
                  <h3 className="font-semibold text-accent">Education Support</h3>
                  <p className="mt-2">Providing scholarships for talented young athletes</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 shadow-xl"
          >
            <div className="flex items-center justify-center mb-6">
              <FaRunning className="text-4xl text-accent" />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-text-light text-center">Get Involved</h2>
            <div className="text-center text-text-light/90">
              <p className="mb-6">Join us in supporting the next generation of athletic talent.</p>
              <button className="bg-accent hover:bg-accent/80 text-text-light px-8 py-3 rounded-full transition-colors">
                Support OLIFA
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OLIFA;
