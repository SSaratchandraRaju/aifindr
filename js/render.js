function renderTools(tools) {
    const container = document.getElementById("toolsGrid");
    container.innerHTML = "";

    tools.forEach(tool => {
        const card = document.createElement("div");
        card.className = "col-md-4";

        card.innerHTML = `
      <div class="card tool-card h-100 shadow rounded-4 border-0" style="background-color: var(--color-card-bg); color: var(--color-text);">
        <div class="position-relative tool-logo-container" style="height: 140px;">
  <img src="${tool.logo}" 
       class="card-img-top p-3 rounded-top-4 position-absolute top-0 start-0 w-100 h-100" 
       alt="${tool.name}" 
       style="object-fit: contain;" 
       onerror="this.style.display='none'; 
                if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('fallback-logo')) {
                  const fallback = document.createElement('img');
                  fallback.src = 'assets/logos/logo-ai.png';
                  fallback.alt = 'Fallback Logo';
                  fallback.className = 'fallback-logo position-absolute top-50 start-50 translate-middle';
                  this.parentNode.appendChild(fallback);
                }" />
</div>
        <div class="card-body d-flex flex-column" style="color: var(--color-text);">
          <h5 class="card-title fw-semibold" style="color: var(--color-text);">${tool.name}</h5>
          <p class="card-text small" style="color: var(--color-text-muted);">${tool.description}</p>

          <div class="mb-3">
            ${tool.tags.map(tag => `<span class="badge me-1 mb-1 text-white" style="background-color: var(--color-accent);">${tag}</span>`).join("")}
          </div>

          <a href="${tool.url}" target="_blank" class="btn btn-outline-primary w-100 mt-auto">Visit</a>
        </div>

        <div class="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center">
          <button class="btn btn-sm btn-outline-success upvote-btn" data-id="${tool.id}">
            👍 ${tool.upvotes}
          </button>
          <button class="btn btn-sm ${tool.bookmarked ? "bookmark-active" : "bookmark-inactive"} bookmark-btn" data-id="${tool.id}">
            ⭐
          </button>
        </div>
      </div>
    `;

        container.appendChild(card);
    });
}
