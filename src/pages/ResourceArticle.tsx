import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Gamepad2 } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import DownloadUnlockButton from '@/components/DownloadUnlockButton';
import NotFound from '@/pages/NotFound';
import { getArticleBySlug } from '@/data/subjectArticles';
import { studyResources } from '@/data/resources';
import { useUnlockToken } from '@/hooks/useUnlockToken';

export default function ResourceArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug);
  const resource = article ? studyResources.find((r) => r.id === article.resourceId) : undefined;
  const { hasToken, showPrompt, onTokenNeeded } = useUnlockToken();

  // Per-page <title> and meta description (client-side).
  useEffect(() => {
    if (!article) return;
    const previousTitle = document.title;
    document.title = article.metaTitle;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const created = !meta;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    const previousDescription = meta.content;
    meta.content = article.metaDescription;

    return () => {
      document.title = previousTitle;
      if (created) meta?.remove();
      else if (meta) meta.content = previousDescription;
    };
  }, [article]);

  if (!article || !resource) return <NotFound />;

  return (
    <PageWrapper>
      <div className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-cute-radial opacity-40 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              to="/#resources"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
              style={{ color: '#a78bfa', fontFamily: 'Fredoka, sans-serif' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Study Resources
            </Link>
          </nav>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-premium rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-cute-premium"
          >
            <header className="mb-8">
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                style={{ background: 'rgba(255, 143, 179, 0.15)', color: '#FF8FB3', fontFamily: 'Quicksand, sans-serif' }}
              >
                {resource.category} Study Guide
              </span>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5"
                style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}
              >
                {article.title}
              </h1>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}
              >
                {article.intro}
              </p>
            </header>

            <div className="space-y-5">
              {article.blocks.map((block, i) => {
                switch (block.type) {
                  case 'h2':
                    return (
                      <h2
                        key={i}
                        className="text-2xl md:text-3xl font-bold pt-6"
                        style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}
                      >
                        {block.text}
                      </h2>
                    );
                  case 'h3':
                    return (
                      <h3
                        key={i}
                        className="text-xl font-semibold pt-2 text-cute-gradient"
                        style={{ fontFamily: 'Fredoka, sans-serif' }}
                      >
                        {block.text}
                      </h3>
                    );
                  case 'ul':
                    return (
                      <ul
                        key={i}
                        className="list-disc pl-6 space-y-2 leading-relaxed marker:text-[#FF8FB3]"
                        style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}
                      >
                        {block.items.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    );
                  default:
                    return (
                      <p
                        key={i}
                        className="leading-relaxed md:text-[17px]"
                        style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}
                      >
                        {block.text}
                      </p>
                    );
                }
              })}
            </div>

            {/* Token / download area — very bottom of the article */}
            <footer
              className="mt-12 pt-8 border-t-2 text-center"
              style={{ borderColor: 'rgba(255, 181, 208, 0.3)' }}
            >
              <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
                Want the full {resource.title}? 📄
              </h2>
              <p className="text-sm mb-5" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
                {resource.pages} pages • {resource.size}. Unlock it with your magical token — solve the puzzle or
                pass the Security Shield on the home page to get one.
              </p>
              <div className="max-w-xs mx-auto glass-cute rounded-full p-1.5">
                <DownloadUnlockButton resource={resource} hasToken={hasToken} onTokenNeeded={onTokenNeeded} />
              </div>
              {!hasToken && (
                <Link
                  to="/#game"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold"
                  style={{ color: '#a78bfa', fontFamily: 'Fredoka, sans-serif' }}
                >
                  <Gamepad2 className="w-4 h-4" />
                  Get my token
                </Link>
              )}
            </footer>
          </motion.article>
        </div>
      </div>

      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-premium rounded-full px-6 py-4 flex items-center gap-3 shadow-cute-premium"
        >
          <Lock className="w-5 h-5" style={{ color: '#FF8FB3' }} />
          <p className="text-sm font-semibold" style={{ color: '#2E2A4A', fontFamily: 'Quicksand, sans-serif' }}>
            Oops! You need your magical token to unlock this! 🪄
          </p>
        </motion.div>
      )}
    </PageWrapper>
  );
}
