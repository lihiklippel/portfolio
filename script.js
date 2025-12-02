// EmailJS Configuration and Email Sending Function
(function() {
    // EmailJS Configuration
    // Note: You need to set up EmailJS account and get these values:
    // 1. Go to https://www.emailjs.com/ and create a free account
    // 2. Create an email service (Gmail, Outlook, etc.)
    // 3. Create an email template
    // 4. Get your Public Key from Integration settings
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
    const RECIPIENT_EMAIL = 'lihi.klippel@dbexpert.ai';
    
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
    
    // Function to send email via EmailJS
    window.sendFormEmail = function(formData, formName) {
        return new Promise(function(resolve, reject) {
            // If EmailJS is not configured, fallback to console log
            if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
                EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
                EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
                console.log('EmailJS not configured. Form data:', formData);
                console.log('To configure EmailJS:');
                console.log('1. Sign up at https://www.emailjs.com/');
                console.log('2. Create a service and template');
                console.log('3. Update EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY in script.js');
                // Still resolve to continue with animations
                resolve({ status: 200, text: 'EmailJS not configured' });
                return;
            }
            
            // Prepare email template parameters
            const templateParams = {
                to_email: RECIPIENT_EMAIL,
                from_name: formData.fullName,
                from_email: formData.email,
                phone: formData.phoneNumber,
                project_type: formData.course,
                message: `New contact form submission from ${formName}\n\n` +
                         `Name: ${formData.fullName}\n` +
                         `Email: ${formData.email}\n` +
                         `Phone: ${formData.phoneNumber}\n` +
                         `Project Type: ${formData.course}\n` +
                         `Submitted from: ${formName}`
            };
            
            // Send email via EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                    .then(function(response) {
                        console.log('Email sent successfully!', response.status, response.text);
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.error('Failed to send email:', error);
                        reject(error);
                    });
            } else {
                console.error('EmailJS library not loaded');
                reject(new Error('EmailJS library not loaded'));
            }
        });
    };
})();

