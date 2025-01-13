import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaInfoCircle,
  FaRunning
} from 'react-icons/fa';
import { fetchEvents } from '../services/eventService';
import defaultEventImage from '../assets/images/IMG-20241218-WA0005.jpg';
import image1 from '../assets/images/IMG-20241218-WA0007.jpg';
import image2 from '../assets/images/IMG-20241218-WA0008.jpg';

const EventHero = ({ event, index }) => {
  // Define gradient colors using the app's theme, switching start and end
  const gradientColors = [
    { from: 'from-zunzo-secondary', to: 'to-zunzo-primary' },
    { from: 'from-zunzo-primary', to: 'to-zunzo-secondary' },
    { from: 'from-zunzo-accent', to: 'to-zunzo-primary' },
    { from: 'from-zunzo-primary', to: 'to-zunzo-accent' },
    { from: 'from-zunzo-secondary', to: 'to-zunzo-accent' },
    { from: 'from-zunzo-accent', to: 'to-zunzo-secondary' },
    { from: 'from-zunzo-primary', to: 'to-zunzo-secondary' },
    { from: 'from-zunzo-secondary', to: 'to-zunzo-primary' },
    { from: 'from-zunzo-accent', to: 'to-zunzo-secondary' },
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
    description: event?.description,
    location: event?.location || 'TBA',
    ticketTypes: event?.ticketTypes || [],
    imageUrl: event?.imageUrl || defaultEventImage,
    status: event?.status || 'live'
  };

  // Debug logging
  console.log('Event Object:', event);
  console.log('Safe Event:', safeEvent);

  // Determine date display based on event type
  const eventDateDisplay = safeEvent.eventType === 'multi' 
    ? `${safeEvent.startDate} - ${safeEvent.endDate}` 
    : safeEvent.date;

  return (
    <>
      <motion.div 
        key={safeEvent.id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.6, 
            delay: index * 0.2,  // Stagger the animation based on index
            ease: "easeOut" 
          } 
        }}
        className="bg-white rounded-lg p-4 flex space-x-6 shadow-lg overflow-hidden"
      >
        {/* Event Image */}
        <div className="w-1/3 flex-shrink-0">
          <img 
            src={safeEvent.imageUrl} 
            alt={safeEvent.name}
            className="w-full h-56 object-cover rounded-lg"
          />
        </div>

        {/* Event Details */}
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <h2 className="text-black font-bold text-xl truncate max-w-full text-left">{safeEvent.name}</h2>
            </div>
            {safeEvent.eventType === 'single' ? (
              <p className="text-gray-700 mb-2 text-left">{safeEvent.date} | {safeEvent.location}</p>
            ) : (
              <p className="text-gray-700 mb-2 text-left">{safeEvent.startDate} - {safeEvent.endDate} | {safeEvent.location}</p>
            )}

            {/* Event Description */}
            <div className="mb-4">
              <h3 className="text-black font-semibold mb-2 text-left">Event Description</h3>
              <p className="text-gray-700 text-left">{safeEvent.description}</p>
            </div>

            {safeEvent.ticketTypes && safeEvent.ticketTypes.length > 0 && (
              <div className="flex space-x-2 mb-2">
                {safeEvent.ticketTypes.map(ticket => (
                  <span 
                    key={ticket.id} 
                    className="px-2 py-1 bg-gray-100 text-black rounded-full text-xs"
                  >
                    {ticket.name}: ${ticket.price}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
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
    <div className="pt-20 min-h-screen relative">
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-white text-center">Upcoming Events</h1>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          {events.map((event, index) => (
            <EventHero key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
