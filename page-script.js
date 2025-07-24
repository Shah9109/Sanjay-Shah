// Function to determine which page we're on and load the appropriate data
async function loadPageData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Get the current page from the URL
        const currentPage = window.location.pathname.split('/').pop();
        
        // Remove loading indicators
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(element => {
            element.remove();
        });
        
        // Load data based on the current page
        switch(currentPage) {
            case 'web-development.html':
                loadWebDevelopmentData(data.web_development);
                break;
            case 'ios-development.html':
                loadIOSDevelopmentData(data.ios_development);
                break;
            case 'android-development.html':
                loadAndroidDevelopmentData(data.android_development);
                break;
            case 'books.html':
                loadBooksData(data.books);
                break;
            case 'music.html':
                loadMusicData(data.music);
                break;
            default:
                console.log('Unknown page or index page');
        }
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Show error message in the grid
        const grids = document.querySelectorAll('.project-grid');
        grids.forEach(grid => {
            grid.innerHTML = '<div class="error-message">Failed to load data. Please try again later.</div>';
        });
    }
}

// Function to load Web Development data
function loadWebDevelopmentData(webProjects) {
    const webGrid = document.getElementById('web-grid');
    if (!webGrid) return;
    
    webProjects.forEach(project => {
        const card = `
            <div class="project-card">
                <h3>${project.title}</h3>
                <div class="video-placeholder">
                    <iframe src="https://www.youtube.com/embed/${project.youtube_id}?vq=hd1080&hd=1&quality=hd1080&fmt=22&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&fs=1&playsinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank">View Project or GitHub</a>
            </div>
        `;
        webGrid.innerHTML += card;
    });
}

// Function to load iOS Development data
function loadIOSDevelopmentData(iosApps) {
    const iosGrid = document.getElementById('ios-grid');
    if (!iosGrid) return;
    
    iosApps.forEach(app => {
        const card = `
            <div class="project-card">
                <h3>${app.name}</h3>
                 <div class="video-placeholder">
                    <iframe src="https://www.youtube.com/embed/${app.youtube_id}?vq=hd1080&hd=1&quality=hd1080&fmt=22&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&fs=1&playsinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <p>${app.description}</p>
                <a href="${app.link}" target="_blank">App Store or GitHub</a>
            </div>
        `;
        iosGrid.innerHTML += card;
    });
}

// Function to load Android Development data
function loadAndroidDevelopmentData(androidApps) {
    const androidGrid = document.getElementById('android-grid');
    if (!androidGrid) return;
    
    androidApps.forEach(app => {
        const card = `
            <div class="project-card">
                <h3>${app.name}</h3>
                <div class="video-placeholder">
                    <iframe src="https://www.youtube.com/embed/${app.youtube_id}?vq=hd1080&hd=1&quality=hd1080&fmt=22&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&fs=1&playsinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <p>${app.description}</p>
                <a href="${app.link}" target="_blank">Play Store or GitHub</a>
            </div>
        `;
        androidGrid.innerHTML += card;
    });
}

// Function to load Books data
function loadBooksData(books) {
    const booksGrid = document.getElementById('books-grid');
    if (!booksGrid) return;
    
    books.forEach(book => {
        const card = `
            <div class="project-card">
                <h3>${book.title}</h3>
                <img src="${book.cover_image}" alt="${book.title} Cover">
                <p>${book.description}</p>
                <a href="${book.amazon_link}" target="_blank">View on Amazon</a>
            </div>
        `;
        booksGrid.innerHTML += card;
    });
}

// Function to load Music data
function loadMusicData(songs) {
    const musicGrid = document.getElementById('music-grid');
    if (!musicGrid) return;
    
    songs.forEach(song => {
        const card = `
            <div class="project-card music-card">
                <h3>${song.title}</h3>
                <p>${song.description}</p>
                <div class="video-placeholder">
                    <iframe src="https://www.youtube.com/embed/${song.youtube_id}?vq=hd1080&hd=1&quality=hd1080&fmt=22&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&fs=1&playsinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        `;
        musicGrid.innerHTML += card;
    });
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
    loadPageData();
    
    // Initialize smart header for all portfolio pages
    new SmartHeader();
});