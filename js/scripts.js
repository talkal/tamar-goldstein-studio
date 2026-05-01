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
    let currentProjectIndex = 0;
    let currentImageIndex = 0;
    
    // Use galleryData from gallery-data.js (global)
    const projects = typeof galleryData !== 'undefined' ? galleryData : [];

    const loadGallery = () => {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = ''; // Clear existing
        
        projects.forEach((project, pIndex) => {
            // Filter out 'Sketches' from the main gallery grid
            if (project.name === 'Sketches' || project.images.length === 0) return;
            
            const imgName = project.images[0];
            const item = document.createElement('div');
            item.className = 'gallery-item stippled-border';
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `View project: ${project.name}`);
            item.setAttribute('tabindex', '0');
            item.innerHTML = `
                <img src="Assets/${project.folder}/${imgName}" alt="Project cover - ${project.name}" loading="lazy">
                <div class="gallery-overlay">
                    <span class="project-tag">${project.name}</span>
                    <span class="view-btn" data-en="View Project" data-he="צפו בפרויקט">View Project</span>
                </div>
            `;
            
            const triggerOpen = () => openLightbox(pIndex, 0);
            item.addEventListener('click', triggerOpen);
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    triggerOpen();
                }
            });
            galleryGrid.appendChild(item);
        });
    };

    // --- Showcase Loading Logic ---
    const showcaseGrid = document.querySelector('.showcase-grid');
    const loadShowcase = () => {
        if (!showcaseGrid) return;
        showcaseGrid.innerHTML = ''; // Clear existing hardcoded images
        
        const sketchesProjectIndex = projects.findIndex(p => p.name === 'Sketches');
        if (sketchesProjectIndex === -1) return;
        
        const sketchesProject = projects[sketchesProjectIndex];
        // Show only the first 2-3 sketches in the showcase
        sketchesProject.images.slice(0, 3).forEach((imgName, iIndex) => {
            const item = document.createElement('div');
            item.className = 'showcase-item stippled-border reveal';
            item.innerHTML = `
                <img src="Assets/${sketchesProject.folder}/${imgName}" alt="Initial Sketch - ${iIndex + 1}" loading="lazy">
                <div class="gallery-overlay">
                    <span class="view-btn" data-en="View Sketch" data-he="צפו בסקיצה">View Sketch</span>
                </div>
            `;
            item.addEventListener('click', () => openLightbox(sketchesProjectIndex, iIndex));
            showcaseGrid.appendChild(item);
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
        <div class="lightbox-nav">
            <button class="nav-prev" id="lightbox-prev" aria-label="Previous image">&lsaquo;</button>
            <button class="nav-next" id="lightbox-next" aria-label="Next image">&rsaquo;</button>
        </div>
        <div class="lightbox-info">
            <span id="lightbox-project-name"></span>
            <span id="lightbox-index"></span>
        </div>
        <img class="lightbox-content" id="lightbox-img" alt="Enlarged botanical illustration">
    `;
    document.body.appendChild(lightbox);

    const updateLightboxImage = () => {
        const project = projects[currentProjectIndex];
        const imgName = project.images[currentImageIndex];
        const lightboxImg = document.getElementById('lightbox-img');
        const projectNameEl = document.getElementById('lightbox-project-name');
        const indexEl = document.getElementById('lightbox-index');

        lightboxImg.src = `Assets/${project.folder}/${imgName}`;
        projectNameEl.textContent = project.name;
        indexEl.textContent = `${currentImageIndex + 1} / ${project.images.length}`;
    };

    const openLightbox = (pIndex, iIndex) => {
        currentProjectIndex = pIndex;
        currentImageIndex = iIndex;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const nextImage = () => {
        const project = projects[currentProjectIndex];
        currentImageIndex = (currentImageIndex + 1) % project.images.length;
        updateLightboxImage();
    };

    const prevImage = () => {
        const project = projects[currentProjectIndex];
        currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
        updateLightboxImage();
    };

    document.getElementById('lightbox-next').addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });

    document.getElementById('lightbox-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });

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
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
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
            dot.style.animation = `dotDraw ${0.5 + Math.random() * 1}s ease-in-out forwards`;
            dot.style.animationDelay = `${Math.random() * 1}s`;
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
                submitBtn.innerText = document.documentElement.lang === 'he' ? 'ההודעה נשלחה' : 'Message Sent';
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    loadShowcase();
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
