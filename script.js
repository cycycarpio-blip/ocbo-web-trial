// --- 1. NAVIGATION & INITIALIZATION ---
function handleNavigation() {
    const hash = window.location.hash || '#home-section';
    const pages = document.querySelectorAll('.spa-page');

    pages.forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');

        if (`#${page.id}` === hash) {
            page.style.display = 'block';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    page.classList.add('active');
                });
            });
        }
    });

    injectCurrentDate();
    setupExpandButton();
}

// --- 2. SERVICES SEARCH FILTER (ANTI-JUMP VERSION) ---
function filterServices() {
    const input = document.getElementById('serviceSearch');
    if (!input) return;

    const filter = input.value.toLowerCase();
    const cards = document.querySelectorAll('.service-item');

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        
        if (title.includes(filter)) {
            // 1. Bring back to layout
            card.style.display = ""; 
            
            // 2. Small delay to trigger the fade-in animation
            setTimeout(() => {
                card.classList.remove('hidden');
            }, 20); // Increased slightly for stability
        } else {
            // 1. Start the fade-out animation
            card.classList.add('hidden');
            
            // 2. MATCH THE CSS: Wait exactly 400ms before removing from layout
            setTimeout(() => {
                if (card.classList.contains('hidden')) {
                    card.style.display = "none";
                }
            }, 400); // Changed from 300 to 400 to match your CSS
        }
    });
}
// --- 3. DATE INJECTION ---
function injectCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { month: 'short', day: 'numeric' };
        dateElement.innerText = now.toLocaleDateString('en-US', options);
    }
}

// --- 4. MODAL LOGIC ---
function openOrgModal() {
    const modal = document.getElementById("orgModal");
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
}

function closeOrgModal() {
    const modal = document.getElementById("orgModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

function setupExpandButton() {
    const expandBtn = document.getElementById("expandBtn");
    if (expandBtn) {
        expandBtn.onclick = function(e) {
            e.preventDefault();
            openOrgModal();
        };
    }
}

// --- 5. GLOBAL CLICK LISTENER ---
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-modal') || e.target.id === 'orgModal') {
        closeOrgModal();
    }

    if (e.target.classList.contains('expand-btn')) {
        const clickedCard = e.target.closest('.permit-card');
        if (clickedCard) {
            clickedCard.classList.toggle('expanded');
            e.target.innerText = clickedCard.classList.contains('expanded') 
                ? 'Hide Requirements ▴' 
                : 'View Requirements ▾';
        }
    }
});

// --- 6. EVENT LISTENERS ---
window.addEventListener('hashchange', handleNavigation);
window.addEventListener('DOMContentLoaded', handleNavigation);
