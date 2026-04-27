'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Settings, User, Instagram, Youtube, Twitter, CreditCard } from 'lucide-react';

export default function InfluencerSettings() {
  return (
    <DashboardLayout type="influencer">
      <div className="max-w-4xl mx-auto pb-20">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-neutral-black tracking-tight font-display text-nowrap">Creator Settings</h1>
          <p className="text-neutral-gray font-medium">Manage your public profile and social integrations.</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-8 text-neutral-black flex items-center gap-3">
              <Instagram size={20} className="text-primary" />
              Social Connections
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-light border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-black">Instagram</div>
                    <div className="text-xs text-neutral-gray">Connected as @rahul_s</div>
                  </div>
                </div>
                <button className="text-xs font-bold text-red-500">Disconnect</button>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-light border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                    <Youtube size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-black">YouTube</div>
                    <div className="text-xs text-neutral-gray">Not connected</div>
                  </div>
                </div>
                <button className="text-xs font-bold text-primary">Connect</button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-8 text-neutral-black flex items-center gap-3">
              <CreditCard size={20} className="text-accent" />
              Earnings Setup
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2 text-neutral-black">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">UPI ID for Payouts</label>
                <input type="text" defaultValue="rahuls@okaxis" className="w-full p-4 rounded-2xl bg-neutral-light border border-gray-100 font-bold" />
              </div>
            </div>
            <button className="mt-8 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20">Update Payout Info</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
