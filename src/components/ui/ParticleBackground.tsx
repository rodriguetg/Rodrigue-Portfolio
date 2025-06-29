import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  shape: 'circle' | 'square' | 'triangle' | 'star' | 'diamond';
  rotation: number;
  rotationSpeed: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);
  const frameCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajuster la taille du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Couleur unique pour toutes les particules
    const particleColor = '#3B82F6';

    // Créer les particules
    const createParticles = (): Particle[] => {
      const particles: Particle[] = [];
      const particleCount = Math.min(window.innerWidth / 30, 50); // Moins de particules

      for (let i = 0; i < particleCount; i++) {
        const shapes: Array<'circle' | 'square' | 'triangle' | 'star' | 'diamond'> = [
          'circle', 'square', 'triangle', 'star', 'diamond'
        ];
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2, // Vitesse modérée
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 2 + 0.8, // Taille plus petite
          opacity: Math.random() * 0.3 + 0.08, // Opacité plus faible
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1,
          color: particleColor,
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 200
        });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    // Gestionnaire de souris
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Fonction pour dessiner différentes formes
    const drawShape = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      
      const size = particle.size;
      const color = particle.color;
      const opacity = particle.opacity;

      switch (particle.shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, size, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
          break;

        case 'square':
          ctx.fillStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fillRect(-size, -size, size * 2, size * 2);
          break;

        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(-size, size);
          ctx.lineTo(size, size);
          ctx.closePath();
          ctx.fillStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
          break;

        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size, 0);
          ctx.lineTo(0, size);
          ctx.lineTo(-size, 0);
          ctx.closePath();
          ctx.fillStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
          break;

        case 'star':
          const spikes = 5;
          const outerRadius = size;
          const innerRadius = size * 0.5;
          
          ctx.beginPath();
          for (let i = 0; i < spikes * 2; i++) {
            const angle = (i * Math.PI) / spikes;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.fillStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
          break;
      }
      
      ctx.restore();
    };

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCountRef.current++;

      particlesRef.current.forEach((particle, index) => {
        // Mise à jour de la position avec vitesse plus rapide
        particle.x += particle.vx * 1.5;
        particle.y += particle.vy * 1.5;
        
        // Rotation
        particle.rotation += particle.rotationSpeed;
        
        // Vie et changement de forme
        particle.life++;
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.maxLife = 100 + Math.random() * 200;
          
          // Changer de forme aléatoirement
          const shapes: Array<'circle' | 'square' | 'triangle' | 'star' | 'diamond'> = [
            'circle', 'square', 'triangle', 'star', 'diamond'
          ];
          particle.shape = shapes[Math.floor(Math.random() * shapes.length)];
          
          // Garder la même couleur unique
          particle.color = particleColor;
          
          // Réinitialiser la position si hors écran
          if (particle.x < 0 || particle.x > canvas.width || 
              particle.y < 0 || particle.y > canvas.height) {
            particle.x = Math.random() * canvas.width;
            particle.y = Math.random() * canvas.height;
          }
        }

        // Interaction avec la souris (plus réactive)
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.02;
          particle.vy += (dy / distance) * force * 0.02;
        }

        // Limiter la vitesse
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Rebondir sur les bords avec plus d'énergie
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1.1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1.1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Garder dans les limites
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Dessiner la particule
        drawShape(ctx, particle);

        // Dessiner les connexions avec plus de particules
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
              const opacity = 0.07 * (1 - distance / 200); // Connexions plus discrètes
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `${particleColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}

