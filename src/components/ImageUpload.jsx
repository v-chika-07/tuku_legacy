import React, { useState } from 'react';
import { FaUpload, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';
import { uploadImage } from '../services/uploadService';
import { toast } from 'react-toastify';

const ImageUpload = ({ onUploadSuccess, onUploadError, currentImageUrl }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImageUrl);
    const [dragActive, setDragActive] = useState(false);

    const handleFile = async (file) => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size must be less than 5MB');
            return;
        }

        try {
            setUploading(true);
            
            // Create preview
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            // Upload file
            const uploadedFile = await uploadImage(file);
            
            // Call success callback with URL
            onUploadSuccess(uploadedFile.url);
            toast.success('Image uploaded successfully');
            
        } catch (error) {
            console.error('Upload error:', error);
            onUploadError?.(error);
            toast.error('Failed to upload image');
            setPreview(currentImageUrl); // Revert to current image
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    return (
        <div 
            className={`relative rounded-lg overflow-hidden transition-all duration-200 ${
                dragActive ? 'ring-2 ring-accent' : ''
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            {/* Preview Area */}
            <div className="relative h-48 bg-black/20">
                {preview ? (
                    <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/40">
                        <FaUpload className="text-4xl" />
                    </div>
                )}
                
                {/* Upload Overlay */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-200 ${
                    uploading || dragActive ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                }`}>
                    {uploading ? (
                        <FaSpinner className="text-4xl text-white animate-spin" />
                    ) : (
                        <div className="text-center">
                            <p className="text-white mb-2">
                                {dragActive ? 'Drop image here' : 'Click or drag image here'}
                            </p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFile(e.target.files[0])}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={uploading}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Status Indicator */}
            {preview && !uploading && (
                <div className="absolute top-2 right-2 p-1 rounded-full bg-black/40">
                    <FaCheck className="text-green-400" />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
