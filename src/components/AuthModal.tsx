import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  Zap,
  Leaf
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAppStore } from '../stores/appStore';

export const AuthModal: React.FC = () => {
  const { 
    signInWithGoogle, 
    signUpWithEmail, 
    signInWithEmail, 
    signInAsGuest, 
    authError, 
    setAuthError, 
    loading 
  } = useAuth();

  const isOpen = useAppStore((s) => s.isAuthModalOpen);
  const setOpen = useAppStore((s) => s.setAuthModalOpen);
  const user = useAppStore((s) => s.user);

  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [localValidation, setLocalValidation] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, setOpen]);

  // Reset fields when opening modal or changing mode
  useEffect(() => {
    if (isOpen) {
      setLocalValidation(null);
      setAuthError(null);
    }
  }, [isOpen, mode, setAuthError]);

  if (!isOpen || user) return null;

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-white/10' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 25, label: 'Weak', color: 'bg-red-500' };
      case 2:
        return { score: 50, label: 'Fair', color: 'bg-amber-500' };
      case 3:
        return { score: 75, label: 'Good', color: 'bg-emerald-400' };
      case 4:
        return { score: 100, label: 'Strong', color: 'bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]' };
      default:
        return { score: 10, label: 'Very Weak', color: 'bg-red-400' };
    }
  };

  const strength = getPasswordStrength(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalValidation(null);
    setAuthError(null);

    if (mode === 'signup') {
      if (!name.trim()) {
        setLocalValidation('Please enter your full name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setLocalValidation('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setLocalValidation('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setLocalValidation('Passwords do not match. Please verify your password confirmation.');
        return;
      }
      if (!agreeTerms) {
        setLocalValidation('Please accept the Terms of Service and Sustainable Harvest Pledge.');
        return;
      }

      const success = await signUpWithEmail(name, email, password);
      if (success) {
        setOpen(false);
      }
    } else {
      if (!email.trim() || !email.includes('@')) {
        setLocalValidation('Please enter your email address.');
        return;
      }
      if (!password) {
        setLocalValidation('Please enter your password.');
        return;
      }

      const success = await signInWithEmail(email, password);
      if (success) {
        setOpen(false);
      }
    }
  };

  const handleGoogleAuth = async () => {
    const success = await signInWithGoogle();
    if (success) setOpen(false);
  };

  const handleGuestDemo = async () => {
    const success = await signInAsGuest();
    if (success) setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dark Ambient Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-[#040805]/85 backdrop-blur-[24px] transition-opacity"
      />

      {/* Main Container Card */}
      <div className="relative w-full max-w-[1020px] bg-[#07110A]/95 backdrop-blur-[36px] border border-emerald-500/30 rounded-[28px] sm:rounded-[36px] shadow-[0_32px_96px_rgba(0,0,0,0.9)] z-10 animate-fade-scale overflow-hidden my-auto grid grid-cols-1 lg:grid-cols-12 text-white">
        
        {/* Left Side: Brand Story & Real-Time Telemetry (Desktop ≥ 1024px) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#0A1A10] via-[#07140C] to-[#040C07] p-8 xl:p-10 flex-col justify-between border-r border-white/[0.08] relative overflow-hidden">
          {/* Subtle green ambient lighting orb */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/15 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-emerald-600/10 blur-[80px] pointer-events-none" />

          {/* Top Brand Pill */}
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[12px] font-mono">
              <Leaf className="w-3.5 h-3.5" />
              <span>Verdant Core &bull; Distributed Cloud</span>
            </div>

            <div>
              <h2 className="text-[28px] xl:text-[32px] font-extrabold text-white tracking-tight leading-snug">
                Zero Stale Groceries. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-500">
                  Guaranteed by Consensus.
                </span>
              </h2>
              <p className="text-white/65 text-[14px] leading-relaxed mt-3">
                Join over 14,800+ households receiving hyper-fresh, local organic produce tracked by active-active shard telemetry.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 flex-shrink-0 mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-[13px]">Real-Time Cold Chain</h4>
                  <p className="text-white/50 text-[11px] leading-tight mt-0.5">
                    Micro-temperature telemetry (1.8°C – 3.8°C) guaranteed from farm to door.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-[13px]">Two-Phase Commit Locking</h4>
                  <p className="text-white/50 text-[11px] leading-tight mt-0.5">
                    Zero stock collision across 16 multi-region database shard partitions.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-[13px]">120-Minute Harvest Dispatch</h4>
                  <p className="text-white/50 text-[11px] leading-tight mt-0.5">
                    Picked fresh at dawn from certified organic soil in California.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Live Shard Status Indicator */}
          <div className="relative z-10 pt-6 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-semibold">nam5 Quorum Active</span>
            </div>
            <span>3/3 Synced</span>
          </div>
        </div>

        {/* Right Side: Sign Up / Sign In Form */}
        <div className="col-span-1 lg:col-span-7 p-6 sm:p-9 xl:p-10 flex flex-col justify-between relative">
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            {/* Header & Mode Switcher */}
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-[12px] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{mode === 'signup' ? 'Member Registration' : 'Account Access'}</span>
              </div>
              <h3 className="text-[26px] sm:text-[30px] font-extrabold text-white tracking-tight">
                {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
              </h3>
              <p className="text-white/50 text-[13px] mt-1">
                {mode === 'signup' 
                  ? 'Access live 2PC ordering, transactional telemetry & farm dispatch.' 
                  : 'Enter your credentials to manage your harvest orders.'}
              </p>
            </div>

            {/* Segmented Mode Toggle */}
            <div className="p-1 rounded-2xl bg-black/40 border border-white/[0.08] grid grid-cols-2 gap-1 text-[13px] font-semibold">
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`py-2.5 rounded-xl transition-all ${
                  mode === 'signup'
                    ? 'bg-emerald-500 text-[#05210E] font-bold shadow-md shadow-emerald-500/25 scale-[1.01]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Sign Up (New Member)
              </button>
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`py-2.5 rounded-xl transition-all ${
                  mode === 'signin'
                    ? 'bg-emerald-500 text-[#05210E] font-bold shadow-md shadow-emerald-500/25 scale-[1.01]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Sign In
              </button>
            </div>

            {/* 1-Click Social & Guest Auth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="h-[46px] px-4 rounded-[14px] bg-white hover:bg-gray-100 text-[#1f1f1f] text-[13px] font-semibold flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.98] cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleGuestDemo}
                disabled={loading}
                className="h-[46px] px-4 rounded-[14px] bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 hover:text-emerald-200 text-[13px] font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Demo Access</span>
              </button>
            </div>

            {/* Subtle Divider */}
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-white/[0.08]" />
              <span className="absolute px-3 bg-[#07110A] text-[11px] font-mono text-white/40 uppercase">
                or with email
              </span>
            </div>

            {/* Error Notifications */}
            {(authError || localValidation) && (
              <div className="p-3.5 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-200 text-[12px] flex items-start gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="flex-1 leading-snug">{authError || localValidation}</span>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name (Sign Up only) */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-[11px] font-mono text-white/60 mb-1">
                    Full Legal Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Lin"
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 text-[13px] focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-[11px] font-mono text-white/60 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 text-[13px] focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono text-white/60">
                    Password
                  </label>
                  {mode === 'signup' && password && (
                    <span className="text-[10px] font-mono text-emerald-400">
                      Strength: {strength.label}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === 'signup' ? 'Min 6 characters' : 'Your password'}
                    className="w-full h-11 pl-10 pr-10 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 text-[13px] focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password strength visual bar (Sign Up only) */}
                {mode === 'signup' && password.length > 0 && (
                  <div className="mt-1.5 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${strength.color}`} 
                      style={{ width: `${strength.score}%` }} 
                    />
                  </div>
                )}
              </div>

              {/* Confirm Password (Sign Up only) */}
              {mode === 'signup' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono text-white/60">
                      Confirm Password
                    </label>
                    {confirmPassword && (
                      <span className={`text-[10px] font-mono flex items-center gap-1 ${
                        passwordsMatch ? 'text-emerald-400 font-bold' : 'text-red-400'
                      }`}>
                        {passwordsMatch ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Match</span>
                          </>
                        ) : (
                          'Mismatch'
                        )}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 text-[13px] focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Terms Checkbox (Sign Up only) */}
              {mode === 'signup' && (
                <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded bg-black/50 border-white/20 text-emerald-500 focus:ring-0 focus:outline-none accent-emerald-500 cursor-pointer"
                  />
                  <span className="text-[11px] text-white/60 leading-tight">
                    I agree to Verdant Core&rsquo;s{' '}
                    <span className="text-emerald-400 underline">Terms of Service</span> and pledge support for local organic agriculture.
                  </span>
                </label>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-[#05210E] font-extrabold text-[15px] rounded-xl flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(34,197,94,0.35)] transition-all active:scale-[0.99] cursor-pointer mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{mode === 'signup' ? 'Creating Account...' : 'Authenticating...'}</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'signup' ? 'Create My Account' : 'Sign In to Verdant Core'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Security Badges */}
          <div className="pt-6 border-t border-white/[0.08] mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-2">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Firebase AES-256 Auth Shield</span>
            </div>
            <span>Zero Third-Party Tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
};
