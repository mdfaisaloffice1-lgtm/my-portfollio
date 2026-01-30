/**
 * FAISAL UDDIN - SHOPIFY PORTFOLIO
 * Premium JavaScript Interactions & Animations
 * Author: World-Class Frontend Architecture
 * Version: 1.0.0
 */

// ============================================================================
// INITIALIZATION & CONFIGURATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeGSAP();
    initializeCounters();
    initializeMobileMenu();
    initializeNavigation();
    initializeSmoothScroll();
    initializeFormValidation();
    initializeServiceCards();
    initializeTestimonialSlider();
    initializeFAQAccordion();
    initializeScrollAnimations();
    initializeParallaxEffects();
    initializeEmailAnimations();
    initializeTypingEffect();
    initializeProgressBars();
    initializePreloader();
});

// ============================================================================
// GSAP INITIALIZATION & SCROLL TRIGGER
// ============================================================================

function initializeGSAP() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero Section Animation
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    heroTimeline
        .from('.hero-title', {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: 0.3
        })
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.8
        }, '-=0.5')
        .from('.hero-cta', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
        }, '-=0.5')
        .from('.hero-stats', {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15
        }, '-=0.4');
    
    // Scroll-triggered animations for service cards
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 80,
            opacity: 0,
            duration: 0.9,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
    
    // Stats/Counter Cards Animation
    gsap.utils.toArray('.stat-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.7,
            delay: index * 0.15,
            ease: 'back.out(1.4)'
        });
    });
    
    // Feature Grid Animation
    gsap.utils.toArray('.feature-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%'
            },
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
    
    // Testimonial Animation
    gsap.utils.toArray('.testimonial-card').forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
    
    // Section Headers
    gsap.utils.toArray('h2').forEach((heading) => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: 'top 90%'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
}

// ============================================================================
// COUNTER ANIMATIONS
// ============================================================================

function initializeCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2500; // 2.5 seconds
        const increment = target / (duration / 16);
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + (counter.hasAttribute('data-plus') ? '+' : '');
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 16);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
    
    // Specific counter for 250+ projects
    const projectCounter = document.getElementById('projectCounter');
    if (projectCounter) {
        animateProjectCounter(projectCounter);
    }
}

function animateProjectCounter(element) {
    let count = 0;
    const target = 250;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        element.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(count);
                    }
                }, 16);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(element);
}

// ============================================================================
// MOBILE NAVIGATION MENU
// ============================================================================

function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('menuClose');
    const mobileMenuLinks = document.querySelectorAll('#mobileMenu a');
    
    if (!menuToggle || !mobileMenu) return;
    
    // Toggle menu
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
    });
    
    // Close menu
    if (menuClose) {
        menuClose.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(closeMobileMenu, 300);
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        document.body.style.overflow = 'auto';
    }
}

// ============================================================================
// NAVIGATION SCROLL EFFECTS
// ============================================================================

function initializeNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        // Hide/show on scroll direction (optional)
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down - you can hide nav if desired
            // nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active-link');
            }
        });
    });
}

// ============================================================================
// SMOOTH SCROLLING
// ============================================================================

function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore empty anchors
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Smooth scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollTopBtn.classList.add('opacity-100');
            } else {
                scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
                scrollTopBtn.classList.remove('opacity-100');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================================================
// FORM VALIDATION & SUBMISSION
// ============================================================================

function initializeFormValidation() {
    const form = document.querySelector('form[name="contact"]');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('Please fix the errors before submitting.', 'error');
            return;
        }
        
        // Show loading state
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        
        try {
            // Netlify form submission
            const formData = new FormData(form);
            
            const response = await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            });
            
            if (response.ok) {
                showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                form.reset();
                
                // Track conversion (if analytics is set up)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        'event_category': 'Contact',
                        'event_label': 'Contact Form'
                    });
                }
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            showNotification('Something went wrong. Please email me directly at faisaluddinbd155@gmail.com', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove previous error
    clearFieldError(field);
    
    // Required field check
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation (optional but if filled)
    if (name === 'phone' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Message length
    if (type === 'textarea' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error', 'border-red-500');
    field.classList.remove('border-blue-500');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-400 text-sm mt-1';
    errorDiv.textContent = message;
    
    field.parentElement.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error', 'border-red-500');
    const errorMsg = field.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-6 z-50 px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-500 ${
        type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    } text-white font-semibold max-w-md`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-3 text-xl"></i>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// ============================================================================
// SERVICE CARDS INTERACTIONS
// ============================================================================

function initializeServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // 3D tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ============================================================================
// TESTIMONIAL SLIDER
// ============================================================================

function initializeTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;
    
    const cards = slider.querySelectorAll('.testimonial-card');
    if (cards.length === 0) return;
    
    let currentIndex = 0;
    const autoPlayInterval = 5000;
    
    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'flex justify-center mt-8 gap-3';
    
    cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${
            index === 0 ? 'bg-blue-500 w-8' : 'bg-gray-600'
        }`;
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    slider.parentElement.appendChild(dotsContainer);
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function updateSlider() {
        cards.forEach((card, index) => {
            card.style.display = index === currentIndex ? 'block' : 'none';
        });
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('button');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('bg-blue-500', 'w-8');
                dot.classList.remove('bg-gray-600');
            } else {
                dot.classList.remove('bg-blue-500', 'w-8');
                dot.classList.add('bg-gray-600');
            }
        });
    }
    
    // Auto-play
    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
    }, autoPlayInterval);
    
    updateSlider();
}

