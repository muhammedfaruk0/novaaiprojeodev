const searchInput = document.querySelector("#event-search");
const clearButton = document.querySelector("#clear-search");
const resultCount = document.querySelector("#result-count");
const emptyMessage = document.querySelector("#empty-message");
const cards = document.querySelectorAll(".solution-card");
const themeToggle = document.querySelector("#theme-toggle");

// 1. Başlığa Göre Canlı Arama Fonksiyonu (Slayt 18 & 20 Kuralları)
function filterSolutions() {
  if (!searchInput || !resultCount || !emptyMessage) return;

  const query = searchInput.value.trim().toLocaleLowerCase("tr-TR");
  let visibleCount = 0;

  cards.forEach((card) => {
    const titleElement = card.querySelector(".card-title");
    const titleText = titleElement.textContent.trim().toLocaleLowerCase("tr-TR");

    const isMatch = titleText.includes(query);
    card.hidden = !isMatch;

    if (isMatch) {
      visibleCount += 1;
    }
  });

  resultCount.textContent = `${visibleCount} çözüm gösteriliyor.`;
  emptyMessage.hidden = visibleCount !== 0;
}

if (searchInput && clearButton) {
  searchInput.addEventListener("input", filterSolutions);

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    filterSolutions();
    searchInput.focus();
  });

  filterSolutions();
}

// 2. Koyu (Obsidian AI) / Açık (Slayt 14 Akademik) Tema Değiştirici
function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light-theme");
    if (themeToggle) themeToggle.textContent = "🌙 Koyu AI Tema";
  } else {
    document.body.classList.remove("light-theme");
    if (themeToggle) themeToggle.textContent = "☀️ Açık Tema";
  }
}

const savedTheme = localStorage.getItem("nova-theme") || "dark";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-theme");
    const nextTheme = isLight ? "dark" : "light";
    localStorage.setItem("nova-theme", nextTheme);
    applyTheme(nextTheme);
  });
}