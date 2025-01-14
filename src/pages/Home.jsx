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
          className="relative h-screen flex items-center justify-center text-center bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl mx-4"
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 text-text-light px-4">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl font-bold mb-4 text-white"
            >
              The Oliver Mtukudzi Memorial Half Marathon (OM³)
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl mb-8 text-white"
            >
              Join us for an extraordinary celebration of music, wellness, and community
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Link
                to="/marathon"
                className="inline-block bg-accent hover:bg-accent-dark text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto px-4 py-16"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm">
            <video
              className="w-full aspect-video"
              controls
              preload="metadata"
              poster={image1}
            >
              <source src="/video/TOM3 promo.mp3" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

        {/* Features Section */}
        <section className="container mx-auto py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <FaMusic className="text-6xl text-white" />, 
                title: 'Musical Legacy', 
                description: "Celebrating 50 Years of Tuku Music in 2025, featuring the inspirational \"Wasakara\" as our theme song" 
              },
              { 
                icon: <FaCalendarAlt className="text-6xl text-white" />, 
                title: 'Health Awareness', 
                description: 'Empowering Global Health through diabetes awareness and promoting proactive health management' 
              },
              { 
                icon: <FaRunning className="text-6xl text-white" />, 
                title: 'Community Impact', 
                description: "Join us in preserving Tuku's legacy while fostering unity through culture and athleticism" 
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3, duration: 0.6 }}
                className={`text-center p-8 rounded-3xl shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300
                  ${index === 0 ? 'bg-gradient-to-br from-primary/80 to-secondary/80' : 
                    index === 1 ? 'bg-gradient-to-br from-secondary/80 to-accent/80' : 
                    'bg-gradient-to-br from-accent/80 to-primary/80'}`}
              >
                <div className="text-accent mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-100">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section Preview */}
        <section className="container mx-auto py-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/90 via-secondary/90 to-accent/90 p-8 rounded-3xl shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
          >
            <FaQuoteLeft className="text-white text-4xl mx-auto mb-6 opacity-80" />
            <blockquote className="text-2xl text-white mb-8 font-light italic">
              "The Oliver Mtukudzi Memorial Half Marathon honors the legacy of a musical icon while promoting health awareness and community wellness. Join us in celebrating Tuku's enduring impact on culture and society."
            </blockquote>
            <Link to="/about" className="inline-flex items-center text-white hover:text-accent transition-colors group">
              Learn more about Tuku's Legacy 
              <FaArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-accent to-primary py-16 rounded-3xl mx-4">
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
              <a href="https://onlinetickets.hypenation.co.zw/TheOliverMthukudziMemorialHalfMarathon2025" target="_blank" rel="noopener noreferrer">
                <button className="bg-text-light text-primary px-8 py-4 rounded-2xl 
                  hover:bg-secondary transition-colors duration-300 transform hover:scale-105 
                  font-bold text-lg">
                  Register for the Race
                </button>
              </a>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Home;
