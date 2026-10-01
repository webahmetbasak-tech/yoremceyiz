# Yöresel giyim kataloğu — 1 Ekim 2026

Yeni seçki `src/lib/collection.ts` içinde tek kaynaktan yönetilir: 13 yeni tasarım ve korunmuş dört renk, toplam 17 ürün. Ana sayfada 13 tasarımlı doğal yatay vitrin, dört renkli çerçeveli seçki ve nakış defteri bulunur. Koleksiyon üç türde süzülebilir: bindallı, yöresel takım ve gece elbisesi. Ürün fotoğrafları kare köşeli çerçevelerde kırpılmadan gösterilir. Yatay vitrin ve katalog görselleri sayfa açılışında eager yüklenir.

## Görseller

- `public/media/ek` içindeki 24 kaynak dosya `scripts/ek-sources.json` ile anlamlı dosya adlarına eşlenir. Asıllar korunur.
- Çıktılar `public/media/editions/`: 24 masaüstü WebP toplam 4.013.172 bayt, 24 mobil WebP toplam 1.928.236 bayt. Responsive ekran boyutlarını Next Image seçer.
- Beş `sc-` kaynağının tamamı kullanılır. Dört nakış karesi ana sayfa/koleksiyon nakış defterinde; atölye karesi ana sayfanın atölye anlatısında, atölye sayfasında ve film posterinde kullanılır.
- Toplu koleksiyon karesi hero finalinde ve katalog girişinde; kuş motifi yakın planı nakış defterinde; 17 kıyafet görseli ana sayfada ve katalogda yer alır.
- `x` önekiyle işaretli dosyalar değiştirilmez veya silinmez. Artık sayfalarda kullanılmazlar. `scripts/media-policy.mjs`, eski üretim betiklerinin bu dosyaları yeniden oluşturmasını engeller.
- Artık katalogda bulunmayan dört eski renk adresi ilgili yeni ürünlere kalıcı yönlendirilir.

Yeniden optimizasyon: `node scripts/prepare-ek.mjs`. Aktif manifestleri eşitleme: `node scripts/sync-media-manifests.mjs`.

## Doğrulama

Üretim derlemesi başarılı: 28 statik çıktı, 17 ürün detay rotası. ESLint ve TypeScript başarılı. Üretim sunucusuna karşı Playwright **22/22** geçti (2,8 dakika); 360–1920 px aralığında 22 içerik rotası ve otomatik WCAG 2.2 AA kontrolleri dahil. Toplam kaynak boyutu 19.017.956 bayttan masaüstü WebP için 4.013.172 bayta indi (yaklaşık %79 azalma).

`node scripts/audit-editions.mjs`: 320, 390, 768 ve 1440 px boyutlarında ana sayfa, koleksiyon ve atölye; 24 yeni görselin ana sayfada kullanımı, emekliye ayrılan dosyaların istenmemesi, kırık görseller, sayfa hataları, taşma, filtreleme ve klavye/ok ile galeri gezintisi. Varsayılan sunucu `http://localhost:3003`; `AUDIT_URL` ile değiştirilebilir. Çıktılar `output/qa/editions/`.

Son üretim sürümünde bu görsel denetim **12/12** geçti. Mobil tarayıcıda geç yüklenebilen iki dikiş fotoğrafı da eager yüklemeye alındı. Bu son değişikliklerden sonra hero, yatay galeri, dört renk ve medya kontrolleri yeniden çalıştırıldı: **4/4** başarılı. Mobil ve masaüstü katalog ekran görüntüleri ayrıca incelendi.
