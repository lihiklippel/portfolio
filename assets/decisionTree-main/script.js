// Spark animation system
(function() {
    const sparkContainer = document.getElementById('spark-animation');
    const sparks = [];
    const sparkCount = 15; // Number of sparks visible at once
    const animationDuration = 5000; // Duration in milliseconds (5 seconds - slower)
    
    // Spark color types
    const sparkColors = ['white', 'light-blue', 'bright-blue', 'blue-large', 'light-blue-large'];
    
    // Create initial sparks
    function createSpark() {
        const spark = document.createElement('div');
        
        // Randomly select a color
        const colorType = sparkColors[Math.floor(Math.random() * sparkColors.length)];
        spark.className = 'spark spark-' + colorType;
        
        // Random horizontal position within the 40% right area
        const containerWidth = sparkContainer.offsetWidth;
        const leftPosition = Math.random() * containerWidth;
        spark.style.left = leftPosition + 'px';
        
        // Random animation duration for variety (4-6 seconds - slower)
        const duration = animationDuration + (Math.random() * 2000 - 1000);
        spark.style.animationDuration = duration + 'ms';
        
        // Random delay to stagger spark appearances
        const delay = Math.random() * 1000;
        spark.style.animationDelay = delay + 'ms';
        
        // Add slight horizontal drift for more dynamic movement
        const drift = (Math.random() - 0.5) * 20; // -10px to +10px drift
        spark.style.setProperty('--drift', drift + 'px');
        
        sparkContainer.appendChild(spark);
        sparks.push(spark);
        
        // Remove spark after animation completes
        setTimeout(() => {
            if (spark.parentNode) {
                spark.parentNode.removeChild(spark);
                const index = sparks.indexOf(spark);
                if (index > -1) {
                    sparks.splice(index, 1);
                }
            }
        }, duration + delay);
    }
    
    // Continuously create sparks to maintain the animation
    function maintainSparks() {
        // Keep creating sparks until we have enough
        while (sparks.length < sparkCount) {
            createSpark();
        }
        
        // Check periodically and add new sparks as needed
        setTimeout(maintainSparks, 200);
    }
    
    // Start the animation when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', maintainSparks);
    } else {
        maintainSparks();
    }
    
    // Update spark positions on window resize
    window.addEventListener('resize', () => {
        sparks.forEach(spark => {
            const containerWidth = sparkContainer.offsetWidth;
            const leftPosition = Math.random() * containerWidth;
            spark.style.left = leftPosition + 'px';
        });
    });
})();

// Administration Panel functionality
(function() {
    const adminBtn = document.getElementById('adminBtn');
    const dashboardBtn = document.getElementById('dashboardBtn');
    const adminPanel = document.getElementById('adminPanel');
    const app = document.getElementById('app');
    
    if (adminBtn && adminPanel) {
        adminBtn.addEventListener('click', () => {
            adminPanel.style.display = 'block';
            if (app) {
                app.style.display = 'none';
            }
            
            // Retrigger animations by forcing a reflow
            void adminPanel.offsetHeight;
            
            // Reset and retrigger animations for all DIVs
            const leftBox = adminPanel.querySelector('.admin-left-box');
            const adminBoxes = adminPanel.querySelectorAll('.admin-box');
            
            if (leftBox) {
                leftBox.style.animation = 'none';
                void leftBox.offsetHeight;
                leftBox.style.animation = 'slideUpFadeIn 0.8s ease-out 0.1s forwards';
            }
            
            adminBoxes.forEach((box, index) => {
                box.style.animation = 'none';
                void box.offsetHeight;
                box.style.animation = `slideUpFadeIn 0.8s ease-out ${0.2 + index * 0.1}s forwards`;
            });
        });
    }
    
    if (dashboardBtn && app) {
        dashboardBtn.addEventListener('click', () => {
            if (adminPanel) {
                adminPanel.style.display = 'none';
            }
            app.style.display = 'block';
        });
    }
})();

// Confetti animation and welcome message
(function() {
    const addUserBtn = document.getElementById('addUserBtn');
    const confettiContainer = document.getElementById('confetti-container');
    const welcomeMessage = document.getElementById('welcome-message');
    
    const confettiColors = ['#add8e6', '#ffe135', '#ff69b4', '#00ff00', '#40e0d0']; // light-blue, banana yellow, pink, green, turquoise
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random color
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.backgroundColor = color;
        
        // Random size
        const size = Math.random() * 8 + 4; // 4-12px
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // Start from center of screen
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.transform = 'translate(-50%, -50%)';
        
        // Random angle for radial burst (0 to 360 degrees)
        const angle = Math.random() * 360;
        const angleRad = (angle * Math.PI) / 180; // Convert to radians
        
        // Random distance to travel
        const distance = Math.random() * 500 + 300; // 300-800px
        
        // Calculate x and y offsets based on angle and distance
        const xOffset = Math.cos(angleRad) * distance;
        const yOffset = Math.sin(angleRad) * distance;
        
        confetti.style.setProperty('--x-offset', xOffset + 'px');
        confetti.style.setProperty('--y-offset', yOffset + 'px');
        
        // Random rotation
        const rotation = Math.random() * 720; // 0-720 degrees for multiple spins
        confetti.style.setProperty('--rotation', rotation + 'deg');
        
        // Random animation duration
        const duration = Math.random() * 1500 + 1500; // 1.5-3 seconds
        confetti.style.animationDuration = duration + 'ms';
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, duration);
    }
    
    function triggerConfetti() {
        // Show welcome message simultaneously with confetti
        welcomeMessage.classList.remove('welcome-message-hidden');
        welcomeMessage.classList.add('welcome-message-visible');
        
        // Create 100 confetti pieces all at once for burst effect
        for (let i = 0; i < 100; i++) {
            createConfetti();
        }
        
        // Hide message after 5 seconds
        setTimeout(() => {
            welcomeMessage.classList.remove('welcome-message-visible');
            welcomeMessage.classList.add('welcome-message-hidden');
        }, 5000);
    }
    
    if (addUserBtn) {
        addUserBtn.addEventListener('click', triggerConfetti);
    }
})();

