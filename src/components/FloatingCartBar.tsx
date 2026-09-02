import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useAppStore } from '../stores/appStore';

export const FloatingCartBar: React.FC = () => {
  const cartItems = useAppStore((s) => s.cartItems);
  const totalCartCount = useAppStore((s) => s.totalCartCount);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const isCartOpen = useAppStore((s) => s.isCartOpen);

  const count = totalCartCount();
  if (count === 0 || isCartOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed bottom-6 left-6 z-40 animate-fade-up">
      <button
        onClick={() => setCartOpen(true)}
        className="h-[48px] px-5 rounded-[16px] bg-[rgba(10,24,16,0.85)] hover:bg-[rgba(15,36,24,0.95)] border border-emerald-400/40 backdrop-blur-[24px] shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex items-center gap-3.5 text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group cursor-pointer"
        aria-label={`View Cart with ${count} items`}
      >
        <div className="relative flex items-center justify-center">
          <div className="w-8 h-8 rounded-[10px] bg-emerald-500/25 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-black text-[11px] font-mono font-extrabold flex items-center justify-center shadow-md">
            {count}
          </span>
        </div>

        <div className="text-left font-mono">
          <div className="text-[13px] font-bold text-white flex items-center gap-1.5">
            <span>Staged Cart</span>
            <span className="text-emerald-400">${subtotal.toFixed(2)}</span>
          </div>
          <div className="text-[10px] text-white/50">
            {cartItems.length} SKU{cartItems.length !== 1 ? 's' : ''} &bull; Click to review
          </div>
        </div>

        <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-emerald-500 group-hover:text-black flex items-center justify-center transition-colors ml-1">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
};
