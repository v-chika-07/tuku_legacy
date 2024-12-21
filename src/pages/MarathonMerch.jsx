import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getProducts } from '../firebase/services/productService';
import { addToCart } from '../firebase/services/cartService';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import LoginModal from '../components/LoginModal';

const colorClasses = {
  // Reds
  red: 'bg-red-500',
  crimson: 'bg-red-600',
  maroon: 'bg-red-800',
  ruby: 'bg-red-700',
  scarlet: 'bg-red-400',
  
  // Blues
  blue: 'bg-blue-500',
  navy: 'bg-blue-900',
  skyblue: 'bg-sky-400',
  lightblue: 'bg-blue-300',
  royalblue: 'bg-blue-700',
  azure: 'bg-sky-500',
  cobalt: 'bg-blue-600',
  turquoise: 'bg-cyan-400',
  
  // Greens
  green: 'bg-green-500',
  emerald: 'bg-emerald-500',
  sage: 'bg-green-300',
  olive: 'bg-olive-600',
  lime: 'bg-lime-500',
  forest: 'bg-green-800',
  mint: 'bg-green-200',
  
  // Yellows
  yellow: 'bg-yellow-400',
  gold: 'bg-yellow-500',
  amber: 'bg-amber-500',
  khaki: 'bg-yellow-200',
  
  // Oranges
  orange: 'bg-orange-500',
  coral: 'bg-orange-400',
  peach: 'bg-orange-200',
  tangerine: 'bg-orange-600',
  
  // Purples
  purple: 'bg-purple-500',
  violet: 'bg-violet-500',
  lavender: 'bg-purple-300',
  indigo: 'bg-indigo-500',
  plum: 'bg-purple-600',
  magenta: 'bg-fuchsia-500',
  
  // Browns
  brown: 'bg-amber-800',
  chocolate: 'bg-amber-900',
  tan: 'bg-amber-200',
  beige: 'bg-amber-100',
  
  // Grays
  gray: 'bg-gray-500',
  silver: 'bg-gray-300',
  charcoal: 'bg-gray-700',
  slate: 'bg-slate-500',
  
  // Pinks
  pink: 'bg-pink-500',
  rose: 'bg-rose-500',
  hotpink: 'bg-pink-600',
  salmon: 'bg-rose-300',
  
  // Teals
  teal: 'bg-teal-500',
  aqua: 'bg-cyan-500',
  cyan: 'bg-cyan-400',
  
  // Neutrals
  white: 'bg-white',
  black: 'bg-black',
  ivory: 'bg-neutral-50',
  cream: 'bg-neutral-100',
  
  // Additional Fashion Colors
  mauve: 'bg-purple-200',
  burgundy: 'bg-red-900',
  taupe: 'bg-neutral-300',
  sienna: 'bg-orange-900'
};

const MarathonMerch = () => {
  const { isAuthenticated, user } = useAuth();
  const { updateCartCount } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);

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

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    const selectedColor = selectedColors[product.id];
    const selectedSize = selectedSizes[product.id];

    if (!selectedColor || !selectedSize) {
      toast.error('Please select both color and size');
      return;
    }

    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      image: product.images[selectedColor]
    };

    const result = await addToCart(user.uid, cartItem);
    if (result.success) {
      toast.success('Added to cart!');
      updateCartCount();
    } else {
      toast.error('Failed to add to cart');
    }
  };

  const handleLoginSuccess = () => {
    if (pendingProduct) {
      handleAddToCart(pendingProduct);
      setPendingProduct(null);
    }
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
                            } ${colorClasses[color] || 'bg-black'} transition-all duration-200 hover:scale-110`}
                            style={{
                              backgroundColor: !colorClasses[color] ? color : undefined
                            }}
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
                      <div className="mt-18 flex justify-center">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="w-[70%] bg-white text-black px-4 py-2 rounded-full flex items-center justify-center space-x-2 hover:bg-white/90 transition-all duration-300 font-medium"
                        >
                          <FaShoppingCart className="text-black" />
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

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setPendingProduct(null);
        }}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default MarathonMerch;
