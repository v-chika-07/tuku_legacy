import { getFirestore } from 'firebase/firestore';
import { app } from '../config.js';

// Get Firestore instance
const db = getFirestore(app);

export { db };
