'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowRight, User as UserIcon, TrendingUp, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [accountType, setAccountType] = useState('user');
  const [registrationMethod, setRegistrationMethod] = useState('phone'); // 'phone' or 'email'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('info'); // 'info' -> 'details' -> 'otp'
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signInWithPhone, signInWithGoogle, signUpWithEmail, createUserProfile } = useAuth();
  const router = useRouter();

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep('details');
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUpWithEmail(email, password, fullName, accountType);
      router.push('/');
    } catch (err) {
      setError(err.message || 'Failed to sign up with email.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      const result = await signInWithPhone(formattedPhone, 'recaptcha-container');
      setConfirmationResult(result);
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please check the number.');
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

      await createUserProfile(user.uid, user.phoneNumber, accountType, {
        displayName: fullName,
      });

      router.push('/');
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-light flex flex-col lg:flex-row-reverse">
      <div id="recaptcha-container"></div>
      
      <div className="hidden lg:flex w-1/2 p-12 flex-col justify-between relative overflow-hidden bg-neutral-black">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF2F6D] blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 opacity-20"></div>
        
        <Link href="/" className="relative z-10 self-start">
          <div className="relative h-12 w-48 overflow-hidden flex items-center justify-center">
            <h1 className="text-white text-3xl font-black italic tracking-tighter">PUCHO<span className="text-white/50">LIMELIGHT</span></h1>
          </div>
        </Link>
        
        <div className="relative z-10 max-w-md">
          <h1 className="text-6xl font-black text-white mb-8 leading-tight font-display">Empowering Indian Creators.</h1>
          <p className="text-white/80 text-xl leading-relaxed">Join the fastest growing influencer community and transform your social presence into a business.</p>
        </div>
        
        <div className="relative z-10 space-y-6">
           <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
              <h4 className="text-white font-bold mb-2">Total Paid Commission</h4>
              <span className="text-4xl font-black text-[#FF2F6D]">₹15,40,24,000+</span>
           </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center p-8 md:p-24 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-extrabold mb-4 text-neutral-black font-display">Get Started</h2>
            <p className="text-neutral-gray font-medium">Create your account in seconds.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-500 text-sm font-bold border border-red-100">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 'info' && (
              <motion.form 
                key="info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleNextStep}
                className="space-y-6"
              >
                <div className="space-y-2 text-neutral-black">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray mb-4 block ml-1">Register as a...</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'user', icon: UserIcon, label: 'User' },
                      { id: 'seller', icon: ShoppingBag, label: 'Seller' },
                      { id: 'influencer', icon: TrendingUp, label: 'Influencer' }
                    ].map((role) => (
                      <button
                        key={role.id}
                        type="button"
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

                <div className="space-y-2 text-neutral-black">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-gray ml-1">Full Name</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Your Name" 
                    className="w-full px-6 py-5 rounded-2xl bg-white border border-gray-100 outline-none focus:ring-2 ring-[#FF2F6D]/20 text-lg transition-all shadow-sm"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 rounded-3xl font-black text-lg transition-all hover:-translate-y-1 active:scale-95 shadow-2xl flex items-center justify-center gap-3 text-white bg-linear-to-br from-[#FF2F6D] to-[#D4145A]"
                >
                  Continue
                  <ArrowRight size={22} />
                </button>
              </motion.form>
            )}

            {step === 'details' && (
              <motion.div 
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-neutral-black">Sign Up Details</h3>
                  <button type="button" onClick={() => setStep('info')} className="text-xs font-bold text-[#FF2F6D]">Back</button>
                </div>

                <div className="flex p-1 bg-gray-100 rounded-2xl">
                  <button 
                    type="button"
                    onClick={() => setRegistrationMethod('phone')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${registrationMethod === 'phone' ? 'bg-white text-[#FF2F6D] shadow-sm' : 'text-neutral-gray'}`}
                  >
                    Phone
                  </button>
                  <button 
                    type="button"
                    onClick={() => setRegistrationMethod('email')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${registrationMethod === 'email' ? 'bg-white text-[#FF2F6D] shadow-sm' : 'text-neutral-gray'}`}
                  >
                    Email
                  </button>
                </div>

                {registrationMethod === 'phone' ? (
                  <form onSubmit={handleSendOtp} className="space-y-6">
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
                  </form>
                ) : (
                  <form onSubmit={handleEmailSignUp} className="space-y-6">
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
                      {loading ? "Creating Account..." : "Sign Up"}
                      <ArrowRight size={22} />
                    </button>
                  </form>
                )}
              </motion.div>
            )}

            {step === 'otp' && (
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
                    <button type="button" onClick={() => setStep('phone')} className="text-xs font-bold text-[#FF2F6D]">Change Number</button>
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
                  {loading ? "Verifying..." : "Verify & Sign Up"}
                  <CheckCircle2 size={22} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest text-neutral-gray"><span className="bg-neutral-light px-4">Or join with</span></div>
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
            Already have an account? <Link href="/login" className="text-[#FF2F6D] font-bold hover:underline">Login instead</Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
