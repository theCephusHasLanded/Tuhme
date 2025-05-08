import React from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { 
  WbSunny as SunIcon,
  Brightness2 as MoonIcon
} from '@mui/icons-material';

/**
 * ZenModeToggle - A component that toggles between day and night mode
 * 
 * @param {boolean} isDarkMode - Current dark mode state
 * @param {function} toggleDarkMode - Function to toggle dark mode
 */
const ZenModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '60px',
        height: '30px',
        borderRadius: '15px',
        backgroundColor: isDarkMode ? '#2a2a2a' : '#e9e5e0',
        transition: 'background-color 0.5s',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1) inset',
      }}
      onClick={toggleDarkMode}
    >
      {/* Toggle handle */}
      <Box
        sx={{
          position: 'absolute',
          left: isDarkMode ? 'calc(100% - 26px)' : '4px',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          backgroundColor: isDarkMode ? '#aaaaaa' : '#ffffff',
          transition: 'left 0.5s, background-color 0.5s',
          zIndex: 2,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
        }}
      />
      
      {/* Icons */}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          padding: '0 6px',
          zIndex: 1,
          opacity: 0.8,
        }}
      >
        <SunIcon 
          sx={{ 
            fontSize: 16,
            color: isDarkMode ? '#666666' : '#d3a774',
            transition: 'color 0.5s',
          }} 
        />
        <MoonIcon 
          sx={{ 
            fontSize: 15,
            color: isDarkMode ? '#d3a774' : '#666666', 
            transition: 'color 0.5s',
          }} 
        />
      </Box>
    </Box>
  );
};

export default ZenModeToggle;