import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaTimes, FaChevronDown } from 'react-icons/fa';

// Import all marathon images
import img1 from '../assets/Marathon_pictures/IMG-20250202-WA0005.jpg';
import img2 from '../assets/Marathon_pictures/IMG-20250202-WA0006.jpg';
import img3 from '../assets/Marathon_pictures/IMG-20250202-WA0007.jpg';
import img4 from '../assets/Marathon_pictures/IMG-20250202-WA0008.jpg';
import img5 from '../assets/Marathon_pictures/IMG-20250202-WA0009.jpg';
import img6 from '../assets/Marathon_pictures/IMG-20250202-WA0010.jpg';
import img7 from '../assets/Marathon_pictures/IMG-20250202-WA0011.jpg';
import img8 from '../assets/Marathon_pictures/IMG-20250202-WA0013.jpg';
import img9 from '../assets/Marathon_pictures/IMG-20250202-WA0015.jpg';
import img10 from '../assets/Marathon_pictures/IMG-20250202-WA0017.jpg';
import img11 from '../assets/Marathon_pictures/IMG-20250202-WA0019.jpg';
import img12 from '../assets/Marathon_pictures/IMG-20250202-WA0021.jpg';
import img13 from '../assets/Marathon_pictures/IMG-20250202-WA0023.jpg';
import img14 from '../assets/Marathon_pictures/IMG-20250203-WA0022.jpg';
import img15 from '../assets/Marathon_pictures/IMG-20250202-WA0027.jpg';
import img16 from '../assets/Marathon_pictures/IMG-20250202-WA0029.jpg';
import img17 from '../assets/Marathon_pictures/IMG-20250202-WA0031.jpg';
import img18 from '../assets/Marathon_pictures/IMG-20250202-WA0033.jpg';
import img19 from '../assets/Marathon_pictures/IMG-20250202-WA0035.jpg';
import img20 from '../assets/Marathon_pictures/IMG-20250202-WA0037.jpg';
import img21 from '../assets/Marathon_pictures/IMG-20250202-WA0039.jpg';
import img22 from '../assets/Marathon_pictures/IMG-20250202-WA0041.jpg';
import img23 from '../assets/Marathon_pictures/IMG-20250202-WA0043.jpg';
import img24 from '../assets/Marathon_pictures/IMG-20250202-WA0045.jpg';
import img25 from '../assets/Marathon_pictures/IMG-20250202-WA0047.jpg';
import img26 from '../assets/Marathon_pictures/IMG-20250202-WA0049.jpg';
import img27 from '../assets/Marathon_pictures/IMG-20250202-WA0051.jpg';
import img28 from '../assets/Marathon_pictures/IMG-20250202-WA0053.jpg';
import img29 from '../assets/Marathon_pictures/IMG-20250202-WA0055.jpg';
import img30 from '../assets/Marathon_pictures/IMG-20250202-WA0056.jpg';
import img31 from '../assets/Marathon_pictures/IMG-20250202-WA0058.jpg';
import img32 from '../assets/Marathon_pictures/IMG-20250202-WA0060.jpg';
import img33 from '../assets/Marathon_pictures/IMG-20250202-WA0062.jpg';
import img34 from '../assets/Marathon_pictures/IMG-20250202-WA0064.jpg';
import img35 from '../assets/Marathon_pictures/IMG-20250202-WA0066.jpg';
import img36 from '../assets/Marathon_pictures/IMG-20250202-WA0068.jpg';
import img37 from '../assets/Marathon_pictures/IMG-20250202-WA0070.jpg';
import img38 from '../assets/Marathon_pictures/IMG-20250202-WA0072.jpg';
import img39 from '../assets/Marathon_pictures/IMG-20250202-WA0074.jpg';
import img40 from '../assets/Marathon_pictures/IMG-20250202-WA0076.jpg';
import img41 from '../assets/Marathon_pictures/IMG-20250202-WA0078.jpg';
import img42 from '../assets/Marathon_pictures/IMG-20250202-WA0080.jpg';
import img43 from '../assets/Marathon_pictures/IMG-20250202-WA0082.jpg';
import img44 from '../assets/Marathon_pictures/IMG-20250202-WA0084.jpg';
import img45 from '../assets/Marathon_pictures/IMG-20250202-WA0086.jpg';
import img46 from '../assets/Marathon_pictures/IMG-20250202-WA0088.jpg';
import img47 from '../assets/Marathon_pictures/IMG-20250202-WA0090.jpg';
import img48 from '../assets/Marathon_pictures/IMG-20250202-WA0092.jpg';
import img49 from '../assets/Marathon_pictures/IMG-20250203-WA0001.jpg';
import img50 from '../assets/Marathon_pictures/IMG-20250203-WA0002.jpg';
import img51 from '../assets/Marathon_pictures/IMG-20250203-WA0007.jpg';
import img52 from '../assets/Marathon_pictures/IMG-20250203-WA0008.jpg';
import img53 from '../assets/Marathon_pictures/IMG-20250203-WA0009.jpg';
import img54 from '../assets/Marathon_pictures/IMG-20250203-WA0010.jpg';
import img55 from '../assets/Marathon_pictures/IMG-20250203-WA0011.jpg';
import img56 from '../assets/Marathon_pictures/IMG-20250203-WA0012.jpg';
import img57 from '../assets/Marathon_pictures/IMG-20250203-WA0013.jpg';
import img58 from '../assets/Marathon_pictures/IMG-20250203-WA0014.jpg';
import img59 from '../assets/Marathon_pictures/IMG-20250203-WA0015.jpg';
import img60 from '../assets/Marathon_pictures/IMG-20250203-WA0016.jpg';
import img61 from '../assets/Marathon_pictures/IMG-20250203-WA0017.jpg';
import img62 from '../assets/Marathon_pictures/IMG-20250203-WA0018.jpg';
import img63 from '../assets/Marathon_pictures/IMG-20250203-WA0019.jpg';
import img64 from '../assets/Marathon_pictures/IMG-20250203-WA0020.jpg';
import img65 from '../assets/Marathon_pictures/IMG-20250203-WA0021.jpg';
import img66 from '../assets/Marathon_pictures/IMG-20250203-WA0023.jpg';
import img67 from '../assets/Marathon_pictures/IMG-20250203-WA0024.jpg';
import img68 from '../assets/Marathon_pictures/IMG-20250203-WA0025.jpg';
import img69 from '../assets/Marathon_pictures/IMG-20250203-WA0026.jpg';
import img70 from '../assets/Marathon_pictures/IMG-20250203-WA0027.jpg';
import img71 from '../assets/Marathon_pictures/IMG-20250203-WA0028.jpg';
import img72 from '../assets/Marathon_pictures/IMG-20250203-WA0029.jpg';
import img73 from '../assets/Marathon_pictures/IMG-20250203-WA0030.jpg';
import img74 from '../assets/Marathon_pictures/IMG-20250203-WA0031.jpg';
import img75 from '../assets/Marathon_pictures/IMG-20250203-WA0032.jpg';
import img76 from '../assets/Marathon_pictures/IMG-20250203-WA0033.jpg';
import img77 from '../assets/Marathon_pictures/IMG-20250203-WA0034.jpg';
import img78 from '../assets/Marathon_pictures/IMG-20250203-WA0035.jpg';
import img79 from '../assets/Marathon_pictures/IMG-20250203-WA0036.jpg';
import img80 from '../assets/Marathon_pictures/IMG-20250203-WA0037.jpg';
import img81 from '../assets/Marathon_pictures/IMG-20250203-WA0038.jpg';
import img82 from '../assets/Marathon_pictures/IMG-20250203-WA0039.jpg';
import img83 from '../assets/Marathon_pictures/IMG-20250203-WA0040.jpg';
import img84 from '../assets/Marathon_pictures/IMG-20250203-WA0041.jpg';
import img85 from '../assets/Marathon_pictures/IMG-20250203-WA0042.jpg';
import img86 from '../assets/Marathon_pictures/IMG-20250203-WA0043.jpg';
import img87 from '../assets/Marathon_pictures/IMG-20250203-WA0044.jpg';
import img88 from '../assets/Marathon_pictures/IMG-20250203-WA0045.jpg';
import img89 from '../assets/Marathon_pictures/IMG-20250203-WA0046.jpg';
import img90 from '../assets/Marathon_pictures/IMG-20250203-WA0047.jpg';
import img91 from '../assets/Marathon_pictures/IMG-20250203-WA0051.jpg';

const MarathonGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 20;

  // Combine all images into one array
  const allImages = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
    img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
    img21, img22, img23, img24, img25, img26, img27, img28, img29, img30,
    img31, img32, img33, img34, img35, img36, img37, img38, img39, img40,
    img41, img42, img43, img44, img45, img46, img47, img48, img49, img50,
    img51, img52, img53, img54, img55, img56, img57, img58, img59, img60,
    img61, img62, img63, img64, img65, img66, img67, img68, img69, img70,
    img71, img72, img73, img74, img75, img76, img77, img78, img79, img80,
    img81, img82, img83, img84, img85, img86, img87, img88, img89, img90,
    img91
  ];
  
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
              Marathon Image {currentIndex + 1}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarathonGallery;
