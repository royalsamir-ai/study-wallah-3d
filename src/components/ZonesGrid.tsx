import { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Atom, Trophy, BookMarked, Star, ArrowRight } from 'lucide-react';

interface Zone {
  code: string;
  name: string;
  description: string;
  icons: [typeof Rocket, typeof Rocket];
  color: string;
  glow: string;
  gradient: string;
}

const zones: Zone[] = [
  {
    code: 'P-Zone',
    name: 'Physics & Science Vault',
    description:
      'Rocket-fuel formula sheets, atomic diagrams, and mechanics notes — everything a curious cutie needs to master physics and the sciences.',
    icons: [Rocket, Atom],
    color: '#6fb3ff',
    glow: 'var(--zone-p-glow)',
    gradient: 'linear-gradient(135deg, rgba(111,179,255,0.18), rgba(111,179,255,0.04))',
  },
  {
    code: 'T-Zone',
    name: 'Toppers & Trophy Track',
    description:
      'Quick-notes, revision guides, and achievement-based study paths designed to turn consistent effort into trophy-worthy results.',
    icons: [Trophy, BookMarked],
    color: '#5fd8a0',
    glow: 'var(--zone-t-glow)',
    gradient: 'linear-gradient(135deg, rgba(95,216,160,0.18), rgba(95,216,160,0.04))',
  },
  {
    code: 'A-Zone',
    name: 'Ace Achievers Arena',
    description:
      'Star-rated reference material across history, economics, and languages, curated for cuties who want to ace every subject.',
    icons: [Star, Star],
    color: '#b98cff',
    glow: 'var(--zone-a-glow)',
    gradient: 'linear-gradient(135deg, rgba(185,140,255,0.18), rgba(185,140,255,0.04))',
  },
];

function ZoneCard({ zone, index }: { zone: Zone; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [IconPrimary, IconSecondary] = zone.icons;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * 14, ry: (px - 0.5) * 14 });
    setGlowPos({ x: px * 100, y: py * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5 + index * 0.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="zone-card relative rounded-[2.25rem] p-7 md:p-8 h-full cursor-pointer"
          style={{
            transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${
              tilt.rx || tilt.ry ? 1.03 : 1
            })`,
            transition: 'transform 0.25s ease-out',
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(22px) saturate(180%)',
            WebkitBackdropFilter: 'blur(22px) saturate(180%)',
            border: `2px solid ${zone.color}33`,
            boxShadow: `0 10px 40px ${zone.glow}, inset 0 1px 0 rgba(255,255,255,0.6)`,
          }}
        >
          {/* Cursor-following glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2.25rem] opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${zone.color}30, transparent 60%)`,
            }}
          />
          <div
            className="absolute inset-0 rounded-[2.25rem] opacity-70"
            style={{ background: zone.gradient }}
          />

          <div className="relative" style={{ transform: 'translateZ(40px)' }}>
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.15, rotate: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: `${zone.color}22`,
                  boxShadow: `0 4px 20px ${zone.color}40, inset 0 1px 0 rgba(255,255,255,0.5)`,
                }}
              >
                <IconPrimary className="w-7 h-7" style={{ color: zone.color }} />
              </motion.div>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.5)' }}
              >
                <IconSecondary className="w-4 h-4" style={{ color: zone.color }} />
              </div>
            </div>

            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
              style={{ color: zone.color, background: `${zone.color}18`, fontFamily: 'Quicksand, sans-serif' }}
            >
              {zone.code}
            </span>

            <h3
              className="text-xl md:text-2xl font-bold mb-3"
              style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}
            >
              {zone.name}
            </h3>
            <p
              className="text-sm md:text-base leading-relaxed mb-6"
              style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}
            >
              {zone.description}
            </p>

            <motion.a
              href="#resources"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-1.5 text-sm font-bold"
              style={{ color: zone.color, fontFamily: 'Fredoka, sans-serif' }}
            >
              Enter Zone
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ZonesGrid() {
  return (
    <section id="zones" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-cute-radial opacity-40" />
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium text-sm font-semibold mb-4"
            style={{ color: '#a78bfa' }}
          >
            <Rocket className="w-4 h-4" />
            <span>Secure Code-Name Zones</span>
          </motion.div>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}
          >
            Explore Your <span className="text-cute-gradient">Zones</span> 🚀
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}
          >
            Every subject lives inside a secure, code-named zone. Tilt, hover,
            and pick your path — smart learning has never looked this cute! 💖
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {zones.map((zone, i) => (
            <ZoneCard key={zone.code} zone={zone} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
