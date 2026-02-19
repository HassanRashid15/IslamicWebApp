import React, { useEffect, useState, useRef } from 'react';
import { usePrayer } from '../contexts/PrayerContext';

const IslamicDateBackground = ({ children }) => {
  const { ramadanInfo, dayName } = usePrayer();
  const [animationType, setAnimationType] = useState('stars');
  const canvasRef = useRef(null);

  // Determine animation type based on Islamic date
  useEffect(() => {
    if (ramadanInfo?.isRamadan) {
      setAnimationType('ramadan-lanterns');
    } else if (ramadanInfo?.daysToRamadan !== null && ramadanInfo?.daysToRamadan <= 10) {
      setAnimationType('pre-ramadan');
    } else if (dayName === 'Friday') {
      setAnimationType('friday-special');
    } else {
      setAnimationType('stars');
    }
  }, [ramadanInfo, dayName]);

  // Canvas animation for stars
  useEffect(() => {
    if (animationType === 'stars' || animationType === 'friday-special') {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const stars = [];
      const numStars = animationType === 'friday-special' ? 150 : 100;

      // Create stars
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          color: animationType === 'friday-special' ? '#d4af37' : '#ffffff'
        });
      }

      let animationId;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
          star.opacity += star.twinkleSpeed;
          if (star.opacity > 1 || star.opacity < 0.2) {
            star.twinkleSpeed = -star.twinkleSpeed;
          }

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = star.color + Math.floor(star.opacity * 255).toString(16).padStart(2, '0');
          ctx.fill();

          // Add glow effect for Friday
          if (animationType === 'friday-special') {
            ctx.shadowBlur = 10;
            ctx.shadowColor = star.color;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });

        animationId = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [animationType]);

  // Ramadan lanterns animation
  useEffect(() => {
    if (animationType === 'ramadan-lanterns') {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const lanterns = [];
      const numLanterns = 8;

      // Create lanterns
      for (let i = 0; i < numLanterns; i++) {
        lanterns.push({
          x: (i + 1) * (canvas.width / (numLanterns + 1)),
          y: Math.random() * 200 + 100,
          radius: 20 + Math.random() * 10,
          swing: 0,
          swingSpeed: Math.random() * 0.02 + 0.01,
          color: `hsl(${Math.random() * 60 + 15}, 70%, 50%)`, // Warm colors
          glowIntensity: Math.random() * 0.3 + 0.7
        });
      }

      let animationId;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        lanterns.forEach(lantern => {
          lantern.swing += lantern.swingSpeed;
          const swingX = Math.sin(lantern.swing) * 20;

          // Draw lantern glow
          const gradient = ctx.createRadialGradient(
            lantern.x + swingX, lantern.y, 0,
            lantern.x + swingX, lantern.y, lantern.radius * 3
          );
          gradient.addColorStop(0, lantern.color.replace('hsl', 'hsla').replace(')', ', 0.25)'));
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.fillRect(
            lantern.x + swingX - lantern.radius * 3,
            lantern.y - lantern.radius * 3,
            lantern.radius * 6,
            lantern.radius * 6
          );

          // Draw lantern body
          ctx.beginPath();
          ctx.arc(lantern.x + swingX, lantern.y, lantern.radius, 0, Math.PI * 2);
          ctx.fillStyle = lantern.color;
          ctx.fill();

          // Draw lantern details
          ctx.strokeStyle = '#8B4513';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw light inside
          ctx.beginPath();
          ctx.arc(lantern.x + swingX, lantern.y, lantern.radius * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 200, ${lantern.glowIntensity})`;
          ctx.fill();
        });

        animationId = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [animationType]);

  // Pre-Ramadan anticipation animation
  useEffect(() => {
    if (animationType === 'pre-ramadan') {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const numParticles = 50;

      // Create crescent moon particles
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.3,
          type: Math.random() > 0.5 ? 'star' : 'crescent'
        });
      }

      let animationId;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          ctx.fillStyle = `rgba(212, 175, 55, ${particle.opacity})`;

          if (particle.type === 'star') {
            // Draw star
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
              const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
              const x = particle.x + Math.cos(angle) * particle.size;
              const y = particle.y + Math.sin(angle) * particle.size;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
          } else {
            // Draw crescent
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(particle.x - particle.size * 0.3, particle.y, particle.size * 0.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
          }
        });

        animationId = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [animationType]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{
          background: animationType === 'ramadan-lanterns' 
            ? 'linear-gradient(to bottom, #0f172a, #1e293b, #334155)'
            : animationType === 'friday-special'
            ? 'linear-gradient(to bottom, #1e3a8a, #1e40af, #2563eb)'
            : 'linear-gradient(to bottom, #0f172a, #1e293b, #334155)'
        }}
      />

      {/* Additional CSS Animations for special effects */}
      <div className="absolute inset-0 z-0">
        {animationType === 'ramadan-lanterns' && (
          <div className="ramadan-lanterns-overlay">
            <style jsx="true">{`
              .ramadan-lanterns-overlay::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 L60 30 L80 30 L65 45 L70 65 L50 50 L30 65 L35 45 L20 30 L40 30 Z' fill='%23d4af37' fill-opacity='0.1'/%3E%3C/svg%3E");
                animation: float-stars 20s linear infinite;
                pointer-events: none;
              }

              @keyframes float-stars {
                from { transform: translateY(100px) rotate(0deg); }
                to { transform: translateY(-100vh) rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {animationType === 'friday-special' && (
          <div className="friday-overlay">
            <style jsx="true">{`
              .friday-overlay::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%);
                animation: pulse-glow 4s ease-in-out infinite;
                pointer-events: none;
              }

              @keyframes pulse-glow {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
              }
            `}</style>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default IslamicDateBackground;
