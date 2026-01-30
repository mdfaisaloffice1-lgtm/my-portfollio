/**
 * FAISAL UDDIN - SHOPIFY PORTFOLIO
 * Premium JavaScript Animations & Interactions
 * Author: Faisal Uddin
 * Version: 1.0
 */

// ============================================
// GLOBAL VARIABLES & CONFIGURATION
// ============================================

const config = {
    scrollOffset: 100,
    animationDuration: 300,
    emailPulseInterval: 3000,
    typingSpeed: 50,
    mobileBreakpoint: 768
};

// ============================================
// SMOOTH SCROLLING
// ============================================

function initSmoothScrolling() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - config.scrollOffset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// NAVBAR SCROLL EFFECTS
// ============================================

function initNavbarEffects() {
    const navbar = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.classList.add('shadow-2xl');
        } else {
            navbar.classList.remove('shadow-2xl');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function initMobileMenu() {
    // Create mobile menu button if it doesn't exist
    const nav = document.querySelector('nav .max-w-7xl');
    if (!nav) return;
    
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'md:hidden text-white p-2';
    mobileMenuBtn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
    `;
    
    const desktopMenu = nav.querySelector('.hidden.md\\:flex');
    if (!desktopMenu) return;
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'hidden md:hidden absolute top-20 left-0 right-0 bg-[#0F172A] border-t border-[#2563EB]/20 shadow-2xl';
    mobileMenu.innerHTML = desktopMenu.innerHTML;
    mobileMenu.querySelector('.space-x-8').className = 'flex flex-col space-y-4 p-6';
    
    // Insert elements
    nav.appendChild(mobileMenuBtn);
    nav.parentElement.appendChild(mobileMenu);
    
    // Toggle functionality
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenuBtn.innerHTML = isOpen ? `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        ` : `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
        `;
    });
    
    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            `;
        });
    });
}

// ============================================
// EMAIL ANIMATION EFFECTS
// ============================================

function initEmailAnimations() {
    const emailLinks = document.querySelectorAll('a[href^="mailto"]');
    
    emailLinks.forEach(link => {
        // Hover ripple effect
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Click animation
        link.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'absolute inset-0 bg-white opacity-30 rounded-lg';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ============================================
// COUNTER ANIMATIONS
// ============================================

function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for triggering animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// TYPING EFFECT
// ============================================

function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let index = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && index === 0) {
                    const typeChar = () => {
                        if (index < text.length) {
                            element.textContent += text.charAt(index);
                            index++;
                            setTimeout(typeChar, config.typingSpeed);
                        }
                    };
                    typeChar();
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// ============================================
// CARD HOVER EFFECTS
// ============================================

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .case-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create glow effect at cursor position
            const glow = document.createElement('div');
            glow.className = 'absolute w-32 h-32 bg-[#2563EB] opacity-20 rounded-full blur-3xl pointer-events-none';
            glow.style.left = x - 64 + 'px';
            glow.style.top = y - 64 + 'px';
            glow.style.transition = 'all 0.3s ease';
            
            this.style.position = 'relative';
            this.appendChild(glow);
            
            // Remove glow on mouse leave
            this.addEventListener('mouseleave', () => {
                glow.remove();
            }, { once: true });
        });
    });
}

// ============================================
// FORM VALIDATION & HANDLING
// ============================================

