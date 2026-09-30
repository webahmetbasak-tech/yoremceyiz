# Medya manifesti ve üretim şartnamesi

## Teslim edilen görüntüler

Yerleşik imagegen aracı kullanıldı; CLI/API fallback kullanılmadı. İlk dokuz görsel aynı art direction istemiyle üretildi. Dikiş / Nakış bölümü için kullanıcının atölye ve nakış kareleri referans alınarak bir ek makro üretildi. Koleksiyon için Safir, Yakut, Mürdüm, Fildişi ve Petrol renklerinde beş tam boy bindallı portresi daha üretildi. Gerçek fotoğraf veya doğrulanmış ürün kataloğu değildir. Tam **fiilen kullanılan** ilk istemler `public/media/manifest.json`, kürasyon ve dikiş makrosu `public/media/collection/manifest.json`, beş yeni ürünün çıktı yolları ve son istem seti `public/media/product-generation-manifest.json` içinde saklanmıştır. Orijinal PNG dosyaları `assets/masters/` altında teslim edilir.

| Dosya (`public/media/`) | Kullanım | Masaüstü | Mobil |
| --- | --- | --- | --- |
| thread-macro.webp | Hero 01, atölye süreç 01 | 1672 × 941 | 750px genişlik, aynı oran |
| needle-embroidery.webp | Hero 02, atölye süreç 02 | 1672 × 941 | 750px genişlik, aynı oran |
| velvet-macro.webp | Hero 03, manifesto, nakış arası | 1672 × 941 | 750px genişlik, aynı oran |
| craft-details.webp | Hero 04, atölye, hikâye, iletişim | 1672 × 941 | 750px genişlik, aynı oran |
| bindalli-burgundy.webp | Hero 05, bordo ürün, kapanış | 1024 × 1536 | 750 × 1125 |
| bindalli-black.webp | Siyah ürün ve seçki | 1024 × 1536 | 750 × 1125 |
| bindalli-emerald.webp | Zümrüt ürün ve seçki | 1024 × 1536 | 750 × 1125 |
| atelier.webp | Ana sayfa ve atölye | 1672 × 941 | 750px genişlik, aynı oran |
| embroidered-signature.webp | İmza anı | 1672 × 941 | 750px genişlik, aynı oran |
| hero-for.webp | Hero 04, yoğun bordo/altın nakış detayı | 1376 × 768 | 750px genişlik, aynı oran |
| atalia.webp | Atölye sayfası, altın iplik makaraları | 1376 × 768 | 750px genişlik, aynı oran |
| yorem-ceyiz-mavi-web.webp | Mavi Bahar ürünü ve ana sayfa seçkisi | 768 × 1024 | 750px genişlik, aynı oran |
| yorem-ceyiz-kirmizi-web.webp | Kırmızı Lale ürünü ve ana sayfa seçkisi | 768 × 1024 | 750px genişlik, aynı oran |
| yorem-ceyiz-bordo-web.webp | Bordo Bahar ürünü | 1122 × 1402 | 750px genişlik, aynı oran |
| yorem-ceyiz-yesil-web.webp | Yeşil Lale ürünü | 1122 × 1402 | 750px genişlik, aynı oran |

Mobil dosya adları `-mobile.webp` ekini alır. Kesin boyutlar manifestten okunmalıdır. Arayüz Next Image `sizes` ile ek genişlikleri üretir; görsel odak ve kırpım responsive CSS ile yönetilir. İlk hero karesi preload edilir, diğer görseller lazy yüklenir. Karanlık materyal zemini boyutları yüklemeden önce ayırır.

## Teslim edilen koleksiyon filmi

Kullanıcının `assets/collection/videos.mp4` kaynağı manifesto ile koleksiyon arasındaki büyük, tam genişlikli film sahnesinde kullanıldı. Teslim dosyaları `atelier-film.mp4` (H.264, 1.44 MB) ve `atelier-film.webm` (VP9, 1.17 MB); her ikisi de 1280×720, 24 fps ve 10 saniyedir. Kaynaktaki ses kanalı tamamen çıkarıldı. Video yalnızca görünürken sessiz ve inline oynar, görünürlük dışına çıkınca durur; poster fallback ve görünür oynat/duraklat kontrolü vardır. Hareket azaltma tercihinde otomatik oynatılmaz.

