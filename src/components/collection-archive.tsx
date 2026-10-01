'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Media } from './media';
import { Arrow } from './identity';
import { products } from '@/lib/collection';
const categories=['Tümü','Bindallı','Yöresel takım','Gece elbisesi'] as const;
export function CollectionArchive(){
  const [category,setCategory]=useState<string>('Tümü');
  const visible=products.filter(p=>category==='Tümü'||p.category===category);
  return <section className="edition-archive gutter" id="tasarimlar" aria-label="Tasarım arşivi">
    <div className="archive-toolbar"><div role="group" aria-label="Tasarım türü">{categories.map(name=><button key={name} aria-pressed={category===name} onClick={()=>setCategory(name)}>{name}<sup>{name==='Tümü'?products.length:products.filter(p=>p.category===name).length}</sup></button>)}</div><p className="eyebrow" aria-live="polite">{String(visible.length).padStart(2,'0')} TASARIM</p></div>
    <div className="edition-archive-grid">{products.map(product=><Link hidden={category!=='Tümü'&&product.category!==category} href={`/koleksiyon/${product.slug}`} key={product.slug} className="archive-card edition-archive-card" data-cursor>
      <div className="edition-card-meta eyebrow"><span>{product.index}</span><span>{product.category}</span></div>
      <Media name={product.image} alt={`${product.name}, tam görünüm`} loading="eager" sizes="(max-width:700px) 44vw, (max-width:1100px) 44vw, 28vw"/>
      <div className="edition-card-copy"><div><h2>{product.name}</h2><p>{product.title}</p></div><Arrow diagonal/></div>
    </Link>)}</div>
  </section>;
}
