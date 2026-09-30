# Yörem Çeyiz

Türkçe, editoryal bindallı ve nakış sitesi. Next.js App Router, React, TypeScript, CSS ve yalnızca sinematik girişte dinamik yüklenen GSAP/ScrollTrigger. Temel içerik sunucuda oluşturulur; ana sayfa ve koleksiyon sayfaları önceden üretilir.

## Çalıştırma

Node.js 20.9 veya üzeri gerekir. Bu projede Node 24 ile doğrulanmıştır.

```sh
npm ci
npm run dev
```

Yerel adres: http://localhost:3000

```sh
npm run lint
npm run typecheck
npm run build
npm run start
npm test
```

Tarayıcı yüklü değilse: `npx playwright install chromium`. Testler üretim derlemesini kullanır; önce `npm run build` çalıştırın.

## Sayfalar

- `/`: beş aşamalı, doğal ve geri alınabilir kaydırma hikâyesi; manifesto, koleksiyon, atölye, nakış, Kütahya, imza ve kapanış.
- `/koleksiyon`: on iki tasarımlı editoryal arşiv.
- `/koleksiyon/[slug]`: Bordo, Siyah, Zümrüt, Safir, Yakut, Mürdüm, Fildişi, Petrol, Mavi Bahar, Kırmızı Lale, Bordo Bahar ve Yeşil Lale tasarımlarının detayları, yakın planları ve ilgili seçkisi.
- `/atolye`: üretim sürecinin anlatımı.
- `/hikayemiz`: yalnızca verilen marka ve yer bilgilerine dayanan hikâye.
- `/iletisim`: yapılandırılmış iletişim kanalları ve cihazda hazırlanan görüşme notu.

## İçerik ve yayın ayarları

`.env.example` dosyasını `.env.local` olarak kopyalayın ve yalnızca doğrulanmış bilgileri girin. Eksik telefon, e-posta, adres ve sosyal hesaplar arayüzde gösterilmez. Alan adı girilmediğinde `robots.txt` indekslemeyi engeller; sitemap boş kalır. `NEXT_PUBLIC_SITE_URL` HTTPS üretim alan adı olarak girilince canonical, sitemap ve indeksleme açılır. Bu değişikliklerden sonra yeniden derleyin.

Ürün ve marka verileri: `src/lib/site.ts`. Gerçek kumaş içeriği, teknik, stok, fiyat, kurucu veya kuruluş tarihi uydurulmamıştır. Kampanya görselleri yapay zekâyla bu proje için üretilen tasarım görselleridir; stok veya gerçek atölye fotoğrafı olarak sunulmaz. Ürün sayfalarındaki yakın planlar aynı tasarımın kırpımlarıdır. Gerçek ürün doğrulaması gelmeden Product/Offer/Review şeması yayımlanmaz.

İletişim formu sunucuya veri göndermez ve veri saklamaz. Önce bir not oluşturur. Kullanıcı notu indirebilir; doğrulanmış kanal ayarlanmışsa e-posta/WhatsApp uygulamasını açabilir. Gönderimi bu uygulamada kullanıcı tamamlar. Sahte başarı bildirimi yoktur.

## Tasarım ve mimari

- `src/app/globals.css`: renk, yazı, boşluk değişkenleri ve masaüstü/tablet/mobil düzenler.
- `src/components/hero-experience.tsx`: 480svh masaüstü / 280svh mobil sahne. GSAP yaşam döngüsü `matchMedia` ve context temizliğiyle yönetilir.
- `src/components/atelier-film.tsx`: manifesto sonundaki tam genişlikli, görünürlüğe bağlı sessiz film sahnesi ve erişilebilir oynat/duraklat kontrolü.
- `src/components/collection-showcase.tsx`: masaüstünde dikey kaydırmanın sabit sahne içinde yatay galeriye dönüştüğü altı panellik seçki; mobilde dokunmatik yatay galeri ve erişilebilir önceki/sonraki kontrolleri.
- `src/components/editorial.tsx`: dikişin yapısını ve nakışın imzasını anlatan yeni Dikiş / Nakış bölümü dahil editoryal ana sayfa bölümleri.
- `src/components/site-header.tsx`: native dialog ile odak sınırı, Escape, kapatma ve odağı geri verme.
- `src/components/identity.tsx`: özgün botanik iplik amblemi, ok, iplik ve geometrik motifler.
- `public/media`: ana kampanya ailesi, dokuz renk portresi, kullanıcı fotoğrafları ve hafif mobil sürümleri. Next Image responsive kaynakları otomatik seçer.
- `public/media/logo`: SVG marka ailesi, sosyal paylaşım görseli ve uygulama simgesi.
- `tests/site.spec.ts`: üretim rotaları, sekiz viewport, hareket azaltma, diyalog, koleksiyon, iletişim, medya ve axe kontrolleri.

Fontlar yerel paketlerden servis edilir: Cormorant Garamond ve Manrope (OFL). Çalışma anında Google Fonts veya stok görsel sunucusuna istek yoktur. Kullanıcıya yapay bekleme yaratmamak için bloklayan bir preloader yoktur; ilk kare öncelikli yüklenir. Native imleç korunur, görsel bağlantılarda küçük ek inceleme etiketi kullanılır.

`prefers-reduced-motion` etkinse tüm sahneler normal akışta görünür; pin, parallax, imleç ve animasyonlar kapanır. JavaScript olmadan temel metin, ilk hero karesi, sayfalar ve bağlantılar görünür. Kaydırma hijack edilmez; Lenis/WebGL gerekli görülmediği için eklenmemiştir.

## Medya üretimi

İlk dokuz özgün fotoğraf ailesi yerleşik imagegen aracıyla üretildi. Kullanıcının `assets/collection/` klasörüne eklediği kampanya arşivi ile Mavi, Kırmızı, Bordo ve Yeşil ürün fotoğrafları ayrıca kürate edilip optimize edildi. `hero-for` ana hikâyenin dördüncü sahnesinde, `atalia` atölye sayfasında kullanılır. Video ses kanalı çıkarılarak MP4/WebM biçimlerine dönüştürüldü; görünür değilken oynatılmaz. Yeni Dikiş / Nakış bölümü için bir ek dikiş makrosu, koleksiyon için Safir, Yakut, Mürdüm, Fildişi ve Petrol renklerinde beş tam boy bindallı portresi imagegen ile üretildi. Kaynaklar ve istem kayıtları `public/media/manifest.json`, `public/media/collection/manifest.json` ve `public/media/product-generation-manifest.json` içindedir.

`node scripts/prepare-media.mjs` yalnızca orijinal üretim PNG'leri mevcutsa yeniden dönüştürür. Normal build bu betiği gerektirmez. `node scripts/prepare-identity.mjs` vektör kimliği ve PNG simgeleri yeniden üretir.

İsteğe bağlı hero videoları ve doğrulanmış ürün referanslarıyla üretilecek alternatif açılar için şartname: [docs/ASSET-GENERATION.md](docs/ASSET-GENERATION.md). Görsel yön ve kaynak ilkeleri: [docs/ART-DIRECTION.md](docs/ART-DIRECTION.md). Test sonuçları ve yayın öncesi kalanlar: [docs/QA.md](docs/QA.md).
