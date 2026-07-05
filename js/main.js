// Main application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupImageErrorHandling();
    setupScrollAnimations();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

function initializeApp() {
    setupNavigation();
    setupProjectFilters();
    setupSmoothScrolling();
    setupDonationButtons();
    renderProjects();
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
                smoothScrollTo(href.substring(1));
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
    setupScrollAnimations();
}

function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function createProjectCard(project) {
    const languageColor = getLanguageColor(project.primaryLanguage);
    const hasHomepage = project.homepageUrl && project.homepageUrl.trim() !== '';
    const safeName = escapeHtml(project.name);
    const safeDesc = escapeHtml(project.description);
    const safeLang = escapeHtml(project.primaryLanguage);
    const safeUrl = escapeHtml(project.url);
    const safeHomepage = escapeHtml(project.homepageUrl);
    
    return `
        <div class="project-card" data-category="${escapeHtml(project.category)}">
            <div class="project-header">
                <h3 class="project-title">${safeName}</h3>
                <span class="project-language" style="background-color: ${languageColor}">
                    ${safeLang}
                </span>
            </div>
            
            <p class="project-description">${safeDesc}</p>
            
            <div class="project-meta">
                ${project.featured ? '<span class="project-badge">Featured</span>' : ''}
                ${project.hasGitHubPages ? '<span class="project-badge">Live Demo</span>' : ''}
            </div>
            
            <div class="project-links">
                <a href="${safeUrl}" target="_blank" rel="noopener" class="project-link">
                    View Code
                </a>
                ${hasHomepage ? `
                    <a href="${safeHomepage}" target="_blank" rel="noopener" class="project-link">
                        Live Demo
                    </a>
                ` : ''}
            </div>
            
            <div class="project-topics">
                ${project.topics.map(topic => `<span class="topic-tag">${escapeHtml(topic)}</span>`).join('')}
            </div>
            
            ${project.updatedAt ? `<div class="project-updated">Updated ${formatDate(project.updatedAt)}</div>` : ''}
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
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;
    
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

function setupSmoothScrolling() {
    const heroActions = document.querySelectorAll('.hero-actions a');
    
    heroActions.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href.substring(1));
            }
        });
    });
}

// Scroll effect on header (throttled via requestAnimationFrame)
let scrollTicking = false;
window.addEventListener('scroll', function() {
    if (!scrollTicking) {
        window.requestAnimationFrame(function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

// Intersection observer for animations
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

// Error handling for images
function setupImageErrorHandling() {
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
}

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

// Donation Button Management
function setupDonationButtons() {
    const donationButtons = document.querySelectorAll('.donation-btn');
    
    donationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('disabled')) {
                e.preventDefault();
                const service = this.getAttribute('data-service');
                showDonationSetupMessage(service);
            }
        });
    });
}

function showDonationSetupMessage(service) {
    alert(`${service} is not set up yet. Please configure your ${service} account first.`);
    
    trackEvent('donation_setup_needed', {
        service: service
    });
}

// Function to enable donation buttons when ready
function enableDonationButton(service, url) {
    const button = document.querySelector(`[data-service="${service}"]`);
    if (button) {
        button.classList.remove('disabled');
        button.href = url;
        button.target = '_blank';
        button.rel = 'noopener';
        
        trackEvent('donation_enabled', {
            service: service
        });
    }
}

// Example usage when you're ready to activate:
// enableDonationButton('github-sponsors', 'https://github.com/sponsors/jonsflow');
// enableDonationButton('kofi', 'https://ko-fi.com/jonsflow');
// enableDonationButton('paypal', 'https://paypal.me/jonsflow');