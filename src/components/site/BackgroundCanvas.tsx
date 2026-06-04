import React, { useEffect, useRef } from "react";

interface BackgroundCanvasProps {
  activeChapter: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  targetAlpha: number;
}

export function BackgroundCanvas({ activeChapter }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 });
  const particlesRef = useRef<Particle[]>([]);
  const currentChapterRef = useRef<number>(activeChapter);

  // Smooth color transitions
  // Chapter colors (rgb values): 0: Gold (245, 158, 11), 1: Gold-Green mix, 2: Green (16, 185, 129), 3: Cyan-Amber, 4: Green-Cyan grid, 5: Cyan (6, 182, 212)
  const getChapterConfig = (chapter: number) => {
    switch (chapter) {
      case 0: // Hero
        return {
          r: 245,
          g: 158,
          b: 11,
          speed: 0.6,
          count: 100,
          connect: false,
          orbit: false,
        };
      case 1: // Sequence
        return {
          r: 217,
          g: 119,
          b: 6, // Amber
          speed: 1.2,
          count: 90,
          connect: false,
          orbit: false,
        };
      case 2: // Services
        return {
          r: 16,
          g: 185,
          b: 129, // Emerald Green
          speed: 0.4,
          count: 110,
          connect: false,
          orbit: false,
        };
      case 3: // About
        return {
          r: 6,
          g: 182,
          b: 212, // Cyan
          speed: 0.8,
          count: 80,
          connect: false,
          orbit: true,
        };
      case 4: // Areas & FAQ
        return {
          r: 16,
          g: 185,
          b: 129,
          speed: 0.5,
          count: 70,
          connect: true,
          orbit: false,
        };
      case 5: // Booking
        return {
          r: 6,
          g: 182,
          b: 212,
          speed: 1.5,
          count: 100,
          connect: false,
          orbit: false,
        };
      default:
        return {
          r: 245,
          g: 158,
          b: 11,
          speed: 0.6,
          count: 100,
          connect: false,
          orbit: false,
        };
    }
  };

  useEffect(() => {
    currentChapterRef.current = activeChapter;
  }, [activeChapter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const handleMouseClick = () => {
      if (currentChapterRef.current === 5) {
        // Spawn particle burst on Booking section
        const mouse = mouseRef.current;
        const config = getChapterConfig(5);
        for (let i = 0; i < 15; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3 + 2;
          particlesRef.current.push({
            x: mouse.x,
            y: mouse.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 3 + 1,
            color: `rgba(${config.r}, ${config.g}, ${config.b}, 1)`,
            alpha: 1,
            baseAlpha: 0.8,
            targetAlpha: 0,
          });
        }
      }
    };

    // Initialize particles
    const initParticles = () => {
      const config = getChapterConfig(currentChapterRef.current);
      const particles: Particle[] = [];
      const count = 120; // Pool size

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 2.5 + 0.5,
          color: "",
          alpha: Math.random() * 0.5 + 0.1,
          baseAlpha: Math.random() * 0.5 + 0.1,
          targetAlpha: 1,
        });
      }
      particlesRef.current = particles;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleMouseClick);

    // Initial sizing
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();

    // Color interpolation state variables
    let currentR = 245;
    let currentG = 158;
    let currentB = 11;
    let currentSpeedMult = 0.6;

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const targetConfig = getChapterConfig(currentChapterRef.current);

      // Interpolate colors/speed smoothly
      currentR += (targetConfig.r - currentR) * 0.05;
      currentG += (targetConfig.g - currentG) * 0.05;
      currentB += (targetConfig.b - currentB) * 0.05;
      currentSpeedMult += (targetConfig.speed - currentSpeedMult) * 0.05;

      const colorString = `rgba(${Math.round(currentR)}, ${Math.round(currentG)}, ${Math.round(currentB)}, `;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Draw connections in Area chapter (Chapter 4)
      if (targetConfig.connect) {
        ctx.strokeStyle = `rgba(${Math.round(currentR)}, ${Math.round(currentG)}, ${Math.round(currentB)}, 0.07)`;
        ctx.lineWidth = 0.8;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Behavior modifications
        if (targetConfig.orbit) {
          // Add a central orbital gravitational pull
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 50) {
            p.vx += (dx / dist) * 0.02 * currentSpeedMult;
            p.vy += (dy / dist) * 0.02 * currentSpeedMult;
          }
        }

        // Apply velocities
        p.x += p.vx * currentSpeedMult;
        p.y += p.vy * currentSpeedMult;

        // Wrap around boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse interaction
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          const force = (mouse.radius - mdist) / mouse.radius;
          // Attract or repel based on chapter config
          if (currentChapterRef.current === 5) {
            // Repel strongly on Booking
            p.x -= (mdx / mdist) * force * 4;
            p.y -= (mdy / mdist) * force * 4;
          } else {
            // Subtle attract on other chapters
            p.x += (mdx / mdist) * force * 1.5;
            p.y += (mdy / mdist) * force * 1.5;
          }
        }

        // Clean up spawned burst particles
        if (p.targetAlpha === 0) {
          p.alpha -= 0.02;
          if (p.alpha <= 0) {
            particles.splice(i, 1);
            i--;
            continue;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = colorString + (p.targetAlpha === 0 ? p.alpha : p.baseAlpha) + ")";
        ctx.shadowColor = `rgba(${Math.round(currentR)}, ${Math.round(currentG)}, ${Math.round(currentB)}, 0.5)`;
        ctx.shadowBlur = p.size * 2;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for next drawings
      }

      // Maintain standard particle count if too many items were deleted or created
      if (particles.length < 120 && Math.random() < 0.2) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 2 + 0.5,
          color: "",
          alpha: Math.random() * 0.5 + 0.1,
          baseAlpha: Math.random() * 0.5 + 0.1,
          targetAlpha: 1,
        });
      }

      // Draw faint cursor ambient pulse
      if (mouse.x !== -9999) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 40, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${Math.round(currentR)}, ${Math.round(currentG)}, ${Math.round(currentB)}, 0.03)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      requestRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleMouseClick);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
