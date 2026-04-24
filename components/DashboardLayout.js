'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DashboardLayout({ children, type = 'seller' }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const sellerLinks = [
    { href: '/seller/dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { href: '/seller/products', label: 'My Products', icon: <ShoppingBag size={20} /> },
    { href: '/seller/analytics', label: 'Sales Data', icon: <TrendingUp size={20} /> },
    { href: '/seller/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const influencerLinks = [
    { href: '/influencer/dashboard', label: 'Earnings', icon: <DollarSign size={20} /> },
    { href: '/influencer/marketplace', label: 'Marketplace', icon: <ShoppingBag size={20} /> },
    { href: '/influencer/links', label: 'Affiliate Links', icon: <TrendingUp size={20} /> },
    { href: '/influencer/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const links = type === 'seller' ? sellerLinks : influencerLinks;

  return (
    <div className="min-h-screen bg-neutral-light flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-neutral-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-gray-200 z-50 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-8 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-40 overflow-hidden flex items-center justify-center">
                <Image 
                  src="/logo.jpeg" 
                  alt="Puchol Limelight Logo" 
                  fill 
                  className="object-contain object-left"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>
            <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X size={24} className="text-neutral-black" />
            </button>
          </div>

          <nav className="flex-grow px-4 space-y-2 py-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-gray mb-4 px-4 opacity-50">
              Menu
            </div>
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all
                    ${isActive 
                      ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                      : 'text-neutral-gray hover:bg-gray-50 hover:text-neutral-black'}
                  `}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button className="flex items-center gap-4 px-5 py-4 w-full rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-colors">
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} className="text-neutral-black" />
            </button>
            <Link href="/" className="relative h-8 w-32 overflow-hidden flex items-center justify-center">
              <Image 
                src="/logo.jpeg" 
                alt="Puchol Limelight Logo" 
                fill 
                className="object-contain object-left"
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-4 bg-gray-50 px-6 py-2 rounded-2xl border border-gray-100 w-96 max-w-md">
            <Search size={18} className="text-neutral-gray" />
            <input 
              type="text" 
              placeholder="Search data, products..." 
              className="bg-transparent outline-none w-full text-sm font-medium"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button className="relative p-2 text-neutral-gray hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 sm:gap-4 pl-3 sm:pl-6 border-l border-gray-100">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-bold text-neutral-black">Rahul Sharma</div>
                <div className="text-[10px] font-bold text-neutral-gray uppercase tracking-widest">{type}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center font-bold text-primary">
                RS
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-8 hide-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
