/**
 * Dynamic Media Gallery System
 * Main MediaGallery class for handling gallery functionality
 */

class MediaGallery {
    constructor() {
        this.mediaFiles = [];
        this.filteredFiles = [];
        this.currentPage = 1;
        this.itemsPerPage = GALLERY_CONFIG.display.itemsPerPage;
        this.currentLayout = GALLERY_CONFIG.display.defaultLayout;
        this.currentSize = GALLERY_CONFIG.display.defaultSize;
        this.isLoading = false;
        this.isInitialized = false;
        this.loadedImages = new Set();
        this.config = GALLERY_CONFIG;
        this.selectedFilePaths = new Set();
        
               
        this.pendingUpdates = new Set(); // Track pending API calls
        
        // Performance monitoring
        this.startTime = Date.now();
        this.loadTimes = {};
        
        console.log('🖼️ MediaGallery initialized');
    }

    
    
    /**
     * Get file hash for a file path
     */
    getFileHashForFilePath(filePath) {
        const mediaFile = this.mediaFiles.find(f => f.file_path === filePath);
        return mediaFile ? mediaFile.file_hash : null;
    }

    /**
     * Initialize the gallery
     */
    async init() {
        try {
            console.log('🚀 Starting gallery initialization...');
            this.showLoading(true);
            
            // Initialize event listeners
            this.initializeEventListeners();
            
            // Load media data
            await this.loadMediaData();
            
            // Process and filter data
            this.processMediaData();
            
            // Render initial gallery
            this.renderGallery();
            
           
            // Initialize keyboard navigation
            this.initializeKeyboardNavigation();
            
            this.isInitialized = true;
            this.showLoading(false);
            
            console.log('✅ Gallery initialized successfully');
            console.log(`📊 Loaded ${this.mediaFiles.length} media files`);
            console.log('🔧 Gallery configuration:', {
                defaultLayout: this.currentLayout,
                itemsPerPage: this.itemsPerPage,
                lazyLoading: this.config.features.lazyLoading
            });
            
            if (this.config.debug.enableLogging) {
                const loadTime = Date.now() - this.startTime;
                console.log(`⏱️ Gallery initialization time: ${loadTime}ms`);
            }
            
        } catch (error) {
            console.error('❌ Gallery initialization failed:', error);
            this.showError('Не вдалося завантажити галерею');
        }
    }

    /**
     * Load media data (static hosting compatible)
     */
    async loadMediaData() {
        const dataStart = Date.now();
        
        try {
            
            // Clear any existing cache
            this.clearCachedData();            
            
            // Try to get data from embedded JavaScript (static hosting)
            let data;
            if (typeof window.getGalleryMediaData === 'function') {
                console.log('📋 Using embedded static data (GitHub Pages compatible)');
                data = await window.getGalleryMediaData();
            }

            // If embedded call returned nothing, try global
            if (!data && typeof window.GALLERY_MEDIA_DATA !== 'undefined') {
                console.log('📋 Using global static data');
                data = window.GALLERY_MEDIA_DATA;
            }

            // Final fallback to fetch (only if enabled and a source is provided)
            if (!data) {
                const { disableFetch, source } = this.config.data || {};
                if (!disableFetch && source) {
                    console.log('📥 Fetching data from JSON file...');
                    const response = await fetch(source);
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    data = await response.json();
                } else {
                    console.warn('⚠️ No embedded data and fetch disabled; using empty dataset');
                    data = { media_files: [] };
                }
            }
            
            // Validate data structure
            if (!data || !data.media_files || !Array.isArray(data.media_files)) {
                throw new Error('Invalid data structure: missing media_files array');
            }
            
            this.mediaFiles = data.media_files;
            
            // Debug: Check what's in loaded data
            const media1InLoaded = this.mediaFiles.filter(f => f.directory && f.directory.startsWith('media1')).length;
            const uploads1InLoaded = this.mediaFiles.filter(f => f.directory && f.directory.startsWith('uploads1')).length;
            console.log(`📊 Loaded data contains: Media1=${media1InLoaded}, Uploads1=${uploads1InLoaded}`);
            console.log(`📂 First 5 loaded files:`, this.mediaFiles.slice(0, 5).map(f => `${f.filename} (${f.directory})`));
            console.log(`📂 Last 5 loaded files:`, this.mediaFiles.slice(-5).map(f => `${f.filename} (${f.directory})`));
            
            // Cache the data
            this.setCachedData(data);
            
            const dataTime = Date.now() - dataStart;
            console.log(`✅ Media data loaded: ${this.mediaFiles.length} files in ${dataTime}ms`);
            
        } catch (error) {
            console.error('❌ Failed to load media data:', error);
            throw new Error(`Failed to load gallery data: ${error.message}`);
        }
    }

