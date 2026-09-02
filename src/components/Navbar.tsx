import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronDown, Menu, X, Database, Activity, Sparkles, Clock, LogOut, User } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { useAppStore } from '../stores/appStore';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const totalCartCount = useAppStore((s) => s.totalCartCount);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const setQueryModalOpen = useAppStore((s) => s.setQueryModalOpen);
  const setConsoleOpen = useAppStore((s) => s.setConsoleOpen);
  const setAuthModalOpen = useAppStore((s) => s.setAuthModalOpen);
  const setOrderHistoryOpen = useAppStore((s) => s.setOrderHistoryOpen);
  const user = useAppStore((s) => s.user);
  const { signOut } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close user menu on outside click
  useEffect(() => {
    if (!showUserMenu) return;
    const handler = () => setShowUserMenu(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [showUserMenu]);

  const cartCount = totalCartCount();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#060D09]/85 backdrop-blur-[24px] border-b border-white/[0.06] py-3.5 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] flex items-center justify-between">
      {/* Brand Logo (Left) */}
      <button
        onClick={() => setConsoleOpen(true)}
        className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer text-left"
        aria-label="Open Firebase Console"
      >
        <div className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] rounded-[10px] bg-emerald-500/20 border border-emerald-400/40 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)] group-hover:scale-105 transition-transform">
          {/* Emerald geometric SVG: leaf + relational database node graph */}
          <svg
            className="w-full h-full text-emerald-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L19 7V17L12 22L5 17V7L12 2Z" fill="rgba(34, 197, 94, 0.25)" />
            <circle cx="12" cy="12" r="2.5" fill="#22C55E" />
            <path d="M12 4.5v5M12 14.5v5M6.5 8.5l4 2.5M17.5 8.5l-4 2.5" />
          </svg>
        </div>
        <span className="text-white text-[22px] sm:text-[26px] font-bold tracking-[-0.03em]">
          Verdant <span className="text-[#22C55E]">Core</span>
        </span>
      </button>

      {/* Desktop Center Nav Glass Pill (≥ 1024px) */}
      <nav className="hidden lg:flex h-[52px] px-6 items-center gap-[28px] bg-[rgba(10,20,14,0.4)] rounded-[14px] backdrop-blur-[20px] border border-white/[0.08] shadow-lg">
        <a href="#departments" className="flex items-center gap-1.5 text-white/80 text-[14px] font-medium hover:text-white transition-colors cursor-pointer group">
          <span>Departments</span>
          <ChevronDown className="w-[10px] h-[10px] text-white/60 group-hover:translate-y-0.5 transition-transform" />
        </a>
        <a href="#cold-chain" className="text-white/80 text-[14px] font-medium hover:text-white transition-colors cursor-pointer">
          Cold Chain
        </a>
        <a href="#acid-engine" className="text-white/80 text-[14px] font-medium hover:text-white transition-colors cursor-pointer">
          ACID Engine
        </a>
        <button
          onClick={() => setQueryModalOpen(true)}
          className="text-white/80 text-[14px] font-medium hover:text-emerald-400 transition-colors cursor-pointer"
        >
          Replication Logs &amp; Analysis
        </button>
      </nav>

      {/* Desktop Right Action Pill (≥ 1024px) */}
      <div className="hidden lg:flex h-[52px] p-[3px] bg-[rgba(0,0,0,0.4)] rounded-[14px] backdrop-blur-[20px] border border-white/[0.08] items-center gap-[6px]">
        {/* Search */}
        <SearchBar />

        {/* Cart */}
        <button
          onClick={() => setCartOpen(true)}
          className="h-[46px] px-5 rounded-[11px] text-white text-[14px] font-medium hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer"
          aria-label="View Cart"
        >
          <ShoppingBag className="w-4 h-4 text-emerald-400" />
          <span>Cart ({cartCount})</span>
        </button>

        {/* User / Auth */}
        {user ? (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowUserMenu(!showUserMenu);
              }}
              className="h-[46px] px-3 rounded-[11px] hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer"
              aria-label="User menu"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-7 h-7 rounded-full border border-emerald-400/50"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-emerald-500/30 border border-emerald-400/50 flex items-center justify-center text-[11px] font-bold text-emerald-300">
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
              )}
              <ChevronDown className="w-3 h-3 text-white/40" />
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-[54px] w-[220px] rounded-[14px] bg-[#0A140E]/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl overflow-hidden z-50 animate-fade-down">
                <div className="p-3.5 border-b border-white/[0.08]">
                  <div className="text-white text-[13px] font-semibold truncate">
                    {user.displayName || 'User'}
                  </div>
                  <div className="text-white/40 text-[11px] font-mono truncate">
                    {user.email}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    setOrderHistoryOpen(true);
                  }}
                  className="w-full px-3.5 py-2.5 text-left text-[13px] text-white/80 hover:bg-white/[0.06] flex items-center gap-2 transition-colors"
                >
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Order History</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    signOut();
                  }}
                  className="w-full px-3.5 py-2.5 text-left text-[13px] text-red-300/80 hover:bg-white/[0.06] flex items-center gap-2 transition-colors border-t border-white/[0.06]"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setAuthModalOpen(true)}
            className="h-[46px] px-6 bg-[#22C55E] rounded-[11px] text-[#05210E] text-[14px] font-semibold hover:bg-[#16A34A] transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <User className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        )}
      </div>

      {/* Mobile Hamburger Button (< 1024px) */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden w-[44px] h-[44px] flex items-center justify-center rounded-[12px] bg-[rgba(10,20,14,0.5)] backdrop-blur-[20px] border border-white/[0.08] text-white hover:bg-white/10 transition-colors"
        aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
      >
        {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5 text-white" />}
      </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[76px] z-40 bg-[#060D09]/95 backdrop-blur-[28px] border-t border-white/[0.08] p-6 flex flex-col justify-between overflow-y-auto animate-fade-down">
          <div className="space-y-6">
            {/* Mobile Search */}
            <SearchBar mobile />

            {/* User Info (Mobile) */}
            {user && (
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-3">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-9 h-9 rounded-full border border-emerald-400/50" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-emerald-500/30 border border-emerald-400/50 flex items-center justify-center text-[13px] font-bold text-emerald-300">
                    {(user.displayName || 'U')[0].toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-white text-[14px] font-semibold truncate">{user.displayName}</div>
                  <div className="text-white/40 text-[11px] font-mono truncate">{user.email}</div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400/80">
                Navigation
              </span>
              <div className="flex flex-col gap-3 text-[18px] font-medium text-white/90">
                <a
                  href="#departments"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:bg-white/[0.08]"
                >
                  <span>Departments &amp; Harvests</span>
                  <ChevronDown className="w-4 h-4 -rotate-90 text-white/40" />
                </a>
                <a
                  href="#cold-chain"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:bg-white/[0.08]"
                >
                  <span>Cold Chain Telemetry</span>
                  <Activity className="w-4 h-4 text-emerald-400" />
                </a>
                <a
                  href="#acid-engine"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:bg-white/[0.08]"
                >
                  <span>ACID Engine &amp; 2PC</span>
                  <Database className="w-4 h-4 text-emerald-400" />
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setQueryModalOpen(true);
                  }}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:bg-white/[0.08] text-left"
                >
                  <span>Replication Logs &amp; DB Workbench</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </button>
                {user && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setOrderHistoryOpen(true);
                    }}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:bg-white/[0.08] text-left"
                  >
                    <span>Order History</span>
                    <Clock className="w-4 h-4 text-emerald-400" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Full-width Mobile CTAs */}
          <div className="space-y-3 pt-6 border-t border-white/[0.08]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCartOpen(true);
              }}
              className="w-full h-[50px] rounded-[14px] bg-white/[0.08] hover:bg-white/15 border border-white/10 text-white text-[15px] font-medium flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span>Review Cart ({cartCount} Items)</span>
            </button>

            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut();
                }}
                className="w-full h-[50px] rounded-[14px] bg-red-500/10 border border-red-500/20 text-red-300 text-[15px] font-medium flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalOpen(true);
                }}
                className="w-full h-[52px] bg-[#22C55E] hover:bg-[#16A34A] rounded-[14px] text-[#05210E] text-[16px] font-bold shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Sign In to Order</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
