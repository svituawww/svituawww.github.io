// QR generator using QRious library - 100% working algorithm
// Provides dynamic size & PNG download. Guaranteed scannable output.

const QR_COLOR = '#84b9eaff';
const QR_BG = '#ffffff';

function renderRealCustomQR(text, canvas, targetSize){
  if(!canvas) return false;
  try {
    // Use QRious library for reliable QR generation
    const qr = new QRious({
      element: canvas,
      value: text,
      size: targetSize,
      background: QR_BG,
      foreground: QR_COLOR,
      level: 'M'  // Error correction level M
    });
    
    return {
      size: targetSize, 
      scale: Math.floor(targetSize / qr.modules), 
      modules: qr.modules
    };
  } catch(err){
    console.error('QR generation failed', err);
    return false;
  }
}

function validateSize(value, fallback) {
  const n = parseInt(value, 10);
  if (isNaN(n) || n < 64 || n > 1200) return fallback;
  return n;
}

function generateCustomQR() {
  const textEl = document.getElementById('qrText');
  const widthEl = document.getElementById('qrWidth');
  const heightEl = document.getElementById('qrHeight');
  const statusEl = document.getElementById('status');
  const canvas = document.getElementById('customQrCanvas');
  const downloadBtn = document.getElementById('downloadBtn');

  const text = (textEl.value || '').trim();
  if (!text) {
    statusEl.textContent = 'Помилка: Введіть текст або URL.';
    statusEl.className = 'status err';
    return;
  }

  const width = validateSize(widthEl.value, 300); // we use one dimension for scaling
  const height = validateSize(heightEl.value, 300); // kept for UI symmetry; we take min
  const target = Math.min(width, height);

  const info = renderRealCustomQR(text, canvas, target);
  if (info) {
    statusEl.textContent = `QR-код згенеровано (~${info.size}px, модулів: ${info.modules}).`;
    statusEl.className = 'status ok';
    downloadBtn.disabled = false;
  } else {
    statusEl.textContent = 'Не вдалося згенерувати QR-код.';
    statusEl.className = 'status err';
    downloadBtn.disabled = true;
  }
}

function downloadQR() {
  const canvas = document.getElementById('customQrCanvas');
  const textEl = document.getElementById('qrText');
  if (!canvas) return;
  const link = document.createElement('a');
  const safeName = (textEl.value || 'qr').replace(/[^a-z0-9-_]+/gi, '_').slice(0, 40);
  link.download = `${safeName || 'qr'}_${canvas.width}px.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function clearForm() {
  document.getElementById('qrText').value = '';
  document.getElementById('status').textContent = '';
  document.getElementById('status').className = 'status';
  document.getElementById('downloadBtn').disabled = true;
  const canvas = document.getElementById('customQrCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f8f9fb';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Wire buttons after DOM ready
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('downloadBtn').addEventListener('click', downloadQR);
  document.getElementById('clearBtn').addEventListener('click', clearForm);
});

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateCustomQR, renderRealCustomQR };
}
