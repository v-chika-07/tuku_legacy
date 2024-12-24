import { 
  collection, 
  getDocs, 
  query, 
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const fetchEvents = async () => {
  try {
    const eventsRef = collection(db, 'events');
    
    // Query to get events sorted by date
    const q = query(
      eventsRef, 
      orderBy('date', 'asc')
    );

    const querySnapshot = await getDocs(q);
    
    const events = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log('Fetched Events:', events);
    
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const getFeaturedEvent = async () => {
  try {
    const eventsRef = collection(db, 'events');
    
    // Query to get events
    const q = query(eventsRef);

    const querySnapshot = await getDocs(q);
    
    const events = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log('All Events:', events);

    // Find featured event or return first event
    const featuredEvent = events.find(event => event.featured) || events[0];
    
    return featuredEvent || null;
  } catch (error) {
    console.error("Error fetching featured event:", error);
    return null;
  }
};
