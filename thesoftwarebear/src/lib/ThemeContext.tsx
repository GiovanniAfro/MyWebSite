'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definiamo i possibili temi
type Theme = 'light' | 'dark';

// Definiamo l'interfaccia per il contesto
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Creiamo il contesto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Componente Provider che avvolgerà la nostra app
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Segnala che siamo sul client
    setIsClient(true);
    
    // Controlla se esiste un tema salvato nel localStorage (solo sul client)
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  // Funzione per cambiare tema
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // Salva il tema nelle preferenze utente
    localStorage.setItem('theme', newTheme);
  };
  
  // Usa lo stile predefinito (dark) durante il rendering server
  if (!isClient) {
    return (
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => {} }}>
        {children}
      </ThemeContext.Provider>
    );
  }
  
  // Rendering completo sul client
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizzato per accedere facilmente al tema
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve essere utilizzato all\'interno di un ThemeProvider');
  }
  return context;
}