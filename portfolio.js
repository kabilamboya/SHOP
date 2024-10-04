const carousel = document.querySelector('.project-carousel');
let projects = Array.from(document.querySelectorAll('.project')); // Convert NodeList to Array
const visibleProjects = 3; // Number of visible projects at a time

// Function to update the carousel
function updateCarousel() {
    const firstProject = projects.shift(); // Remove the first project
    carousel.appendChild(firstProject); // Move the removed project to the end
    projects.push(firstProject); // Add the project back to the end of the array
}

// Function to handle auto-scrolling
function autoScrollCarousel() {
    updateCarousel(); // Move the first project to the end
}

// Initialize the carousel
function initializeCarousel() {
    setInterval(autoScrollCarousel, 4000); // Update every 4 seconds
}

// Wait for the DOM content to load before initializing
document.addEventListener('DOMContentLoaded', initializeCarousel);

// Optional: Pause scrolling on hover
carousel.addEventListener('mouseover', () => clearInterval(autoScrollInterval));
carousel.addEventListener('mouseleave', initializeCarousel);

document.addEventListener('DOMContentLoaded', () => {
    const sidePanel = document.querySelector('.side-panel');
    const openButton = document.querySelector('#open-side-panel');
    const closeButton = document.querySelector('#close-side-panel');

    openButton.addEventListener('click', () => {
        sidePanel.classList.add('open');
    });

    closeButton.addEventListener('click', () => {
        sidePanel.classList.remove('open');
    });
});
