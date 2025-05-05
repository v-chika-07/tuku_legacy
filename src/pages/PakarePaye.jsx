import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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

// Import images - Hero Section
import heroAmphitheatre from '../assets/images/pakare-paye-new/hero/outdoor_amphitheatre.jpg';
import heroCrowd from '../assets/images/pakare-paye-new/hero/crowd_performance.jpg';

// Import images - Introduction Section
import oliverPortrait from '../assets/images/pakare-paye-new/introduction/oliver_mtukudzi_portrait.jpg';
import nortonMap from '../assets/images/pakare-paye-new/introduction/norton_map.jpg';

// Import images - Our Story Section
import warehouseConversion from '../assets/images/pakare-paye-new/our-story/warehouse_conversion.jpg';
import artistCollage from '../assets/images/pakare-paye/artists/IMG_5197.jpg';
import interiorImage1 from '../assets/images/pakare-paye/interior/IMG_5093.jpg';
import interiorImage2 from '../assets/images/pakare-paye/interior/IMG_5094.jpg';
import exteriorImage2 from '../assets/images/pakare-paye/exterior/IMG_5091.jpg';
import artistImage1 from '../assets/images/pakare-paye/artists/IMG_5202.jpg';

// Import images - Outdoor Amphitheatre
import aerialView from '../assets/images/pakare-paye-new/outdoor-amphitheatre/aerial_view.jpg';

// Import images - Indoor Auditorium
import theatricalPerformance from '../assets/images/pakare-paye-new/indoor-auditorium/theatrical_performance.jpg';
import filmScreening from '../assets/images/pakare-paye-new/indoor-auditorium/film_screening.jpg';

// Import images - Conference Centre
import formalBanquet from '../assets/images/pakare-paye-new/conference-centre/formal_banquet.jpg';
import businessMeeting from '../assets/images/pakare-paye-new/conference-centre/business_meeting.jpg';

// Import images - Recording Studio
import studioSession from '../assets/images/pakare-paye-new/recording-studio/studio_session.jpg';
import mixingDesk from '../assets/images/pakare-paye-new/recording-studio/mixing_desk.jpg';

// Import images - Training Classrooms
import guitarClass from '../assets/images/pakare-paye-new/training-classrooms/guitar_class.jpg';
import marimbaClass from '../assets/images/pakare-paye-new/training-classrooms/marimba_class.jpg';

// Import images - Accommodation
import standardRoom from '../assets/images/pakare-paye-new/accommodation/standard_room.jpg';
import deluxeSuite from '../assets/images/pakare-paye-new/accommodation/deluxe_suite.jpg';
import bridalSuite from '../assets/images/pakare-paye-new/accommodation/bridal_suite.jpg';
import poolsideView from '../assets/images/pakare-paye-new/accommodation/poolside_view.jpg';

// Import images - Dining
import daisysKitchen from '../assets/images/pakare-paye-new/dining/daisys_kitchen.jpg';
import chefInAction from '../assets/images/pakare-paye-new/dining/chef_in_action.jpg';
import guestsDining from '../assets/images/pakare-paye-new/dining/guests_dining.jpg';

// Import images - Gallery
import artExhibition from '../assets/images/pakare-paye-new/gallery/art_exhibition.jpg';
import craftMarket from '../assets/images/pakare-paye-new/gallery/craft_market.jpg';
import localArtists from '../assets/images/pakare-paye-new/gallery/local_artists.jpg';

// Import images - Admin
import officeSpace from '../assets/images/pakare-paye-new/admin/office_space.jpg';
import ticketingBooth from '../assets/images/pakare-paye-new/admin/ticketing_booth.jpg';

// Import images - Grounds
import landscapedLawns from '../assets/images/pakare-paye-new/grounds/landscaped_lawns.jpg';
import outdoorWedding from '../assets/images/pakare-paye-new/grounds/outdoor_wedding.jpg';

// Import images - Mentorship
import mentorSession from '../assets/images/pakare-paye-new/mentorship/mentor_session.jpg';
import alumniPerformance from '../assets/images/pakare-paye-new/mentorship/alumni_performance.jpg';

// Import images - Events
import ndegaZvanguFestival from '../assets/images/pakare-paye-new/events/ndega_zvangu_festival.jpg';
import familyFunDay from '../assets/images/pakare-paye-new/events/family_fun_day.jpg';

