// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to fetch and display data
async function loadPortfolioData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        // Populate Web Development Section
        const webDevGrid = document.querySelector('#web-development .project-grid');
        webDevGrid.innerHTML = ''; // Clear placeholders
        data.web_development.forEach(project => {
            const card = `
                <div class="project-card">
                    <h3>${project.title}</h3>
                    <img src="${project.image}" alt="${project.title} Screenshot">
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank">View Project or GitHub</a>
                    <button class="upload-btn">Upload Screenshot (Placeholder)</button>
                </div>
            `;
            webDevGrid.innerHTML += card;
        });

        // Populate iOS Development Section
        const iosDevGrid = document.querySelector('#ios-development .project-grid');
        iosDevGrid.innerHTML = ''; // Clear placeholders
        data.ios_development.forEach(app => {
            const card = `
                <div class="project-card">
                    <h3>${app.name}</h3>
                     <img src="${app.image}" alt="${app.name} Screenshot">
                    <p>${app.description}</p>
                    <a href="${app.link}" target="_blank">App Store or GitHub</a>
                    <button class="upload-btn">Upload Screenshot (Placeholder)</button>
                </div>
            `;
            iosDevGrid.innerHTML += card;
        });

         // Populate Android Development Section
        const androidDevGrid = document.querySelector('#android-development .project-grid');
        androidDevGrid.innerHTML = ''; // Clear placeholders
        data.android_development.forEach(app => {
            const card = `
                <div class="project-card">
                    <h3>${app.name}</h3>
                     <img src="${app.image}" alt="${app.name} Screenshot">
                    <p>${app.description}</p>
                    <a href="${app.link}" target="_blank">Play Store or GitHub</a>
                    <button class="upload-btn">Upload Screenshot (Placeholder)</button>
                </div>
            `;
            androidDevGrid.innerHTML += card;
        });

        // Populate Books Section
        const booksGrid = document.querySelector('#books .project-grid');
        booksGrid.innerHTML = ''; // Clear placeholders
        data.books.forEach(book => {
            const card = `
                <div class="project-card">
                    <h3>${book.title}</h3>
                    <img src="${book.cover_image}" alt="${book.title} Cover">
                    <p>${book.description}</p>
                    <a href="${book.amazon_link}" target="_blank">View on Amazon</a>
                     <button class="upload-btn">Upload Cover Image (Placeholder)</button>
                </div>
            `;
            booksGrid.innerHTML += card;
        });

        // Populate Music Section
        const musicGrid = document.querySelector('#music .project-grid');
        musicGrid.innerHTML = ''; // Clear placeholders
        data.music.forEach(song => {
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

    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

// Load data when the page is ready
document.addEventListener('DOMContentLoaded', loadPortfolioData);

// Basic client-side contact form handling (prevents default submission)
const contactForm = document.querySelector('.contact-section form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Form submitted! (This is a placeholder. Backend needed to send email.)');
        // In a real application, you would send the form data to a backend script here
    });
} 