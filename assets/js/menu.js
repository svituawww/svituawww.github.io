// Menu Configuration JSON
const menuConfig = {
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
                "Волонтерство і громадська активність": {
                    "enabled": true,
                    "url": "#volunteering",
                    "mobile_enabled": true
                },
                "Підтримка і інтеграція мігрантів": {
                    "enabled": true,
                    "url": "#migration",
                    "mobile_enabled": true
                }
            }
        },
        "Наші проекти": {
            "enabled": true,
            "url": "#projects",
            "mobile_enabled": true,
            "submenu": {
                "Поточні проекти": {
                    "enabled": true,
                    "url": "#current-projects",
                    "mobile_enabled": true
                },
                "Завершені проекти": {
                    "enabled": true,
                    "url": "#completed-projects",
                    "mobile_enabled": true
                },
                "Плани на майбутнє": {
                    "enabled": true,
                    "url": "#future-plans",
                    "mobile_enabled": true
                }
            }
        },
        "Події/Новини": {
            "enabled": true,
            "url": "#events",
            "mobile_enabled": true,
            "submenu": {
                "Останні події/новини": {
                    "enabled": true,
                    "url": "#latest-events",
                    "mobile_enabled": true
                },
                "Архів новин": {
                    "enabled": true,
                    "url": "#news-archive",
                    "mobile_enabled": true
                }
            }
        },
        "Співпраця": {
            "enabled": true,
            "url": "#collaboration",
            "mobile_enabled": true,
            "submenu": {
                "Партнери": {
                    "enabled": true,
                    "url": "#partners",
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
        "Про нас": {
            "enabled": true,
            "url": "#about",
            "mobile_enabled": true,
            "submenu": {
                "Наша місія": {
                    "enabled": true,
                    "url": "#mission",
                    "mobile_enabled": true
                },
                "Команда": {
                    "enabled": true,
                    "url": "team.html",
                    "mobile_enabled": true
                },
                "Історія": {
                    "enabled": true,
                    "url": "#history",
                    "mobile_enabled": true
                }
            }
        },
        "FAQ": {
            "enabled": true,
            "url": "#faq",
            "mobile_enabled": true
        },
        "Контакти": {
            "enabled": true,
            "url": "#contacts",
            "mobile_enabled": true,
            "submenu": {
                "Зв'язатися з нами": {
                    "enabled": true,
                    "url": "#contact-us",
                    "mobile_enabled": true
                },
                "Стати волонтером": {
                    "enabled": true,
                    "url": "#become-volunteer",
                    "mobile_enabled": true
                },
                "Стати членом організації": {
                    "enabled": true,
                    "url": "#become-member",
                    "mobile_enabled": true
                }
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
                "Задати питання": {
                    "enabled": true,
                    "url": "question.html",
                    "mobile_enabled": true
                },
                "Стати волонтером": {
                    "enabled": true,
                    "url": "#volunteer-form",
                    "mobile_enabled": true
                },
                "Приєднатися": {
                    "enabled": true,
                    "url": "#join-us",
                    "mobile_enabled": true
                }
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
function generateMenuHTML(config = compactMenuConfig) {
    let desktopMenu = '';
    let mobileMenu = '';
    
    Object.entries(config.menu_structure).forEach(([key, item]) => {
        // Only generate menu items that are enabled
        if (item.enabled) {
            // Desktop menu item
            if (item.submenu) {
                // Check if there are any enabled submenu items
                const enabledSubItems = Object.entries(item.submenu).filter(([subKey, subItem]) => subItem.enabled);
                
                if (enabledSubItems.length > 0) {
                    desktopMenu += `
                        <li class="has-dropdown">
                            <a href="${item.url}">${key}</a>
                            <div class="nav-dropdown">
                    `;
                    enabledSubItems.forEach(([subKey, subItem]) => {
                        desktopMenu += `<a href="${subItem.url}">${subKey}</a>`;
                    });
                    desktopMenu += `
                            </div>
                        </li>
                    `;
                } else {
                    // If no submenu items are enabled, show as regular link
                    desktopMenu += `<li><a href="${item.url}">${key}</a></li>`;
                }
            } else {
                desktopMenu += `<li><a href="${item.url}">${key}</a></li>`;
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
                                <a href="${item.url}" onclick="toggleMobileDropdown(this)">${key}</a>
                                <div class="mobile-dropdown">
                        `;
                        enabledMobileSubItems.forEach(([subKey, subItem]) => {
                            mobileMenu += `<a href="${subItem.url}" onclick="closeMobileMenu()">${subKey}</a>`;
                        });
                        mobileMenu += `
                                </div>
                            </li>
                        `;
                    } else {
                        // If no mobile submenu items are enabled, show as regular link
                        mobileMenu += `<li><a href="${item.url}" onclick="closeMobileMenu()">${key}</a></li>`;
                    }
                } else {
                    mobileMenu += `<li><a href="${item.url}" onclick="closeMobileMenu()">${key}</a></li>`;
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
