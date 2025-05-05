import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  FaTrophy,
  FaCamera,
  FaTimes,
  FaQuoteLeft
} from 'react-icons/fa';

// Import selected marathon images
import img1 from '../assets/Marathon_pictures/IMG-20250203-WA0022.jpg';
import img2 from '../assets/Marathon_pictures/IMG-20250202-WA0007.jpg';
import img3 from '../assets/Marathon_pictures/IMG-20250202-WA0013.jpg';
import img4 from '../assets/Marathon_pictures/IMG-20250202-WA0019.jpg';
import img5 from '../assets/Marathon_pictures/IMG-20250202-WA0056.jpg';
import img6 from '../assets/Marathon_pictures/IMG-20250202-WA0031.jpg';
import img7 from '../assets/Marathon_pictures/IMG-20250202-WA0037.jpg';
import img8 from '../assets/Marathon_pictures/IMG-20250202-WA0045.jpg';
import img9 from '../assets/Marathon_pictures/IMG-20250202-WA0053.jpg';
import img10 from '../assets/Marathon_pictures/IMG-20250203-WA0001.jpg';
import img11 from '../assets/Marathon_pictures/IMG-20250203-WA0007.jpg';
import img12 from '../assets/Marathon_pictures/IMG-20250203-WA0019.jpg';
import img13 from '../assets/Marathon_pictures/IMG-20250203-WA0027.jpg';
import img14 from '../assets/Marathon_pictures/IMG-20250203-WA0047.jpg';
import img15 from '../assets/Marathon_pictures/IMG-20250203-WA0051.jpg';

