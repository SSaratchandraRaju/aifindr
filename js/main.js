let tools = JSON.parse(localStorage.getItem("aifindr_tools")) || mockTools;

// Initial render
renderTools(tools);

// Immediately Invoked Function to setup theme on page load
// Apply stored theme on load
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const toggle = document.getElementById('themeToggle');
  if (toggle) toggle.checked = theme === 'dark';
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Listen for toggle changes
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.checked = savedTheme === 'dark';
    themeToggle.addEventListener('change', () => {
      applyTheme(themeToggle.checked ? 'dark' : 'light');
    });
  }
});

function updateToggleLabel(theme) {
  const label = document.querySelector('label[for="themeToggle"]');
  if (label) {
    label.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const toggle = document.getElementById('themeToggle');
  if (toggle) toggle.checked = theme === 'dark';
  updateToggleLabel(theme);
}



// Search + Filter
document.getElementById("searchInput").addEventListener("input", handleSearchFilter);
document.getElementById("categoryFilter").addEventListener("change", handleSearchFilter);

function handleSearchFilter() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;

  const filtered = tools.filter(tool =>
    tool.name.toLowerCase().includes(keyword) &&
    (category === "" || tool.category === category)
  );

  renderTools(filtered);
}

function showSnackbar(message) {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;
  snackbar.classList.add("show");
  
  setTimeout(() => {
    snackbar.classList.remove("show");
  }, 3000);
}


// Add Tool Form
document.getElementById("addToolForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const newTool = {
    id: Date.now(),
    name: form.name.value.trim(),
    url: form.url.value.trim(),
    description: form.description.value.trim(),
    category: form.category.value,
    tags: form.tags.value ? form.tags.value.split(",").map(tag => tag.trim()) : [],
    logo: form.logo.value.trim() || "https://via.placeholder.com/150",
    upvotes: 0,
    bookmarked: false
  };

  tools.push(newTool);
  localStorage.setItem("aifindr_tools", JSON.stringify(tools));
  renderTools(tools);
  form.reset();

  const modalEl = document.getElementById("addToolModal");
  const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
  modalInstance.hide();

  showSnackbar(`Added "${newTool.name}" successfully!`);
});


// Upvote & Bookmark Handlers
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("upvote-btn")) {
    const id = +e.target.dataset.id;
    tools = tools.map(t => t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t);
    localStorage.setItem("aifindr_tools", JSON.stringify(tools));
    renderTools(tools);
  }

  if (e.target.classList.contains("bookmark-btn")) {
    const id = +e.target.dataset.id;
    tools = tools.map(t => t.id === id ? { ...t, bookmarked: !t.bookmarked } : t);
    localStorage.setItem("aifindr_tools", JSON.stringify(tools));
    renderTools(tools);
  }
});
