// Main application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    renderProjects();
    setupProjectFilters();
    setupSmoothScrolling();
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Project rendering
function renderProjects(filterCategory = 'all') {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    const projectsToShow = getProjectsByCategory(filterCategory);
    
    projectsGrid.innerHTML = projectsToShow.map(project => createProjectCard(project)).join('');
}

function createProjectCard(project) {
    const languageColor = getLanguageColor(project.primaryLanguage);
    const hasHomepage = project.homepageUrl && project.homepageUrl.trim() !== '';
    
    return `
        <div class="project-card" data-category="${project.category}">
            <div class="project-header">
                <h3 class="project-title">${project.name}</h3>
                <span class="project-language" style="background-color: ${languageColor}">
                    ${project.primaryLanguage}
                </span>
            </div>
            
            <p class="project-description">${project.description}</p>
            
            <div class="project-meta">
                ${project.featured ? '<span class="project-badge">Featured</span>' : ''}
                ${project.hasGitHubPages ? '<span class="project-badge">Live Demo</span>' : ''}
            </div>
            
            <div class="project-links">
                <a href="${project.url}" target="_blank" rel="noopener" class="project-link">
                    View Code
                </a>
                ${hasHomepage ? `
                    <a href="${project.homepageUrl}" target="_blank" rel="noopener" class="project-link">
                        Live Demo
                    </a>
                ` : ''}
            </div>
            
            <div class="project-topics">
                ${project.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
            </div>
        </div>
    `;
}

// Project filtering
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter category and render projects
            const filterCategory = this.getAttribute('data-filter');
            renderProjects(filterCategory);
        });
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    const heroActions = document.querySelectorAll('.hero-actions a');
    
    heroActions.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--background-color)';
        header.style.backdropFilter = 'none';
    }
});

// Add intersection observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe project cards and gallery cards
    document.querySelectorAll('.project-card, .gallery-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize scroll animations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(setupScrollAnimations, 100);
});

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder or hide
            this.style.display = 'none';
            
            // Optionally add a placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.textContent = 'Image not available';
            this.parentNode.appendChild(placeholder);
        });
    });
});

// Analytics tracking (placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics implementation
    console.log('Event tracked:', eventName, properties);
}

// Track project clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('project-link')) {
        const projectCard = e.target.closest('.project-card');
        const projectTitle = projectCard.querySelector('.project-title').textContent;
        const linkType = e.target.textContent.includes('Demo') ? 'demo' : 'code';
        
        trackEvent('project_link_click', {
            project: projectTitle,
            type: linkType
        });
    }
});