    /**
     * Process and enrich media data
     */
    processMediaData() {
        console.log('⚙️ Processing media data...');
        
        // Debug: Count files before filtering
        const media1BeforeFilter = this.mediaFiles.filter(f => f.directory && f.directory.startsWith('media1')).length;
        const uploads1BeforeFilter = this.mediaFiles.filter(f => f.directory && f.directory.startsWith('uploads1')).length;
        
        // Count files by category before filtering
        const totalFiles = this.mediaFiles.length;
        const missingMimeOrFormat = this.mediaFiles.filter(f => !f.mime_type || !f.format).length;
        
        console.log('📊 Pre-filter analysis:', {
            totalFiles,
            missingMimeOrFormat,
            sampleFormats: [...new Set(this.mediaFiles.slice(0, 10).map(f => f.format))],
            sampleMimeTypes: [...new Set(this.mediaFiles.slice(0, 10).map(f => f.mime_type))]
        });
        
        try {
            console.log('🔄 Starting file processing...');
            
            const filteredFiles = [];
            let processedCount = 0;
            
            for (const file of this.mediaFiles) {
                try {
                    processedCount++;
                    if (processedCount % 50 === 0) {
                        console.log(`📊 Processed ${processedCount}/${totalFiles} files...`);
                    }
                    
                    if (this.isImageFile(file)) {
                        const enrichedFile = this.enrichMediaFile(file);
                        filteredFiles.push(enrichedFile);
                    }
                } catch (error) {
                    console.error(`❌ Error processing file ${file.filename}:`, error);
                    // Continue processing other files
                }
            }
            
            this.mediaFiles = filteredFiles;
            console.log(`✅ File processing complete: ${filteredFiles.length} files processed successfully`);
            
        } catch (error) {
            console.error('❌ Critical error during file processing:', error);
            throw error;
        }
        
        // Debug: Count files after filtering
        const media1AfterFilter = this.mediaFiles.filter(f => f.directory && f.directory.startsWith('media1')).length;
        const uploads1AfterFilter = this.mediaFiles.filter(f => f.directory && f.directory.startsWith('uploads1')).length;
        
        console.log('📊 File filtering results:');
        console.log(`   Media1: ${media1BeforeFilter} → ${media1AfterFilter} files`);
        console.log(`   Uploads1: ${uploads1BeforeFilter} → ${uploads1AfterFilter} files`);
        
        console.log(`✅ Processed ${this.mediaFiles.length} image files`);
    }

    /**
     * Check if file is an image
     */
    isImageFile(file) {
        if (!file.mime_type || !file.format) {
            if (file.directory && file.directory.startsWith('media1')) {
                console.warn('⚠️ Media1 file missing mime_type or format:', file.filename);
            }
            return false;
        }
        
        const supportedFormats = this.config.imageProcessing.supportedFormats;
        const format = file.format.toLowerCase();
        const mimeType = file.mime_type.toLowerCase();
        
        const isSupported = supportedFormats.some(fmt => 
            format.includes(fmt) || mimeType.includes(fmt)
        );
        
        // Debug logging for all files that fail
        if (!isSupported) {
            console.warn('⚠️ File not supported:', {
                filename: file.filename,
                directory: file.directory,
                format: file.format,
                mime_type: file.mime_type,
                supportedFormats
            });
        }
        
        return isSupported;
    }

