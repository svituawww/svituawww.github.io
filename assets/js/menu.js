// Compact Menu Configuration for Variant 2
const compactMenuConfig_old = {
    "menu_structure": {
        "Головна": {
            "enabled": true,
            "url": "index.html",
            "mobile_enabled": true
        },
        "Допомога": {
            "enabled": true,
            "url": "#help",
            "mobile_enabled": true,
            "submenu": {
                "Гуманітарна допомога": {
                    "enabled": true,
                    "url": "#humanitarian",
                    "mobile_enabled": true
                },
                "Волонтерство": {
                    "enabled": true,
                    "url": "#volunteering",
                    "mobile_enabled": true
                },
                "Інтеграція мігрантів": {
                    "enabled": true,
                    "url": "#migration",
                    "mobile_enabled": true
                }
            }
        },
        "Проекти": {
            "enabled": true,
            "url": "#projects",
            "mobile_enabled": true,
            "submenu": {
                "Поточні": {
                    "enabled": true,
                    "url": "#current",
                    "mobile_enabled": true
                },
                "Завершені": {
                    "enabled": true,
                    "url": "#completed",
                    "mobile_enabled": true
                },
                "Майбутні": {
                    "enabled": true,
                    "url": "#future",
                    "mobile_enabled": true
                }
            }
        },
        "Новини": {
            "enabled": true,
            "url": "#news",
            "mobile_enabled": true,
            "submenu": {
                "Останні": {
                    "enabled": true,
                    "url": "#latest",
                    "mobile_enabled": true
                },
                "Архів": {
                    "enabled": true,
                    "url": "#archive",
                    "mobile_enabled": true
                }
            }
        },
        "Галерея": {
            "enabled": true,
            "url": "gallery.html",
            "mobile_enabled": true
        },
        "Партнери": {
            "enabled": true,
            "url": "#partners",
            "mobile_enabled": true,
            "submenu": {
                "Організації": {
                    "enabled": true,
                    "url": "#organizations",
                    "mobile_enabled": true
                },
                "Донатори": {
                    "enabled": false,
                    "url": "#donors",
                    "mobile_enabled": false
                },
                "Волонтери": {
                    "enabled": false,
                    "url": "#volunteers",
                    "mobile_enabled": false
                }
            }
        },
        "Команда": {
            "enabled": true,
            "url": "team.html",
            "mobile_enabled": true
        },
        "FAQ": {
            "enabled": false,
            "url": "#faq",
            "mobile_enabled": false
        },
        "Контакти": {
            "enabled": true,
            "url": "#contact",
            "mobile_enabled": true,
            "submenu": {
                "Контакти": {
                    "enabled": true,
                    "url": "index.html#contact",
                    "mobile_enabled": true
                },
                "Задати питання": {
                    "enabled": true,
                    "url": "question.html?form=question",
                    "mobile_enabled": true
                },
                "Партнерський запит": {
                    "enabled": true,
                    "url": "question.html?form=partnerrequest",
                    "mobile_enabled": true
                },
                "Стати волонтером": {
                    "enabled": true,
                    "url": "question.html?form=becomevolunteer",
                    "mobile_enabled": true
                },
                "Стати членом організації": {
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

// Compact Menu Configuration for Variant 2
const compactMenuConfig = {
    "menu_structure": {
        "Головна": {
            "enabled": true,
            "url": "index.html",
            "mobile_enabled": true
        },
 
        "Галерея / Події": {
            "enabled": true,
            "url": "gallery.html",
            "mobile_enabled": true
        },
        "Команда": {
            "enabled": true,
            "url": "team.html",
            "mobile_enabled": true
        },
        "FAQ": {
            "enabled": false,
            "url": "#faq",
            "mobile_enabled": false
        },
        "Контакти": {
            "enabled": true,
            "url": "#contact",
            "mobile_enabled": true,
            "submenu": {
                "Контакти": {
                    "enabled": true,
                    "url": "index.html#contact",
                    "mobile_enabled": true
                },
                "Задати питання": {
                    "enabled": true,
                    "url": "question.html?form=question",
                    "mobile_enabled": true
                },
                "Партнерський запит": {
                    "enabled": true,
                    "url": "question.html?form=partnerrequest",
                    "mobile_enabled": true
                },
                "Стати волонтером": {
                    "enabled": true,
                    "url": "question.html?form=becomevolunteer",
                    "mobile_enabled": true
                },
                "Стати членом організації": {
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

function generateMenuHTML(config = compactMenuConfig) {
    let desktopMenu = '';
    let mobileMenu = '';
    
    Object.entries(config.menu_structure).forEach(([key, item]) => {
        // Only generate menu items that are enabled
        if (item.enabled) {
            const itemHref = normalizeUrl(item.url);
            // Desktop menu item
            if (item.submenu) {
                // Check if there are any enabled submenu items
                const enabledSubItems = Object.entries(item.submenu).filter(([subKey, subItem]) => subItem.enabled);
                
                if (enabledSubItems.length > 0) {
                    desktopMenu += `
                        <li class="has-dropdown">
                            <a href="${itemHref}">${key}</a>
                            <div class="nav-dropdown">
                    `;
                    enabledSubItems.forEach(([subKey, subItem]) => {
                        const subHref = normalizeUrl(subItem.url);
                        desktopMenu += `<a href="${subHref}">${subKey}</a>`;
                    });
                    desktopMenu += `
                            </div>
                        </li>
                    `;
                } else {
                    // If no submenu items are enabled, show as regular link
                    desktopMenu += `<li><a href="${itemHref}">${key}</a></li>`;
                }
            } else {
                desktopMenu += `<li><a href="${itemHref}">${key}</a></li>`;
            }
            
            // Mobile menu item
            if (item.mobile_enabled) {
                if (item.submenu) {
                    // Check if there are any enabled mobile submenu items
                    const enabledMobileSubItems = Object.entries(item.submenu).filter(([subKey, subItem]) => 
                        subItem.enabled && subItem.mobile_enabled
                    );
                    
                    if (enabledMobileSubItems.length > 0) {
                        mobileMenu += `
                            <li class="has-dropdown">
                                <a href="${itemHref}" onclick="toggleMobileDropdown(this)">${key}</a>
                                <div class="mobile-dropdown">
                        `;
                        enabledMobileSubItems.forEach(([subKey, subItem]) => {
                            const subHref = normalizeUrl(subItem.url);
                            mobileMenu += `<a href="${subHref}" onclick="closeMobileMenu()">${subKey}</a>`;
                        });
                        mobileMenu += `
                                </div>
                            </li>
                        `;
                    } else {
                        // If no mobile submenu items are enabled, show as regular link
                        mobileMenu += `<li><a href="${itemHref}" onclick="closeMobileMenu()">${key}</a></li>`;
                    }
                } else {
                    mobileMenu += `<li><a href="${itemHref}" onclick="closeMobileMenu()">${key}</a></li>`;
                }
            }
        }
    });
    
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
    // Check if we're on a page that uses compact menu (variant 2)
    const isCompactMenu = document.querySelector('body').classList.contains('compact-menu') || 
                         window.location.pathname.includes('index_v2');
    
    if (isCompactMenu) {
        updateCompactMenuVisibility();
    } else {
        updateMenuVisibility();
    }
    
    // Apply any configuration changes immediately
    refreshMenu();
});

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
