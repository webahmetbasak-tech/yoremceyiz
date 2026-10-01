const branch = [
  'M18 76C92 76 120 53 181 53S282 69 385 50',
  'M74 70C55 59 58 43 72 35C70 51 85 58 74 70Z',
  'M128 57C112 42 119 27 135 23C128 39 141 48 128 57Z',
  'M188 54C176 38 186 24 202 23C191 37 202 48 188 54Z',
  'M246 59C234 44 244 31 260 30C249 42 259 53 246 59Z',
  'M306 58C294 43 304 31 319 30C309 43 319 52 306 58Z',
  'M97 73C81 87 65 82 59 69C73 76 84 65 97 73Z',
  'M159 61C148 77 132 76 124 64C139 68 146 55 159 61Z',
  'M220 59C209 75 193 73 186 62C200 66 208 53 220 59Z',
  'M279 61C267 76 252 73 245 62C259 66 267 55 279 61Z',
];

export function ThreadAlchemy() {
  return <section className="signature-ribbon" aria-label="Yörem Çeyiz, Kütahya">
    <svg className="signature-ribbon-branches" viewBox="0 0 1200 100" fill="none" aria-hidden="true">
      <g>{branch.map((d,i)=><path key={`left-${i}`} d={d}/>)}</g>
      <g transform="translate(1200 0) scale(-1 1)">{branch.map((d,i)=><path key={`right-${i}`} d={d}/>)}</g>
    </svg>
    <p className="signature-ribbon-name"><span>Yörem Çeyiz</span><i aria-hidden="true"/><small>KÜTAHYA</small></p>
  </section>;
}