## Hero için isteğe bağlı ileri video üretimi

Ana hero deneyimi hâlâ özgün sabit kareleri kaydırmaya bağlı çapraz geçiş, ölçek ve SVG iplik ile anlatır. Aşağıdaki klipler ileride hero sahnelerini gerçek hareketli çekimlerle değiştirmek istenirse kullanılacak üretim şartnamesidir; mevcut sitenin çalışmasına engel değildir.

Her klip için ortak teslim:

- Masaüstü: `public/media/hero/{name}-desktop.mp4` + `.webm`, 1920×1080, 16:9, 24 fps, 5 saniye, sessiz. H.264 MP4 ≤2.5 MB, VP9 WebM ≤2 MB hedefi.
- Mobil: `{name}-mobile.mp4` + `.webm`, 720×1280, 9:16, 24 fps, 4 saniye, sessiz. ≤1.2 MB hedefi. Masaüstünden rastgele kesim yerine aşağıdaki konu yerleşimini koruyan ayrı kadraj.
- Poster: `public/media/posters/{name}-desktop.webp` 1920×1080; `{name}-mobile.webp` 720×1280, ilk anlamlı kare.
- Renk: bordo #5A101D, altın #B8924F, ceviz #17110D, 2700K yan ışık, doğal derin gölgeler. Referans olarak teslim edilmiş aynı adlı WebP dosyası kullanılmalı.
- Malzeme: gerçek kadife havı, metalik iplik telleri, yaşanmış ahşap; plastik veya dijital kumaş görünümü yok.
- Ortak negatif istem: faces, people, hands, mannequin heads, crowns, palaces, retail displays, tourist styling, extra sleeves, malformed garment, broken embroidery, impossible sewing mechanism, warped scissors, floating objects, fantasy assembly, text, watermark, flicker, melting surfaces, sudden exposure changes, oversaturated gold.

### 01 — thread-macro

Final prompt: Cinematic extreme macro film of one metallic antique-gold embroidery thread lying in an elegant arc on dark burgundy velvet, matching thread-macro.webp. 100mm macro lens, f/2.8, extremely shallow depth of field. Slow 3cm lateral camera slide along the thread, revealing true twisted fibers. Warm 2700K grazing key light, near-black walnut shadows. No moving objects; camera movement only. Dark negative space on the left 50 percent for interface type. Mobile: thread in upper right, lower left 45 percent dark. Physically believable textures, no magic or particles. Apply common negative prompt.

Kullanım: hero %0–20. İplik hareketi bir sonraki iğne kadrajına sağdan bağlanır.

### 02 — needle-embroidery

Final prompt: Photoreal macro film of a mechanically correct professional embroidery machine needle and presser foot stitching metallic gold botanical motif on deep burgundy velvet, matching needle-embroidery.webp. 100mm macro lens, f/4. Locked camera, restrained rhythmic needle movement, fabric advances millimetres in synchrony. 2700K brass side lighting, dark walnut ambience. No person or hands. Desktop needle at 65 percent horizontal position with left negative space. Mobile needle in upper third; embroidery descends diagonally into center. Preserve plausible machine geometry. Apply common negative prompt.

Kullanım: hero %20–40. İğneden çıkışta son yaprak motifi sonraki kadife sahnesine match cut olur.

### 03 — velvet-macro

Final prompt: Extreme macro editorial film of raised antique gold leaf-and-stem embroidery on burgundy velvet, matching velvet-macro.webp. 100mm macro lens f/4; slow 6cm pullback, one continuous physical embroidery pattern. Raking 2700K light picks out metallic filaments and velvet pile without changing exposure. No growing fantasy embroidery. Desktop motif concentrated on right, dark left. Mobile motif across upper two thirds, dark bottom for text. Apply common negative prompt.

