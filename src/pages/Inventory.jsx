import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBoxes, FaSpinner, FaPlus, FaPencilAlt, FaSave } from 'react-icons/fa';
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

    setLoading(true);
    try {
      const result = await addProduct(newProduct);
      if (result.success) {
        setNewProduct({
          name: '',
          description: '',
          price: '',
          category: '',
          variants: []
        });
        setShowAddForm(false);
        toast.success('Product added successfully!');
      } else {
        toast.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
    setLoading(false);
  };

  const handleUpdateProduct = async (productId, updatedData) => {
    if (updatedData.variants && updatedData.variants.length === 0) {
      toast.error('Please add at least one product variant');
      return;
    }

    setLoading(true);
    try {
      const result = await updateProduct(productId, updatedData);
      if (result.success) {
        setEditingProduct(null);
        toast.success('Product updated successfully!');
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-primary via-secondary to-accent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-4 rounded-full bg-black/20 backdrop-blur-sm mb-6"
          >
            <FaBoxes className="text-4xl text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Inventory Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-lg"
          >
            Manage your products and inventory levels
          </motion.p>
        </div>

        {/* Add Product Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
          >
            <FaPlus />
            Add New Product
          </button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-6">
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
            </form>
          </motion.div>
        )}

        {/* Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-auto items-start">
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
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 text-white h-auto"
                layout
              >
                {editingProduct === product.id ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={(e) => setProducts(products.map(p => 
                          p.id === product.id ? { ...p, name: e.target.value } : p
                        ))}
                        className="px-4 py-2 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                      />
                      <input
                        type="text"
                        placeholder="Category"
                        value={product.category}
                        onChange={(e) => setProducts(products.map(p => 
                          p.id === product.id ? { ...p, category: e.target.value } : p
                        ))}
                        className="px-4 py-2 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={product.price}
                        onChange={(e) => setProducts(products.map(p => 
                          p.id === product.id ? { ...p, price: e.target.value } : p
                        ))}
                        className="px-4 py-2 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <textarea
                      placeholder="Description"
                      value={product.description}
                      onChange={(e) => setProducts(products.map(p => 
                        p.id === product.id ? { ...p, description: e.target.value } : p
                      ))}
                      className="w-full px-4 py-2 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                      rows="3"
                    />

                    <ProductVariants
                      variants={product.variants || []}
                      setVariants={(variants) => setProducts(products.map(p => 
                        p.id === product.id ? { ...p, variants } : p
                      ))}
                    />

                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 bg-black/30 hover:bg-black/40 rounded-lg text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdateProduct(product.id, product)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                      >
                        <FaSave />
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-white/60">Category: {product.category}</p>
                        <p className="text-white/80">{product.description}</p>
                        <div className="space-y-1">
                          <p className="text-white/60">Price: ${product.price}</p>
                          <p className="text-white/60">
                            Total Stock: {product.variants?.reduce((sum, variant) => sum + (parseInt(variant.quantity) || 0), 0) || 0}
                          </p>
                          <p className="text-white/60">
                            Variants: {product.variants?.length || 0}
                            {product.variants?.length > 0 && (
                              <button
                                onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                                className="ml-2 text-sm text-white hover:text-white/80 transition-colors"
                              >
                                {expandedProduct === product.id ? 'Hide Details' : 'Show Details'}
                              </button>
                            )}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingProduct(product.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white ml-4"
                      >
                        <FaPencilAlt />
                        Edit
                      </button>
                    </div>

                    {/* Variants Details (Expandable) */}
                    <AnimatePresence>
                      {expandedProduct === product.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-4 space-y-2 overflow-hidden"
                          layout
                        >
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                          >
                            <h4 className="text-lg font-semibold">Variant Details</h4>
                            <div className="grid grid-cols-1 gap-2 mt-2">
                              {product.variants?.map((variant, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  exit={{ x: -20, opacity: 0 }}
                                  transition={{ duration: 0.2, delay: index * 0.05 }}
                                  className="bg-black/20 p-3 rounded-lg flex justify-between items-center"
                                >
                                  <span className="text-white/80">{variant.color} - {variant.size}</span>
                                  <span className="text-white/60">Stock: {variant.quantity}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Inventory;
