# Son QA raporu

**Son tasarım turu — test bekliyor:** Renk bölümü kaldırıldı; ana sayfa galerisi altı ürünlü sabit 3 × 2 vitrine dönüştü; tüm sayfalara bordo–altın tema ve GSAP/SVG süsleme hareketleri eklendi. Kullanıcının açık talebiyle bu turda test, lint, typecheck, build veya tarayıcı denetimi çalıştırılmadı. Aşağıdaki başarılı sonuçlar önceki sürüme aittir. Eski yatay galeri ve dört renk senaryoları yeni tasarıma göre sonraki test turunda güncellenmelidir.

**1 Ekim 2026, son tur:** Ürün odaklı yeni düzen üretim sürümünde **26/26 testten geçti**. Son başlangıç-etkileşimi düzeltmesi ayrıca doğrulandı. Araştırma, güncel kalite ayarları ve doğrulama kapsamı [COUTURE-REVISION.md](COUTURE-REVISION.md) içindedir. WhatsApp numarası ve kesin adres henüz sağlanmadığı için gerçek işletme iletişimi tamamlanmış değildir. Aşağıdaki kayıtlar önceki tasarım turlarına aittir.

En son anasayfa revizyonu: **22/22 test**, ayrıca Chromium/WebKit ile **13/13 ekran düzeni** başarılı. Beş yeni rengin anasayfa sunumu, Kütahya kompozisyonu, başlık görünürlüğü, yatay telefon galerisi ve erken video yüklemesinin ayrıntılı sonuçları [HOME-REVISION.md](HOME-REVISION.md) içindedir. Aşağıdaki önceki koleksiyon turu tarihsel kayıttır; güncel performans ölçümleri yeni rapordadır.

## Ortam

Windows, Node.js 24.18.0, Next.js 16.3.7, React 19.3.0, TypeScript 6.0.3, Playwright 1.63.0. Tarih: 30 Eylül 2026. Kontroller localhost üretim derlemesi üzerinde yapılır.

## Mühendislik

- `npm run build`: başarılı; 23 statik çıktı, dinamik iletişim sayfası, on iki önceden üretilmiş tasarım rotası.
- `npm run typecheck`: başarılı.
- `npm run lint`: sıfır hata ve uyarı.
- npm bağımlılık denetimi: kurulum anında 0 bilinen güvenlik açığı raporlandı.
- Tüm üretim medya dosyaları projede; dış hotlink, stok görsel ve çalışma anında Google Fonts isteği yok.

## Tarayıcı kapsamı

`npm test` sekiz genişliği (1920, 1440, 1366, 1024, 768, 430, 390, 360) on yedi içerik rotasında kontrol eder. Ayrıca sinematik hikâyenin ilerlemesi ve geri dönüşü, akıştan çıkışı, mobil menü odağı/Escape, azaltılmış hareket, yatay koleksiyon hareketi ve kontrolleri, manifesto filminin sessiz otomatik oynatma/durdurma davranışı, on iki tasarımlı arşiv, tasarımdan iletişime seçim aktarımı, not oluşturma/indirme, dokunma emülasyonu, medya yüklenmesi, sosyal metadata, 404 ve axe WCAG 2.2 AA kuralları kontrol edilir.

Nihai tam çalışma: **22/22 başarılı** (1.2 dakika). On yedi içerik rotasında axe ihlali: **0**. İstenmeyen yatay taşma, eksik görsel ve JavaScript sayfa hatası tespit edilmedi. On iki ürünlü koleksiyon, dört yeni ürün rotası, ana sayfadaki dört kartlı renk atlası, mobil dokunma, yatay galeri, film kontrolü, odak döngüsü, Escape, seçim aktarımı ve not indirme doğrulandı. Son hedefli kontrolde altı yatay galeri görselinin kaydırmadan önce eager yüklendiği doğrulandı.

Ekran görüntüleri: `output/qa/home-revision/`, `output/qa/revision/collection-twelve-desktop.png`, `collection-new-colors-desktop.png`, `collection-new-colors-mobile.png`, `hero-for-desktop.png`, `atolye-atalia-desktop.png` ve `atolye-atalia-mobile.png`. Masaüstü/mobil hero, manifesto filmi, yatay galeri, Dikiş / Nakış bölümü, on ikili koleksiyon, yeni ürünler ve atölye sayfası görsel olarak incelendi. Görsel üretim kontrolü: `output/qa/campaign-contact-sheet.jpg`. Playwright HTML raporu: `playwright-report/index.html`. 22 testlik tam kapsam `tests/home.spec.ts` ile `tests/site.spec.ts` içindedir.

İlk turlarda saptanan ve düzeltilenler: font paket yolları, mobil diyalogdaki Tab döngüsü, krem/paper zeminde yardımcı metin kontrastı, hero karelerinin kademeli yüklenmesi. Hero testinin durakları crossfade ortasından sahnenin tam görünür olduğu noktaya taşındı; geçişin kendisi hata değildi.

## Performans gözlemi

`node scripts/performance-check.mjs` çıktısı: `output/qa/performance.json`.

| Profil | LCP | CLS | İlk yüklenen JS | Kaynak aktarımı |
| --- | ---: | ---: | ---: | ---: |
| 1440px, localhost, sınırsız ağ, boş tarayıcı önbelleği | 172 ms | 0.00135 | 200,110 B | 513,801 B |
| 390px, 4× CPU, 1.6 Mbps / 150ms, boş tarayıcı önbelleği | 980 ms | 0 | 200,110 B | 438,610 B |

Sunucu tarafı görüntü önbelleği sıcaktır. Tek yerel laboratuvar gözlemidir; production CDN, soğuk edge, gerçek cihaz veya saha p75 sonucu değildir. Kaynak toplamı Performance Resource Timing toplamıdır; ana HTML navigation transferini içermez. INP ölçülmedi. Saha hedefleri LCP ≤2.5s, CLS ≤0.1, INP ≤200ms olarak kalır.

## Gerçek kalan bağımlılıklar

1. Doğrulanmış telefon/e-posta/WhatsApp/adres/alan adı verilmedi. Yapılandırma `.env.example` içinde; eksik alanlar kamuya uydurularak yayımlanmaz. Alan adı olmadan indeksleme kapalıdır.
2. Koleksiyon filmi kullanıcı tarafından sağlandı ve web için optimize edildi. Ana hero için ayrı hareketli klipler üretilmedi; hero mevcut sabit karelerle çalışır ve isteğe bağlı ileri üretim şartnamesi `ASSET-GENERATION.md` içindedir.
3. Gerçek ürün arka fotoğrafları ve kumaş/teknik/ölçü/fiyat/stok doğrulaması yok. Ön görünüm ve aynı tasarımın detay kırpımları vardır; bunlar AI kampanya çalışması olarak açıklanır.
4. Fiziksel cihaz, Safari/Firefox, ekran okuyucu ve gerçek saha performansı bu ortamda doğrulanmadı. axe sonucu tek başına tam WCAG uygunluk belgesi değildir.

Tasarım veya kod için Figma devri gerekmez. Site yerel olarak çalışır; canlı yayına gönderilmemiştir.
