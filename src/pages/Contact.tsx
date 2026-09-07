import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';

interface ContactInfoItem {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  color: string;
  bg: string;
  shadow: string;
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  const contactInfo: ContactInfoItem[] = [
    { icon: Mail, label: 'Email', value: 'studywallahsamir.help@gmail.com', href: 'mailto:studywallahsamir.help@gmail.com', color: '#FF8FB3', bg: 'linear-gradient(135deg, #ffd6e5, #ffe9f3)', shadow: 'rgba(255, 143, 184, 0.15)' },
    { icon: MapPin, label: 'Location', value: 'Available worldwide, online! 🌍', color: '#a78bfa', bg: 'linear-gradient(135deg, #e0d4ff, #f0e9ff)', shadow: 'rgba(167, 139, 250, 0.15)' },
    { icon: MessageSquare, label: 'Response Time', value: 'Within 48 hours ⏰', color: '#6bbf9b', bg: 'linear-gradient(135deg, #d4f4e9, #e9f5ef)', shadow: 'rgba(107, 191, 155, 0.15)' },
  ];

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
              Get in <span className="text-cute-gradient">Touch</span> 💕
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
              Have a question, suggestion, or found a resource you'd like to
              share? We'd love to hear from you, cutie! 🎀
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {contactInfo.map((info) => (
                <motion.div
                  key={info.label}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-[2rem] p-5"
                  style={{ background: info.bg, border: '2px solid rgba(255, 255, 255, 0.5)', boxShadow: `0 8px 30px ${info.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.5)` }}
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                    style={{ background: 'rgba(255, 255, 255, 0.6)' }}
                  >
                    <info.icon className="w-5 h-5" style={{ color: info.color }} />
                  </motion.div>
                  <h3 className="text-sm mb-1" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>{info.label}</h3>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="font-semibold hover:underline break-all"
                      style={{ color: info.color, fontFamily: 'Fredoka, sans-serif' }}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="font-semibold" style={{ color: '#2E2A4A', fontFamily: 'Fredoka, sans-serif' }}>{info.value}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="glass-premium rounded-[2.5rem] p-6 md:p-8 space-y-5 shadow-cute-premium">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm mb-2 font-semibold" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>Name 🌸</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-full text-[#2E2A4A] placeholder-[#b0a8c0] transition-all focus:outline-none"
                      style={{ background: 'rgba(255, 255, 255, 0.6)', border: '2px solid rgba(255, 181, 208, 0.3)', fontFamily: 'Quicksand, sans-serif' }}
                      placeholder="Your cute name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 font-semibold" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>Email 💌</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-full text-[#2E2A4A] placeholder-[#b0a8c0] transition-all focus:outline-none"
                      style={{ background: 'rgba(255, 255, 255, 0.6)', border: '2px solid rgba(200, 182, 255, 0.3)', fontFamily: 'Quicksand, sans-serif' }}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2 font-semibold" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>Subject ✨</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-full text-[#2E2A4A] placeholder-[#b0a8c0] transition-all focus:outline-none"
                    style={{ background: 'rgba(255, 255, 255, 0.6)', border: '2px solid rgba(255, 181, 208, 0.3)', fontFamily: 'Quicksand, sans-serif' }}
                    placeholder="What's on your mind?"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-semibold" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>Message 💖</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-[1.5rem] text-[#2E2A4A] placeholder-[#b0a8c0] resize-none transition-all focus:outline-none"
                    style={{ background: 'rgba(255, 255, 255, 0.6)', border: '2px solid rgba(200, 182, 255, 0.3)', fontFamily: 'Quicksand, sans-serif' }}
                    placeholder="Tell us more, cutie..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #ffb5d0, #FF8FB3)', fontFamily: 'Fredoka, sans-serif', boxShadow: '0 6px 20px rgba(255, 143, 184, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)' }}
                >
                  {sent ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Message Sent! 🎉
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message 💕
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
