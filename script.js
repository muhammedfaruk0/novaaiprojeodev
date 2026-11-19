const searchInput = document.querySelector("#event-search");
const clearButton = document.querySelector("#clear-search");
const resultCount = document.querySelector("#result-count");
const emptyMessage = document.querySelector("#empty-message");
const cards = document.querySelectorAll(".solution-card");
const themeToggle = document.querySelector("#theme-toggle");

const SUN_ICON = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
  </svg>
`;

const MOON_ICON = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
`;

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

// 2. Açık / Koyu Tema Değiştirici (Dairesel SVG İkon Butonu)
function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-theme", isDark);

  if (themeToggle) {
    themeToggle.innerHTML = isDark ? MOON_ICON : SUN_ICON;
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Açık temaya geç" : "Koyu temaya geç"
    );
    themeToggle.setAttribute(
      "title",
      isDark ? "Açık temaya geç" : "Koyu temaya geç"
    );
  }
}

const savedTheme = localStorage.getItem("nova-theme-mode") || "light";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-theme");
    const nextTheme = isDark ? "light" : "dark";
    localStorage.setItem("nova-theme-mode", nextTheme);
    applyTheme(nextTheme);
  });
}
