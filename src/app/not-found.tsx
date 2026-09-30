import Link from 'next/link';
import { Emblem, Arrow } from '@/components/identity';
export default function NotFound() { return <section className="not-found gutter"><Emblem/><p className="eyebrow">404 — SAYFA BULUNAMADI</p><h1>İpliğin ucunu<br/><em>yeniden bulalım.</em></h1><Link className="text-link" href="/">ANA SAYFAYA DÖN <Arrow/></Link></section>; }
