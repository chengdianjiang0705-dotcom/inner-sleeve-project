// Every section remains visible. Navigation tracks the current reading position.
const sectionLinks = [...document.querySelectorAll('.artist-section-nav a')];
const readingSections = sectionLinks.map(link => document.getElementById(link.hash.slice(1)));
function updateReadingPosition() {
    const navigation = document.querySelector('.artist-section-nav');
    const threshold = navigation.getBoundingClientRect().height + 36;
    let current = readingSections[0];
    for (const section of readingSections) {
        if (section.getBoundingClientRect().top <= threshold) current = section;
    }
    for (const link of sectionLinks) {
        if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    }
}
let scrollPending = false;
window.addEventListener('scroll', () => {
    if (scrollPending) return;
    scrollPending = true;
    requestAnimationFrame(() => { updateReadingPosition(); scrollPending = false; });
}, { passive: true });
window.addEventListener('resize', updateReadingPosition);
updateReadingPosition();
