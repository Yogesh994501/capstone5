import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, Zap, ArrowRight, Loader2, Sparkles, LogIn } from 'lucide-react';
import { execute2PCCheckout } from '../services/dbService';
import { useAppStore } from '../stores/appStore';

export const CartDrawer: React.FC = () => {
  const isOpen = useAppStore((s) => s.isCartOpen);
  const onClose = () => useAppStore.getState().setCartOpen(false);
  const items = useAppStore((s) => s.cartItems);
  const onUpdateQuantity = useAppStore((s) => s.updateQuantity);
  const onRemoveItem = useAppStore((s) => s.removeItem);
  const setOrderSuccessData = useAppStore((s) => s.setOrderSuccessData);
  const clearCart = useAppStore((s) => s.clearCart);
  const user = useAppStore((s) => s.user);
  const setAuthModalOpen = useAppStore((s) => s.setAuthModalOpen);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'IDLE' | 'ACQUIRING_LOCKS' | 'COMMIT_CONSENSUS'>('IDLE');
  const [deliverySpeed, setDeliverySpeed] = useState<'EXPRESS' | 'COLD_CHAIN'>('EXPRESS');
  const [customerName, setCustomerName] = useState(user?.displayName || 'Alex Morgan');
  const [address, setAddress] = useState('742 Evergreen Terrace, Palo Alto, CA');
  const [formError, setFormError] = useState<string | null>(null);

  // Sync user display name if user logs in
  useEffect(() => {
    if (user?.displayName) {
      setCustomerName(user.displayName);
    }
  }, [user]);

  // Handle Escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 35 ? 0 : 4.99;
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    if (items.length === 0) return;

    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    if (!customerName.trim() || !address.trim()) {
      setFormError('Recipient name and delivery address are required.');
      return;
    }
    setFormError(null);

    setIsSubmitting(true);
    setCheckoutStep('ACQUIRING_LOCKS');

    // Simulate real 2PC distributed prepare delay
    await new Promise((r) => setTimeout(r, 450));
    setCheckoutStep('COMMIT_CONSENSUS');

    const result = await execute2PCCheckout(
      items,
      {
        name: customerName,
        address,
        deliverySpeed,
      },
      user.uid
    );

    await new Promise((r) => setTimeout(r, 400));
    setIsSubmitting(false);
    setCheckoutStep('IDLE');
    onClose();

    setOrderSuccessData({
      txId: result.txId,
      latencyMs: result.latencyMs,
      quorumAck: result.quorumAck,
      items: [...items],
      total: total,
    });
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-[500px] h-full bg-[#08110B]/95 backdrop-blur-2xl border-l border-white/[0.1] shadow-2xl flex flex-col justify-between z-10 animate-fade-down overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 id="cart-title" className="text-white font-bold text-[18px]">Your Fresh Harvest Cart</h2>
              <p className="text-white/50 text-[12px] font-mono" aria-live="polite">
                {items.length} unique SKU{items.length === 1 ? '' : 's'} staged
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-white/30 text-2xl">
                🛒
              </div>
              <p className="text-white/60 text-[15px]">Your cart is currently empty.</p>
              <p className="text-white/40 text-[13px] max-w-[280px] mx-auto">
                Explore our fresh organic harvest departments and add products to test 2PC transactional locking.
              </p>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-3.5 hover:border-white/15 transition-all"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-black/40 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/40 mb-0.5">
                    <span className="text-emerald-400 font-semibold">{product.shardId}</span>
                    <span>${product.price.toFixed(2)} / ea</span>
                  </div>
                  <h4 className="text-white font-medium text-[14px] truncate">{product.name}</h4>
                  <div className="text-emerald-300 font-bold font-mono text-[14px] mt-1">
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="text-white/30 hover:text-red-400 p-1 transition-colors"
                    title="Remove item"
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded-lg border border-white/10">
                    <button
                      onClick={() => onUpdateQuantity(product.id, -1)}
                      className="w-5 h-5 flex items-center justify-center text-white/70 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-[13px] font-mono font-bold text-white min-w-[16px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, 1)}
                      className="w-5 h-5 flex items-center justify-center text-white/70 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Delivery Options & Dispatch Configuration */}
          {items.length > 0 && (
            <div className="p-4 rounded-2xl bg-black/30 border border-white/[0.06] space-y-3">
              <span className="text-[11px] uppercase font-mono tracking-wider text-white/50 block">
                Delivery Dispatch Speed
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliverySpeed('EXPRESS')}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    deliverySpeed === 'EXPRESS'
                      ? 'bg-emerald-500/20 border-emerald-400/50 text-white'
                      : 'bg-white/[0.02] border-white/5 text-white/50 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="text-[12px] font-bold text-emerald-300">Under 120 Mins</div>
                  <div className="text-[10px] text-white/60">Autonomous cold routing</div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliverySpeed('COLD_CHAIN')}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    deliverySpeed === 'COLD_CHAIN'
                      ? 'bg-emerald-500/20 border-emerald-400/50 text-white'
                      : 'bg-white/[0.02] border-white/5 text-white/50 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="text-[12px] font-bold text-cyan-300">Preserved Cold Chain</div>
                  <div className="text-[10px] text-white/60">±0.1°C IoT Telemetry</div>
                </button>
              </div>

              <div className="space-y-2 pt-2">
                {formError && (
                  <div className="p-2 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-[11px] font-mono">
                    {formError}
                  </div>
                )}
                <div>
                  <label htmlFor="recipient-name" className="text-[10px] text-white/50 font-mono block mb-1">
                    Recipient Name
                  </label>
                  <input
                    id="recipient-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full h-8 px-2.5 rounded-lg bg-white/5 border border-white/10 text-[12px] text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label htmlFor="dispatch-address" className="text-[10px] text-white/50 font-mono block mb-1">
                    Dispatch Address
                  </label>
                  <input
                    id="dispatch-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-8 px-2.5 rounded-lg bg-white/5 border border-white/10 text-[12px] text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-white/[0.08] bg-black/40 space-y-4">
            <div className="space-y-1.5 text-[13px] font-mono">
              <div className="flex justify-between text-white/60">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Refrigerated Express Dispatch</span>
                <span className={deliveryFee === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                  {deliveryFee === 0 ? 'FREE (Over $35)' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-[16px] font-bold text-white pt-2 border-t border-white/10">
                <span>Total Amount</span>
                <span className="text-emerald-400">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* 2PC Distributed Protocol Status Indicator */}
            {isSubmitting && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-3 animate-pulse">
                <Loader2 className="w-5 h-5 text-emerald-400 animate-spin flex-shrink-0" />
                <div className="text-[12px] font-mono">
                  {checkoutStep === 'ACQUIRING_LOCKS' && (
                    <span className="text-amber-300 font-bold">
                      [Phase 1] 2PC Acquiring Distributed Shard Lease Locks...
                    </span>
                  )}
                  {checkoutStep === 'COMMIT_CONSENSUS' && (
                    <span className="text-emerald-400 font-bold">
                      [Phase 2] Committing Transaction into Firestore (nam5)...
                    </span>
                  )}
                </div>
              </div>
            )}

            {!user ? (
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="w-full h-[52px] bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-[14px] text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In to Complete Checkout</span>
              </button>
            ) : (
              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="w-full h-[52px] bg-[#22C55E] hover:bg-[#16A34A] disabled:opacity-50 rounded-[14px] text-[#05210E] text-[16px] font-bold shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Distributed 2PC...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Execute 2PC Distributed Checkout</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            )}

            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-white/40">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Multi-Region Firestore Consensus Guaranteed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
