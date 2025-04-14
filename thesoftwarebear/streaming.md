# Streaming MD: Creazione di un Sito Web Moderno

## Introduzione
Questo documento servirà come guida per la creazione del mio sito web personale utilizzando Cursor, Next.js, React Three Fiber, Framer Motion e il Canvas API.

---

## Obiettivi del Sito
- **Design moderno** con animazioni accattivanti
- **Struttura chiara**, divisa in sezioni:
  - **Esperienze personali**
  - **Servizi offerti** (creazione siti web, consulenza sicurezza informatica)
- **Animazioni avanzate** per un'esperienza utente coinvolgente
- **Color palette**:
  - Dark Green: `#184A45`
  - Bright Yellow: `#FFC107`

---

## Tecnologie Utilizzate
- **Next.js** per la gestione del frontend
- **React Three Fiber** per effetti 3D avanzati
- **Framer Motion** per animazioni fluide
- **Lenis Scroll** per un effetto di scrolling fluido
- **Canvas API** per effetti di pittura dinamici

---

## Struttura del Progetto

```plaintext
/ - Root directory
  |-- public/             # Static assets
  |-- src/
      |-- components/     # Componenti UI
      |-- pages/         # Pagine del sito
      |-- styles/        # File CSS / Tailwind
      |-- animations/    # File per le animazioni personalizzate
  |-- package.json
  |-- README.md
```

---

## Animazioni Implementate
### 1. **Ripple Shader**
- **Tecnologie**: React Three Fiber, Shader GLSL
- **Effetto**: Simulazione di onde dinamiche
- **Ispirazione**: [Homunculus](https://homunculus.jp/), [Yuri Artiukh](https://www.youtube.com/c/akella)

### 2. **SVG Mask Scroll**
- **Tecnologie**: Framer Motion, Lenis Scroll
- **Effetto**: Maschera SVG che scala con lo scroll e proietta ombre animate
- **Ispirazione**: [Lightship RV](https://lightshiprv.com/)

### 3. **Painting Animation**
- **Tecnologie**: Canvas API, Next.js
- **Effetto**: Simulazione pittura in tempo reale
- **Ispirazione**: [Dominic Bz](https://dominic.bz/)

---

## Passaggi di Sviluppo
### **Fase 1: Setup del Progetto**
1. Creare un nuovo progetto Next.js:
   ```bash
   npx create-next-app@latest mio-sito --typescript
   ```
2. Installare le dipendenze necessarie:
   ```bash
   npm install three @react-three/fiber framer-motion lenis
   ```

### **Fase 2: Strutturazione delle Sezioni**
- Creare componenti separati per **esperienze** e **servizi**
- Applicare lo schema colori con **Tailwind CSS** o Styled Components

### **Fase 3: Implementazione delle Animazioni**
- **Aggiungere Ripple Shader** utilizzando React Three Fiber
- **Integrare SVG Mask Scroll** con Framer Motion
- **Creare l'effetto Painting Animation** con Canvas API

### **Fase 4: Ottimizzazione e Deploy**
- Verificare prestazioni e accessibilità
- Effettuare il deploy su **Vercel** o altro hosting

---

## Conclusione
Seguendo questo documento, potrò costruire un sito web altamente interattivo con un forte impatto visivo, perfetto per mostrare le mie competenze e offrire i miei servizi.
