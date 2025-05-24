document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const sunIcon = document.getElementById("sunIcon");
    const moonIcon = document.getElementById("moonIcon");

    function updateIcons(theme) {
        if (!sunIcon || !moonIcon) return;
        if (theme === "dark") {
            sunIcon.style.opacity = "0.4";
            moonIcon.style.opacity = "1";
        } else {
            sunIcon.style.opacity = "1";
            moonIcon.style.opacity = "0.4";
        }
    }

    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateIcons(currentTheme);

    if (themeToggle) {
        themeToggle.checked = currentTheme === "dark";

        themeToggle.addEventListener("change", function () {
            const selectedTheme = this.checked ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", selectedTheme);
            localStorage.setItem("theme", selectedTheme);
            updateIcons(selectedTheme);
        });
    }
});
