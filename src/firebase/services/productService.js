import { db } from '../config.js';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    doc, 
    deleteDoc, 
    getDocs,
    query,
    where,
    orderBy
} from 'firebase/firestore';

export const addProduct = async (productData) => {
    try {
        // Transform variants array into a structured format
        const variants = productData.variants.map(variant => ({
            id: `${variant.color}-${variant.size}`.toLowerCase().replace(/\s+/g, '-'),
            color: variant.color,
            size: variant.size,
            quantity: parseInt(variant.quantity),
            sku: variant.sku || `${productData.name}-${variant.color}-${variant.size}`.toLowerCase().replace(/\s+/g, '-')
        }));

        // Get unique colors and sizes from variants
        const colors = [...new Set(variants.map(v => v.color))];
        const sizes = [...new Set(variants.map(v => v.size))];

        const productToAdd = {
            name: productData.name,
            description: productData.description,
            price: parseFloat(productData.price),
            category: productData.category,
            variants,
            colors,
            sizes,
            images: productData.images || [],
            featured: productData.featured || false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: 'active',
            totalQuantity: variants.reduce((sum, variant) => sum + variant.quantity, 0)
        };

        const docRef = await addDoc(collection(db, 'products'), productToAdd);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding product:', error);
        return { success: false, error };
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const productRef = doc(db, 'products', productId);
        
        let updateData = {
            ...productData,
            updatedAt: new Date().toISOString()
        };

        if (productData.variants) {
            const variants = productData.variants.map(variant => ({
                id: `${variant.color}-${variant.size}`.toLowerCase().replace(/\s+/g, '-'),
                color: variant.color,
                size: variant.size,
                quantity: parseInt(variant.quantity),
                sku: variant.sku || `${productData.name}-${variant.color}-${variant.size}`.toLowerCase().replace(/\s+/g, '-')
            }));

            updateData = {
                ...updateData,
                variants,
                colors: [...new Set(variants.map(v => v.color))],
                sizes: [...new Set(variants.map(v => v.size))],
                totalQuantity: variants.reduce((sum, variant) => sum + variant.quantity, 0)
            };
        }

        if (productData.price) {
            updateData.price = parseFloat(productData.price);
        }

        await updateDoc(productRef, updateData);
        return { success: true };
    } catch (error) {
        console.error('Error updating product:', error);
        return { success: false, error };
    }
};

export const deleteProduct = async (productId) => {
    try {
        const productRef = doc(db, 'products', productId);
        await deleteDoc(productRef);
        return { success: true };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { success: false, error };
    }
};

export const getProducts = async (category = null) => {
    try {
        let productsQuery;
        if (category) {
            productsQuery = query(
                collection(db, 'products'),
                where('category', '==', category),
                where('status', '==', 'active'),
                orderBy('createdAt', 'desc')
            );
        } else {
            productsQuery = query(
                collection(db, 'products'),
                where('status', '==', 'active'),
                orderBy('createdAt', 'desc')
            );
        }

        const querySnapshot = await getDocs(productsQuery);
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, products };
    } catch (error) {
        console.error('Error fetching products:', error);
        return { success: false, error };
    }
};

export const getFeaturedProducts = async () => {
    try {
        const productsQuery = query(
            collection(db, 'products'),
            where('featured', '==', true),
            where('status', '==', 'active'),
            orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(productsQuery);
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, products };
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return { success: false, error };
    }
};
