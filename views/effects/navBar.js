/**
 * Below part shows the transition for navBar when user scolling
 */ 
// Get the navigation bar element
const navBar = document.getElementById('mainNav');

// Add an event listener for the scroll event
window.addEventListener('scroll', () => {
    // Check the scroll position
    if (window.scrollY > 50) {
        // Change the background color when scrolling down
        navBar.style.backgroundColor = 'rgba(52, 58, 64, 0.8)';
    } else {
        // Change back to the original color when at the top
        navBar.style.backgroundColor = 'transparent';
    }
});