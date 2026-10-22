// One shared navigation list: update it once for all seven pages.
const pages = [
    ['index.html', 'Home'], ['frank.html', 'Frank'],
    ['daniel.html', 'Daniel'], ['tyler.html', 'Tyler'],
    ['quotes.html', 'Quotes'], ['project.html', 'Projects'], ['sources.html', 'Sources']
];
const current = window.location.pathname.split('/').pop() || 'index.html';
let links = '';
for (let i = 0; i < pages.length; i++) {
    const selected = pages[i][0] === current ? ' aria-current="page"' : '';
    links += '<a href="' + pages[i][0] + '"' + selected + '>' + pages[i][1] + '</a>';
}
document.getElementById('site-header').innerHTML = '<a class="brand" href="index.html">INNER SLEEVE <small>ARCHIVE</small></a><nav aria-label="Primary">' + links + '</nav>';
document.getElementById('site-footer').innerHTML = '<p>Inner Sleeve Archive / HTML and navigation study</p>';
