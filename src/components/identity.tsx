export function Emblem({ className = '' }: { className?: string }) {
  return <svg className={className} width="42" height="52" viewBox="0 0 60 72" fill="none" aria-hidden="true"><path d="M30 64V31M30 42C12 36 10 18 16 9c10 5 14 14 14 24C30 23 34 14 44 9c6 9 4 27-14 33ZM30 53C15 53 5 43 7 34c12 0 22 7 23 19Zm0 0c15 0 25-10 23-19-12 0-22 7-23 19Z" stroke="currentColor" strokeWidth="1.2"/><path d="M22 64h16M30 4v8" stroke="currentColor"/><circle cx="30" cy="3" r="1.5" fill="currentColor"/></svg>;
}
export function Wordmark({ footer = false }: { footer?: boolean }) {
  return <span className={footer ? 'wordmark wordmark-footer' : 'wordmark'}><Emblem/><span>Yörem Çeyiz<small>KÜTAHYA · BİNDALLI & NAKIŞ</small></span></span>;
}
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={diagonal ? 'arrow diagonal' : 'arrow'}><path d="M3 12h17m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.2"/></svg>;
}
export function Thread({ className = '' }: { className?: string }) {
  return <svg className={`gold-thread ${className}`} viewBox="0 0 1200 260" fill="none" aria-hidden="true"><path d="M-20 200C180 260 220 15 440 95S780 230 736 112C687-18 1040 240 1220 32" stroke="currentColor" strokeWidth="1"/><path d="M440 95c-37-61 14-81 25-46s-31 25-25 46" stroke="currentColor" strokeWidth=".65"/></svg>;
}
export function Motif() {
  return <svg className="heritage-motif" viewBox="0 0 180 180" fill="none" aria-hidden="true"><path d="m90 12 78 78-78 78L12 90 90 12Zm0 28 50 50-50 50-50-50 50-50Zm0 26 24 24-24 24-24-24 24-24ZM12 90h156M90 12v156" stroke="currentColor" strokeWidth=".7"/><circle cx="90" cy="90" r="65" stroke="currentColor" strokeWidth=".7"/></svg>;
}
