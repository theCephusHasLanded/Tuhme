import { useState, useEffect, useCallback } from 'react';
import salesMonitoringService from '../services/salesMonitoringService';

export const useFlyerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [flyerData, setFlyerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize sales monitoring when hook is first used
  useEffect(() => {
    // Only start monitoring in browser environment
    if (typeof window !== 'undefined') {
      // Start monitoring service
      salesMonitoringService.startMonitoring();

      // Listen for daily flyer generation events
      const handleDailyFlyer = (event) => {
        setFlyerData(event.detail);
      };

      window.addEventListener('dailyFlyerGenerated', handleDailyFlyer);

      // Cleanup on unmount
      return () => {
        window.removeEventListener('dailyFlyerGenerated', handleDailyFlyer);
        salesMonitoringService.stopMonitoring();
      };
    }
  }, []);

  // Open modal and load fresh data
  const openModal = useCallback(async () => {
    setIsOpen(true);
    setLoading(true);
    setError(null);

    try {
      // Fetch latest sales data
      await salesMonitoringService.fetchAllStoreSales();
      
      // Generate flyer data
      const data = salesMonitoringService.generateDailyFlyerData();
      setFlyerData(data);
    } catch (err) {
      console.error('Error loading flyer data:', err);
      setError('Failed to load sales data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setError(null);
  }, []);

  // Refresh sales data
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await salesMonitoringService.fetchAllStoreSales();
      const data = salesMonitoringService.generateDailyFlyerData();
      setFlyerData(data);
    } catch (err) {
      console.error('Error refreshing data:', err);
      setError('Failed to refresh sales data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Get sales statistics
  const getSalesStats = useCallback(() => {
    return salesMonitoringService.getSalesStats();
  }, []);

  // Get active sales
  const getActiveSales = useCallback(() => {
    return salesMonitoringService.getActiveSales();
  }, []);

  // Get urgent sales
  const getUrgentSales = useCallback(() => {
    return salesMonitoringService.getUrgentSales();
  }, []);

  // Get featured sales
  const getFeaturedSales = useCallback(() => {
    return salesMonitoringService.getFeaturedSales();
  }, []);

  // Trigger manual flyer generation
  const triggerFlyerGeneration = useCallback(async () => {
    setLoading(true);
    try {
      const data = await salesMonitoringService.triggerFlyerGeneration();
      setFlyerData(data);
      return data;
    } catch (err) {
      console.error('Error generating flyer:', err);
      setError('Failed to generate flyer. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if sales data needs update
  const needsUpdate = useCallback(() => {
    return salesMonitoringService.needsUpdate();
  }, []);

  return {
    // State
    isOpen,
    flyerData,
    loading,
    error,

    // Actions
    openModal,
    closeModal,
    refreshData,
    triggerFlyerGeneration,

    // Data getters
    getSalesStats,
    getActiveSales,
    getUrgentSales,
    getFeaturedSales,
    needsUpdate
  };
};