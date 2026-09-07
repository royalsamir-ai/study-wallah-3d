import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookHeart, Github, Instagram, Mail } from 'lucide-react';

const footerLinks = {
  Platform: [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
  Legal: [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t-2" style={{ borderColor: 'rgba(255, 181, 208, 0.2)', background: 'linear-gradient(180deg, #FFFDF9 0%, #ffe9f3 100%)' }}>
      <div className="absolute inset-0 bg-cute-radial opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <BookHeart className="w-7 h-7" style={{ color: '#FF8FB3' }} />
              <span className="text-lg font-bold" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
                Study Wallah <span className="text-cute-gradient">Samir</span>
              </span>
            </Link>
            <p className="text-sm max-w-sm leading-relaxed" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
              The cutest free educational platform for students! Get study
              materials, notes, and formula sheets in a fun, gamified way. Made
              with love for cuties everywhere. 🎀
            </p>
            <motion.a
              href="mailto:studywallahsamir.help@gmail.com"
              whileHover={{ x: 3 }}
              className="inline-flex items-center gap-2 mt-4 text-sm font-semibold"
              style={{ color: '#FF8FB3', fontFamily: 'Quicksand, sans-serif' }}
            >
              <Mail className="w-4 h-4" />
              For any queries, contact us at: studywallahsamir.help@gmail.com
            </motion.a>
            <div className="flex items-center gap-4 mt-6">
              {[
                { Icon: Github, label: 'GitHub', href: 'https://github.com/royalsamir-ai' },
                { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/studywallah_samir' },
                { Icon: Mail, label: 'Email', href: 'mailto:studywallahsamir.help@gmail.com' },
              ].map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 rounded-full glass-cute flex items-center justify-center transition-all"
                  style={{ color: '#a78bfa' }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-bold mb-4" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm transition-colors hover:text-[#FF8FB3]"
                      style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t-2 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(255, 181, 208, 0.15)' }}>
          <p className="text-sm" style={{ color: '#8b85a7' }}>
            &copy; {new Date().getFullYear()} Study Wallah Samir. Made with 💖 for cuties.
          </p>
          <p className="text-sm" style={{ color: '#8b85a7' }}>
            Free forever, cute always! 🌸
          </p>
        </div>

        {/* Boss Level branding strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 glass-premium rounded-full px-6 py-3.5 text-center overflow-hidden"
        >
          <p
            className="typing-line text-sm md:text-base font-bold mx-auto"
            style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A', maxWidth: '100%' }}
          >
            ✨ Powered by Cuties | Crafted by{' '}
            <span className="text-royal-gradient">Royal Samir</span> ✨
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
