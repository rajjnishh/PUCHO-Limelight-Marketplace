'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, TrendingUp, ArrowRight, Instagram } from 'lucide-react';
import { motion } from 'motion/react';

const InfluencerCard = ({ influencer }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(255,47,109,0.06)] border border-gray-100/50 flex flex-col h-full"
    >
      <div className="relative h-32 w-full overflow-hidden shrink-0 bg-gray-100">
        <img 
          src={influencer.banner} 
          alt={`${influencer.name} banner`}
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Avatar & Info */}
      <div className="px-6 pb-6 relative flex flex-col flex-grow">
        <div className="relative -mt-12 mb-4 flex justify-between items-end">
          <div className="w-24 h-24 rounded-3xl border-4 border-white overflow-hidden shadow-xl bg-gray-100 relative">
            <img 
              src={influencer.image} 
              alt={influencer.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {influencer.instagram && (
            <a 
              href={influencer.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 mb-2 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full shadow-md transition-transform hover:scale-110 active:scale-95"
            >
              <Instagram size={18} />
            </a>
          )}
        </div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-neutral-black font-display">{influencer.name}</h3>
            <p className="text-sm font-medium text-primary">@{influencer.handle}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-light text-neutral-gray border border-gray-100 whitespace-nowrap">
            {influencer.category}
          </span>
        </div>

        <p className="text-sm line-clamp-2 mb-6 text-neutral-gray flex-grow">
          {influencer.bio}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 shrink-0">
          <div className="p-4 rounded-2xl bg-neutral-light border border-gray-100 flex flex-col items-center">
            <Users size={16} className="text-primary mb-2" />
            <span className="text-lg font-bold">{influencer.followers}</span>
            <span className="text-[10px] font-medium uppercase opacity-50 tracking-wider">Followers</span>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-light border border-gray-100 flex flex-col items-center text-center">
            <TrendingUp size={16} className="text-primary-dark mb-2" />
            <span className="text-lg font-bold">{influencer.earnings}</span>
            <span className="text-[10px] font-medium uppercase opacity-50 tracking-wider">Earnings</span>
          </div>
        </div>

        <Link 
          href={`/influencers/${influencer.handle}`}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold transition-all hover:gap-4 group text-white bg-linear-to-br from-primary to-primary-dark mt-auto shrink-0"
        >
          View Storefront
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default InfluencerCard;