// Contact Form Modal Functionality
(function() {
    const shineButton = document.getElementById('shineButton');
    const contactModal = document.getElementById('contactModal');
    const modalContainer = document.getElementById('modalContainer');
    const closeModal = document.getElementById('closeModal');
    const contactForm = document.getElementById('contactForm');
    const particleContainer = document.getElementById('particleContainer');
    
    // Reset modal animation when opening
    function resetModalAnimation() {
        if (modalContainer) {
            modalContainer.classList.remove('exiting');
            // Reset animation by removing and re-adding the class
            modalContainer.style.animation = 'none';
            void modalContainer.offsetHeight; // Force reflow
            modalContainer.style.animation = '';
        }
    }
    
    // Open modal when "Get Started" button is clicked
    if (shineButton && contactModal) {
        shineButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Emit white sparks from the button
            createParticles(shineButton, ['white'], 40);
            resetModalAnimation();
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    // Close modal function with animation
    function closeModalWithAnimation() {
        if (modalContainer) {
            // Create white and cyan rising sparkles from the form
            createRisingSparkles(modalContainer, ['white', 'cyan'], 60);
            modalContainer.classList.add('exiting');
            setTimeout(function() {
                contactModal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
                modalContainer.classList.remove('exiting');
            }, 1200); // Match animation duration
        } else {
            contactModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Close modal when close button is clicked
    if (closeModal && contactModal) {
        closeModal.addEventListener('click', function() {
            closeModalWithAnimation();
        });
    }
    
    // Close modal when clicking outside the modal container
    if (contactModal) {
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                closeModalWithAnimation();
            }
        });
    }
    
    // Create rising sparkles for form exit animations (white and cyan particles rising upward)
    function createRisingSparkles(element, colorSet, count) {
        if (!particleContainer || !element) return;
        
        const rect = element.getBoundingClientRect();
        const particleCount = count || 60;
        const colors = colorSet && colorSet.length ? colorSet : ['white', 'cyan'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random color from provided set
            const colorIndex = Math.floor(Math.random() * colors.length);
            const color = colors[colorIndex];
            particle.classList.add(`particle-${color}`);
            
            // Generate particles from form area (edges and interior)
            let startX, startY;
            const particleType = Math.random();
            
            if (particleType < 0.5) {
                // 50% from edges
                const side = Math.floor(Math.random() * 4);
                switch(side) {
                    case 0: // Top edge
                        startX = rect.left + Math.random() * rect.width;
                        startY = rect.top;
                        break;
                    case 1: // Right edge
                        startX = rect.right;
                        startY = rect.top + Math.random() * rect.height;
                        break;
                    case 2: // Bottom edge
                        startX = rect.left + Math.random() * rect.width;
                        startY = rect.bottom;
                        break;
                    case 3: // Left edge
                        startX = rect.left;
                        startY = rect.top + Math.random() * rect.height;
                        break;
                }
            } else {
                // 50% from interior
                startX = rect.left + Math.random() * rect.width;
                startY = rect.top + Math.random() * rect.height;
            }
            
            // Horizontal drift for natural movement
            const driftX = (Math.random() - 0.5) * 150;
            particle.style.setProperty('--drift-x', driftX + 'px');
            
            // Random size
            const size = 4 + Math.random() * 5;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Animation duration (2-3.5 seconds for smooth upward rise)
            const duration = 2 + Math.random() * 1.5;
            particle.style.animationDuration = duration + 's';
            
            // Staggered delay for natural appearance
            const delay = Math.random() * 0.2;
            particle.style.animationDelay = delay + 's';
            
            // Position particle
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            particleContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(function() {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, (duration + delay) * 1000);
        }
    }
    
    // Create particle effect
    function createParticles(element, colorSet, count) {
        if (!particleContainer || !element) return;
        
        const rect = element.getBoundingClientRect();
        const particleCount = count || 80;
        const defaultColors = ['white', 'pink', 'cyan'];
        const colors = colorSet && colorSet.length ? colorSet : defaultColors;
        
        // Create particles from form edges
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random color
            const colorIndex = Math.floor(Math.random() * colors.length);
            const color = colors[colorIndex];
            particle.classList.add(`particle-${color}`);
            
            // Generate particles from form edges and interior for shatter effect
            let startX, startY;
            const particleType = Math.random();
            
            if (particleType < 0.6) {
                // 60% from edges (perimeter shatter)
                const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
                switch(side) {
                    case 0: // Top edge
                        startX = rect.left + Math.random() * rect.width;
                        startY = rect.top;
                        break;
                    case 1: // Right edge
                        startX = rect.right;
                        startY = rect.top + Math.random() * rect.height;
                        break;
                    case 2: // Bottom edge
                        startX = rect.left + Math.random() * rect.width;
                        startY = rect.bottom;
                        break;
                    case 3: // Left edge
                        startX = rect.left;
                        startY = rect.top + Math.random() * rect.height;
                        break;
                }
            } else {
                // 40% from interior (center shatter)
                startX = rect.left + Math.random() * rect.width;
                startY = rect.top + Math.random() * rect.height;
            }
            
            // Random drift with more spread for dynamic effect
            const driftX = (Math.random() - 0.5) * 200;
            particle.style.setProperty('--drift-x', driftX + 'px');
            
            // Random size variation (larger particles for better visibility)
            const size = 5 + Math.random() * 6;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation duration for staggered effect
            const duration = 2 + Math.random() * 1.5;
            particle.style.animationDuration = duration + 's';
            
            // Minimal delay for simultaneous appearance
            const delay = Math.random() * 0.1;
            particle.style.animationDelay = delay + 's';
            
            // Position particle
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            particleContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(function() {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, (duration + delay) * 1000);
        }
    }
    
    // Handle form submission
    if (contactForm) {
        const submitButton = document.querySelector('.submit-button');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                fullName: document.getElementById('fullName').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                email: document.getElementById('email').value,
                course: document.getElementById('course').value
            };
            
            // Send email
            if (typeof window.sendFormEmail === 'function') {
                window.sendFormEmail(formData, 'Homepage Contact Form')
                    .then(function() {
                        console.log('Email sent successfully');
                    })
                    .catch(function(error) {
                        console.error('Email sending failed:', error);
                        // Still show success message to user even if email fails
                    });
            }
            
            // Start exit animation and create particles simultaneously
            if (modalContainer) {
                // Create white and cyan particles from the form that rise upward
                if (submitButton) {
                    createRisingSparkles(modalContainer, ['white', 'cyan'], 60);
                } else {
                    // Fallback: from modal if button not found
                    createRisingSparkles(modalContainer, ['white', 'cyan'], 60);
                }
                
                // Start fade out animation simultaneously
                modalContainer.classList.add('exiting');
            }
            
            // Show success message after particles have appeared
            setTimeout(function() {
                alert('Thank you! We\'ll get back to you soon.');
            }, 500);
            
            // Reset form and close modal after animation completes
            setTimeout(function() {
                contactForm.reset();
                contactModal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
                if (modalContainer) {
                    modalContainer.classList.remove('exiting');
                }
            }, 1200); // Match animation duration
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
            closeModalWithAnimation();
        }
    });
})();

