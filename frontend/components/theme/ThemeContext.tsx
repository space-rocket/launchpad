import React from 'react';

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
    color: 'red',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
    color: 'green',
  },
};

// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => { },
});