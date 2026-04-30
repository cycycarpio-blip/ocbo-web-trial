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

    // RE-LINK MODAL BUTTON EVERY TIME NAVIGATION HAPPENS
    const expandBtn = document.getElementById("expandBtn");
    if (expandBtn) {
        expandBtn.onclick = function() {
            openOrgModal();
        };
    }
}

// MODAL FUNCTIONS
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

// GLOBAL CLICK LISTENER (For Close Button and Requirements Cards)
document.addEventListener('click', function(e) {
    // 1. Close Modal if clicking the 'X'
    if (e.target.classList.contains('close-modal')) {
        closeOrgModal();
    }
    
    // 2. Close Modal if clicking the dark overlay
    if (e.target.id === 'orgModal') {
        closeOrgModal();
    }

    // 3. Requirements Cards (Existing logic)
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

// INITIALIZE
window.addEventListener('hashchange', handleNavigation);
window.addEventListener('DOMContentLoaded', handleNavigation);
