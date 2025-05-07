/**
 * Imports all images from a given require.context
 * @param {Function} r - The require.context function
 * @returns {Object} - An object with keys as image names and values as image paths
 */
export const importAllImages = (r) => {
  const images = {};
  r.keys().forEach((item) => {
    // Get the filename without the path and extension
    const filename = item.replace('./', '');
    images[filename] = r(item);
  });
  return images;
};

/**
 * Gets the selected images for a section from the image selections
 * @param {Object} imageSelections - The image selections object
 * @param {String} sectionId - The section ID
 * @returns {Array} - An array of image filenames
 */
export const getSelectedImagesForSection = (imageSelections, sectionId) => {
  if (!imageSelections || !imageSelections[sectionId]) {
    return [];
  }
  return imageSelections[sectionId].filter(Boolean);
};
