// Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Search Tabs Functionality
const searchTabs = document.querySelectorAll('.search-tab');
const searchForm = document.querySelector('.search-form');

searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        searchTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Update placeholder text based on selected tab
        const locationInput = document.getElementById('location');
        const tabType = tab.dataset.type;
        
        switch(tabType) {
            case 'apartments':
                locationInput.placeholder = 'Search apartments...';
                break;
            case 'hostels':
                locationInput.placeholder = 'Search hostels...';
                break;
            case 'airbnb':
                locationInput.placeholder = 'Search Airbnb...';
                break;
        }
    });
});

// Property Favorites
document.querySelectorAll('.property-favorite').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.style.color = '#e53e3e';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.style.color = '';
        }
    });
});

// Search Form Submission
document.querySelector('.btn-search').addEventListener('click', (e) => {
    e.preventDefault();
    
    const location = document.getElementById('location').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
    const activeTab = document.querySelector('.search-tab.active').dataset.type;
    
    if (!location) {
        alert('Please enter a location');
        return;
    }
    
    if (!checkin || !checkout) {
        alert('Please select check-in and check-out dates');
        return;
    }
    
    // Simulate search (in a real app, this would make an API call)
    console.log('Searching for:', {
        type: activeTab,
        location,
        checkin,
        checkout,
        guests
    });
    
    // Show loading state
    const searchBtn = document.querySelector('.btn-search');
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    searchBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        searchBtn.innerHTML = originalText;
        searchBtn.disabled = false;
        alert(`Found properties for ${location}! (This is a demo)`);
    }, 2000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Set default dates (today and tomorrow)
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

document.getElementById('checkin').value = today.toISOString().split('T')[0];
document.getElementById('checkout').value = tomorrow.toISOString().split('T')[0];

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all property cards and feature cards
document.querySelectorAll('.property-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Property card hover effects
document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading states to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (!this.classList.contains('btn-search')) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

// Initialize tooltips for property features
document.querySelectorAll('.property-features span').forEach(feature => {
    feature.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.textContent;
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
            pointer-events: none;
            transform: translateX(-50%);
            white-space: nowrap;
        `;
        
        this.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = '50%';
        tooltip.style.top = '-35px';
    });
    
    feature.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});