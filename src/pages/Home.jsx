import React from 'react';
import { motion } from 'framer-motion';
import { FaMusic, FaTshirt, FaRunning, FaCalendarAlt, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import image1 from '../assets/images/IMG-20241218-WA0005.jpg';
import image2 from '../assets/images/IMG-20241218-WA0006.jpg';
import image3 from '../assets/images/IMG-20241218-WA0007.jpg';
import image4 from '../assets/images/IMG-20241218-WA0008.jpg';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Blended Mural Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div className="relative overflow-hidden">
            <motion.div 
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${image1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-transparent mix-blend-multiply" />
          </div>
          <div className="relative overflow-hidden">
            <motion.div 
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${image2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-bl from-primary/60 to-transparent mix-blend-multiply" />
          </div>
          <div className="relative overflow-hidden">
            <motion.div 
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, delay: 0.4 }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${image3})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-transparent mix-blend-multiply" />
          </div>
          <div className="relative overflow-hidden">
            <motion.div 
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${image4})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/60 to-transparent mix-blend-multiply" />
          </div>
        </div>
        {/* Overall gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary/60 mix-blend-multiply" />
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="relative z-10 pt-20"
      >
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-screen flex items-center justify-center text-center bg-gradient-to-br from-primary via-secondary to-accent"
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 text-text-light px-4">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              TUKU LEGACY HALF MARATHON
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8"
            >
              Celebrating Music, Culture & Running Excellence
            </motion.p>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link to="/registration">
                <button className="bg-accent text-text-light px-8 py-4 rounded-2xl hover:bg-accent/80 transition-colors duration-300 transform hover:scale-105">
                  Register Now
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <section className="container mx-auto py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <FaMusic className="text-6xl" />, 
                title: 'Live Music', 
                description: 'Experience the best of Tuku Music' 
              },
              { 
                icon: <FaTshirt className="text-6xl" />, 
                title: 'Exclusive Merch', 
                description: 'Limited edition race merchandise' 
              },
              { 
                icon: <FaRunning className="text-6xl" />, 
                title: 'OLIFA Support', 
                description: 'Supporting young athletic talent' 
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3, duration: 0.6 }}
                className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-accent mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">{feature.title}</h3>
                <p className="text-white text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="bg-primary text-text-light py-20">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Join Tuku Legacy Half Marathon?</h2>
                <p className="text-white mb-6">
                  The Tuku Legacy Half Marathon is more than just a race. It's a celebration of music, 
                  culture, and athletic excellence, honoring the legendary Oliver Mtukudzi while supporting 
                  young athletic talent through OLIFA.
                </p>
                <ul className="space-y-4">
                  {[
                    "Live performances of Tuku Music classics",
                    "Exclusive race merchandise and memorabilia",
                    "Support for young athletes through OLIFA",
                    "Scenic route through historic locations"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-2"
                    >
                      <FaArrowRight className="text-accent" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-accent to-accent/60 p-1 rounded-2xl"
              >
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl">
                  <div className="text-center mb-8">
                    <FaQuoteLeft className="text-4xl text-accent mx-auto mb-4" />
                    <p className="text-xl italic mb-6">
                      "The Tuku Legacy Half Marathon combines the spirit of running with 
                      the soul of music. It's an experience that celebrates both athletic 
                      achievement and cultural heritage."
                    </p>
                    <p className="text-accent font-bold">- Sam Mataure</p>
                    <p className="text-secondary">Race Director</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-accent to-primary py-16">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Be Part of Something Special?
              </h2>
              <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
                Join us for an unforgettable experience that combines the thrill of running 
                with the magic of Tuku's musical legacy.
              </p>
              <Link to="/registration">
                <button className="bg-text-light text-primary px-8 py-4 rounded-2xl 
                  hover:bg-secondary transition-colors duration-300 transform hover:scale-105 
                  font-bold text-lg">
                  Register for the Race
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Home;
