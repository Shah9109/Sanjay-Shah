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
                <img src="${project.image}" alt="${project.title} Screenshot">
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
                <img src="${app.image}" alt="${app.name} Screenshot">
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
                <img src="${app.image}" alt="${app.name} Screenshot">
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
                    <iframe src="https://www.youtube.com/embed/${song.youtube_id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        `;
        musicGrid.innerHTML += card;
    });
}

// Load data when the page is ready
document.addEventListener('DOMContentLoaded', loadPageData);