import React from 'react';
import { Database, Sparkles, Activity } from 'lucide-react';
import { InventoryCard } from './InventoryCard';
import { useAppStore } from '../stores/appStore';

export const Hero: React.FC = () => {
  const setQueryModalOpen = useAppStore((s) => s.setQueryModalOpen);

  return (
    <section className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-8 sm:py-12 relative z-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 sm:gap-12 lg:gap-14">
        {/* Left Column: Copy & CTAs */}
        <div className="w-full max-w-full lg:max-w-[620px] animate-fade-up">
          {/* Telemetry Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-md mb-6 shadow-sm">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[13px] font-medium text-emerald-200 tracking-wide">
              Multi-Region PostgreSQL &amp; Redis Partitioning Live
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-white text-[38px] sm:text-[54px] md:text-[66px] lg:text-[74px] font-extrabold leading-[0.96] tracking-[-0.035em] mb-5 sm:mb-8">
            Hyper-fresh groceries. Zero out-of-stock lag.
          </h1>

          {/* Subheadline */}
          <p className="text-white/80 text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-[1.4] max-w-[480px] mb-8 sm:mb-10">
            Direct-from-farm produce guaranteed by strict two-phase locking and distributed inventory consensus. From harvest to table in under 120 minutes.
          </p>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('departments');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="h-[48px] sm:h-[54px] px-6 sm:px-[30px] bg-[#22C55E] rounded-[14px] text-[#05210E] text-[15px] sm:text-[16px] font-bold transition-all duration-300 hover:bg-[#16A34A] hover:shadow-[0_0_24px_rgba(34,197,94,0.4)] flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Shop Fresh Harvest</span>
            </button>

            <button
              onClick={() => setQueryModalOpen(true)}
              className="h-[48px] sm:h-[54px] px-6 sm:px-[30px] rounded-[14px] border border-white/25 text-white text-[15px] sm:text-[16px] font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Live Cluster DB Query</span>
            </button>
          </div>
        </div>

        {/* Right Column: Inventory Card */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end">
          <InventoryCard />
        </div>
      </div>
    </section>
  );
};
