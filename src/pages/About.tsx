import { motion } from 'framer-motion';
import { BookHeart, Target, Heart, Users, BookOpen, Sparkles } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';

const values = [
  {
    icon: Target,
    title: 'Our Mission 🎯',
    text: 'To make high-quality educational resources accessible to every student, completely free of charge, wrapped in a super cute and engaging experience!',
    color: '#FF8FB3',
    bg: 'linear-gradient(135deg, #ffd6e5, #ffe9f3)',
    shadow: 'rgba(255, 143, 184, 0.15)',
  },
  {
    icon: Heart,
    title: 'Student-First 💕',
    text: 'No paywalls, no annoying link shorteners, no hidden fees. Everything we build is designed to help cuties learn better and have fun doing it!',
    color: '#a78bfa',
    bg: 'linear-gradient(135deg, #e0d4ff, #f0e9ff)',
    shadow: 'rgba(167, 139, 250, 0.15)',
  },
  {
    icon: Sparkles,
    title: 'Gamified Learning ✨',
    text: 'We believe education should be fun! Our puzzle-based access system keeps you engaged while you study. Learning has never been this cute!',
    color: '#6bbf9b',
    bg: 'linear-gradient(135deg, #d4f4e9, #e9f5ef)',
    shadow: 'rgba(107, 191, 155, 0.15)',
  },
  {
    icon: BookOpen,
    title: 'Quality Content 📚',
    text: 'Every resource is carefully curated and formatted for clarity, covering physics, math, chemistry, biology, and more. Study smart, study cute!',
    color: '#e6a26b',
    bg: 'linear-gradient(135deg, #ffd9b8, #fff0e6)',
    shadow: 'rgba(230, 162, 107, 0.15)',
  },
];

export default function About() {
  return (
    <PageWrapper>
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-cute-radial opacity-50" />
        <div className="absolute inset-0 bg-cute-dots opacity-30" />
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium text-sm font-semibold mb-6"
              style={{ color: '#a78bfa' }}
            >
              <BookHeart className="w-4 h-4" />
              <span>About Study Wallah Samir 🎀</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
              Free Education,
              <br />
              <span className="text-cute-gradient">For Every Cutie</span> 💖
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
              Study Wallah Samir is a free, student-friendly platform built to
              provide high-quality educational resources in a modern, super cute
              way. We believe learning materials should be accessible to all,
              without barriers or boredom!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-[2rem] p-6"
                style={{ background: value.bg, border: '2px solid rgba(255, 255, 255, 0.5)', boxShadow: `0 8px 30px ${value.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.5)` }}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'rgba(255, 255, 255, 0.6)' }}
                >
                  <value.icon className="w-6 h-6" style={{ color: value.color }} />
                </motion.div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
                  {value.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-premium rounded-[2.5rem] p-8 md:p-12 text-center shadow-cute-premium"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex"
            >
              <Users className="w-12 h-12" style={{ color: '#FF8FB3' }} />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
              Built by Cuties, for Cuties 🌸
            </h2>
            <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
              We understand the struggle of finding reliable, well-organized
              study materials online. That's why we created Study Wallah Samir —
              a clean, distraction-free hub where you can find formula sheets,
              quick notes, and reference guides across multiple subjects, all
              in one super cute place. Our gamified access system replaces
              annoying link shorteners with a fun puzzle, keeping the experience
              enjoyable and ad-light. 💖
            </p>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
