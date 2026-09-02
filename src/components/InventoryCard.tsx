import React from 'react';

const STOCK_BARS = [
  45, 62, 78, 90, 84, 70, 52, 41, 65, 88,
  95, 82, 76, 60, 48, 85, 92, 100, 88, 74,
  58, 67, 83, 91, 79, 85, 94, 72
];

const NODE_REGIONS = ['Node-01', 'Node-04', 'Node-08', 'Node-12', 'Edge-Replicas'];

export const InventoryCard: React.FC = () => {
  return (
    <div className="w-full max-w-[420px] mx-auto lg:mx-0 rounded-[28px] sm:rounded-[34px] bg-[rgba(13,24,18,0.45)] backdrop-blur-[24px] border border-white/[0.08] p-5 sm:p-8 pb-5 sm:pb-6 shadow-2xl animate-fade-scale">
      {/* Top Row: Cluster Status Badge */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] relative z-10" />
          <span className="absolute inset-0 rounded-full bg-[#22C55E] animate-pulse-ring" />
        </div>
        <span className="text-[11px] sm:text-[12px] font-semibold text-[#86EFAC] tracking-wider uppercase">
          Active Shards: 16/16 Connected
        </span>
      </div>

      {/* Metric Header */}
      <div className="mb-2">
        <p className="text-white/70 text-[14px] sm:text-[15px] font-medium mb-1">
          Real-Time Stock Synchronized
        </p>
        <div className="text-[32px] sm:text-[46px] font-bold text-white tracking-tight leading-none mb-2">
          148,290
          <span className="text-white/30 text-[24px] sm:text-[34px] font-medium ml-1.5">
            SKUs
          </span>
        </div>
      </div>

      {/* Query Latency Pill */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-emerald-500/15 border border-emerald-500/25 text-[#4ADE80] text-[12px] font-medium mb-6 sm:mb-8">
        <span>⚡</span>
        <span>1.4ms Raft Consensus Latency</span>
      </div>

      {/* Partitioned Inventory Chart */}
      <div className="flex items-end gap-[2px] h-[85px] sm:h-[105px] relative mb-3">
        {/* 4 Absolute Horizontal Gridlines */}
        <div className="absolute left-0 right-0 top-[25%] h-px bg-white/[0.06] pointer-events-none" />
        <div className="absolute left-0 right-0 top-[50%] h-px bg-white/[0.06] pointer-events-none" />
        <div className="absolute left-0 right-0 top-[75%] h-px bg-white/[0.06] pointer-events-none" />
        <div className="absolute left-0 right-0 top-[100%] h-px bg-white/[0.06] pointer-events-none" />

        {/* 28 Partition Height Bars */}
        {STOCK_BARS.map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-[1px] origin-bottom transition-all duration-500 animate-fade-up"
            style={{
              height: `${height}%`,
              backgroundColor: i >= 24 ? 'rgba(74,222,128,0.25)' : '#22C55E',
              animationDelay: `${800 + i * 25}ms`,
            }}
            title={`Shard Partition ${i + 1}: ${height}% Capacity`}
          />
        ))}
      </div>

      {/* Node Regions Time Axis */}
      <div className="flex justify-between text-[10px] text-white/50 font-medium tracking-wide uppercase pt-1 border-t border-white/[0.06]">
        {NODE_REGIONS.map((region) => (
          <span key={region}>{region}</span>
        ))}
      </div>
    </div>
  );
};
