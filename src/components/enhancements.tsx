'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
export function Enhancements() {
  const cursor = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); } }), { threshold: .12 });
    items.forEach(item => { item.classList.add('will-reveal'); observer.observe(item); });
    return () => { observer.disconnect(); items.forEach(item => item.classList.remove('will-reveal')); };
  }, [pathname]);
  useEffect(() => {
    const query = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let magnet: HTMLElement | null = null;
    const reset = () => { if (cursor.current) cursor.current.style.opacity = '0'; if (magnet) magnet.style.translate = ''; magnet = null; };
    const move = (e: PointerEvent) => {
      if (!query.matches || !cursor.current) return reset();
      const media = (e.target as HTMLElement).closest('[data-cursor]');
      const link = (e.target as HTMLElement).closest<HTMLElement>('.text-link');
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!cursor.current) return;
        cursor.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursor.current.style.opacity = media ? '1' : '0';
        if (magnet && magnet !== link) magnet.style.translate = '';
        magnet = link;
        if (link) { const rect = link.getBoundingClientRect(); link.style.translate = `${((e.clientX - rect.left) / rect.width - .5) * 4}px ${((e.clientY - rect.top) / rect.height - .5) * 4}px`; }
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', reset); query.addEventListener('change', reset);
    return () => { reset(); cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', reset); query.removeEventListener('change', reset); };
  }, []);
  return <div className="custom-cursor" ref={cursor} aria-hidden="true"><span>İNCELE ↗</span></div>;
}
