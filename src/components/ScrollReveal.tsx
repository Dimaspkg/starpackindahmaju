"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let targets: NodeListOf<Element> | null = null;

    const timer = setTimeout(() => {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      };

      const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      };

      observer = new IntersectionObserver(handleIntersect, observerOptions);
      targets = document.querySelectorAll('.reveal');
      
      targets.forEach((target) => {
        // Reset active state so reveal plays fresh when navigating/switching languages
        target.classList.remove('active');
        observer?.observe(target);
      });
    }, 100); // Small delay to guarantee DOM has finished updating

    return () => {
      clearTimeout(timer);
      if (observer && targets) {
        targets.forEach((target) => observer?.unobserve(target));
      }
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}
