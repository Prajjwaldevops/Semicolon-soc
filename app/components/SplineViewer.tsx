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
        containerRef.current.appendChild(splineViewer);
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
    <div ref={containerRef} className="w-full h-full">
    </div>
  );
} 