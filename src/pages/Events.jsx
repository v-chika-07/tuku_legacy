import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaTicketAlt,
  FaInfoCircle,
  FaRunning
} from 'react-icons/fa';
import { fetchEvents } from '../services/eventService';
import defaultEventImage from '../assets/images/IMG-20241218-WA0005.jpg';

const EventHero = ({ event, index }) => {
  // Define gradient colors using the app's theme, switching start and end
  const gradientColors = [
    { from: 'from-zunzo-secondary', to: 'to-zunzo-primary' },
    { from: 'from-zunzo-primary', to: 'to-zunzo-secondary' },
    { from: 'from-zunzo-accent', to: 'to-zunzo-primary' },
    { from: 'from-zunzo-primary', to: 'to-zunzo-accent' },
    { from: 'from-zunzo-secondary', to: 'to-zunzo-accent' }
  ];

  // Cycle through gradient colors based on event index
  const { from, to } = gradientColors[index % gradientColors.length];

  // Ensure event is defined and has all required properties
  const safeEvent = {
    id: event?.id || 'unknown',
    name: event?.name || 'Unnamed Event',
    eventType: event?.eventType || 'single',
    date: event?.date || '',
    startDate: event?.startDate || '',
    endDate: event?.endDate || '',
    description: event?.description || 'No description available',
    location: event?.location || 'TBA',
    registrationFee: event?.registrationFee || 'TBA',
    imageUrl: event?.imageUrl || defaultEventImage
  };

  // Determine date display based on event type
  const eventDateDisplay = safeEvent.eventType === 'multi' 
    ? `${safeEvent.startDate} - ${safeEvent.endDate}` 
    : safeEvent.date;

  // Format registration fee with dollar sign
  const formattedRegistrationFee = safeEvent.registrationFee === 'TBA' 
    ? 'TBA' 
    : `$${safeEvent.registrationFee}`;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`relative bg-gradient-to-br ${from} ${to} text-white py-20 my-8`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Event Image */}
            <div className="w-full md:w-1/3 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={safeEvent.imageUrl} 
                alt={safeEvent.name} 
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Event Details */}
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">{safeEvent.name}</h2>
              
              {/* Event Type and Date */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <FaRunning className="text-white text-xl" />
                  <span className="text-sm uppercase">
                    {safeEvent.eventType === 'multi' ? 'Multi-Day Event' : 'Single Day Event'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-white text-xl" />
                  <span>{eventDateDisplay}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2 mb-4">
                <FaMapMarkerAlt className="text-white text-xl" />
                <span>{safeEvent.location}</span>
              </div>

              {/* Description */}
              <p className="mb-4 opacity-90">{safeEvent.description}</p>

              {/* Registration */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FaTicketAlt className="text-white text-xl" />
                  <span>Registration Fee: {formattedRegistrationFee}</span>
                </div>
                <Link to={`/registration?eventId=${safeEvent.id}`}>
                  <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors">
                    Register Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        console.log('Fetched Events in Component:', fetchedEvents);
        
        // Filter out any undefined or null events
        const validEvents = fetchedEvents.filter(event => event && event.name);
        
        setEvents(validEvents);
        setLoading(false);
      } catch (err) {
        console.error("Error loading events:", err);
        setError(err);
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-2xl">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-2xl text-red-500">Error loading events. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Main Events Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-gradient-to-br from-zunzo-primary via-zunzo-secondary to-zunzo-accent text-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Zunzo Running Club Events</h1>
            <p className="text-xl mb-8 text-white">
              Discover our upcoming running events that inspire community wellness, 
              promote health awareness, and bring runners together through shared passion and achievement.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Events List */}
      <div>
        {events.length === 0 ? (
          <div className="text-center py-20 bg-gray-100">
            <p className="text-2xl text-gray-600">No events found. Please check back later.</p>
          </div>
        ) : (
          events.map((event, index) => (
            <EventHero key={event.id} event={event} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
