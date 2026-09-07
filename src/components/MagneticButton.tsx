import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'pink' | 'lavender';
  className?: string;
}

export default function MagneticButton({
  href,
  onClick,
  children,
  variant = 'pink',
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * 0.35, y: relY * 0.35 });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.8;
      const id = Date.now();
      setRipples((prev) => [
        ...prev,
        { id, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size },
      ]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    }
    onClick?.();
  };

  const background =
    variant === 'pink'
      ? 'linear-gradient(135deg, #ffb5d0, #FF8FB3)'
      : 'linear-gradient(135deg, #c8b6ff, #a78bfa)';
  const glow =
    variant === 'pink'
      ? '0 8px 30px rgba(255, 143, 179, 0.45), 0 0 40px rgba(255, 143, 179, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35)'
      : '0 8px 30px rgba(167, 139, 250, 0.45), 0 0 40px rgba(167, 139, 250, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35)';

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.4 }}
      whileTap={{ scale: 0.94 }}
      className={`relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-white rounded-full overflow-hidden select-none ${className}`}
      style={{
        fontFamily: 'Fredoka, sans-serif',
        background,
        boxShadow: glow,
      }}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.5), transparent 70%)' }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-span"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}
    </motion.a>
  );
}
