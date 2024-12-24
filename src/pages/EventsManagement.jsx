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
    registrationFee: ''
  });
  const [editingEvent, setEditingEvent] = useState(null);

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

      await addDoc(collection(db, 'events'), newEvent);
      toast.success('Event added successfully');
      setNewEvent({
        name: '',
        eventType: 'single',
        date: '',
        startDate: '',
        endDate: '',
        description: '',
        location: '',
        registrationFee: ''
      });
      setShowEventForm(false);
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

      const eventRef = doc(db, 'events', editingEvent.id);
      await updateDoc(eventRef, newEvent);
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
        registrationFee: ''
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
                registrationFee: ''
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
                    <label className="block text-white mb-2">Registration Fee</label>
                    <input
                      type="number"
                      name="registrationFee"
                      value={newEvent.registrationFee}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                      required
                    />
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
                        registrationFee: ''
                      });
                    }}
                    className="ml-4 bg-red-500/20 text-white px-6 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
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
              <div className="grid grid-cols-2 gap-6">
                {events.map(event => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/20 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white">{event.name}</h3>
                      {event.eventType === 'single' ? (
                        <p className="text-white/60">{event.date} | {event.location}</p>
                      ) : (
                        <p className="text-white/60">{event.startDate} - {event.endDate} | {event.location}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => startEditing(event)}
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-500/70 hover:text-red-500 transition-colors"
                      >
                        <FaTrash />
                      </button>
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
