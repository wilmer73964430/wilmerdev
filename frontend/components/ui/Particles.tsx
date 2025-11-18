"use client";
import { useEffect, useRef } from 'react';

export default function Particles({ density = 0.0009 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    function resize() {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
    }[] = [];

    function initParticles() {
      particles.length = 0;
      const count = Math.max(6, Math.floor(width * height * density));
      for (let i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    }

    function createParticle() {
      const r = 1 + Math.random() * 3.5;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r,
        alpha: 0.2 + Math.random() * 0.6
      };
    }

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // subtle gradient background overlay to blend with existing green
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, 'rgba(5,43,32,0.12)');
      g.addColorStop(1, 'rgba(6,182,150,0.06)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // glow circle
        ctx.beginPath();
        ctx.fillStyle = `rgba(16,185,129, ${p.alpha * 0.25})`;
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(16,185,129, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // connection lines (short distance)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            const alpha = (1 - dist / 90) * 0.08;
            ctx.strokeStyle = `rgba(16,185,129, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(step);
    }

    resize();
    initParticles();
    rafRef.current = requestAnimationFrame(step);

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 w-full h-full z-0"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
