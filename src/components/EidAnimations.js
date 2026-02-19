import React, { useEffect, useRef } from 'react';

const EidAnimations = ({ eidType = 'eid-fitr' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 100;

    // Create celebratory particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 4 + 2,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 + 1,
        color: eidType === 'eid-fitr' 
          ? `hsl(${Math.random() * 60 + 30}, 70%, 50%)` // Warm colors for Eid al-Fitr
          : `hsl(${Math.random() * 60 + 180}, 70%, 50%)`, // Cool colors for Eid al-Adha
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.1 - 0.05,
        type: Math.random() > 0.7 ? 'star' : 'confetti',
        opacity: 1
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;
        particle.opacity -= 0.002;

        // Reset particle if it goes off screen or fades
        if (particle.y > canvas.height || particle.opacity <= 0) {
          particles[index] = {
            x: Math.random() * canvas.width,
            y: -20,
            size: Math.random() * 4 + 2,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 + 1,
            color: eidType === 'eid-fitr' 
              ? `hsl(${Math.random() * 60 + 30}, 70%, 50%)`
              : `hsl(${Math.random() * 60 + 180}, 70%, 50%)`,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: Math.random() * 0.1 - 0.05,
            type: Math.random() > 0.7 ? 'star' : 'confetti',
            opacity: 1
          };
        }

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = particle.opacity;

        if (particle.type === 'star') {
          // Draw star
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const x = Math.cos(angle) * particle.size;
            const y = Math.sin(angle) * particle.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          // Draw confetti rectangle
          ctx.fillStyle = particle.color;
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 1.5);
        }

        ctx.restore();
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
  }, [eidType]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background: eidType === 'eid-fitr'
          ? 'linear-gradient(135deg, #fef3c7, #fde68a, #fbbf24)'
          : 'linear-gradient(135deg, #dbeafe, #bfdbfe, #93c5fd)'
      }}
    />
  );
};

export default EidAnimations;
