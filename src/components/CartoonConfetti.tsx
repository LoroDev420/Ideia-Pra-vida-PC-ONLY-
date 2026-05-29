import { useEffect, useRef } from "react";

interface CartoonConfettiProps {
  active: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: "circle" | "square" | "triangle" | "star";
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  gravity: number;
  drag: number;
  opacity: number;
  fadeSpeed: number;
}

const CARTOON_COLORS = [
  "#FFDE59", // Bright Cartoon Yellow
  "#FF5757", // Punchy Red
  "#38B6FF", // Cartoon Sky Blue
  "#7ED957", // Super Vibrant Green
  "#FF4D6D", // Lovely Pink
  "#5271FF"  // Electric Indigo
];

export default function CartoonConfetti({ active }: CartoonConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fluid responsive resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Trigger high energy explosion when active state goes true
  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;

    // Create dual erupting fountains from bottom corners
    const newParticles: Particle[] = [];
    const countPerSide = 45; // total of 90 high quality chunky particles

    // Spawn Left Fountain (erupting up and right)
    for (let i = 0; i < countPerSide; i++) {
      const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.45; // roughly 45 degrees up-right
      const speed = 14 + Math.random() * 16;
      newParticles.push(createParticle(0, height - 10, angle, speed));
    }

    // Spawn Right Fountain (erupting up and left)
    for (let i = 0; i < countPerSide; i++) {
      const angle = -3 * Math.PI / 4 + (Math.random() - 0.5) * 0.45; // roughly 135 degrees up-left
      const speed = 14 + Math.random() * 16;
      newParticles.push(createParticle(width, height - 10, angle, speed));
    }

    // Also throw some central starburst particles
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 5 + Math.random() * 10;
      newParticles.push(createParticle(width / 2, height / 2.5, angle, speed));
    }

    particlesRef.current = [...particlesRef.current, ...newParticles];

    // Initialize/resume animation loop
    if (!animationFrameRef.current) {
      const loop = () => {
        updateAndRender();
        animationFrameRef.current = requestAnimationFrame(loop);
      };
      animationFrameRef.current = requestAnimationFrame(loop);
    }
  }, [active]);

  const createParticle = (x: number, y: number, angle: number, speed: number): Particle => {
    const shapes: Particle["shape"][] = ["circle", "square", "triangle", "star"];
    const chosenShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 14 + Math.random() * 16, // big chunky classic cartoon size
      color: CARTOON_COLORS[Math.floor(Math.random() * CARTOON_COLORS.length)],
      shape: chosenShape,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.05 + Math.random() * 0.08,
      gravity: 0.35 + Math.random() * 0.25, // cartoon gravity feel
      drag: 0.96 + Math.random() * 0.02,
      opacity: 1,
      fadeSpeed: 0.005 + Math.random() * 0.008
    };
  };

  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  };

  const updateAndRender = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;
    const remaining: Particle[] = [];

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Physics integration
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;

      p.rotation += p.rotationSpeed;
      p.wobble += p.wobbleSpeed;
      p.opacity -= p.fadeSpeed;

      // Keep active if visible and not fully faded
      if (p.opacity > 0 && p.y < canvas.height + 50 && p.x > -50 && p.x < canvas.width + 50) {
        remaining.push(p);

        // Render physics particle
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Wobble stretch/skew for bouncing organic cartoon movement
        const horizontalScale = 1 + Math.sin(p.wobble) * 0.25;
        const verticalScale = 1 - Math.sin(p.wobble) * 0.15;
        ctx.scale(horizontalScale, verticalScale);

        // Heavy Comic Outline Style
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.fillStyle = p.color;

        ctx.beginPath();
        if (p.shape === "circle") {
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        } else if (p.shape === "square") {
          ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (p.shape === "triangle") {
          ctx.moveTo(0, -p.size / 1.7);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.closePath();
        } else if (p.shape === "star") {
          drawStar(ctx, 0, 0, 5, p.size / 1.6, p.size / 3.2);
        }

        // Draw fill first, then thick black outlines in traditional comic style!
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }

    particlesRef.current = remaining;

    // Pause loop when completely idle to save energy
    if (remaining.length === 0 && animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[600] w-screen h-screen"
    />
  );
}
