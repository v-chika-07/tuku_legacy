import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBoxes, FaSpinner, FaPlus, FaPencilAlt, FaSave, FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { addProduct, updateProduct, deleteProduct } from '../firebase/services/productService';
import ProductVariants from '../components/ProductVariants';
import { db } from '../firebase/config.js';
import { collection, query, onSnapshot } from 'firebase/firestore';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    variants: []
  });
  const [newProductImages, setNewProductImages] = useState({});
  const [editingImages, setEditingImages] = useState({});
  const [expandedProduct, setExpandedProduct] = useState(null);

  useEffect(() => {
    const productsQuery = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (newProduct.variants.length === 0) {
      toast.error('Please add at least one product variant');
      return;
    }

    // Validate that each color has an image URL
    const colors = [...new Set(newProduct.variants.map(v => v.color))];
    const missingImages = colors.filter(color => !newProductImages[color]);
    if (missingImages.length > 0) {
      toast.error(`Please add image URLs for: ${missingImages.join(', ')}`);
      return;
    }

    setLoading(true);
    try {
      const productToAdd = {
        ...newProduct,
        images: newProductImages
      };
      const result = await addProduct(productToAdd);
      if (result.success) {
        toast.success('Product added successfully');
        setShowAddForm(false);
        setNewProduct({
          name: '',
          description: '',
          price: '',
          category: '',
          variants: []
        });
        setNewProductImages({});
      } else {
        toast.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    if (editingProduct.variants.length === 0) {
      toast.error('Please add at least one product variant');
      return;
    }

    // Validate that each color has an image URL
    const colors = [...new Set(editingProduct.variants.map(v => v.color))];
    const missingImages = colors.filter(color => !editingImages[color]);
    if (missingImages.length > 0) {
      toast.error(`Please add image URLs for: ${missingImages.join(', ')}`);
      return;
    }

    setLoading(true);
    try {
      const productToUpdate = {
        ...editingProduct,
        images: editingImages
      };
      const result = await updateProduct(editingProduct.id, productToUpdate);
      if (result.success) {
        toast.success('Product updated successfully');
        setEditingProduct(null);
        setEditingImages({});
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setEditingImages(product.images || {});
    // Scroll to top with smooth animation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Inventory Management</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-accent to-secondary px-6 py-2 rounded-full text-white font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <FaPlus /> Add Product
          </button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black/40 backdrop-blur-sm p-6 rounded-xl space-y-6 mb-8"
            onSubmit={handleAddProduct}
          >
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="px-4 py-2 rounded-lg bg-black/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="px-4 py-2 rounded-lg bg-black/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="px-4 py-2 rounded-lg bg-black/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                required
                min="0"
                step="0.01"
              />
            </div>
            
            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-black/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
              rows="3"
            />

            <ProductVariants 
              variants={newProduct.variants} 
              setVariants={(variants) => setNewProduct({ ...newProduct, variants })}
              images={newProductImages}
              setImages={setNewProductImages}
            />

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-black/30 hover:bg-black/40 rounded-lg text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
              >
                Add Product
              </button>
            </div>
          </motion.form>
        )}

        {/* Edit Product Form */}
        {editingProduct && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative overflow-hidden p-6 rounded-xl"
            onSubmit={handleEditProduct}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-primary opacity-80"></div>
            
            {/* Form Content */}
            <div className="relative backdrop-blur-sm space-y-6">
              <h2 className="text-2xl font-bold mb-4 text-white">Edit Product</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  min="0"
                  step="0.01"
                />
              </div>

              <textarea
                placeholder="Description"
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                rows="3"
              />

              <ProductVariants 
                variants={editingProduct.variants} 
                setVariants={(variants) => setEditingProduct({ ...editingProduct, variants })}
                images={editingImages}
                setImages={setEditingImages}
              />

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-black/30 hover:bg-black/40 rounded-lg text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                >
                  <FaSave />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.form>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="flex justify-center items-center py-8 md:col-span-2">
              <FaSpinner className="animate-spin text-4xl text-white" />
            </div>
          ) : (
            products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-xl"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-primary opacity-80"></div>
                
                <div className="relative p-6 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{product.name}</h3>
                    <button
                      onClick={() => startEditing(product)}
                      className="p-2 bg-white rounded-full hover:bg-white/90 transition-colors"
                      title="Edit product"
                    >
                      <FaPencilAlt className="text-black" />
                    </button>
                  </div>
                  {/* Product Details */}
                  <div className="space-y-2 text-gray-300">
                    <p>{product.description}</p>
                    <p className="text-lg font-semibold">${product.price}</p>
                    <p className="text-sm">Category: {product.category}</p>
                    
                    {/* Preview first image if available */}
                    {product.images && Object.values(product.images)[0] && (
                      <div className="relative mt-4 rounded-lg overflow-hidden">
                        <img 
                          src={Object.values(product.images)[0]}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    )}
                    
                    {/* Color variants with image count */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {[...new Set(product.variants?.map(v => v.color))].map(color => (
                        <span
                          key={color}
                          className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm flex items-center gap-2"
                        >
                          {color}
                          {product.images?.[color] && <FaImage className="text-green-400" />}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
