import React, { useState, useEffect, useRef } from 'react';
import TuhmeIcon from './TuhmeIcon';
import tuhmeLogo from '../assets/tuhme.png';

const Matrix3DInterface = ({ isActive = false, onClose }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [floatingElements, setFloatingElements] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isActive) {
      // Generate floating elements
      const elements = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 100,
        rotation: Math.random() * 360,
        delay: Math.random() * 5,
        type: ['shopping', 'delivery', 'payment', 'home', 'secure'][Math.floor(Math.random() * 5)]
      }));
      setFloatingElements(elements);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="matrix-3d-interface" ref={containerRef}>
      {/* Background Grid */}
      <div className="matrix-grid">
        <div className="grid-lines horizontal">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={`h-${i}`} className="grid-line" style={{ top: `${i * 5}%` }} />
          ))}
        </div>
        <div className="grid-lines vertical">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={`v-${i}`} className="grid-line" style={{ left: `${i * 5}%` }} />
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Central Interface Panel */}
      <div className="central-interface">
        <div className="interface-header">
          <div className="logo-hologram">
            <img src={tuhmeLogo} alt="TUHME" className="hologram-logo" />
            <div className="hologram-ring"></div>
            <div className="hologram-ring-2"></div>
          </div>
          <h2 className="interface-title">TUHME NEURAL NETWORK</h2>
          <div className="system-status">
            <span className="status-indicator active"></span>
            <span>LUXURY SHOPPING PROTOCOL ACTIVE</span>
          </div>
        </div>

        {/* Floating Service Cards */}
        <div className="service-matrix">
          {floatingElements.slice(0, 6).map((element) => (
            <div
              key={element.id}
              className="floating-service-card"
              style={{
                transform: `translateZ(${element.z}px) rotateY(${element.rotation}deg)`,
                animationDelay: `${element.delay}s`
              }}
            >
              <div className="card-glow"></div>
              <TuhmeIcon type={element.type} size={24} />
              <div className="card-data-stream">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="data-line" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Information Panels */}
        <div className="info-panels">
          <div className="info-panel">
            <div className="panel-header">STORE NETWORK</div>
            <div className="panel-content">
              <div className="data-stream">Manhattan: 247 stores</div>
              <div className="data-stream">Brooklyn: 189 stores</div>
              <div className="data-stream">Active Shoppers: 12</div>
            </div>
          </div>

          <div className="info-panel">
            <div className="panel-header">SYSTEM STATUS</div>
            <div className="panel-content">
              <div className="data-stream">Response Time: 0.3s</div>
              <div className="data-stream">Orders Processing: 8</div>
              <div className="data-stream">Uptime: 99.9%</div>
            </div>
          </div>

          <div className="info-panel">
            <div className="panel-header">TIME SYNC</div>
            <div className="panel-content">
              <div className="data-stream">{currentTime.toLocaleTimeString()}</div>
              <div className="data-stream">{currentTime.toLocaleDateString()}</div>
              <div className="data-stream">NYC GMT-5</div>
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="interaction-zone">
          <button className="neural-button" onClick={() => console.log('Express Order Initiated')}>
            <span className="button-glow"></span>
            <TuhmeIcon type="express" size={20} />
            INITIATE EXPRESS ORDER
          </button>
          
          <button className="neural-button" onClick={() => console.log('Store Matrix Accessed')}>
            <span className="button-glow"></span>
            <TuhmeIcon type="shopping" size={20} />
            ACCESS STORE MATRIX
          </button>
          
          <button className="neural-button" onClick={() => console.log('Personal Shopper Connected')}>
            <span className="button-glow"></span>
            <TuhmeIcon type="professional" size={20} />
            CONNECT PERSONAL SHOPPER
          </button>
        </div>

        {/* Exit Button */}
        <button className="matrix-exit" onClick={onClose}>
          <span className="exit-glow"></span>
          EXIT MATRIX
        </button>
      </div>

      {/* Ambient Floating Icons */}
      <div className="ambient-icons">
        {floatingElements.map((element) => (
          <div
            key={`ambient-${element.id}`}
            className="ambient-icon"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              transform: `rotateY(${element.rotation}deg)`
            }}
          >
            <TuhmeIcon type={element.type} size={16} />
          </div>
        ))}
      </div>

      {/* Digital Rain Effect */}
      <div className="digital-rain">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={`rain-${i}`}
            className="rain-column"
            style={{
              left: `${i * 6.67}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            {Array.from({ length: 20 }, (_, j) => (
              <span key={j} className="rain-char">
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matrix3DInterface;