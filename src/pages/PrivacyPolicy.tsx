import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';

const sections = [
  {
    title: '1. Introduction 🌸',
    content:
      'Study Wallah Samir ("we", "us", or "our") operates the studywallahsamir.example website (the "Service"). This Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using Study Wallah Samir, you agree to the practices described in this policy.',
  },
  {
    title: '2. Information We Collect 💕',
    content:
      'Study Wallah Samir is designed to be minimal in data collection. We do not require you to create an account to access our resources. We may collect anonymous usage data such as pages visited, time spent on the site, and puzzle completion statistics to improve our content. When you use our contact form, we collect the name, email, and message you voluntarily provide.',
  },
  {
    title: '3. Cookies and Tracking Technologies 🍪',
    content:
      'We use cookies and similar tracking technologies to enhance your browsing experience and analyze site traffic. Third-party vendors, including Google, may use cookies to serve ads based on your prior visits to our website or other websites. Google\'s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other internet sites. You may opt out of personalized advertising by visiting Google Ads Settings.',
  },
  {
    title: '4. Google AdSense 📢',
    content:
      'We use Google AdSense to display advertisements on our website. Google, as a third-party vendor, uses cookies to serve ads on our site. Google\'s use of the DART cookie enables it to serve ads to users based on their visit to our sites and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.',
  },
  {
    title: '5. How We Use Your Information ✨',
    content:
      'We use the information we collect to: (a) provide and maintain our Service; (b) improve and optimize our content and user experience; (c) respond to your inquiries and messages sent through our contact form; (d) monitor and analyze usage trends and patterns. We do not sell, trade, or rent your personal information to third parties.',
  },
  {
    title: '6. Data Security 🔒',
    content:
      'We take reasonable measures to protect your information from unauthorized access, alteration, or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security. We do not store sensitive personal data such as passwords or payment information.',
  },
  {
    title: '7. Third-Party Links 🔗',
    content:
      'Our Service may contain links to third-party websites or services that are not owned or controlled by Study Wallah Samir. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. We strongly advise you to review the privacy policy of any third-party site you visit.',
  },
  {
    title: '8. Children\'s Privacy 👶',
    content:
      'Study Wallah Samir is an educational platform intended for students of all ages. We do not knowingly collect personal information from children under 13 years of age without parental consent. If you believe we have collected information from a child under 13, please contact us so we can promptly delete it.',
  },
  {
    title: '9. Your Data Rights 🎀',
    content:
      'Since we do not require accounts or store personal data beyond what you submit via the contact form, your data footprint on Study Wallah Samir is minimal. You may request access to, correction of, or deletion of any information you have provided to us by contacting us through our contact page.',
  },
  {
    title: '10. Changes to This Policy 📝',
    content:
      'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date at the top. You are advised to review this Privacy Policy periodically for any changes.',
  },
];

export default function PrivacyPolicy() {
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
              <Shield className="w-4 h-4" />
              <span>Last updated: September 2026</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
              Privacy <span className="text-cute-gradient">Policy</span> 🛡️
            </h1>
            <p style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
              Your privacy matters to us, cutie! Here's how we handle your data. 💖
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
              Questions about this privacy policy? Reach out via our{' '}
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
