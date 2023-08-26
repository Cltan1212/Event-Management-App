/**
 * Functionality to handle the transition effect for the navigation bar when scrolling.
 * Changes the background color of the navigation bar on scroll.
 */
const navBar = document.getElementById('mainNav');  // navigation bar element

window.addEventListener('scroll', () => {  // scroll event
    // Check the scroll position
    if (window.scrollY > 50) {
        // Change the background color when scrolling down
        navBar.style.backgroundColor = 'rgba(52, 58, 64, 0.8)';
    } else {
        // Change back to the original color when at the top
        navBar.style.backgroundColor = 'transparent';
    }
});