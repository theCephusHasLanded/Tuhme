import { useThemeSystem } from '../contexts/ThemeSystemContext';

const ThemeToggle = ({ className = '', style = {} }) => {
  const { theme, toggleTheme, isDark, isLight } = useThemeSystem();

  return (
    <button
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      style={style}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Currently in ${theme} mode. Click to switch to ${isDark ? 'light' : 'dark'} mode.`}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ minWidth: '16px' }}>
          {isDark ? (
            // Light mode icon - Sun
            <>
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2"/>
            </>
          ) : (
            // Dark mode icon - Moon
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" fill="none"/>
          )}
        </svg>
        <span style={{ 
          fontSize: '12px',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {isDark ? 'Light' : 'Dark'}
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;