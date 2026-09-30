'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/lib/site';
import { Emblem, Wordmark } from './identity';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    const element = dialog.current;
    if (!element || !open) return;
    const previous = document.body.style.overflow;
    const returnFocus = trigger.current;
    element.showModal(); document.body.style.overflow = 'hidden';
    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const items = element.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      const first = items[0]; const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    element.addEventListener('keydown', trap);
    return () => { element.removeEventListener('keydown', trap); element.close(); document.body.style.overflow = previous; returnFocus?.focus(); };
  }, [open]);
  const close = () => setOpen(false);
  const light = pathname !== '/' && pathname !== '/atolye' && !pathname.startsWith('/koleksiyon/');
  return <><header className={`site-header ${light ? 'on-paper' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
    <Link href="/" className="brand-link" aria-label="Yörem Çeyiz — Ana sayfa"><Wordmark/></Link>
    <nav className="desktop-nav" aria-label="Ana gezinme">{navigation.map((item) => <Link key={item.href} href={item.href} aria-current={pathname.startsWith(item.href) ? 'page' : undefined}>{item.label}{item.href === '/iletisim' && <span aria-hidden="true"> ↗</span>}</Link>)}</nav>
    <button className="menu-trigger" ref={trigger} onClick={() => setOpen(true)} aria-expanded={open} aria-controls="site-menu">MENÜ <span aria-hidden="true">☰</span></button>
  </header>
  <dialog className="site-menu" ref={dialog} id="site-menu" onCancel={close} aria-labelledby="menu-title">
    <div className="menu-top"><span id="menu-title">YÖREM ÇEYİZ</span><button onClick={close} aria-label="Menüyü kapat">KAPAT <span aria-hidden="true">×</span></button></div>
    <nav aria-label="Mobil gezinme">{navigation.map((item, i) => <Link key={item.href} href={item.href} onClick={close}><span>0{i + 1}</span>{item.label}</Link>)}</nav>
    <div className="menu-bottom"><Emblem/><span>BİR İPLİKLE BAŞLAR.<br/>Kütahya, Türkiye</span></div>
  </dialog></>;
}
