# Anasayfa kompozisyonu ve mobil medya revizyonu

## Son konsept: kavisli vitrin ve daha az görsel

Görsel yoğunluğu azaltmak için sekiz tekrarlı görsel anasayfa akışından çıkarıldı. Ayrı atölye, nakış arası ve marka fotoğrafı bölümleri birleştirildi; kapanış görseli yerine büyük tipografi ve SVG iplik çizgisi kullanıldı. Kaynak dosyalar ve diğer sayfalar korunur.

Yeni akış: hero → manifesto/film → yatay galeri → etkileşimli renk atlası → dikiş/nakış → atölye/Kütahya → tipografik kapanış → footer.

Kullanıcı kaynaklı Mavi Bahar, Kırmızı Lale, Bordo Bahar ve Yeşil Lale fotoğrafları yatay galeriden bağımsız dört kartlı bir renk atlasında sunulur. Her kart farklı köşe maskesi, ürün adı ve doğrudan detay bağlantısı taşır. Masaüstünde dört sütunlu şaşırtmalı kompozisyon, mobilde iki sütunlu akış kullanılır. Yatay koleksiyon galerisi kendi altı zanaat sahnesini korur ve görselleri sayfa açılışında eager yükler.

Vitrinde kemerli maske ve ince eğimli altın kontur; galeri ile dikiş/nakış karelerinde asimetrik köşe kavisleri; filmde yumuşak köşeler; Kütahya görselinde kemerli çerçeve uygulanır. Ürünlerin ana silüetleri korunur. Yeni görsel üretilmez veya indirilmez.

Konsept masaüstü ve mobil ekran görüntüleriyle incelendi; Chromium/WebKit denetiminde 13 ekran düzeni geçti. Güncel akışta her profilde 9 bölüm incelenir. Aşağıdaki değerlendirme önceki revizyonun kaydıdır; son tasarım için bu bölüm esas alınmalıdır.

## Tasarım değerlendirmesi

Anasayfanın malzeme, ürün ve zanaat anlatısı güçlüydü; yatay galerinin uzunluğu ritmi yavaşlatıyor, metinden oluşan Kütahya bölümü ise görsel akışı kesiyordu. Hızlı kaydırmada atölye ve nakış başlıklarının animasyon maskesi içinde kalabildiği de ekran görüntülerinde görüldü.

Uygulanan akış: sinematik hero → manifesto ve film → yatay koleksiyon → beş yeni renk → dikiş/nakış → atölye → nakış arası → görselli Kütahya → marka imzası → kapanış ve footer.

- Beş yeni renk ayrı bir anasayfa seçkisinde, masaüstünde beş sütun ve şaşırtmalı hizalama; mobilde iki sütun ve Petrol için son geniş satır olarak sunulur.
- Yatay galeri masaüstünde 650svh yerine 510svh ilerler. Kısa yatay telefonlarda ve azaltılmış harekette doğal yatay kaydırma kullanır.
- Kütahya bölümü atölye fotoğrafı, safir nakış detay kırpımı, başlık ve metinle yeniden düzenlendi.
- Atölye ve nakış başlıklarından görünürlüğü engelleyebilen maske tetikleyicisi kaldırıldı.
- Mobil filmde kadraj 4:3; metin görüntünün altında. Oynat/duraklat kontrolü görünür kalır.
- Diğer sayfa bileşenleri ve özgün koleksiyon varlıkları değiştirilmedi. Ek CSS yalnızca anasayfa bileşenlerini hedefler.

## Medya

- `public/media/home/`: beş portre için 720×1080; dört kullanıcı fotoğrafı için 720 px genişliğinde WebP. Mavi 109 KB, Kırmızı 113 KB, Bordo 118 KB, Yeşil 108 KB. Safir detay 480×612, 66 KB. Kaynaklar korunur. Yeniden üretim: `node scripts/prepare-home-media.mjs`.
- `public/media/collection/atelier-film-mobile.mp4`: 960×540, 24 fps, 10 saniye, H.264 Main, yuv420p, sessiz, faststart; 641,112 bayt. Önceki masaüstü MP4'ten %55.5 küçük.
- Mobil kaynağı seçme koşulu: en fazla 700px genişlik veya en fazla 600px yükseklik. Masaüstünde WebM ve MP4 kaynakları korunur.
- Sunucudan gelen HTML'deki `preload="auto"` sayesinde yükleme sayfa açılışında başlar; video görünürlüğe göre oynar ve durur. Kullanıcı duraklatması korunur; azaltılmış harekette otomatik oynatma yoktur.
- Tarayıcının preload ve güç tasarrufu politikaları aşılamaz. Tüm fiziksel mobil cihazlarda anında tam yükleme iddiası yoktur; poster ve elle oynatma kontrolü mevcuttur.

## Doğrulama

- Production build, ESLint ve TypeScript başarılı.
- Playwright: **22/22**, 1.2 dakika; 17 site rotasında axe ihlali yok.
- Ek anasayfa denetimi: **13/13 ekran/motor birleşimi**. Chromium: 320, 360, 390, 430, 768, 844 (yatay telefon), 1024, 1440, 1920. WebKit: 390, 430, 768, 844 (yatay telefon). Her birinde herodan footera 12 bölüm, taşma, görsel yüklenmesi ve video kontrolü denetlendi.
- Chromium'da 10 saniyelik filmin tamamının ilk kaydırmadan önce tamponlandığı doğrulandı. WebKit'te doğru kaynak, hazır durumu ve oynatma kontrolü geçti; Windows WebKit `buffered` aralığını 0 raporladı, tam tamponlama iddiasında kullanılmadı. Bunlar fiziksel iPhone/Safari testleri değildir.
- Son masaüstü/mobil kompozisyonlar görsel olarak incelendi. Görüntüler ve denetim çıktısı: `output/qa/home-revision/`.
- Yavaş mobil laboratuvar profili (390px, 4× CPU, 1.6Mbps, 150ms, boş tarayıcı önbelleği): LCP **1128 ms**, CLS **0**, kaynak aktarımı **1,150,139 bayt**. Masaüstü: LCP **240 ms**, CLS **0.00135**. Tek yerel ölçüm; sunucu görsel önbelleği sıcaktır, saha p75 ve INP ölçümü değildir.

Test komutları: `npm test`, `node scripts/audit-home.mjs`, `node scripts/performance-check.mjs`.
