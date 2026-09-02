import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { CartDrawer } from './components/CartDrawer';
import { DbWorkbenchModal } from './components/DbWorkbenchModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ScrollBackground } from './components/ScrollBackground';
import { FirebaseConsole } from './components/FirebaseConsole';
import { AuthModal } from './components/AuthModal';
import { OrderHistory } from './components/OrderHistory';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { Database, ShieldCheck, Zap, Activity, ArrowRight } from 'lucide-react';
import { useAppStore } from './stores/appStore';
import { subscribeToProducts } from './services/dbService';

const AppContent: React.FC = () => {
  const setProducts = useAppStore((s) => s.setProducts);
  const setQueryModalOpen = useAppStore((s) => s.setQueryModalOpen);
  const setCartOpen = useAppStore((s) => s.setCartOpen);
  const totalCartCount = useAppStore((s) => s.totalCartCount);

  // Subscribe to live Firestore inventory
  useEffect(() => {
    const unsubscribe = subscribeToProducts((liveList) => {
      if (liveList && liveList.length > 0) {
        setProducts(liveList);
      }
    });
    return () => unsubscribe();
  }, [setProducts]);

  return (
    <div className="relative min-h-[300vh] bg-[#060D09] text-white selection:bg-emerald-500 selection:text-black font-sans">
      {/* Scroll-Driven Fixed Background System */}
      <ScrollBackground />

      {/* Global Interactive Firebase Console Dock */}
      <FirebaseConsole />

      {/* Interactive Cart Slide-over Drawer */}
      <CartDrawer />

      {/* Full DB Query & Analysis Workbench */}
      <DbWorkbenchModal />

      {/* 2PC Order Success Confirmation Modal */}
      <OrderSuccessModal />

      {/* Auth Modal */}
      <AuthModal />

      {/* Order History Modal */}
      <OrderHistory />

      {/* Foreground Content Container */}
      <div className="relative z-10 flex flex-col justify-between">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section (Stage 1: Fresh Harvest) */}
        <div className="min-h-[90vh] flex items-center">
          <Hero />
        </div>

        {/* Section 1.5: Interactive Departments & Catalog */}
        <CatalogSection />

        {/* Section 2: Distributed Cold Chain (Stage 2: 35% - 75% scroll) */}
        <section
          id="cold-chain"
          className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-28 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[13px] font-mono">
                <Activity className="w-4 h-4" />
                <span>Stage 02 // Autonomous Cold-Chain Routing</span>
              </div>
              <h2 className="text-[34px] sm:text-[48px] font-bold leading-[1.05] tracking-tight">
                Sub-Zero Telemetry. <br />
                <span className="text-emerald-400">Zero Spoilage Window.</span>
              </h2>
              <p className="text-white/70 text-[16px] sm:text-[18px] leading-relaxed max-w-[540px]">
                Sensors across 1,200 refrigerated transit units stream temperature, ethylene level,
                and vibration metrics directly into Firestore partitioned collections every 200 milliseconds.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[rgba(13,24,18,0.55)] backdrop-blur-xl border border-white/[0.08]">
                  <div className="text-[28px] font-bold text-white font-mono">3.2°C</div>
                  <div className="text-[12px] text-white/50 uppercase font-mono tracking-wider mt-1">
                    Mean Core Temp (±0.1°C)
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[rgba(13,24,18,0.55)] backdrop-blur-xl border border-white/[0.08]">
                  <div className="text-[28px] font-bold text-emerald-400 font-mono">99.98%</div>
                  <div className="text-[12px] text-white/50 uppercase font-mono tracking-wider mt-1">
                    Freshness SLA Target
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-[28px] bg-[rgba(10,20,14,0.6)] backdrop-blur-2xl border border-white/[0.08] shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span className="text-white text-[14px] font-mono font-medium">IoT Fleet Shard 08</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                    ONLINE (nam5)
                  </span>
                </div>
                <div className="space-y-3 font-mono text-[13px]">
                  <div className="flex justify-between items-center text-white/80">
                    <span className="text-white/40">Zone Alpha Transit</span>
                    <span className="text-emerald-300">42 Vans Synchronized</span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span className="text-white/40">Ethylene Gas Absorption</span>
                    <span className="text-white font-medium">0.02 ppm (Optimal)</span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span className="text-white/40">Raft Consensus Quorum</span>
                    <span className="text-emerald-400">3/3 Nodes Acked (0.8ms)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: ACID Engine & Distributed 2PC (Stage 3: 70% - 100% scroll) */}
        <section
          id="acid-engine"
          className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-28 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="p-6 sm:p-8 rounded-[28px] bg-[rgba(10,20,14,0.6)] backdrop-blur-2xl border border-white/[0.08] shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-white text-[14px] font-mono font-medium">2PC Lock Coordinator</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                    Strict Serializable
                  </span>
                </div>
                <div className="space-y-3 font-mono text-[13px]">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="flex justify-between text-white/90">
                      <span>TX #889210 - Farm To Door Order</span>
                      <span className="text-emerald-400">COMMITTED</span>
                    </div>
                    <div className="text-[11px] text-white/50">2-Phase Lock acquired in 0.3ms • Shard 04 &amp; Shard 11</div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="flex justify-between text-white/90">
                      <span>TX #889211 - Dynamic Stock Rebalance</span>
                      <span className="text-cyan-400">PREPARED</span>
                    </div>
                    <div className="text-[11px] text-white/50">Multi-region ack awaiting node 3 quorum</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[13px] font-mono">
                <Zap className="w-4 h-4" />
                <span>Stage 03 // Precision Micro-Fulfillment</span>
              </div>
              <h2 className="text-[34px] sm:text-[48px] font-bold leading-[1.05] tracking-tight">
                Distributed ACID. <br />
                <span className="text-[#22C55E]">Never an Oversold Organic Item.</span>
              </h2>
              <p className="text-white/70 text-[16px] sm:text-[18px] leading-relaxed max-w-[540px]">
                High-volume flash orders are validated across distributed sharded nodes using
                two-phase commit protocols, ensuring guaranteed atomicity before any delivery dispatch occurs.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setQueryModalOpen(true)}
                  className="h-[52px] px-8 bg-[#22C55E] rounded-[14px] text-[#05210E] text-[15px] font-bold transition-all hover:bg-[#16A34A] hover:shadow-[0_0_24px_rgba(34,197,94,0.4)] flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <span>Launch DB Analysis Workbench</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCartOpen(true)}
                  className="h-[52px] px-6 rounded-[14px] border border-white/20 hover:border-emerald-400 text-white text-[15px] font-medium transition-all hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                >
                  <span>Open Staged Cart ({totalCartCount()})</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Replication Logs / Footer */}
        <footer
          id="replication-logs"
          className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-16 border-t border-white/[0.08] relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-[28px] h-[28px] rounded-[8px] bg-emerald-500/20 border border-emerald-400/40 p-1 flex items-center justify-center">
              <Database className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-[14px] font-semibold text-white/90">
              Verdant Core &bull; ADBMS Cluster{' '}
              <span className="text-emerald-400 font-mono">freshcart-demo-42425</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[13px] font-mono text-white/50">
            <button
              onClick={() => setQueryModalOpen(true)}
              className="flex items-center gap-1.5 text-emerald-400 hover:underline cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All 16 Shards Synced (Open DB Workbench)
            </button>
            <span>Raft v2.4</span>
            <span>Firestore gRPC HTTP/2</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
};
