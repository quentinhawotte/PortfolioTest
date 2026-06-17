(function() {
    const siteContent = [
        {
            keywords: [
                "service", "services", "premium", "consultation", "formation",
                "offres", "prix", "prestations", "vitrine", "site web", "starter", "business"
            ],
            url: "index.html#services"
        },
        {
            keywords: [
                "a propos", "propos", "qui suis je", "qui je suis", "developpeur",
                "experience", "biographie", "competences", "parcours", "ifapme",
                "ux", "ui", "figma", "wireframe", "personas", "formation",
                "bootstrap", "accessibilite", "accessibilité", "wcag", "portfolio",
                "quentin", "hawotte", "liege", "liège", "philosophie"
            ],
            url: "a-propos.html"
        },
        {
            keywords: [
                "contact", "contacter", "email", "telephone", "téléphone",
                "adresse", "message", "formulaire", "coordonnees", "coordonnées",
                "stage", "projet", "collaboration", "rendez-vous", "rdv"
            ],
            url: "contact.html"
        },
        {
            keywords: [
                "satisfaction", "avis", "clients", "temoignages", "témoignages",
                "red bull", "redbull", "projets", "réalisations", "bento"
            ],
            url: "index.html"
        },
        {
            keywords: [
                "statistiques", "chiffres", "stack", "outils", "git",
                "html", "css", "javascript", "performance", "lcp", "cls"
            ],
            url: "index.html"
        }
    ];

    function initSearch() {
        const searchForm = document.getElementById("search-form");
        const searchInput = document.getElementById("search-input");

        if (!searchForm || !searchInput) return;

        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const query = searchInput.value.toLowerCase().trim();

            // Ne rien faire si la recherche est vide ou trop courte
            if (query.length < 2) return;

            let matchFound = false;

            for (const item of siteContent) {
                const match = item.keywords.some(keyword => {
                    if (query === keyword.toLowerCase()) return true;
                    if (query.length >= 3 && keyword.toLowerCase().includes(query)) return true;
                    return false;
                });

                if (match) {
                    window.location.href = item.url;
                    matchFound = true;
                    break;
                }
            }

            if (!matchFound) {
                let errorEl = document.getElementById('search-error-msg');
                if (!errorEl) {
                    errorEl = document.createElement('div');
                    errorEl.id = 'search-error-msg';
                    errorEl.setAttribute('role', 'status');
                    errorEl.setAttribute('aria-live', 'polite');
                    const form = document.getElementById('search-form');
                    if (form) form.appendChild(errorEl);
                }
                errorEl.textContent = `Aucun résultat pour "${searchInput.value}". Essayez : "services", "contact", "parcours".`;
                setTimeout(() => { errorEl.textContent = ''; }, 4000);
            }
        });
    }

    // Initialisation sécurisée : attend la navbar si le formulaire n'est pas encore dans le DOM
    document.addEventListener("DOMContentLoaded", function() {
        if (document.getElementById("search-form")) {
            initSearch();
        } else {
            window.addEventListener("navbarLoaded", initSearch);
        }
    });

})();