const Marathon = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create separate image arrays for each section to avoid duplication
  const section1Images = [img1, img2, img3, img4, img5];
  const section2Images = [img6, img7, img8, img9, img10];
  const section3Images = [img11, img12, img13, img14, img15];
  
  // Combine all images into one array for the lightbox
  const marathonImages = [
    ...section1Images, ...section2Images, ...section3Images
  ];

  // Event details for the completed marathon
  const marathonEvent = {
    title: 'Oliver Mtukudzi Memorial Half Marathon (OM³)',
    date: 'February 2, 2025',
    location: 'Pakare Paye Arts Center, Norton, Zimbabwe',
    description: 'Thank you to everyone who participated in and supported the inaugural Oliver Mtukudzi Memorial Half Marathon (OM³). This event celebrated the life and legacy of Oliver Mtukudzi while promoting health awareness and community wellness. The event was a tremendous success, bringing together runners, music lovers, and community members in a day of celebration, athleticism, and cultural appreciation.',
  };

  // Testimonials from participants
  const testimonials = [
    {
      name: 'Tendai Moyo',
      quote: 'The Oliver Mtukudzi Memorial Half Marathon was more than just a race—it was a beautiful celebration of Tuku\'s legacy. Running to the sounds of his music was an experience I\'ll never forget.',
      role: 'Half Marathon Participant'
    },
    {
      name: 'Grace Chigumba',
      quote: 'What an incredible event! The community spirit was amazing, and it was wonderful to see so many people coming together to honor Tuku while promoting health and wellness.',
      role: 'Community Supporter'
    },
    {
      name: 'Samuel Banda',
      quote: 'As someone who grew up listening to Tuku\'s music, participating in this marathon was deeply meaningful. The organization was excellent, and the atmosphere was electric.',
      role: '10km Runner'
    }
  ];

  // Event highlights and achievements
  const eventHighlights = [
    {
      icon: <FaRunning />,
      title: 'Record Participation',
      description: 'Over 700 runners from across Zimbabwe and beyond participated in the event.'
    },
    {
      icon: <FaHeart />,
      title: 'Health Impact',
      description: 'Raised awareness about diabetes prevention and management through pre-race workshops and health screenings.'
    },
    {
      icon: <FaMusic />,
      title: 'Cultural Celebration',
      description: 'Featured live performances of Tuku classics that energized runners and spectators throughout the event.'
    },
    {
      icon: <FaTrophy />,
      title: 'Elite Competition',
      description: 'Attracted top runners who delivered impressive performances on the challenging Norton course.'
    },
    {
      icon: <FaUserFriends />,
      title: 'Community Unity',
      description: 'Brought together people from all walks of life in celebration of music, health, and community.'
    },
    {
      icon: <FaGlobe />,
      title: 'Global Reach',
      description: 'Participants from multiple countries joined in honoring Oliver Mtukudzi\'s legacy.'
    }
  ];

  const openLightbox = (index) => {
    setSelectedImage(marathonImages[index]);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? marathonImages.length - 1 : prevIndex - 1));
    setSelectedImage(marathonImages[(currentIndex === 0 ? marathonImages.length - 1 : currentIndex - 1)]);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === marathonImages.length - 1 ? 0 : prevIndex + 1));
    setSelectedImage(marathonImages[(currentIndex === marathonImages.length - 1 ? 0 : currentIndex + 1)]);
  };

  return (
    <div className="pt-20 bg-gradient-to-br from-primary via-secondary to-accent min-h-screen">
      {/* Hero Thank You Section */}
      <section className="relative py-16 bg-cover bg-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white max-w-[50rem] mx-auto">
              Thank You for Making the {marathonEvent.title} a Success!
            </h1>
            <div className="flex flex-wrap gap-6 justify-center text-white mb-6">
              <div className="flex items-center gap-2">
                <FaCalendar className="text-accent" />
                <span>{marathonEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-accent" />
                <span>{marathonEvent.location}</span>
              </div>
            </div>
            <p className="text-xl text-white mb-8 max-w-[50rem] mx-auto">
              {marathonEvent.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Images Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 text-primary"
          >
            Memorable Moments
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {section1Images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg shadow-lg aspect-square cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={image} 
                  alt={`Marathon moment ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <p className="text-white font-medium">Click to enlarge</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 text-primary"
          >
            Event Highlights
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-xl text-center"
              >
                <div className="text-4xl text-accent mb-4 flex justify-center">
                  {highlight.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">{highlight.title}</h3>
                <p className="text-gray-700">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* More Images */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {section2Images.map((image, index) => (
              <motion.div
                key={index + section1Images.length}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg shadow-lg aspect-square cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => openLightbox(index + section1Images.length)}
              >
                <img 
                  src={image} 
                  alt={`Marathon moment ${index + section1Images.length + 1}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <p className="text-white font-medium">Click to enlarge</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 text-white"
          >
            Participant Testimonials
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-white"
              >
                <div className="text-4xl text-white/30 mb-4 flex justify-center">
                  <FaQuoteLeft />
                </div>
                <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                <div className="text-right">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-white/80">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Images */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {section3Images.map((image, index) => (
              <motion.div
                key={index + section1Images.length + section2Images.length}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg shadow-lg aspect-square cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => openLightbox(index + section1Images.length + section2Images.length)}
              >
                <img 
                  src={image} 
                  alt={`Marathon moment ${index + section1Images.length + section2Images.length + 1}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <p className="text-white font-medium">Click to enlarge</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* View Full Gallery CTA */}
      <section className="py-16 bg-gradient-to-r from-accent to-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Want to See More?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Browse our complete gallery of photos from the Oliver Mtukudzi Memorial Half Marathon.  
          </p>
          <Link 
            to="/marathon-gallery" 
            className="inline-flex items-center bg-white text-primary font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100"
          >
            <FaCamera className="mr-2" /> View Full Gallery
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-3xl z-10 hover:text-accent transition-colors"
            >
              <FaTimes />
            </button>
            
            <button 
              onClick={goToPrevious}
              className="absolute left-4 text-white text-3xl z-10 hover:text-accent transition-colors"
            >
              <FaChevronLeft />
            </button>
            
            <button 
              onClick={goToNext}
              className="absolute right-4 text-white text-3xl z-10 hover:text-accent transition-colors"
            >
              <FaChevronRight />
            </button>
            
            <img 
              src={selectedImage} 
              alt="Enlarged marathon moment" 
              className="max-h-[85vh] max-w-[90vw] object-contain"
            />
            
            <p className="text-white mt-4 text-center">
              Image {currentIndex + 1} of {marathonImages.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marathon;
