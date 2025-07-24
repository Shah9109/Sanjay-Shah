// Smooth scrolling only for contact link on home page
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to fetch and display data for the home page
async function loadPortfolioData() {
    try {
        // For the home page, we don't need to load all the project data
        // Instead, we'll add buttons to view more projects on each section
        
        // Add "View All Projects" buttons to each section
        addViewAllButtons();
        
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

// Function to add "View All" buttons to each portfolio section
function addViewAllButtons() {
    // Web Development section
    const webDevGrid = document.querySelector('#web-development .project-grid');
    if (webDevGrid) {
        webDevGrid.innerHTML = `
            <div class="project-card featured-card">
                <h3>Web Development Projects</h3>
                <p>Explore my collection of web development projects including e-commerce platforms, responsive websites, and interactive web applications.</p>
                <a href="web-development.html" class="view-all-btn">View All Web Projects</a>
            </div>
        `;
    }
    
    // iOS Development section
    const iosDevGrid = document.querySelector('#ios-development .project-grid');
    if (iosDevGrid) {
        iosDevGrid.innerHTML = `
            <div class="project-card featured-card">
                <h3>iOS Development Projects</h3>
                <p>Discover my iOS applications built with Swift and UIKit, ranging from utility apps to complex solutions.</p>
                <a href="ios-development.html" class="view-all-btn">View All iOS Projects</a>
            </div>
        `;
    }
    
    // Android Development section
    const androidDevGrid = document.querySelector('#android-development .project-grid');
    if (androidDevGrid) {
        androidDevGrid.innerHTML = `
            <div class="project-card featured-card">
                <h3>Android Development Projects</h3>
                <p>Browse through my Android applications created with Kotlin and Java, showcasing various functionalities and designs.</p>
                <a href="android-development.html" class="view-all-btn">View All Android Projects</a>
            </div>
        `;
    }
    
    // Books section
    const booksGrid = document.querySelector('#books .project-grid');
    if (booksGrid) {
        booksGrid.innerHTML = `
            <div class="project-card featured-card">
                <h3>Published Books</h3>
                <p>Check out my published books covering various topics from technology to fiction.</p>
                <a href="books.html" class="view-all-btn">View All Books</a>
            </div>
        `;
    }
    
    // Music section
    const musicGrid = document.querySelector('#music .project-grid');
    if (musicGrid) {
        musicGrid.innerHTML = `
            <div class="project-card featured-card music-card">
                <h3>Music Creations</h3>
                <p>Listen to my AI-generated music compositions and original tracks.</p>
                <a href="music.html" class="view-all-btn">View All Music</a>
            </div>
        `;
    }
}

// Smart Header Scroll Functionality with Responsive Behavior
class SmartHeader {
    constructor() {
        this.header = document.querySelector('header');
        this.lastScrollTop = 0;
        this.scrollThreshold = 10; // Minimum scroll distance to trigger
        this.isScrolling = false;
        this.headerHeight = 0;
        this.showTimeout = null; // For 3-second delay on mobile
        this.isMobile = false;
        
        this.init();
    }
    
    init() {
        if (!this.header) return;
        
        // Get header height dynamically
        this.headerHeight = this.header.offsetHeight;
        
        // Check initial screen size
        this.checkScreenSize();
        
        // Debounced scroll handler
        this.debouncedScrollHandler = this.debounce(this.handleScroll.bind(this), 50);
        
        // Add scroll event listener
        window.addEventListener('scroll', this.debouncedScrollHandler, { passive: true });
        
        // Handle resize to recalculate header height and check screen size
        window.addEventListener('resize', this.debounce(() => {
            this.headerHeight = this.header.offsetHeight;
            this.checkScreenSize();
        }, 100));
    }
    
    checkScreenSize() {
        const previousIsMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        
        // If switching from mobile to desktop, ensure header is visible
        if (previousIsMobile && !this.isMobile) {
            this.header.classList.remove('header-hidden');
            if (this.showTimeout) {
                clearTimeout(this.showTimeout);
                this.showTimeout = null;
            }
        }
    }
    
    handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Don't do anything if scroll position hasn't changed significantly
        if (Math.abs(currentScrollTop - this.lastScrollTop) < this.scrollThreshold) {
            return;
        }
        
        // Add scrolled class when scrolled down (for shadow effect)
        if (currentScrollTop > this.headerHeight) {
            this.header.classList.add('header-scrolled');
        } else {
            this.header.classList.remove('header-scrolled');
        }
        
        // Only apply hide/show behavior on mobile
        if (this.isMobile) {
            // Clear any existing timeout
            if (this.showTimeout) {
                clearTimeout(this.showTimeout);
                this.showTimeout = null;
            }
            
            // Hide/show header based on scroll direction
            if (currentScrollTop > this.lastScrollTop && currentScrollTop > this.headerHeight) {
                // Scrolling down - hide header immediately
                this.header.classList.add('header-hidden');
            } else if (currentScrollTop < this.lastScrollTop) {
                // Scrolling up - show header after 3-second delay
                this.showTimeout = setTimeout(() => {
                    this.header.classList.remove('header-hidden');
                    this.showTimeout = null;
                }, 1000);
            }
        } else {
            // On desktop/tablet, always keep header visible
            this.header.classList.remove('header-hidden');
        }
        
        this.lastScrollTop = currentScrollTop;
    }
    
    // Debounce function for performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Load data when the page is ready
document.addEventListener('DOMContentLoaded', function() {
    loadPortfolioData();
    
    // Initialize smart header
    new SmartHeader();
});

// Basic client-side contact form handling (prevents default submission)
const contactForm = document.querySelector('.contact-section form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Form submitted! (This is a placeholder. Backend needed to send email.)');
        // In a real application, you would send the form data to a backend script here
    });
}