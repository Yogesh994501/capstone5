import React, { useState, useEffect } from 'react';
import { X, PackageCheck, Clock, Database } from 'lucide-react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAppStore } from '../stores/appStore';
import { Order } from '../types';

export const OrderHistory: React.FC = () => {
  const isOpen = useAppStore((s) => s.isOrderHistoryOpen);
  const setOpen = useAppStore((s) => s.setOrderHistoryOpen);
  const user = useAppStore((s) => s.user);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders on open
  useEffect(() => {
    if (!isOpen || !user) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const list: Order[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Order);
        });
        setOrders(list);
      } catch {
        // Firestore may not have the index yet — show empty state
        setOrders([]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [isOpen, user]);

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, setOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

      <div className="relative w-full max-w-[720px] h-[80vh] max-h-[700px] bg-[#070E0A]/95 backdrop-blur-3xl border border-white/[0.12] rounded-[28px] shadow-[0_24px_64px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden z-10 animate-fade-scale">
        {/* Header */}
        <div className="px-6 py-4 bg-white/[0.03] border-b border-white/[0.08] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-[17px]">Order History</h2>
              <p className="text-white/50 text-[12px] font-mono">
                {user?.displayName || 'User'} — Committed Transactions
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close order history"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mx-auto mb-4" />
              <p className="text-white/50 text-[14px] font-mono">Fetching from Firestore...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto">
                <Database className="w-7 h-7 text-white/20" />
              </div>
              <p className="text-white/60 text-[15px]">No orders found.</p>
              <p className="text-white/40 text-[13px] max-w-[320px] mx-auto">
                Place your first distributed 2PC order to see your transaction history here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-black/40 border border-white/[0.08] hover:border-emerald-500/30 transition-all space-y-3"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PackageCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-mono text-[13px] font-bold">
                      {order.txId}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-1 pl-6">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-[12px] font-mono">
                      <span className="text-white/70 truncate">
                        {item.name} <span className="text-white/40">x{item.quantity}</span>
                      </span>
                      <span className="text-emerald-300 font-semibold ml-3">
                        ${item.subtotal.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] font-mono">
                  <span className="text-white/40">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                  <span className="text-white font-bold text-[14px]">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-black/60 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/50 flex-shrink-0">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Firestore orders collection
          </span>
          <span>{orders.length} transaction{orders.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
};
