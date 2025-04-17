'use client';

import { useEffect, useRef } from 'react';
import { Noise } from '@/lib/noise';
import styles from './WavesEffect.module.css';

// Assicurati che queste interfacce siano definite o importate
interface PointData {
  x: number;
  y: number;
  wave: { x: number; y: number };
  cursor: { x: number; y: number; vx: number; vy: number };
}
interface WavesEffectProps {
  theme: 'light' | 'dark';
}

export default function WavesEffect({ theme }: WavesEffectProps) { // Riceve il tema come prop
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let bounding = container.getBoundingClientRect();
    
    const mouse = {
      x: -10,
      y: 0,
      lx: 0,
      ly: 0,
      sx: 0,
      sy: 0,
      v: 0,
      vs: 0,
      a: 0,
      set: false
    };

    let lines: PointData[][] = [];
    const noise = new Noise(Math.random());

    // Set size
    function setSize() {
      bounding = container.getBoundingClientRect();
      canvas.width = bounding.width;
      canvas.height = bounding.height;
    }

    // Set lines
    function setLines() {
      const { width, height } = bounding;
      lines = [];

      const xGap = 10;
      const yGap = 32;

      const oWidth = width + 200;
      const oHeight = height + 30;

      const totalLines = Math.ceil(oWidth / xGap);
      const totalPoints = Math.ceil(oHeight / yGap);

      const xStart = (width - xGap * totalLines) / 2;
      const yStart = (height - yGap * totalPoints) / 2;

      for (let i = 0; i <= totalLines; i++) {
        const points: PointData[] = [];

        for (let j = 0; j <= totalPoints; j++) {
          const point: PointData = {
            x: xStart + xGap * i,
            y: yStart + yGap * j,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 }
          };

          points.push(point);
        }

        lines.push(points);
      }
    }

    function updateMousePosition(x: number, y: number) {
      mouse.x = x - bounding.left;
      mouse.y = y - bounding.top + window.scrollY;

      if (!mouse.set) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;

        mouse.set = true;
      }
    }

    // Move points
    function movePoints(time: number) {
      lines.forEach((points) => {
        points.forEach((p: PointData) => {
          // Wave movement
          const move =
            noise.perlin2(
              (p.x + time * 0.0125) * 0.002,
              (p.y + time * 0.005) * 0.0015
            ) * 12;
          p.wave.x = Math.cos(move) * 32;
          p.wave.y = Math.sin(move) * 16;

          // Mouse effect
          const dx = p.x - mouse.sx;
          const dy = p.y - mouse.sy;
          const d = Math.hypot(dx, dy);
          const l = Math.max(175, mouse.vs);

          if (d < l) {
            const s = 1 - d / l;
            const f = Math.cos(d * 0.001) * s;

            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;
          }

          p.cursor.vx += (0 - p.cursor.x) * 0.005; // String tension
          p.cursor.vy += (0 - p.cursor.y) * 0.005;

          p.cursor.vx *= 0.925; // Friction/duration
          p.cursor.vy *= 0.925;

          p.cursor.x += p.cursor.vx * 2; // Strength
          p.cursor.y += p.cursor.vy * 2;

          p.cursor.x = Math.min(100, Math.max(-100, p.cursor.x)); // Clamp movement
          p.cursor.y = Math.min(100, Math.max(-100, p.cursor.y));
        });
      });
    }

    // Get point coordinates with movement added
    function moved(point: PointData, withCursorForce = true): { x: number, y: number } {
      const coords = {
        x: point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0),
        y: point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0)
      };

      // Round to 2 decimals
      coords.x = Math.round(coords.x * 10) / 10;
      coords.y = Math.round(coords.y * 10) / 10;

      return coords;
    }

    // Draw lines
    function drawLines() {
      ctx!.clearRect(0, 0, bounding.width, bounding.height);

      ctx!.beginPath();
      
      // *** Qui ripristiniamo la logica del tema ***
      ctx!.strokeStyle = theme === 'dark' 
        ? "rgba(255, 193, 7, 0.5)" // Giallo semi-trasparente in modalità scura
        : "rgba(24, 74, 69, 0.5)"; // Verde semi-trasparente in modalità chiara
      // *** Ripristina lo spessore desiderato (probabilmente 1.5) ***
      ctx!.lineWidth = 1.5; 

      // Ciclo di Disegno
      lines.forEach((points: PointData[]) => { 
        if (points.length === 0) return; 
        const startPos = moved(points[0], false); 
        ctx!.moveTo(startPos.x, startPos.y); 
        points.forEach((currentPoint: PointData, pIndex: number) => {
          const isLast = pIndex === points.length - 1;
          const finalPos = moved(currentPoint, !isLast); 
          ctx!.lineTo(finalPos.x, finalPos.y); 
        });
      });

      ctx!.stroke(); 
    }

    // Animation tick
    function tick(time: number) {
      // Smooth mouse movement
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;

      // Mouse velocity
      const dx = mouse.x - mouse.lx;
      const dy = mouse.y - mouse.ly;
      const d = Math.hypot(dx, dy);

      mouse.v = d;
      mouse.vs += (d - mouse.vs) * 0.1;
      mouse.vs = Math.min(100, mouse.vs);

      // Mouse last position
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;

      // Mouse angle
      mouse.a = Math.atan2(dy, dx);

      // Animation
      container.style.setProperty("--x", `${mouse.sx}px`);
      container.style.setProperty("--y", `${mouse.sy}px`);

      movePoints(time);
      drawLines();

      animationFrame = requestAnimationFrame(tick);
    }

    // Event listeners
    function onMouseMove(e: MouseEvent) {
      updateMousePosition(e.pageX, e.pageY);
    }

    function onTouchMove(e: TouchEvent) {
      e.preventDefault();
      const touch = e.touches[0];
      updateMousePosition(touch.clientX, touch.clientY);
    }

    function onResize() {
      setSize();
      setLines();
    }

    // Init
    setSize();
    setLines();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchmove", onTouchMove);

    // Start animation
    animationFrame = requestAnimationFrame(tick);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(animationFrame);
    };

  }, [theme]); // Manteniamo 'theme' come dipendenza

  return (
    <div className={styles.waves} ref={containerRef} data-theme={theme}>
      <canvas ref={canvasRef} />
    </div>
  );
}