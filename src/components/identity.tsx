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

export function EmbroiderySeal({ className = '' }: { className?: string }) {
  return <svg className={`embroidery-seal ${className}`} viewBox="0 0 200 240" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path data-gold-line d="M100 220V92M100 102C77 88 70 63 76 35l24 21 24-21c6 28-1 53-24 67ZM100 94c-9-22-11-51 0-77 11 26 9 55 0 77Z"/>
      <path data-gold-line d="M100 179c-42-9-72-41-65-77 7 23 31 13 39 37 7 20 16 30 26 40Zm0-28c30-5 58-25 65-60-32 10-51 26-65 60ZM100 204c-47-8-71-35-71-62M100 195c45-11 64-35 70-70"/>
      <path d="M72 139c-28 1-41-16-36-28m96 5c-1 23-13 29-25 32M87 213h26M84 224h32"/>
      <path data-gold-line d="M60 58c-33 18-48 63-38 103 10 35 38 59 61 70M140 58c33 18 48 63 38 103-10 35-38 59-61 70"/>
      <path d="m54 70-12-3 3 14m-21 46-11 9 12 5m121-71 12-3-3 14m21 46 11 9-12 5"/>
    </g><circle cx="100" cy="7" r="2" fill="currentColor"/><circle cx="100" cy="235" r="2" fill="currentColor"/>
  </svg>;
}