// Contact Page Form Functionality
(function() {
    const contactPageForm = document.getElementById('contactPageForm');
    const contactPageSubmitBtn = document.getElementById('contactPageSubmitBtn');
    const contactPageParticleContainer = document.getElementById('contactPageParticleContainer');
    const contactPageFormContainer = document.querySelector('.contact-page-form-container');
    
    // Create rising sparkles for contact page form exit (white and cyan particles rising upward)
    function createContactPageRisingSparkles(element, colorSet, count) {
        if (!contactPageParticleContainer || !element) return;
        
        const rect = element.getBoundingClientRect();
        const particleCount = count || 60;
        const colors = colorSet && colorSet.length ? colorSet : ['white', 'cyan'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const colorIndex = Math.floor(Math.random() * colors.length);
            const color = colors[colorIndex];
            particle.classList.add(`particle-${color}`);
            
            let startX, startY;
            const particleType = Math.random();
            
            if (particleType < 0.5) {
                const side = Math.floor(Math.random() * 4);
                switch(side) {
                    case 0:
                        startX = rect.left + Math.random() * rect.width;
                        startY = rect.top;
                        break;
                    case 1:
                        startX = rect.right;
                        startY = rect.top + Math.random() * rect.height;
                        break;
                    case 2:
                        startX = rect.left + Math.random() * rect.width;
                        startY = rect.bottom;
                        break;
                    case 3:
                        startX = rect.left;
                        startY = rect.top + Math.random() * rect.height;
                        break;
                }
            } else {
                startX = rect.left + Math.random() * rect.width;
                startY = rect.top + Math.random() * rect.height;
            }
            
            const driftX = (Math.random() - 0.5) * 150;
            particle.style.setProperty('--drift-x', driftX + 'px');
            
            const size = 4 + Math.random() * 5;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            const duration = 2 + Math.random() * 1.5;
            particle.style.animationDuration = duration + 's';
            
            const delay = Math.random() * 0.2;
            particle.style.animationDelay = delay + 's';
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            contactPageParticleContainer.appendChild(particle);
            
            setTimeout(function() {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, (duration + delay) * 1000);
        }
    }
    
    // Handle contact page form submission
    if (contactPageForm) {
        contactPageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                fullName: document.getElementById('contactPageFullName').value,
                phoneNumber: document.getElementById('contactPagePhoneNumber').value,
                email: document.getElementById('contactPageEmail').value,
                course: document.getElementById('contactPageCourse').value
            };
            
            // Send email
            if (typeof window.sendFormEmail === 'function') {
                window.sendFormEmail(formData, 'Contact Page Form')
                    .then(function() {
                        console.log('Email sent successfully');
                    })
                    .catch(function(error) {
                        console.error('Email sending failed:', error);
                        // Still show success message to user even if email fails
                    });
            }
            
            // Create white and cyan rising sparkles from the form
            if (contactPageFormContainer) {
                createContactPageRisingSparkles(contactPageFormContainer, ['white', 'cyan'], 60);
                // Start fade out animation
                contactPageFormContainer.classList.add('exiting');
            }
            
            // Show success message after particles have appeared
            setTimeout(function() {
                alert('Thank you! We\'ll get back to you soon.');
            }, 500);
            
            // Reset form after animation
            setTimeout(function() {
                contactPageForm.reset();
                if (contactPageFormContainer) {
                    contactPageFormContainer.classList.remove('exiting');
                }
            }, 1200);
        });
    }
})();

