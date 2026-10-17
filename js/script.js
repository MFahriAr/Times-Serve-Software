// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Website TSS Loaded');

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if(menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Add animated button logic ---
    const animatedButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-white, .btn-nav, .btn-secondary-light, button:not(#menu-btn)');
    animatedButtons.forEach(btn => {
        if (btn.querySelector('.circle')) return;
        
        // Clean any existing arrows and collapse whitespace
        let text = btn.textContent.replace(/[\u2192\->]/g, '').replace(/\s+/g, ' ').trim();
        btn.textContent = '';
        btn.classList.add('animated-button');
        
        const svgPath = 'M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z';
        
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
                <path d="${svgPath}"></path>
            </svg>
            <span class="text">${text}</span>
            <span class="circle"></span>
            <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
                <path d="${svgPath}"></path>
            </svg>
        `;
    });

    // --- Add animated arrow logic ---
    const arrowLinks = document.querySelectorAll('a, button');
    arrowLinks.forEach(el => {
        if (el.classList.contains('animated-button') || el.classList.contains('cta-arrow')) return;
        
        const html = el.innerHTML;
        const textContent = el.textContent || '';
        
        const hasArrow = html.includes('&rarr;') || 
                         textContent.includes('\u2192') || 
                         textContent.includes('->') || 
                         (html.includes('<svg') && html.includes('M14 5l7 7'));
                         
        if (hasArrow) {
            let text = textContent.replace('\u2192', '').replace('->', '').trim();
            if (!text) return;
            
            el.classList.remove('hover:underline');
            el.classList.add('cta-arrow');
            
            el.innerHTML = `
                <span class="hover-underline-animation">${text}</span>
                <svg class="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 46 16">
                    <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(30)"></path>
                </svg>
            `;
        }
    });

    // Dynamic Navbar Glass Transparency on Scroll
    const mainHeader = document.querySelector('header');
    if (mainHeader) {
        const handleNavScroll = () => {
            if (window.scrollY > 30) {
                mainHeader.classList.add('bg-[#040818]', 'shadow-lg');
                mainHeader.classList.remove('bg-[#040818]/90');
            } else {
                mainHeader.classList.add('bg-[#040818]/90');
                mainHeader.classList.remove('bg-[#040818]', 'shadow-lg');
            }
        };
        window.addEventListener('scroll', handleNavScroll, { passive: true });
        handleNavScroll();
    }

    // Ensure hero background video autoplay
    const heroVideo = document.querySelector('.hero-video-bg');
    if (heroVideo) {
        heroVideo.muted = true;
        const playPromise = heroVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay policy fallback
            });
        }
    }
});


// --- Share Tooltip Logic ---
window.shareToWhatsApp = function(event) {
    event.preventDefault();
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Lihat Time Saver Software: ");
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
};

window.shareToInstagram = function(event) {
    event.preventDefault();
    copyToClipboard(window.location.href);
    alert("Link website telah disalin. Anda akan dialihkan ke Instagram.");
    window.open("https://instagram.com", '_blank');
};

window.copyPageLink = function(event) {
    event.preventDefault();
    copyToClipboard(window.location.href);
    
    // Visual feedback
    const btn = event.currentTarget;
    const originalTitle = btn.getAttribute('title');
    btn.setAttribute('title', 'Tersalin!');
    const svg = btn.querySelector('svg');
    if (svg) {
        const originalFill = svg.style.fill;
        svg.style.fill = '#25D366'; // Green color for success
        setTimeout(() => {
            svg.style.fill = originalFill;
            btn.setAttribute('title', originalTitle);
        }, 2000);
    }
};

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).catch(err => console.error('Failed to copy', err));
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Failed to copy', err);
        }
        document.body.removeChild(textArea);
    }
}

window.toggleShareMenu = function(event) {
    if (event) event.stopPropagation();
    const container = document.getElementById('share-tooltip-container') || (event ? event.currentTarget.closest('.tooltip-container') : null);
    if (container) {
        container.classList.toggle('active');
    }
};

document.addEventListener('click', function(e) {
    const container = document.getElementById('share-tooltip-container');
    if (container && !container.contains(e.target)) {
        container.classList.remove('active');
    }
});
