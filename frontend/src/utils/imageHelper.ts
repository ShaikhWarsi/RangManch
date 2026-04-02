// Image helper utilities for Next.js migration

// Helper function to get correct image path
export const getImagePath = (imageName: string): string => {
  // Check if it's already a full path
  if (imageName.startsWith('/')) {
    return imageName;
  }
  
  // Check if it's in HomePage folder
  const homePageImages = [
    'clouds_1.png', 'clouds_2.png', 'full.png', 'man2.png',
    'ramayanBG.png', 'ramayanFG.png', 'arrowFG.png', 'RamHoverBG_Large.png',
    'arrowRotate.png', 'rathBG.png', 'rathFG.png', 'flybird.gif'
  ];
  
  if (homePageImages.includes(imageName)) {
    return `/HomePage/${imageName}`;
  }
  
  // Default to assets folder
  return `/assets/${imageName}`;
};

// Helper function to preload images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Helper function to preload multiple images
export const preloadImages = async (imagePaths: string[]): Promise<void> => {
  try {
    await Promise.all(imagePaths.map(preloadImage));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};
