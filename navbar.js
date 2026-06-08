document.addEventListener("DOMContentLoaded", function () {
  const navbarContainer = document.getElementById("navbar");

  if (navbarContainer) {
    navbarContainer.innerHTML = `
      <nav class="navbar navbar-expand-md navbar-dark fixed-top custom-apple-navbar" aria-label="Navigation principale">
        <div class="container">

          <a class="navbar-brand navbar-brand-morph d-flex align-items-center gap-2" href="index.html" aria-label="Studio — Accueil">
            <span class="brand-icon-wrap" aria-hidden="true">
              <span class="brand-icon brand-icon-logo">
                <i class="fa-solid fa-cubes"></i>
              </span>
              <span class="brand-icon brand-icon-home">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V10.5Z"
                        stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                </svg>
              </span>
            </span>
            <span>Studio</span>
          </a>

          <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Ouvrir le menu de navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto mb-3 mb-md-0 gap-md-4">
              <li class="nav-item">
                <a class="nav-link text-decoration-underline" href="index.html#services">Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-decoration-underline" href="a-propos.html">À propos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-decoration-underline" href="contact.html">Contact</a>
              </li>
            </ul>

            <div class="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-3">
              <form class="position-relative search-navbar-form" id="search-form" role="search">
                <label for="search-input" class="visually-hidden">Rechercher sur le site</label>
                <span class="position-absolute top-50 start-0 translate-middle-y ps-3 search-icon-input" aria-hidden="true">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <input class="form-control form-input-search" id="search-input" type="search" placeholder="Rechercher..." autocomplete="off">
                <button type="submit" class="visually-hidden">Rechercher</button>
              </form>

              <button class="btn btn-glass-sm" data-bs-toggle="modal" data-bs-target="#modalContact" aria-haspopup="dialog">
                <i class="fa-regular fa-paper-plane me-2" aria-hidden="true"></i>Contactez-nous
              </button>
            </div>
          </div>

        </div>
      </nav>
    `;

    // Active link highlight
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    // Remove previous 'active' classes to avoid duplication if re-rendered
    document.querySelectorAll(".navbar .nav-link.active").forEach((lien) => {
      lien.classList.remove("active");
      lien.removeAttribute("aria-current");
    });
    document.querySelectorAll(".navbar .nav-link").forEach((lien) => {
      const href = lien.getAttribute("href");
      if (href && href.split("#")[0] === currentPage) {
        lien.classList.add("active");
        lien.setAttribute("aria-current", "page");
      }
    });

    // Notifie search.js que la navbar est prête
    window.dispatchEvent(new Event("navbarLoaded"));
  }
});