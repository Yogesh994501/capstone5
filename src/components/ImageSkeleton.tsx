import React, { useState } from 'react';

interface ImageSkeletonProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ src, alt, className = '' }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Shimmer skeleton placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-white/[0.04] animate-shimmer">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full animate-shimmer-slide" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
