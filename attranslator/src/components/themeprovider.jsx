import React, { createContext, useContext } from 'react';

// Create the context with default values
const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {}
});

// Custom hook to use the theme context
export function useTheme() {
  return useContext(ThemeContext);
}

// ThemeProvider component
export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={{ theme: 'light', setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}
