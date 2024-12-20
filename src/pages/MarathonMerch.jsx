import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { getProducts } from '../firebase/services/productService';
import { toast } from 'react-toastify';

const MarathonMerch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts('marathon');
        if (result.success) {
          // Initialize selected colors with the first color of each product
          const initialColors = {};
          const initialSizes = {};
          result.products.forEach(product => {
            if (product.variants && product.variants.length > 0) {
              const colors = [...new Set(product.variants.map(v => v.color))];
              if (colors.length > 0) {
                initialColors[product.id] = colors[0];
                // Select first available size for the initial color
                const sizesForColor = [...new Set(product.variants
                  .filter(v => v.color === colors[0])
                  .map(v => v.size))];
                if (sizesForColor.length > 0) {
                  initialSizes[product.id] = sizesForColor[0];
                }
              }
            }
          });
          setSelectedColors(initialColors);
          setSelectedSizes(initialSizes);
          setProducts(result.products);
        } else {
          toast.error('Failed to load products');
        }
      } catch (error) {
        console.error('Error loading products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleColorSelect = (productId, color) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: color
    }));
    // Reset size selection when color changes
    const product = products.find(p => p.id === productId);
    const sizesForColor = [...new Set(product.variants
      .filter(v => v.color === color)
      .map(v => v.size))];
    if (sizesForColor.length > 0) {
      setSelectedSizes(prev => ({
        ...prev,
        [productId]: sizesForColor[0]
      }));
    }
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleAddToCart = (product) => {
    const selectedColor = selectedColors[product.id];
    const selectedSize = selectedSizes[product.id];
    
    if (!selectedColor || !selectedSize) {
      toast.error('Please select both color and size');
      return;
    }

    const variant = product.variants.find(
      v => v.color === selectedColor && v.size === selectedSize
    );

    if (!variant) {
      toast.error('Selected combination is not available');
      return;
    }

    if (variant.quantity <= 0) {
      toast.error('This item is out of stock');
      return;
    }

    // Add to cart logic here
    toast.success('Added to cart successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent text-white pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="mt-4 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white pt-24 pb-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Marathon Collection</h1>
        <p className="text-lg text-white font-medium max-w-2xl mx-auto">
          Gear up for the TUKU LEGACY Marathon with our exclusive collection of performance wear and commemorative items.
        </p>
      </motion.div>

      {/* Products Grid */}
      <AnimatePresence>
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const productColors = [...new Set(product.variants?.map(v => v.color))];
              const selectedColor = selectedColors[product.id] || (productColors.length > 0 ? productColors[0] : null);
              const availableSizes = [...new Set(product.variants
                ?.filter(v => v.color === selectedColor)
                .map(v => v.size))];
              const selectedSize = selectedSizes[product.id];

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-primary opacity-80"></div>
                  
                  <div className="relative p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        {productColors.map(color => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(product.id, color)}
                            className={`w-6 h-6 rounded-full border-2 ${
                              selectedColor === color ? 'border-white scale-110' : 'border-transparent'
                            } bg-${color}-500 transition-all duration-200 hover:scale-110`}
                            aria-label={`Select ${color} color`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-2 text-white">
                      <p className="font-medium">{product.description}</p>
                      <p className="text-lg font-bold">${product.price}</p>
                      
                      {/* Product Image */}
                      {product.images && selectedColor && (
                        <div className="relative mt-4 rounded-lg overflow-hidden">
                          <img 
                            src={product.images[selectedColor]}
                            alt={`${product.name} in ${selectedColor}`}
                            className="w-full h-48 object-contain"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        </div>
                      )}
                      
                      {/* Size Selection */}
                      <div className="mt-4">
                        <p className="text-sm mb-2 font-semibold text-white">Select Size:</p>
                        <div className="flex flex-wrap gap-2">
                          {availableSizes.map(size => (
                            <button
                              key={size}
                              onClick={() => handleSizeSelect(product.id, size)}
                              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                selectedSize === size 
                                  ? 'bg-white text-black' 
                                  : 'bg-white/10 text-white hover:bg-white/20'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <div className="mt-6 flex justify-center">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="w-[70%] bg-gradient-to-r from-accent to-secondary px-4 py-2 rounded-full flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
                        >
                          <FaShoppingCart />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Coming Soon Notice */}
      <div className="container mx-auto px-4 mt-12 text-center">
        <p className="text-white font-medium">
          More products coming soon! Pre-orders will be available closer to the event date.
        </p>
      </div>
    </div>
  );
};

export default MarathonMerch;
