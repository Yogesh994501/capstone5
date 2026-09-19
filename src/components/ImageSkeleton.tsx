import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ImageSkeletonProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ src, alt, className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-black/40 ${className}`}>
      {/* Shimmer skeleton placeholder */}
      {!loaded && !hasError && (
        <div className="absolute inset-0 bg-white/[0.04] animate-shimmer">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full animate-shimmer-slide" />
        </div>
      )}

      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950/30 to-black/60 p-4 text-center">
          <Sparkles className="w-8 h-8 text-emerald-400/60 mb-2" />
          <span className="text-[12px] font-mono text-emerald-300/80 font-semibold">{alt}</span>
          <span className="text-[10px] font-mono text-white/40 mt-1">Farm Origin Certified</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};
