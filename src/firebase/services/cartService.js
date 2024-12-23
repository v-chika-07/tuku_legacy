import { db } from '../config';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';

const CART_COLLECTION = 'carts';

export const getCart = async (userId) => {
  try {
    const cartQuery = query(collection(db, CART_COLLECTION), where("userId", "==", userId));
    const querySnapshot = await getDocs(cartQuery);
    
    if (querySnapshot.empty) {
      // Create a new cart if none exists
      const newCart = await addDoc(collection(db, CART_COLLECTION), {
        userId,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { id: newCart.id, items: [] };
    }

    const cartDoc = querySnapshot.docs[0];
    return { id: cartDoc.id, ...cartDoc.data() };
  } catch (error) {
    console.error('Error getting cart:', error);
    return null;
  }
};

export const addToCart = async (userId, item, updateItemCountCallback = null) => {
  try {
    const cart = await getCart(userId);
    if (!cart) throw new Error('Failed to get cart');

    const existingItemIndex = cart.items.findIndex(i => 
      i.productId === item.productId && 
      i.color === item.color && 
      i.size === item.size
    );

    let updatedItems;
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      updatedItems = [...cart.items];
      updatedItems[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      updatedItems = [...cart.items, item];
    }

    await updateDoc(doc(db, CART_COLLECTION, cart.id), {
      items: updatedItems,
      updatedAt: new Date()
    });

    // Only call callback if it's a function
    if (typeof updateItemCountCallback === 'function') {
      updateItemCountCallback(updatedItems.reduce((acc, item) => acc + item.quantity, 0));
    }

    return { success: true, items: updatedItems };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, error: error.message };
  }
};

export const removeFromCart = async (userId, itemIndex, updateItemCountCallback = null) => {
  try {
    const cart = await getCart(userId);
    if (!cart) throw new Error('Failed to get cart');

    const updatedItems = cart.items.filter((_, index) => index !== itemIndex);

    await updateDoc(doc(db, CART_COLLECTION, cart.id), {
      items: updatedItems,
      updatedAt: new Date()
    });

    // Only call callback if it's a function
    if (typeof updateItemCountCallback === 'function') {
      updateItemCountCallback(updatedItems.reduce((acc, item) => acc + item.quantity, 0));
    }

    return { success: true, items: updatedItems };
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { success: false, error: error.message };
  }
};

export const updateCartItemQuantity = async (userId, itemIndex, quantity, updateItemCountCallback = null) => {
  try {
    const cart = await getCart(userId);
    if (!cart) throw new Error('Failed to get cart');

    const updatedItems = [...cart.items];
    updatedItems[itemIndex].quantity = quantity;

    await updateDoc(doc(db, CART_COLLECTION, cart.id), {
      items: updatedItems,
      updatedAt: new Date()
    });

    // Only call callback if it's a function
    if (typeof updateItemCountCallback === 'function') {
      updateItemCountCallback(updatedItems.reduce((acc, item) => acc + item.quantity, 0));
    }

    return { success: true, items: updatedItems };
  } catch (error) {
    console.error('Error updating cart item:', error);
    return { success: false, error: error.message };
  }
};

export const clearCart = async (userId, updateItemCountCallback = null) => {
  try {
    const cart = await getCart(userId);
    if (!cart) throw new Error('Failed to get cart');

    await updateDoc(doc(db, CART_COLLECTION, cart.id), {
      items: [],
      updatedAt: new Date()
    });

    // Only call callback if it's a function
    if (typeof updateItemCountCallback === 'function') {
      updateItemCountCallback(0);
    }

    return { success: true };
  } catch (error) {
    console.error('Error clearing cart:', error);
    return { success: false, error: error.message };
  }
};

export const clearUserCart = async (userId) => {
  try {
    const cart = await getCart(userId);
    if (!cart) throw new Error('Failed to get cart');

    await updateDoc(doc(db, CART_COLLECTION, cart.id), {
      items: [],
      updatedAt: new Date()
    });

    return { success: true };
  } catch (error) {
    console.error('Error clearing cart:', error);
    return { success: false, error: error.message };
  }
};
