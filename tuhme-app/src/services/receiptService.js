// Simple receipt service stub
const receiptService = {
  // Placeholder functions to prevent server errors
  createReceipt: async (receiptData) => {
    console.log('Creating receipt:', receiptData);
    return { success: true, id: 'receipt-' + Date.now() };
  },
  
  getReceipt: async (id) => {
    console.log('Getting receipt:', id);
    return { id, status: 'generated' };
  },
  
  updateReceipt: async (id, updateData) => {
    console.log('Updating receipt:', id, updateData);
    return { success: true };
  },
  
  deleteReceipt: async (id) => {
    console.log('Deleting receipt:', id);
    return { success: true };
  }
};

export default receiptService;