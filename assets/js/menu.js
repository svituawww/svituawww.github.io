// Compact Menu Configuration for Variant 2
// const compactMenuConfig_old = {
//     "menu_structure": {
//         "Головна": {
//             "enabled": true,
//             "url": "index.html",
//             "mobile_enabled": true
//         },
//         "Допомога": {
//             "enabled": true,
//             "url": "#help",
//             "mobile_enabled": true,
//             "submenu": {
//                 "Гуманітарна допомога": {
//                     "enabled": true,
//                     "url": "#humanitarian",
//                     "mobile_enabled": true
//                 },
//                 "Волонтерство": {
//                     "enabled": true,
//                     "url": "#volunteering",
//                     "mobile_enabled": true
//                 },
//                 "Інтеграція мігрантів": {
//                     "enabled": true,
//                     "url": "#migration",
//                     "mobile_enabled": true
//                 }
//             }
//         },
//         "Проекти": {
//             "enabled": true,
//             "url": "#projects",
//             "mobile_enabled": true,
//             "submenu": {
//                 "Поточні": {
//                     "enabled": true,
//                     "url": "#current",
//                     "mobile_enabled": true
//                 },
//                 "Завершені": {
//                     "enabled": true,
//                     "url": "#completed",
//                     "mobile_enabled": true
//                 },
//                 "Майбутні": {
//                     "enabled": true,
//                     "url": "#future",
//                     "mobile_enabled": true
//                 }
//             }
//         },
//         "Новини": {
//             "enabled": true,
//             "url": "#news",
//             "mobile_enabled": true,
//             "submenu": {
//                 "Останні": {
//                     "enabled": true,
//                     "url": "#latest",
//                     "mobile_enabled": true
//                 },
//                 "Архів": {
//                     "enabled": true,
//                     "url": "#archive",
//                     "mobile_enabled": true
//                 }
//             }
//         },
//         "Галерея": {
//             "enabled": true,
//             "url": "gallery.html",
//             "mobile_enabled": true
//         },
//         "Партнери": {
//             "enabled": true,
//             "url": "#partners",
//             "mobile_enabled": true,
//             "submenu": {
//                 "Організації": {
//                     "enabled": true,
//                     "url": "#organizations",
//                     "mobile_enabled": true
//                 },
//                 "Донатори": {
//                     "enabled": false,
//                     "url": "#donors",
//                     "mobile_enabled": false
//                 },
//                 "Волонтери": {
//                     "enabled": false,
//                     "url": "#volunteers",
//                     "mobile_enabled": false
//                 }
//             }
//         },
//         "Команда": {
//             "enabled": true,
//             "url": "team.html",
//             "mobile_enabled": true
//         },
//         "FAQ": {
//             "enabled": false,
//             "url": "#faq",
//             "mobile_enabled": false
//         },
//         "Контакти": {
//             "enabled": true,
//             "url": "#contact",
//             "mobile_enabled": true,
//             "submenu": {
//                 "Контакти": {
//                     "enabled": true,
//                     "url": "index.html#contact",
//                     "mobile_enabled": true
//                 },
//                 "Задати питання": {
//                     "enabled": true,
//                     "url": "question.html?form=question",
//                     "mobile_enabled": true
//                 },
//                 "Партнерський запит": {
//                     "enabled": true,
//                     "url": "question.html?form=partnerrequest",
//                     "mobile_enabled": true
//                 },
//                 "Стати волонтером": {
//                     "enabled": true,
//                     "url": "question.html?form=becomevolunteer",
//                     "mobile_enabled": true
//                 },
//                 "Стати членом організації": {
//                     "enabled": true,
//                     "url": "question.html?form=becomemember",
//                     "mobile_enabled": true
//                 },

//             }
//         }
//     },
//     "mobile_settings": {
//         "dropdown_animation": true,
//         "overlay_enabled": true,
//         "close_on_click_outside": true,
//         "auto_close_on_resize": true
//     },
//     "desktop_settings": {
//         "hover_dropdown": true,
//         "dropdown_animation": true,
//         "sticky_header": false
//     }
// };

