import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config';
import { sendRegistrationEmail } from '../../services/emailService';

const COLLECTION_NAME = 'event_registrations';

export const submitEventRegistration = async (registrationData) => {
  try {
    // Validate the database connection
    if (!db) {
      throw new Error('Database connection not established');
    }

    // Add timestamp to the data
    const dataToSubmit = {
      ...registrationData,
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString() // Fallback client-side timestamp
    };

    // Get collection reference
    const collectionRef = collection(db, COLLECTION_NAME);
    
    // Add the document
    const docRef = await addDoc(collectionRef, dataToSubmit);

    // Send confirmation email
    try {
      await sendRegistrationEmail(registrationData);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't throw the error as registration was successful
    }
    
    return { 
      success: true, 
      id: docRef.id,
      message: 'Registration submitted successfully!'
    };
  } catch (error) {
    console.error('Error submitting event registration:', error);
    throw {
      success: false,
      error: error.message || 'Failed to submit registration',
      details: error
    };
  }
};
