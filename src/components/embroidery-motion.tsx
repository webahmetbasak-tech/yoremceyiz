'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function EmbroideryMotion() {
  const pathname = usePathname();
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    // The server-rendered content stays visible, even before GSAP is available.
    import('gsap').then(({ gsap }) => {
      if (disposed) return;
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {});
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            context.add(() => {
              if (entry.target.matches('.embroidery-seal')) {
                const paths = entry.target.querySelectorAll<SVGPathElement>('[data-gold-line]');
                paths.forEach((path, index) => {
                  const length = path.getTotalLength();
                  gsap.fromTo(path, { strokeDasharray:length, strokeDashoffset:length }, { strokeDashoffset:0, duration:1.5, delay:index*.09, ease:'power2.out', clearProps:'strokeDasharray,strokeDashoffset' });
                });
              } else {
                gsap.fromTo(entry.target, { y:20 }, { y:0, duration:.85, ease:'power3.out', clearProps:'transform' });
              }
            });
          });
        }, { threshold:.08 });
        document.querySelectorAll('.embroidery-seal,[data-couture-card],.journal-heading,.process-row,.story-section').forEach(element => observer.observe(element));
        return () => { observer.disconnect(); context.revert(); };
      });
      cleanup = () => media.revert();
    }).catch(() => { /* Decorative motion is optional; content remains available. */ });
    return () => { disposed = true; cleanup?.(); };
  }, [pathname]);
  return null;
}