    /**
     * Enrich media file with additional properties
     */
    enrichMediaFile(file) {
        // Generate thumbnail path (assuming thumbnails exist)
        const thumbnailPath = this.generateThumbnailPath(file.file_path);
        
        return {
            ...file,
            thumbnailPath,
            aspectRatio: file.size_width && file.size_height ? 
                (file.size_width / file.size_height) : 1,
            displaySize: this.formatFileSize(file.file_size_bytes)
        };
    }

    /**
     * Generate thumbnail path
     */
    generateThumbnailPath(originalPath) {
        // For now, return original path
        // In a real implementation, you'd generate actual thumbnail paths
        return originalPath;
    }

    /**
     * Format file size for display
     */
    formatFileSize(bytes) {
        if (!bytes) return '0 B';
        
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    /**
     * Initialize event listeners
     */
    initializeEventListeners() {
        // Size slider
        const sizeSlider = document.getElementById('sizeSlider');
        if (sizeSlider) {
            sizeSlider.addEventListener('input', (e) => {
                this.updateImageSize(parseInt(e.target.value));
            });
        }
        
        // Layout buttons
        document.querySelectorAll('.layout-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const layout = (e.currentTarget || e.target).dataset.layout;
                await this.switchLayout(layout);
            });
        });
        
        // Items per page
        const itemsPerPage = document.getElementById('itemsPerPage');
        if (itemsPerPage) {
            itemsPerPage.addEventListener('change', async (e) => {
                await this.updateItemsPerPage(e.target.value);
            });
        }
        
    }



    /**
     * Update gallery statistics
     */
    updateStatistics() {       
        const totalImages = document.getElementById('totalImages');
        if (totalImages) {
            totalImages.textContent = this.mediaFiles.length;
        }
    }

    /**
     * Render gallery
     */
    async renderGallery() {
        // Use all media files since we removed filters
        this.filteredFiles = this.mediaFiles;
        
        // Render gallery items
        await this.renderGalleryItems();
        
        // Update pagination
        this.updatePagination();
        
        // Update statistics
        this.updateStatistics();
    }

    /**
     * Render gallery grid
     */
    async renderGalleryItems() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;
        
        // Calculate pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = this.itemsPerPage === 'all' ? 
            this.filteredFiles.length : 
            startIndex + parseInt(this.itemsPerPage);
        
        const visibleFiles = this.filteredFiles.slice(startIndex, endIndex);
        
        if (visibleFiles.length === 0) {
            this.showNoResults(true);
            galleryGrid.innerHTML = '';
            return;
        }
        
        this.showNoResults(false);
        
        // Generate gallery items HTML
        galleryGrid.innerHTML = visibleFiles.map((file, index) => 
            this.generateGalleryItemHTML(file, startIndex + index)
        ).join('');
        
        // Apply current layout and size
        galleryGrid.className = `gallery-grid layout-${this.currentLayout}`;
        this.updateImageSize(this.currentSize);
        
        // Initialize lazy loading
        if (this.config.features.lazyLoading) {
            this.initializeLazyLoading();
        }
        
       
        // Apply selection state to the newly rendered items
        this.applySelectionStateToRendered();
        
        console.log(`🖼️ Rendered ${visibleFiles.length} images out of ${this.filteredFiles.length} filtered images`);
        console.log(`📊 Total media files loaded: ${this.mediaFiles.length}`);
        
        // Debug: Check if any images fail to load
        setTimeout(() => {
            const images = galleryGrid.querySelectorAll('.gallery-image');
            const loadedImages = Array.from(images).filter(img => img.complete && img.naturalHeight !== 0);
            const failedImages = Array.from(images).filter(img => img.complete && img.naturalHeight === 0);
            
            console.log(`📊 Image loading status: ${loadedImages.length} loaded, ${failedImages.length} failed`);
            if (failedImages.length > 0) {
                console.warn('❌ Failed to load images:', failedImages.map(img => img.src));
            }
        }, 2000);
    }

    /**
     * Generate HTML for a single gallery item
     */
    generateGalleryItemHTML(file, index) {
        const { filename, file_path, size_width, size_height, displaySize, format } = file;
        // const galleryinfo_block = `
        //                 <div class="gallery-info">
        //                     <div class="gallery-filename">${filename}</div>
        //                     <div class="gallery-details">
        //                         ${size_width && size_height ? `${size_width}×${size_height}` : ''} 
        //                         ${displaySize ? `• ${displaySize}` : ''} 
        //                         ${format ? `• ${format}` : ''}
        //                     </div>
        //                 </div>
        // `;        
        const galleryinfo_block = '';        
        return `
            <div class="gallery-item" data-index="${index}" data-file-path="${file_path}">
                <div class="gallery-item-container">
                    <img 
                        class="gallery-image ${this.config.features.lazyLoading ? 'lazy' : ''}"
                        ${this.config.features.lazyLoading ? 'data-src' : 'src'}="${file_path}"
                        alt="${filename}"
                        loading="lazy"
                        onclick="openLightbox(${index})"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                    >
                    
                    <div class="gallery-missing-image" style="display: none; align-items: center; justify-content: center; background: #f0f0f0; border: 2px dashed #ccc; min-height: 150px; flex-direction: column;">
                        <div style="font-size: 24px; margin-bottom: 8px;">📷</div>
                        <div style="font-size: 12px; color: #666; text-align: center;">
                            Зображення недоступне<br/>
                            <small>${filename}</small>
                        </div>
                    </div>
                    
                    <div class="gallery-overlay">
                        ${galleryinfo_block}                        
                        <div class="gallery-actions">
                            <button class="gallery-btn" onclick="openLightbox(${index})" title="Переглянути">
                                🔍
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Selection state application (no-op; selection UI removed)
     */
    applySelectionStateToRendered() {
        // Intentionally left blank. Kept for compatibility with previous code paths.
    }



    /**
     * Update image size
     */
    updateImageSize(percentage) {
        this.currentSize = percentage;
        
        document.querySelectorAll('.gallery-image').forEach(img => {
            img.style.width = `${percentage}%`;
            img.style.height = 'auto';
        });
        
        // Update size display
        const sizeDisplay = document.getElementById('sizeDisplay');
        if (sizeDisplay) {
            sizeDisplay.textContent = `${percentage}%`;
        }
        
        // Update slider
        const sizeSlider = document.getElementById('sizeSlider');
        if (sizeSlider && sizeSlider.value != percentage) {
            sizeSlider.value = percentage;
        }
    }

    /**
     * Switch gallery layout
     */
    async switchLayout(layoutType) {
        if (!['grid', 'list', 'masonry'].includes(layoutType)) return;
        
        this.currentLayout = layoutType;
        
        const galleryGrid = document.getElementById('galleryGrid');
        if (galleryGrid) {
            galleryGrid.className = `gallery-grid layout-${layoutType}`;
        }
        
        // Update active button
        document.querySelectorAll('.layout-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.layout === layoutType);
        });
        
        console.log(`🔄 Layout switched to: ${layoutType}`);
    }

    /**
     * Update items per page
     */
    async updateItemsPerPage(value) {
        this.itemsPerPage = value === 'all' ? 'all' : parseInt(value);
        this.currentPage = 1;
        await this.renderGallery();
        this.updatePagination();
        
        console.log(`📄 Items per page: ${this.itemsPerPage}`);
    }





    /**
     * Initialize lazy loading
     */
    initializeLazyLoading() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: load all images immediately
            document.querySelectorAll('.gallery-image.lazy').forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
            return;
        }
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: `${this.config.display.lazyLoadOffset}px`
        });
        
        document.querySelectorAll('.gallery-image.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }

    /**
     * Initialize keyboard navigation
     */
    initializeKeyboardNavigation() {
        if (!this.config.features.keyboardNavigation) return;
        
        document.addEventListener('keydown', (e) => {
            if (document.activeElement.tagName === 'INPUT') return;
            
            const action = this.config.keyboard[e.key.toLowerCase()];
            if (action && typeof window[action] === 'function') {
                e.preventDefault();
                window[action]();
            }
        });
        
        console.log('⌨️ Keyboard navigation initialized');
    }

    /**
     * Update pagination
     */
    updatePagination() {
        const paginationInfo = document.getElementById('paginationInfo');
        const prevButton = document.getElementById('prevPage');
        const nextButton = document.getElementById('nextPage');
        
        if (this.itemsPerPage === 'all') {
            const paginationContainer = document.getElementById('galleryPagination');
            if (paginationContainer) {
                paginationContainer.style.display = 'none';
            }
            return;
        }
        
        const totalPages = Math.ceil(this.filteredFiles.length / this.itemsPerPage);
        
        if (paginationInfo) {
            paginationInfo.textContent = `Сторінка ${this.currentPage} з ${totalPages}`;
        }
        
        if (prevButton) {
            prevButton.disabled = this.currentPage <= 1;
        }
        
        if (nextButton) {
            nextButton.disabled = this.currentPage >= totalPages;
        }
        
        const paginationContainer = document.getElementById('galleryPagination');
        if (paginationContainer) {
            paginationContainer.style.display = totalPages > 1 ? 'flex' : 'none';
        }
    }

    /**
     * Show/hide loading state
     */
    showLoading(show) {
        const loading = document.getElementById('galleryLoading');
        if (loading) {
            loading.style.display = show ? 'block' : 'none';
        }
    }

    /**
     * Show/hide no results state
     */
    showNoResults(show) {
        const noResults = document.getElementById('galleryNoResults');
        if (noResults) {
            noResults.style.display = show ? 'block' : 'none';
        }
    }

    /**
     * Show error state
     */
    showError(message) {
        const errorElement = document.getElementById('galleryError');
        if (errorElement) {
            errorElement.style.display = 'block';
            const errorText = errorElement.querySelector('p');
            if (errorText) {
                errorText.textContent = message;
            }
        }
        this.showLoading(false);
    }

    /**
     * Cache management
     */
    getCachedData() {
        try {
            const cached = localStorage.getItem(this.config.data.cacheKey);
            if (!cached) return null;
            
            const data = JSON.parse(cached);
            const now = Date.now();
            
            if (now - data.timestamp > this.config.data.cacheExpiry) {
                localStorage.removeItem(this.config.data.cacheKey);
                return null;
            }
            
            return data.data;
        } catch (error) {
            console.warn('⚠️ Cache read error:', error);
            return null;
        }
    }

    setCachedData(data) {
        try {
            const cacheData = {
                timestamp: Date.now(),
                data: data
            };
            localStorage.setItem(this.config.data.cacheKey, JSON.stringify(cacheData));
        } catch (error) {
            console.warn('⚠️ Cache write error:', error);
        }
    }

    clearCachedData() {
        try {
            localStorage.removeItem(this.config.data.cacheKey);
            console.log('🗑️ Gallery cache cleared');
        } catch (error) {
            console.warn('⚠️ Cache clear error:', error);
        }
    }
}

// Global functions for HTML onclick events
function selectAll() {
    if (window.gallery && typeof window.gallery.toggleSelectAllVisible === 'function') {
        window.gallery.toggleSelectAllVisible();
    } else {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.classList.toggle('selected');
        });
    }
}

function downloadImage(filePath, filename) {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filename;
    link.click();
}

async function previousPage() {
    if (window.gallery && window.gallery.currentPage > 1) {
        window.gallery.currentPage--;
        await window.gallery.renderGallery();
        window.gallery.updatePagination();
    }
}

async function nextPage() {
    if (window.gallery) {
        const totalPages = Math.ceil(window.gallery.filteredFiles.length / window.gallery.itemsPerPage);
        if (window.gallery.currentPage < totalPages) {
            window.gallery.currentPage++;
            await window.gallery.renderGallery();
            window.gallery.updatePagination();
        }
    }
}

// Compatibility function for static hosting
// Returns data if present, otherwise undefined so the loader can fall back
window.getGalleryMediaData = function() {
    try {
        const data = window.GALLERY_MEDIA_DATA;
        // If not defined or malformed, return undefined to trigger fallback
        if (!data || !Array.isArray(data.media_files)) {
            return Promise.resolve(undefined);
        }
        return Promise.resolve(data);
    } catch (_) {
        return Promise.resolve(undefined);
    }
};


console.log('📜 Gallery.js loaded successfully');
