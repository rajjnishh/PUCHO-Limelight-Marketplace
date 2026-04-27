'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { User, Bell, Shield, MapPin } from 'lucide-react';

export default function UserSettings() {
  return (
    <DashboardLayout type="user">
      <div className="max-w-4xl mx-auto pb-20">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-neutral-black tracking-tight font-display">Profile Settings</h1>
          <p className="text-neutral-gray font-medium">Manage your shipping addresses and notifications.</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-8 text-neutral-black flex items-center gap-3">
              <User size={20} className="text-primary" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-neutral-black">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Full Name</label>
                <input type="text" defaultValue="John Doe" className="w-full p-4 rounded-2xl bg-neutral-light border border-gray-100 font-bold" />
              </div>
              <div className="space-y-2 text-neutral-black">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Email</label>
                <input type="email" defaultValue="john.doe@example.com" className="w-full p-4 rounded-2xl bg-neutral-light border border-gray-100 font-bold" />
              </div>
            </div>
            <button className="mt-8 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20">Update Profile</button>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-8 text-neutral-black flex items-center gap-3">
              <MapPin size={20} className="text-secondary" />
              Saved Addresses
            </h3>
            <div className="p-6 rounded-3xl bg-neutral-light border border-gray-100 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-neutral-black">Home Address</div>
                <div className="text-xs text-neutral-gray">123, Sector 5, HSR Layout, Bangalore - 560102</div>
              </div>
              <button className="text-xs font-bold text-primary">Edit</button>
            </div>
            <button className="mt-6 text-sm font-bold text-primary">+ Add New Address</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
