/**
 * Tamar Goldstein - Hand Poke Website
 * Lightweight interaction logic
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Tamar Goldstein Website Initialized');
    
    // --- Language Toggle Logic ---
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = 'en';

    const updateLanguage = (lang) => {
        const translatableElements = document.querySelectorAll('[data-en]');
        translatableElements.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        // Update document direction
        document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // Update toggle button text
        langToggle.textContent = lang === 'en' ? 'HE' : 'EN';
        
        // Update body class for styling adjustments
        document.body.classList.toggle('is-rtl', lang === 'he');
    };

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'he' : 'en';
        updateLanguage(currentLang);
    });

    // --- Gallery Loading Logic ---
    const galleryGrid = document.getElementById('gallery-grid');
    
    const projects = [
        {
            name: 'Sketches',
            folder: 'Sketches',
            images: [
                'tamar_gold2__2025-12-31T160059.000Z.jpg',
                'tamar_gold2__2026-04-11T165221.000Z_4.jpg',
                'tamar_gold2__2026-04-26T170713.000Z_2.jpg',
                'tamar_gold2__2026-04-26T170713.000Z_3.jpg'
            ]
        },
        {
            name: 'Big Fish Energy',
            folder: 'Big Fish Energy',
            images: [
                'tamar_gold2__2026-02-25T174635.000Z.jpg',
                'tamar_gold2__2026-02-25T174635.000Z_1.jpg'
            ]
        },
        {
            name: 'Lemon Tree',
            folder: 'Lemon Tree',
            images: [
                'tamar_gold2__2026-02-08T181232.000Z.jpg',
                'tamar_gold2__2026-02-08T181232.000Z_1.jpg'
            ]
        },
        {
            name: 'Yotam',
            folder: 'Yotam',
            images: [
                'tamar_gold2__2026-03-29T170920.000Z.jpg',
                'tamar_gold2__2026-03-29T170920.000Z_5.jpg'
            ]
        },
        {
            name: 'Hagar',
            folder: 'Hagar',
            images: [
                'tamar_gold2__2026-01-14T155322.000Z.jpg',
                'tamar_gold2__2026-03-29T170920.000Z_4.jpg'
            ]
        }
    ];

    const loadGallery = () => {
        projects.forEach(project => {
            project.images.forEach((imgName, index) => {
                const item = document.createElement('div');
                item.className = 'gallery-item stippled-border';
                item.setAttribute('role', 'button');
                item.setAttribute('aria-label', `View detail for ${project.name} ${index + 1}`);
                item.setAttribute('tabindex', '0');
                item.innerHTML = `
                    <img src="Assets/${project.folder}/${imgName}" alt="Stippled botanical illustration - ${project.name}" loading="lazy">
                    <div class="gallery-overlay">
                        <span class="project-tag">${project.name}</span>
                        <span class="view-btn" data-en="View Detail" data-he="צפו בפרטים">View Detail</span>
                    </div>
                `;
                
                const triggerOpen = () => openLightbox(`Assets/${project.folder}/${imgName}`);
                item.addEventListener('click', triggerOpen);
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        triggerOpen();
                    }
                });
                galleryGrid.appendChild(item);
            });
        });
    };

    // --- Lightbox Logic ---
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('role', 'dialog');
    lightbox.innerHTML = `
        <span class="lightbox-close" role="button" aria-label="Close lightbox">&times;</span>
        <img class="lightbox-content" id="lightbox-img" alt="Enlarged botanical illustration">
    `;
    document.body.appendChild(lightbox);

    const openLightbox = (src) => {
        const lightboxImg = document.getElementById('lightbox-img');
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    };

    lightbox.addEventListener('click', (e) => {
        if (e.target.id === 'lightbox' || e.target.className === 'lightbox-close') {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // --- Intersection Observer for Reveal ---
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // --- Header Scroll Effect ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Logo Dot Animation ---
    const logoDots = document.getElementById('logo-dots');
    const logo = document.getElementById('main-logo');
    
    const createDots = () => {
        const rect = logo.getBoundingClientRect();
        for (let i = 0; i < 30; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;
            dot.style.animation = `dotDraw ${1 + Math.random() * 2}s ease-in-out forwards`;
            dot.style.animationDelay = `${Math.random() * 2}s`;
            logoDots.appendChild(dot);
        }
    };

    createDots();

    // --- Form Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = document.documentElement.lang === 'he' ? 'שולח...' : 'Sending...';
            submitBtn.disabled = true;

            // Simulate send
            setTimeout(() => {
                submitBtn.innerText = document.documentElement.lang === 'he' ? 'נשלח בהצלחה' : 'Message Sent';
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    loadGallery();

    // --- Smooth Scrolling ---
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
});
