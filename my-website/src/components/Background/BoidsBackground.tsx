"use client";

import React, { useEffect, useRef } from 'react';

interface Vector2D {
  x: number;
  y: number;
}

class Boid {
  position: Vector2D;
  velocity: Vector2D;
  acceleration: Vector2D;
  maxSpeed: number;
  maxForce: number;
  size: number;
  trail: Vector2D[];
  
  constructor(x: number, y: number) {
    this.position = { x, y };
    this.velocity = {
      x: Math.random() * 4 - 2,
      y: Math.random() * 4 - 2
    };
    this.acceleration = { x: 0, y: 0 };
    this.maxSpeed = 6; // Aumentato da 3 a 6 per maggiore velocità
    this.maxForce = 0.1; // Aumentato da 0.05 a 0.1 per mantenere il movimento fluido
    this.size = 4;
    this.trail = [];
  }

  separate(boids: Boid[]): Vector2D {
    const desiredSeparation = 50;
    let steer = { x: 0, y: 0 };
    let count = 0;

    boids.forEach(other => {
      const d = Math.hypot(
        this.position.x - other.position.x,
        this.position.y - other.position.y
      );

      if (d > 0 && d < desiredSeparation) {
        const force = 1 - (d / desiredSeparation);
        let diff = {
          x: (this.position.x - other.position.x) * force,
          y: (this.position.y - other.position.y) * force
        };
        steer.x += diff.x;
        steer.y += diff.y;
        count++;
      }
    });

    if (count > 0) {
      steer.x /= count;
      steer.y /= count;
      const mag = Math.hypot(steer.x, steer.y);
      if (mag > 0) {
        steer.x = (steer.x / mag) * this.maxForce * 2;
        steer.y = (steer.y / mag) * this.maxForce * 2;
      }
    }

    return steer;
  }

  align(boids: Boid[]): Vector2D {
    const neighborDist = 80;
    let sum = { x: 0, y: 0 };
    let count = 0;

    boids.forEach(other => {
      const d = Math.hypot(
        this.position.x - other.position.x,
        this.position.y - other.position.y
      );

      if (d > 0 && d < neighborDist) {
        sum.x += other.velocity.x;
        sum.y += other.velocity.y;
        count++;
      }
    });

    if (count > 0) {
      sum.x /= count;
      sum.y /= count;
      const mag = Math.hypot(sum.x, sum.y);
      if (mag > 0) {
        sum.x = (sum.x / mag) * this.maxForce;
        sum.y = (sum.y / mag) * this.maxForce;
      }
    }

    return sum;
  }

  cohesion(boids: Boid[]): Vector2D {
    const neighborDist = 60;
    let sum = { x: 0, y: 0 };
    let count = 0;

    boids.forEach(other => {
      const d = Math.hypot(
        this.position.x - other.position.x,
        this.position.y - other.position.y
      );

      if (d > 0 && d < neighborDist) {
        sum.x += other.position.x;
        sum.y += other.position.y;
        count++;
      }
    });

    if (count > 0) {
      sum.x /= count;
      sum.y /= count;
      return this.seek(sum);
    }
    return { x: 0, y: 0 };
  }

  seek(target: Vector2D): Vector2D {
    const desired = {
      x: target.x - this.position.x,
      y: target.y - this.position.y
    };

    const mag = Math.hypot(desired.x, desired.y);
    if (mag > 0) {
      desired.x = (desired.x / mag) * this.maxSpeed;
      desired.y = (desired.y / mag) * this.maxSpeed;
    }

    return {
      x: (desired.x - this.velocity.x) * 0.05,
      y: (desired.y - this.velocity.y) * 0.05
    };
  }

  updateTrail() {
    this.trail.push({ ...this.position });
    if (this.trail.length > 5) {
      this.trail.shift();
    }
  }

  update() {
    // Aggiungi un po' di rumore al movimento
    this.acceleration.x += (Math.random() - 0.5) * 0.1;
    this.acceleration.y += (Math.random() - 0.5) * 0.1;

    // Aggiorna velocità e posizione
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    const speed = Math.hypot(this.velocity.x, this.velocity.y);
    if (speed > this.maxSpeed) {
      this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
      this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
    }

    this.updateTrail();
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Wrap around dello schermo con margine
    const margin = 50;
    if (this.position.x < -margin) this.position.x = window.innerWidth + margin;
    if (this.position.y < -margin) this.position.y = window.innerHeight + margin;
    if (this.position.x > window.innerWidth + margin) this.position.x = -margin;
    if (this.position.y > window.innerHeight + margin) this.position.y = -margin;

    this.acceleration.x = 0;
    this.acceleration.y = 0;
  }

  flock(boids: Boid[], mousePos: Vector2D) {
    const separation = this.separate(boids);
    const alignment = this.align(boids);
    const cohesion = this.cohesion(boids);
    const mouse = this.seek(mousePos);

    this.acceleration.x += 
      separation.x * 2.0 + 
      alignment.x * 1.0 + 
      cohesion.x * 0.5 + 
      mouse.x * 0.3;

    this.acceleration.y += 
      separation.y * 2.0 + 
      alignment.y * 1.0 + 
      cohesion.y * 0.5 + 
      mouse.y * 0.3;
  }
}

const BoidsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef<Vector2D>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();

    const boids: Boid[] = Array.from({ length: 50 }, () => 
      new Boid(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      )
    );

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      boids.forEach(boid => {
        boid.flock(boids, mousePos.current);
        boid.update();

        // Disegna la scia
        ctx.beginPath();
        if (boid.trail.length > 0) {
          ctx.moveTo(boid.trail[0].x, boid.trail[0].y);
          boid.trail.forEach((pos, i) => {
            const alpha = i / boid.trail.length;
            ctx.lineTo(pos.x, pos.y);
          });
        }
        ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Disegna il boid
        const angle = Math.atan2(boid.velocity.y, boid.velocity.x);
        ctx.beginPath();
        ctx.moveTo(
          boid.position.x + Math.cos(angle) * boid.size * 2,
          boid.position.y + Math.sin(angle) * boid.size * 2
        );
        ctx.lineTo(
          boid.position.x + Math.cos(angle + 2.5) * boid.size,
          boid.position.y + Math.sin(angle + 2.5) * boid.size
        );
        ctx.lineTo(
          boid.position.x + Math.cos(angle - 2.5) * boid.size,
          boid.position.y + Math.sin(angle - 2.5) * boid.size
        );
        ctx.closePath();
        ctx.fillStyle = '#60A5FA';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

// Nel return del componente BoidsBackground
  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full" // Rimosso fixed e altri stili di posizionamento
      style={{ background: '#0F172A' }}
    />
  );
};

export default BoidsBackground;