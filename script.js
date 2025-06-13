document.addEventListener('DOMContentLoaded', () => {

    // Modal Logic
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImageContent");
    const captionText = document.getElementById("modalCaption");
    const closeModalBtn = document.getElementById("modalCloseBtn");
    const imagesToEnlarge = document.querySelectorAll(".enlarge-trigger");

    imagesToEnlarge.forEach(img => {
        img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt; 
        }
    });

    closeModalBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            mobileMenu.setAttribute('aria-expanded', isExpanded);
        });
    }

    // --- REVISED REVEAL SCRIPT ---
    const allFadeInSections = document.querySelectorAll('.fade-in-section');
    const heroContent = document.querySelector('.hero-content.fade-in-section');
    
    // 1. Special handling for Hero Content
    // It should fade in on page load without any action.
    if(heroContent) {
        setTimeout(() => {
            heroContent.classList.add('is-visible');
        }, 100); // A small delay can help ensure the transition is smooth
    }
    
    // 2. Handling for all other sections on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Skip the hero element because it's handled separately
            if (entry.target === heroContent) {
                return;
            }

            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections. The callback will filter out the hero.
    allFadeInSections.forEach(el => {
         if (el !== heroContent) {
            observer.observe(el);
        }
    });
}); 