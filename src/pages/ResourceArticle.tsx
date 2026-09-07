import { useCallback, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Lock, Sparkles, Atom, Calculator, FlaskConical } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import TokenUnlockCard from '@/components/TokenUnlockCard';
import { getSubjectArticle } from '@/data/articles';
import { studyResources } from '@/data/resources';
import { useTokenUnlock } from '@/hooks/useTokenUnlock';

const iconMap = { Atom, Calculator, FlaskConical } as const;

export default function ResourceArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = getSubjectArticle(slug);
  const { hasToken } = useTokenUnlock();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleTokenNeeded = useCallback(() => {
    setShowPrompt(true);
    setTimeout(() => setShowPrompt(false), 4000);
  }, []);

  if (!article) {
    return <Navigate to="/" replace />;
  }

  const resource = studyResources.find((r) => r.id === article.resourceId);
  const Icon = iconMap[article.icon as keyof typeof iconMap] ?? FileText;

  return (
    <PageWrapper>
      <article className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-cute-radial opacity-50" />
        <div className="absolute inset-0 bg-cute-dots opacity-30" />

        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold glass-cute px-4 py-2 rounded-full transition-all hover:scale-105"
              style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Study Resources
            </Link>
          </motion.div>

          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: article.accent.bg, border: `2px solid ${article.accent.border}`, boxShadow: `0 8px 30px ${article.accent.shadow}` }}
            >
              <Icon className="w-10 h-10" style={{ color: article.accent.icon }} />
            </motion.div>
            <span
              className="inline-block text-xs px-4 py-1.5 rounded-full font-semibold mb-4"
              style={{ background: 'rgba(255, 255, 255, 0.6)', color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}
            >
              {article.category} Study Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
              {article.title} {article.emoji}
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
              {article.tagline}
            </p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="glass-premium rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-cute-premium"
          >
            <div className="prose-cute">
              {article.blocks.map((block, i) => {
                if (block.type === 'h2') {
                  return (
                    <h2
                      key={i}
                      className="text-2xl md:text-3xl font-bold mt-10 mb-4 first:mt-0"
                      style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === 'h3') {
                  return (
                    <h3
                      key={i}
                      className="text-lg md:text-xl font-bold mt-7 mb-3"
                      style={{ fontFamily: 'Fredoka, sans-serif', color: '#FF8FB3' }}
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === 'ul') {
                  return (
                    <ul key={i} className="space-y-2 mb-5 pl-1">
                      {block.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2.5 leading-relaxed"
                          style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}
                        >
                          <Sparkles className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: '#a78bfa' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="leading-relaxed mb-5" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
                    {block.text}
                  </p>
                );
              })}
            </div>

            {/* Token unlock / download section — kept identical to the resources grid */}
            <div
              className="mt-12 pt-8 flex flex-col items-center text-center gap-4"
              style={{ borderTop: '2px dashed rgba(255, 181, 208, 0.35)' }}
            >
              {resource && (
                <div className="flex items-center gap-4 text-xs mb-1" style={{ color: '#8b85a7' }}>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    {resource.pages} pages
                  </span>
                  <span>{resource.size}</span>
                </div>
              )}
              <h3 className="text-xl font-bold" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
                Want the full PDF? 💖
              </h3>
              <p className="text-sm max-w-md" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
                Solve the puzzle on the homepage to grab your magic token, then come
                back here to unlock the downloadable version of this guide.
              </p>
              <TokenUnlockCard title={article.title} hasToken={hasToken} onTokenNeeded={handleTokenNeeded} />
            </div>
          </motion.div>
        </div>
      </article>

      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-premium rounded-full px-6 py-4 flex items-center gap-3 shadow-cute-premium"
        >
          <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5, repeat: 2 }}>
            <Lock className="w-5 h-5" style={{ color: '#FF8FB3' }} />
          </motion.div>
          <p className="text-sm font-semibold" style={{ color: '#2E2A4A', fontFamily: 'Quicksand, sans-serif' }}>
            Oops! You need your magical token to unlock this! 🪄
          </p>
        </motion.div>
      )}
    </PageWrapper>
  );
}
