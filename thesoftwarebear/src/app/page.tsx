import Image from "next/image";
import ChaseYourDream from '@/components/AnimatedText/ChaseYourDream';
import WavesEffect from '@/components/Animations/WavesEffect';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#184A45] text-white">
      {/* Header/Navbar */}
      <header className="w-full py-4 px-6 flex justify-between items-center border-b border-[#FFC107]/20 z-10 relative">
        <div className="text-[#FFC107] font-bold text-2xl">TheSoftwareBear</div>
        
        {/* Placeholder per il menu a tendina che implementeremo dopo */}
        <div className="w-10 h-10 bg-[#FFC107] rounded-full cursor-pointer flex items-center justify-center">
          <span className="text-[#184A45] font-bold">≡</span>
        </div>
      </header>
      
      {/* Hero Section con "Chase Your Dream" e l'effetto onde */}
      <section className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 relative">
        <WavesEffect />
        <div className="z-10 relative flex flex-col items-center">
          <ChaseYourDream />
          
          <p className="text-xl md:text-2xl text-center max-w-2xl mb-8 text-white/80">
            Sviluppo web creativo e consulenza di sicurezza informatica
          </p>
          
          <button className="bg-[#FFC107] text-[#184A45] font-bold py-3 px-8 rounded-full 
                            hover:bg-[#FFC107]/90 transition-all shadow-lg">
            Scopri i Servizi
          </button>
        </div>
      </section>
      
      {/* Sezioni principali (preview) */}
      <section className="w-full py-16 px-6 bg-[#143c38]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Esperienze */}
          <div className="bg-[#184A45] p-8 rounded-lg border border-[#FFC107]/20 hover:border-[#FFC107]/50 transition-all">
            <h2 className="text-3xl font-bold text-[#FFC107] mb-4">Esperienze</h2>
            <p className="text-white/70 mb-6">
              Scopri il mio percorso professionale e i progetti che ho realizzato nel corso degli anni.
            </p>
            <a href="#esperienze" className="text-[#FFC107] font-bold flex items-center">
              Scopri di più <span className="ml-2">→</span>
            </a>
          </div>
          
          {/* Servizi */}
          <div className="bg-[#184A45] p-8 rounded-lg border border-[#FFC107]/20 hover:border-[#FFC107]/50 transition-all">
            <h2 className="text-3xl font-bold text-[#FFC107] mb-4">Servizi</h2>
            <p className="text-white/70 mb-6">
              Creazione di siti web moderni e consulenza per la sicurezza informatica della tua azienda.
            </p>
            <a href="#servizi" className="text-[#FFC107] font-bold flex items-center">
              Scopri di più <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-8 px-6 bg-[#143c38] border-t border-[#FFC107]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-[#FFC107] font-bold mb-4 md:mb-0">TheSoftwareBear.com</div>
          <div className="text-white/50">© 2024 - Tutti i diritti riservati</div>
        </div>
      </footer>
    </main>
  );
}