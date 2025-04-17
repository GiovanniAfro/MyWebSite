'use client';

import Image from "next/image";
import WavesEffect from '@/components/Animations/WavesEffect';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/lib/ThemeContext';
import GlassButton from '@/components/GlassButton';

export default function Home() {
  const { theme } = useTheme();
  
  return (
    <main className={`flex min-h-screen flex-col items-center transition-colors duration-500 ${
      theme === 'dark' 
        ? 'bg-[#184A45] text-white' 
        : 'bg-[#FFC107] text-[#184A45]'
    }`}>
      {/* Header/Navbar */}
      <header className={`w-full py-4 px-6 flex justify-between items-center z-10 relative border-b ${
        theme === 'dark' 
          ? 'border-[#FFC107]/20' 
          : 'border-[#184A45]/20'
      }`}>
        <div className={theme === 'dark' ? 'text-[#FFC107] font-bold text-2xl' : 'text-[#184A45] font-bold text-2xl'}>
          TheSoftwareBear
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* Menu a tendina */}
          <div className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center ${
            theme === 'dark' 
              ? 'bg-[#FFC107] text-[#184A45]' 
              : 'bg-[#184A45] text-[#FFC107]'
          }`}>
            <span className="font-bold">≡</span>
          </div>
        </div>
      </header>
      
      {/* Hero Section con "Chase Your Dream" e l'effetto onde */}
      <section className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 relative">
        <WavesEffect theme={theme}/>
        <div className="z-10 relative flex flex-col items-center">
          <p className={`text-xl md:text-2xl text-center max-w-2xl mb-8 ${
            theme === 'dark' ? 'text-white/80' : 'text-[#184A45]/80'
          }`}>
            Sviluppo web creativo e consulenza di sicurezza informatica
          </p>
          
          <GlassButton 
            onClick={() => console.log('Hero button clicked!')} 
            className="text-lg"
          >
            Scopri i Servizi
          </GlassButton>
        </div>
      </section>
      
      {/* Sezioni principali (preview) */}
      <section className={`w-full py-16 px-6 ${
        theme === 'dark' ? 'bg-[#143c38]' : 'bg-[#e5ad06]'
      }`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Esperienze */}
          <div className={`p-8 rounded-lg border transition-all ${
            theme === 'dark'
              ? 'bg-[#184A45] border-[#FFC107]/20 hover:border-[#FFC107]/50'
              : 'bg-[#FFC107] border-[#184A45]/20 hover:border-[#184A45]/50'
          }`}>
            <h2 className={`text-3xl font-bold mb-4 ${
              theme === 'dark' ? 'text-[#FFC107]' : 'text-[#184A45]'
            }`}>Esperienze</h2>
            <p className={`mb-6 ${
              theme === 'dark' ? 'text-white/70' : 'text-[#184A45]/70'
            }`}>
              Scopri il mio percorso professionale e i progetti che ho realizzato nel corso degli anni.
            </p>
            <GlassButton className="inline-block mt-4">
              <a href="#esperienze" className="text-inherit no-underline block">
                Scopri di più <span className="ml-2">→</span>
              </a>
            </GlassButton>
          </div>
          
          {/* Servizi */}
          <div className={`p-8 rounded-lg border transition-all ${
            theme === 'dark'
              ? 'bg-[#184A45] border-[#FFC107]/20 hover:border-[#FFC107]/50'
              : 'bg-[#FFC107] border-[#184A45]/20 hover:border-[#184A45]/50'
          }`}>
            <h2 className={`text-3xl font-bold mb-4 ${
              theme === 'dark' ? 'text-[#FFC107]' : 'text-[#184A45]'
            }`}>Servizi</h2>
            <p className={`mb-6 ${
              theme === 'dark' ? 'text-white/70' : 'text-[#184A45]/70'
            }`}>
              Creazione di siti web moderni e consulenza per la sicurezza informatica della tua azienda.
            </p>
            <GlassButton className="inline-block mt-4">
              <a href="#servizi" className="text-inherit no-underline block">
                Scopri di più <span className="ml-2">→</span>
              </a>
            </GlassButton>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className={`w-full py-8 px-6 border-t ${
        theme === 'dark'
          ? 'bg-[#143c38] border-[#FFC107]/20'
          : 'bg-[#e5ad06] border-[#184A45]/20'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className={`font-bold mb-4 md:mb-0 ${
            theme === 'dark' ? 'text-[#FFC107]' : 'text-[#184A45]'
          }`}>TheSoftwareBear.com</div>
          <div className={theme === 'dark' ? 'text-white/50' : 'text-[#184A45]/50'}>
            © 2024 - Tutti i diritti riservati
          </div>
        </div>
      </footer>
    </main>
  );
}