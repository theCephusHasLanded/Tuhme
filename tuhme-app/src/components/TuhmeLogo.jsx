import React from 'react';

const TuhmeLogo = ({ 
  size = 240, 
  color = '#ffffff', 
  accentColor = '#d4af37',
  animate = true,
  className = '' 
}) => {
  const logoId = `tuhme-logo-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`tuhme-logo ${className}`} style={{ width: size, height: size * 0.3 }}>
      <svg
        width={size}
        height={size * 0.3}
        viewBox="0 0 800 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animate ? 'logo-animated' : ''}
      >
        <defs>
          {/* Gradient definitions */}
          <linearGradient id={`${logoId}-glow`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="50%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.8" />
          </linearGradient>
          
          <linearGradient id={`${logoId}-text`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>

          {/* Filters for glow effect */}
          <filter id={`${logoId}-glow-filter`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Pulsing animation */}
          {animate && (
            <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />
          )}
        </defs>

        {/* Background glow */}
        <rect
          x="0"
          y="0"
          width="800"
          height="240"
          fill={`url(#${logoId}-glow)`}
          opacity="0.1"
          className="logo-bg-glow"
        />

        {/* T */}
        <g className="letter letter-t">
          <path
            d="M40 60 L140 60 L140 80 L100 80 L100 180 L80 180 L80 80 L40 80 Z"
            fill={`url(#${logoId}-text)`}
            filter={`url(#${logoId}-glow-filter)`}
          />
        </g>

        {/* U */}
        <g className="letter letter-u">
          <path
            d="M160 60 L160 140 Q160 160 170 170 Q180 180 200 180 Q220 180 230 170 Q240 160 240 140 L240 60 L260 60 L260 140 Q260 170 240 190 Q220 200 200 200 Q180 200 160 190 Q140 170 140 140 L140 60 Z"
            fill={`url(#${logoId}-text)`}
            filter={`url(#${logoId}-glow-filter)`}
          />
        </g>

        {/* H */}
        <g className="letter letter-h">
          <path
            d="M300 60 L300 110 L360 110 L360 60 L380 60 L380 180 L360 180 L360 130 L300 130 L300 180 L280 180 L280 60 Z"
            fill={`url(#${logoId}-text)`}
            filter={`url(#${logoId}-glow-filter)`}
          />
        </g>

        {/* M */}
        <g className="letter letter-m">
          <path
            d="M420 60 L420 180 L440 180 L440 90 L470 140 L490 140 L520 90 L520 180 L540 180 L540 60 L510 60 L480 120 L450 60 Z"
            fill={`url(#${logoId}-text)`}
            filter={`url(#${logoId}-glow-filter)`}
          />
        </g>

        {/* E */}
        <g className="letter letter-e">
          <path
            d="M580 60 L580 180 L680 180 L680 160 L600 160 L600 130 L670 130 L670 110 L600 110 L600 80 L680 80 L680 60 Z"
            fill={`url(#${logoId}-text)`}
            filter={`url(#${logoId}-glow-filter)`}
          />
        </g>

        {/* Luxury accent line */}
        <line
          x1="350"
          y1="210"
          x2="450"
          y2="210"
          stroke={accentColor}
          strokeWidth="2"
          className="accent-line"
          opacity="0.8"
        />

        {/* Decorative elements */}
        <circle
          cx="80"
          cy="30"
          r="3"
          fill={accentColor}
          className="deco-dot deco-1"
          opacity="0.6"
        />
        <circle
          cx="720"
          cy="30"
          r="3"
          fill={accentColor}
          className="deco-dot deco-2"
          opacity="0.6"
        />
        <circle
          cx="400"
          cy="30"
          r="2"
          fill={color}
          className="deco-dot deco-3"
          opacity="0.4"
        />

        {animate && (
          <>
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.02;1"
              dur="6s"
              repeatCount="indefinite"
            />
          </>
        )}
      </svg>

      <style jsx>{`
        .tuhme-logo {
          display: inline-block;
          position: relative;
        }

        .logo-animated {
          animation: logoFloat 8s ease-in-out infinite;
        }

        .logo-bg-glow {
          animation: bgPulse 4s ease-in-out infinite alternate;
        }

        .letter {
          animation: letterGlow 6s ease-in-out infinite;
        }

        .letter-t { animation-delay: 0s; }
        .letter-u { animation-delay: 0.2s; }
        .letter-h { animation-delay: 0.4s; }
        .letter-m { animation-delay: 0.6s; }
        .letter-e { animation-delay: 0.8s; }

        .accent-line {
          animation: lineGlow 3s ease-in-out infinite alternate;
        }

        .deco-dot {
          animation: dotTwinkle 4s ease-in-out infinite;
        }

        .deco-1 { animation-delay: 0s; }
        .deco-2 { animation-delay: 1.5s; }
        .deco-3 { animation-delay: 3s; }

        @keyframes logoFloat {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            filter: drop-shadow(0 4px 20px rgba(212, 175, 55, 0.3));
          }
          25% {
            transform: translateY(-2px) scale(1.005);
            filter: drop-shadow(0 6px 25px rgba(212, 175, 55, 0.4));
          }
          50% { 
            transform: translateY(-4px) scale(1.01); 
            filter: drop-shadow(0 8px 30px rgba(212, 175, 55, 0.5));
          }
          75% {
            transform: translateY(-2px) scale(1.005);
            filter: drop-shadow(0 6px 25px rgba(212, 175, 55, 0.4));
          }
        }

        @keyframes bgPulse {
          0% { opacity: 0.1; }
          100% { opacity: 0.2; }
        }

        @keyframes letterGlow {
          0%, 100% { 
            filter: url(#${logoId}-glow-filter) drop-shadow(0 0 5px ${accentColor}); 
          }
          50% { 
            filter: url(#${logoId}-glow-filter) drop-shadow(0 0 15px ${accentColor}); 
          }
        }

        @keyframes lineGlow {
          0% { 
            opacity: 0.8; 
            stroke-width: 2; 
            filter: drop-shadow(0 0 5px ${accentColor});
          }
          100% { 
            opacity: 1; 
            stroke-width: 3; 
            filter: drop-shadow(0 0 10px ${accentColor});
          }
        }

        @keyframes dotTwinkle {
          0%, 100% { 
            opacity: 0.6; 
            transform: scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.5); 
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .logo-animated,
          .logo-bg-glow,
          .letter,
          .accent-line,
          .deco-dot {
            animation: none;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .logo-bg-glow {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default TuhmeLogo;
