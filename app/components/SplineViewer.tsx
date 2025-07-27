'use client';

import { useEffect, useRef } from 'react';

export default function SplineViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.37/build/spline-viewer.js';
    
    script.onload = () => {
      // Create the spline-viewer element after script loads
      if (containerRef.current) {
        const splineViewer = document.createElement('spline-viewer');
        splineViewer.setAttribute('url', 'https://prod.spline.design/Rh9kigkKmGq9H4eB/scene.splinecode');
        
        // Add custom styles for mobile responsiveness and prevent zoom out
        splineViewer.style.cssText = `
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: relative !important;
          overflow: hidden !important;
          transform: scale(1) !important;
          transform-origin: center center !important;
        `;
        
        containerRef.current.appendChild(splineViewer);
        
        // Prevent zoom out on mouse wheel
        const handleWheel = (e: WheelEvent) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        };
        
        // Prevent zoom out on touch gestures
        const handleTouchStart = (e: TouchEvent) => {
          if (e.touches.length >= 2) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        };
        
        const handleTouchMove = (e: TouchEvent) => {
          if (e.touches.length >= 2) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        };
        
        const handleTouchEnd = (e: TouchEvent) => {
          if (e.touches.length >= 2) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        };
        
        // Prevent browser zoom
        const handleKeyDown = (e: KeyboardEvent) => {
          if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.key === '=' || e.key === '0' || e.key === 'numpadadd' || e.key === 'numpadminus')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        };
        
        // Prevent context menu zoom
        const handleContextMenu = (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        };
        
        // Add event listeners with passive: false to allow preventDefault
        containerRef.current.addEventListener('wheel', handleWheel, { passive: false });
        containerRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
        containerRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
        containerRef.current.addEventListener('touchend', handleTouchEnd, { passive: false });
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('contextmenu', handleContextMenu);
        
        // Force scale to 1
        const forceScale = () => {
          if (containerRef.current) {
            containerRef.current.style.transform = 'scale(1)';
            containerRef.current.style.transformOrigin = 'center center';
          }
        };
        
        // Monitor for zoom changes
        const observer = new MutationObserver(forceScale);
        observer.observe(document.body, { 
          attributes: true, 
          attributeFilter: ['style', 'class'],
          subtree: true 
        });
        
        // Cleanup function
        return () => {
          if (containerRef.current) {
            containerRef.current.removeEventListener('wheel', handleWheel);
            containerRef.current.removeEventListener('touchstart', handleTouchStart);
            containerRef.current.removeEventListener('touchmove', handleTouchMove);
            containerRef.current.removeEventListener('touchend', handleTouchEnd);
          }
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('contextmenu', handleContextMenu);
          observer.disconnect();
        };
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove the script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden"
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        transform: 'scale(1)',
        transformOrigin: 'center center'
      }}
    >
    </div>
  );
} 