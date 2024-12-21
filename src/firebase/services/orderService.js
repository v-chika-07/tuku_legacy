import { db } from '../config';
import { collection, addDoc, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { clearCart } from './cartService';

const ORDERS_COLLECTION = 'orders';

export const createOrder = async (userId, orderData) => {
  try {
    const orderRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      userId,
      ...orderData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    // Clear the cart after successful order
    await clearCart(userId);

    return { success: true, orderId: orderRef.id };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message };
  }
};

export const getOrder = async (orderId) => {
  try {
    const orderDoc = await getDoc(doc(db, ORDERS_COLLECTION, orderId));
    if (!orderDoc.exists()) {
      throw new Error('Order not found');
    }
    return { success: true, order: { id: orderDoc.id, ...orderDoc.data() } };
  } catch (error) {
    console.error('Error getting order:', error);
    return { success: false, error: error.message };
  }
};

export const getUserOrders = async (userId) => {
  try {
    const ordersQuery = query(
      collection(db, ORDERS_COLLECTION),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(ordersQuery);
    
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return { success: true, orders };
  } catch (error) {
    console.error('Error getting user orders:', error);
    return { success: false, error: error.message };
  }
};
