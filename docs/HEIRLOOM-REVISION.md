# Bindallı seçkisi — son tasarım turu

## İstek ve uygulama

`home-colors` ana sayfadan kaldırıldı. `CollectionShowcase` artık sunucuda oluşturulan sabit bir vitrin: Bordo / Sarma, Siyah / Sarma, Al / Kaftan, Safir / Gümüş, Bordo / Kuş Motifi, Lacivert / Gümüş. Masaüstü üç sütun, iki sıra; tablet iki sütun, telefon tek sütun. Altı fotoğrafın altında `/koleksiyon` bağlantısı bulunur. Ürünler tam görünür, köşeleri yuvarlanmaz, fotoğraflara yakınlaştırma veya maske uygulanmaz. Kalite 85 ve eager yükleme korunur.

Yatay galerinin kaydırma, sürükleme ve ok kontrol kodu kaldırıldı. Renk bölümündeki dört ürün katalogda bulunmaya devam eder.

Yeni tema: bordo kadife, antik altın ve sıcak parşömen. Açılış, koleksiyon, ürün, atölye, hikâye, iletişim, menü ve footer aynı palete bağlandı. Özgün SVG lale/dal çizimleri altın nakışa gönderme yapar; tarihî bir eserin kopyası veya firma için doğrulanmış tarih iddiası değildir.

GSAP dinamik yüklenir. Dekoratif çizgi çizimi ve 20 px bölüm hareketi uygulanır. Azaltılmış hareket tercihi gözetilir; rota değişiminde gözlemci ve animasyonlar temizlenir. Metin ve fotoğraflar animasyon başlatılmadan da görünür.

## Footer ve ipliğin yolculuğu

Footer imzası ortalandı; serif/italik marka yazısı, lale mührü ve ince altın çizgilerle tamamlandı.

Ana sayfanın atölye bölümündeki marka imzası son kullanıcı isteğiyle 100 px yüksekliğinde ince bir banda dönüştürüldü. WebGL, parçacık sistemi, kanvas ve kontrol düğmeleri ana sayfadan tamamen kaldırıldı. Simetrik altın dallar SVG çizgi animasyonuyla açılır; ortada italik serif “Yörem Çeyiz”, kısa bir altın ayraç ve “KÜTAHYA” birlikte görünür.

Animasyon yalnızca CSS ve satır içi SVG kullanır. Dallar yaklaşık 0,9 saniyede çizilir, marka adı 0,3 saniye sonra başlayıp 0,55 saniyede belirir; ince ışık geçişi yaklaşık 1,5 saniyede tamamlanır. Hareket azaltma tercihinde bant son hâliyle ve animasyonsuz görünür.

Bu imza için istemci bileşeni, dinamik modül, WebGL renderer, font rasterizasyonu ve animasyon döngüsü yoktur. İçerik sunucudan doğrudan gelir; bant mobilde de 100 px kalır.

## Araştırma

- [Awwwards — DUKE + DEXTER](https://www.awwwards.com/sites/duke-dexter): ürün odaklı düzen ve sade katalog hiyerarşisi. Awwwards üzerindeki sunum görseli `output/research/duke-dexter.jpg` olarak incelendi; siteye kopyalanmadı.
- [Awwwards — Finely Crafted](https://www.awwwards.com/sites/finely-crafted): işçilik anlatısı ve sınırlı koyu/altın palet referansı.
- [The Met — Osmanlı dönemi işlemeli ayakkabıları ve bindallı bağlamı](https://www.metmuseum.org/art/collection/search/88855): kadife, metal iplik ve çiçek/yaprak süslemesinin kültürel bağlamı. Ürünlere doğrulanmamış malzeme ya da teknik özelliği atfedilmedi.

## Durum

Son atölye düzenlemesi: ana sayfada kısa başlık, tam genişlikte film ve tek atölye bağlantısı kullanılır. Filmin üzerindeki büyük slogan ve karartma kaldırıldı; oynatma kontrolü görüntünün altındadır. Yan fotoğraf kaldırıldı, beş motif görseli atölye sayfasındaki motif arşivine taşındı. 100 px imza bandı bölümün sonunda yer alır. Mobilde film kendi 16:9 çerçevesinde tam görünür.

Kullanıcı talebi doğrultusunda test, lint, typecheck, build ve tarayıcı denetimi çalıştırılmadı. Önceki turdaki test/performans sonuçları bu sürüm için doğrulama sayılmaz. Kaynak değişiklikleri geliştirici sunucusunda görünür; önceden başlatılmış üretim sunucusu eski derlemeyi gösterir.

Kullanıcının sağladığı iletişim bilgileri eklendi: telefon `0534 665 84 81`, WhatsApp `905346658481`, adres `Cemalettin, Çemberciler Caddesi No:51, 43100 Kütahya Merkez/Kütahya`. Gömülü harita açık adresi sorgular; dış harita bağlantısı kullanıcının paylaştığı işletme konumunu açar. Ana sayfa, footer ve ürün iletişim bağlantıları aynı merkezi veriyi kullanır. Arama bağlantısı ülke koduyla oluşturulur; adres kuruluşun yapılandırılmış verisine de eklenir.
