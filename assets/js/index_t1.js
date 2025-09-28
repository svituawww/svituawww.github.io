// Domain configuration constant for easy maintenance
//const DOMAIN_SITE = "svitua.se";
const DOMAIN_SITE = "svituawww.github.io";

// Global settings with enhanced structure
let GL_Settings = {
    language: "uk",           // Default language
    domain: DOMAIN_SITE,      // Current domain
    isDetected: false         // Detection status flag
};

// Comprehensive Content Data Structure
const contentData = {
    content_uk: "Привіт світ! Ласкаво просимо до SVIT Ukraine.",
    content_en: "Hello world! Welcome to SVIT Ukraine.",
    content_sv: "Hej världen! Välkommen till SVIT Ukraine."
};

// Language metadata for enhanced functionality
const languageConfig = {
    uk: { name: "Українська", code: "uk", isDefault: true },
    en: { name: "English", code: "en", isDefault: false },
    sv: { name: "Svenska", code: "sv", isDefault: false }
};

// Phase 1: Robust Language Detection
function detectLanguageFromURL() {
    try {
        const pathname = window.location.pathname;
        console.log(`Analyzing URL pathname: ${pathname}`);
        
        // Enhanced regex for language detection
        const languageMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
        
        if (languageMatch) {
            const detectedLanguage = languageMatch[1];
            
            // Validate against supported languages with config check
            if (languageConfig[detectedLanguage]) {
                GL_Settings.isDetected = true;
                console.log(`Language detected from URL: ${detectedLanguage}`);
                return detectedLanguage;
            }
        }
        
        // Enhanced fallback logic
        console.log("No valid language found in URL, using default");
        GL_Settings.isDetected = false;
        return languageConfig.uk.code;
        
    } catch (error) {
        console.error("Error in language detection:", error);
        return languageConfig.uk.code;
    }
}

// Phase 2: Advanced Content Rendering
function renderContentByLanguage() {
    try {
        const currentLanguage = GL_Settings.language;
        const contentKey = `content_${currentLanguage}`;
        
        // Validate content exists
        if (!contentData[contentKey]) {
            console.warn(`Content not found for language: ${currentLanguage}`);
            return;
        }
        
        // Get localized content
        const localizedContent = contentData[contentKey];
        
        // Enhanced DOM updates with multiple selectors
        const selectors = ['h1', '[data-lang-content]', '.lang-content'];
        
        for (const selector of selectors) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element && localizedContent) {
                    element.textContent = localizedContent;
                    element.setAttribute('lang', currentLanguage);
                }
            });
        }
        
        // Update document language
        document.documentElement.lang = currentLanguage;
        
        // Update info spans
        const domainInfo = document.getElementById('domain-info');
        const langInfo = document.getElementById('lang-info');
        
        if (domainInfo) {
            domainInfo.textContent = GL_Settings.domain;
        }
        
        if (langInfo) {
            langInfo.textContent = `${currentLanguage} (${languageConfig[currentLanguage].name})`;
        }
        
        console.log(`Content rendered for language: ${currentLanguage}`);
        
    } catch (error) {
        console.error("Error in content rendering:", error);
    }
}

// Phase 3: Complete Initialization System
document.addEventListener('DOMContentLoaded', function() {
    console.log(`Initializing language system for domain: ${DOMAIN_SITE}`);
    
    try {
        // Step 1: Detect and validate language
        const detectedLang = detectLanguageFromURL();
        GL_Settings.language = detectedLang;
        
        // Step 2: Render content with error handling
        renderContentByLanguage();
        
        // Step 3: Enhanced debugging information
        console.log(`Language System Status:`, {
            detected: GL_Settings.language,
            isFromURL: GL_Settings.isDetected,
            domain: GL_Settings.domain,
            pathname: window.location.pathname
        });
        
        // Step 4: Dispatch custom event for other components
        const langEvent = new CustomEvent('languageDetected', {
            detail: { language: GL_Settings.language }
        });
        document.dispatchEvent(langEvent);
        
    } catch (error) {
        console.error("Critical error in language system initialization:", error);
    }
});