'use client';

import React from 'react';
import { motion } from 'motion/react';
import { DollarSign, ArrowUpRight } from 'lucide-react';

const EarningsTicker = () => {
  const earnings = [
    { name: "Priya S.", amount: "₹45,200", action: "earned commission" },
    { name: "Arjun R.", amount: "₹12,400", action: "new brand deal" },
    { name: "Ananya B.", amount: "₹89,000", action: "monthly payout" },
    { name: "Rahul F.", amount: "₹5,600", action: "product sale" },
    { name: "Sneha V.", amount: "₹22,100", action: "earned commission" },
    { name: "Vikram S.", amount: "₹34,500", action: "earned commission" },
  ];

  const duplicatedEarnings = [...earnings, ...earnings];

  return (
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="w-full overflow-hidden py-10 bg-neutral-black"
    >
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -50 * duplicatedEarnings.length + "%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 120,
              ease: "linear",
            },
          }}
          className="flex gap-8 px-4"
        >
          {duplicatedEarnings.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/20 border border-primary/30 text-primary">
                <DollarSign size={18} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{item.name}</span>
                  <span className="text-white/40 text-[10px] uppercase font-bold tracking-tight">{item.action}</span>
                </div>
                <div className="flex items-center gap-1 text-primary-dark">
                  <span className="text-lg font-black tracking-tight">{item.amount}</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EarningsTicker;
