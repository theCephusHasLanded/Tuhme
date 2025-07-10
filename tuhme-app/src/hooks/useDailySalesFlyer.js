import { useEffect } from 'react';
import { useModal } from '../contexts/ModalContext';
import salesMonitoringService from '../services/salesMonitoringService';

export const useDailySalesFlyer = () => {
  const { openModal } = useModal();

  useEffect(() => {
    // Check if user has already seen today's flyer
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem('tuhme-daily-flyer-shown');
    
    // Only show if haven't seen today's flyer and there are active sales
    if (lastShown !== today) {
      const timer = setTimeout(async () => {
        try {
          // Check if there are any active sales before showing
          await salesMonitoringService.fetchAllStoreSales();
          const activeSales = salesMonitoringService.getActiveSales();
          
          // For demo purposes, always show the flyer (even with mock data)
          // Mark as shown for today
          localStorage.setItem('tuhme-daily-flyer-shown', today);
          
          // Show the flyer modal
          openModal('dailySalesFlyer');
          
          console.log(`Daily sales flyer shown with ${activeSales.length} active sales`);
        } catch (error) {
          console.error('Error checking sales for daily flyer:', error);
        }
      }, 5000); // Reduced to 5 seconds for testing

      return () => clearTimeout(timer);
    }
  }, [openModal]);

  // Manual trigger for testing
  const showFlyerNow = async () => {
    try {
      await salesMonitoringService.fetchAllStoreSales();
      openModal('dailySalesFlyer');
    } catch (error) {
      console.error('Error showing flyer:', error);
    }
  };

  return { showFlyerNow };
};