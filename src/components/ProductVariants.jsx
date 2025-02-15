import React from 'react';
import { FaTrash, FaPlus, FaImage } from 'react-icons/fa';
import ImageUpload from './ImageUpload';

const ProductVariants = ({ variants, setVariants, images, setImages }) => {
    const addVariant = () => {
        setVariants([
            ...variants,
            { color: '', size: '', quantity: 0, sku: '' }
        ]);
    };

    const removeVariant = (index) => {
        const variant = variants[index];
        setVariants(variants.filter((_, i) => i !== index));
        
        // Remove image for the color if it exists
        if (variant.color && images[variant.color]) {
            const newImages = { ...images };
            delete newImages[variant.color];
            setImages(newImages);
        }
    };

    const updateVariant = (index, field, value) => {
        const newVariants = [...variants];
        const oldColor = newVariants[index].color;
        newVariants[index] = {
            ...newVariants[index],
            [field]: value
        };
        setVariants(newVariants);

        // If color changed, update image key in images object
        if (field === 'color' && oldColor && oldColor !== value && images[oldColor]) {
            const newImages = { ...images };
            newImages[value] = newImages[oldColor];
            delete newImages[oldColor];
            setImages(newImages);
        }
    };

    const handleImageUpload = (color, url) => {
        setImages(prev => ({
            ...prev,
            [color]: url
        }));
    };

    // Get unique colors from variants
    const uniqueColors = [...new Set(variants.map(v => v.color).filter(Boolean))];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Product Variants</h3>
                <button
                    type="button"
                    onClick={addVariant}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                >
                    <FaPlus /> Add Variant
                </button>
            </div>
            
            {/* Image Upload Section */}
            {uniqueColors.length > 0 && (
                <div className="bg-black/20 p-4 rounded-lg space-y-4">
                    <h4 className="text-md font-semibold text-white flex items-center gap-2">
                        <FaImage /> Product Images
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {uniqueColors.map(color => (
                            <div key={color} className="space-y-2">
                                <label className="text-white text-sm">{color}</label>
                                <ImageUpload
                                    currentImageUrl={images[color]}
                                    onUploadSuccess={(url) => handleImageUpload(color, url)}
                                    onUploadError={(error) => console.error(`Error uploading ${color} image:`, error)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Variants Section */}
            <div className="space-y-4">
                {variants.map((variant, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-black/20 p-4 rounded-lg">
                        <input
                            type="text"
                            placeholder="Color"
                            value={variant.color}
                            onChange={(e) => updateVariant(index, 'color', e.target.value)}
                            className="px-4 py-2 rounded-lg bg-black/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Size"
                            value={variant.size}
                            onChange={(e) => updateVariant(index, 'size', e.target.value)}
                            className="px-4 py-2 rounded-lg bg-black/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={variant.quantity}
                            onChange={(e) => updateVariant(index, 'quantity', e.target.value)}
                            className="px-4 py-2 rounded-lg bg-black/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                            required
                            min="0"
                        />
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="SKU (optional)"
                                value={variant.sku}
                                onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                                className="flex-1 px-4 py-2 rounded-lg bg-black/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                            />
                            <button
                                type="button"
                                onClick={() => removeVariant(index)}
                                className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300 transition-colors"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {variants.length === 0 && (
                <p className="text-white/60 text-center py-4">
                    No variants added. Click "Add Variant" to create product variations.
                </p>
            )}
        </div>
    );
};

export default ProductVariants;
