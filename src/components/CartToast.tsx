import React, { useEffect } from 'react';
import { ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../stores/appStore';

export const CartToast: React.FC = () => {
  const toastMessage = useAppStore((s) => s.toastMessage);
  const setToastMessage = useAppStore((s) => s.setToastMessage);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const totalCartCount = useAppStore((s) => s.totalCartCount);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage, setToastMessage]);

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 right-6 z-50 animate-fade-down">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#09150E]/95 backdrop-blur-2xl border border-emerald-500/40 shadow-[0_16px_40px_rgba(0,0,0,0.6)] text-white">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>

        <div className="text-left font-mono pr-1">
          <div className="text-[13px] font-semibold text-white truncate max-w-[220px]">
            {toastMessage}
          </div>
          <div className="text-[11px] text-emerald-300">
            {totalCartCount()} total item{totalCartCount() !== 1 ? 's' : ''} in cart
          </div>
        </div>

        <button
          onClick={() => {
            setToastMessage(null);
            setCartOpen(true);
          }}
          className="h-8 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#05210E] text-[12px] font-bold flex items-center gap-1 transition-all active:scale-95 flex-shrink-0 shadow-sm shadow-emerald-500/30 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>View Cart</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