// Compact Menu Configuration for Variant 2
const compactMenuConfig = {
    "menu_structure": {
        "Item1": {
            "name_en": "Main",
            "name_sv": "Huvud",
            "name_uk": "Головна",
            "enabled": true,
            "url": "index.html",
            "mobile_enabled": true
        },
        "Item2": {
            "name_en": "Gallery / Events",
            "name_sv": "Galleri / Evenemang",
            "name_uk": "Галерея / Події",
            "enabled": true,
            "url": "gallery.html",
            "mobile_enabled": true
        },
        "Item3": {
            "name_en": "Team",
            "name_sv": "Team",
            "name_uk": "Команда",
            "enabled": true,
            "url": "team.html",
            "mobile_enabled": true
        },
        "Item4": {
            "name_en": "FAQ",
            "name_sv": "FAQ",
            "name_uk": "FAQ",
            "enabled": false,
            "url": "#faq",
            "mobile_enabled": false
        },
        "Item5": {
            "name_en": "Contact",
            "name_sv": "Kontakta",
            "name_uk": "Контакти",
            "enabled": true,
            "url": "#contact",
            "mobile_enabled": true,
            "submenu": {
                "Item1": {
                    "name_en": "Contact",
                    "name_sv": "Kontakta",
                    "name_uk": "Контакти",
                    "enabled": true,
                    "url": "index.html#contact",
                    "mobile_enabled": true
                },
                "Item2": {
                    "name_en": "Ask a Question",
                    "name_sv": "Ställa en fråga",
                    "name_uk": "Задати питання",
                    "enabled": true,
                    "url": "question.html?form=question",
                    "mobile_enabled": true
                },
                "Item3": {
                    "name_en": "Partnership Request",
                    "name_sv": "Partnerskapsförfrågan",
                    "name_uk": "Партнерський запит",
                    "enabled": true,
                    "url": "question.html?form=partnerrequest",
                    "mobile_enabled": true
                },
                "Item4": {
                    "name_en": "Become a Volunteer",
                    "name_sv": "Bli volontär",
                    "name_uk": "Стати волонтером",
                    "enabled": true,
                    "url": "question.html?form=becomevolunteer",
                    "mobile_enabled": true
                },
                "Item5": {
                    "name_en": "Become a Member",
                    "name_sv": "Bli medlem",
                    "name_uk": "Стати членом організації",
                    "enabled": true,
                    "url": "question.html?form=becomemember",
                    "mobile_enabled": true
                },

            }
        }
    },
    "mobile_settings": {
        "dropdown_animation": true,
        "overlay_enabled": true,
        "close_on_click_outside": true,
        "auto_close_on_resize": true
    },
    "desktop_settings": {
        "hover_dropdown": true,
        "dropdown_animation": true,
        "sticky_header": false
    }
};

const menuLanguageConfig = {
    "menu_structure": {
        "uk": {
            "name_en": "Ukrainian",
            "name_sv": "Ukrainska",
            "name_uk": "Українська",
            "enabled": true,
            "prefix_url": "uk"
        },
        "sv": {
            "name_en": "Swedish",
            "name_sv": "Svenska",
            "name_uk": "Шведська",
            "enabled": true,
            "prefix_url": "sv"
        },
        "en": {
            "name_en": "English",
            "name_sv": "Engelska",
            "name_uk": "Англійська",
            "enabled": true,
            "prefix_url": "en"
        }
    },
    "settings": {
        "show_flags": false,
        "show_language_names": true
    }
};


// Function to generate menu HTML based on configuration
function normalizeUrl(u) {
    if (!u) return u;
    // keep anchors, absolute and mailto
    if (u.startsWith('#') || u.startsWith('http://') || u.startsWith('https://') || u.startsWith('mailto:')) return u;
    // already absolute
    if (u.startsWith('/')) return u;
    // make root-relative
    return '/' + u;
}

