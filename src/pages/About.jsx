import React from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone, FaRunning, FaGlobe, FaHeart } from 'react-icons/fa';

const About = () => {
  const achievements = [
    {
      icon: <FaMicrophone />,
      title: "Musical Legacy",
      description: "67 albums released over nearly 50 years, establishing an unparalleled legacy in African music."
    },
    {
      icon: <FaGlobe />,
      title: "Cultural Impact",
      description: "Renowned African music icon and cultural ambassador, bridging communities through music."
    },
    {
      icon: <FaRunning />,
      title: "Health Advocacy",
      description: "Passionate advocate for health awareness and community wellness through cultural engagement."
    },
    {
      icon: <FaHeart />,
      title: "Community Spirit",
      description: "Dedicated to excellence, culture, and community wellness throughout his illustrious career."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-gradient-to-br from-primary via-secondary to-accent text-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">About Oliver "Tuku" Mtukudzi</h1>
            <p className="text-xl mb-8 text-white">
              A musical legend whose influence transcends generations, Oliver "Tuku" Mtukudzi's legacy continues 
              to inspire and unite communities through the power of music and cultural celebration.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Legacy Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Celebrating 50 Years of Tuku Music</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Musical Journey</h3>
                <p className="mb-6 text-gray-800">
                  With an impressive catalog of 67 albums spanning nearly five decades, Oliver Mtukudzi's 
                  music has been a powerful force for social change and cultural preservation. His unique 
                  sound, known as "Tuku Music," combines various traditional Zimbabwean styles with modern influences.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Cultural Impact</h3>
                <p className="mb-6 text-gray-800">
                  As a cultural ambassador, Tuku used his music as an educational tool and social catalyst, 
                  addressing important issues while celebrating Zimbabwe's rich cultural heritage. His 
                  influence extends far beyond music, inspiring positive change in communities worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-white rounded-lg shadow-lg"
              >
                <div className="text-4xl text-accent mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{achievement.title}</h3>
                <p className="text-gray-700">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marathon Connection */}
      <section className="py-16 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">The Marathon Legacy</h2>
            <p className="text-xl mb-8 text-white">
              The Oliver Mtukudzi Memorial Half Marathon reflects Tuku's personal love for running and his 
              dedication to excellence. As we celebrate 50 years of Tuku Music in 2025, this event stands as 
              a testament to his enduring impact on culture, health awareness, and community wellness.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
