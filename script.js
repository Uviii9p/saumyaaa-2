/* -------------------------------------------------------------
   For Saumyaa Chauhan ❤️ - Interactions & Animations Script
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Init Custom Scroll animations & Header states ---
    const header = document.querySelector('.header');
    
    // Add class on scroll to make header more solid
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Make hero fade-in-up items run immediately
    const heroElements = document.querySelectorAll('.hero-content .fade-in-up');
    heroElements.forEach(el => {
        el.classList.add('animated');
    });

    // --- 2. Floating Canvas Particles (Hearts & Sparkles) ---
    function initParticleCanvas(canvasId, type = 'all') {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resize() {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 50;
                this.size = Math.random() * 14 + 6;
                this.speedY = -(Math.random() * 1.5 + 0.5);
                this.speedX = Math.sin(Math.random() * 4) * 0.4;
                this.opacity = Math.random() * 0.4 + 0.3;
                this.angle = Math.random() * 360;
                this.angleSpeed = Math.random() * 0.5 - 0.25;
                this.shapeType = Math.random() > 0.5 ? 'heart' : 'sparkle';
                if (type === 'heart') this.shapeType = 'heart';
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.translate(this.x, this.y);
                ctx.rotate((this.angle * Math.PI) / 180);
                
                if (this.shapeType === 'heart') {
                    // Draw a vector heart path
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, 0, -this.size, this.size/2);
                    ctx.bezierCurveTo(-this.size, this.size, -this.size/2, this.size*1.3, 0, this.size*1.8);
                    ctx.bezierCurveTo(this.size/2, this.size*1.3, this.size, this.size, this.size, this.size/2);
                    ctx.bezierCurveTo(this.size, 0, this.size/2, -this.size/2, 0, 0);
                    ctx.fillStyle = '#ffb5a7'; // Soft pink
                    ctx.fill();
                } else {
                    // Draw a 4-point sparkle star path
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size);
                    ctx.quadraticCurveTo(0, 0, this.size, 0);
                    ctx.quadraticCurveTo(0, 0, 0, this.size);
                    ctx.quadraticCurveTo(0, 0, -this.size, 0);
                    ctx.quadraticCurveTo(0, 0, 0, -this.size);
                    ctx.fillStyle = '#e9c46a'; // Rose gold gold sparkle
                    ctx.fill();
                }
                ctx.restore();
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.angle += this.angleSpeed;
                
                if (this.y < -30) {
                    this.y = canvas.height + 30;
                    this.x = Math.random() * canvas.width;
                    this.opacity = Math.random() * 0.4 + 0.3;
                }
            }
        }

        // Initialize particles array
        const pCount = Math.min(35, Math.floor(canvas.width / 40));
        for (let i = 0; i < pCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }

    initParticleCanvas('hero-particles', 'all');
    initParticleCanvas('final-particles', 'heart');

    // --- 3. Intersection Observer for Scroll Reveal ---
    const revealItems = document.querySelectorAll('.reveal-on-scroll, .timeline-item');
    
    // Smooth reveal observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    // --- 4. Interactive Special Qualities Card Flip (Tap Support for Mobile) ---
    const qualityCards = document.querySelectorAll('.quality-card');
    qualityCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Toggle active state for CSS transform transition
            qualityCards.forEach(c => {
                if (c !== card) c.classList.remove('active');
            });
            card.classList.toggle('active');
        });
    });

    // --- 5. Quotes Carousel / Slider ---
    const quoteSlides = document.querySelectorAll('.quote-slide');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let quoteInterval;

    function showSlide(index) {
        quoteSlides.forEach(slide => slide.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));

        quoteSlides[index].classList.add('active');
        sliderDots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % quoteSlides.length;
        showSlide(next);
    }

    function startSliderAuto() {
        stopSliderAuto();
        quoteInterval = setInterval(nextSlide, 6000); // 6 seconds auto rotation
    }

    function stopSliderAuto() {
        if (quoteInterval) clearInterval(quoteInterval);
    }

    // Dot click triggers
    sliderDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            showSlide(index);
            startSliderAuto();
        });
    });

    if (quoteSlides.length > 0) {
        startSliderAuto();
    }

    // --- 6. Interactive Message Generator ---
    const encouragementMessages = [
        "You make people's lives brighter.",
        "Your kindness matters.",
        "Never underestimate the impact of your support.",
        "The world is better because of people like you.",
        "Keep being your wonderful self.",
        "You bring so much light and peace to those around you.",
        "Your presence is a true blessing to everyone you meet.",
        "Thank you for being someone anyone can depend on."
    ];

    const messageBtn = document.getElementById('get-message-btn');
    const messageDisplay = document.getElementById('today-message');
    
    if (messageBtn && messageDisplay) {
        messageBtn.addEventListener('click', () => {
            messageDisplay.style.opacity = 0;
            setTimeout(() => {
                const currentMsg = messageDisplay.innerText;
                let newMsg = currentMsg;
                // Make sure we select a different message than the current one
                while (newMsg === currentMsg) {
                    const randomIndex = Math.floor(Math.random() * encouragementMessages.length);
                    newMsg = encouragementMessages[randomIndex];
                }
                messageDisplay.innerText = `"${newMsg}"`;
                messageDisplay.style.opacity = 1;
            }, 300);
        });
    }




    // --- 9. Journey smooth scroll helper ---
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
