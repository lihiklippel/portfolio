document.addEventListener('DOMContentLoaded', function() {
  const sparklesContainer = document.getElementById('sparklesContainer');
  const colors = ['blue', 'cyan', 'white', 'purple', 'green'];
  let sparkles = [];
  const maxSparkles = 80;

  function createSparkle() {
    const sparkle = document.createElement('div');
    
    // Random position across full screen
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Random movement direction and distance
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 200; // 100-300px movement
    const randomX = Math.cos(angle) * distance;
    const randomY = Math.sin(angle) * distance;
    
    // Random animation delay for staggered effect
    const delay = Math.random() * 8;
    
    sparkle.className = `sparkle ${color}`;
    sparkle.style.left = `${x}%`;
    sparkle.style.top = `${y}%`;
    sparkle.style.setProperty('--random-x', `${randomX}px`);
    sparkle.style.setProperty('--random-y', `${randomY}px`);
    sparkle.style.setProperty('--random-delay', `${delay}s`);
    
    sparklesContainer.appendChild(sparkle);
    sparkles.push(sparkle);
    
    // Remove oldest sparkles if we exceed max
    if (sparkles.length > maxSparkles) {
      const oldest = sparkles.shift();
      if (oldest && oldest.parentNode) {
        oldest.parentNode.removeChild(oldest);
      }
    }
  }

  function initializeSparkles() {
    // Create initial sparkles
    for (let i = 0; i < maxSparkles; i++) {
      setTimeout(() => {
        createSparkle();
      }, i * 50); // Stagger creation
    }
  }

  function addNewSparkle() {
    // Continuously add new sparkles to maintain density
    createSparkle();
  }

  // Initialize sparkles on load
  initializeSparkles();

  // Continuously add new sparkles every 2 seconds
  setInterval(addNewSparkle, 2000);

  // Handle window resize to maintain full coverage
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      // Ensure sparkles cover the full viewport
      sparklesContainer.style.width = `${window.innerWidth}px`;
      sparklesContainer.style.height = `${window.innerHeight}px`;
    }, 250);
  });

  // Ensure full viewport coverage on initial load
  sparklesContainer.style.width = `${window.innerWidth}px`;
  sparklesContainer.style.height = `${window.innerHeight}px`;
});




