import React, { useEffect, useState } from 'react';

export const ScrollBackground: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animFrameId: number;

    const handleScroll = () => {
      animFrameId = window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = scrollable > 0 ? window.scrollY / scrollable : 0;
        setProgress(Math.min(1, Math.max(0, currentProgress)));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(animFrameId);
    };
  }, []);

  // Exact Mathematical Curves from spec
  const layer1Opacity = Math.max(0, 1 - progress * 2.5);
  const layer2Opacity =
    Math.max(0, Math.min(1, (progress - 0.25) * 4)) * Math.max(0, 1 - (progress - 0.65) * 4);
  const layer3Opacity = Math.max(0, Math.min(1, (progress - 0.65) * 3.3));

  const parallaxTransform = `scale(${1.05 + progress * 0.08}) translateY(${progress * -40}px)`;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#060D09]">
      {/* Stage 1 Image: Fresh Harvest / Organic Produce */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform transition-opacity duration-150"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=2560&auto=format&fit=crop')`,
          opacity: layer1Opacity,
          transform: parallaxTransform,
        }}
      />

      {/* Stage 2 Image: Cold Storage & Warehouse Sorting */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform transition-opacity duration-150"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2560&auto=format&fit=crop')`,
          opacity: layer2Opacity,
          transform: parallaxTransform,
        }}
      />

      {/* Stage 3 Image: Precision Delivery & Micro-Fulfillment */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform transition-opacity duration-150"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=2560&auto=format&fit=crop')`,
          opacity: layer3Opacity,
          transform: parallaxTransform,
        }}
      />

      {/* Backdrop Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060D09]/80 via-[#060D09]/65 to-[#060D09]/95" />

      {/* Radial Glow Centered at top-right */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.18),transparent_50%)]" />
    </div>
  );
};
