'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, User, CheckCircle2, AlertCircle, Loader2, Phone, MapPin } from 'lucide-react';
import IndianNavbarFixed from '@/components/IndianNavbarFixed';
import { Footer } from '@/components/Footer';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1489477135243673755/pVyiXtPw1m7ps33nT3p1-alGET8Hk07lX63sgyB7t5lu6Xze8gdb7hxp7ugErUVm8G4Q';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const payload = {
        embeds: [
          {
            title: '📬 New Message from Rangmanch',
            color: 0x6B1F2B, // Maroon color
            fields: [
              { name: '👤 Name', value: formData.name, inline: true },
              { name: '📧 Email', value: formData.email, inline: true },
              { name: '📝 Subject', value: formData.subject || 'No Subject' },
              { name: '💬 Message', value: formData.message }
            ],
            timestamp: new Date().toISOString(),
            footer: { text: 'Rangmanch Contact Form' }
          }
        ]
      };

      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] selection:bg-[#6B1F2B] selection:text-[#F5EFE6]">
      <IndianNavbarFixed />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#6B1F2B] text-xs tracking-[0.4em] uppercase font-bold block mb-4"
            >
              Get in Touch
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#3E2F26] text-4xl md:text-6xl font-heading mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              We'd Love to <span className="text-[#6B1F2B] italic">Hear from You</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#3E2F26]/70 text-lg max-w-2xl mx-auto"
            >
              Whether you're an artisan looking to join our community or a collector with a question, our team is here to help.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-12"
            >
              <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-[#C6A75E]/20 shadow-sm">
                <h3 className="text-[#3E2F26] text-2xl font-heading mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#6B1F2B]/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-[#6B1F2B]" />
                    </div>
                    <div>
                      <p className="text-[#3E2F26]/50 text-xs uppercase tracking-widest mb-1 font-bold">Email Us</p>
                      <p className="text-[#3E2F26] text-lg font-medium break-all">shaikh.24bai10046@vitbhopal.ac.in</p>
                      <p className="text-[#3E2F26]/60 text-sm mt-1">Our team typically responds within 24 hours.</p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#6B1F2B]/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-[#6B1F2B]" />
                    </div>
                    <div>
                      <p className="text-[#3E2F26]/50 text-xs uppercase tracking-widest mb-1 font-bold">Call Us</p>
                      <p className="text-[#3E2F26] text-lg font-medium">+91 91318 23271</p>
                      <p className="text-[#3E2F26]/60 text-sm mt-1">Available Mon-Fri, 10am to 6pm IST.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo Card */}
              <div className="relative overflow-hidden rounded-3xl aspect-[16/9] bg-white/40 backdrop-blur-sm border border-[#C6A75E]/20 flex items-center justify-center group p-12">
                <img 
                  src="/LOGO.png" 
                  alt="Rangmanch Logo" 
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3E2F26]/10 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full text-center">
                  <p className="text-[#3E2F26]/80 text-xl font-heading" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Rangmanch: Cultural Preservation</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-[#C6A75E]/10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#3E2F26]/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      <User className="w-3 h-3" /> Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-6 py-4 rounded-2xl bg-[#F5EFE6]/50 border border-[#C6A75E]/20 focus:outline-none focus:ring-2 focus:ring-[#6B1F2B]/20 focus:border-[#6B1F2B] transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#3E2F26]/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-6 py-4 rounded-2xl bg-[#F5EFE6]/50 border border-[#C6A75E]/20 focus:outline-none focus:ring-2 focus:ring-[#6B1F2B]/20 focus:border-[#6B1F2B] transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[#3E2F26]/60 text-xs font-bold uppercase tracking-widest">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="What is this regarding?"
                    className="w-full px-6 py-4 rounded-2xl bg-[#F5EFE6]/50 border border-[#C6A75E]/20 focus:outline-none focus:ring-2 focus:ring-[#6B1F2B]/20 focus:border-[#6B1F2B] transition-all"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[#3E2F26]/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" /> Your Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-6 py-4 rounded-2xl bg-[#F5EFE6]/50 border border-[#C6A75E]/20 focus:outline-none focus:ring-2 focus:ring-[#6B1F2B]/20 focus:border-[#6B1F2B] transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#6B1F2B] text-[#F5EFE6] py-5 rounded-2xl font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#3E2F26] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group shadow-lg shadow-[#6B1F2B]/20"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-green-600 bg-green-50 p-4 rounded-xl"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Message sent successfully! We'll get back to you soon.</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-xl"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Something went wrong. Please try again later.</span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
