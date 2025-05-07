import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ImageSelector from '../components/ImageSelector';
import { 
  FaMusic, 
  FaPalette, 
  FaTheaterMasks, 
  FaGraduationCap, 
  FaCalendarAlt, 
  FaUsers, 
  FaUtensils, 
  FaBed, 
  FaBuilding, 
  FaMicrophone, 
  FaQuoteLeft, 
  FaMapMarkerAlt, 
  FaHistory,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaChevronRight,
  FaArrowRight
} from 'react-icons/fa';

// Direct import of images from jpg_output directory
import heroAmphitheatre from '../assets/jpg_output/outside1.jpg';
import heroCrowd from '../assets/jpg_output/stage 1.jpg';

// Introduction Section
import oliverPortrait from '../assets/jpg_output/Museum 1.jpg';
import nortonMap from '../assets/jpg_output/outside 3.jpg';

// Our Story Section
import warehouseConversion from '../assets/jpg_output/entrance.jpg';
import artistCollage from '../assets/jpg_output/Museum 2.jpg';
import interiorImage1 from '../assets/jpg_output/hall 1.jpg';
import interiorImage2 from '../assets/jpg_output/hall 2.jpg';
import exteriorImage2 from '../assets/jpg_output/outside 2.jpg';
import artistImage1 from '../assets/jpg_output/studio 7.jpg';

// Outdoor Amphitheatre
import aerialView from '../assets/jpg_output/stage 2.jpg';

// Indoor Auditorium
import theatricalPerformance from '../assets/jpg_output/hall 2.jpg';
import filmScreening from '../assets/jpg_output/hall 1.jpg';

// Conference Centre
import formalBanquet from '../assets/jpg_output/conference room 1.jpg';
import businessMeeting from '../assets/jpg_output/conference room 2.jpg';

// Recording Studio
import studioSession from '../assets/jpg_output/studio 1.jpg';
import mixingDesk from '../assets/jpg_output/studio 2.jpg';
import recordingStudio from '../assets/jpg_output/studio 3.jpg';

// Training Classrooms
import guitarClass from '../assets/jpg_output/studio 4.jpg';
import marimbaClass from '../assets/jpg_output/studio 5.jpg';

// Accommodation
import standardRoom from '../assets/jpg_output/bedroom 5.jpg';
import deluxeSuite from '../assets/jpg_output/couple room 2.jpg';
import bridalSuite from '../assets/jpg_output/2nd couple room 1.jpg';
import poolsideView from '../assets/jpg_output/outside sitting area 1.jpg';
import guestRoom from '../assets/jpg_output/outside guest room 2.jpg';

// Dining
import daisysKitchen from '../assets/jpg_output/dining room 1.jpg';
import chefInAction from '../assets/jpg_output/dining room 3.jpg';
import guestsDining from '../assets/jpg_output/dining room 2.jpg';

// Gallery
import artExhibition from '../assets/jpg_output/Art.jpg';
import craftMarket from '../assets/jpg_output/sculptures 1.jpg';
import localArtists from '../assets/jpg_output/shop1.jpg';

// Admin
import officeSpace from '../assets/jpg_output/reception.jpg';
import ticketingBooth from '../assets/jpg_output/Lobby1.jpg';

// Grounds
import landscapedLawns from '../assets/jpg_output/outside1.jpg';
import outdoorWedding from '../assets/jpg_output/outside 2.jpg';

// Mentorship
import mentorSession from '../assets/jpg_output/studio 6.jpg';
import alumniPerformance from '../assets/jpg_output/studio 7.jpg';

// Events
import ndegaZvanguFestival from '../assets/jpg_output/stage 5.jpg';
import familyFunDay from '../assets/jpg_output/outside guest room 3.jpg';

// Community
import sundayConcert from '../assets/jpg_output/stage 3.jpg';
import tukuMarathon from '../assets/jpg_output/outside guest room 4.jpg';
import guidedTour from '../assets/jpg_output/Museum 2.jpg'; // Using Museum 2.jpg instead of Museum 3.jpg which doesn't exist

// Booking
import frontDesk from '../assets/jpg_output/reception.jpg';
import pakarePaye from '../assets/jpg_output/entrance.jpg';

