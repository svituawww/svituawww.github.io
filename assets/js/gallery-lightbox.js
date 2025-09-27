/**
 * Gallery Lightbox System
 * Full-screen image viewer with navigation and controls
 */

class GalleryLightbox {
    constructor() {
        this.isOpen = false;
        this.currentIndex = 0;
        this.images = [];
        this.zoomLevel = 1;
        this.maxZoom = 5;
        this.minZoom = 0.5;
        this.zoomStep = 0.25;
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.imagePosition = { x: 0, y: 0 };
        
        // Touch/gesture support
        this.touches = [];
        this.lastTouchDistance = 0;
        
        this.initializeEventListeners();
        console.log('🔍 GalleryLightbox initialized');
    }

    /**
     * Open lightbox with specific image
     */
    open(index) {
        if (!window.gallery || !window.gallery.filteredFiles) {
            console.error('❌ Gallery not initialized');
            return;
        }
        
        this.images = window.gallery.filteredFiles;
        this.currentIndex = Math.max(0, Math.min(index, this.images.length - 1));
        this.isOpen = true;
        
        const overlay = document.getElementById('lightboxOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
            overlay.classList.add('lightbox-opening');
            
            // Force reflow for animation
            overlay.offsetHeight;
            overlay.classList.remove('lightbox-opening');
        }
        
        this.loadCurrentImage();
        this.updateNavigation();
        this.updateImageInfo();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const lightboxContainer = document.querySelector('.lightbox-container');
        if (lightboxContainer) {
            lightboxContainer.focus();
        }
        
        console.log(`🔍 Lightbox opened at index ${this.currentIndex}`);
    }

    /**
     * Close lightbox
     */
    close() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        
        const overlay = document.getElementById('lightboxOverlay');
        if (overlay) {
            overlay.classList.add('lightbox-closing');
            
            setTimeout(() => {
                overlay.style.display = 'none';
                overlay.classList.remove('lightbox-closing');
            }, GALLERY_CONFIG.animations.lightboxFadeDuration);
        }
        
