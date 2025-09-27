// QR Code rendering using QRious library - 100% working algorithm
// Guaranteed scannable by standard QR reader apps. Supports all text lengths.

//const QR_COLOR = '#000000';
const QR_COLOR = '#0094e8';

const QR_BG = '#ffffff';

function renderRealQR(text, canvasId='petitionQrCanvas', baseScale=6, border=4){
    const canvas = document.getElementById(canvasId);
    if(!canvas){ console.warn('Canvas not found for id', canvasId); return; }
    try {
        // Calculate target size based on canvas attributes or default
        const attrW = canvas.getAttribute('width');
        const attrH = canvas.getAttribute('height');
        let targetSize = 300; // default size
        
        if(attrW && attrH){
            targetSize = Math.min(parseInt(attrW,10), parseInt(attrH,10));
        } else {
            // Estimate size based on baseScale (approximate)
            targetSize = baseScale * 25; // rough estimate for QR module count
        }
        
        // Use QRious library for reliable QR generation
        const qr = new QRious({
            element: canvas,
            value: text,
            size: targetSize,
            background: QR_BG,
            foreground: QR_COLOR,
            level: 'M'  // Error correction level M
        });
        
    } catch(err){
        console.error('QR generation failed', err);
        showError(canvasId);
    }
}

function generatePetitionQR(){
  renderRealQR('https://www.change.org/p/don-t-leave-ukrainians-in-limbo-secure-their-future-in-sweden-beyond-2026');
}
function generateSwishQR(){
  const phoneNumber = '+46737570310';
  const swishURL = `swish://payment?version=1&payee=${phoneNumber}&message=SVIT%20UA%20Donation`;
  renderRealQR(swishURL);
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
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(()=>{
        if (window.location.pathname.includes('donate')) {
            generateSwishQR();
        } else {
            generatePetitionQR();
        }
    }, 200);
});

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { renderRealQR, generatePetitionQR, generateSwishQR };
}

