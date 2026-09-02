import React, { useEffect } from 'react';
import { CheckCircle2, X, PackageCheck } from 'lucide-react';
import { useAppStore } from '../stores/appStore';

export const OrderSuccessModal: React.FC = () => {
  const orderData = useAppStore((s) => s.orderSuccessData);
  const onClose = () => useAppStore.getState().setOrderSuccessData(null);
  const onOpenQueryModal = () => {
    onClose();
    useAppStore.getState().setQueryModalOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && orderData) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [orderData]);

  if (!orderData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="order-success-title">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal Shell */}
      <div className="relative w-full max-w-[560px] bg-[#09130D]/95 backdrop-blur-3xl border border-emerald-500/40 rounded-[28px] p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.8)] z-10 animate-fade-scale text-white space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <h3 id="order-success-title" className="text-[20px] sm:text-[22px] font-bold text-white">
                Distributed Order Committed!
              </h3>
              <p className="text-emerald-300 text-[12px] font-mono">
                {orderData.quorumAck}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10"
            aria-label="Close order success modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Transaction Proof Details */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 font-mono text-[12px] space-y-2">
          <div className="flex justify-between items-center text-white/60">
            <span>TRANSACTION HASH (2PC):</span>
            <span className="text-emerald-400 font-bold">{orderData.txId}</span>
          </div>
          <div className="flex justify-between items-center text-white/60">
            <span>CONSENSUS WRITE LATENCY:</span>
            <span className="text-white font-bold">{orderData.latencyMs}ms</span>
          </div>
          <div className="flex justify-between items-center text-white/60">
            <span>DATABASE TARGET:</span>
            <span className="text-amber-300">Firestore nam5 (us-central)</span>
          </div>
          <div className="flex justify-between items-center text-white/60">
            <span>DISPATCH STATUS:</span>
            <span className="text-emerald-400">Micro-Fulfillment Queue Active</span>
          </div>
        </div>

        {/* Ordered Items Summary */}
        <div className="space-y-2">
          <div className="text-[12px] font-mono uppercase text-white/50">Committed Harvest SKUs</div>
          <div className="max-h-[160px] overflow-y-auto space-y-1.5 pr-1">
            {orderData.items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-between text-[13px]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <PackageCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-white truncate">{product.name}</span>
                  <span className="text-white/40 text-[11px] font-mono">x{quantity}</span>
                </div>
                <span className="font-mono text-emerald-300 font-semibold">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total & Action Buttons */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-mono text-left w-full sm:w-auto">
            <div className="text-[11px] text-white/50">Total Paid (Zero Lag)</div>
            <div className="text-[22px] font-bold text-emerald-400 font-mono">
              ${orderData.total.toFixed(2)}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onOpenQueryModal}
              className="flex-1 sm:flex-initial h-11 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[13px] font-medium transition-all"
            >
              Inspect in DB Workbench
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial h-11 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[13px] transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
