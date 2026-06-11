(function() {
    const siteContent = [
        { keywords: ["service", "services", "premium", "consultation", "formation", "offres", "prix", "prestations"], url: "index.html#services" },
        { keywords: ["a propos", "propos", "qui suis je", "developpeur", "experience", "react", "vue", "biographie", "competences"], url: "a-propos.html" },
        { keywords: ["contact", "contacter", "email", "telephone", "adresse", "paris", "message", "formulaire", "coordonnees"], url: "contact.html" },
        { keywords: ["satisfaction", "avis", "clients", "temoignages", "startups"], url: "index.html" },
        { keywords: ["statistiques", "chiffres", "projets", "support"], url: "index.html" }
    ];

    function initSearch() {
        const searchForm = document.getElementById("search-form");
        const searchInput = document.getElementById("search-input");

        if (!searchForm || !searchInput) return;

        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const query = searchInput.value.toLowerCase().trim();
            
            // Sécurité : Ne rien faire si la recherche est vide ou trop courte (évite les bugs de redirection)
            if (query.length < 2) return;

            let matchFound = false;

            for (const item of siteContent) {
                // Correspondance robuste : soit le mot recherché est un mot-clé complet, 
                // soit la saisie (si >= 3 car.) est incluse dans un mot-clé long
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
                // Affiche l'erreur dans une live region accessible au lieu d'un alert()
                let errorEl = document.getElementById('search-error-msg');
                if (!errorEl) {
                    errorEl = document.createElement('div');
                    errorEl.id = 'search-error-msg';
                    errorEl.setAttribute('role', 'status');
                    errorEl.setAttribute('aria-live', 'polite');
                    const form = document.getElementById('search-form');
                    if (form) form.appendChild(errorEl);
                }
                const exampleKeywords = siteContent.flatMap(item => item.keywords).slice(0, 3).join('", "');
                errorEl.textContent = `Aucun résultat pour "${searchInput.value}". Essayez : "${exampleKeywords}".`;
                // Efface après 4 secondes
                setTimeout(() => { errorEl.textContent = ''; }, 4000);
            }
        }); // end submit listener

    } // end initSearch

    // Initialisation sécurisée
    document.addEventListener("DOMContentLoaded", function() {
        if (document.getElementById("search-form")) {
            initSearch();
        } else {
            window.addEventListener("navbarLoaded", initSearch);
        }
    });

})();