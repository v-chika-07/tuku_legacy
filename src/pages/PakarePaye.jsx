import React from 'react';
import { motion } from 'framer-motion';
import { FaMusic, FaPalette, FaTheaterMasks, FaGraduationCap } from 'react-icons/fa';

const PakarePaye = () => {
  const artCenterFeatures = [
    {
      icon: <FaMusic />,
      title: 'Musical Heritage',
      description: 'A tribute to Oliver Mtukudzi\'s musical legacy, showcasing the rich musical traditions of Zimbabwe.'
    },
    {
      icon: <FaPalette />,
      title: 'Visual Arts',
      description: 'Hosting exhibitions and providing workspace for local artists to express their creativity.'
    },
    {
      icon: <FaTheaterMasks />,
      title: 'Cultural Performances',
      description: 'A venue for traditional and contemporary performances celebrating Zimbabwean culture.'
    },
    {
      icon: <FaGraduationCap />,
      title: 'Arts Education',
      description: 'Offering workshops, training, and mentorship for emerging artists and musicians.'
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Pakare Paye Art Center</h1>
            <p className="text-xl mb-8 text-white">
              A cultural sanctuary founded by Oliver Mtukudzi, dedicated to preserving and promoting 
              the rich artistic heritage of Zimbabwe through music, visual arts, and community engagement.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Center Description Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">About Pakare Paye</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Cultural Sanctuary</h3>
                <p className="mb-6 text-gray-800">
                  Located in Norton, Zimbabwe, Pakare Paye Art Center is more than just a venue. 
                  It is a living testament to Oliver Mtukudzi's vision of nurturing artistic talent 
                  and preserving cultural expression through creative platforms.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Artistic Mission</h3>
                <p className="mb-6 text-gray-800">
                  Named after Mtukudzi's iconic song "Pakare Paye" (meaning "Long Ago"), the center 
                  serves as a beacon of creativity, education, and cultural celebration, 
                  empowering artists and connecting communities through shared artistic experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {artCenterFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-white rounded-lg shadow-lg"
              >
                <div className="text-4xl text-accent mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Support the Arts</h2>
          <p className="text-xl text-white max-w-3xl mx-auto mb-8">
            Help us continue Oliver Mtukudzi's mission of empowering artists and preserving 
            Zimbabwe's rich cultural heritage.
          </p>
          <a 
            href="#" 
            className="bg-white text-black font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center justify-center hover:bg-gray-100"
          >
            Donate to Pakare Paye
          </a>
        </div>
      </section>
    </div>
  );
};

export default PakarePaye;
