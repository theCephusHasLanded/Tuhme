import { useState, useEffect } from 'react';
import TuhmeIcon from './TuhmeIcon';

const FloatingSaviBot = ({ onOpenSavi, showSavi }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Show bot after 3 seconds, but only if SAVI is not already open
    const timer = setTimeout(() => {
      if (!showSavi) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [showSavi]);

  useEffect(() => {
    // Hide floating bot when SAVI is open
    if (showSavi) {
      setIsVisible(false);
    } else {
      // Show again after a delay when SAVI is closed
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [showSavi]);

  useEffect(() => {
    // Pulse animation every 5 seconds
    const pulseInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);

    return () => clearInterval(pulseInterval);
  }, []);

  const handleClick = () => {
    onOpenSavi();
  };

  if (!isVisible) return null;

  return (
    <div className={`floating-savi-bot ${isAnimating ? 'pulse' : ''}`}>
      <div 
        className="savi-bot-icon"
        onClick={handleClick}
        title="Ask SAVI for help"
      >
        <TuhmeIcon type="professional" size={32} />
        <div className="bot-tooltip">
          <span>{showSavi ? 'SAVI is open!' : 'Need help? Ask SAVI!'}</span>
          <div className="tooltip-arrow"></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingSaviBot;