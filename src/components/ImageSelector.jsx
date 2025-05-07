import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config.js';
import { doc, getDoc } from 'firebase/firestore';

// Import all images for direct reference
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

// Create a map of filenames to imported images
// Create a map of filenames to imported images
let imageMap = {
  // Hero and Introduction
  'outside1.jpg': heroAmphitheatre,
  'stage 1.jpg': heroCrowd,
  'Museum 1.jpg': oliverPortrait,
  'outside 3.jpg': nortonMap,
  
  // Our Story
  'entrance.jpg': warehouseConversion,
  'Museum 2.jpg': artistCollage,
  'hall 1.jpg': interiorImage1,
  'hall 2.jpg': interiorImage2,
  'outside 2.jpg': exteriorImage2,
  'studio 7.jpg': artistImage1,
  
  // Outdoor Amphitheatre
  'stage 2.jpg': aerialView,
  
  // Indoor Auditorium
  // Using variables directly to avoid duplicate keys
  // We already have 'hall 1.jpg' and 'hall 2.jpg' defined above
  
  // Conference Centre
  'conference room 1.jpg': formalBanquet,
  'conference room 2.jpg': businessMeeting,
  
  // Recording Studio
  'studio 1.jpg': studioSession,
  'studio 2.jpg': mixingDesk,
  
  // Training Classrooms
  'studio 4.jpg': guitarClass,
  'studio 5.jpg': marimbaClass,
  
  // Accommodation
  'bedroom 5.jpg': standardRoom,
  'couple room 2.jpg': deluxeSuite,
  '2nd couple room 1.jpg': bridalSuite,
  'outside sitting area 1.jpg': poolsideView,
  'outside guest room 2.jpg': guestRoom,
  
  // Dining
  'dining room 1.jpg': daisysKitchen,
  'dining room 3.jpg': chefInAction,
  'dining room 2.jpg': guestsDining,
  
  // Gallery
  'Art.jpg': artExhibition,
  'sculptures 1.jpg': craftMarket,
  'shop1.jpg': localArtists,
  
  // Admin
  'reception.jpg': officeSpace,
  'Lobby1.jpg': ticketingBooth,
  
  // Mentorship
  'studio 6.jpg': mentorSession,
  
  // Events
  'stage 5.jpg': ndegaZvanguFestival,
  'outside guest room 3.jpg': familyFunDay,
  
  // Community
  'stage 3.jpg': sundayConcert,
  'outside guest room 4.jpg': tukuMarathon
};

// Add all marathon pictures to the imageMap using URL paths
// This works in both development and production environments
for (let i = 5; i <= 98; i++) { // Include all images from 5 to 98
  const paddedNum = i.toString().padStart(2, '0');
  const filename = `IMG-20250202-WA00${paddedNum}.jpg`;
  try {
    // Use a relative URL path that will be resolved at runtime
    imageMap[filename] = new URL(`../assets/Marathon_pictures/${filename}`, import.meta.url).href;
  } catch (error) {
    console.warn(`Failed to load marathon image ${filename}:`, error);
  }
}

/**
 * A component that selects images based on settings from Firestore
 * 
 * @param {Object} props
 * @param {string} props.sectionId - The ID of the section to get images for
 * @param {number} props.index - The index of the image to get (if multiple images in section)
 * @param {string} props.defaultImage - The default image path to use if no selection is found
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.className - Additional CSS classes for the image
 */
const ImageSelector = ({ sectionId, index = 0, defaultImage, alt, className = '' }) => {
  const [imagePath, setImagePath] = useState(defaultImage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImageSelection = async () => {
      try {
        console.log(`Loading image selection for section: ${sectionId}, index: ${index}`);
        const docRef = doc(db, "settings", "imageSelections");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const selections = docSnap.data();
          console.log(`Found selections:`, selections);
          
          if (selections[sectionId] && 
              Array.isArray(selections[sectionId]) && 
              selections[sectionId].length > index && 
              selections[sectionId][index]) {
            
            const selectedFilename = selections[sectionId][index];
            console.log(`Selected filename: ${selectedFilename}`);
            
            // Check if we have this image in our map
            if (imageMap[selectedFilename]) {
              console.log(`Found image in map: ${selectedFilename}`);
              setImagePath(imageMap[selectedFilename]);
            } else {
              // Fallback to the default image
              console.warn(`Image ${selectedFilename} not found in imageMap, using default`);
              setImagePath(defaultImage);
            }
          } else {
            // No selection for this section/index, use default
            console.log(`No selection found for ${sectionId}[${index}], using default`);
            setImagePath(defaultImage);
          }
        } else {
          // No selections document exists, use default
          console.log('No selections document exists, using default');
          setImagePath(defaultImage);
        }
      } catch (error) {
        console.error("Error loading image selection:", error);
        // On error, fall back to default image
        setImagePath(defaultImage);
      } finally {
        setLoading(false);
      }
    };

    loadImageSelection();
  }, [sectionId, index, defaultImage]);

  if (loading) {
    // Return a placeholder while loading
    return <div className={`bg-gray-200 animate-pulse ${className}`} style={{ minHeight: '100px' }}></div>;
  }

  return (
    <img 
      src={imagePath} 
      alt={alt} 
      className={className} 
      onError={(e) => {
        console.error('Image failed to load:', imagePath);
        // If the image fails to load and we have a default, try that instead
        if (defaultImage && imagePath !== defaultImage) {
          console.log('Falling back to default image');
          e.target.src = defaultImage;
        }
      }}
    />
  );
};

export default ImageSelector;
