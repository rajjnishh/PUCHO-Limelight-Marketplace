'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowRight, TrendingUp, ShoppingBag, User as UserIcon, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [accountType, setAccountType] = useState('user');
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'email'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signInWithPhone, signInWithGoogle, signInWithEmail, createUserProfile } = useAuth();
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmail(email, password);
      router.push('/');
    } catch (err) {
      setError(err.message || 'Failed to login with email.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Ensure phone number has country code (default to +91 for India if not present)
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      const result = await signInWithPhone(formattedPhone, 'recaptcha-container');
      setConfirmationResult(result);
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please check the number.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Check if user has a profile, if not create one with selected role
      // In AuthContext, update fetchProfile logic to handle new users
      // For now, we try to create/update profile
      await createUserProfile(user.uid, user.phoneNumber, accountType, {
        displayName: user.displayName || 'New User',
      });

      router.push('/');
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-light flex flex-col lg:flex-row">
      <div id="recaptcha-container"></div>
      
      <div className="hidden lg:flex w-1/2 p-12 flex-col justify-between relative overflow-hidden bg-linear-to-br from-[#FF2F6D] to-[#D4145A]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <Link href="/" className="relative z-10 self-start">
          <div className="relative h-12 w-48 overflow-hidden flex items-center justify-center">
            <h1 className="text-white text-3xl font-black italic tracking-tighter">PUCHO<span className="text-white/50">LIMELIGHT</span></h1>
          </div>
        </Link>
        
        <div className="relative z-10 max-w-md">
          <h1 className="text-6xl font-black text-white mb-8 leading-tight font-display">Shop through the eyes of creators.</h1>
          <p className="text-white/80 text-xl leading-relaxed">Login to access your personalized marketplace and exclusive creator deals.</p>
        </div>
        
        <div className="relative z-10 flex items-center gap-6">
           <div className="flex -space-x-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="relative w-12 h-12 rounded-full border-4 border-[#D4145A] bg-gray-200 overflow-hidden shadow-lg">
                 <img 
                   src={`https://picsum.photos/seed/user${i}/100/100`} 
                   alt="user" 
                   className="w-full h-full object-cover" 
                   referrerPolicy="no-referrer"
                 />
               </div>
             ))}
           </div>
           <p className="text-white/70 text-sm font-bold uppercase tracking-widest">Join 100K+ shopaholics</p>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center p-8 md:p-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2F6D]/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4145A]/5 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2 text-white"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-extrabold mb-4 text-neutral-black font-display">Welcome Back</h2>
            <p className="text-neutral-gray font-medium">India&apos;s first influencer-led marketplace.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-500 text-sm font-bold border border-red-100">
              {error}
            </div>
          )}

          {/* Account Type Selection */}
          <div className="mb-10 text-neutral-black">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray mb-4 block ml-1">I am a...</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'user', icon: UserIcon, label: 'User' },
                { id: 'seller', icon: ShoppingBag, label: 'Seller' },
                { id: 'influencer', icon: TrendingUp, label: 'Influencer' }
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => setAccountType(role.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 ${
                    accountType === role.id 
                    ? 'border-[#FF2F6D] bg-[#FF2F6D]/5 text-[#FF2F6D]' 
                    : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                  }`}
                >
                  <role.icon size={20} />
                  <span className="text-xs font-bold">{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {loginMethod === 'phone' ? (
              step === 'phone' ? (
                <motion.form 
                  key="phone"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSendOtp} 
                  className="space-y-6"
                >
                  <div className="flex p-1 bg-gray-100 rounded-2xl mb-6">
                    <button 
                      type="button"
                      onClick={() => setLoginMethod('phone')}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${loginMethod === 'phone' ? 'bg-white text-[#FF2F6D] shadow-sm' : 'text-neutral-gray'}`}
                    >
                      Phone
                    </button>
                    <button 
                      type="button"
                      onClick={() => setLoginMethod('email')}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${loginMethod === 'email' ? 'bg-white text-[#FF2F6D] shadow-sm' : 'text-neutral-gray'}`}
                    >
                      Email
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-gray" size={20} />
                      <input 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        placeholder="98765 43210" 
                        className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-2 ring-[#FF2F6D]/20 text-lg transition-all shadow-sm text-neutral-black"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full py-5 rounded-3xl font-black text-lg transition-all hover:-translate-y-1 active:scale-95 shadow-2xl flex items-center justify-center gap-3 text-white bg-linear-to-br from-[#FF2F6D] to-[#D4145A] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                    <ArrowRight size={22} />
                  </button>
                </motion.form>
              ) : (
                <motion.form 
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleVerifyOtp} 
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Verification Code</label>
                      <button 
                        type="button" 
                        onClick={() => setStep('phone')}
                        className="text-xs font-bold text-[#FF2F6D] hover:underline"
                      >
                        Change Number
                      </button>
                    </div>
                    <input 
                      type="text" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength={6}
                      placeholder="Enter 6-digit OTP" 
                      className="w-full px-6 py-5 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-2 ring-[#FF2F6D]/20 text-center text-2xl font-black tracking-[0.5em] transition-all shadow-sm text-neutral-black"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full py-5 rounded-3xl font-black text-lg transition-all hover:-translate-y-1 active:scale-95 shadow-2xl flex items-center justify-center gap-3 text-white bg-linear-to-br from-[#FF2F6D] to-[#D4145A] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? "Verifying..." : "Verify & Continue"}
                    <CheckCircle2 size={22} />
                  </button>
                </motion.form>
              )
            ) : (
              <motion.form 
                key="email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleEmailLogin} 
                className="space-y-6"
              >
                <div className="flex p-1 bg-gray-100 rounded-2xl mb-6">
                  <button 
                    type="button"
                    onClick={() => setLoginMethod('phone')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${loginMethod === 'phone' ? 'bg-white text-[#FF2F6D] shadow-sm' : 'text-neutral-gray'}`}
                  >
                    Phone
                  </button>
                  <button 
                    type="button"
                    onClick={() => setLoginMethod('email')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${loginMethod === 'email' ? 'bg-white text-[#FF2F6D] shadow-sm' : 'text-neutral-gray'}`}
                  >
                    Email
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@example.com" 
                      className="w-full px-6 py-5 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-2 ring-[#FF2F6D]/20 text-lg transition-all shadow-sm text-neutral-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Password</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••" 
                      className="w-full px-6 py-5 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-2 ring-[#FF2F6D]/20 text-lg transition-all shadow-sm text-neutral-black"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 rounded-3xl font-black text-lg transition-all hover:-translate-y-1 active:scale-95 shadow-2xl flex items-center justify-center gap-3 text-white bg-linear-to-br from-[#FF2F6D] to-[#D4145A] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? "Logging in..." : "Login"}
                  <ArrowRight size={22} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest text-neutral-gray"><span className="bg-neutral-light px-4">Or sign in with</span></div>
          </div>

          <div className="mt-8">
            <button 
              onClick={async () => {
                setError('');
                setLoading(true);
                try {
                  await signInWithGoogle(accountType);
                  router.push('/');
                } catch (err) {
                  setError(err.message);
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white border border-gray-100 font-bold hover:bg-gray-50 transition-all shadow-sm text-neutral-black"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
          </div>

          <p className="mt-12 text-center text-neutral-gray font-medium">
            By continuing, you agree to our <Link href="#" className="font-bold underline text-neutral-black">Terms</Link> & <Link href="#" className="font-bold underline text-neutral-black">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