Kullanım: hero %40–60 ve nakış arası. Son kare motiften çalışma masasına bağlanır.

### 04 — craft-details

Final prompt: Editorial close film of walnut tailoring table with cut burgundy embroidered velvet, cream pattern paper, one realistic closed brass tailor's scissors, thread cone and measuring tape, matching craft-details.webp. 50mm lens f/4, slow overhead-to-oblique 8 degree camera move with stable objects, warm brass task lamp 2700K, deep shadows. No assembly animation, no hands. Desktop composition weighted right, mobile centered tools with quiet lower third. Apply common negative prompt.

Kullanım: hero %60–80. Masa üzerinden geriye çekilme son giysi açısını ima eder.

### 05 — bindalli-reveal

Final prompt: Cinematic 5-second controlled camera pullback from the embroidered neckline of the exact burgundy bindallı in bindalli-burgundy.webp to the complete floor-length garment, naturally hanging from a dark walnut hanger on brass rail. No mannequin, body, face or person. Maintain identical two sleeves, embroidery and garment geometry. Authentic warm working atelier around it: walnut drawers, aged brick, vintage black sewing machine, modern machine and overlock in soft focus, folded velvet, thread cones, pattern paper. 50mm lens, f/4, 2700K rim light with soft fill. Minimal believable fabric movement. Desktop garment center-right, left third dark. Mobile entire hem and hanger visible, central composition with lower text-safe zone. Apply common negative prompt.

Kullanım: hero %80–100. Son kare logo ve koleksiyona geçişte sabit tutulur.

Entegrasyon: yalnızca aktif sahne ve bir sonraki sahne yüklenmeli; `muted`, `playsInline`, poster ve `onError` ile mevcut WebP'ye dönüş kullanılmalı. Hareket azaltmada video yüklenmemeli. Otomatik ses yok. Teslim öncesi cihaz testleriyle bant genişliği bütçesi doğrulanmalı.

## Alternatif ürün açıları

Mevcut ürünlerde tam ön görünüm ve aynı görselden yaka/etek yakın planları teslim edildi. Arka görünüm, doğrulanmamış ürün yapısını gerçekmiş gibi üretmemek için yayımlanmadı. Gerçek ürün örneğiyle aşağıdaki şartname kullanılmalıdır.

Her `bordo`, `siyah`, `zumrut` için: `public/media/collection/{renk}-back.webp` 1200×1800 2:3, mobil `-back-mobile.webp` 750×1125; `{renk}-detail.webp` 1600×1200 4:3 ve `-detail-mobile.webp` 750×563. Kaynak fotoğraf olmadan gerçek stok belgesi olarak etiketlemeyin.

Final back-view prompt: Editorial studio-at-atelier photograph of the BACK of the supplied verified Yörem Çeyiz bindallı reference garment, preserving its exact velvet color, seam construction, two sleeves and embroidery placement. Entire hem and single dark walnut hanger visible; no mannequin or person. 85mm lens, f/5.6, 2700K warm side light, dark walnut and aged brick softly out of focus. Centered 2:3 portrait. Do not extrapolate or invent a back motif without an actual back reference. Apply the common negative prompt.

Final detail prompt: 100mm macro photograph of the supplied verified garment's actual neckline embroidery and velvet pile. Preserve exact motif, stitch technique and color. 4:3 diagonal detail with raking 2700K brass light and shallow depth of field. No invented text, hands or new ornamental elements. Apply the common negative prompt.

## Marka dosyaları

`public/media/logo/`: primary.svg, compact.svg, emblem.svg, navigation.svg, footer.svg, monochrome.svg, gold-on-dark.svg, dark-on-cream.svg, social-mark.svg, social-preview.png, app-icon.png, thread.svg, kutahya-motif.svg. Favicon: `src/app/icon.svg`. Nakışlı imza: `public/media/embroidered-signature.webp`. Ok, yükleme için kullanılabilir iplik amblemi ve UI çizgileri `identity.tsx` içinde de yer alır.
