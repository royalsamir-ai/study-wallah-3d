import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Atom,
  Calculator,
  FlaskConical,
  Dna,
  Code2,
  BookOpen,
  Landmark,
  TrendingUp,
  Download,
  Lock,
  X,
  FileText,
} from 'lucide-react';
import { studyResources, type StudyResource } from '@/data/resources';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Atom,
  Calculator,
  FlaskConical,
  Dna,
  Code2,
  BookOpen,
  Landmark,
  TrendingUp,
};

const cardColors = [
  { bg: 'linear-gradient(135deg, #ffd6e5, #ffe9f3)', border: 'rgba(255, 143, 184, 0.3)', icon: '#FF8FB3', shadow: 'rgba(255, 143, 184, 0.15)' },
  { bg: 'linear-gradient(135deg, #e0d4ff, #f0e9ff)', border: 'rgba(167, 139, 250, 0.3)', icon: '#a78bfa', shadow: 'rgba(167, 139, 250, 0.15)' },
  { bg: 'linear-gradient(135deg, #d4f4e9, #e9f5ef)', border: 'rgba(107, 191, 155, 0.3)', icon: '#6bbf9b', shadow: 'rgba(107, 191, 155, 0.15)' },
  { bg: 'linear-gradient(135deg, #ffd9b8, #fff0e6)', border: 'rgba(230, 162, 107, 0.3)', icon: '#e6a26b', shadow: 'rgba(230, 162, 107, 0.15)' },
  { bg: 'linear-gradient(135deg, #ffd6e5, #e0d4ff)', border: 'rgba(255, 143, 184, 0.25)', icon: '#FF8FB3', shadow: 'rgba(255, 143, 184, 0.12)' },
  { bg: 'linear-gradient(135deg, #e0d4ff, #d4f4e9)', border: 'rgba(167, 139, 250, 0.25)', icon: '#a78bfa', shadow: 'rgba(167, 139, 250, 0.12)' },
  { bg: 'linear-gradient(135deg, #ffe9f3, #ffd9b8)', border: 'rgba(255, 143, 184, 0.25)', icon: '#e6a26b', shadow: 'rgba(230, 162, 107, 0.12)' },
  { bg: 'linear-gradient(135deg, #d4f4e9, #e0d4ff)', border: 'rgba(107, 191, 155, 0.25)', icon: '#6bbf9b', shadow: 'rgba(107, 191, 155, 0.12)' },
];

interface StudyResourcesProps {
  hasToken: boolean;
  onTokenNeeded: () => void;
}

export default function StudyResources({ hasToken, onTokenNeeded }: StudyResourcesProps) {
  const [selected, setSelected] = useState<StudyResource | null>(null);

  const handleDownload = (resource: StudyResource) => {
    if (!hasToken) {
      onTokenNeeded();
      return;
    }
    setSelected(resource);
  };

  return (
    <section id="resources" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
            Study <span className="text-cute-gradient">Resources</span> 📚
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
            Cute, high-quality, free study materials across multiple subjects.
            Solve the puzzle above to unlock your downloads! 💖
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {studyResources.map((resource, index) => {
            const Icon = iconMap[resource.icon] ?? FileText;
            const colors = cardColors[index % cardColors.length];
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group rounded-[2rem] p-5 transition-all"
                style={{
                  background: colors.bg,
                  border: `2px solid ${colors.border}`,
                  boxShadow: `0 8px 30px ${colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.5)`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255, 255, 255, 0.6)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: colors.icon }} />
                  </motion.div>
                  <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: 'rgba(255, 255, 255, 0.5)', color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
                    {resource.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
                  {resource.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
                  {resource.description}
                </p>

                <div className="flex items-center gap-4 text-xs mb-4" style={{ color: '#8b85a7' }}>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    {resource.pages} pages
                  </span>
                  <span>{resource.size}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownload(resource)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all"
                  style={
                    hasToken
                      ? {
                          background: 'linear-gradient(135deg, #ffb5d0, #FF8FB3)',
                          color: '#fff',
                          fontFamily: 'Fredoka, sans-serif',
                          boxShadow: '0 4px 15px rgba(255, 143, 184, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                        }
                      : {
                          background: 'rgba(255, 255, 255, 0.5)',
                          color: '#4a4769',
                          fontFamily: 'Fredoka, sans-serif',
                          border: '2px solid rgba(255, 181, 208, 0.3)',
                        }
                  }
                >
                  {hasToken ? (
                    <>
                      <Download className="w-4 h-4" />
                      Download PDF
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Unlock with Token
                    </>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Download modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(45, 42, 74, 0.3)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-premium rounded-[2.5rem] p-8 max-w-md w-full text-center shadow-cute-premium relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full glass-cute flex items-center justify-center transition-all hover:scale-110"
                style={{ color: '#4a4769' }}
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'linear-gradient(135deg, #ffd6e5, #e0d4ff)' }}
              >
                <FileText className="w-8 h-8" style={{ color: '#FF8FB3' }} />
              </motion.div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
                {selected.title} 🎀
              </h3>
              <p className="text-sm mb-6" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
                This is a demo resource. In a production deployment, your PDF
                download would start here. Happy studying! 💖
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelected(null)}
                  className="flex-1 py-2.5 rounded-full font-semibold transition-all"
                  style={{ background: 'rgba(255, 255, 255, 0.5)', color: '#4a4769', fontFamily: 'Fredoka, sans-serif' }}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelected(null)}
                  className="flex-1 py-2.5 rounded-full font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #ffb5d0, #FF8FB3)', fontFamily: 'Fredoka, sans-serif', boxShadow: '0 4px 15px rgba(255, 143, 184, 0.3)' }}
                >
                  Got it! 💖
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