// Login Form Exit Animation
(function() {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.querySelector('.login-btn');
    const confettiContainer = document.getElementById('login-confetti-container');
    const welcomeMessageBox = document.getElementById('welcomeMessageBox');

    function createConfettiParticle(x, y, color, delay) {
        const particle = document.createElement('div');
        particle.className = `login-confetti ${color}`;
        
        // Random movement direction and distance
        const angle = (Math.random() - 0.5) * Math.PI * 1.5; // -135° to +135° range
        const distance = 100 + Math.random() * 200; // 100-300px
        const randomX = Math.cos(angle) * distance;
        const randomY = Math.sin(angle) * distance;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.setProperty('--random-x', `${randomX}px`);
        particle.style.setProperty('--random-y', `${randomY}px`);
        particle.style.animationDelay = `${delay}s`;
        
        confettiContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }

    function generateConfetti() {
        const particleCount = 50;
        const formRect = loginForm.getBoundingClientRect();
        const centerX = (formRect.left + formRect.width / 2) / window.innerWidth * 100;
        const centerY = (formRect.top + formRect.height / 2) / window.innerHeight * 100;
        
        for (let i = 0; i < particleCount; i++) {
            const x = centerX + (Math.random() - 0.5) * 20; // Spread around form center
            const y = centerY + (Math.random() - 0.5) * 20;
            const color = Math.random() > 0.5 ? 'white' : 'cyan';
            const delay = Math.random() * 0.3;
            
            createConfettiParticle(x, y, color, delay);
        }
    }

    if (loginBtn && loginForm) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate form
            if (loginForm.checkValidity()) {
                // Add exiting class to form
                loginForm.classList.add('exiting');
                
                // Generate confetti
                generateConfetti();
                
                // Show welcome message after form fades out
                setTimeout(() => {
                    welcomeMessageBox.style.display = 'flex';
                    setTimeout(() => {
                        welcomeMessageBox.classList.add('show');
                    }, 50);
                }, 1000);
            } else {
                // Trigger browser validation
                loginForm.reportValidity();
            }
        });
    }
})();

// Signup Form Transition
(function() {
    const signupLink = document.getElementById('signupLink');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (signupLink && loginForm && signupForm) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fade out login form
            loginForm.classList.add('exiting');
            
            // After fade out, hide login and show signup
            setTimeout(() => {
                loginForm.style.display = 'none';
                signupForm.style.display = 'flex';
                
                // Trigger fade-in animation
                setTimeout(() => {
                    signupForm.classList.add('show');
                }, 50);
            }, 1000);
        });
    }
})();

// Signup Button Animation Sequence
(function() {
    const signupBtn = document.querySelector('.signup-btn');
    const signupForm = document.getElementById('signupForm');
    const signupConfettiContainer = document.getElementById('signup-confetti-container');
    const newUserWelcome = document.getElementById('newUserWelcome');

    function createSignupConfetti(x, y, color, delay) {
        const particle = document.createElement('div');
        particle.className = `signup-confetti ${color}`;
        
        // Burst outward from center in all directions
        const angle = Math.random() * Math.PI * 2; // Full 360 degrees
        const distance = 150 + Math.random() * 250; // 150-400px burst distance
        const randomX = Math.cos(angle) * distance;
        const randomY = Math.sin(angle) * distance;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.setProperty('--random-x', `${randomX}px`);
        particle.style.setProperty('--random-y', `${randomY}px`);
        particle.style.animationDelay = `${delay}s`;
        
        signupConfettiContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }

    function generateSignupConfetti() {
        const particleCount = 60;
        const centerX = 50; // Center of screen
        const centerY = 50; // Center of screen
        
        for (let i = 0; i < particleCount; i++) {
            const x = centerX + (Math.random() - 0.5) * 5; // Small spread around center
            const y = centerY + (Math.random() - 0.5) * 5;
            
            // Randomly assign one of three colors
            const colorRand = Math.random();
            let color;
            if (colorRand < 0.33) {
                color = 'light-blue';
            } else if (colorRand < 0.66) {
                color = 'white';
            } else {
                color = 'bright-blue';
            }
            
            const delay = Math.random() * 0.2;
            createSignupConfetti(x, y, color, delay);
        }
    }

    if (signupBtn && signupForm) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate form
            if (signupForm.checkValidity()) {
                // Fade out signup form
                signupForm.classList.add('exiting');
                
                // Generate confetti burst at the same time
                generateSignupConfetti();
                
                // Show welcome message after form starts fading
                setTimeout(() => {
                    newUserWelcome.style.display = 'block';
                    setTimeout(() => {
                        newUserWelcome.classList.add('show');
                    }, 50);
                    
                    // After being visible, fade out the welcome message
                    setTimeout(() => {
                        newUserWelcome.classList.remove('show');
                        newUserWelcome.classList.add('exit');
                        
                        // Clean up after exit animation
                        setTimeout(() => {
                            newUserWelcome.style.display = 'none';
                            newUserWelcome.classList.remove('exit');
                            signupForm.style.display = 'none';
                            signupForm.classList.remove('exiting');
                        }, 1000);
                    }, 2500); // Visible for 2.5 seconds
                }, 500); // Start showing message 0.5s after form starts fading
            } else {
                // Trigger browser validation
                signupForm.reportValidity();
            }
        });
    }
})();