// Collection navigation - toggle portfolio layout
(function() {
    const navHome = document.getElementById('navHome');
    const navCollection = document.getElementById('navCollection');
    const navContact = document.getElementById('navContact');
    const navAbout = document.getElementById('navBlog'); // About button uses navBlog ID
    const homeSection = document.getElementById('homeSection');
    const collectionSection = document.getElementById('collectionSection');
    const contactPageSection = document.getElementById('contactPageSection');
    const aboutSection = document.getElementById('aboutSection');

    function clearBodyViewClasses() {
        document.body.classList.remove('collection-view');
        document.body.classList.remove('contact-view');
        document.body.classList.remove('about-view');
    }

    function showHome() {
        if (homeSection) homeSection.style.display = 'flex';
        if (collectionSection) collectionSection.style.display = 'none';
        if (contactPageSection) contactPageSection.style.display = 'none';
        if (aboutSection) aboutSection.style.display = 'none';
        clearBodyViewClasses();
        // Clear any hash from the URL when returning home
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname);
        } else {
            window.location.hash = '';
        }
    }

    function showCollection() {
        if (homeSection) homeSection.style.display = 'none';
        if (collectionSection) collectionSection.style.display = 'block';
        if (contactPageSection) contactPageSection.style.display = 'none';
        if (aboutSection) aboutSection.style.display = 'none';
        clearBodyViewClasses();
        document.body.classList.add('collection-view');
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname + '#collection');
        } else {
            window.location.hash = '#collection';
        }
    }

    function showContact() {
        if (homeSection) homeSection.style.display = 'none';
        if (collectionSection) collectionSection.style.display = 'none';
        if (contactPageSection) contactPageSection.style.display = 'block';
        if (aboutSection) aboutSection.style.display = 'none';
        clearBodyViewClasses();
        document.body.classList.add('contact-view');
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname + '#contact');
        } else {
            window.location.hash = '#contact';
        }
    }

    function showAbout() {
        if (homeSection) homeSection.style.display = 'none';
        if (collectionSection) collectionSection.style.display = 'none';
        if (contactPageSection) contactPageSection.style.display = 'none';
        if (aboutSection) aboutSection.style.display = 'block';
        clearBodyViewClasses();
        document.body.classList.add('about-view');
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname + '#about');
        } else {
            window.location.hash = '#about';
        }
    }

    function applyInitialView() {
        const hash = window.location.hash;
        if (hash === '#collection') {
            showCollection();
        } else if (hash === '#contact') {
            showContact();
        } else if (hash === '#about') {
            showAbout();
        } else {
            showHome();
        }
    }

    // Initial state based on URL hash (or home by default)
    applyInitialView();

    if (navHome) {
        navHome.addEventListener('click', function(e) {
            e.preventDefault();
            showHome();
        });
    }

    if (navCollection) {
        navCollection.addEventListener('click', function(e) {
            e.preventDefault();
            showCollection();
        });
    }

    if (navContact) {
        navContact.addEventListener('click', function(e) {
            e.preventDefault();
            showContact();
        });
    }

    if (navAbout) {
        navAbout.addEventListener('click', function(e) {
            e.preventDefault();
            showAbout();
        });
    }
})();

