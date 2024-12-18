import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaMedal, FaRunning, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import eventImage from '../assets/images/IMG-20241218-WA0005.jpg';

const Events = () => {
  const featuredEvent = {
    title: "Tuku Legacy Half Marathon",
    date: "March 23, 2024",
    time: "06:00 AM",
    location: "Norton, Zimbabwe",
    description: "Join us for the inaugural Tuku Legacy Half Marathon, celebrating the life and legacy of Oliver Mtukudzi. This scenic route takes runners through the heart of Norton, featuring live music and cultural performances along the way.",
    categories: ["21.1km Half Marathon", "10km Fun Run", "5km Family Walk"],
    highlights: [
      {
        icon: <FaMedal />,
        title: "Prize Money",
        description: "Over $5,000 in prize money across all categories"
      },
      {
        icon: <FaRunning />,
        title: "Route",
        description: "AIMS-certified course with water points every 2.5km"
      },
      {
        icon: <FaUsers />,
        title: "Entertainment",
        description: "Live bands and cultural performances along the route"
      }
    ]
  };

  const upcomingEvents = [
    {
      title: "Weekly Training Run",
      date: "Every Saturday",
      time: "05:30 AM",
      location: "Zunzo Club House",
      type: "Training"
    },
    {
      title: "Beginners Workshop",
      date: "January 15, 2024",
      time: "08:00 AM",
      location: "Zunzo Training Center",
      type: "Workshop"
    },
    {
      title: "Cross Country Series",
      date: "February 10, 2024",
      time: "07:00 AM",
      location: "Various Locations",
      type: "Competition"
    }
  ];

  return (
    <div className="pt-20">
      {/* Featured Event Hero Section */}
      <section className="relative py-20">
        {/* Background Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 right-0 w-full md:w-[60%] ml-auto"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${eventImage})`,
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/40" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <span className="inline-block bg-accent text-text-light px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Featured Event
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-light max-w-2xl">{featuredEvent.title}</h1>
            <div className="flex flex-wrap gap-6 text-text-light mb-6">
              <div className="flex items-center gap-2">
                <FaCalendar className="text-accent" />
                <span>{featuredEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-accent" />
                <span>{featuredEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-accent" />
                <span>{featuredEvent.location}</span>
              </div>
            </div>
            <p className="text-lg mb-8 max-w-2xl">{featuredEvent.description}</p>
            <div className="flex flex-wrap gap-4 mb-8">
              {featuredEvent.categories.map((category, index) => (
                <span 
                  key={index}
                  className="bg-white/10 px-4 py-2 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
            <Link to="/registration">
              <button className="bg-accent text-text-light px-8 py-4 rounded-2xl hover:bg-primary transition-colors duration-300 transform hover:scale-105">
                Register Now
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Event Highlights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredEvent.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 shadow-xl text-left"
              >
                <div className="text-4xl text-accent mb-4">
                  {highlight.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-text-light">{highlight.title}</h3>
                <p className="text-gray-800">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Route Map Placeholder */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Race Route</h2>
          <div className="bg-gray-200 rounded-xl h-[400px] flex items-center justify-center">
            <p className="text-gray-800">Interactive route map coming soon</p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-zunzo-secondary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">More Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 shadow-xl text-left"
              >
                <span className="inline-block bg-zunzo-primary text-white px-3 py-1 rounded-full text-sm mb-4">
                  {event.type}
                </span>
                <h3 className="text-xl font-bold mb-4 text-text-light">{event.title}</h3>
                <div className="space-y-2 text-text-light">
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-accent" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-accent" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-accent" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
