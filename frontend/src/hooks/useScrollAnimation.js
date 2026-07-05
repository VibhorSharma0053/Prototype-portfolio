import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook for scroll-triggered animations with Intersection Observer
 */
export const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;

  const callbackFn = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFn, {
      threshold,
      rootMargin,
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [callbackFn, threshold, rootMargin]);

  return [ref, isVisible];
};
