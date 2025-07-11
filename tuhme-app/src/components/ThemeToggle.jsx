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
        <span style={{ fontSize: '16px' }}>
          {isDark ? '☀️' : '🌙'}
        </span>
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