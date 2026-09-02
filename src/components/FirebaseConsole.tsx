import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useAppStore } from '../stores/appStore';

export const FirebaseConsole: React.FC = () => {
  const isExpanded = useAppStore((s) => s.isConsoleOpen);
  const setIsExpanded = useAppStore((s) => s.setConsoleOpen);

  const [activeTab, setActiveTab] = useState<'data' | 'indexes' | 'usage'>('data');
  const [activeCollection, setActiveCollection] = useState<'inventory_live' | 'raft_consensus' | 'order_locks_2pc'>('inventory_live');
  const [liveTimestamp, setLiveTimestamp] = useState(new Date().toISOString());
  const [readRate, setReadRate] = useState('8.4k/s');
  const [writeRate, setWriteRate] = useState('1.2k/s');

  const consoleRef = useRef<HTMLDivElement>(null);

  // Live timestamp & rate simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTimestamp(new Date().toISOString());
      const reads = (8.2 + Math.random() * 0.5).toFixed(1);
      const writes = (1.1 + Math.random() * 0.3).toFixed(1);
      setReadRate(`${reads}k/s`);
      setWriteRate(`${writes}k/s`);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, setIsExpanded]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (consoleRef.current && !consoleRef.current.contains(e.target as Node) && isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, setIsExpanded]);

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 z-50 h-[44px] px-4 rounded-[12px] bg-[rgba(10,18,14,0.75)] hover:bg-[rgba(15,28,21,0.9)] border border-emerald-500/30 backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
        aria-label="Open Firebase ADBMS Live Console"
      >
        {/* Firebase Flame Icon */}
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M4.5 17.5L8 3.5L12.5 11.5L8.5 19L4.5 17.5Z" fill="#FFA000" />
          <path d="M12.5 11.5L15.5 6L20 17.5L12.5 21.5L8.5 19L12.5 11.5Z" fill="#FFCA28" />
          <path d="M8.5 19L12.5 21.5L4.5 17.5L8.5 19Z" fill="#F57C00" />
        </svg>

        <div className="flex items-center gap-2 text-left">
          <span className="text-[13px] font-semibold text-white/90 font-mono tracking-tight">
            freshcart-demo
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-[4px] bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
            Cloud Firestore
          </span>
        </div>

        <span className="w-2 h-2 rounded-full bg-[#22C55E] relative ml-1">
          <span className="absolute inset-0 rounded-full bg-[#22C55E] animate-pulse-ring" />
        </span>
      </button>
    );
  }

  return (
    <div
      ref={consoleRef}
      className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[580px] h-[520px] max-h-[85vh] rounded-[20px] bg-[#0A100D]/90 backdrop-blur-[30px] border border-white/[0.12] shadow-[0_24px_64px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden transition-all duration-300 animate-fade-scale"
      role="region"
      aria-label="Firebase Live Console Dock"
    >
      {/* Console Titlebar */}
      <div className="h-[48px] px-4 bg-white/[0.03] border-b border-white/[0.08] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-hidden">
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
            <path d="M4.5 17.5L8 3.5L12.5 11.5L8.5 19L4.5 17.5Z" fill="#FFA000" />
            <path d="M12.5 11.5L15.5 6L20 17.5L12.5 21.5L8.5 19L12.5 11.5Z" fill="#FFCA28" />
            <path d="M8.5 19L12.5 21.5L4.5 17.5L8.5 19Z" fill="#F57C00" />
          </svg>
          <span className="text-white text-[13px] font-medium font-mono truncate">freshcart-demo</span>
          <span className="text-white/30 text-[13px]">/</span>
          <span className="text-amber-400 text-[13px] font-mono font-medium truncate">Firebase console</span>
          <span className="px-2 py-0.5 rounded-[4px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono ml-1 hidden sm:inline-block">
            nam5 (us-central)
          </span>
        </div>

        <button
          onClick={() => setIsExpanded(false)}
          className="w-7 h-7 rounded-[8px] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors flex-shrink-0"
          aria-label="Close Firebase console"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Sub-nav Tabs & Real-time Metrics Ribbon */}
      <div className="px-4 py-2.5 bg-black/30 border-b border-white/[0.06] flex items-center justify-between text-[12px] flex-shrink-0">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('data')}
            className={`pb-1 border-b-2 font-medium transition-colors ${
              activeTab === 'data' ? 'border-amber-400 text-amber-300' : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            Data (Collections)
          </button>
          <button
            onClick={() => setActiveTab('indexes')}
            className={`pb-1 border-b-2 font-medium transition-colors ${
              activeTab === 'indexes' ? 'border-amber-400 text-amber-300' : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            Composite Indexes
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`pb-1 border-b-2 font-medium transition-colors ${
              activeTab === 'usage' ? 'border-amber-400 text-amber-300' : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            Live Replication
          </button>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-white/60">
          <span>
            R: <strong className="text-emerald-400">{readRate}</strong>
          </span>
          <span>
            W: <strong className="text-amber-400">{writeRate}</strong>
          </span>
        </div>
      </div>

      {/* Tab Content 1: Master-Detail Data Explorer */}
      {activeTab === 'data' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Root Collections */}
          <div className="w-[180px] border-r border-white/[0.08] bg-black/20 p-2 flex flex-col gap-1 overflow-y-auto">
            <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 px-2 py-1">
              Collections
            </span>
            <button
              onClick={() => setActiveCollection('inventory_live')}
              className={`w-full text-left px-2.5 py-1.5 rounded-[6px] text-[12px] font-mono flex items-center justify-between transition-colors ${
                activeCollection === 'inventory_live'
                  ? 'bg-white/[0.08] text-white border border-white/10'
                  : 'hover:bg-white/[0.04] text-white/60'
              }`}
            >
              <span className="truncate">inventory_live</span>
              <span className="text-[10px] text-emerald-400 font-sans ml-1">28 shards</span>
            </button>

            <button
              onClick={() => setActiveCollection('raft_consensus')}
              className={`w-full text-left px-2.5 py-1.5 rounded-[6px] text-[12px] font-mono flex items-center justify-between transition-colors ${
                activeCollection === 'raft_consensus'
                  ? 'bg-white/[0.08] text-white border border-white/10'
                  : 'hover:bg-white/[0.04] text-white/60'
              }`}
            >
              <span className="truncate">raft_consensus</span>
              <span className="text-[10px] text-white/40 font-sans ml-1">3 nodes</span>
            </button>

            <button
              onClick={() => setActiveCollection('order_locks_2pc')}
              className={`w-full text-left px-2.5 py-1.5 rounded-[6px] text-[12px] font-mono flex items-center justify-between transition-colors ${
                activeCollection === 'order_locks_2pc'
                  ? 'bg-white/[0.08] text-white border border-white/10'
                  : 'hover:bg-white/[0.04] text-white/60'
              }`}
            >
              <span className="truncate">order_locks_2pc</span>
              <span className="text-[10px] text-emerald-400/80 font-sans ml-1">0 locks</span>
            </button>
          </div>

          {/* Right Column: Live Document Payload Viewer */}
          <div className="flex-1 p-3.5 bg-black/40 overflow-y-auto font-mono text-[11px] leading-[1.6]">
            {activeCollection === 'inventory_live' && (
              <>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-white/50 text-[10px]">
                  <span className="truncate">DOC_PATH: inventory_live/shard_04/skus/ORG-AVOCADO-09</span>
                  <span className="text-emerald-400 flex items-center gap-1 flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Realtime Sync
                  </span>
                </div>

                <pre className="text-emerald-300">
{`{
  "sku": "ORG-HASS-AVOCADO-94",
  "name": "Organic Hass Avocado (Bulk)",
  "category": "Farm Produce",
  "stock_level": 420,
  "reserved_2pc": 12,
  "shard_id": "nam5-shard-04",
  "distributed_lock": {
    "status": "ACQUIRED_EXCLUSIVE",
    "transaction_id": "tx_raft_88291410",
    "ttl_ms": 250
  },
  "replication": {
    "primary": "us-central1-a",
    "sync_replicas": [
      "us-central1-b",
      "us-east1-c"
    ],
    "ack_quorum": "3/3",
    "write_latency_ms": 1.42
  },
  "last_mutation": "${liveTimestamp}"
}`}
                </pre>
              </>
            )}

            {activeCollection === 'raft_consensus' && (
              <>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-white/50 text-[10px]">
                  <span className="truncate">DOC_PATH: raft_consensus/term_412/leader</span>
                  <span className="text-emerald-400 flex items-center gap-1 flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Leader Elected
                  </span>
                </div>

                <pre className="text-amber-300">
{`{
  "current_term": 412,
  "leader_id": "node-nam5-us-central1-primary",
  "heartbeat_interval_ms": 50,
  "last_log_index": 982341,
  "committed_index": 982340,
  "peers": [
    { "id": "node-01", "status": "SYNCED", "match_index": 982340, "ping_ms": 0.8 },
    { "id": "node-02", "status": "SYNCED", "match_index": 982340, "ping_ms": 1.2 },
    { "id": "node-03", "status": "SYNCED", "match_index": 982339, "ping_ms": 1.9 }
  ],
  "consensus_quorum": "QUORUM_ESTABLISHED_3_OF_3",
  "timestamp": "${liveTimestamp}"
}`}
                </pre>
              </>
            )}

            {activeCollection === 'order_locks_2pc' && (
              <>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-white/50 text-[10px]">
                  <span className="truncate">DOC_PATH: order_locks_2pc/tx_active_summary</span>
                  <span className="text-emerald-400 flex items-center gap-1 flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Serializable Snapshot
                  </span>
                </div>

                <pre className="text-cyan-300">
{`{
  "protocol": "Two-Phase-Commit (2PC) Distributed",
  "active_transactions": 8,
  "pending_commit_quorum": 0,
  "deadlock_detector": "WAIT_FOR_GRAPH_CLEAR",
  "active_locks": [
    {
      "tx_id": "tx_2pc_991823",
      "skus": ["ORG-KALE-02", "ORG-BERRY-11"],
      "phase": "PREPARED",
      "timeout_remaining_ms": 180
    }
  ],
  "last_checkpoint": "${liveTimestamp}"
}`}
                </pre>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tab Content 2: Composite Indexes */}
      {activeTab === 'indexes' && (
        <div className="flex-1 p-4 bg-black/40 overflow-y-auto font-mono text-[11px] space-y-3">
          <div className="flex items-center justify-between text-white/60 pb-2 border-b border-white/[0.08]">
            <span className="text-[12px] font-semibold text-white">Firestore Indexes Configuration</span>
            <span className="text-emerald-400">All Indexes Enabled</span>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-amber-300 font-bold">inventory_live</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">READY</span>
            </div>
            <p className="text-white/70">Fields: category ASC, stock_level DESC, shard_id ASC</p>
            <p className="text-white/40 text-[10px]">Scope: Collection group (nam5 Multi-Region)</p>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-amber-300 font-bold">order_locks_2pc</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">READY</span>
            </div>
            <p className="text-white/70">Fields: timestamp DESC, status ASC, ttl_ms ASC</p>
            <p className="text-white/40 text-[10px]">Scope: Single collection</p>
          </div>
        </div>
      )}

      {/* Tab Content 3: Live Replication */}
      {activeTab === 'usage' && (
        <div className="flex-1 p-4 bg-black/40 overflow-y-auto space-y-3 font-mono text-[11px]">
          <div className="text-white/70 text-[12px] font-semibold flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <span>Active-Active Multi-Region Cluster</span>
            <span className="text-emerald-400">Sync: 100% (No Lag)</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white font-medium">us-central1-a (nam5 Leader)</span>
              </div>
              <span className="text-emerald-300 font-bold">0.4ms ping</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white font-medium">us-central1-b (Sync Replica)</span>
              </div>
              <span className="text-emerald-300 font-bold">0.9ms ping</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white font-medium">us-east1-c (Sync Replica)</span>
              </div>
              <span className="text-emerald-300 font-bold">1.4ms ping</span>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Footer — Command / Status */}
      <div className="h-[36px] px-3.5 bg-black/60 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/60 flex-shrink-0">
        <div className="flex items-center gap-2 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
          <span className="text-white/80 truncate">Firestore Streaming RPC (gRPC HTTP/2) Active</span>
        </div>
        <span className="text-white/40 hidden sm:inline-block flex-shrink-0">ADBMS Project: freshcart-demo</span>
      </div>
    </div>
  );
};
