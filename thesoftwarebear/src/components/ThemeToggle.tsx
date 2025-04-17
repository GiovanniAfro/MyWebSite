'use client';

import { useTheme } from '@/lib/ThemeContext';

export default function ThemeToggle() {
  // Otteniamo lo stato corrente del tema e la funzione per cambiarlo
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-[#FFC107] text-[#184A45]' 
          : 'bg-[#184A45] text-[#FFC107]'
      }`}
      aria-label={theme === 'dark' ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'}
    >
      {/* Mostra un'icona del sole o della luna a seconda del tema corrente */}
      {theme === 'dark' ? 'light' : 'dark'}
    </button>
  );
}