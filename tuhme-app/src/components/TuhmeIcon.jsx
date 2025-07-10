
const TuhmeIcon = ({ type, size = 32, className = '', color = 'var(--primary-text)' }) => {
  const getIconPath = (iconType) => {
    const baseStyle = {
      stroke: color,
      strokeWidth: '2',
      fill: 'none',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    };

    switch (iconType) {
      case 'shopping':
        return (
          <g style={baseStyle}>
            <path d="M6 8h20l-2 12H8L6 8z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
            <path d="M10 6v2m12-2v2" stroke={color} strokeWidth="2" />
          </g>
        );
      
      case 'home':
        return (
          <g style={baseStyle}>
            <path d="M4 16l12-10 12 10v12a2 2 0 01-2 2h-6v-8h-8v8H6a2 2 0 01-2-2V16z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
          </g>
        );
      
      case 'payment':
        return (
          <g style={baseStyle}>
            <rect x="4" y="8" width="24" height="16" rx="3" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
            <path d="M4 14h24" stroke={color} strokeWidth="2" />
          </g>
        );
      
      case 'delivery':
        return (
          <g style={baseStyle}>
            <path d="M6 20l6-6 6 6M12 14v12" stroke={color} strokeWidth="2" />
          </g>
        );
      
      case 'time':
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="6" fill={color} fillOpacity="0.1" />
            <path d="M16 12v4l2 2" />
          </g>
        );
      
      case 'secure':
        return (
          <g style={baseStyle}>
            <path d="M8 16v-4a8 8 0 1116 0v4" stroke={color} strokeWidth="2" />
            <rect x="6" y="16" width="20" height="10" rx="3" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
          </g>
        );
      
      case 'professional':
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="10" r="5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
            <path d="M8 26v-4a8 8 0 1116 0v4" stroke={color} strokeWidth="2" />
          </g>
        );
      
      case 'unlimited':
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <path d="M8 12s3-4 8-4 8 4 8 4-3 4-8 4-8-4-8-4z" fill={color} fillOpacity="0.1" />
            <circle cx="16" cy="12" r="1" fill={color} />
          </g>
        );
      
      case 'discount':
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <path d="M8.5 8.5L23.5 23.5M23.5 8.5a5 5 0 100 10 5 5 0 000-10zM8.5 23.5a5 5 0 100-10 5 5 0 000 10z" />
          </g>
        );
      
      case 'morning':
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="4" fill={color} fillOpacity="0.2" />
            <path d="M16 2v4M16 26v4M26 16h4M2 16h4M22.64 9.36l2.83-2.83M6.53 25.47l2.83-2.83M22.64 22.64l2.83 2.83M6.53 6.53l2.83 2.83" strokeWidth="1" />
          </g>
        );
      
      case 'evening':
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <path d="M18 16a6 6 0 11-12 0c0-3.31 2.69-6 6-6a6 6 0 016 6z" fill={color} fillOpacity="0.1" />
          </g>
        );
      
      case 'weekend':
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <rect x="8" y="8" width="16" height="16" rx="2" fill={color} fillOpacity="0.1" />
            <path d="M12 6v4M20 6v4M8 14h16" />
          </g>
        );
      
      case 'express':
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <path d="M8 16l4-4v3h8v2h-8v3l-4-4z" fill={color} fillOpacity="0.1" />
          </g>
        );
      
      case 'fit':
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <path d="M12 8l8 8-8 8M20 16H8" />
          </g>
        );
      
      case 'event':
        return (
          <g style={baseStyle}>
            <path d="M16 4l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9l3-9z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
          </g>
        );
      
      case 'search':
        return (
          <g style={baseStyle}>
            <circle cx="14" cy="14" r="8" stroke={color} strokeWidth="2" />
            <path d="m24 24l-4-4" stroke={color} strokeWidth="2" />
          </g>
        );
      
      case 'globe':
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2" />
            <path d="M4 16h24M16 4a16 16 0 008 12 16 16 0 00-8 12 16 16 0 00-8-12 16 16 0 008-12z" stroke={color} strokeWidth="2" />
          </g>
        );
      
      default:
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="4" fill={color} />
          </g>
        );
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`tuhme-icon ${className}`}
      style={{ 
        display: 'block', 
        margin: '0 auto',
        flexShrink: 0,
        maxWidth: '100%',
        maxHeight: '100%',
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
      }}
    >
      {getIconPath(type)}
    </svg>
  );
};

export default TuhmeIcon;