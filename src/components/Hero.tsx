import { Suspense, lazy } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, ArrowDown, Rocket } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Hero3DScene = lazy(() => import('./Hero3DScene'));

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-cute-dots opacity-40" />
      <div className="absolute inset-0 bg-cute-radial" />

      {/* 3D Scene background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Hero3DScene />
        </Suspense>
      </div>

      {/* Soft overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#FFFDF9]/20 via-transparent to-[#FFFDF9]/80" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#FFFDF9]/30 via-transparent to-[#FFFDF9]/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium text-sm font-semibold mb-8"
            style={{ color: '#a78bfa' }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Hello Cuties! ✨ The Future of Smart Learning.</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}
          >
            Study Wallah
            <br />
            <span className="text-cute-gradient">Samir</span>
            <span className="text-4xl md:text-5xl"> 🎀</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            style={{ color: '#4a4769' }}
          >
            Welcome to the cutest study corner on the internet! Get free notes,
            formula sheets, and study materials. Play a fun game to unlock your
            magical download code — no paywalls, just cuteness! 💖
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <MagneticButton href="#zones" variant="pink">
              <Rocket className="w-5 h-5" />
              Explore Zones 🚀
            </MagneticButton>
            <MagneticButton href="#game" variant="lavender">
              Get Your Magic Code ✨
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-1"
              style={{ color: '#8b85a7' }}
            >
              <span className="text-xs uppercase tracking-widest font-semibold">Scroll</span>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
