# AI Kullanım Kaydı ve Kod İnceleme Notları

Bu belge, **NovaAI Studio** projesinin geliştirilmesi sürecinde yapay zekâ asistanından alınan destekleri, prompt amaçlarını, yapılan tasarım/kod değişikliklerini ve JavaScript mantığının kendi sözlerimle açıklamasını içerir.

---

## 1. Kullanılan Prompt'lar ve Amaçları

### Prompt 1 — Proje Planı ve Sayfa Mimarisi
- **Amaç:** Üç sayfalık sitenin dosya yapısını, ortak navigasyon menüsünü ve 6 özgün çözüm kartının başlık/içerik yapısını kod yazmadan önce planlamak.
- **Prompt Özeti:**  
  *"Web teknolojilerinde yapay zekâ dönüşümü (NovaAI Studio) konusunda küçük/orta ölçekli işletmeler ve geliştiriciler için üç sayfalık bir site tasarlıyorum. Ana Sayfa, AI Çözümleri ve Vizyonumuz sayfaları olacak. HTML, CSS ve JavaScript kullanarak ortak menüyü ve başlığa göre canlı arama yapısını nasıl kurabilirim? Önce dosya yapısını ve kabul ölçütlerini öner."*

### Prompt 2 — Başlığa Göre Canlı Arama ve Erişilebilirlik
- **Amaç:** `cozumler.html` sayfasında yalnızca kart başlıklarını filtreleyen, Türkçe harf duyarlılığına dikkat eden, sonuç sayacını ve boş sonuç mesajını güncelleyen JavaScript kodunu oluşturmak.
- **Prompt Özeti:**  
  *"Çözüm kartları için `label` ile etiketlenmiş bir arama kutusu, sonuç sayacı, boş sonuç mesajı ve Temizle düğmesi eklemek istiyorum. Arama yazdıkça yalnızca `.card-title` başlıklarında eşleşme aramalı, baştaki/sondaki boşlukları yok saymalı ve Türkçe karakterlerde (İ/i, I/ı) sorun çıkarmamalı."*

### Prompt 3 — Kurumsal Tema, Açık/Koyu Mod ve Mobil Uyumluluk
- **Amaç:** Tüm sayfalarda tutarlı çalışan, açık ve koyu tema arasında geçiş yapabilen, `max-width: 1100px` genişlik ve `700px` altı tek sütun (`390px` mobil uyumlu) kurallarına uyan sade ve kurumsal bir CSS sistemi kurmak.
- **Prompt Özeti:**  
  *"Siteyi neon ve karmaşık efektlerden arındırıp sade, kurumsal ve modern bir açık/koyu temaya dönüştür. Üst menüde dairesel bir tema değiştirme düğmesi, hap biçimli butonlar, belirgin klavye odağı (`:focus-visible`) ve 390px genişlikte yatay taşma olmadan çalışan mobil düzen oluştur."*

### Prompt 4 — Hata Ayıklama ve Kod İncelemesi (Code Review)
- **Amaç:** Sayfalar arasındaki tutarsızlıkları, arama filtresinde kartların gizlenmemesi sorununu ve eksik tema düğmelerini tespit edip düzeltmek.
- **Prompt Özeti:**  
  *"Projeyi incele; arama filtresinin, tema düğmesinin ve sayfalar arası ortak menünün eksiksiz çalıştığını kontrol et, hatalı veya eksik kısımları raporla."*

---

## 2. Öneri Değerlendirmesi (Kabul Edilen ve Değiştirilen Öneriler)

- **Kabul Edilen Öneri:** Arama filtresinde standart `.toLowerCase()` yerine `.toLocaleLowerCase("tr-TR")` kullanılması ve sonuç sayacına `aria-live="polite"` eklenmesi önerisini kabul ettim. Çünkü Türkçe içerikte `"İ"` ve `"I"` harflerinin yanlış eşleşmesini önlemek ve ekran okuyucu kullanan ziyaretçilere filtreleme sonucunu bildirmek sitenin kalitesini doğrudan artırıyor.
- **Değiştirilen Öneri 1 (`hidden` ve `display: flex` Çakışması):** İlk CSS önerisinde `.solution-card` sınıfına `display: flex` verilmişti ancak `[hidden]` kuralı tanımlanmamıştı. JavaScript tarafında `card.hidden = !isMatch` kullanılsa bile CSS özgüllüğü nedeniyle kartlar ekrandan gizlenmiyordu. Bu durumu fark edip `style.css` dosyasına `[hidden] { display: none !important; }` kuralını ekledim.
- **Değiştirilen Öneri 2 (Görsel Tema ve Varsayılan Mod):** İlk aşamada varsayılan olarak koyu neon/glassmorphism bir tema önerilmişti. Ödevin okunabilirlik beklentisine ve kurumsal kimliğe daha uygun olması için bu tasarımı değiştirdim; arka plandaki ızgara ve neon parlamaları kaldırarak varsayılan olarak yüksek kontrastlı açık tema, ikincil seçenek olarak da sade koyu tema yapısına geçtim.

---

## 3. Kod Açıklamaları (Kendi Sözlerimle)

### Event Listener Açıklaması (`script.js`)
```js
searchInput.addEventListener("input", filterSolutions);

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  filterSolutions();
  searchInput.focus();
});
```
- `searchInput` üzerindeki `"input"` olay dinleyicisi, kullanıcı arama kutusuna her harf yazdığında, yapıştırdığında veya sildiğinde anlık olarak `filterSolutions` fonksiyonunu çalıştırır. Böylece bir "Ara" butonuna basmaya ya da sayfayı yenilemeye gerek kalmadan kartlar canlı olarak filtrelenir.
- `clearButton` üzerindeki `"click"` olay dinleyicisi ise "Temizle" düğmesine basıldığında arama kutusunun değerini boşaltır (`""`), tüm kartların tekrar görünmesi için `filterSolutions()` fonksiyonunu çağırır ve kullanıcının yeni bir arama yapabilmesi için imleci tekrar arama kutusuna odaklar (`searchInput.focus()`).

### Filtreleme Koşulu Açıklaması (`script.js`)
```js
const query = searchInput.value.trim().toLocaleLowerCase("tr-TR");
...
const titleText = titleElement.textContent.trim().toLocaleLowerCase("tr-TR");
const isMatch = titleText.includes(query);
card.hidden = !isMatch;
```
- Öncelikle kullanıcının girdiği metin (`searchInput.value`) ile her kartın yalnızca başlık metni (`.card-title`) alınır. `trim()` metodu baştaki ve sondaki gereksiz boşlukları temizler; böylece kullanıcı yalnızca boşluk yazdığında veya kelimenin kenarlarına yanlışlıkla boşluk bıraktığında arama bozulmaz.
- `toLocaleLowerCase("tr-TR")` metodu hem aranan ifadeyi hem de kart başlığını Türkçe kurallarına göre küçük harfe çevirir; böylece büyük/küçük harf farkı ortadan kalkar.
- `titleText.includes(query)` koşulu, aranan kelimenin kart başlığı içinde geçip geçmediğini kontrol eder (`true` veya `false`).
- `card.hidden = !isMatch` satırı ise eşleşme yoksa (`isMatch === false`) kartın `hidden` özelliğini `true` yaparak kartı gizler; eşleşme varsa görünür bırakır. Ardından görünür kart sayısı `resultCount` alanına yazdırılır ve `visibleCount === 0` olduğunda `#empty-message` boş sonuç uyarısı görünür hale getirilir.
