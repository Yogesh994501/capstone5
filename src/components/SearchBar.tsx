import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useAppStore } from '../stores/appStore';

export const SearchBar: React.FC<{ mobile?: boolean }> = ({ mobile = false }) => {
  const searchQuery = useAppStore((s) => s.searchQuery);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ctrl+K to focus search (desktop only)
  useEffect(() => {
    if (mobile) return;
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobile]);

  if (mobile) {
    return (
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products, SKUs..."
          className="w-full h-10 pl-9 pr-9 rounded-xl bg-white/[0.06] border border-white/[0.1] text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 font-mono transition-all"
          aria-label="Search products"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-md flex items-center justify-center text-white/40 hover:text-white"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 group-focus-within:text-emerald-400 transition-colors" />
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search... ⌘K"
        className="h-[38px] w-[180px] focus:w-[260px] pl-8 pr-8 rounded-[10px] bg-white/[0.06] border border-white/[0.1] text-[12px] text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 font-mono transition-all duration-300"
        aria-label="Search products"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-md flex items-center justify-center text-white/40 hover:text-white"
          aria-label="Clear search"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