// --- Header Renderer (injects header shell into #header-root) ---
function renderHeaderIntoRoot() {
        const root = document.getElementById('header-root');
        if (!root) return; // not this page

        const logoSrc = '/uploads1/2025/06/logo.png';

        root.innerHTML = `
        <header>
            <nav class="container">
                <div class="logo">
                    <img src="${logoSrc}" alt="SVIT UA Logo">
                    <h1 d_uuid="fowcy61amc">SVIT UA</h1>
                </div>

                <ul class="nav-links"></ul>

                <button class="mobile-menu-toggle" onclick="toggleMobileMenu()" aria-label="Menu" d_uuid="13aasmz1ay">☰</button>

                <div style="display:flex; align-items:center; gap:20px;">
                    <div class="language-switch"></div>
                </div>
            </nav>

            <div class="mobile-menu-overlay" onclick="closeMobileMenu()"></div>
      
            <nav class="mobile-menu">
                <button class="mobile-menu-close" onclick="closeMobileMenu()" aria-label="Close Menu" d_uuid="1owbqn1ofi">✕</button>
                <ul class="mobile-nav-links"></ul>
                <div class="mobile-language-section">
                    <h4 d_uuid="353m501nni">Мова / Language</h4>
                    <div class="mobile-language-switch"></div>
                </div>
            </nav>
        </header>`;
}

// --- Language Switch Renderer ---
function renderLanguageSwitch() {
        const lang = (window.GL_Settings && GL_Settings.language) || 'uk';
        const urlname = (window.GL_Settings && GL_Settings.urlname) || 'index.html';
        const desktopWrap = document.querySelector('.language-switch');
        const mobileWrap = document.querySelector('.mobile-language-switch');
        const links = [
                { code: 'uk', title: 'Українська', emoji: '🇺🇦', href: `/uk/${urlname}`, d_uuid: 'ctsnhy4kmn' },
                { code: 'sv', title: 'Svenska',     emoji: '🇸🇪', href: `/sv/${urlname}`, d_uuid: '2rus946jnh' },
                { code: 'en', title: 'English',     emoji: '🇬🇧', href: `/en/${urlname}`, d_uuid: 'w572t7uwil' }
        ];
        if (desktopWrap) {
                desktopWrap.innerHTML = links.map(l => `<a href="${l.href}" class="lang-btn${l.code===lang?' active':''}" title="${l.title}" d_uuid="${l.d_uuid}">${l.emoji}</a>`).join('');
        }
        if (mobileWrap) {
                mobileWrap.innerHTML = links.map(l => `<a href="${l.href}" class="lang-btn${l.code===lang?' active':''}" title="${l.title}">${l.emoji}</a>`).join('');
        }
}


            // <button class="mobile-menu-toggle" onclick="toggleMobileMenu()" aria-label="Menu" d_uuid="13aasmz1ay">
            //     ☰
            // </button>
            
            // <div style="display: flex; align-items: center; gap: 20px;">
            //     <div class="language-switch">
            //         <a href="#" class="lang-btn active" title="Українська" d_uuid="ctsnhy4kmn">🇺🇦</a>
            //         <a href="/sv/index.html" class="lang-btn" title="Svenska" d_uuid="2rus946jnh">🇸🇪</a>
            //         <a href="/en/index.html" class="lang-btn" title="English" d_uuid="w572t7uwil">🇬🇧</a>
            //     </div>
            // </div>



        // <!-- Mobile Menu Overlay -->
        // <div class="mobile-menu-overlay" onclick="closeMobileMenu()"></div>
        
        // <!-- Mobile Menu -->
        // <nav class="mobile-menu">
        //     <button class="mobile-menu-close" onclick="closeMobileMenu()" aria-label="Close Menu" d_uuid="1owbqn1ofi">
        //         ✕
        //     </button>
            
        //     <ul class="mobile-nav-links">

        //     </ul>

        //     <div class="mobile-language-section">
        //         <h4 d_uuid="353m501nni">Мова / Language</h4>
        //         <div class="mobile-language-switch">
        //             <a href="#" class="lang-btn active" title="Українська" d_uuid="1rmkzyg1ow">🇺🇦</a>
        //             <a href="/sv/index.html" class="lang-btn" title="Svenska" d_uuid="pgfy87ct5f">🇸🇪</a>
        //             <a href="/en/index.html" class="lang-btn" title="English" d_uuid="1360ilc1t9">🇬🇧</a>
        //         </div>
        //     </div>
        // </nav>


