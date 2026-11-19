# Test Notları (Beklenen ve Gerçekleşen Sonuçlar)

Bu belge, **NovaAI Studio** sitesinde (`cozumler.html` sayfasındaki **6 adet** çözüm kartı, ortak üst menü ve mobil düzen üzerinde) yapılan 6 temel testin sonuçlarını içerir.

## Test Tablosu

| No | Test Senaryosu | Kullanılan Girdi | Beklenen Sonuç | Gerçekleşen Sonuç | Karar |
|---|---|---|---|---|---|
| 1 | Bir başlığın ayırt edici bölümünü yazma | `SEO` | Yalnızca başlığında "SEO" geçen 1 kart (*HTML Semantik ve AI SEO Motoru*) görünür; sayaç `1 çözüm gösteriliyor.` yazar. | Yalnızca *HTML Semantik ve AI SEO Motoru* kartı göründü; diğer 5 kart gizlendi ve sayaç `1 çözüm gösteriliyor.` olarak güncellendi. | **Geçti** |
| 2 | Harf büyüklüğünü değiştirip kenarlara boşluk ekleme | `   jAvAsCrİpT   ` | Harf büyüklüğü ve kenar boşlukları yok sayılarak *JavaScript Tabanlı Otonom Satış Asistanı* kartı eşleşir; sayaç `1 çözüm gösteriliyor.` yazar. | Boşluklar `trim()` ile temizlendi, Türkçe küçük harf dönüşümüyle aynı başlık eşleşti; yalnızca 1 kart göründü ve sayaç `1 çözüm gösteriliyor.` gösterdi. | **Geçti** |
| 3 | Hiçbir başlıkta olmayan bir ifade yazma | `blockchain` | Hiçbir kart görünmez, sayaç `0 çözüm gösteriliyor.` olur ve boş sonuç mesajı (`#empty-message`) ekranda görünür. | Tüm kartlar gizlendi, sayaç `0 çözüm gösteriliyor.` oldu ve *"Aramanıza uygun AI dönüşüm çözümü bulunamadı..."* uyarısı göründü. | **Geçti** |
| 4 | `Temizle` düğmesine basma; ardından yalnızca boşluk yazma | 1) `Temizle` tıklaması <br> 2) `"     "` (5 boşluk) | Her iki durumda da 6 kartın tamamı görünür, sayaç `6 çözüm gösteriliyor.` olur ve boş sonuç mesajı gizlenir. | `Temizle` tıklandığında kutu boşaldı, odak input'a döndü ve 6 kart göründü. Yalnızca boşluk yazıldığında da `trim()` sonucu boş string olduğu için 6 kartın tamamı görünür kaldı. | **Geçti** |
| 5 | Her sayfadaki menü bağlantılarını açma | `index.html`, `cozumler.html` ve `vizyonumuz.html` üst menü linkleri | Tüm bağlantılar ilgili HTML sayfasına hatasız gider ve aktif sayfanın menü bağlantısı vurgulanır. | Üç sayfadaki tüm ortak menü bağlantıları ve aksiyon butonları doğru sayfalara yönlendirdi; `active` sınıfı her sayfada doğru bağlantıda göründü. | **Geçti** |
| 6 | Ekranı `390 px` genişliğe getirme ve `Tab` ile gezinme | Tarayıcı DevTools `390 px` genişlik + `Tab` tuşu | Yatay taşma (horizontal scroll) olmaz, kartlar tek sütuna düşer; menü, tema düğmesi, arama kutusu ve `Temizle` düğmesine klavyeyle ulaşılır. | `390 px` genişlikte yatay taşma oluşmadı, tüm grid yapıları tek sütuna geçti; `Tab` ile tüm bağlantılara, `#event-search` kutusuna, `#clear-search` ve `#theme-toggle` düğmelerine görünür `:focus-visible` odağıyla ulaşıldı. | **Geçti** |

---

## Ek Doğrulama Notları

- **Tema Geçişi Testi:** Açık ve koyu tema arasında geçiş yapıldığında tercih `localStorage` (`nova-theme-mode`) üzerinde saklanmakta ve sayfalar arası geçişte korunmaktadır.
- **Ekran Görüntüsü Kontrolü:** Teslim ZIP paketine aşağıdaki 3 ekran görüntüsü eklenmelidir:
  1. Normal arama sonucu (`cozumler.html` üzerinde örnek bir arama)
  2. Boş sonuç durumu (`cozumler.html` üzerinde eşleşmeyen arama)
  3. `390 px` mobil görünüm (`cozumler.html` veya `index.html`)
