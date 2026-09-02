import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Sparkles, Plus, Check, ShieldCheck, Thermometer, SearchX } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { ImageSkeleton } from './ImageSkeleton';

export const CatalogSection: React.FC = () => {
  const products = useAppStore((s) => s.products);
  const addToCart = useAppStore((s) => s.addToCart);
  const setQueryModalOpen = useAppStore((s) => s.setQueryModalOpen);
  const searchQuery = useAppStore((s) => s.searchQuery);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Produce', 'Cold-Pressed', 'Dairy & Ferments', 'Pantry'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.farmOrigin.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section id="departments" className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-20 relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[13px] font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Active Harvest Catalog &bull; 100% Organic</span>
          </div>
          <h2 className="text-[32px] sm:text-[46px] font-extrabold tracking-tight text-white leading-tight">
            Farm-Direct Departments
          </h2>
          <p className="text-white/60 text-[15px] sm:text-[17px] mt-2 max-w-[580px]">
            Every SKU is sharded across our low-latency distributed cluster. Zero stale inventory, guaranteed harvest timestamps.
          </p>
          {searchQuery && (
            <div className="mt-3 flex items-center gap-2 text-[13px] font-mono text-emerald-400" aria-live="polite">
              <span>Search filter: &ldquo;{searchQuery}&rdquo;</span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-white/50 hover:text-white underline text-[11px]"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-[#05210E] font-bold shadow-lg shadow-emerald-500/25 scale-[1.02]'
                  : 'bg-white/[0.05] text-white/70 hover:bg-white/10 hover:text-white border border-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Empty Search Results */}
      {filteredProducts.length === 0 && (
        <div className="py-20 text-center space-y-4 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-white/40">
            <SearchX className="w-8 h-8" />
          </div>
          <p className="text-white font-semibold text-[18px]">No matching organic SKUs found</p>
          <p className="text-white/40 text-[14px] max-w-sm mx-auto">
            Try adjusting your search terms or select &ldquo;All&rdquo; categories to reset filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[13px] font-mono transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isAdded = addedItemMap[product.id];

          return (
            <div
              key={product.id}
              className="group rounded-[24px] bg-[rgba(13,24,18,0.55)] backdrop-blur-[24px] border border-white/[0.08] hover:border-emerald-500/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Shimmer Skeleton */}
                <div className="relative w-full h-[200px] rounded-[18px] overflow-hidden mb-4 bg-black/40">
                  <ImageSkeleton
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Shard Partition Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-[8px] bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-300 flex items-center gap-1 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {product.shardId}
                  </div>

                  {/* Cold Chain Temp */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-[8px] bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80 flex items-center gap-1 z-10">
                    <Thermometer className="w-3 h-3 text-cyan-400" />
                    {product.temperature}°C
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-1.5">
                  <span className="text-emerald-400 font-semibold uppercase">{product.category}</span>
                  <span>{product.sku}</span>
                </div>

                {/* Product Name */}
                <h3 className="text-white font-bold text-[17px] leading-snug mb-1 group-hover:text-emerald-300 transition-colors">
                  {product.name}
                </h3>

                {/* Farm Origin */}
                <p className="text-white/60 text-[12px] mb-4 flex items-center gap-1">
                  <span>📍</span>
                  <span className="truncate">{product.farmOrigin}</span>
                </p>
              </div>

              {/* Price & Action Row */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <div className="text-[20px] font-extrabold text-white font-mono">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-white/40 font-mono">
                    {product.stock} units in shard
                  </div>
                </div>

                <button
                  onClick={() => handleAdd(product)}
                  className={`h-[40px] px-4 rounded-[12px] text-[13px] font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                    isAdded
                      ? 'bg-emerald-400 text-[#05210E]'
                      : 'bg-white/10 hover:bg-emerald-500 hover:text-[#05210E] text-white border border-white/10'
                  }`}
                  aria-label={`Add ${product.name} to cart`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive ADBMS Bar Banner */}
      <div className="mt-12 p-6 rounded-[22px] bg-gradient-to-r from-emerald-950/40 via-black/50 to-emerald-950/40 border border-emerald-500/20 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-white text-[15px] font-bold">
              Real-Time ADBMS Cluster Query Analysis
            </div>
            <div className="text-white/60 text-[13px]">
              Inspect live multi-region Firestore latency, shard partitions, and execute ad-hoc SQL/NoSQL queries.
            </div>
          </div>
        </div>

        <button
          onClick={() => setQueryModalOpen(true)}
          className="h-[44px] px-6 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-black border border-white/20 text-white text-[13px] font-bold transition-all whitespace-nowrap active:scale-95"
        >
          Open DB Query Workbench &rarr;
        </button>
      </div>
    </section>
  );
};
