import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, doc, getDoc, getDocs, serverTimestamp } from 'firebase/firestore';

export const createOrder = async (orderData) => {
  try {
    const order = {
      ...orderData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'orders'), order);
    return { id: docRef.id, ...order };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status, notes = '') => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status,
      notes,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);
    
    if (orderSnap.exists()) {
      return { id: orderSnap.id, ...orderSnap.data() };
    } else {
      throw new Error('Order not found');
    }
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
};

export const getAllOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'orders'));
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};