import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaImage, FaArrowLeft, FaSave, FaCheck } from 'react-icons/fa';
import { db } from '../firebase/config.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Import all images from jpg_output directory
import { importAllImages } from '../utils/imageUtils';

// Import all images from jpg_output directory
import heroAmphitheatre from '../assets/jpg_output/outside1.jpg';
import heroCrowd from '../assets/jpg_output/stage 1.jpg';
import oliverPortrait from '../assets/jpg_output/Museum 1.jpg';
import nortonMap from '../assets/jpg_output/outside 3.jpg';
import warehouseConversion from '../assets/jpg_output/entrance.jpg';
import artistCollage from '../assets/jpg_output/Museum 2.jpg';
import interiorImage1 from '../assets/jpg_output/hall 1.jpg';
import interiorImage2 from '../assets/jpg_output/hall 2.jpg';
import exteriorImage2 from '../assets/jpg_output/outside 2.jpg';
import artistImage1 from '../assets/jpg_output/studio 7.jpg';
import aerialView from '../assets/jpg_output/stage 2.jpg';
import theatricalPerformance from '../assets/jpg_output/hall 2.jpg';
import filmScreening from '../assets/jpg_output/hall 1.jpg';
import formalBanquet from '../assets/jpg_output/conference room 1.jpg';
import businessMeeting from '../assets/jpg_output/conference room 2.jpg';
import studioSession from '../assets/jpg_output/studio 1.jpg';
import mixingDesk from '../assets/jpg_output/studio 2.jpg';
import guitarClass from '../assets/jpg_output/studio 4.jpg';
import marimbaClass from '../assets/jpg_output/studio 5.jpg';
import standardRoom from '../assets/jpg_output/bedroom 5.jpg';
import deluxeSuite from '../assets/jpg_output/couple room 2.jpg';
import bridalSuite from '../assets/jpg_output/2nd couple room 1.jpg';
import poolsideView from '../assets/jpg_output/outside sitting area 1.jpg';
import guestRoom from '../assets/jpg_output/outside guest room 2.jpg';
import daisysKitchen from '../assets/jpg_output/dining room 1.jpg';
import chefInAction from '../assets/jpg_output/dining room 3.jpg';
import guestsDining from '../assets/jpg_output/dining room 2.jpg';
import artExhibition from '../assets/jpg_output/Art.jpg';
import craftMarket from '../assets/jpg_output/sculptures 1.jpg';
import localArtists from '../assets/jpg_output/shop1.jpg';
import officeSpace from '../assets/jpg_output/reception.jpg';
import ticketingBooth from '../assets/jpg_output/Lobby1.jpg';
import landscapedLawns from '../assets/jpg_output/outside1.jpg';
import outdoorWedding from '../assets/jpg_output/outside 2.jpg';
import mentorSession from '../assets/jpg_output/studio 6.jpg';
import alumniPerformance from '../assets/jpg_output/studio 7.jpg';
import ndegaZvanguFestival from '../assets/jpg_output/stage 5.jpg';
import familyFunDay from '../assets/jpg_output/outside guest room 3.jpg';
import sundayConcert from '../assets/jpg_output/stage 3.jpg';
import tukuMarathon from '../assets/jpg_output/outside guest room 4.jpg';
import frontDesk from '../assets/jpg_output/reception.jpg';
import pakarePaye from '../assets/jpg_output/entrance.jpg';

const ImageManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [sectionImageSelections, setSectionImageSelections] = useState({});

  // Sections that use images (both main sections and sub-sections)
  const sections = [
    // Main Sections
    { id: 'hero', name: 'Hero Banner', imageCount: 1, description: 'The main banner at the top of the page' },
    { id: 'introduction', name: 'Introduction', imageCount: 2, description: 'The section introducing Pakare Paye with Dr. Oliver Mtukudzi image' },
    { id: 'our-story', name: 'Our Story', imageCount: 3, description: 'The section about the history of Pakare Paye' },
    { id: 'center-description', name: 'About Pakare Paye', imageCount: 2, description: 'The section describing the center facilities and mission' },
    { id: 'signature-events', name: 'Signature Events', imageCount: 4, description: 'The section showcasing signature events' },
    { id: 'history', name: 'History', imageCount: 2, description: 'The section about the history of Pakare Paye' },
    { id: 'notable-artists', name: 'Artists Nurtured at Pakare Paye', imageCount: 3, description: 'The section showcasing notable artists' },
    { id: 'booking', name: 'Booking & Contact', imageCount: 2, description: 'The section with booking information' },
    { id: 'mentorship', name: 'Mentorship Program', imageCount: 2, description: 'The section about the mentorship program' },
    { id: 'daisys-kitchen', name: 'Daisy\'s Kitchen', imageCount: 2, description: 'The restaurant at Pakare Paye' },
    { id: 'village-lodges', name: 'Pakare Paye Village Lodges', imageCount: 4, description: 'The accommodation facilities at Pakare Paye' },
    { id: 'conference-centre', name: 'Sam Mtukudzi Conference Centre', imageCount: 2, description: 'The conference facilities at Pakare Paye' },
    { id: 'indoor-auditorium', name: 'Indoor Auditorium', imageCount: 2, description: 'The indoor performance space at Pakare Paye' },
    { id: 'outdoor-amphitheatre', name: 'Outdoor Amphitheatre', imageCount: 2, description: 'The open-air performance venue at Pakare Paye' },
    { id: 'marathon', name: 'Tuku Marathon', imageCount: 8, description: 'Images from the Tuku Marathon event' },
    { id: 'core-values', name: 'Core Values', imageCount: 1, description: 'The section highlighting the core values of Pakare Paye' },
    { id: 'our-programmes', name: 'Our Programmes', imageCount: 2, description: 'The section showcasing the programmes offered at Pakare Paye' },
    { id: 'visit', name: 'Visit Pakare Paye', imageCount: 1, description: 'The section with information about visiting Pakare Paye' },
    { id: 'gallery', name: 'Gallery', imageCount: 4, description: 'Image gallery showcasing Pakare Paye' },
    
    // Sub-Sections
    { id: 'cultural-legacy', name: 'A Cultural Legacy', imageCount: 1, description: 'Sub-section about the cultural legacy of Pakare Paye' },
    { id: 'cultural-legacy-image', name: 'Cultural Legacy Image', imageCount: 1, description: 'The image in the Cultural Legacy section' },
    { id: 'musical-heritage', name: 'Musical Heritage', imageCount: 1, description: 'Sub-section about the musical heritage of Pakare Paye' },
    { id: 'cultural-performances', name: 'Cultural Performances', imageCount: 1, description: 'Sub-section about cultural performances at Pakare Paye' },
    { id: 'talent-development', name: 'Talent Development', imageCount: 1, description: 'Sub-section about talent development at Pakare Paye' },
    { id: 'warehouse-to-hub', name: 'From Warehouse to Cultural Hub', imageCount: 1, description: 'Sub-section about the transformation of Pakare Paye' },
    { id: 'community-engagement', name: 'Community Engagement', imageCount: 1, description: 'Sub-section about community engagement at Pakare Paye' },
    { id: 'cultural-sanctuary', name: 'Cultural Sanctuary', imageCount: 1, description: 'Sub-section about Pakare Paye as a cultural sanctuary' },
    { id: 'artistic-mission', name: 'Artistic Mission', imageCount: 1, description: 'Sub-section about the artistic mission of Pakare Paye' },
    { id: 'zimbabwean-cuisine', name: 'Authentic Zimbabwean Cuisine', imageCount: 1, description: 'Sub-section about the cuisine at Daisy\'s Kitchen' },
    { id: 'conference-facilities', name: 'Versatile Conference Facilities', imageCount: 1, description: 'Sub-section about the conference facilities at Pakare Paye' },
    { id: 'performance-space', name: 'Intimate Performance Space', imageCount: 1, description: 'Sub-section about the indoor performance space at Pakare Paye' },
    { id: 'open-air-venue', name: 'Open-Air Performance Venue', imageCount: 1, description: 'Sub-section about the outdoor amphitheatre at Pakare Paye' },
    { id: 'accommodation', name: 'Comfortable Accommodation', imageCount: 1, description: 'Sub-section about the accommodation at Pakare Paye' },
    { id: 'event-hosting', name: 'Event Hosting', imageCount: 1, description: 'Sub-section about event hosting at Pakare Paye' },
    { id: 'studio-time', name: 'Studio Time', imageCount: 1, description: 'Sub-section about recording studio services at Pakare Paye' },
    { id: 'booking-accommodation', name: 'Booking Accommodation', imageCount: 1, description: 'Sub-section about booking accommodation at Pakare Paye' },
    { id: 'tours-visits', name: 'Tours & Visits', imageCount: 1, description: 'Sub-section about tours and visits at Pakare Paye' },
    { id: 'mentorship-programme', name: 'Mentorship Programme', imageCount: 1, description: 'Sub-section about the mentorship programme at Pakare Paye' },
    { id: 'booking-options', name: 'Booking Options', imageCount: 1, description: 'Sub-section about booking options at Pakare Paye' },
    { id: 'contact-us', name: 'Contact Us', imageCount: 1, description: 'Sub-section with contact information for Pakare Paye' },
  ];

  useEffect(() => {
    // Load all images from the jpg_output directory and Marathon_pictures directory
    const loadImages = async () => {
      try {
        // Predefined images from jpg_output directory
        const predefinedImages = [
          { name: 'outside1.jpg', path: heroAmphitheatre, filename: 'outside1.jpg' },
          { name: 'stage 1.jpg', path: heroCrowd, filename: 'stage 1.jpg' },
          { name: 'Museum 1.jpg', path: oliverPortrait, filename: 'Museum 1.jpg' },
          { name: 'outside 3.jpg', path: nortonMap, filename: 'outside 3.jpg' },
          { name: 'entrance.jpg', path: warehouseConversion, filename: 'entrance.jpg' },
          { name: 'Museum 2.jpg', path: artistCollage, filename: 'Museum 2.jpg' },
          { name: 'hall 1.jpg', path: interiorImage1, filename: 'hall 1.jpg' },
          { name: 'hall 2.jpg', path: interiorImage2, filename: 'hall 2.jpg' },
          { name: 'outside 2.jpg', path: exteriorImage2, filename: 'outside 2.jpg' },
          { name: 'studio 7.jpg', path: artistImage1, filename: 'studio 7.jpg' },
          { name: 'stage 2.jpg', path: aerialView, filename: 'stage 2.jpg' },
          { name: 'conference room 1.jpg', path: formalBanquet, filename: 'conference room 1.jpg' },
          { name: 'conference room 2.jpg', path: businessMeeting, filename: 'conference room 2.jpg' },
          { name: 'studio 1.jpg', path: studioSession, filename: 'studio 1.jpg' },
          { name: 'studio 2.jpg', path: mixingDesk, filename: 'studio 2.jpg' },
          { name: 'studio 4.jpg', path: guitarClass, filename: 'studio 4.jpg' },
          { name: 'studio 5.jpg', path: marimbaClass, filename: 'studio 5.jpg' },
          { name: 'bedroom 5.jpg', path: standardRoom, filename: 'bedroom 5.jpg' },
          { name: 'couple room 2.jpg', path: deluxeSuite, filename: 'couple room 2.jpg' },
          { name: '2nd couple room 1.jpg', path: bridalSuite, filename: '2nd couple room 1.jpg' },
          { name: 'outside sitting area 1.jpg', path: poolsideView, filename: 'outside sitting area 1.jpg' },
          { name: 'outside guest room 2.jpg', path: guestRoom, filename: 'outside guest room 2.jpg' },
          { name: 'dining room 1.jpg', path: daisysKitchen, filename: 'dining room 1.jpg' },
          { name: 'dining room 3.jpg', path: chefInAction, filename: 'dining room 3.jpg' },
          { name: 'dining room 2.jpg', path: guestsDining, filename: 'dining room 2.jpg' },
          { name: 'Art.jpg', path: artExhibition, filename: 'Art.jpg' },
          { name: 'sculptures 1.jpg', path: craftMarket, filename: 'sculptures 1.jpg' },
          { name: 'shop1.jpg', path: localArtists, filename: 'shop1.jpg' },
          { name: 'reception.jpg', path: officeSpace, filename: 'reception.jpg' },
          { name: 'Lobby1.jpg', path: ticketingBooth, filename: 'Lobby1.jpg' },
          { name: 'studio 6.jpg', path: mentorSession, filename: 'studio 6.jpg' },
          { name: 'stage 5.jpg', path: ndegaZvanguFestival, filename: 'stage 5.jpg' },
          { name: 'outside guest room 3.jpg', path: familyFunDay, filename: 'outside guest room 3.jpg' },
          { name: 'stage 3.jpg', path: sundayConcert, filename: 'stage 3.jpg' },
          { name: 'outside guest room 4.jpg', path: tukuMarathon, filename: 'outside guest room 4.jpg' },
        ];

        // Load all marathon pictures using URL paths
        const marathonImages = [];
        
        // Include all marathon images from 5 to 98
        for (let i = 5; i <= 98; i++) {
          try {
            const paddedNum = i.toString().padStart(2, '0');
            const filename = `IMG-20250202-WA00${paddedNum}.jpg`;
            // Use URL to get the path to the image
            const imagePath = new URL(`../assets/Marathon_pictures/${filename}`, import.meta.url).href;
            marathonImages.push({
              name: `Marathon: ${filename}`,
              path: imagePath,
              filename: filename,
              category: 'marathon'
            });
          } catch (error) {
            console.warn(`Failed to load marathon image IMG-20250202-WA00${i.toString().padStart(2, '0')}.jpg:`, error);
          }
        }
        
        // For jpg_output images, we'll use a direct approach with all filenames
        try {
          // Complete list of all jpg_output filenames
          const jpgFilenames = [
            '2nd couple room 1.jpg', '2nd couple room 2.jpg', '2nd couple room 3.jpg', '2nd couple room 4.jpg',
            '2nd couple room 5.jpg', '2nd couple room 6.jpg', '2nd couple room 7.jpg', 'alcohol 1.jpg',
            'alcohol 2.jpg', 'Art.jpg', 'bar 2.jpg', 'bar 3.jpg', 'bar.jpg', 'bathroom 10.jpg',
            'bathroom 11.jpg', 'bathroom 12.jpg', 'bathroom 13.jpg', 'bathroom 1.jpg', 'bathroom 2.jpg',
            'bathroom 3.jpg', 'bathroom 4.jpg', 'bathroom 5.jpg', 'bathroom6.jpg', 'bathroom 7.jpg',
            'bathroom 8.jpg', 'bathroom 9.jpg', 'beauty bar.jpg', 'bedroom 2.jpg', 'bedroom 3.jpg',
            'bedroom 4.jpg', 'bedroom 5.jpg', 'bedroom 6.jpg', 'bedroom 7.jpg', 'bedroom 8.jpg',
            'bedroom 9.jpg', 'bedroom isnsuite 1.jpg', 'conference room 1.jpg', 'conference room 2.jpg',
            'conference room 3.jpg', 'couple romm 1.jpg', 'couple room 2.jpg', 'couple room 3.jpg',
            'couple room 4.jpg', 'couple room 6.jpg', 'couple room 7.jpg', 'dining room 1.jpg',
            'dining room 2.jpg', 'dining room 3.jpg', 'dining room 4.jpg', 'dining room 5.jpg',
            'dining room  6.jpg', 'entrance.jpg', 'hall 1.jpg', 'hall 2.jpg', 'hall 3.jpg',
            'hall 4.jpg', 'hall 5.jpg', 'hall 6.jpg', 'Lobby1.jpg', 'Lobby2.jpg', 'Lobby3.jpg',
            'lobby 4.jpg', 'lounge 1.jpg', 'lounge 2.jpg', 'Museum 1.jpg', 'Museum 2.jpg',
            'museum 4.jpg', 'museum 5.jpg', 'outside1.jpg', 'outside 2.jpg', 'outside 3.jpg',
            'outside 4.jpg', 'outside guest room 1.jpg', 'outside guest room 2.jpg', 'outside guest room 3.jpg',
            'outside guest room 4.jpg', 'outside guest room 5.jpg', 'outside sitting area 1.jpg',
            'reception.jpg', 'restaurant 1.jpg', 'restaurant 2.jpg', 'salon 1.jpg', 'salon 2.jpg',
            'salon 3.jpg', 'saloon 5.jpg', 'sculptures 1.jpg', 'shoe shop 1.jpg', 'shoe shop 2.jpg',
            'shoe shop 3.jpg', 'shoe shop 4.jpg', 'shoe shop 5.jpg', 'shoe shop 6.jpg', 'shoe shop 7.jpg',
            'shop1.jpg', 'shop 2.jpg', 'shop3.jpg', 'shop4.jpg', 'shop 5.jpg', 'shop 6.jpg',
            'sitting area 2.jpg', 'stage 1.jpg', 'stage 2.jpg', 'stage 3.jpg', 'stage 5.jpg',
            'studio 1.jpg', 'studio 2.jpg', 'studio 3.jpg', 'studio 4.jpg', 'studio 5.jpg',
            'studio 6.jpg', 'studio 7.jpg', 'studio.jpg'
          ];
          
          // Check if there are any jpg filenames not already in predefinedImages
          const existingFilenames = predefinedImages.map(img => img.filename);
          
          // For each filename not already in predefinedImages, add it
          for (const filename of jpgFilenames) {
            if (!existingFilenames.includes(filename)) {
              try {
                const imagePath = new URL(`../assets/jpg_output/${filename}`, import.meta.url).href;
                predefinedImages.push({
                  name: filename,
                  path: imagePath,
                  filename: filename,
                  category: 'jpg_output'
                });
              } catch (error) {
                console.warn(`Failed to load jpg_output image ${filename}:`, error);
              }
            }
          }
        } catch (error) {
          console.warn('Error loading additional jpg_output images:', error);
        }

        // Combine predefined images with marathon images
        const allImages = [...predefinedImages, ...marathonImages];
        setImages(allImages);
        setLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setLoading(false);
      }
    };

    // Load current image selections from Firestore
    const loadImageSelections = async () => {
      try {
        const docRef = doc(db, "settings", "imageSelections");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setSectionImageSelections(docSnap.data());
        } else {
          // Initialize with default selections
          const defaults = {};
          sections.forEach(section => {
            defaults[section.id] = Array(section.imageCount).fill(null);
          });
          setSectionImageSelections(defaults);
        }
      } catch (error) {
        console.error("Error loading image selections:", error);
      }
    };

    loadImages();
    loadImageSelections();
  }, []);

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
  };

  const handleImageSelect = (image, index) => {
    if (!selectedSection) {
      console.warn('No section selected');
      return;
    }
    
    console.log(`Selecting image ${image.filename} for section ${selectedSection.id} at index ${index}`);
    
    setSectionImageSelections(prev => {
      // Create a deep copy of the previous state
      const newSelections = JSON.parse(JSON.stringify(prev));
      
      // Initialize the array for this section if it doesn't exist
      if (!newSelections[selectedSection.id]) {
        newSelections[selectedSection.id] = Array(selectedSection.imageCount).fill(null);
      }
      
      // Ensure the array is large enough for the index
      while (newSelections[selectedSection.id].length <= index) {
        newSelections[selectedSection.id].push(null);
      }
      
      // Set the selection
      newSelections[selectedSection.id][index] = image.filename;
      
      console.log('Updated selections:', newSelections);
      return newSelections;
    });
  };

  const saveImageSelections = async () => {
    setSaving(true);
    try {
      // Log the data we're saving for debugging
      console.log('Saving selections:', sectionImageSelections);
      
      // Make sure we have a valid object to save
      if (!sectionImageSelections || Object.keys(sectionImageSelections).length === 0) {
        throw new Error('No selections to save');
      }
      
      // Create a clean copy of the selections to ensure no React state artifacts
      const selectionsToSave = JSON.parse(JSON.stringify(sectionImageSelections));
      
      // Save to Firestore
      await setDoc(doc(db, "settings", "imageSelections"), selectionsToSave, { merge: true });
      
      // Show success message
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
      // Reload the selections to confirm they were saved
      const docRef = doc(db, "settings", "imageSelections");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Saved selections retrieved:', docSnap.data());
      }
    } catch (error) {
      console.error("Error saving image selections:", error);
      alert(`Error saving image selections: ${error.message}. Please try again.`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-primary via-secondary to-accent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/admin" className="flex items-center text-white hover:text-white/80 transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
          <button 
            onClick={saveImageSelections}
            disabled={saving}
            className={`flex items-center px-4 py-2 rounded-lg ${saving ? 'bg-gray-500' : saveSuccess ? 'bg-green-500' : 'bg-white/20 hover:bg-white/30'} transition-colors text-white`}
          >
            {saving ? 'Saving...' : saveSuccess ? <><FaCheck className="mr-2" /> Saved</> : <><FaSave className="mr-2" /> Save Changes</>}
          </button>
        </div>

        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-4 rounded-full bg-black/20 backdrop-blur-sm mb-6"
          >
            <FaImage className="text-4xl text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Image Manager
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-lg"
          >
            Select images for each section of the website
          </motion.p>
        </div>

        {loading ? (
          <div className="text-center text-white">
            <p>Loading images...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sections List */}
            <div className="lg:col-span-1">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 text-white">
                <h2 className="text-xl font-semibold mb-4">Page Sections</h2>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => handleSectionSelect(section)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          selectedSection?.id === section.id
                            ? 'bg-accent text-white'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <div className="font-medium">{section.name}</div>
                        <div className="text-xs opacity-80">{section.imageCount} image{section.imageCount !== 1 ? 's' : ''}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Selection Area */}
            <div className="lg:col-span-3">
              {selectedSection ? (
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 text-white">
                  <h2 className="text-xl font-semibold mb-2">{selectedSection.name}</h2>
                  <p className="text-white/70 mb-6">{selectedSection.description}</p>
                  
                  {/* Current Selections */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-3">Current Selections</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Array.from({ length: selectedSection.imageCount }).map((_, index) => {
                        const selectedImage = sectionImageSelections[selectedSection.id]?.[index];
                        return (
                          <div key={index} className="bg-black/30 rounded-lg p-4 flex flex-col items-center">
                            <div className="text-sm text-white/60 mb-2">Image {index + 1}</div>
                            {selectedImage ? (
                              <div className="relative w-full h-40 rounded-lg overflow-hidden">
                                <img 
                                  src={images.find(img => img.filename === selectedImage)?.path || `/src/assets/jpg_output/${selectedImage}`} 
                                  alt={selectedImage}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-1 px-2 text-xs truncate">
                                  {selectedImage}
                                </div>
                              </div>
                            ) : (
                              <div className="w-full h-40 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
                                No image selected
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Image Selection */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Select Images</h3>
                    <div className="mb-4">
                      <p className="text-white/70 text-sm">
                        Click on an image to assign it to the current selection. Select which position to assign the image to first.
                      </p>
                    </div>
                    
                    {/* Position Selection */}
                    <div className="mb-6">
                      <h4 className="text-md font-medium mb-2">Select Position</h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: selectedSection.imageCount }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`px-3 py-1 rounded-lg text-sm ${
                              selectedImageIndex === index
                                ? 'bg-accent text-white'
                                : 'bg-white/10 hover:bg-white/20 text-white'
                            }`}
                          >
                            Image {index + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Image Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-2">
                      {images.map((image, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleImageSelect(image, selectedImageIndex)}
                          className="bg-black/20 rounded-lg overflow-hidden hover:ring-2 hover:ring-accent transition-all"
                        >
                          <div className="relative h-32">
                            <img 
                              src={image.path} 
                              alt={image.filename}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-1 px-2 text-xs truncate text-left">
                              {image.filename}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 text-white h-full flex items-center justify-center">
                  <div className="text-center">
                    <FaImage className="text-5xl mx-auto mb-4 text-white/40" />
                    <p className="text-white/70">Select a section to manage its images</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ImageManager;
