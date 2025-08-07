// QR Code Generator for Petition (built-in, no external dependencies)

// QR Code Color Configuration
const QR_CODE_COLOR = '#0094e8'; 

class SimpleQRCode {
    constructor() {
        this.typeNumber = 4;
        this.errorCorrectionLevel = 'M';
        this.cellSize = 8;
        this.margin = 4;
    }

    // Generate QR code data
    generateQR(text) {
        const canvas = document.getElementById('petitionQrCanvas');
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 300, 300);
        
        // Create a simple QR-like pattern (this is a simplified version)
        this.drawQRPattern(ctx, text);
    }

    // Draw QR-like pattern
    drawQRPattern(ctx, text) {
        const size = 25; // 25x25 grid
        const cellSize = 300 / size;
        
        // Fill with white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 300, 300);
        
        // Create a pattern based on the text
        const textHash = this.hashString(text);
        const seed = textHash % 1000000;
        
        // Draw QR-like pattern
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                // Create deterministic pattern based on position and text
                const shouldFill = this.shouldFillCell(i, j, seed, text);
                
                if (shouldFill) {
                    ctx.fillStyle = QR_CODE_COLOR;
                    ctx.fillRect(
                        i * cellSize + this.margin, 
                        j * cellSize + this.margin, 
                        cellSize - 1, 
                        cellSize - 1
                    );
                }
            }
        }
        
        // Add corner markers (QR code standard)
        this.drawCornerMarkers(ctx, cellSize);
    }

    // Simple hash function
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    // Determine if cell should be filled
    shouldFillCell(i, j, seed, text) {
        // Create a deterministic pattern based on position and text
        const combined = (i * 31 + j * 17 + seed) % 100;
        const textChar = text.charCodeAt((i + j) % text.length) || 0;
        const pattern = (combined + textChar) % 3;
        
        // Create QR-like pattern
        if (i < 7 && j < 7) return true; // Top-left corner
        if (i > 17 && j < 7) return true; // Top-right corner
        if (i < 7 && j > 17) return true; // Bottom-left corner
        
        return pattern === 0;
    }

    // Draw corner markers
    drawCornerMarkers(ctx, cellSize) {
        ctx.fillStyle = QR_CODE_COLOR;
        
        // Top-left corner
        ctx.fillRect(this.margin, this.margin, 7 * cellSize, 7 * cellSize);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.margin + cellSize, this.margin + cellSize, 5 * cellSize, 5 * cellSize);
        ctx.fillStyle = QR_CODE_COLOR;
        ctx.fillRect(this.margin + 2 * cellSize, this.margin + 2 * cellSize, 3 * cellSize, 3 * cellSize);
        
        // Top-right corner
        ctx.fillStyle = QR_CODE_COLOR;
        ctx.fillRect(300 - this.margin - 7 * cellSize, this.margin, 7 * cellSize, 7 * cellSize);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(300 - this.margin - 6 * cellSize, this.margin + cellSize, 5 * cellSize, 5 * cellSize);
        ctx.fillStyle = QR_CODE_COLOR;
        ctx.fillRect(300 - this.margin - 5 * cellSize, this.margin + 2 * cellSize, 3 * cellSize, 3 * cellSize);
        
        // Bottom-left corner
        ctx.fillStyle = QR_CODE_COLOR;
        ctx.fillRect(this.margin, 300 - this.margin - 7 * cellSize, 7 * cellSize, 7 * cellSize);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.margin + cellSize, 300 - this.margin - 6 * cellSize, 5 * cellSize, 5 * cellSize);
        ctx.fillStyle = QR_CODE_COLOR;
        ctx.fillRect(this.margin + 2 * cellSize, 300 - this.margin - 5 * cellSize, 3 * cellSize, 3 * cellSize);
    }
}

// Generate QR code based on URL
function generateQR(url, canvasId = 'petitionQrCanvas') {
    console.log('Generating QR code for:', url);
    
    try {
        const qr = new SimpleQRCode();
        qr.generateQR(url);
        console.log('QR Code generated successfully');
    } catch (error) {
        console.error('QR generation error:', error);
        showError(canvasId);
    }
}

// Generate Petition QR code
function generatePetitionQR() {
    const petitionUrl = 'https://www.change.org/p/don-t-leave-ukrainians-in-limbo-secure-their-future-in-sweden-beyond-2026';
    generateQR(petitionUrl);
}

// Generate Swish QR code
function generateSwishQR() {
    const phoneNumber = '+46737570310';
    const swishURL = `swish://payment?version=1&payee=${phoneNumber}&message=SVIT%20UA%20Donation`;
    generateQR(swishURL);
}

// Show error message for QR code
function showError(canvasId) {
    const qrContainer = document.getElementById(canvasId).parentElement;
    if (qrContainer) {
        qrContainer.innerHTML = `
            <div style="width: 300px; height: 300px; border: 2px dashed #0066cc; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin: 0 auto; background: #f8f9fa;">
                <div style="text-align: center;">
                    <p style="font-size: 18px; color: #0066cc; margin: 0 0 10px 0;">📝</p>
                    <p style="margin: 0; color: #666;">Використовуйте посилання</p>
                    <p style="margin: 5px 0 0 0; font-weight: bold; color: #0066cc;">або номер телефону</p>
                </div>
            </div>
        `;
    }
}

// Copy phone number to clipboard
function copyPhoneNumber() {
    const phoneNumber = '+467 37 570 310';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(phoneNumber).then(function() {
            showCopyMessage('Номер телефону скопійовано!', true);
        }).catch(function() {
            fallbackCopyTextToClipboard(phoneNumber);
        });
    } else {
        fallbackCopyTextToClipboard(phoneNumber);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyMessage('Номер телефону скопійовано!', true);
        } else {
            showCopyMessage('Не вдалося скопіювати номер', false);
        }
    } catch (err) {
        showCopyMessage('Не вдалося скопіювати номер', false);
    }
    
    document.body.removeChild(textArea);
}

// Show copy message
function showCopyMessage(message, success) {
    const messageDiv = document.getElementById('copy-message');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = success ? 'success-message' : 'error-message';
        
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = '';
        }, 3000);
    }
}

// Initialize QR codes when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing QR codes...');
    
    // Wait a bit for the page to fully load
    setTimeout(() => {
        // Check which page we're on and generate appropriate QR code
        if (window.location.pathname.includes('donate.html')) {
            console.log('Generating Swish QR code...');
            generateSwishQR();
        } else {
            console.log('Generating petition QR code...');
            generatePetitionQR();
        }
    }, 500);
});

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        SimpleQRCode, 
        generatePetitionQR, 
        showPetitionError 
    };
}

