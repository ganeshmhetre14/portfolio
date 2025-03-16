// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    const contactForm = document.getElementById('contactForm');
    
    // Variables
    let currentSlide = 0;
    
    // ===== NAVBAR SCROLL EFFECT =====
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide scroll to top button
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
        
        // Active nav link based on scroll position
        updateActiveNavOnScroll();
    });
    
    // ===== MOBILE MENU TOGGLE =====
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ===== PROJECTS FILTER =====
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ===== TESTIMONIAL SLIDER =====
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        // Handle boundary cases
        if (index < 0) {
            currentSlide = testimonialSlides.length - 1;
        } else if (index >= testimonialSlides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        testimonialSlides[currentSlide].classList.add('active');
        testimonialDots[currentSlide].classList.add('active');
    }
    
    // Previous slide
    prevBtn.addEventListener('click', function() {
        showSlide(currentSlide - 1);
    });
    
    // Next slide
    nextBtn.addEventListener('click', function() {
        showSlide(currentSlide + 1);
    });
    
    // Dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // ===== CONTACT FORM =====
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Basic form validation
        let isValid = true;
        const fields = Object.keys(formData);
        
        fields.forEach(field => {
            const value = formData[field].trim();
            const inputElement = document.getElementById(field);
            
            if (!value) {
                isValid = false;
                // Add error styling
                inputElement.style.borderColor = 'red';
                inputElement.style.backgroundColor = 'rgba(255, 0, 0, 0.05)';
            } else {
                // Reset styling
                inputElement.style.borderColor = '';
                inputElement.style.backgroundColor = '';
            }
        });
        
        if (isValid) {
            // This would normally connect to a server endpoint
            // For demo purposes, we'll just log the data and show a success message
            console.log('Form submitted:', formData);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Thank you for your message! I'll get back to you soon.</p>
            `;
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        }
    });
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== UPDATE ACTIVE NAV LINK ON SCROLL =====
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100; // Add offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ===== TYPEIT EFFECT FOR HERO SECTION =====
    function typeEffect() {
        const textElement = document.querySelector('.hero-text h2');
        if(!textElement) return;
        
        const text = textElement.textContent;
        textElement.textContent = '';
        
        let i = 0;
        const typing = setInterval(function() {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                
                // Add cursor blinking effect
                textElement.classList.add('typing-complete');
                setTimeout(() => {
                    textElement.classList.remove('typing-complete');
                }, 2000);
            }
        }, 100);
    }
    
    // Run type effect after page load
    setTimeout(typeEffect, 1000);
    
    // ===== SKILLS ANIMATION =====
    function animateSkills() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(level => {
            const width = level.style.width;
            level.style.width = '0';
            
            setTimeout(() => {
                level.style.transition = 'width 1s ease-in-out';
                level.style.width = width;
            }, 200);
        });
    }
    
    // Intersection Observer for skill bars animation
    const skillsSection = document.querySelector('.skills');
    
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }
    
    // ===== APPEAR ANIMATION FOR SECTIONS =====
    const sectionsToAnimate = document.querySelectorAll('section:not(.hero)');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1 });
    
    sectionsToAnimate.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
    
    // Apply appear class to sections already in view on page load
    sectionsToAnimate.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight) {
            section.classList.add('appear');
        }
    });
    
    // Add CSS class when sections become visible
    document.addEventListener('scroll', function() {
        const appear = document.createEvent('Event');
        appear.initEvent('appear', true, true);
        document.body.dispatchEvent(appear);
    });
    
    // ===== PROJECT HOVER EFFECTS =====
    const projectItems = document.querySelectorAll('.project-card');
    
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.project-overlay').style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.project-overlay').style.opacity = '0';
        });
    });
    
    // ===== INITIALIZE PAGE =====
    showSlide(0); // Initialize testimonial slider
    
    // Add animation CSS
    const style = document.createElement('style');
    style.textContent = `
        .appear {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .typing-complete::after {
            content: '|';
            animation: blink 1s infinite;
        }
        
        .success-message {
            text-align: center;
            padding: 2rem;
        }
        
        .success-message i {
            color: var(--secondary-color);
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .success-message p {
            font-size: 1.2rem;
            color: var(--dark-color);
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});


// Email Script

// Navigation & Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu when clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.testimonial-btn.prev');
const nextBtn = document.querySelector('.testimonial-btn.next');

if (testimonialSlides.length > 0) {
    let currentSlide = 0;

    // Function to update slide
    const showSlide = (index) => {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        });
    }

    // Auto-play slider
    setInterval(() => {
        if (nextBtn) {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }
    }, 5000);
}

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
}

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Send email using EmailJS
        emailjs.send('service_2ebhv78', 'template_dy1bo6f', formData, 'VCnxnew8OcHO3U4vT')
            .then(function(response) {
                alert('Message sent successfully!');
                contactForm.reset();
            }, function(error) {
                alert('Failed to send message. Please try again later.');
                console.error('Error:', error);
            });
    });
}