// Falling Stars Animation for Collection Page
(function() {
    const fallingStarsContainer = document.getElementById('fallingStarsContainer');
    let starsInterval = null;
    let starsCreated = 0;
    const maxStars = 50; // Maximum number of stars on screen
    
    function createFallingStar() {
        if (!fallingStarsContainer) return;
        
        // Check if we're on the collection page
        if (!document.body.classList.contains('collection-view')) {
            return;
        }
        
        // Limit the number of stars
        const existingStars = fallingStarsContainer.querySelectorAll('.falling-star');
        if (existingStars.length >= maxStars) {
            return;
        }
        
        const star = document.createElement('div');
        star.className = 'falling-star';
        
        // Start from top-right corner (with some variation for natural effect)
        const startX = window.innerWidth - 20 + Math.random() * 50;
        const startY = -20 - Math.random() * 30;
        
        star.style.left = startX + 'px';
        star.style.top = startY + 'px';
        
        // Random animation duration (3-6 seconds for natural variation)
        const duration = 3 + Math.random() * 3;
        star.style.animationDuration = duration + 's';
        
        // Random delay for staggered appearance
        const delay = Math.random() * 2;
        star.style.animationDelay = delay + 's';
        
        // Random size variation (1.5-3.5px for better visibility)
        const size = 1.5 + Math.random() * 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Add glow intensity variation (increased by 70% for much brighter stars)
        const glowIntensity = 0.7 + Math.random() * 0.3;
        star.style.boxShadow = `
            0 0 ${10 * glowIntensity}px #ffffff,
            0 0 ${20 * glowIntensity}px rgba(255, 255, 255, 1),
            0 0 ${31 * glowIntensity}px rgba(255, 255, 255, 1)
        `;
        
        fallingStarsContainer.appendChild(star);
        
        // Remove star after animation completes
        setTimeout(function() {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, (duration + delay) * 1000);
    }
    
    function startFallingStars() {
        if (starsInterval) {
            clearInterval(starsInterval);
        }
        
        // Clear existing stars
        if (fallingStarsContainer) {
            fallingStarsContainer.innerHTML = '';
        }
        
        // Create stars continuously (2 stars every 3 seconds = 1 star every 1.5 seconds)
        starsInterval = setInterval(function() {
            if (document.body.classList.contains('collection-view')) {
                createFallingStar();
            }
        }, 1500); // Create a new star every 1500ms (2 stars every 3 seconds)
    }
    
    function stopFallingStars() {
        if (starsInterval) {
            clearInterval(starsInterval);
            starsInterval = null;
        }
        
        // Clear all stars
        if (fallingStarsContainer) {
            fallingStarsContainer.innerHTML = '';
        }
    }
    
    // Watch for collection view changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (document.body.classList.contains('collection-view')) {
                    startFallingStars();
                } else {
                    stopFallingStars();
                }
            }
        });
    });
    
    // Observe body class changes
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    // Initial check
    if (document.body.classList.contains('collection-view')) {
        startFallingStars();
    }
})();

// Collection buttons navigation
(function() {
    const primaryBtn = document.getElementById('collectionBtn');      // first section
    const secondaryBtn = document.getElementById('collectionBtnCyber'); // second section
    const formsImage = document.querySelector('.collection-image-forms'); // third section image
    const form1Image = document.querySelector('.collection-image-form1'); // fourth section right image
    const form2Image = document.querySelector('.collection-image-form2'); // fourth section left image
    const homeDesignBtn = document.getElementById('collectionBtnHome'); // fifth section button
    const synelBtn = document.getElementById('collectionBtnSynel'); // sixth section button

    if (primaryBtn) {
        primaryBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.open('https://dbexpert.ai/', '_blank', 'noopener');
        });
    }

    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.open('https://www.dbdome.com/', '_blank', 'noopener');
        });
    }

    if (formsImage) {
        formsImage.addEventListener('click', function (e) {
            e.preventDefault();
            window.open('assets/decisionTree-main/index.html', '_blank', 'noopener');
        });
    }

    if (form1Image) {
        form1Image.addEventListener('click', function (e) {
            e.preventDefault();
            window.open('assets/decisionTree-sparkles/index.html', '_blank', 'noopener');
        });
    }

    if (form2Image) {
        form2Image.addEventListener('click', function (e) {
            e.preventDefault();
            window.open('assets/ProcessesForm/index.html', '_blank', 'noopener');
        });
    }

    if (homeDesignBtn) {
        homeDesignBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.open('https://arikdesign.co.il/', '_blank', 'noopener');
        });
    }

    if (synelBtn) {
        synelBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.open('https://www.synel.co.il/', '_blank', 'noopener');
        });
    }
})();

// Smooth scroll-based movement for collection sections
(function() {
    const sections = Array.from(document.querySelectorAll('.collection-section'));
    let ticking = false;

    function updateSectionTransforms() {
        ticking = false;

        // If not in collection view, reset transforms and exit
        if (!document.body.classList.contains('collection-view')) {
            sections.forEach(function(section) {
                section.style.transform = '';
            });
            return;
        }

        sections.forEach(function(section) {
            const rect = section.getBoundingClientRect();

            // distancePastTop: 0 until section top reaches top of viewport, then positive
            const sectionHeight = Math.max(rect.height, 1);
            const distancePastTop = -Math.min(rect.top, 0);
            const progress = Math.max(0, Math.min(1, distancePastTop / sectionHeight));

            // Translate up to -40px based on progress (subtle upward movement as it leaves viewport)
            const translateY = -progress * 40;
            section.style.transform = `translateY(${translateY}px)`;
        });
    }

    function requestTick() {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(updateSectionTransforms);
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);

    // Initial run
    requestTick();
})();

