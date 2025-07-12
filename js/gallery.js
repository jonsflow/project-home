// Gallery functionality for photo collections

// Gallery data structure for different interests
const galleries = {
    biking: {
        title: "Mountain Biking Adventures",
        description: "BMX, Downhill, Cross Country, and Gravel riding experiences",
        images: [
            // Placeholder structure - images will be added when available
            {
                src: "images/biking/trail-ride-1.jpg",
                alt: "Cross country trail riding",
                caption: "Epic trail ride through mountain terrain"
            },
            {
                src: "images/biking/downhill-1.jpg", 
                alt: "Downhill mountain biking",
                caption: "Downhill racing action"
            },
            {
                src: "images/biking/bmx-1.jpg",
                alt: "BMX tricks and jumps",
                caption: "BMX park session"
            }
        ]
    },
    photography: {
        title: "Photography Portfolio",
        description: "Various subjects and outdoor scene photography",
        images: [
            {
                src: "images/photography/landscape-1.jpg",
                alt: "Mountain landscape photography",
                caption: "Sunrise over mountain peaks"
            },
            {
                src: "images/photography/nature-1.jpg",
                alt: "Nature photography",
                caption: "Wildlife and natural scenes"
            }
        ]
    },
    cooking: {
        title: "Culinary Adventures",
        description: "Food photography and cooking projects",
        images: [
            {
                src: "images/cooking/dish-1.jpg",
                alt: "Gourmet cooking",
                caption: "Homemade gourmet dish"
            },
            {
                src: "images/cooking/process-1.jpg",
                alt: "Cooking process",
                caption: "Behind the scenes cooking"
            }
        ]
    },
    outdoor: {
        title: "Outdoor Adventures", 
        description: "Hiking, camping, and outdoor exploration",
        images: [
            {
                src: "images/outdoor/hiking-1.jpg",
                alt: "Mountain hiking",
                caption: "Summit views after a challenging hike"
            },
            {
                src: "images/outdoor/camping-1.jpg",
                alt: "Camping adventures",
                caption: "Peaceful camping under the stars"
            }
        ]
    }
};

// Lightbox functionality
let currentLightbox = null;
let currentImageIndex = 0;
let currentGalleryImages = [];

function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay">
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">&#8249;</button>
                <button class="lightbox-next">&#8250;</button>
                <img class="lightbox-image" src="" alt="">
                <div class="lightbox-caption"></div>
                <div class="lightbox-counter"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    return lightbox;
}

function openLightbox(images, startIndex = 0) {
    currentGalleryImages = images;
    currentImageIndex = startIndex;
    
    if (!currentLightbox) {
        currentLightbox = createLightbox();
        setupLightboxEvents();
    }
    
    showLightboxImage();
    currentLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (currentLightbox) {
        currentLightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showLightboxImage() {
    if (!currentLightbox || currentGalleryImages.length === 0) return;
    
    const image = currentGalleryImages[currentImageIndex];
    const lightboxImage = currentLightbox.querySelector('.lightbox-image');
    const lightboxCaption = currentLightbox.querySelector('.lightbox-caption');
    const lightboxCounter = currentLightbox.querySelector('.lightbox-counter');
    
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.caption || '';
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentGalleryImages.length}`;
    
    // Update navigation button states
    const prevBtn = currentLightbox.querySelector('.lightbox-prev');
    const nextBtn = currentLightbox.querySelector('.lightbox-next');
    
    prevBtn.style.display = currentImageIndex === 0 ? 'none' : 'block';
    nextBtn.style.display = currentImageIndex === currentGalleryImages.length - 1 ? 'none' : 'block';
}

function setupLightboxEvents() {
    if (!currentLightbox) return;
    
    // Close button
    currentLightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    
    // Overlay click to close
    currentLightbox.querySelector('.lightbox-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // Navigation buttons
    currentLightbox.querySelector('.lightbox-prev').addEventListener('click', function() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            showLightboxImage();
        }
    });
    
    currentLightbox.querySelector('.lightbox-next').addEventListener('click', function() {
        if (currentImageIndex < currentGalleryImages.length - 1) {
            currentImageIndex++;
            showLightboxImage();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!currentLightbox || !currentLightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    showLightboxImage();
                }
                break;
            case 'ArrowRight':
                if (currentImageIndex < currentGalleryImages.length - 1) {
                    currentImageIndex++;
                    showLightboxImage();
                }
                break;
        }
    });
}

// Initialize gallery functionality
function initializeGalleries() {
    // Add click handlers to gallery cards on main page
    document.querySelectorAll('.gallery-card').forEach(card => {
        const galleryLink = card.querySelector('.gallery-link');
        if (galleryLink) {
            const href = galleryLink.getAttribute('href');
            
            // Extract gallery type from href (e.g., galleries/biking.html -> biking)
            const galleryType = href.split('/').pop().replace('.html', '');
            
            // Add preview click handler
            card.addEventListener('click', function(e) {
                // Only open lightbox if not clicking the actual link
                if (!e.target.closest('.gallery-link')) {
                    e.preventDefault();
                    const galleryData = galleries[galleryType];
                    if (galleryData && galleryData.images.length > 0) {
                        openLightbox(galleryData.images, 0);
                    }
                }
            });
        }
    });
}

// Image lazy loading for galleries
function setupGalleryLazyLoading() {
    const galleryImages = document.querySelectorAll('.gallery-image img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        galleryImages.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
}

// Create placeholder images for galleries that don't have photos yet
function createPlaceholderImage(width = 400, height = 300, text = 'Photo Coming Soon') {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, width, height);
    
    // Border
    ctx.strokeStyle = '#e1e1e1';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, width - 2, height - 2);
    
    // Text
    ctx.fillStyle = '#666';
    ctx.font = '16px Helvetica Neue, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
    
    return canvas.toDataURL();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGalleries();
    setupGalleryLazyLoading();
    
    // Create placeholder preview images for gallery cards without actual images
    document.querySelectorAll('.gallery-image img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = createPlaceholderImage(400, 200, 'Gallery Preview');
        });
    });
});

// Export functions for use in gallery pages
window.galleryUtils = {
    openLightbox,
    closeLightbox,
    galleries,
    createPlaceholderImage
};