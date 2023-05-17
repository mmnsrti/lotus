import React, { useEffect, useState } from 'react';
import './Darkmode.css';

const Darkmode = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);

    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  const switchTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <button
      className={theme === 'dark' ? 'clicked' : ''}
      id="darkMode"
      onClick={switchTheme}
    ></button>
  );
};

export default Darkmode;
