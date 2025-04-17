'use client';

import React from 'react';
import styles from './GlassButton.module.css'; // Creeremo questo file CSS tra poco
import { useTheme } from '@/lib/ThemeContext'; // Importa il tema

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; // Per stili aggiuntivi
}

const GlassButton: React.FC<GlassButtonProps> = ({ children, onClick, className = '' }) => {
  const { theme } = useTheme(); // Ottieni il tema corrente

  // Aggiungi la classe del tema al wrapper per il CSS
  const themeClass = theme === 'dark' ? styles.darkTheme : styles.lightTheme;

  return (
    <div className={`${styles.buttonWrap} ${themeClass} ${className}`}>
      <button onClick={onClick}>
        <span>{children}</span>
      </button>
      <div className={styles.buttonShadow}></div>
    </div>
  );
};

export default GlassButton;