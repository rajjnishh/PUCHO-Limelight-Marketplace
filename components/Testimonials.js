'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { testimonials } from '../data/testimonials';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-neutral-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-neutral-black font-display">
            Trusted by the Best
          </h2>
          <p className="text-neutral-gray">Join thousands of successful brands and influencers today.</p>
        </div>
      </div>

      <div className="relative w-[100vw] ml-[calc(-50vw+50%)] flex overflow-hidden">
        {/* Gradient fades for the edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-neutral-light to-transparent z-20"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-neutral-light to-transparent z-20"></div>

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="flex gap-8 px-4 w-max"
        >
          {extendedTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-8 md:p-10 rounded-[32px] shadow-[0_8px_32px_rgba(255,47,109,0.05)] border border-gray-100 flex flex-col relative group shrink-0 w-[85vw] sm:w-[400px]"
            >
              <Quote 
                size={80} 
                className="absolute -top-4 -right-4 opacity-[0.03] text-primary transition-transform group-hover:scale-125" 
              />
              
              <p className="text-lg leading-relaxed mb-10 flex-grow italic relative z-10 text-neutral-black whitespace-normal">
                &quot;{t.content}&quot;
              </p>

              <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-gray-50 mt-auto">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary/10 shrink-0">
                  <Image 
                    src={t.image} 
                    alt={t.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-black font-display truncate">{t.name}</h4>
                  <p className="text-xs uppercase tracking-widest font-bold text-primary">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
