import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';

const sections = [
  {
    title: '1. Acceptance of Terms 🎀',
    content:
      'By accessing and using Study Wallah Samir (the "Service"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Service. Your continued use of the site constitutes acceptance of any updated terms.',
  },
  {
    title: '2. Description of Service 📚',
    content:
      'Study Wallah Samir is a free educational platform that provides study materials, including PDFs, formula sheets, and notes, in a gamified format. Users can access resources by completing a short puzzle to receive an access token. The Service is provided "as is" without any warranties.',
  },
  {
    title: '3. Use of Resources 💖',
    content:
      'All educational materials provided on Study Wallah Samir are intended for personal, non-commercial, educational use. You may download and use these materials for your own study purposes. You may not redistribute, sell, modify, or use the materials for commercial purposes without explicit permission.',
  },
  {
    title: '4. Access Tokens ✨',
    content:
      'Access tokens generated through our puzzle system are unique to each session and are provided for the purpose of unlocking downloads. Tokens are non-transferable and have no monetary value. We reserve the right to modify or discontinue the token system at any time.',
  },
  {
    title: '5. User Conduct 🌸',
    content:
      'You agree to use Study Wallah Samir responsibly and lawfully. You shall not: (a) attempt to bypass or circumvent the access token system; (b) use automated tools to scrape or download content in bulk; (c) engage in any activity that disrupts or interferes with the Service; (d) use the Service for any illegal or unauthorized purpose.',
  },
  {
    title: '6. Intellectual Property 📝',
    content:
      'The Study Wallah Samir platform, including its design, code, and original content, is owned by Study Wallah Samir. Educational resources provided are either original works, used with permission, or sourced from public domain materials. Third-party content is attributed where applicable.',
  },
  {
    title: '7. Disclaimer of Warranties ⚠️',
    content:
      'Study Wallah Samir is provided on an "as is" and "as available" basis. We do not warrant that the Service will be uninterrupted, error-free, or secure. The accuracy, completeness, or reliability of any educational content is not guaranteed. You use the materials at your own discretion.',
  },
  {
    title: '8. Limitation of Liability 🛡️',
    content:
      'Study Wallah Samir and its operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the Service. This includes, but is not limited to, any errors, omissions, or inaccuracies in the educational content provided.',
  },
  {
    title: '9. Third-Party Advertisements 📢',
    content:
      'Study Wallah Samir may display third-party advertisements through services such as Google AdSense. We are not responsible for the content of these advertisements or the products and services they promote. Clicking on ads is at your own discretion.',
  },
  {
    title: '10. Changes to Terms 🔄',
    content:
      'We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page with an updated revision date. Your continued use of the Service after changes constitutes acceptance of the new terms.',
  },
  {
    title: '11. Termination 👋',
    content:
      'We may terminate or restrict access to the Service at any time, without notice, if we believe you have violated these Terms. Upon termination, all rights granted to you under these Terms will cease immediately.',
  },
  {
    title: '12. Contact 💌',
    content:
      'If you have any questions about these Terms and Conditions, please contact us through our contact page. We aim to respond to all inquiries within 48 hours.',
  },
];

export default function Terms() {
  return (
    <PageWrapper>
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-cute-radial opacity-50" />
        <div className="absolute inset-0 bg-cute-dots opacity-30" />
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium text-sm font-semibold mb-6"
              style={{ color: '#a78bfa' }}
            >
              <FileText className="w-4 h-4" />
              <span>Last updated: September 2026</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
              Terms &amp; <span className="text-cute-gradient">Conditions</span> 📜
            </h1>
            <p style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
              The rules and guidelines for using Study Wallah Samir, cutie! 🎀
            </p>
          </motion.div>

          <div className="space-y-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="glass-premium rounded-[2rem] p-6 shadow-cute-premium"
              >
                <h2 className="text-lg font-bold mb-3" style={{ color: '#FF8FB3', fontFamily: 'Fredoka, sans-serif' }}>
                  {section.title}
                </h2>
                <p className="leading-relaxed text-sm md:text-base" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center text-sm"
            style={{ color: '#8b85a7', fontFamily: 'Quicksand, sans-serif' }}
          >
            <p>
              Questions about these terms? Reach out via our{' '}
              <a href="/contact" className="font-semibold hover:underline" style={{ color: '#FF8FB3' }}>
                contact page
              </a>
              {' '}💌
            </p>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
