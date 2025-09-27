/**
 * Gallery Configuration System
 * Comprehensive configuration for the Dynamic Media Gallery System
 */

const GALLERY_CONFIG = {
    // Display settings
    display: {
        defaultSize: 100,           // Default image size percentage
        minSize: 25,               // Minimum size percentage
        maxSize: 200,              // Maximum size percentage
        sizeStep: 25,              // Size step increment
        defaultLayout: 'grid',     // grid, list, masonry
        itemsPerPage: 20,          // Images per page (default)
        defaultColumns: 4,         // Grid columns (desktop)
        mobileColumns: 2,          // Grid columns (mobile)
        tabletColumns: 3,          // Grid columns (tablet)
        thumbnailQuality: 85,      // Thumbnail quality (1-100)
        lazyLoadOffset: 100        // Pixels before loading image
    },



    // Feature toggles
    features: {
        lightbox: true,
        lazyLoading: true,
        batchSelection: true,
        batchDownload: true,
        keyboardNavigation: true,
        touchGestures: true,
        imageInfo: true,
        zoom: true,
        fullscreen: true,
        socialSharing: false,
        imageCaching: true,
        infiniteScroll: false,
        dragAndDrop: false
    },

    // Performance settings
    performance: {
        thumbnailQuality: 80,
        cacheImages: true,
        preloadNext: 3,            // Number of next images to preload
        maxConcurrentLoads: 6,     // Max simultaneous image loads
        imageLoadTimeout: 10000,   // Image load timeout (ms)
        enableVirtualScrolling: false,
        enableImageCompression: false,
        chunkSize: 50              // Process images in chunks
    },

    // Responsive breakpoints
    responsive: {
        mobile: 768,
        tablet: 1024,
        desktop: 1200,
        largeDesktop: 1400
    },

    // UI Text and Labels
    ui: {
        loading: {
            text: 'Завантаження галереї...',
            error: 'Помилка завантаження',
            noResults: 'Нічого не знайдено',
            retry: 'Спробувати знову'
        },
        buttons: {
            selectAll: 'Вибрати все',
            download: 'Завантажити',
            close: 'Закрити',
            previous: 'Попередня',
            next: 'Наступна',
            zoomIn: 'Збільшити',
            zoomOut: 'Зменшити',
            resetZoom: 'Скинути масштаб',
            fullscreen: 'На весь екран'
        },
        labels: {
            itemsPerPage: 'На сторінці',
            totalImages: 'зображень',
            page: 'Сторінка'
        },


        pagination: {
            options: [
                { value: 20, label: '20' },
                { value: 50, label: '50' },
                { value: 100, label: '100' },
                { value: 'all', label: 'Усі' }
            ]
        }
    },

    // Animation settings
    animations: {
        fadeInDuration: 300,
        scaleInDuration: 200,
        slideInDuration: 250,
        lightboxFadeDuration: 200,
        hoverTransition: '0.2s ease',
        loadingSpinner: true,
        enableTransitions: true
    },

    // Keyboard shortcuts
    keyboard: {
        escape: 'closeLightbox',
        arrowLeft: 'previousImage',
        arrowRight: 'nextImage',
        space: 'togglePlayPause',
        enter: 'openLightbox',
        f: 'toggleFullscreen',
        plus: 'zoomIn',
        minus: 'zoomOut',
        zero: 'resetZoom'
    },

    // Touch gestures (mobile)
    gestures: {
        swipeThreshold: 50,        // Minimum swipe distance
        pinchThreshold: 0.1,       // Minimum pinch scale change
        doubleTapZoom: 2,          // Double tap zoom level
        maxZoom: 5,                // Maximum zoom level
        minZoom: 0.5               // Minimum zoom level
    },

    // Data source settings
    data: {
        // Explicitly disable JSON fetching from static files
        source: null, // previously 'media_info.json'
        disableFetch: true,
        cacheKey: 'gallery_media_cache',
        cacheExpiry: 3600000,     // 1 hour in milliseconds
        retryAttempts: 3,
        retryDelay: 1000,
        validateSchema: true
    },

    // Image processing
    imageProcessing: {
        supportedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
        thumbnailSizes: {
            small: 150,
            medium: 300,
            large: 450
        },
        compressionQuality: 85,
        enableLazyBlur: true,      // Blur effect while loading
        placeholderColor: '#f0f0f0'
    },

    // Accessibility
    accessibility: {
        enableKeyboardNavigation: true,
        enableScreenReader: true,
        enableFocusManagement: true,
        enableAriaLabels: true,
        highContrastMode: false,
        reducedMotion: false
    },

    // Debug and development
    debug: {
        enableLogging: true,
        logLevel: 'info',          // 'debug', 'info', 'warn', 'error'
        showLoadTimes: false,
        showImageDimensions: false,
        enablePerformanceMonitoring: false
    }
};

// Export configuration for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GALLERY_CONFIG;
}

// Global configuration accessor
window.GALLERY_CONFIG = GALLERY_CONFIG;

// Configuration validation
function validateGalleryConfig() {
    const required = ['display', 'features', 'ui'];
    const missing = required.filter(key => !GALLERY_CONFIG.hasOwnProperty(key));
    
    if (missing.length > 0) {
        console.error('❌ Gallery Config - Missing required sections:', missing);
        return false;
    }
    
    console.log('✅ Gallery Configuration validated successfully');
    return true;
}

// Helper functions for configuration access
const GalleryConfig = {
    get: function(path, defaultValue = null) {
        return path.split('.').reduce((obj, key) => 
            (obj && obj[key] !== 'undefined') ? obj[key] : defaultValue, GALLERY_CONFIG);
    },
    
    set: function(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((obj, key) => {
            if (!(key in obj)) obj[key] = {};
            return obj[key];
        }, GALLERY_CONFIG);
        target[lastKey] = value;
    },
    
    merge: function(newConfig) {
        return Object.assign({}, GALLERY_CONFIG, newConfig);
    }
};

// Make helper available globally
window.GalleryConfig = GalleryConfig;

// Validate configuration on load
document.addEventListener('DOMContentLoaded', function() {
    validateGalleryConfig();
});
