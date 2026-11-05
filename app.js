
const languageToggle = document.getElementById("languageToggle");
const themeToggle = document.getElementById("themeToggle");

let currentLanguage = "fa";

// Change Persian and English
function changeLanguage() {
    currentLanguage = currentLanguage === "fa" ? "en" : "fa";

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir =
        currentLanguage === "fa" ? "rtl" : "ltr";

    document.body.classList.toggle(
        "english",
        currentLanguage === "en"
    );

    document.querySelectorAll("[data-fa][data-en]").forEach((element) => {
        element.textContent = element.dataset[currentLanguage];
    });

    languageToggle.textContent =
        currentLanguage === "fa" ? "English" : "فارسی";
}

languageToggle.addEventListener("click", changeLanguage);

// Light Mode and Dark Mode
let currentTheme = "light";

try {
    currentTheme =
        localStorage.getItem("sedarat-theme") === "dark"
            ? "dark"
            : "light";
} catch (error) {
    currentTheme = "light";
}

function applyTheme() {
    document.documentElement.dataset.theme = currentTheme;

    const isDarkMode = currentTheme === "dark";

    themeToggle.textContent = isDarkMode ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        isDarkMode ? "Switch to light mode" : "Switch to dark mode"
    );

    themeToggle.title = isDarkMode ? "Light Mode" : "Dark Mode";
}

themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";

    applyTheme();

    try {
        localStorage.setItem("sedarat-theme", currentTheme);
    } catch (error) {
        // Theme switching still works if storage is unavailable.
    }
});

applyTheme();

// Automatic copyright year
document.getElementById("currentYear").textContent =
    new Date().getFullYear();
