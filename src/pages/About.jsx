import React from 'react';
import { motion } from 'framer-motion';
import { FaMedal, FaUsers, FaHandshake, FaHeart } from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: <FaMedal />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from training programs to community events."
    },
    {
      icon: <FaUsers />,
      title: "Community",
      description: "Building strong relationships and fostering a supportive running community."
    },
    {
      icon: <FaHandshake />,
      title: "Integrity",
      description: "Maintaining the highest standards of professionalism and ethical conduct."
    },
    {
      icon: <FaHeart />,
      title: "Passion",
      description: "Sharing our love for running and inspiring others to achieve their goals."
    }
  ];

  const teamMembers = [
    {
      name: "John Smith",
      role: "Head Coach",
      description: "Former Olympic athlete with 15+ years of coaching experience."
    },
    {
      name: "Emily Brown",
      role: "Training Coordinator",
      description: "Certified running coach specializing in marathon training."
    },
    {
      name: "Michael Chen",
      role: "Community Manager",
      description: "Passionate runner and event organization specialist."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-zunzo-secondary text-white py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-gray-300">
              Founded in 2010, Zunzo Running Club has grown from a small group of 
              passionate runners to a thriving community dedicated to promoting health, 
              fitness, and the joy of running.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl text-zunzo-primary mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-zunzo-primary to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
                <p className="text-zunzo-primary text-center mb-4">{member.role}</p>
                <p className="text-gray-600 text-center">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-gradient-to-r from-zunzo-primary to-orange-600 py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl">
              To inspire and empower individuals through running, fostering a 
              community where every member can achieve their personal best while 
              building lasting friendships and promoting healthy lifestyles.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