function generateLanguageMenuHTML(config = compactMenuConfig) {
    let languageMenu = '';
    const lang = GL_Settings.language || 'uk';
    const prefixUrl = menuLanguageConfig.menu_structure[lang].prefix_url;

    // add button to toggle mobile menu
    languageMenu += `
        <button class="mobile-menu-toggle" onclick="toggleMobileMenu()" aria-label="Menu" d_uuid="13aasmz1ay">
            ☰
        </button>
        <div style="display: flex; align-items: center; gap: 20px;">
            <div class="language-switch">
                <a href="/uk/${GL_Settings.urlname || 'index.html'}" class="lang-btn ${lang === 'uk' ? 'active' : ''}" title="Українська" d_uuid="ctsnhy4kmn">🇺🇦</a>
                <a href="/sv/${GL_Settings.urlname || 'index.html'}" class="lang-btn ${lang === 'sv' ? 'active' : ''}" title="Svenska" d_uuid="2rus946jnh">🇸🇪</a>
                <a href="/en/${GL_Settings.urlname || 'index.html'}" class="lang-btn ${lang === 'en' ? 'active' : ''}" title="English" d_uuid="w572t7uwil">🇬🇧</a>
            </div>
        </div>
    `;

    return languageMenu;
}

function generateMenuHTML(config = compactMenuConfig) {
    const lang = (window.GL_Settings && GL_Settings.language) || 'uk';
    let desktopMenu = '';
    let mobileMenu = '';

    for (const [key, item] of Object.entries(config.menu_structure)) {
        if (!item || !item.enabled) continue;
        const itemHref = normalizeUrl(item.url);
        const displayName = item[`name_${lang}`] || key;

        // Desktop menu item
        if (item.submenu) {
            const enabledSubItems = Object.entries(item.submenu).filter(([, subItem]) => subItem && subItem.enabled);
            if (enabledSubItems.length > 0) {
                desktopMenu += `<li class="has-dropdown"><a href="${itemHref}">${displayName}</a><div class="nav-dropdown">`;
                for (const [subKey, subItem] of enabledSubItems) {
                    const subHref = normalizeUrl(subItem.url);
                    const subDisplayName = subItem[`name_${lang}`] || subKey;
                    desktopMenu += `<a href="${subHref}">${subDisplayName}</a>`;
                }
                desktopMenu += `</div></li>`;
            } else {
                desktopMenu += `<li><a href="${itemHref}">${displayName}</a></li>`;
            }
        } else {
            desktopMenu += `<li><a href="${itemHref}">${displayName}</a></li>`;
        }

        // Mobile menu item
        if (item.submenu) {
            const enabledMobileSubItems = Object.entries(item.submenu).filter(([, subItem]) => subItem && subItem.enabled && subItem.mobile_enabled);
            if (enabledMobileSubItems.length > 0) {
                mobileMenu += `<li class="has-dropdown"><a href="${itemHref}" onclick="toggleMobileDropdown(this)">${displayName}</a><div class="mobile-dropdown">`;
                for (const [subKey, subItem] of enabledMobileSubItems) {
                    const subHref = normalizeUrl(subItem.url);
                    const subDisplayName = subItem[`name_${lang}`] || subKey;
                    mobileMenu += `<a href="${subHref}" onclick="closeMobileMenu()">${subDisplayName}</a>`;
                }
                mobileMenu += `</div></li>`;
            } else {
                mobileMenu += `<li><a href="${itemHref}" onclick="closeMobileMenu()">${displayName}</a></li>`;
            }
        } else {
            mobileMenu += `<li><a href="${itemHref}" onclick="closeMobileMenu()">${displayName}</a></li>`;
        }
    }

    return { desktopMenu, mobileMenu };
}

// Function to generate compact menu HTML (for variant 2)
function generateCompactMenuHTML(config = compactMenuConfig) {
    return generateMenuHTML(config);
}

// Function to update menu visibility
function updateMenuVisibility() {
    const desktopNav = document.querySelector('.nav-links');
    const mobileNav = document.querySelector('.mobile-nav-links');
    
    if (desktopNav && mobileNav) {
        const { desktopMenu, mobileMenu } = generateMenuHTML();
        desktopNav.innerHTML = desktopMenu;
        mobileNav.innerHTML = mobileMenu;
    }
}

