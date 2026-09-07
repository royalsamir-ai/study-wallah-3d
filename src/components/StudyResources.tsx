import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Atom,
  Calculator,
  FlaskConical,
  Dna,
  Code2,
  BookOpen,
  Landmark,
  TrendingUp,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { studyResources, type StudyResource } from '@/data/resources';
import TokenUnlockCard from '@/components/TokenUnlockCard';

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

const MotionLink = motion(Link);

interface StudyResourcesProps {
  hasToken: boolean;
  onTokenNeeded: () => void;
}

export default function StudyResources({ hasToken, onTokenNeeded }: StudyResourcesProps) {
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
            const isArticle = Boolean(resource.slug);

            const cardInner = (
              <>
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

                {isArticle ? (
                  <span
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #ffb5d0, #FF8FB3)',
                      color: '#fff',
                      fontFamily: 'Fredoka, sans-serif',
                      boxShadow: '0 4px 15px rgba(255, 143, 184, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    Read Study Guide
                    <ArrowRight className="w-4 h-4" />
                  </span>
                ) : (
                  <TokenUnlockCard title={resource.title} hasToken={hasToken} onTokenNeeded={onTokenNeeded} />
                )}
              </>
            );

            const cardStyle: React.CSSProperties = {
              background: colors.bg,
              border: `2px solid ${colors.border}`,
              boxShadow: `0 8px 30px ${colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.5)`,
            };

            if (isArticle) {
              return (
                <MotionLink
                  key={resource.id}
                  to={`/resource/${resource.slug}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group rounded-[2rem] p-5 transition-all block cursor-pointer"
                  style={cardStyle}
                  aria-label={`Read the full ${resource.title} study guide`}
                >
                  {cardInner}
                </MotionLink>
              );
            }

            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group rounded-[2rem] p-5 transition-all"
                style={cardStyle}
              >
                {cardInner}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export type { StudyResource };
