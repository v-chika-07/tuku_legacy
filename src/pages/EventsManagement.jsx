import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc 
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase/config';
import { FaCalendarAlt, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { uploadImage } from '../services/uploadService';

const EventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    eventType: 'single', // 'single' or 'multi'
    date: '', // for single day events
    startDate: '', // for multi-day events
    endDate: '', // for multi-day events
    description: '',
    location: '',
    status: 'standby', 
    ticketTypes: [] || null,
    ticketSales: 0,
    revenue: 0,
    imageUrl: ''
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [newTicketType, setNewTicketType] = useState({
    name: '',
    price: '',
    description: ''
  });
  const [eventImage, setEventImage] = useState(null);

  useEffect(() => {
    const eventsQuery = query(collection(db, 'events'));
    const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
      const fetchedEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(fetchedEvents);
    }, (error) => {
      console.error("Error fetching events:", error);
      toast.error('Failed to load events');
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      // Validate event data based on type
      if (newEvent.eventType === 'single' && !newEvent.date) {
        toast.error('Please select an event date');
        return;
      }
      
      if (newEvent.eventType === 'multi' && (!newEvent.startDate || !newEvent.endDate)) {
        toast.error('Please select start and end dates for multi-day events');
        return;
      }

      // Ensure end date is after start date for multi-day events
      if (newEvent.eventType === 'multi' && new Date(newEvent.endDate) < new Date(newEvent.startDate)) {
        toast.error('End date must be after start date');
        return;
      }

      // Validate ticket types
      if (!newEvent.ticketTypes || newEvent.ticketTypes.length === 0) {
        toast.error('Please add at least one ticket type');
        return;
      }

      // Log the full event data before adding
      console.log('Adding Event:', {
        ...newEvent,
        ticketTypes: newEvent.ticketTypes || []
      });

      const eventToAdd = { ...newEvent };
      
      // Upload image if exists
      let imageUrl = null;
      if (eventImage && eventImage.file) {
        try {
          imageUrl = await uploadImage(eventImage.file);
        } catch (uploadError) {
          toast.error('Failed to upload image');
          return;
        }
      }

      // Add image URL to event if uploaded
      if (imageUrl) {
        eventToAdd.imageUrl = imageUrl;
      }

      // Create event first to get the ID for image upload
      const result = await addDoc(collection(db, 'events'), eventToAdd);
      
      if (result.id) {
        toast.success('Event added successfully');
        setNewEvent({
          name: '',
          eventType: 'single',
          date: '',
          startDate: '',
          endDate: '',
          description: '',
          location: '',
          status: 'standby',
          ticketTypes: [],
          ticketSales: 0,
          revenue: 0,
          imageUrl: ''
        });
        setEventImage(null);
        setShowEventForm(false);
      } else {
        toast.error('Failed to add event');
      }
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error('Failed to add event');
    }
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    if (!editingEvent) return;

    try {
      // Validate event data based on type
      if (newEvent.eventType === 'single' && !newEvent.date) {
        toast.error('Please select an event date');
        return;
      }
      
      if (newEvent.eventType === 'multi' && (!newEvent.startDate || !newEvent.endDate)) {
        toast.error('Please select start and end dates for multi-day events');
        return;
      }

      // Ensure end date is after start date for multi-day events
      if (newEvent.eventType === 'multi' && new Date(newEvent.endDate) < new Date(newEvent.startDate)) {
        toast.error('End date must be after start date');
        return;
      }

      // Validate ticket types
      if (!newEvent.ticketTypes || newEvent.ticketTypes.length === 0) {
        toast.error('Please add at least one ticket type');
        return;
      }

      // Log the full event data before updating
      console.log('Updating Event:', {
        ...newEvent,
        ticketTypes: newEvent.ticketTypes || []
      });

      const eventRef = doc(db, 'events', editingEvent.id);
      await updateDoc(eventRef, {
        ...newEvent,
        ticketTypes: newEvent.ticketTypes || [] // Ensure ticket types are added
      });
      
      toast.success('Event updated successfully');
      setEditingEvent(null);
      setNewEvent({
        name: '',
        eventType: 'single',
        date: '',
        startDate: '',
        endDate: '',
        description: '',
        location: '',
        status: 'standby',
        ticketTypes: [],
        ticketSales: 0,
        revenue: 0,
        imageUrl: ''
      });
      setShowEventForm(false);
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error('Failed to update event');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(db, 'events', eventId));
      toast.success('Event deleted successfully');
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error('Failed to delete event');
    }
  };

  const startEditing = (event) => {
    setEditingEvent(event);
    setNewEvent({ ...event });
    setShowEventForm(true);
    
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleAddTicketType = () => {
    // Validate ticket type
    if (!newTicketType.name || !newTicketType.price) {
      toast.error('Please provide ticket type name and price');
      return;
    }

    // Add ticket type to event
    setNewEvent(prev => ({
      ...prev,
      ticketTypes: [
        ...prev.ticketTypes, 
        {
          ...newTicketType,
          id: Date.now().toString() // Unique identifier
        }
      ]
    }));

    // Reset ticket type form
    setNewTicketType({
      name: '',
      price: '',
      description: ''
    });
  };

  const handleRemoveTicketType = (ticketId) => {
    setNewEvent(prev => ({
      ...prev,
      ticketTypes: prev.ticketTypes.filter(ticket => ticket.id !== ticketId)
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventImage({
          file: file,
          preview: reader.result
        });
        setNewEvent(prev => ({
          ...prev,
          imageUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-primary via-secondary to-accent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto md:px-12 lg:px-24 xl:px-36 2xl:px-48 py-8"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-4 rounded-full bg-black/20 backdrop-blur-sm mb-6"
          >
            <FaCalendarAlt className="text-4xl text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Events Management
          </motion.h1>
        </div>

        {/* Add Event Button */}
        <div className="text-center mb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => {
              setShowEventForm(true);
              setEditingEvent(null);
              setNewEvent({
                name: '',
                eventType: 'single',
                date: '',
                startDate: '',
                endDate: '',
                description: '',
                location: '',
                status: 'standby',
                ticketTypes: [],
                ticketSales: 0,
                revenue: 0,
                imageUrl: ''
              });
            }}
            className="bg-white/20 text-white px-6 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center mx-auto"
          >
            <FaPlus className="mr-2" /> Add New Event
          </motion.button>
        </div>

        {/* Add/Edit Event Form */}
        <AnimatePresence>
          {showEventForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="max-w-3xl mx-auto bg-gradient-to-r from-accent via-secondary to-primary rounded-2xl p-8 mb-8 shadow-xl"
            >
              <form onSubmit={editingEvent ? handleEditEvent : handleAddEvent}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Event Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newEvent.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Event Type</label>
                    <select
                      name="eventType"
                      value={newEvent.eventType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                      required
                    >
                      <option value="single">Single</option>
                      <option value="multi">Multi</option>
                    </select>
                  </div>
                </div>
                {newEvent.eventType === 'single' ? (
                  <div>
                    <label className="block text-white mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={newEvent.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                      required
                    />
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={newEvent.startDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={newEvent.endDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                        required
                      />
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <label className="block text-white mb-2">Description</label>
                  <textarea
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-white mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={newEvent.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Event Image</label>
                    <input
                      type="file"
                      name="imageUrl"
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                    {(eventImage || newEvent.imageUrl) && (
                      <div className="mt-4 flex justify-center">
                        <img 
                          src={eventImage?.preview || newEvent.imageUrl} 
                          alt="Event Preview" 
                          className="w-64 h-40 object-cover rounded-lg shadow-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* Ticket Types */}
                <div className="mt-4">
                  <h3 className="text-white mb-2">Ticket Types</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2">Ticket Type Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newTicketType.name}
                        onChange={(e) => setNewTicketType(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">Ticket Type Price</label>
                      <input
                        type="number"
                        name="price"
                        value={newTicketType.price}
                        onChange={(e) => setNewTicketType(prev => ({ ...prev, price: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-white mb-2">Ticket Type Description</label>
                    <textarea
                      name="description"
                      value={newTicketType.description}
                      onChange={(e) => setNewTicketType(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddTicketType}
                    className="bg-white/20 text-white px-6 py-2 rounded-lg hover:bg-white/30 transition-colors mt-4"
                  >
                    Add Ticket Type
                  </button>
                  {newEvent.ticketTypes.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-white mb-2">Added Ticket Types</h4>
                      <ul>
                        {newEvent.ticketTypes.map(ticket => (
                          <li key={ticket.id} className="flex justify-between items-center mb-2">
                            <span className="text-white">{ticket.name} - {ticket.price}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTicketType(ticket.id)}
                              className="text-red-500/70 hover:text-red-500 transition-colors"
                            >
                              <FaTrash />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* Status Toggle */}
                <div className="mb-4">
                  <label className="block text-white mb-2">Event Status</label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="live"
                        checked={newEvent.status === 'live'}
                        onChange={handleInputChange}
                        className="form-radio text-accent"
                      />
                      <span className="ml-2 text-green-300">{event.status === 'live' ? 'Live' : 'Standby'}</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="standby"
                        checked={newEvent.status === 'standby'}
                        onChange={handleInputChange}
                        className="form-radio text-accent"
                      />
                      <span className="ml-2 text-yellow-300">{event.status === 'live' ? 'Live' : 'Standby'}</span>
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-white/20 text-white px-6 py-2 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    {editingEvent ? 'Update Event' : 'Add Event'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEventForm(false);
                      setEditingEvent(null);
                      setNewEvent({
                        name: '',
                        eventType: 'single',
                        date: '',
                        startDate: '',
                        endDate: '',
                        description: '',
                        location: '',
                        status: 'standby',
                        ticketTypes: [],
                        ticketSales: 0,
                        revenue: 0,
                        imageUrl: ''
                      });
                    }}
                    className="ml-4 bg-red-500/20 text-red-300 px-6 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Events List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-accent via-secondary to-primary rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Existing Events</h2>
            {events.length === 0 ? (
              <p className="text-white/60 text-center">No events found</p>
            ) : (
              <div className="space-y-6">
                {events.map(event => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-lg p-4 flex space-x-6 shadow-lg overflow-hidden"
                  >
                    {/* Event Image */}
                    <div className="w-1/3 flex-shrink-0">
                      <img 
                        src={event.imageUrl || 'https://via.placeholder.com/300x200.png?text=Event+Image'} 
                        alt={event.name}
                        className="w-full h-56 object-cover rounded-lg"
                      />
                    </div>

                    {/* Event Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-4 mb-2">
                          <h2 className="text-black font-bold text-xl truncate max-w-full">{event.name}</h2>
                          <span 
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              event.status === 'live' 
                                ? 'bg-green-500/20 text-green-700' 
                                : 'bg-yellow-500/20 text-yellow-700'
                            }`}
                          >
                            {event.status === 'live' ? 'Live' : 'Standby'}
                          </span>
                        </div>
                        {event.eventType === 'single' ? (
                          <p className="text-gray-700 mb-2">{event.date} | {event.location}</p>
                        ) : (
                          <p className="text-gray-700 mb-2">{event.startDate} - {event.endDate} | {event.location}</p>
                        )}

                        {event.ticketTypes && event.ticketTypes.length > 0 && (
                          <div className="flex space-x-2 mb-2">
                            {event.ticketTypes.map(ticket => (
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

                      {/* Event Sales Statistics */}
                      <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg mb-2">
                        <div className="flex flex-col items-center">
                          <span className="text-gray-600 text-sm mb-1">Ticket Sales</span>
                          <span className="text-black text-2xl font-bold">
                            {event.ticketSales || 0}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-gray-600 text-sm mb-1">Total Revenue</span>
                          <span className="text-black text-2xl font-bold">
                            <span className="text-green-600">$</span>{(event.revenue || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Event Actions */}
                      <div className="flex justify-start">
                        <button
                          onClick={() => startEditing(event)}
                          className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors mr-2"
                        >
                          <FaEdit className="inline-block mr-2" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <FaTrash className="inline-block mr-2" /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EventsManagement;
