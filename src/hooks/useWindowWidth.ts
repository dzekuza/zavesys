'use client';

import { useState, useEffect } from 'react';

export function useWindowWidth() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  return width;
}
