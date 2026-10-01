# Ürün odaklı deneyim — 1 Ekim 2026

## Tasarım kararı ve araştırma

Ana sayfa artık uzun bir animasyonu bitirmeyi gerektirmeden ürünü gösterir. Koyu ceviz ve parşömen zeminler, büyük serif yazı ve ince çerçeveler aynı görsel dili sürdürür. Ürün fotoğrafları üzerine metin bindirilmez; fotoğraflar tam görünür.

İncelenen referanslar:

- [Awwwards: The Art of Silk kaydı](https://www.awwwards.com/websites/%23600624/), [Studiogusto: proje açıklaması](https://www.studiogusto.com/project/the-art-of-silk): ürünü değiştirmeden sergileyen sade alan, kontrollü hareket ve koleksiyona odaklanma. Bu projeye uyarlanan karar bir 3D uygulama değil; tam silüet, kontrollü galeri ve hafif bir açılıştır.
- [Awwwards: DUKE + DEXTER](https://www.awwwards.com/sites/duke-dexter): el emeği ürünleri gösteren, kullanılabilirliği ve ürün detaylarını önemseyen sade ticari deneyim. Bu projede fotoğraf büyütme, belirgin gezinme ve doğrudan iletişim karşılığını bulur.

Bunlar tasarım referanslarıdır; herhangi bir ödül veya jüri sonucu garantisi değildir.

## Son uygulama

- Ana sayfa: ürün açılışı → 13 tasarımlı yatay seçki → dört renk → tek atölye defteri (film ve motifler) → iletişim. Ayrı manifesto, dikiş ve miras bölümlerindeki tekrarlar birleştirildi.
- Yatay galeri: tekerlek, trackpad, doğal dokunmatik kaydırma, fareyle sürükleme, ok düğmeleri, klavye okları ve Home/End. Her iki uçta sayfa kaydırması serbest. Sürükleme yanlışlıkla ürün bağlantısını açmaz.
- Koleksiyon: 17 tasarım; kategori filtreleri; kare köşeli, kırpılmayan fotoğraflar; sabit kalan filtre şeridi. Ana sayfanın nakış bölümü burada tekrarlanmaz.
- Ürün: aynı fotoğrafın üç kırpımı yerine tek tam fotoğraf ve büyütme penceresi. Yakınlaştırma, klavye odak çevrimi, Escape ve odağın geri gelmesi. Öneriler aynı ürün türünden seçilir.
- İletişim: form kaldırıldı. Seçili ürün bilgisi WhatsApp bağlantısının hazır mesajına taşınır. Google Haritalar gömülü haritası ve ayrı harita bağlantısı bulunur.
- Atölye ve hikâye sayfalarının kendilerine ait anlatıları korundu; ana sayfanın tekrarlayan metin blokları kaldırıldı.

## Görsel kalitesi

24 kaynak yeniden işlendi: masaüstü WebP kalite 90, en çok 1600 px; mobil WebP kalite 85, en çok 800 px. Kaynak boyutu büyütülmez. Masaüstü toplam 5.734.118 bayt; mobil toplam 3.392.786 bayt. Kaynak 19.017.956 bayta göre masaüstü yaklaşık %70 daha küçüktür. Önceki daha agresif kalite 82 sürümü yerine nakış ayrıntısına öncelik verildi.

Sayfa fotoğrafları Next Image ile gerçek ekran genişliği ve piksel yoğunluğuna göre AVIF/WebP olarak sunulur; kalite 85. Büyütme penceresi yeniden sıkıştırmadan yüksek kaliteli WebP dosyasını açar. Ürün listeleri eager yüklenir, ana sayfa galerisinin ve dört rengin indirme önceliği açılış fotoğrafından düşüktür. Film mobilde 641.112 baytlık sürümü kullanır. Ön yükleme istenir; otomatik oynatma tarayıcı tercihleri ve görünürlüğe uyar.

## İşletme bilgileri

Güncelleme: Kullanıcının sağladığı `0534 665 84 81` telefonu ve `Cemalettin, Çemberciler Caddesi No:51, 43100 Kütahya Merkez/Kütahya` adresi merkezi site verisine eklendi. WhatsApp bağlantısı `905346658481` numarasını, gömülü harita açık adresi kullanır. Dış harita bağlantısı kullanıcının paylaştığı işletme konumudur.

Bu değerler `.env.example` içinde de yer alır; `.env.local` veya yayın ortamındaki ilgili `NEXT_PUBLIC_*` değişkenleri varsayılanları değiştirebilir. WhatsApp numarası ülke koduyla girilir. Yayın ortamının ayarları değiştiğinde yeniden derlenmelidir.

## Doğrulama

Üretim derlemesi, TypeScript ve ESLint başarılı. Playwright 26/26: 22 içerik rotası, 360–1920 px düzen kontrolleri, tüm rotalarda otomatik WCAG 2.2 AA kontrolleri, galeri giriş yöntemleri, ürün büyütme, mobil menü, film ve form içermeyen iletişim akışı.

Görsel denetim: `scripts/audit-editions.mjs`. Chromium/WebKit ve sınırlı bağlantı performans denetimi: `scripts/audit-couture.mjs`. Çıktılar `output/qa/editions/` ve `output/qa/couture/`. Performans raporu tek yerel laboratuvar ölçümüdür; gerçek kullanıcı verisi veya Lighthouse puanı değildir.

Son ek denetim **36/36** başarılı: Chromium ve WebKit × 390, 844, 1440 px × altı temsilî rota. 390 × 844 px açılışta ürün görselinin tamamı ilk ekrana sığar. İlk etkileşimin hydration öncesinde kaybolmaması için büyütme düğmesi hazır olana kadar devre dışıdır; fotoğraf görünür kalır. Son değişiklikten sonra ürün büyütme testi ayrıca **1/1** geçti.

Mobil laboratuvar ölçümü: 1,6 Mbps indirme, 150 ms gecikme, 4× CPU yavaşlatma, tarayıcı önbelleği kapalı. LCP **1,65 saniye**, ölçüm aralığındaki CLS **0,0025**. Ölçüm anına kadar aktarılan veri 1.060.906 bayttır; bu değer tüm sayfanın nihai indirme boyutu değildir. Sunucu görsel önbelleği önceki doğrulamalardan sıcaktır. Gerçek cihaz/şebeke sonuçları farklı olabilir.
