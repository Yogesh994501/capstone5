import React from 'react';
import { X, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAppStore } from '../stores/appStore';

export const AuthModal: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const isOpen = useAppStore((s) => s.isAuthModalOpen);
  const setOpen = useAppStore((s) => s.setAuthModalOpen);
  const user = useAppStore((s) => s.user);

  // Close on Escape key
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, setOpen]);

  if (!isOpen || user) return null;

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal */}
      <div className="relative w-full max-w-[420px] bg-[#09130D]/95 backdrop-blur-3xl border border-emerald-500/30 rounded-[28px] p-8 shadow-[0_24px_64px_rgba(0,0,0,0.8)] z-10 animate-fade-scale text-white space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
              <LogIn className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-[20px] font-bold text-white">Sign In</h3>
              <p className="text-white/50 text-[12px] font-mono">
                Authenticate to access full ADBMS features
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close sign-in modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Features requiring auth */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-2">
          <div className="text-[11px] uppercase font-mono text-white/50 tracking-wider">
            Authentication unlocks
          </div>
          <ul className="text-[13px] text-white/70 space-y-1.5">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Distributed 2PC Checkout with order persistence
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              DB Workbench — seed data & execute mutations
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Order history & transaction audit trail
            </li>
          </ul>
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full h-[52px] rounded-[14px] bg-white hover:bg-gray-100 text-[#1f1f1f] text-[15px] font-semibold flex items-center justify-center gap-3 transition-all active:scale-[0.99] shadow-lg cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
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

        {/* Skip option */}
        <button
          onClick={() => setOpen(false)}
          className="w-full text-center text-[13px] text-white/40 hover:text-white/60 transition-colors"
        >
          Continue browsing without signing in
        </button>
      </div>
    </div>
  );
};
