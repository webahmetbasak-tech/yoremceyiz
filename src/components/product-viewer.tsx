'use client';
import Image from 'next/image';
import { useRef, useState, useSyncExternalStore } from 'react';
const subscribe = () => () => {};

export function ProductViewer({ image, name }: { image:string; name:string }) {
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [open,setOpen] = useState(false);
  const [zoom,setZoom] = useState(false);
  const close = () => { dialog.current?.close();setOpen(false);setZoom(false);opener.current?.focus(); };
  return <div className="product-viewer">
    <button className="product-viewer-open" disabled={!ready} ref={opener} onClick={()=>{setOpen(true);dialog.current?.showModal();}} aria-label={`${name} görselini büyüt`}>
      <Image src={`/media/${image}.webp`} alt={`${name}, tam boy görünüm`} fill sizes="(max-width:700px) 90vw, 52vw" quality={85} priority/>
      <span>GÖRSELİ BÜYÜT <span aria-hidden="true">＋</span></span>
    </button>
    <dialog ref={dialog} className="product-lightbox" aria-label={`${name} görsel inceleme`} onCancel={event=>{event.preventDefault();close();}} onClick={event=>{if(event.target===event.currentTarget)close();}} onKeyDown={event=>{
      if(event.key!=='Tab')return;
      const focusable=event.currentTarget.querySelectorAll<HTMLElement>('button,[tabindex="0"]');
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
    }}>
      <div className="lightbox-toolbar"><p>{name}</p><div><button onClick={()=>setZoom(!zoom)} aria-pressed={zoom}>{zoom?'TAM GÖRÜNÜM':'YAKINLAŞTIR ＋'}</button><button onClick={close} autoFocus aria-label="Görseli kapat">KAPAT ×</button></div></div>
      <div className={`lightbox-canvas ${zoom?'is-zoomed':''}`} tabIndex={0} aria-label="Ürün fotoğrafı; yakınlaştırıldığında kaydırarak inceleyebilirsiniz">
        {open && <Image src={`/media/${image}.webp`} alt={`${name}, yüksek çözünürlüklü görünüm`} width={1600} height={2200} unoptimized/>}
      </div>
    </dialog>
  </div>;
}
