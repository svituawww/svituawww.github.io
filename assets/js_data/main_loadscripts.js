async function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    // optional: s.defer = true; // order is controlled by awaiting, not defer
    document.head.appendChild(s);
  });
  
}

//"./assets/js_data/index_content_data.js",

(async function loadAppScripts() {
   const scripts = [

    "./assets/js/menu.js",
    "./assets/js/mobile_menu_functions.js",
    "./assets/js/qrcode_index.js",

    "./assets/js_data/glob_var.js",
    "./assets/js_data/db_conn1.js",
    "./assets/js_data/content_loading.js",
    "./assets/js_data/highl.js"    

  ];

  for (const src of scripts) {
    await loadScript(src);
  }
  // MainFunc is now available for onload in HTML
})();
