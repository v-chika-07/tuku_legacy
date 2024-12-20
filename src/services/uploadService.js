const API_URL = import.meta.env.VITE_API_URL || 'https://www.olivermtukudzi.com/images';

export const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${API_URL}/upload.php`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Upload failed');
        }

        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.message || 'Upload failed');
        }

        return data.file;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
