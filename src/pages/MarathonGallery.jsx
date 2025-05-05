import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaTimes, FaChevronDown } from 'react-icons/fa';

// Dynamically import all marathon images
function importAll(r) {
  return r.keys().map(r);
}

// Use webpack's require.context to import all images from the Marathon_pictures directory
const marathonImages = importAll(require.context('../assets/Marathon_pictures', false, /\.(png|jpe?g|svg)$/));

const MarathonGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 20;

  // Sort the images to ensure consistent order
  const allImages = [...marathonImages].sort((a, b) => {
    // Extract filenames for sorting
    const fileA = a.split('/').pop();
    const fileB = b.split('/').pop();
    return fileA.localeCompare(fileB);
  });
  
  // Load images in batches
  useEffect(() => {
    const startIndex = 0;
    const endIndex = Math.min(currentPage * imagesPerPage, allImages.length);
    setVisibleImages(allImages.slice(startIndex, endIndex));
  }, [currentPage, allImages.length]);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? allImages.length - 1 : prevIndex - 1));
    setSelectedImage(allImages[(currentIndex === 0 ? allImages.length - 1 : currentIndex - 1)]);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === allImages.length - 1 ? 0 : prevIndex + 1));
    setSelectedImage(allImages[(currentIndex === allImages.length - 1 ? 0 : currentIndex + 1)]);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Oliver Mtukudzi Memorial Half Marathon Gallery
          </h1>
          <p className="text-xl text-white max-w-4xl mx-auto">
            Relive the memories of the inaugural Oliver Mtukudzi Memorial Half Marathon (OM³) held on February 2, 2025.
            Browse through our collection of photos capturing the spirit, energy, and community of this special event.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.03, 1) }}
              className="relative overflow-hidden rounded-lg shadow-lg aspect-square cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => openLightbox(image, index)}
            >
              <img 
                src={image} 
                alt={`Marathon moment ${index + 1 + ((currentPage - 1) * imagesPerPage)}`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>
        
        {/* Load More Button */}
        {currentPage * imagesPerPage < allImages.length && (
          <div className="flex justify-center mt-8">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="bg-accent hover:bg-accent/80 text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-colors"
            >
              <span>Load More</span>
              <FaChevronDown />
            </motion.button>
          </div>
        )}
      </div>

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
              <FaArrowLeft />
            </button>
            
            <button 
              onClick={goToNext}
              className="absolute right-4 text-white text-3xl z-10 hover:text-accent transition-colors"
            >
              <FaArrowRight />
            </button>
            
            <img 
              src={selectedImage} 
              alt="Enlarged marathon moment" 
              className="max-h-[85vh] max-w-[90vw] object-contain"
            />
            
            <p className="text-white mt-4 text-center">
              Image {currentIndex + 1} of {allImages.length}
            </p>
            <p className="text-white mt-2 text-sm text-center opacity-70">
              {allImages[currentIndex].split('/').pop()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarathonGallery;
