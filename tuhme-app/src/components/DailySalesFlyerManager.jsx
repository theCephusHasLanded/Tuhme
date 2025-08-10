import { useDailySalesFlyer } from '../hooks/useDailySalesFlyer';

const DailySalesFlyerManager = () => {
  // This component just initializes the daily sales flyer auto-show
  useDailySalesFlyer();
  
  // Render nothing - this is just for the hook
  return null;
};

export default DailySalesFlyerManager;