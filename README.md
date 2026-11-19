# NovaAI Studio — Web Teknolojilerinde Yapay Zeka Dönüşümü

**Ders:** BPR201 - İnternet Tabanlı Programlama  
**Ödev:** Haftalık Proje Ödevi - 2 (Yapay Zekâ Destekli Web Sitesi)  
**GitHub Deposu:** https://github.com/muhammedfaruk0/novaaiprojeodev

## Proje Amacı ve Hedef Kitle

**NovaAI Studio**, mevcut statik web sitelerini sıfırdan yıkmadan yapay zeka modülleriyle (AI SEO, uyarlanabilir arayüz, canlı arama ve otonom satış asistanı) güçlendirmek isteyen **küçük ve orta ölçekli işletmeler ile web geliştiricilerine** hitap eden üç sayfalık bir tanıtım ve çözüm kataloğu sitesidir.

## Sayfa ve Dosya Yapısı

- `index.html` — **Ana Sayfa:** Site tanıtımı, hedef kitle, performans metrikleri, üçlü teknoloji katmanı, önce/sonra karşılaştırma bölümü ve çözümler sayfasına yönlendiren bağlantılar.
- `cozumler.html` — **AI Çözümleri (İçerikler):** Konuya özgü 6 adet AI entegrasyon modülü kartı, başlığa göre çalışan canlı arama kutusu (`#event-search`), sonuç sayacı (`#result-count`), boş sonuç mesajı (`#empty-message`) ve `Temizle` düğmesi (`#clear-search`).
- `vizyonumuz.html` — **Vizyonumuz (Hakkında):** Konuyu seçme gerekçesi, misyon, çalışma alanları ve 3 adımlı dönüşüm metodolojisi.
- `style.css` — Tüm sayfalarda kullanılan ortak tasarım, açık/koyu tema değişkenleri, `max-width: 1100px` yerleşim, klavye erişilebilirliği (`:focus-visible`) ve `700px` altı tek sütun (`390px` uyumlu) mobil düzen kuralları.
- `script.js` — Türkçe karakter uyumlu (`toLocaleLowerCase("tr-TR")`) canlı başlık arama filtresi, sonuç sayacı, boş sonuç kontrolü ve `localStorage` destekli açık/koyu tema değiştirici.
- `AI_NOTLARI.md` — Geliştirme sürecinde kullanılan prompt kayıtları, kabul/değişiklik gerekçeleri ve JavaScript kod açıklamaları.
- `TEST_NOTLARI.md` — 6 zorunlu test senaryosunun girdileri, beklenen/gerçekleşen sonuçları ve geçti/kaldı kayıtları.

## Öne Çıkan Özellikler

- **Canlı Başlık Araması:** Yazdıkça yalnızca kart başlıklarını (`.card-title`) filtreler; baştaki/sondaki boşlukları yok sayar (`trim()`) ve Türkçe büyük/küçük harf duyarlılığını korur.
- **Erişilebilirlik:** `label` ile bağlı arama alanı, `aria-live="polite"` sonuç sayacı, semantik HTML5 etiketleri ve belirgin `:focus-visible` klavye odağı.
- **Açık / Koyu Tema:** Üst menüdeki dairesel tema düğmesiyle açık ve koyu tema arasında anlık geçiş yapılır ve tercih tarayıcıda saklanır.
- **Mobil Uyumluluk:** `700px` altında tüm grid yapıları tek sütuna geçer ve `390px` genişlikte yatay taşma oluşmaz.

## Çalıştırma Adımları

1. Depoyu bilgisayarınıza klonlayın veya GitHub Codespaces üzerinde açın:
   ```bash
   git clone https://github.com/muhammedfaruk0/novaaiprojeodev.git
   cd novaaiprojeodev
   ```
2. Herhangi bir derleme veya sunucu kurulumu gerekmez. `index.html` dosyasını doğrudan tarayıcıda açabilir veya VS Code / Codespaces içinde **Live Server** (veya `python3 -m http.server 8000`) ile görüntüleyebilirsiniz.
3. Üst menüden **AI Çözümleri** sayfasına geçerek canlı arama, temizleme ve tema değiştirme işlevlerini test edebilirsiniz.

## Ekran Görüntüleri

Teslim klasörüne aşağıdaki üç ekran görüntüsünün eklenmesi planlanmıştır:
- Normal arama sonucu (ör. `"SEO"` veya `"AI"` araması)
- Boş sonuç durumu (ör. `"blockchain"` araması)
- `390 px` mobil görünüm