function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields correctly.', 'error');
            } else {
                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = `
                        <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    `;
                    submitBtn.disabled = true;
                    
                    // Netlify will handle the actual submission
                    // Reset button after a delay (in case of errors)
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 5000);
                }
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    field.classList.remove('error', 'border-red-500');
    
    // Check if required
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // URL validation
    if (field.type === 'url' && value) {
        const urlRegex = /^https?:\/\/.+/;
        if (!urlRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid URL (starting with http:// or https://)';
        }
    }
    
    // Show error if invalid
    if (!isValid) {
        field.classList.add('error', 'border-red-500');
        const error = document.createElement('p');
        error.className = 'error-message text-red-400 text-sm mt-1 font-manrope';
        error.textContent = errorMessage;
        field.parentElement.appendChild(error);
    }
    
    return isValid;
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-4 z-50 max-w-sm p-4 rounded-lg shadow-2xl transform translate-x-full transition-transform duration-300 ${
        type === 'error' ? 'bg-red-500' : 
        type === 'success' ? 'bg-green-500' : 
        'bg-[#2563EB]'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${type === 'error' ? 
                    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>' :
                type === 'success' ?
                    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>' :
                    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
                }
            </svg>
            <p class="font-manrope text-white">${message}</p>
            <button class="ml-auto text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============================================
// PARALLAX SCROLL EFFECTS
// ============================================

function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// FAQ ACCORDION ANIMATIONS
// ============================================

function initFAQAccordion() {
    const details = document.querySelectorAll('details');
    
    details.forEach(detail => {
        const summary = detail.querySelector('summary');
        
        summary.addEventListener('click', (e) => {
            // Close other details
            if (!detail.hasAttribute('open')) {
                details.forEach(otherDetail => {
                    if (otherDetail !== detail && otherDetail.hasAttribute('open')) {
                        otherDetail.removeAttribute('open');
                    }
                });
            }
            
            // Smooth scroll to opened detail
            setTimeout(() => {
                if (detail.hasAttribute('open')) {
                    const yOffset = -100;
                    const y = detail.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        });
    });
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================

function initScrollProgressBar() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] z-50 transition-all duration-150';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

function initBackToTop() {
    // Create button
    const backToTop = document.createElement('button');
    backToTop.className = 'fixed bottom-8 right-8 bg-[#2563EB] hover:bg-[#1D4ED8] text-white p-4 rounded-full shadow-2xl z-40 opacity-0 pointer-events-none transition-all duration-300';
    backToTop.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
        </svg>
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// CURSOR TRAIL EFFECT (Desktop Only)
// ============================================

function initCursorTrail() {
    if (window.innerWidth < config.mobileBreakpoint) return;
    
    const trail = [];
    const trailLength = 10;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'fixed w-2 h-2 bg-[#2563EB] rounded-full pointer-events-none z-50 opacity-0';
        dot.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate trail
    function animateTrail() {
        trail.forEach((dot, index) => {
            const delay = index * 50;
            setTimeout(() => {
                dot.style.left = mouseX + 'px';
                dot.style.top = mouseY + 'px';
                dot.style.opacity = (trailLength - index) / trailLength * 0.5;
            }, delay);
        });
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// ============================================
// TEXT REVEAL ANIMATION
// ============================================

function initTextReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'textReveal 1s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// ============================================
// SOCIAL SHARE FUNCTIONALITY
// ============================================

function initSocialShare() {
    const shareButtons = document.querySelectorAll('[data-share]');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-share');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${title}%20${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// ============================================
// COPY TO CLIPBOARD
// ============================================

function initCopyToClipboard() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = this.getAttribute('data-copy');
            
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Copied to clipboard!', 'success');
                
                // Visual feedback
                const originalText = this.innerHTML;
                this.innerHTML = `
                    <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Copied!
                `;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }).catch(() => {
                showNotification('Failed to copy. Please try again.', 'error');
            });
        });
    });
}

// ============================================
// CUSTOM CURSOR (Desktop Only)
// ============================================

function initCustomCursor() {
    if (window.innerWidth < config.mobileBreakpoint) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor fixed w-8 h-8 border-2 border-[#2563EB] rounded-full pointer-events-none z-50 transition-transform duration-200';
    cursor.style.display = 'none';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.display = 'block';
    });
    
    // Smooth cursor follow
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX - 16 + 'px';
        cursor.style.top = cursorY - 16 + 'px';
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Expand on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

// ============================================
// PAGE TRANSITION EFFECTS
// ============================================

function initPageTransitions() {
    // Fade in on page load
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Fade out on navigation
    const links = document.querySelectorAll('a:not([href^="#"]):not([href^="mailto"]):not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                const href = this.href;
                
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '0';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
        
        // Send analytics if needed
        if (window.gtag) {
            gtag('event', 'timing_complete', {
                name: 'load',
                value: loadTime,
                event_category: 'JS Dependencies'
            });
        }
    });
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

function initAccessibility() {
    // Keyboard navigation helper
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#2563EB] focus:text-white focus:px-4 focus:py-2 focus:rounded';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ============================================
// PRINT STYLES HANDLER
// ============================================

function initPrintHandler() {
    window.addEventListener('beforeprint', () => {
        // Remove animations before printing
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', () => {
        document.body.classList.remove('printing');
    });
}

// ============================================
// EASTER EGG
// ============================================

function initEasterEgg() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showNotification('🎉 You found the secret! Faisal appreciates your curiosity!', 'success');
                // Trigger confetti or special animation
                document.body.style.animation = 'rainbow 2s ease-in-out';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 2000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

// ============================================
// INITIALIZE ALL FUNCTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Faisal Uddin Portfolio...');
    
    // Core functionality
    initSmoothScrolling();
    initNavbarEffects();
    initMobileMenu();
    
    // Visual effects
    initEmailAnimations();
    initCardHoverEffects();
    initParallaxEffects();
    
    // Content animations
    initCounterAnimations();
    initTypingEffect();
    initTextReveal();
    initFAQAccordion();
    
    // Forms and interactions
    initFormHandling();
    initCopyToClipboard();
    initSocialShare();
    
    // UI enhancements
    initScrollProgressBar();
    initBackToTop();
    initLazyLoading();
    
    // Advanced features (desktop only)
    if (window.innerWidth >= config.mobileBreakpoint) {
        initCursorTrail();
        initCustomCursor();
    }
    
    // Accessibility and performance
    initAccessibility();
    initPerformanceMonitoring();
    initPrintHandler();
    initPageTransitions();
    
    // Fun stuff
    initEasterEgg();
    
    console.log('✅ Portfolio initialized successfully!');
});

// ============================================
// CUSTOM CSS ANIMATIONS (Injected)
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
    }
    
    @keyframes textReveal {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .keyboard-nav *:focus {
        outline: 2px solid #2563EB !important;
        outline-offset: 2px !important;
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
    
    .printing * {
        animation: none !important;
        transition: none !important;
    }
    
    img.loaded {
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

document.head.appendChild(style);

// ============================================
// EXPORT FOR MODULE USAGE (Optional)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSmoothScrolling,
        initNavbarEffects,
        initEmailAnimations,
        showNotification
    };
}
