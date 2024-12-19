import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config';

const COLLECTION_NAME = 'contact_submissions';

export const submitContactForm = async (contactData) => {
  try {
    // Validate the database connection
    if (!db) {
      throw new Error('Database connection not established');
    }

    // Add timestamp to the data
    const dataToSubmit = {
      ...contactData,
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString() // Fallback client-side timestamp
    };

    // Get collection reference
    const collectionRef = collection(db, COLLECTION_NAME);
    
    // Add the document
    const docRef = await addDoc(collectionRef, dataToSubmit);
    
    return { 
      success: true, 
      id: docRef.id,
      message: 'Message sent successfully!'
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw {
      success: false,
      error: error.message || 'Failed to send message',
      details: error
    };
  }
};