// Import images - Community
import sundayConcert from '../assets/images/pakare-paye-new/community/sunday_concert.jpg';
import tukuMarathon from '../assets/images/pakare-paye-new/community/tuku_marathon.jpg';

// Import images - Booking
import frontDesk from '../assets/images/pakare-paye-new/booking/front_desk.jpg';
import pakarePaye from '../assets/images/pakare-paye-new/booking/pakare_paye_signage.jpg';

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
  const [selectedFacility, setSelectedFacility] = useState(null);
  
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
  
  // Facilities information based on design manual
  const facilities = [
    {
      id: 'outdoor-amphitheatre',
      title: 'Main Stage – Where Stars Are Born',
      subtitle: 'Outdoor Amphitheatre',
      description: 'Our 3,000+ seat open-air arena hosts the biggest performances and events at Pakare Paye. With state-of-the-art sound and lighting, this is where many of Zimbabwe\'s most memorable concerts have taken place.',
      icon: <FaMusic />,
      images: [aerialView, heroCrowd],
      features: [
        'Capacity for 3,000+ attendees',
        'Professional sound and lighting systems',
        'Spacious stage for large ensembles',
        'Natural acoustics enhanced by the landscape'
      ]
    },
    {
      id: 'indoor-auditorium',
      title: 'Intimate Performances, Big Moments',
      subtitle: 'Indoor Auditorium',
      description: 'Our black-box theatre provides the perfect setting for theatrical performances, film screenings, and intimate concerts. With flexible seating arrangements, this space adapts to a variety of artistic expressions.',
      icon: <FaTheaterMasks />,
      images: [theatricalPerformance, filmScreening],
      features: [
        'Flexible seating for up to 200 guests',
        'Professional theatrical lighting',
        'Cinema-quality projection system',
        'Excellent acoustics for performances'
      ]
    },
    {
      id: 'conference-centre',
      title: 'Sam Mtukudzi Conference Centre',
      subtitle: 'Events & Celebrations',
      description: 'Named in honor of Oliver\'s late son, this versatile space hosts corporate retreats, weddings, and community events with a flexible layout that adapts to your needs.',
      icon: <FaBuilding />,
      images: [formalBanquet, businessMeeting],
      features: [
        'Capacity for up to 150 seated guests',
        'State-of-the-art presentation equipment',
        'Catering services available',
        'Flexible configuration options'
      ]
    },
    {
      id: 'recording-studio',
      title: 'Studio Pakare Paye',
      subtitle: 'Recording & Rehearsal Complex',
      description: 'Our professional recording facilities continue Tuku\'s legacy of musical excellence, offering artists the space and technology to create and refine their sound.',
      icon: <FaMicrophone />,
      images: [studioSession, mixingDesk],
      features: [
        'Professional recording equipment',
        'Soundproofed rehearsal spaces',
        'Experienced sound engineers available',
        'Artist development programs'
      ]
    },
    {
      id: 'training-classrooms',
      title: 'Training Classrooms',
      subtitle: 'Learning & Development',
      description: 'Dedicated spaces for nurturing talent through courses in guitar, marimba, mbira, and vocal coaching, continuing Tuku\'s commitment to developing the next generation of artists.',
      icon: <FaGraduationCap />,
      images: [guitarClass, marimbaClass],
      features: [
        'Specialized music instruction',
        'Small class sizes for personalized attention',
        'Instruments available for students',
        'Regular student showcases'
      ]
    },
    {
      id: 'accommodation',
      title: 'Village Pakare Paye',
      subtitle: 'Accommodation',
      description: 'Our lodging options range from standard rooms and deluxe suites to family units and a beautiful bridal suite, all designed to make your stay comfortable and memorable.',
      icon: <FaBed />,
      images: [standardRoom, deluxeSuite, bridalSuite, poolsideView],
      features: [
        'Various room types to suit different needs',
        'Swimming pool and relaxation areas',
        'Proximity to all centre facilities',
        'Peaceful surroundings for creative inspiration'
      ]
    },
    {
      id: 'dining',
      title: 'Daisy\'s Kitchen',
      subtitle: 'Dining & Refreshments',
      description: 'Our in-house catering service offers delicious meals featuring local ingredients and traditional recipes, with options for outdoor braai (barbecue) for special events.',
      icon: <FaUtensils />,
      images: [daisysKitchen, chefInAction, guestsDining],
      features: [
        'Traditional Zimbabwean cuisine',
        'Fresh, locally-sourced ingredients',
        'Catering for events and functions',
        'Outdoor dining options'
      ]
    },
    {
      id: 'gallery',
      title: 'Art Gallery & Craft Market',
      subtitle: 'Visual Arts',
      description: 'Our gallery showcases the work of emerging and established visual artists, while our craft market during festival days offers unique handmade items from local artisans.',
      icon: <FaPalette />,
      images: [artExhibition, craftMarket, localArtists],
      features: [
        'Rotating exhibitions of local artists',
        'Sales opportunities for artisans',
        'Cultural craft demonstrations',
        'Art workshops and classes'
      ]
    },
    {
      id: 'grounds',
      title: 'Grounds & Outdoor Features',
      subtitle: 'Natural Beauty',
      description: 'Our beautifully landscaped grounds include gardens, a pilgrim wall, ample parking, and backup water and power systems to ensure your comfort and convenience.',
      icon: <FaUsers />,
      images: [landscapedLawns, outdoorWedding],
      features: [
        'Scenic gardens for photography',
        'Outdoor event spaces',
        'Memorial pilgrim wall',
        'Swimming pool with garden views'
      ]
    }
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
      title: 'Tuku Memorial 5K',
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
        className="relative text-white py-32 md:py-48"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${heroAmphitheatre})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-4">
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
                href="#facilities" 
                className="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center"
              >
                Explore Our Facilities
                <FaChevronRight className="ml-2" />
              </a>
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
        <div className="container mx-auto px-4">
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
                  <img 
                    src={oliverPortrait} 
                    alt="Dr. Oliver Mtukudzi" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
                  <FaQuoteLeft className="text-accent text-xl mb-2" />
                  <p className="text-gray-800 italic mb-2">
                    "This is not a school. We don't deal with education here – we deal with talent. A college says, 'we will teach you' but we say 'you have got it, let's learn'."
                  </p>
                  <p className="text-right text-gray-600 font-semibold">— Dr. Oliver Mtukudzi</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">A Cultural Legacy</h3>
                <p className="text-gray-700 mb-6 text-lg">
                  Founded and established in 2003 by the legendary Zimbabwean musician Dr. Oliver "Tuku" Mtukudzi, 
                  Pakare Paye Arts Centre stands as a living testament to his vision of nurturing artistic talent 
                  and preserving cultural expression.
                </p>
                <p className="text-gray-700 mb-6 text-lg">
                  Named after Mtukudzi's iconic song "Pakare Paye" (meaning "Long Ago"), the centre 
                  serves as a performance platform for developing and fostering young talent in many practical 
                  artistic endeavors, particularly music, dance, drama, poetry, and storytelling.
                </p>
                
                <div className="flex items-center mb-6 bg-gray-50 p-4 rounded-lg">
                  <FaMapMarkerAlt className="text-accent text-xl mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-700">238 Galloway Road, Norton, Zimbabwe<br />45km from Harare</p>
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
                <p className="text-gray-700">
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
                <p className="text-gray-700">
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
                <p className="text-gray-700">
                  Offering workshops, training, and mentorship for emerging artists and musicians to nurture the next generation of creative talent.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20 bg-gray-50" id="our-story">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
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
                  <img src={warehouseConversion} alt="Original warehouse before conversion" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img src={artistCollage} alt="Artists at Pakare Paye" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg col-span-2">
                  <img src={landscapedLawns} alt="Pakare Paye grounds" className="w-full h-64 object-cover" />
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
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <FaHistory className="text-accent mr-2" />
                      <span className="text-gray-900 font-semibold">Established in 2003, officially opened October 3, 2004</span>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Using his personal savings, Oliver Mtukudzi purchased an old factory in Norton, tore it down, and built the Pakare Paye Arts Centre. 
                      What was once used as a warehouse has been transformed into a vibrant cultural hub that embodies Tuku's vision for artistic development.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Open Door Policy</h4>
                    <p className="text-gray-700 mb-4">
                      The centre operates on an "open door policy" which enables young people to visit the place and interact with the surroundings and learn without paying a fee. 
                      This approach has made it accessible to many aspiring artists who might otherwise not have had the opportunity to develop their talents.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Honoring Sam Mtukudzi</h4>
                    <p className="text-gray-700 mb-4">
                      The Sam Mtukudzi Conference Centre, named after Oliver's late son who died in 2011, stands as a testament to the family's commitment to nurturing artistic talent across generations.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Sustainable Model</h4>
                    <p className="text-gray-700">
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
              <p className="text-center text-gray-700 mb-8">
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

      {/* Facilities Overview Section */}
      <section className="py-20 bg-white" id="facilities">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Facilities</h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Pakare Paye Arts Centre offers a variety of world-class facilities designed to nurture creativity, 
                host events, and provide a complete artistic experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedFacility(facility)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={facility.images[0]} 
                      alt={facility.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <div className="text-3xl mb-2">{facility.icon}</div>
                        <h3 className="text-xl font-bold mb-1">{facility.title}</h3>
                        <p className="text-sm text-white/80">{facility.subtitle}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4 line-clamp-3">{facility.description}</p>
                    <button className="text-accent hover:text-accent-dark font-semibold inline-flex items-center transition-colors">
                      Learn more
                      <FaChevronRight className="ml-1 text-sm" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Want to experience these facilities in person? Book a tour or inquire about availability for your next event.
              </p>
              <a 
                href="#booking" 
                className="bg-accent text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center justify-center hover:bg-accent-dark"
              >
                Book a Facility
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Programmes Section */}
      <section className="py-20 bg-gray-50" id="programmes">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Programmes</h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Pakare Paye Arts Centre offers various programmes designed to nurture talent, 
                celebrate culture, and engage the community.
              </p>
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
                  <p className="text-lg text-gray-700 mb-6">{mentorshipProgram.description}</p>
                  
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Notable Alumni</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentorshipProgram.alumni.map((artist, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
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
                        <span>One-on-one mentorship with established artists</span>
                      </li>
                      <li className="flex items-start">
                        <FaChevronRight className="text-accent mt-1 mr-2" />
                        <span>Regular performance opportunities</span>
                      </li>
                      <li className="flex items-start">
                        <FaChevronRight className="text-accent mt-1 mr-2" />
                        <span>Access to recording facilities</span>
                      </li>
                      <li className="flex items-start">
                        <FaChevronRight className="text-accent mt-1 mr-2" />
                        <span>Career development guidance</span>
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
                    <img src={mentorshipProgram.images[0]} alt="Mentorship session" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img src={mentorshipProgram.images[1]} alt="Alumni performance" className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Signature Events */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Signature Events</h3>
                <div className="w-16 h-1 bg-accent mx-auto mb-6"></div>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
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
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h4>
                      <p className="text-gray-700">{event.description}</p>
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
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
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
                    <p className="text-gray-700">
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
                    <p className="text-gray-700">
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
                    <p className="text-gray-700">
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
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">About Pakare Paye</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                  <img src={interiorImage1} alt="Pakare Paye Interior" className="w-full h-64 object-cover" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Cultural Sanctuary</h3>
                <p className="mb-6 text-gray-800">
                  Located in the Knowe area of Norton, Zimbabwe, about 45km from Harare, Pakare Paye Arts Centre is more than just a venue. 
                  It is a living testament to Oliver Mtukudzi's vision of nurturing artistic talent 
                  and preserving cultural expression through creative platforms.
                </p>
                <div className="flex items-center mb-6">
                  <FaMapMarkerAlt className="text-accent mr-2" />
                  <span className="text-gray-800">238 Galloway Road, Norton, Zimbabwe</span>
                </div>
                <div className="flex items-center mb-6">
                  <FaHistory className="text-accent mr-2" />
                  <span className="text-gray-800">Established in 2003, officially opened October 3, 2004</span>
                </div>
              </div>
              <div>
                <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                  <img src={interiorImage2} alt="Pakare Paye Interior" className="w-full h-64 object-cover" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Artistic Mission</h3>
                <p className="mb-6 text-gray-800">
                  Named after Mtukudzi's iconic song "Pakare Paye" (meaning "Long Ago"), the center 
                  serves as a beacon of creativity, education, and cultural celebration, 
                  empowering artists and connecting communities through shared artistic experiences.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <FaQuoteLeft className="text-accent mb-2" />
                  <p className="text-gray-800 italic">
                    "This is not a school. We don't deal with education here – we deal with talent. A college says, 'we will teach you' but we say 'you have got it, let's learn'."
                  </p>
                  <p className="text-right text-gray-600 mt-2">— Oliver Mtukudzi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking & Contact Section */}
      <section className="py-20 bg-white" id="booking">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Book & Contact</h2>
              <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
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
                    <p className="text-gray-700 mb-4">
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
                    <p className="text-gray-700 mb-4">
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
                    <p className="text-gray-700 mb-4">
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
                    <p className="text-gray-700 mb-4">
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
                  <img 
                    src={frontDesk} 
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
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Your Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="inquiry" className="block text-gray-700 font-medium mb-1">Inquiry Type</label>
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
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Your Message</label>
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
              <img 
                src={pakarePaye} 
                alt="Pakare Paye Arts Centre Signage" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Core Values</h2>
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

      {/* History Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">History</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img src={exteriorImage2} alt="Pakare Paye Exterior" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img src={artistImage1} alt="Artists at Pakare Paye" className="w-full h-64 object-cover" />
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <p className="mb-6 text-gray-800">
                Using his personal savings, Oliver Mtukudzi purchased an old factory in Norton, tore it down, and built the Pakare Paye Arts Centre. 
                What was once used as a warehouse has been transformed into a vibrant cultural hub that embodies Tuku's vision for artistic development.
              </p>
              <p className="mb-6 text-gray-800">
                The centre operates on an "open door policy" which enables young people to visit the place and interact with the surroundings and learn without paying a fee. 
                This approach has made it accessible to many aspiring artists who might otherwise not have had the opportunity to develop their talents.
              </p>
              <p className="text-gray-800">
                Funding for the centre now comes from income earned through the chalets and traditional restaurant that are open to locals and tourists, 
                creating a sustainable model for supporting artistic development. The centre has also received support from organizations such as the 
                Culture Fund in partnership with the Embassy of Sweden and Nyaradzo Group.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Facilities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedFacility(facility)}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{facility.title}</h3>
                  <p className="text-gray-700">{facility.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Artists Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Artists Nurtured at Pakare Paye</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img src={artistImage1} alt="Artists at Pakare Paye" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img src={artistImage1} alt="Artists at Pakare Paye" className="w-full h-64 object-cover" />
              </div>
            </div>
            <p className="text-center text-gray-800 mb-8">
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

      {/* Visit Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Visit Pakare Paye</h2>
            <p className="text-xl text-gray-800 mb-8">
              Experience the vibrant cultural atmosphere of Pakare Paye Arts Centre. Whether you're interested in attending a performance, 
              participating in a workshop, or simply enjoying the beautiful surroundings, we welcome visitors from all walks of life.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <FaCalendarAlt className="text-4xl text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
                <p className="text-gray-700">Monday - Sunday<br />9:00 AM - 5:00 PM</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <FaMapMarkerAlt className="text-4xl text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-gray-700">238 Galloway Road<br />Norton, Zimbabwe</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <FaUsers className="text-4xl text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Group Tours</h3>
                <p className="text-gray-700">Available by appointment<br />Contact for details</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
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
                    <a href="#facilities" className="text-gray-400 hover:text-white transition-colors flex items-center">
                      <FaChevronRight className="mr-2 text-xs" /> Facilities
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

      {/* Modal for facility details */}
      {selectedFacility && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFacility(null)}
        >
          <motion.div 
            className="bg-white rounded-lg overflow-hidden max-w-4xl w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-4 p-4">
              <div className="h-80 overflow-hidden rounded-lg">
                <img 
                  src={selectedFacility.images[0]} 
                  alt={selectedFacility.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-80 overflow-hidden rounded-lg">
                <img 
                  src={selectedFacility.images[1]} 
                  alt={`${selectedFacility.title} - Additional View`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{selectedFacility.title}</h3>
              <p className="text-gray-700 mb-6">{selectedFacility.description}</p>
              <button 
                className="bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-dark transition-colors"
                onClick={() => setSelectedFacility(null)}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PakarePaye;
