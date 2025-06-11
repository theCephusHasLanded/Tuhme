
const TuhmeIcon = ({ type, size = 32, className = '', color = 'currentColor' }) => {
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
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <path d="M10 12h12l-1 8H11l-1-8z" fill={color} fillOpacity="0.1" />
            <path d="M12 8v2m8-2v2" />
          </g>
        );
      
      case 'home':
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <path d="M9 16l7-6 7 6v8a1 1 0 01-1 1h-4v-6h-4v6H9a1 1 0 01-1-1v-8z" fill={color} fillOpacity="0.1" />
          </g>
        );
      
      case 'payment':
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <rect x="8" y="12" width="16" height="8" rx="2" fill={color} fillOpacity="0.1" />
            <path d="M8 15h16" />
          </g>
        );
      
      case 'delivery':
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <path d="M7 17l5-5 5 5M12 12v9" />
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
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <path d="M12 14v-2a4 4 0 118 0v2" />
            <rect x="10" y="14" width="12" height="6" rx="2" fill={color} fillOpacity="0.1" />
          </g>
        );
      
      case 'professional':
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <circle cx="16" cy="12" r="3" fill={color} fillOpacity="0.1" />
            <path d="M12 22v-2a4 4 0 118 0v2" />
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
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <path d="M16 8l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" fill={color} fillOpacity="0.1" />
          </g>
        );
      
      default:
        return (
          <g style={baseStyle}>
            <circle cx="16" cy="16" r="12" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="2" fill={color} />
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
        display: 'inline-block', 
        verticalAlign: 'middle',
        flexShrink: 0,
        marginRight: '0.5rem'
      }}
    >
      {getIconPath(type)}
    </svg>
  );
};

export default TuhmeIcon;