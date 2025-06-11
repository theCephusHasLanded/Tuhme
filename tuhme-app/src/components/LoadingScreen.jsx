import React from 'react';
import tuhmeLogo from '../assets/tuhme.png';

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">
          <img src={tuhmeLogo} alt="TUHME" className="logo-image" />
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;