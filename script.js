/* Premium Data Science Portfolio Logic Engine */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Page Loader Handler
    // ==========================================
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            // Start entry animations
            triggerHeroAnimations();
        }, 1000); // 1.0s delay for a premium presentation feel
    });

    // In case load event fires too fast or fails
    setTimeout(() => {
        if (loader && loader.style.opacity !== '0') {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            triggerHeroAnimations();
        }
    }, 2500);

    function triggerHeroAnimations() {
        const reveals = document.querySelectorAll('.hero-section .reveal');
        reveals.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 120); // Staggered loading
        });
    }

    // ==========================================
    // 2. Light / Dark Theme Switcher
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    // Load saved preference
    const savedTheme = localStorage.getItem('aura-theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlEl.setAttribute('data-theme', nextTheme);
        localStorage.setItem('aura-theme', nextTheme);
        
        createFlashEffect(nextTheme);
    });

    function createFlashEffect(theme) {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100vw';
        flash.style.height = '100vh';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '9998';
        flash.style.backgroundColor = theme === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
        flash.style.transition = 'opacity 0.5s ease';
        flash.style.opacity = '1';
        document.body.appendChild(flash);
        
        requestAnimationFrame(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 500);
        });
    }

    // ==========================================
    // 3. Scroll Reveal System
    // ==========================================
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('active');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
        updateStickyNavbar();
        updateActiveNavLink();
    });

    // Run once on load
    setTimeout(handleScrollAnimation, 1200);

    // Sticky Nav sizing on scroll
    const header = document.querySelector('.header');
    function updateStickyNavbar() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
    }

    // Active Link Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // ==========================================
    // 4. 3D Tilt Card Effect (Clean spotlight overlays on hover)
    // ==========================================
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Subtly rotate cards on hover (max 4 degrees tilt)
            const rotateX = ((centerY - y) / centerY) * 4; 
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
            
            const glow = card.querySelector('.card-spots-glow, .portrait-glow');
            if (glow) {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            const glow = card.querySelector('.card-spots-glow, .portrait-glow');
            if (glow) {
                glow.style.left = '50%';
                glow.style.top = '50%';
            }
        });
    });

    // ==========================================
    // 5. Magnetic Buttons Effect
    // ==========================================
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Pull the button towards cursor position
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // ==========================================
    // 6. Ripple & CTA Interaction
    // ==========================================
    const mainCta = document.getElementById('main-hire-btn');
    if (mainCta) {
        mainCta.addEventListener('click', (e) => {
            const rect = mainCta.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            mainCta.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
                // Smooth scroll to contact
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
            }, 800);
        });
    }

    // ==========================================
    // 7. Mobile Navigation Handler
    // ==========================================
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinksList = document.querySelectorAll('.nav-link');

    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================
    // 8. SVM Decision Hyperplane Classifier (Background Canvas)
    // ==========================================
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const numParticles = 110;

        let mouse = { x: null, y: null };
        let easedMouse = { x: 0, y: 0 };
        
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class DataPoint {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.radius = Math.random() * 3 + 1.5;
                this.color = '#94A3B8';
                this.isSupportVector = false;
            }

            draw(isLight) {
                // Faint fill to keep background unobtrusive
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.isSupportVector 
                    ? (isLight ? 0.6 : 0.35) 
                    : (isLight ? 0.28 : 0.14);
                ctx.fill();

                if (this.isSupportVector) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius + 4, 0, Math.PI * 2);
                    ctx.strokeStyle = isLight ? '#0891B2' : '#00F0FF';
                    ctx.lineWidth = 1;
                    ctx.globalAlpha = isLight ? 0.45 : 0.25;
                    ctx.stroke();
                }
            }

            update(ux, uy, xm, ym, margin, isLight) {
                // Drifts slowly
                this.x += this.vx * 0.3;
                this.y += this.vy * 0.3;

                // Boundary collision
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

                // SVM Decision Boundary projection math
                let projection = (this.x - xm) * ux + (this.y - ym) * uy;

                // Classify point based on sign of projection relative to decision boundary
                if (projection >= 0) {
                    this.color = isLight ? '#059669' : '#00E676'; // Class Green
                } else {
                    this.color = isLight ? '#1D4ED8' : '#0066FF'; // Class Blue
                }

                // Support Vectors are points within the margin boundary limit
                if (Math.abs(projection) < margin) {
                    this.isSupportVector = true;
                } else {
                    this.isSupportVector = false;
                }

                this.draw(isLight);
            }
        }

        function resizeCanvas() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function init() {
            resizeCanvas();
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push(new DataPoint());
            }
            easedMouse.x = canvas.width / 2;
            easedMouse.y = canvas.height / 2;
        }

        let time = 0;
        function animate() {
            if (!canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.005;

            // Target coordinates: cursor coordinates or slow orbit
            let targetX = mouse.x !== null ? mouse.x : canvas.width / 2 + Math.sin(time) * 180;
            let targetY = mouse.y !== null ? mouse.y : canvas.height / 2 + Math.cos(time * 0.8) * 120;

            // Smooth coordinate easing
            easedMouse.x += (targetX - easedMouse.x) * 0.08;
            easedMouse.y += (targetY - easedMouse.y) * 0.08;

            // Compute hyperplane angle perpendicular to vector between center and boundary origin
            let cx = canvas.width / 2;
            let cy = canvas.height / 2;
            let dx = easedMouse.x - cx;
            let dy = easedMouse.y - cy;
            if (dx === 0 && dy === 0) dx = 0.01;

            let dist = Math.sqrt(dx * dx + dy * dy);
            let ux = dx / dist; // Unit vector of weight axis
            let uy = dy / dist;

            // Perpendicular direction vectors for drawing the boundary line
            let px = -uy;
            let py = ux;

            const margin = 55; // SVM Margin width

            // Get current active theme
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';

            // Draw decision boundary solid line (Hyperplane)
            ctx.beginPath();
            ctx.moveTo(easedMouse.x - px * 2000, easedMouse.y - py * 2000);
            ctx.lineTo(easedMouse.x + px * 2000, easedMouse.y + py * 2000);
            ctx.strokeStyle = isLight ? '#0891B2' : '#00F0FF';
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = isLight ? 0.35 : 0.08;
            ctx.stroke();

            // Draw positive margin line (Dashed)
            ctx.beginPath();
            ctx.setLineDash([6, 6]);
            ctx.moveTo(easedMouse.x + ux * margin - px * 2000, easedMouse.y + uy * margin - py * 2000);
            ctx.lineTo(easedMouse.x + ux * margin + px * 2000, easedMouse.y + uy * margin + py * 2000);
            ctx.strokeStyle = isLight ? '#059669' : '#00E676';
            ctx.lineWidth = 1;
            ctx.globalAlpha = isLight ? 0.18 : 0.04;
            ctx.stroke();

            // Draw negative margin line (Dashed)
            ctx.beginPath();
            ctx.moveTo(easedMouse.x - ux * margin - px * 2000, easedMouse.y - uy * margin - py * 2000);
            ctx.lineTo(easedMouse.x - ux * margin + px * 2000, easedMouse.y - uy * margin + py * 2000);
            ctx.strokeStyle = isLight ? '#1D4ED8' : '#0066FF';
            ctx.lineWidth = 1;
            ctx.globalAlpha = isLight ? 0.18 : 0.04;
            ctx.stroke();
            ctx.setLineDash([]); // Reset dash

            // Update all background data points
            particles.forEach(p => p.update(ux, uy, easedMouse.x, easedMouse.y, margin, isLight));
            
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resizeCanvas);
        init();
        animate();
    }

    // ==========================================
    // 9. Live Model Training Telemetry HUD Ticker (Removed for technical credibility)
    // ==========================================

    // ==========================================
    // 10. Technical Journey Curve Animation & Tooltips
    // ==========================================
    const journeySection = document.querySelector('.journey-section');
    const activeCurve = document.getElementById('active-journey-curve');
    const shimmerCurve = document.getElementById('shimmer-journey-curve');
    const nodes = document.querySelectorAll('.journey-node');
    const tooltip = document.getElementById('journey-tooltip');
    const tooltipBadge = document.getElementById('tooltip-badge');
    const tooltipTitle = document.getElementById('tooltip-title');
    const tooltipDesc = document.getElementById('tooltip-desc');
    const wrapper = document.querySelector('.journey-wrapper');

    if (journeySection && activeCurve && nodes.length > 0 && tooltip) {
        
        // Setup initial dash properties
        const pathLength = activeCurve.getTotalLength();
        activeCurve.style.strokeDasharray = pathLength;
        activeCurve.style.strokeDashoffset = pathLength;
        
        if (shimmerCurve) {
            shimmerCurve.style.strokeDasharray = `80 ${pathLength}`;
            shimmerCurve.style.strokeDashoffset = pathLength;
        }

        // Observer to trigger drawing animations when in viewport
        const observerOptions = {
            root: null,
            threshold: 0.15
        };

        const journeyObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    journeySection.classList.add('active');
                    
                    // Draw path smoothly
                    activeCurve.style.strokeDashoffset = '0';
                    
                    // Trigger nodes sequentially as path draws
                    nodes.forEach((node, index) => {
                        // Stagger the soft pop-active animations
                        setTimeout(() => {
                            node.classList.add('pop-active');
                            
                            // Highlight shimmer curve during drawing
                            if (shimmerCurve) {
                                shimmerCurve.style.opacity = '0.4';
                            }
                        }, 200 + (index * 200)); // Sync with drawing speed
                    });

                    // Enable path shimmer loops after drawing concludes
                    setTimeout(() => {
                        if (shimmerCurve) {
                            shimmerCurve.style.opacity = '0.2';
                            shimmerCurve.classList.add('journey-curve-shimmer');
                        }
                    }, 2000);

                    // Unobserve to trigger only once
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        journeyObserver.observe(journeySection);

        // Hover tooltip and interaction details
        let activeNodeIndex = null;

        nodes.forEach(node => {
            const showTooltip = () => {
                const name = node.getAttribute('data-name');
                const status = node.getAttribute('data-status');
                const desc = node.getAttribute('data-desc');
                const accentColor = node.getAttribute('data-color');
                const idx = parseInt(node.getAttribute('data-index'), 10);

                // Update text elements and position (only if NOT Deep Learning node index 6)
                if (idx !== 6) {
                    tooltipTitle.textContent = name;
                    tooltipDesc.textContent = desc;
                    tooltipBadge.textContent = status;

                    // DL visual modifications inside tooltip
                    if (status.includes('Ongoing')) {
                        tooltipBadge.className = 'tooltip-badge badge-learning';
                    } else {
                        tooltipBadge.className = 'tooltip-badge';
                    }

                    // Color accent matches node accent color
                    tooltipBadge.style.color = accentColor;
                    tooltip.style.borderColor = `rgba(${hexToRgb(accentColor)}, 0.25)`;
                    tooltip.style.boxShadow = `0 10px 30px rgba(${hexToRgb(accentColor)}, 0.1)`;

                    // Position tooltip centering above the hovered node relative to wrapper
                    const wrapperRect = wrapper.getBoundingClientRect();
                    const nodeRect = node.getBoundingClientRect();
                    const x = (nodeRect.left - wrapperRect.left) + nodeRect.width / 2;
                    const y = (nodeRect.top - wrapperRect.top);

                    tooltip.style.left = `${x}px`;
                    tooltip.style.top = `${y - 14}px`;
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translate(-50%, -100%) scale(1)';
                }

                // Visual feedbacks: thicken active curve and glow active node (applies to all nodes)
                activeCurve.style.strokeWidth = '6';
                if (shimmerCurve) {
                    shimmerCurve.style.opacity = '0.6';
                }

                // Dynamic data coordinate lines projection (data science theme - applies to all nodes)
                const transformAttr = node.getAttribute('transform');
                const coords = transformAttr ? transformAttr.match(/translate\(([^,]+),\s*([^)]+)\)/) : null;
                if (coords) {
                    const nx = parseFloat(coords[1]);
                    const ny = parseFloat(coords[2]);
                    const guideX = document.getElementById('guide-x');
                    const guideY = document.getElementById('guide-y');
                    const guideLabel = document.getElementById('guide-label');
                    
                    if (guideX && guideY && guideLabel) {
                        guideX.setAttribute('x1', nx);
                        guideX.setAttribute('y1', ny);
                        guideX.setAttribute('x2', nx);
                        guideX.setAttribute('y2', 395);
                        guideX.style.opacity = '0.35';
                        
                        guideY.setAttribute('x1', nx);
                        guideY.setAttribute('y1', ny);
                        guideY.setAttribute('x2', 30); // Stop exactly at the Y-axis line at X=30
                        guideY.setAttribute('y2', ny);
                        guideY.style.opacity = '0.35';
                        
                        guideLabel.setAttribute('x', nx + 12);
                        guideLabel.setAttribute('y', ny - 12);
                        guideLabel.textContent = `[X:${nx.toFixed(0)} Y:${(395-ny).toFixed(0)}]`;
                        guideLabel.setAttribute('fill', accentColor);
                        guideLabel.style.opacity = '0.7';
                    }
                }
            };

            const hideTooltip = () => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translate(-50%, -100%) scale(0.9)';
                activeCurve.style.strokeWidth = '4';
                if (shimmerCurve) {
                    shimmerCurve.style.opacity = '0.2';
                }

                // Clear coordinate projection lines
                const guideX = document.getElementById('guide-x');
                const guideY = document.getElementById('guide-y');
                const guideLabel = document.getElementById('guide-label');
                if (guideX && guideY && guideLabel) {
                    guideX.style.opacity = '0';
                    guideY.style.opacity = '0';
                    guideLabel.style.opacity = '0';
                }
            };

            node.addEventListener('mouseenter', () => {
                showTooltip();
            });

            node.addEventListener('mouseleave', () => {
                if (activeNodeIndex === null) {
                    hideTooltip();
                }
            });

            node.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(node.getAttribute('data-index'), 10);
                if (idx === 8) return; // Skip clicking toggle on AI Automation since its card is static
                
                if (activeNodeIndex === idx) {
                    hideTooltip();
                    activeNodeIndex = null;
                } else {
                    showTooltip();
                    activeNodeIndex = idx;
                }
            });
        });

        // Hide when clicking outside
        document.addEventListener('click', () => {
            if (activeNodeIndex !== null) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translate(-50%, -100%) scale(0.9)';
                activeCurve.style.strokeWidth = '4';
                if (shimmerCurve) {
                    shimmerCurve.style.opacity = '0.2';
                }
                activeNodeIndex = null;
            }
        });

        // Helper hex to RGB translator
        function hexToRgb(hex) {
            let c;
            if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                c = hex.substring(1).split('');
                if(c.length == 3){
                    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c = '0x' + c.join('');
                return [(c>>16)&255, (c>>8)&255, c&255].join(',');
            }
            return '79, 70, 229'; // fallback color
        }
    }

});