// ============================================================================
// FAQ ACCORDION
// ============================================================================

function initializeFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item, .service-card');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h4, h3');
        if (!question) return;
        
        // Make clickable
        question.style.cursor = 'pointer';
        question.style.userSelect = 'none';
        
        // Add toggle icon
        if (!question.querySelector('.toggle-icon')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-chevron-down toggle-icon ml-2 transition-transform duration-300 text-sm';
            question.appendChild(icon);
        }
        
        const answer = item.querySelector('p');
        if (!answer) return;
        
        // Initially hide answers (optional)
        // answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            const isOpen = !answer.classList.contains('hidden');
            const icon = question.querySelector('.toggle-icon');
            
            if (isOpen) {
                answer.classList.add('hidden');
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                answer.classList.remove('hidden');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
            
            // Smooth height animation
            if (typeof gsap !== 'undefined') {
                gsap.from(answer, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

function initializeScrollAnimations() {
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Progress bar on scroll
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
}

// ============================================================================
// PARALLAX EFFECTS
// ============================================================================

function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================================================================
// STRATEGIC EMAIL ANIMATIONS
// ============================================================================

function initializeEmailAnimations() {
    const emailButtons = document.querySelectorAll('.strategic-email');
    
    emailButtons.forEach(button => {
        // Pulse animation on page load
        if (typeof gsap !== 'undefined') {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.8,
                repeat: 2,
                yoyo: true,
                ease: 'power1.inOut',
                delay: 1
            });
        }
        
        // Magnetic effect
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// ============================================================================
// TYPING EFFECT
// ============================================================================

function initializeTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
        const text = element.dataset.typing || element.textContent;
        const speed = parseInt(element.dataset.typingSpeed) || 100;
        
        element.textContent = '';
        element.style.opacity = '1';
        
        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, speed);
            }
        };
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// ============================================================================
// PROGRESS BARS
// ============================================================================

function initializeProgressBars() {
    const progressBars = document.querySelectorAll('[data-progress]');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.dataset.progress + '%';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = targetWidth;
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

// ============================================================================
// PAGE PRELOADER
// ============================================================================

function initializePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================

// Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// ============================================================================
// ANALYTICS & TRACKING (Optional)
// ============================================================================

function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track clicks on strategic email buttons
document.querySelectorAll('.strategic-email').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('Contact', 'email_click', button.textContent.trim());
    });
});

// Track WhatsApp clicks
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Contact', 'whatsapp_click', 'WhatsApp');
    });
});

// ============================================================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================================================

// Keyboard navigation for cards
document.querySelectorAll('.service-card, .testimonial-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// Focus visible for keyboard users
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-user');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-user');
});

// ============================================================================
// DARK MODE TOGGLE (Optional Enhancement)
// ============================================================================

function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'light') {
        document.body.classList.add('light-mode');
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('darkMode', isLight ? 'light' : 'dark');
    });
}

// ============================================================================
// CASE STUDY PAGE SPECIFIC
// ============================================================================

function initializeCaseStudyFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const caseStudyCards = document.querySelectorAll('[data-category]');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter cards
            caseStudyCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    if (typeof gsap !== 'undefined') {
                        gsap.from(card, {
                            scale: 0.8,
                            opacity: 0,
                            duration: 0.5
                        });
                    }
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Initialize case study filters if on case studies page
if (window.location.pathname.includes('case-stud')) {
    document.addEventListener('DOMContentLoaded', initializeCaseStudyFilters);
}

// ============================================================================
// CONSOLE MESSAGE (Easter Egg)
// ============================================================================

console.log('%c👋 Hello Developer!', 'font-size: 24px; font-weight: bold; color: #2563EB;');
console.log('%cThis portfolio was built with custom code, not apps!', 'font-size: 14px; color: #64748b;');
console.log('%cInterested in working together? Email: faisaluddinbd155@gmail.com', 'font-size: 12px; color: #94a3b8;');

// ============================================================================
// ERROR HANDLING
// ============================================================================

window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.message);
    // Optionally send errors to analytics
    trackEvent('Error', 'javascript_error', e.message);
});

// ============================================================================
// END OF SCRIPT
// ============================================================================
