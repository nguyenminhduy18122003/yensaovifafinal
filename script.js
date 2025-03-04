document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Header Sticky
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
        } else {
            header.style.padding = '20px 0';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.querySelector('body');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (mainNav.style.display === 'block') {
                mainNav.style.display = 'none';
                body.style.overflow = 'auto';
                this.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                mainNav.style.display = 'block';
                body.style.overflow = 'hidden';
                this.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
        
        // Close mobile menu when clicking on a menu link
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainNav.style.display = 'none';
                    body.style.overflow = 'auto';
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }

    // Product Slider
    const productSlider = document.querySelector('.product-slider');
    const productSlides = document.querySelectorAll('.product-slide');
    const productDots = document.querySelectorAll('.slider-dot');
    const prevProduct = document.querySelector('.prev-product');
    const nextProduct = document.querySelector('.next-product');
    let currentProductSlide = 0;
    const totalProductSlides = productSlides.length;
    
    if (productSlider && totalProductSlides > 0) {
        // Set initial position
        function updateProductSlider() {
            productSlider.style.transform = `translateX(-${currentProductSlide * 100}%)`;
            
            // Update active dot
            productDots.forEach((dot, index) => {
                if (index === currentProductSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Next slide
        function nextProductSlide() {
            currentProductSlide = (currentProductSlide + 1) % totalProductSlides;
            updateProductSlider();
        }
        
        // Previous slide
        function prevProductSlide() {
            currentProductSlide = (currentProductSlide - 1 + totalProductSlides) % totalProductSlides;
            updateProductSlider();
        }
        
        // Click on dot
        productDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentProductSlide = index;
                updateProductSlider();
            });
        });
        
        // Click on arrows
        if (nextProduct) {
            nextProduct.addEventListener('click', nextProductSlide);
        }
        
        if (prevProduct) {
            prevProduct.addEventListener('click', prevProductSlide);
        }
        
        // Auto slide (optional)
        let productSlideInterval = setInterval(nextProductSlide, 7000);
        
        // Pause auto slide on hover
        productSlider.addEventListener('mouseenter', () => {
            clearInterval(productSlideInterval);
        });
        
        productSlider.addEventListener('mouseleave', () => {
            productSlideInterval = setInterval(nextProductSlide, 7000);
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
        });
    });

    // Testimonial Slider
    let currentSlide = 0;
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const totalSlides = testimonialItems.length;
    
    if(testimonialItems.length > 0) {
        // Hide all slides except the first one
        testimonialItems.forEach((item, index) => {
            if(index !== 0) {
                item.style.display = 'none';
            }
        });
        
        // Previous button click
        document.querySelector('.prev-btn').addEventListener('click', () => {
            testimonialItems[currentSlide].style.display = 'none';
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            testimonialItems[currentSlide].style.display = 'block';
        });
        
        // Next button click
        document.querySelector('.next-btn').addEventListener('click', () => {
            testimonialItems[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % totalSlides;
            testimonialItems[currentSlide].style.display = 'block';
        });
    }

    // Form Submission
    const orderForm = document.getElementById('orderForm');
    if(orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
            this.reset();
        });
    }

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for in-page links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
// Handle touch events for sliders on mobile
const productSlider = document.querySelector('.product-slider');
if (productSlider) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    productSlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    productSlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next slide
            document.querySelector('.next-product').click();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous slide
            document.querySelector('.prev-product').click();
        }
    }
}

// Handle testimonial slider touch events
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialSlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    testimonialSlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleTestimonialSwipe();
    }, false);
    
    function handleTestimonialSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next testimonial
            document.querySelector('.next-btn').click();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous testimonial
            document.querySelector('.prev-btn').click();
        }
    }
}
