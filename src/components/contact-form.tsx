'use client';
import { useState } from 'react';
import { Arrow } from './identity';
import { products } from '@/lib/site';
export function ContactForm({ email, whatsapp, initialProduct }: { email: string | null; whatsapp: string | null; initialProduct: string }) {
  const [summary, setSummary] = useState('');
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const product = products.find(p => p.slug === data.get('design'));
    setSummary(`Yörem Çeyiz — Görüşme notu\n\nİsim: ${data.get('name')}\nİlgi alanı: ${product?.name || 'Bindallı / Dikiş / Nakış'}\n\n${data.get('message')}`);
  }
  function download() {
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'yorem-ceyiz-gorusme-notu.txt'; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <div className="contact-form-wrap"><form onSubmit={submit} className="contact-form"><p className="eyebrow">GÖRÜŞMEYE HAZIRLIK</p><h2>Aklınızdaki <em>tasarım.</em></h2><label htmlFor="name">Adınız<input id="name" name="name" autoComplete="given-name" required maxLength={80} placeholder="Adınız"/></label><label htmlFor="design">İlginizi çeken<select id="design" name="design" defaultValue={initialProduct}><option value="">Birlikte karar verelim</option>{products.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}</select></label><label htmlFor="message">Bize anlatmak istedikleriniz<textarea id="message" name="message" required minLength={10} maxLength={2000} rows={4} placeholder="Renk, motif veya aklınızdaki bir detay…"/></label><p className="form-privacy">Bu bilgiler bu sayfada kalır. Notunuzu hazırlamak herhangi bir mesaj göndermez.</p><button type="submit" className="text-link">GÖRÜŞME NOTUNU HAZIRLA <Arrow/></button></form><div aria-live="polite">{summary && <div className="contact-result"><h3>Notunuz hazır.</h3><p>Henüz gönderilmedi. {email || whatsapp ? 'Aşağıdan tercih ettiğiniz iletişim kanalını açabilirsiniz.' : 'Notunuzu indirip atölye görüşmenizde kullanabilirsiniz.'}</p><pre>{summary}</pre><div className="result-actions">{email && <a className="text-link" href={`mailto:${email}?subject=${encodeURIComponent('Bindallı hakkında görüşme')}&body=${encodeURIComponent(summary)}`}>E-POSTADA AÇ <Arrow/></a>}{whatsapp && <a className="text-link" target="_blank" rel="noreferrer" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(summary)}`}>WHATSAPP’TA AÇ <Arrow/></a>}<button onClick={download} className="text-link">NOTU İNDİR <Arrow/></button></div></div>}</div></div>;
}
