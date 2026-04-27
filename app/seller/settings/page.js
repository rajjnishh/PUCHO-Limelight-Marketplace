'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Settings, User, Bell, Shield, CreditCard } from 'lucide-react';

export default function SellerSettings() {
  return (
    <DashboardLayout type="seller">
      <div className="max-w-4xl mx-auto pb-20">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-neutral-black tracking-tight font-display text-nowrap">Store Settings</h1>
          <p className="text-neutral-gray font-medium">Configure your business profile and preferences.</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-8 text-neutral-black flex items-center gap-3">
              <User size={20} className="text-primary" />
              Business Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-neutral-black">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Store Name</label>
                <input type="text" defaultValue="Puchol Lifestyle" className="w-full p-4 rounded-2xl bg-neutral-light border border-gray-100 font-bold" />
              </div>
              <div className="space-y-2 text-neutral-black">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Support Email</label>
                <input type="email" defaultValue="support@puchol.in" className="w-full p-4 rounded-2xl bg-neutral-light border border-gray-100 font-bold" />
              </div>
            </div>
            <button className="mt-8 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20">Save Changes</button>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-8 text-neutral-black flex items-center gap-3">
              <CreditCard size={20} className="text-accent" />
              Payout Information
            </h3>
            <p className="text-neutral-gray text-sm mb-6 font-medium">Connect your bank account to receive automated weekly payouts.</p>
            <div className="p-6 rounded-3xl bg-neutral-light border border-dashed border-gray-300 flex items-center justify-center">
              <button className="text-accent font-black text-sm uppercase tracking-widest">+ Connect Bank Account</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
