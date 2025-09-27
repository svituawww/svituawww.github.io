// Mobile Menu Functions for SVIT UA
// This file contains all mobile menu functionality

// Mobile Menu Functions
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (mobileMenu) mobileMenu.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
    
    // Close all dropdowns when closing menu
    const dropdowns = document.querySelectorAll('.mobile-dropdown.active');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        dropdown.parentElement.classList.remove('active');
    });
}

function toggleMobileDropdown(element) {
    const dropdown = element?.nextElementSibling;
    const parent = element?.parentElement;
    
    // Close other dropdowns
    const allDropdowns = document.querySelectorAll('.mobile-dropdown.active');
    allDropdowns.forEach(dd => {
        if (dd !== dropdown) {
            dd.classList.remove('active');
            dd.parentElement.classList.remove('active');
        }
    });
    
    // Toggle current dropdown
    if (dropdown) dropdown.classList.toggle('active');
    if (parent) parent.classList.toggle('active');
}

// Close mobile menu on window resize if it's open
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-toggle')) {
        closeMobileMenu();
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Ensure overlay exists
    if (!document.querySelector('.mobile-menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
    }
    // Initialize existing functions from index.js
    if (typeof initPartnersCarousel === 'function') {
        initPartnersCarousel();
    }
    
    // Example of how to toggle menu items programmatically:
    // toggleCompactMenuItem("FAQ", false); // Hide FAQ
    // toggleCompactSubMenuItem("Допомога", "Волонтерство", false); // Hide submenu item
    
    // Apply configuration changes and refresh menu
    if (typeof applyMenuConfiguration === 'function') {
        applyMenuConfiguration();
    }
    
    // Test menu configuration (uncomment to test):
    // setTimeout(() => {
    //     console.log('Testing menu configuration...');
    //     toggleCompactMenuItem("FAQ", false); // Hide FAQ
    //     toggleCompactSubMenuItem("Партнери", "Донатори", false); // Hide Donors
    //     console.log('Menu configuration applied!');
    // }, 1000);
});

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        toggleMobileMenu, 
        closeMobileMenu, 
        toggleMobileDropdown 
    };
}
