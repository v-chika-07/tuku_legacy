import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaCalendar, 
  FaMapMarkerAlt, 
  FaRunning, 
  FaChevronLeft, 
  FaChevronRight,
  FaHeart,
  FaGlobe,
  FaMusic,
  FaUserFriends,
  FaClock
} from 'react-icons/fa';

// Import marathon images
import marathonImage1 from '../assets/images/IMG-20241218-WA0005.jpg';
import marathonImage2 from '../assets/images/IMG-20241218-WA0006.jpg';
import marathonImage3 from '../assets/images/IMG-20241218-WA0007.jpg';
import marathonImage4 from '../assets/images/IMG-20241218-WA0008.jpg';
import marathonImage5 from '../assets/images/marathon-vest-green.jpg';

const Marathon = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Marathon Event Details
  const marathonEvent = {
    title: 'Oliver Mtukudzi Memorial Half Marathon (OM³)',
    date: 'February 2, 2025',
    time: '06:00 AM',
    location: 'Pakare Paye Arts Center, Norton, Zimbabwe',
    description: 'Join us for the inaugural Oliver Mtukudzi Memorial Half Marathon (OM³), celebrating the life and legacy of Oliver Mtukudzi. This event marks the 50 Years of Tuku Music celebration in 2025, featuring live performances of Tuku classics, including the inspirational "Wasakara" theme song, while promoting health awareness and community wellness.',
    categories: ['Half Marathon', 'Tuku Music Tribute', 'Community Wellness'],
    highlights: [
      {
        icon: <FaRunning />,
        title: 'Half Marathon Route',
        description: 'A challenging 21.1 km route through scenic Norton landscapes.'
      },
      {
        icon: <FaMusic />,
        title: 'Tuku Music Celebration',
        description: 'Live performances of Oliver Mtukudzi\'s classic songs.'
      },
      {
        icon: <FaHeart />,
        title: 'Community Impact',
        description: 'Raising awareness for health and diabetes prevention.'
      }
    ]
  };

  const marathonImages = [
    marathonImage1,
    marathonImage2,
    marathonImage3,
    marathonImage4,
    marathonImage5
  ];

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 2 >= marathonImages.length 
        ? 0 
        : prevIndex + 2
    );
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 2 < 0 
        ? marathonImages.length - (marathonImages.length % 2 === 0 ? 2 : 1)
        : prevIndex - 2
    );
  };

  useEffect(() => {
    if (!isHovered) {
      const autoScrollInterval = setInterval(() => {
        handleNextSlide();
      }, 5000);

      return () => clearInterval(autoScrollInterval);
    }
  }, [isHovered]);

  // Countdown Timer Logic
  useEffect(() => {
    const targetDate = new Date('2025-02-02T00:00:00+02:00');
    const currentTime = new Date('2024-12-27T18:50:00+02:00');

    const updateCountdown = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    };

    // Initial update
    updateCountdown();

    // Set up interval to update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(countdownInterval);
  }, []);

  const marathonDetails = [
    {
      icon: <FaCalendar />,
      title: 'Date',
      description: 'February 2, 2025, 6:00 AM'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      description: 'Pakare Paye Arts Center, Norton, Zimbabwe'
    },
    {
      icon: <FaRunning />,
      title: 'Categories',
      description: '21km Half Marathon, 10km Fun Run, 5km Walk'
    }
  ];

  const marathonImpact = [
    {
      icon: <FaHeart />,
      title: 'Health Awareness',
      description: 'Raising consciousness about diabetes and promoting holistic wellness.'
    },
    {
      icon: <FaGlobe />,
      title: 'Community Unity',
      description: 'Bringing together people from diverse backgrounds through a shared passion.'
    },
    {
      icon: <FaMusic />,
      title: 'Cultural Celebration',
      description: 'Honoring Oliver Mtukudzi\'s legacy through athletic and cultural expression.'
    },
    {
      icon: <FaUserFriends />,
      title: 'Social Impact',
      description: 'Supporting local communities and inspiring positive social change.'
    }
  ];

  return (
    <div className="pt-10 bg-gradient-to-br from-primary via-secondary to-accent min-h-screen">
      {/* Featured Marathon Section */}
      <section 
        className="relative py-20 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${marathonImage1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white max-w-[50rem] mx-auto">
              {marathonEvent.title}
            </h1>
            {/* Countdown Timer */}
            <div className="flex justify-center space-x-4 mb-6">
              <div className="text-center">
                <span className="text-lg font-semibold text-white">{countdown.days}</span>
                <p className="text-xs text-gray-300">Days</p>
              </div>
              <div className="text-center">
                <span className="text-lg font-semibold text-white">{countdown.hours}</span>
                <p className="text-xs text-gray-300">Hours</p>
              </div>
              <div className="text-center">
                <span className="text-lg font-semibold text-white">{countdown.minutes}</span>
                <p className="text-xs text-gray-300">Minutes</p>
              </div>
              <div className="text-center">
                <span className="text-lg font-semibold text-white">{countdown.seconds}</span>
                <p className="text-xs text-gray-300">Seconds</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 justify-center text-white mb-6">
              <div className="flex items-center gap-2">
                <FaCalendar className="text-accent" />
                <span>{marathonEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-accent" />
                <span>{marathonEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-accent" />
                <span>{marathonEvent.location}</span>
              </div>
            </div>
            <p className="text-lg text-white mb-8 max-w-[50rem] mx-auto">
              {marathonEvent.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {marathonEvent.categories.map((category, index) => (
                <span 
                  key={index}
                  className="bg-white/10 px-4 py-2 rounded-full text-sm text-white"
                >
                  {category}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <a 
                href="https://onlinetickets.hypenation.co.zw/TheOliverMthukudziMemorialHalfMarathon2025" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-accent hover:bg-accent-dark text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                Register Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marathon Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Marathon Highlights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {marathonEvent.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-100 backdrop-blur-sm p-6 rounded-lg border border-gray-200 shadow-xl text-left"
              >
                <div className="text-4xl text-accent mb-4">
                  {highlight.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">{highlight.title}</h3>
                <p className="text-black">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marathon Gallery Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Marathon Gallery</h2>
          <div 
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex items-center justify-center space-x-4">
              <button 
                onClick={handlePrevSlide}
                className="text-white text-2xl p-2 hover:bg-white/20 rounded-full transition"
              >
                <FaChevronLeft />
              </button>
              
              <div className="grid grid-cols-2 gap-4 w-full">
                <AnimatePresence mode="wait">
                  {marathonImages
                    .slice(currentIndex, currentIndex + 2)
                    .map((image, index) => (
                      <motion.div
                        key={currentIndex + index}
                        className="relative"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: 1,
                          transition: {
                            duration: 1,
                            ease: "easeInOut"
                          }
                        }}
                        exit={{ 
                          opacity: 0,
                          transition: {
                            duration: 1,
                            ease: "easeInOut"
                          }
                        }}
                      >
                        <motion.img 
                          src={image}
                          alt={`Marathon Image ${currentIndex + index + 1}`}
                          className="w-full h-48 md:h-64 object-cover rounded-lg cursor-pointer"
                          onClick={() => setSelectedImage(image)}
                          whileHover={{ scale: 1.05 }}
                        />
                      </motion.div>
                    ))
                  }
                </AnimatePresence>
              </div>
              
              <button 
                onClick={handleNextSlide}
                className="text-white text-2xl p-2 hover:bg-white/20 rounded-full transition"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About the Marathon Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">About the Marathon</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Marathon Vision</h3>
                <p className="mb-6 text-gray-800">
                  More than just a race, the Oliver Mtukudzi Memorial Half Marathon 
                  embodies the spirit of unity, health, and cultural celebration. 
                  By bringing together runners from all walks of life, we honor Tuku's 
                  legacy of community and wellness.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Community Impact</h3>
                <p className="mb-6 text-gray-800">
                  Each step taken in this marathon contributes to raising awareness about 
                  diabetes and supporting local health initiatives. We transform athletic 
                  achievement into a powerful platform for social change and collective healing.
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <a 
                href="https://onlinetickets.hypenation.co.zw/TheOliverMthukudziMemorialHalfMarathon2025" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-black font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center justify-center hover:bg-gray-100"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Marathon Details Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {marathonDetails.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-white rounded-lg shadow-lg"
              >
                <div className="text-4xl text-accent mb-4">
                  {detail.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{detail.title}</h3>
                <p className="text-gray-700">{detail.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marathon Impact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Marathon Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {marathonImpact.map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-gray-50 rounded-lg shadow-md"
              >
                <div className="text-4xl text-accent mb-4">
                  {impact.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{impact.title}</h3>
                <p className="text-gray-700">{impact.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img 
            src={selectedImage}
            alt="Selected Marathon Image"
            className="max-w-full max-h-full object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </div>
  );
};

export default Marathon;