// Function to update compact menu visibility (for variant 2)
function updateCompactMenuVisibility() {
    const desktopNav = document.querySelector('.nav-links');
    const mobileNav = document.querySelector('.mobile-nav-links');
    
    if (desktopNav && mobileNav) {
        const { desktopMenu, mobileMenu } = generateCompactMenuHTML();
        desktopNav.innerHTML = desktopMenu;
        mobileNav.innerHTML = mobileMenu;
    }
}

// Function to toggle menu items on/off
function toggleMenuItem(itemName, enabled = true) {
    if (menuConfig.menu_structure[itemName]) {
        menuConfig.menu_structure[itemName].enabled = enabled;
        updateMenuVisibility();
    }
}

// Function to toggle submenu items
function toggleSubMenuItem(parentName, itemName, enabled = true) {
    if (menuConfig.menu_structure[parentName] && 
        menuConfig.menu_structure[parentName].submenu && 
        menuConfig.menu_structure[parentName].submenu[itemName]) {
        menuConfig.menu_structure[parentName].submenu[itemName].enabled = enabled;
        updateMenuVisibility();
    }
}

// Function to toggle compact menu items on/off
function toggleCompactMenuItem(itemName, enabled = true) {
    if (compactMenuConfig.menu_structure[itemName]) {
        compactMenuConfig.menu_structure[itemName].enabled = enabled;
        updateCompactMenuVisibility();
    }
}

// Function to toggle compact submenu items
function toggleCompactSubMenuItem(parentName, itemName, enabled = true) {
    if (compactMenuConfig.menu_structure[parentName] && 
        compactMenuConfig.menu_structure[parentName].submenu && 
        compactMenuConfig.menu_structure[parentName].submenu[itemName]) {
        compactMenuConfig.menu_structure[parentName].submenu[itemName].enabled = enabled;
        updateCompactMenuVisibility();
    }
}

// Function to refresh menu after configuration changes
function refreshMenu() {
    // Check if we're on a page that uses compact menu (variant 2)
    const isCompactMenu = document.querySelector('body').classList.contains('compact-menu') || 
                         window.location.pathname.includes('index_v2');
    
    if (isCompactMenu) {
        updateCompactMenuVisibility();
    } else {
        updateMenuVisibility();
    }
}

// Initialize menu when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Inject header shell if placeholder exists
    try { renderHeaderIntoRoot(); } catch {}

    // Check if we're on a page that uses compact menu (variant 2)
    const isCompactMenu = document.querySelector('body').classList.contains('compact-menu') || 
                         window.location.pathname.includes('index_v2');
    
    if (isCompactMenu) {
        updateCompactMenuVisibility();
    } else {
        updateMenuVisibility();
    }
    // Render language switch into header
    try { renderLanguageSwitch(); } catch {}
    
    // Apply any configuration changes immediately
    refreshMenu();
});

// Fallback: ensure header is rendered even if other scripts race
function ensureHeaderRendered() {
    const root = document.getElementById('header-root');
    if (!root) return;
    if (!root.firstElementChild) {
        try { renderHeaderIntoRoot(); } catch {}
        try { updateMenuVisibility(); } catch {}
        try { renderLanguageSwitch(); } catch {}
    }
}

// Try immediately if DOM is already parsed
if (document.readyState !== 'loading') {
    ensureHeaderRendered();
}
// Try shortly after in case of late data
setTimeout(ensureHeaderRendered, 0);
window.addEventListener('load', ensureHeaderRendered, { once: true });

// Function to apply configuration changes and refresh menu
function applyMenuConfiguration() {
    refreshMenu();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        menuConfig, 
        compactMenuConfig,
        generateMenuHTML, 
        generateCompactMenuHTML,
        updateMenuVisibility, 
        updateCompactMenuVisibility,
        toggleMenuItem, 
        toggleSubMenuItem,
        toggleCompactMenuItem,
        toggleCompactSubMenuItem,
        refreshMenu,
        applyMenuConfiguration
    };
}
