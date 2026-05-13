"use client";

import { useEffect, useState, useRef } from 'react';

interface CounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  start?: number;
}

export default function Counter({ target, duration = 2000, prefix = "", suffix = "", start = 0 }: CounterProps) {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const nextCount = Math.floor(easeProgress * (target - start) + start);
      
      if (countRef.current !== nextCount) {
        setCount(nextCount);
        countRef.current = nextCount;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration, start]);

  return (
    <span ref={elementRef}>
      {prefix}{count}{suffix}
    </span>
  );
}
