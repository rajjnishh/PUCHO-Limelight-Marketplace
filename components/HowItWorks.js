import React from 'react';
import { Search, Share2, Wallet, Users } from 'lucide-react';
import { motion } from 'motion/react';

const HowItWorks = () => {
  const steps = [
    {
      title: "Brands List",
      desc: "Sellers list products and set a custom commission percentage for creators.",
      icon: <Users size={32} className="text-primary" />,
      color: "bg-primary/5"
    },
    {
      title: "Creators Share",
      desc: "Influencers generate unique affiliate links and promote them on social media.",
      icon: <Share2 size={32} className="text-secondary" />,
      color: "bg-secondary/5"
    },
    {
      title: "Shoppers Buy",
      desc: "Customers discover and purchase products via trusted influencer recommendations.",
      icon: <Search size={32} className="text-accent" />,
      color: "bg-accent/5"
    },
    {
      title: "Auto Payouts",
      desc: "Our system attributes the sale, pays the influencer, and handles the rest.",
      icon: <Wallet size={32} className="text-accent" />,
      color: "bg-accent/5"
    }
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-neutral-black font-display tracking-tight">
            The Limelight <span className="text-primary">Ecosystem</span>
          </h2>
          <p className="text-neutral-gray max-w-2xl mx-auto font-medium text-lg">
            A seamless bridge connecting visionary brands, creative influencers, and discerning shoppers in a high-performance sales cycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector Arrows (Desktop) - Precisely Centered Between Icons */}
          <div className="hidden lg:block absolute top-0 left-0 w-full h-20 pointer-events-none z-0">
            <svg width="100%" height="100%" viewBox="0 0 1000 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Arrow 1-2 (Midpoint 250) */}
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                d="M 165 40 Q 250 5 335 40" 
                stroke="#FF2F6D" 
                strokeWidth="3" 
                strokeDasharray="4 4" 
                fill="none" 
              />
              <motion.path 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.0 }}
                viewport={{ once: true }}
                d="M 327 35 L 335 40 L 327 45" 
                stroke="#FF2F6D" 
                strokeWidth="3" 
                fill="none" 
              />
              
              {/* Arrow 2-3 (Midpoint 500) */}
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                d="M 415 40 Q 500 75 585 40" 
                stroke="#FF2F6D" 
                strokeWidth="3" 
                strokeDasharray="4 4" 
                fill="none" 
              />
              <motion.path 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.2 }}
                viewport={{ once: true }}
                d="M 577 35 L 585 40 L 577 45" 
                stroke="#FF2F6D" 
                strokeWidth="3" 
                fill="none" 
              />
              
              {/* Arrow 3-4 (Midpoint 750) */}
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                d="M 665 40 Q 750 5 835 40" 
                stroke="#FF2F6D" 
                strokeWidth="3" 
                strokeDasharray="4 4" 
                fill="none" 
              />
              <motion.path 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.4 }}
                viewport={{ once: true }}
                d="M 827 35 L 835 40 L 827 45" 
                stroke="#FF2F6D" 
                strokeWidth="3" 
                fill="none" 
              />
            </svg>
          </div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
              <div 
                className={`w-20 h-20 rounded-[28px] flex items-center justify-center mb-8 shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-6 border border-gray-100 ${step.color}`} 
              >
                {step.icon}
              </div>
              <div className="bg-white px-2">
                 <h3 className="text-2xl font-bold mb-4 text-neutral-black font-display">
                  {step.title}
                </h3>
                <p className="text-neutral-gray leading-relaxed font-medium text-sm">
                  {step.desc}
                </p>
              </div>
              <div 
                className="mt-8 w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 border-gray-100 bg-neutral-light text-neutral-black"
              >
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