const PakarePaye = () => {
  // Art Center Features
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
  
  // Mentorship Program information
  const mentorshipProgram = {
    title: 'Artist Mentorship Programme',
    description: 'Continuing Tuku\'s legacy of nurturing talent, our mentorship program has helped launch the careers of many successful artists.',
    alumni: [
      "Hope Masike", 
      "Munya Mataruse", 
      "Fiona Gwena", 
      "Donald Kanyuchi", 
      "Innocent Mapemba", 
      "Poda Muriwa", 
      "Ashton Nyahora", 
      "Tendai Madhekere", 
      "Victor Kunonga", 
      "Mbeu", 
      "Mono Mukundu", 
      "Blessing Chimanga",
      "Gary Tight",
      "Munyaradzi Matarutse",
      "Tsvete band"
    ],
    images: [mentorSession, alumniPerformance]
  };

  
  // Notable Artists who have been part of Pakare Paye
  const notableArtists = [
    "Hope Masike",
    "Munya Mataruse",
    "Fiona Gwena",
    "Donald Kanyuchi",
    "Innocent Mapemba",
    "Poda Muriwa",
    "Ashton Nyahora",
    "Tendai Madhekere",
    "Victor Kunonga",
    "Mbeu",
    "Mono Mukundu",
    "Blessing Chimanga",
    "Gary Tight",
    "Munyaradzi Matarutse",
    "Tsvete band"
  ];
  

  

  
  // Signature events information
  const signatureEvents = [
    {
      title: 'Ndega Zvangu Solo Festival',
      description: 'An annual celebration of solo artists across various genres, providing a platform for individual expression and artistic growth.',
      image: ndegaZvanguFestival
    },
    {
      title: 'Family Fun Days',
      description: 'Regular community events that bring together families for music, games, food, and creative activities in a welcoming environment.',
      image: familyFunDay
    },
    {
      title: 'Sunday Concerts',
      description: 'Weekly performances showcasing both established and emerging artists, creating a regular rhythm of musical excellence.',
      image: sundayConcert
    },
    {
      title: 'Tuku Memorial Marathon',
      description: 'An annual run/walk event that promotes health and wellness while honoring Oliver Mtukudzi\'s legacy and supporting the arts centre.',
      image: tukuMarathon
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Banner Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative text-white py-32 md:py-48 overflow-hidden"
      >
        {/* Background image with ImageSelector */}
        <div className="absolute inset-0 z-0">
          <ImageSelector 
            sectionId="hero"
            index={0}
            defaultImage={heroAmphitheatre}
            alt="Pakare Paye Arts Centre"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
            >
              Welcome to Pakare Paye Arts Centre
              <span className="block text-2xl md:text-3xl mt-2 font-light">A Home for the Arts</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl mb-10 text-white max-w-2xl mx-auto"
            >
              Experience the cultural legacy of Dr. Oliver "Tuku" Mtukudzi through music, 
              performance, and artistic expression at Zimbabwe's premier arts centre.
            </motion.p>
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >

              <a 
                href="#booking" 
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center"
              >
                Book a Tour
                <FaChevronRight className="ml-2" />
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Introduction Section */}
      <section className="py-20 bg-white" id="introduction">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">About Pakare Paye</h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <ImageSelector 
                    sectionId="introduction"
                    index={0}
                    defaultImage={oliverPortrait}
                    alt="Dr. Oliver Mtukudzi" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
                  <FaQuoteLeft className="text-accent text-xl mb-2" />
                  <p className="text-black italic mb-2">
                    "This is not a school. We don't deal with education here – we deal with talent. A college says, 'we will teach you' but we say 'you have got it, let's learn'."
                  </p>
                  <p className="text-right text-black font-semibold">— Dr. Oliver Mtukudzi</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">A Cultural Legacy</h3>
                <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                  <ImageSelector 
                    sectionId="cultural-legacy-image"
                    index={0}
                    defaultImage={oliverPortrait} 
                    alt="Cultural Legacy of Pakare Paye" 
                    className="w-full h-64 object-cover" 
                  />
                </div>
                <p className="text-black mb-6">
                  Pakare Paye Arts Centre stands as a testament to Oliver Mtukudzi's vision of preserving and promoting
                  Zimbabwean cultural heritage. The center provides a platform for artists to develop their talents while
                  staying connected to their cultural roots.
                </p>
                <p className="text-black mb-6 text-lg">
                  Named after Mtukudzi's iconic song "Pakare Paye" (meaning "Long Ago"), the centre 
                  serves as a performance platform for developing and fostering young talent in many practical 
                  artistic endeavors, particularly music, dance, drama, poetry, and storytelling.
                </p>
                
                <div className="flex items-center mb-6 bg-gray-50 p-4 rounded-lg">
                  <FaMapMarkerAlt className="text-accent text-xl mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-black">238 Galloway Road, Norton, Zimbabwe<br />45km from Harare</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <a 
                    href="#our-story" 
                    className="text-accent hover:text-accent-dark font-semibold inline-flex items-center transition-colors"
                  >
                    Learn more about our story
                    <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl text-accent mb-4">
                  <FaMusic />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Musical Heritage</h3>
                <p className="text-black">
                  A tribute to Oliver Mtukudzi's musical legacy, showcasing the rich musical traditions of Zimbabwe through performances and recordings.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl text-accent mb-4">
                  <FaTheaterMasks />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Cultural Performances</h3>
                <p className="text-black">
                  A venue for traditional and contemporary performances celebrating Zimbabwean culture and artistic expression.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl text-accent mb-4">
                  <FaGraduationCap />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Talent Development</h3>
                <p className="text-black">
                  Offering workshops, training, and mentorship for emerging artists and musicians to nurture the next generation of creative talent.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20 bg-gray-50" id="our-story">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-black max-w-3xl mx-auto">
                The journey of Pakare Paye Arts Centre from vision to reality, and its continuing impact on Zimbabwe's cultural landscape.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <ImageSelector 
                    sectionId="our-story"
                    index={0}
                    defaultImage={warehouseConversion} 
                    alt="Original warehouse before conversion" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <ImageSelector 
                    sectionId="our-story"
                    index={1}
                    defaultImage={artistCollage} 
                    alt="Artists at Pakare Paye" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg col-span-2">
                  <ImageSelector 
                    sectionId="our-story"
                    index={2}
                    defaultImage={landscapedLawns} 
                    alt="Pakare Paye grounds" 
                    className="w-full h-64 object-cover" 
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-white p-8 rounded-lg shadow-lg h-full">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">From Warehouse to Cultural Hub</h3>
                  
                  <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                    <ImageSelector 
                      sectionId="warehouse-to-hub"
                      index={0}
                      defaultImage={warehouseConversion} 
                      alt="From Warehouse to Cultural Hub" 
                      className="w-full h-64 object-cover" 
                    />
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <FaHistory className="text-accent mr-2" />
                      <span className="text-gray-900 font-semibold">Established in 2003, officially opened October 3, 2004</span>
                    </div>
                    <p className="text-black mb-4">
                      Using his personal savings, Oliver Mtukudzi purchased an old factory in Norton, tore it down, and built the Pakare Paye Arts Centre. 
                      What was once used as a warehouse has been transformed into a vibrant cultural hub that embodies Tuku's vision for artistic development.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Open Door Policy</h4>
                    <p className="text-black mb-4">
                      The centre operates on an "open door policy" which enables young people to visit the place and interact with the surroundings and learn without paying a fee. 
                      This approach has made it accessible to many aspiring artists who might otherwise not have had the opportunity to develop their talents.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Honoring Sam Mtukudzi</h4>
                    <p className="text-black mb-4">
                      The Sam Mtukudzi Conference Centre, named after Oliver's late son who died in 2011, stands as a testament to the family's commitment to nurturing artistic talent across generations.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Sustainable Model</h4>
                    <p className="text-black">
                      Funding for the centre now comes from income earned through the chalets and traditional restaurant that are open to locals and tourists, 
                      creating a sustainable model for supporting artistic development. The centre has also received support from organizations such as the 
                      Culture Fund in partnership with the Embassy of Sweden and Nyaradzo Group.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Artists Nurtured at Pakare Paye</h3>
              <p className="text-center text-black mb-8">
                Pakare Paye Arts Centre has played a crucial role in developing and nurturing talented artists 
                who have gone on to make significant contributions to Zimbabwe's cultural landscape.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {mentorshipProgram.alumni.map((artist, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-primary to-accent text-white py-3 px-6 rounded-full shadow-md"
                  >
                    {artist}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      
      {/* Programmes Section */}
      <section className="py-20 bg-gray-50" id="programmes">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Programmes</h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-black max-w-3xl mx-auto">
                Pakare Paye Arts Centre offers various programmes designed to nurture talent, 
                celebrate culture, and engage the community.
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <ImageSelector 
                    sectionId="our-programmes"
                    index={0}
                    defaultImage={studioSession} 
                    alt="Pakare Paye Programmes" 
                    className="w-full h-64 object-cover" 
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <ImageSelector 
                    sectionId="our-programmes"
                    index={1}
                    defaultImage={guitarClass} 
                    alt="Pakare Paye Programmes" 
                    className="w-full h-64 object-cover" 
                  />
                </div>
              </div>
            </div>
            
            {/* Mentorship Programme */}
            <div className="mb-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{mentorshipProgram.title}</h3>
                  <div className="w-16 h-1 bg-accent mb-6"></div>
                  <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                    <ImageSelector 
                      sectionId="mentorship-programme"
                      index={0}
                      defaultImage={guitarClass} 
                      alt="Mentorship Programme" 
                      className="w-full h-64 object-cover" 
                    />
                  </div>
                  <p className="text-lg text-black mb-6">{mentorshipProgram.description}</p>
                  
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Notable Alumni</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentorshipProgram.alumni.map((artist, index) => (
                        <span key={index} className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm">
                          {artist}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Programme Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <FaChevronRight className="text-accent mt-1 mr-2" />
                        <span className="text-black">One-on-one mentorship with established artists</span>
                      </li>
                      <li className="flex items-start">
                        <FaChevronRight className="text-accent mt-1 mr-2" />
                        <span className="text-black">Regular performance opportunities</span>
                      </li>
                      <li className="flex items-start">
                        <FaChevronRight className="text-accent mt-1 mr-2" />
                        <span className="text-black">Access to recording facilities</span>
                      </li>
                      <li className="flex items-start">
                        <FaChevronRight className="text-accent mt-1 mr-2" />
                        <span className="text-black">Career development guidance</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <ImageSelector 
                      sectionId="mentorship"
                      index={0}
                      defaultImage={mentorshipProgram.images[0]} 
                      alt="Mentorship session" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <ImageSelector 
                      sectionId="mentorship"
                      index={1}
                      defaultImage={mentorshipProgram.images[1]} 
                      alt="Alumni performance" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Signature Events */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Signature Events</h3>
                <div className="w-16 h-1 bg-accent mx-auto mb-6"></div>
                <div className="mb-6 rounded-lg overflow-hidden shadow-lg max-w-3xl mx-auto">
                  <ImageSelector 
                    sectionId="signature-events"
                    index={0}
                    defaultImage={sundayConcert} 
                    alt="Signature Events at Pakare Paye" 
                    className="w-full h-64 object-cover" 
                  />
                </div>
                <p className="text-lg text-black max-w-3xl mx-auto">
                  Throughout the year, Pakare Paye hosts a variety of signature events 
                  that showcase talent and bring the community together.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {signatureEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <ImageSelector 
                        sectionId="signature-events"
                        index={index}
                        defaultImage={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h4>
                      <p className="text-black">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Community Engagement */}
            <div>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Community Engagement</h3>
                <div className="w-16 h-1 bg-accent mx-auto mb-6"></div>
                <p className="text-lg text-black max-w-3xl mx-auto">
                  Pakare Paye Arts Centre is deeply committed to engaging with and giving back to the community.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid md:grid-cols-3 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl text-accent mb-4 flex justify-center">
                      <FaUsers />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Open Door Policy</h4>
                    <p className="text-black">
                      Young people can visit and interact with the surroundings without paying a fee, making art accessible to all.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl text-accent mb-4 flex justify-center">
                      <FaCalendarAlt />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Community Events</h4>
                    <p className="text-black">
                      Regular events that bring together the local community, fostering a sense of belonging and shared cultural identity.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl text-accent mb-4 flex justify-center">
                      <FaGraduationCap />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Educational Outreach</h4>
                    <p className="text-black">
                      Partnerships with local schools and community organizations to bring arts education to a wider audience.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Center Description Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">About Pakare Paye</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                  <ImageSelector 
                    sectionId="center-description"
                    index={0}
                    defaultImage={interiorImage1} 
                    alt="Pakare Paye Interior" 
                    className="w-full h-64 object-cover" 
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Cultural Sanctuary</h3>
                <p className="mb-6 text-black">
                  Located in the Knowe area of Norton, Zimbabwe, about 45km from Harare, Pakare Paye Arts Centre is more than just a venue. 
                  It is a living testament to Oliver Mtukudzi's vision of nurturing artistic talent 
                  and preserving cultural expression through creative platforms.
                </p>
                <div className="flex items-center mb-6">
                  <FaMapMarkerAlt className="text-accent mr-2" />
                  <span className="text-black">238 Galloway Road, Norton, Zimbabwe</span>
                </div>
                <div className="flex items-center mb-6">
                  <FaHistory className="text-accent mr-2" />
                  <span className="text-black">Established in 2003, officially opened October 3, 2004</span>
                </div>
              </div>
              <div>
                <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                  <ImageSelector 
                    sectionId="center-description"
                    index={1}
                    defaultImage={interiorImage2} 
                    alt="Pakare Paye Interior" 
                    className="w-full h-64 object-cover" 
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Artistic Mission</h3>
                <p className="mb-6 text-black">
                  Named after Mtukudzi's iconic song "Pakare Paye" (meaning "Long Ago"), the center 
                  serves as a beacon of creativity, education, and cultural celebration, 
                  empowering artists and connecting communities through shared artistic experiences.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <FaQuoteLeft className="text-accent mb-2" />
                  <p className="text-black italic">
                    "This is not a school. We don't deal with education here – we deal with talent. A college says, 'we will teach you' but we say 'you have got it, let's learn'."
                  </p>
                  <p className="text-right text-black mt-2">— Oliver Mtukudzi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daisy's Kitchen Restaurant Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Daisy's Kitchen</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="daisys-kitchen"
                  index={0}
                  defaultImage={daisysKitchen} 
                  alt="Daisy's Kitchen Restaurant" 
                  className="w-full h-64 object-cover" 
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="daisys-kitchen"
                  index={1}
                  defaultImage={chefInAction} 
                  alt="Chef in action at Daisy's Kitchen" 
                  className="w-full h-64 object-cover" 
                />
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Authentic Zimbabwean Cuisine</h3>
              <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="zimbabwean-cuisine"
                  index={0}
                  defaultImage={guestsDining} 
                  alt="Authentic Zimbabwean Cuisine" 
                  className="w-full h-64 object-cover" 
                />
              </div>
              <p className="mb-6 text-black">
                Named after Oliver Mtukudzi's wife, Daisy's Kitchen is the heart of culinary excellence at Pakare Paye Arts Centre. 
                The restaurant offers authentic Zimbabwean cuisine alongside international favorites in a warm, welcoming atmosphere.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Dining Experience</h4>
                  <ul className="space-y-2 text-black">
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Traditional Zimbabwean dishes</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> International cuisine options</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Fresh, locally-sourced ingredients</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Indoor and outdoor seating areas</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Services</h4>
                  <ul className="space-y-2 text-black">
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Breakfast, lunch and dinner</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Private dining options</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Catering for events and functions</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Special cultural dining experiences</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="italic text-black">
                  "Daisy's Kitchen brings the flavors of Zimbabwe to life, offering guests a taste of our cultural heritage through food. 
                  It's not just a restaurant; it's a culinary journey through the heart of our traditions."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sam Mtukudzi Conference Centre Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Sam Mtukudzi Conference Centre</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="conference-centre"
                  index={0}
                  defaultImage={formalBanquet} 
                  alt="Formal Banquet Setup at Conference Centre" 
                  className="w-full h-64 object-cover" 
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="conference-centre"
                  index={1}
                  defaultImage={businessMeeting} 
                  alt="Business Meeting at Conference Centre" 
                  className="w-full h-64 object-cover" 
                />
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Versatile Conference Facilities</h3>
              <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="conference-facilities"
                  index={0}
                  defaultImage={businessMeeting} 
                  alt="Versatile Conference Facilities" 
                  className="w-full h-64 object-cover" 
                />
              </div>
              <p className="mb-6 text-black">
                Named in honor of Oliver Mtukudzi's late son, the Sam Mtukudzi Conference Centre is a state-of-the-art facility designed for meetings, workshops, and special events. 
                With flexible space configurations and modern amenities, it serves as a hub for both artistic and corporate gatherings.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Features</h4>
                  <ul className="space-y-2 text-black">
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> 200-person capacity</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Modern audio-visual equipment</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Flexible seating arrangements</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Natural lighting options</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Ideal For</h4>
                  <ul className="space-y-2 text-black">
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Corporate meetings</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Workshops and seminars</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Private celebrations</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Cultural presentations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indoor Auditorium Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Indoor Auditorium</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="indoor-auditorium"
                  index={0}
                  defaultImage={theatricalPerformance} 
                  alt="Theatrical Performance at Indoor Auditorium" 
                  className="w-full h-64 object-cover" 
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="indoor-auditorium"
                  index={1}
                  defaultImage={filmScreening} 
                  alt="Film Screening at Indoor Auditorium" 
                  className="w-full h-64 object-cover" 
                />
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Intimate Performance Space</h3>
              <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="performance-space"
                  index={0}
                  defaultImage={theatricalPerformance} 
                  alt="Intimate Performance Space" 
                  className="w-full h-64 object-cover" 
                />
              </div>
              <p className="mb-6 text-black">
                The indoor auditorium at Pakare Paye Arts Centre provides an intimate setting for performances, film screenings, and theatrical productions. 
                With excellent acoustics and comfortable seating, it offers an immersive experience for both performers and audiences.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Specifications</h4>
                  <ul className="space-y-2 text-black">
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> 200-seat capacity</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Professional lighting system</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> High-quality sound equipment</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Backstage facilities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Performance Types</h4>
                  <ul className="space-y-2 text-black">
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Musical concerts</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Theatrical productions</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Film screenings</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Poetry readings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outdoor Amphitheatre Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Outdoor Amphitheatre</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="outdoor-amphitheatre"
                  index={0}
                  defaultImage={aerialView} 
                  alt="Aerial View of Outdoor Amphitheatre" 
                  className="w-full h-64 object-cover" 
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="outdoor-amphitheatre"
                  index={1}
                  defaultImage={sundayConcert} 
                  alt="Concert at Outdoor Amphitheatre" 
                  className="w-full h-64 object-cover" 
                />
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Open-Air Performance Venue</h3>
              <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="open-air-venue"
                  index={0}
                  defaultImage={aerialView} 
                  alt="Open-Air Performance Venue" 
                  className="w-full h-64 object-cover" 
                />
              </div>
              <p className="mb-6 text-black">
                The spectacular outdoor amphitheatre is the crown jewel of Pakare Paye Arts Centre, hosting major concerts and festivals under the open sky. 
                With a capacity for 3,000 people, it has welcomed both local and international artists for unforgettable performances.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Venue Details</h4>
                  <ul className="space-y-2 text-black">
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> 3,000-person capacity</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Professional stage setup</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Excellent natural acoustics</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Scenic natural surroundings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Notable Events</h4>
                  <ul className="space-y-2 text-black">
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Ndega Zvangu Festival</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Sunday Concert Series</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> International artist collaborations</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Community cultural celebrations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pakare Paye Village Accommodation Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Pakare Paye Village Lodges</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="village-lodges"
                  index={0}
                  defaultImage={standardRoom} 
                  alt="Standard Room at Pakare Paye Village" 
                  className="w-full h-64 object-cover" 
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="village-lodges"
                  index={1}
                  defaultImage={deluxeSuite} 
                  alt="Deluxe Suite at Pakare Paye Village" 
                  className="w-full h-64 object-cover" 
                />
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Comfortable Accommodation</h3>
              <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="accommodation"
                  index={0}
                  defaultImage={deluxeSuite} 
                  alt="Comfortable Accommodation at Pakare Paye" 
                  className="w-full h-64 object-cover" 
                />
              </div>
              <p className="mb-6 text-black">
                The Pakare Paye Village Lodges offer comfortable and convenient accommodation for visitors, artists, and guests attending events at the arts centre. 
                With a range of room options and amenities, the lodges provide a peaceful retreat in the heart of Norton.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Room Types</h4>
                  <ul className="space-y-2 text-black">
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Standard Rooms</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Deluxe Suites</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Bridal Suite</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Family Rooms</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Amenities</h4>
                  <ul className="space-y-2 text-black">
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> En-suite bathrooms</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Air conditioning</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Free Wi-Fi</li>
                    <li className="flex items-center"><FaChevronRight className="text-accent mr-2" /> Access to garden areas</li>
                  </ul>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <ImageSelector 
                    sectionId="village-lodges"
                    index={2}
                    defaultImage={bridalSuite} 
                    alt="Bridal Suite at Pakare Paye Village" 
                    className="w-full h-48 object-cover" 
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <ImageSelector 
                    sectionId="village-lodges"
                    index={3}
                    defaultImage={poolsideView} 
                    alt="Poolside View at Pakare Paye Village" 
                    className="w-full h-48 object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking & Contact Section */}
      <section className="py-20 bg-white" id="booking">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Book & Contact</h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-black max-w-3xl mx-auto">
                Experience the magic of Pakare Paye Arts Centre for your next event, 
                recording session, or cultural experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Booking Options</h3>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Event Hosting</h4>
                    <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
                      <ImageSelector 
                        sectionId="event-hosting"
                        index={0}
                        defaultImage={sundayConcert} 
                        alt="Event Hosting at Pakare Paye" 
                        className="w-full h-48 object-cover" 
                      />
                    </div>
                    <p className="text-black mb-4">
                      Host your concert, wedding, corporate event, or celebration at our versatile venues. 
                      From the outdoor amphitheatre to the intimate conference centre, we have the perfect space for your needs.
                    </p>
                    <div className="flex items-center text-accent">
                      <FaCalendarAlt className="mr-2" />
                      <span className="font-semibold">Bookings available year-round</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Studio Time</h4>
                    <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
                      <ImageSelector 
                        sectionId="studio-time"
                        index={0}
                        defaultImage={recordingStudio} 
                        alt="Professional Recording Studio" 
                        className="w-full h-48 object-cover" 
                      />
                    </div>
                    <p className="text-black mb-4">
                      Record your music in our professional studio with state-of-the-art equipment and experienced sound engineers. 
                      Hourly, daily, and project-based rates available.
                    </p>
                    <div className="flex items-center text-accent">
                      <FaMicrophone className="mr-2" />
                      <span className="font-semibold">Professional recording services</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Accommodation</h4>
                    <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
                      <ImageSelector 
                        sectionId="booking-accommodation"
                        index={0}
                        defaultImage={standardRoom} 
                        alt="Comfortable Accommodation Options" 
                        className="w-full h-48 object-cover" 
                      />
                    </div>
                    <p className="text-black mb-4">
                      Stay in our comfortable rooms and suites, perfect for artists in residence, event attendees, 
                      or cultural tourists looking to immerse themselves in the Pakare Paye experience.
                    </p>
                    <div className="flex items-center text-accent">
                      <FaBed className="mr-2" />
                      <span className="font-semibold">Various room options available</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Tours & Visits</h4>
                    <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
                      <ImageSelector 
                        sectionId="tours-visits"
                        index={0}
                        defaultImage={guidedTour} 
                        alt="Tours & Visits at Pakare Paye" 
                        className="w-full h-48 object-cover" 
                      />
                    </div>
                    <p className="text-black mb-4">
                      Experience the legacy of Oliver Mtukudzi with a guided tour of Pakare Paye Arts Centre. 
                      Learn about the history, facilities, and impact of this cultural landmark.
                    </p>
                    <div className="flex items-center text-accent">
                      <FaUsers className="mr-2" />
                      <span className="font-semibold">Individual and group tours available</span>
                    </div>
                  </div>
                </div>
              </motion.div>


              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-xl overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageSelector 
                    sectionId="booking"
                    index={0}
                    defaultImage={frontDesk} 
                    alt="Pakare Paye Front Desk" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">Contact Us</h3>
                      <p>Reach out to inquire about bookings and availability</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-black font-medium mb-1">Your Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-black font-medium mb-1">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="inquiry" className="block text-black font-medium mb-1">Inquiry Type</label>
                      <select 
                        id="inquiry" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
                      >
                        <option value="">Select an option</option>
                        <option value="event">Event Hosting</option>
                        <option value="studio">Studio Time</option>
                        <option value="accommodation">Accommodation</option>
                        <option value="tour">Tours & Visits</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-black font-medium mb-1">Your Message</label>
                      <textarea 
                        id="message" 
                        rows="4" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
                        placeholder="Please provide details about your inquiry..."
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-accent text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-accent-dark"
                    >
                      Send Inquiry
                    </button>
                  </form>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex items-center mb-4">
                      <FaMapMarkerAlt className="text-accent mr-3" />
                      <span>238 Galloway Road, Norton, Zimbabwe</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <FaPhone className="text-accent mr-3" />
                      <span>+263 772 123 456</span>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="text-accent mr-3" />
                      <span>info@pakarepaye.co.zw</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <ImageSelector 
                sectionId="booking"
                index={1}
                defaultImage={pakarePaye} 
                alt="Pakare Paye Arts Centre Signage" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Core Values</h2>
          <div className="mb-10 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
            <ImageSelector 
              sectionId="core-values"
              index={0}
              defaultImage={heroAmphitheatre} 
              alt="Pakare Paye Core Values" 
              className="w-full h-64 object-cover" 
            />
          </div>
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
                <p className="text-black">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">History</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="history"
                  index={0}
                  defaultImage={exteriorImage2} 
                  alt="Pakare Paye Exterior" 
                  className="w-full h-64 object-cover" 
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="notable-artists"
                  index={1}
                  defaultImage={artistImage1} 
                  alt="Artists at Pakare Paye" 
                  className="w-full h-64 object-cover" 
                />
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <p className="mb-6 text-black">
                Using his personal savings, Oliver Mtukudzi purchased an old factory in Norton, tore it down, and built the Pakare Paye Arts Centre. 
                What was once used as a warehouse has been transformed into a vibrant cultural hub that embodies Tuku's vision for artistic development.
              </p>
              <p className="mb-6 text-black">
                The centre operates on an "open door policy" which enables young people to visit the place and interact with the surroundings and learn without paying a fee. 
                This approach has made it accessible to many aspiring artists who might otherwise not have had the opportunity to develop their talents.
              </p>
              <p className="text-black">
                Funding for the centre now comes from income earned through the chalets and traditional restaurant that are open to locals and tourists, 
                creating a sustainable model for supporting artistic development. The centre has also received support from organizations such as the 
                Culture Fund in partnership with the Embassy of Sweden and Nyaradzo Group.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notable Artists Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Artists Nurtured at Pakare Paye</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="notable-artists"
                  index={0}
                  defaultImage={artistImage1} 
                  alt="Artists at Pakare Paye" 
                  className="w-full h-64 object-cover" 
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <ImageSelector 
                  sectionId="notable-artists"
                  index={1}
                  defaultImage={artistImage1} 
                  alt="Artists at Pakare Paye" 
                  className="w-full h-64 object-cover" 
                />
              </div>
            </div>
            <p className="text-center text-black mb-8">
              Pakare Paye Arts Centre has played a crucial role in developing and nurturing talented artists 
              who have gone on to make significant contributions to Zimbabwe's cultural landscape.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {notableArtists.map((artist, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-primary to-accent text-white py-3 px-6 rounded-full"
                >
                  {artist}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                  <div className="h-64 relative">
                    <ImageSelector
                      sectionId="gallery"
                      index={index}
                      defaultImage={index === 0 ? interiorImage1 : index === 1 ? interiorImage2 : index === 2 ? exteriorImage2 : artistImage1}
                      alt={`Pakare Paye Gallery Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Visit Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Visit Pakare Paye</h2>
            <p className="text-xl text-black mb-8">
              Experience the vibrant cultural atmosphere of Pakare Paye Arts Centre. Whether you're interested in attending a performance, 
              participating in a workshop, or simply enjoying the beautiful surroundings, we welcome visitors from all walks of life.
            </p>
            <div className="mb-10 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
              <ImageSelector 
                sectionId="visit"
                index={0}
                defaultImage={exteriorImage2} 
                alt="Visit Pakare Paye" 
                className="w-full h-64 object-cover" 
              />
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <FaCalendarAlt className="text-4xl text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
                <p className="text-black">Monday - Sunday<br />9:00 AM - 5:00 PM</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <FaMapMarkerAlt className="text-4xl text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-black">238 Galloway Road<br />Norton, Zimbabwe</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <FaUsers className="text-4xl text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Group Tours</h3>
                <p className="text-black">Available by appointment<br />Contact for details</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-6">Pakare Paye</h3>
                <p className="text-gray-400 mb-6">
                  A cultural sanctuary founded by Oliver Mtukudzi, dedicated to preserving and promoting
                  the rich artistic heritage of Zimbabwe.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-accent transition-colors">
                    <FaFacebook size={20} />
                  </a>
                  <a href="#" className="text-white hover:text-accent transition-colors">
                    <FaInstagram size={20} />
                  </a>
                  <a href="#" className="text-white hover:text-accent transition-colors">
                    <FaYoutube size={20} />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#introduction" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      <FaChevronRight className="mr-2 text-xs" /> About Us
                    </a>
                  </li>
                  <li>
                    <a href="#our-story" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      <FaChevronRight className="mr-2 text-xs" /> Our Story
                    </a>
                  </li>

                  <li>
                    <a href="#programmes" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      <FaChevronRight className="mr-2 text-xs" /> Programmes
                    </a>
                  </li>
                  <li>
                    <a href="#booking" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      <FaChevronRight className="mr-2 text-xs" /> Book & Contact
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6">Contact Info</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaMapMarkerAlt className="text-accent mr-3 mt-1" />
                    <span className="text-gray-400">238 Galloway Road<br />Norton, Zimbabwe</span>
                  </li>
                  <li className="flex items-center">
                    <FaPhone className="text-accent mr-3" />
                    <span className="text-gray-400">+263 772 123 456</span>
                  </li>
                  <li className="flex items-center">
                    <FaEnvelope className="text-accent mr-3" />
                    <span className="text-gray-400">info@pakarepaye.co.zw</span>
                  </li>
                </ul>
              </div>
              

            </div>
            
            <div className="pt-8 border-t border-gray-800 text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} Pakare Paye Arts Centre. All rights reserved.</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default PakarePaye;