        // Reset zoom and position
        this.resetZoom();
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        console.log('🔍 Lightbox closed');
    }

    /**
     * Navigate to previous image
     */
    previous() {
        if (!this.isOpen || this.images.length === 0) return;
        
        this.currentIndex = this.currentIndex > 0 ? 
            this.currentIndex - 1 : 
            this.images.length - 1;
        
        this.loadCurrentImage();
        this.updateNavigation();
        this.updateImageInfo();
        this.resetZoom();
        
        console.log(`◀️ Previous image: ${this.currentIndex}`);
    }

    /**
     * Navigate to next image
     */
    next() {
        if (!this.isOpen || this.images.length === 0) return;
        
        this.currentIndex = this.currentIndex < this.images.length - 1 ? 
            this.currentIndex + 1 : 
            0;
        
        this.loadCurrentImage();
        this.updateNavigation();
        this.updateImageInfo();
        this.resetZoom();
        
        console.log(`▶️ Next image: ${this.currentIndex}`);
    }

    /**
     * Load current image
     */
    loadCurrentImage() {
        const lightboxImage = document.getElementById('lightboxImage');
        if (!lightboxImage || !this.images[this.currentIndex]) return;
        
        const currentImage = this.images[this.currentIndex];
        
        // Show loading state
        lightboxImage.style.opacity = '0.5';
        lightboxImage.style.filter = 'blur(2px)';
        
        // Create new image to preload
        const img = new Image();
        img.onload = () => {
            lightboxImage.src = img.src;
            lightboxImage.alt = currentImage.filename;
            lightboxImage.style.opacity = '1';
            lightboxImage.style.filter = 'none';
            
            // Reset position and zoom
            this.resetImageTransform();
        };
        
        img.onerror = () => {
            console.error('❌ Failed to load image:', currentImage.file_path);
            lightboxImage.alt = 'Failed to load image';
            lightboxImage.style.opacity = '1';
            lightboxImage.style.filter = 'none';
        };
        
        img.src = currentImage.file_path;
        
        // Preload adjacent images
        this.preloadAdjacentImages();
    }

    /**
     * Preload adjacent images for smoother navigation
     */
    preloadAdjacentImages() {
        const preloadCount = GALLERY_CONFIG.performance.preloadNext;
        
        for (let i = 1; i <= preloadCount; i++) {
            // Preload next images
            const nextIndex = (this.currentIndex + i) % this.images.length;
            if (this.images[nextIndex]) {
                this.preloadImage(this.images[nextIndex].file_path);
            }
            
            // Preload previous images
            const prevIndex = (this.currentIndex - i + this.images.length) % this.images.length;
            if (this.images[prevIndex]) {
                this.preloadImage(this.images[prevIndex].file_path);
            }
        }
    }

    /**
     * Preload a single image
     */
    preloadImage(src) {
        if (!src) return;
        
        const img = new Image();
        img.src = src;
    }

    /**
     * Update navigation buttons
     */
    updateNavigation() {
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        
        if (this.images.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
        } else {
            if (prevBtn) prevBtn.style.display = 'block';
            if (nextBtn) nextBtn.style.display = 'block';
        }
    }

    /**
     * Update image information display
     */
    updateImageInfo() {
        const currentImage = this.images[this.currentIndex];
        if (!currentImage) return;
        
        const filename = document.getElementById('lightboxFilename');
        const details = document.getElementById('lightboxDetails');
        
        if (filename) {
            filename.textContent = currentImage.filename;
        }
        
        if (details) {
            const detailsText = [
                currentImage.size_width && currentImage.size_height ? 
                    `${currentImage.size_width}×${currentImage.size_height}` : '',
                currentImage.displaySize || '',
                currentImage.format || '',
                `${this.currentIndex + 1} из ${this.images.length}`
            ].filter(Boolean).join(' • ');
            
            details.textContent = detailsText;
        }
    }

    /**
     * Zoom in
     */
    zoomIn() {
        if (this.zoomLevel < this.maxZoom) {
            this.zoomLevel += this.zoomStep;
            this.applyZoom();
            console.log(`🔍+ Zoom in: ${this.zoomLevel.toFixed(2)}x`);
        }
    }

    /**
     * Zoom out
     */
    zoomOut() {
        if (this.zoomLevel > this.minZoom) {
            this.zoomLevel -= this.zoomStep;
            this.applyZoom();
            console.log(`🔍- Zoom out: ${this.zoomLevel.toFixed(2)}x`);
        }
    }

    /**
     * Reset zoom
     */
    resetZoom() {
        this.zoomLevel = 1;
        this.imagePosition = { x: 0, y: 0 };
        this.applyZoom();
        console.log('↻ Zoom reset');
    }

    /**
     * Apply zoom transformation
     */
    applyZoom() {
        const lightboxImage = document.getElementById('lightboxImage');
        if (lightboxImage) {
            lightboxImage.style.transform = 
                `scale(${this.zoomLevel}) translate(${this.imagePosition.x}px, ${this.imagePosition.y}px)`;
            lightboxImage.style.cursor = this.zoomLevel > 1 ? 'move' : 'zoom-in';
        }
    }

    /**
     * Reset image transform
     */
    resetImageTransform() {
        this.zoomLevel = 1;
        this.imagePosition = { x: 0, y: 0 };
        this.applyZoom();
    }

    /**
     * Handle mouse wheel for zooming
     */
    handleWheel(e) {
        if (!this.isOpen) return;
        
        e.preventDefault();
        
        if (e.deltaY < 0) {
            this.zoomIn();
        } else {
            this.zoomOut();
        }
    }

    /**
     * Handle mouse down for dragging
     */
    handleMouseDown(e) {
        if (!this.isOpen || this.zoomLevel <= 1) return;
        
        this.isDragging = true;
        this.dragStart = { x: e.clientX, y: e.clientY };
        
        const lightboxImage = document.getElementById('lightboxImage');
        if (lightboxImage) {
            lightboxImage.style.cursor = 'grabbing';
        }
    }

    /**
     * Handle mouse move for dragging
     */
    handleMouseMove(e) {
        if (!this.isDragging || !this.isOpen) return;
        
        const deltaX = e.clientX - this.dragStart.x;
        const deltaY = e.clientY - this.dragStart.y;
        
        this.imagePosition.x += deltaX;
        this.imagePosition.y += deltaY;
        
        this.dragStart = { x: e.clientX, y: e.clientY };
        this.applyZoom();
    }

    /**
     * Handle mouse up for dragging
     */
    handleMouseUp() {
        if (this.isDragging) {
            this.isDragging = false;
            
            const lightboxImage = document.getElementById('lightboxImage');
            if (lightboxImage) {
                lightboxImage.style.cursor = this.zoomLevel > 1 ? 'move' : 'zoom-in';
            }
        }
    }

    /**
     * Handle touch start for mobile gestures
     */
    handleTouchStart(e) {
        if (!this.isOpen) return;
        
        this.touches = Array.from(e.touches);
        
        if (this.touches.length === 1) {
            // Single touch - start dragging
            this.isDragging = true;
            this.dragStart = { 
                x: this.touches[0].clientX, 
                y: this.touches[0].clientY 
            };
        } else if (this.touches.length === 2) {
            // Two touches - start pinch zoom
            this.lastTouchDistance = this.getTouchDistance();
        }
    }

    /**
     * Handle touch move for mobile gestures
     */
    handleTouchMove(e) {
        if (!this.isOpen) return;
        
        e.preventDefault();
        this.touches = Array.from(e.touches);
        
        if (this.touches.length === 1 && this.isDragging) {
            // Single touch drag
            const deltaX = this.touches[0].clientX - this.dragStart.x;
            const deltaY = this.touches[0].clientY - this.dragStart.y;
            
            this.imagePosition.x += deltaX;
            this.imagePosition.y += deltaY;
            
            this.dragStart = { 
                x: this.touches[0].clientX, 
                y: this.touches[0].clientY 
            };
            
            this.applyZoom();
        } else if (this.touches.length === 2) {
            // Pinch zoom
            const currentDistance = this.getTouchDistance();
            const scaleChange = currentDistance / this.lastTouchDistance;
            
            const newZoom = this.zoomLevel * scaleChange;
            if (newZoom >= this.minZoom && newZoom <= this.maxZoom) {
                this.zoomLevel = newZoom;
                this.applyZoom();
            }
            
            this.lastTouchDistance = currentDistance;
        }
    }

    /**
     * Handle touch end
     */
    handleTouchEnd(e) {
        this.touches = Array.from(e.touches);
        
        if (this.touches.length === 0) {
            this.isDragging = false;
        }
    }

    /**
     * Get distance between two touches
     */
    getTouchDistance() {
        if (this.touches.length < 2) return 0;
        
        const dx = this.touches[0].clientX - this.touches[1].clientX;
        const dy = this.touches[0].clientY - this.touches[1].clientY;
        
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Download current image
     */
    downloadCurrentImage() {
        const currentImage = this.images[this.currentIndex];
        if (currentImage) {
            downloadImage(currentImage.file_path, currentImage.filename);
        }
    }

    /**
     * Initialize event listeners
     */
    initializeEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            
            switch (e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previous();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.next();
                    break;
                case '+':
                case '=':
                    e.preventDefault();
                    this.zoomIn();
                    break;
                case '-':
                    e.preventDefault();
                    this.zoomOut();
                    break;
                case '0':
                    e.preventDefault();
                    this.resetZoom();
                    break;
                case ' ':
                    e.preventDefault();
                    // Space bar could toggle slideshow in future
                    break;
            }
        });
        
        // Mouse events for zoom and drag
        document.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
        document.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('lightbox-image')) {
                this.handleMouseDown(e);
            }
        });
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseup', () => this.handleMouseUp());
        
        // Touch events for mobile
        document.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('lightbox-image')) {
                this.handleTouchStart(e);
            }
        }, { passive: false });
        
        document.addEventListener('touchmove', (e) => {
            if (e.target.classList.contains('lightbox-image')) {
                this.handleTouchMove(e);
            }
        }, { passive: false });
        
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Double-click/double-tap to zoom
        let lastTap = 0;
        document.addEventListener('click', (e) => {
            if (!e.target.classList.contains('lightbox-image')) return;
            
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 500 && tapLength > 0) {
                // Double click/tap
                if (this.zoomLevel === 1) {
                    this.zoomLevel = 2;
                } else {
                    this.zoomLevel = 1;
                    this.imagePosition = { x: 0, y: 0 };
                }
                this.applyZoom();
            }
            
            lastTap = currentTime;
        });
        
        console.log('🎧 Lightbox event listeners initialized');
    }
}

// Global lightbox instance
window.galleryLightbox = new GalleryLightbox();

// Global functions for HTML onclick events
function openLightbox(index) {
    window.galleryLightbox.open(index);
}

function closeLightbox() {
    window.galleryLightbox.close();
}

function previousImage() {
    window.galleryLightbox.previous();
}

function nextImage() {
    window.galleryLightbox.next();
}

function zoomIn() {
    window.galleryLightbox.zoomIn();
}

function zoomOut() {
    window.galleryLightbox.zoomOut();
}

function resetZoom() {
    window.galleryLightbox.resetZoom();
}

function downloadImage(filePath, filename) {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filename || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`💾 Downloading: ${filename}`);
}

console.log('🔍 Gallery-lightbox.js loaded successfully');
