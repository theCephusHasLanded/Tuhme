/**
 * Cart storage utility for TUHME app
 * Provides methods to load, save, and manipulate cart items in localStorage
 * Updated with Neo-Scandinavian design system patterns
 */

// The localStorage key for cart items
const CART_STORAGE_KEY = 'tuhme_cart_items';
const UPLOADED_IMAGES_KEY = 'tuhme_uploaded_images';

/**
 * Load cart items from localStorage
 * @returns {Array} Array of cart items
 */
export const loadCartItems = () => {
  try {
    const storedItems = localStorage.getItem(CART_STORAGE_KEY);
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error('Error loading cart items from localStorage:', error);
    return [];
  }
};

/**
 * Save cart items to localStorage
 * @param {Array} items Array of cart items to save
 */
export const saveCartItems = (items) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart items to localStorage:', error);
  }
};

/**
 * Add an item to the cart
 * @param {Object} item Item to add to cart
 * @returns {Array} Updated cart items array
 */
export const addCartItem = (item) => {
  const currentItems = loadCartItems();
  
  // Generate a unique ID for the item if it doesn't have one
  const newItem = {
    ...item,
    id: item.id || `item_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    quantity: item.quantity || 1,
    addedAt: item.addedAt || new Date().toISOString()
  };
  
  // Add the new item to the cart
  const updatedItems = [...currentItems, newItem];
  saveCartItems(updatedItems);
  return updatedItems;
};

/**
 * Update the quantity of an item in the cart
 * @param {string} itemId ID of the item to update
 * @param {number} delta Change in quantity (positive or negative)
 * @returns {Array} Updated cart items array
 */
export const updateCartItemQuantity = (itemId, delta) => {
  const currentItems = loadCartItems();
  
  const updatedItems = currentItems.map(item => {
    if (item.id === itemId) {
      // Calculate new quantity, ensuring it's at least 1
      const newQuantity = Math.max(1, (item.quantity || 1) + delta);
      return { ...item, quantity: newQuantity };
    }
    return item;
  });
  
  saveCartItems(updatedItems);
  return updatedItems;
};

/**
 * Remove an item from the cart
 * @param {string} itemId ID of the item to remove
 * @returns {Array} Updated cart items array
 */
export const removeCartItem = (itemId) => {
  const currentItems = loadCartItems();
  const updatedItems = currentItems.filter(item => item.id !== itemId);
  saveCartItems(updatedItems);
  return updatedItems;
};

/**
 * Clear all items from the cart
 * @returns {Array} Empty array
 */
export const clearCart = () => {
  saveCartItems([]);
  return [];
};

/**
 * Load uploaded images from localStorage
 * @returns {Array} Array of uploaded images
 */
export const loadUploadedImages = () => {
  try {
    const storedImages = localStorage.getItem(UPLOADED_IMAGES_KEY);
    return storedImages ? JSON.parse(storedImages) : [];
  } catch (error) {
    console.error('Error loading uploaded images from localStorage:', error);
    return [];
  }
};

/**
 * Save uploaded images to localStorage
 * @param {Array} images Array of image data
 */
export const saveUploadedImages = (images) => {
  try {
    localStorage.setItem(UPLOADED_IMAGES_KEY, JSON.stringify(images));
  } catch (error) {
    console.error('Error saving uploaded images to localStorage:', error);
  }
};

/**
 * Clear all uploaded images
 * @returns {Array} Empty array
 */
export const clearUploadedImages = () => {
  saveUploadedImages([]);
  return [];
};

/**
 * Get total items count (cart items + uploaded images)
 * @returns {number} Total items count
 */
export const getTotalItemsCount = () => {
  const cartItems = loadCartItems();
  const uploadedImages = loadUploadedImages();
  
  // Count total items in cart, accounting for quantities
  const cartItemsCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  
  // Count uploaded images as one "item" if there are any
  return cartItemsCount + (uploadedImages.length > 0 ? 1 : 0);
};