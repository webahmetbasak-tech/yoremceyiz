'use client';
export default function ErrorPage({ reset }: { reset: () => void }) { return <section className="not-found gutter"><p className="eyebrow">KISA BİR ARA</p><h1>Bir şeyler<br/><em>ters gitti.</em></h1><button className="text-link" onClick={reset}>YENİDEN DENE ↗</button></section>; }
