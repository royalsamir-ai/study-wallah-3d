import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import MagicTokenFlow from './MagicTokenFlow';

export default function AccessCodeGame() {
  return (
    <section id="game" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-cute-radial opacity-50" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium text-sm font-semibold mb-4"
            style={{ color: '#a78bfa' }}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Play to get your magical access code! 🎀</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
            Unlock Your <span className="text-cute-gradient">Magic Code</span> ✨
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
            Pass the quick, cute human check to get your 24-hour magic token for
            the SWS App. No link shorteners, no paywalls — just a fun little
            check! 💖
          </p>
        </motion.div>

        <MagicTokenFlow />
      </div>
    </section>
  );
}
