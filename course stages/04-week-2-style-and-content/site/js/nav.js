// One shared navigation and footer for every page: Don't Repeat Yourself.
const navigation = [
    { file: 'index.html', label: 'Home' },
    { file: 'frank.html', label: 'Frank' },
    { file: 'daniel.html', label: 'Daniel' },
    { file: 'tyler.html', label: 'Tyler' },
    { file: 'quotes.html', label: 'Quotes' },
    { file: 'sources.html', label: 'Sources' }
];
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
let navigationLinks = '';
for (let i = 0; i < navigation.length; i++) {
    const item = navigation[i];
    const active = item.file === currentPage ? ' aria-current="page"' : '';
    const buttonStyle = item.file === 'machine.html' ? ' class="nav-machine"' : '';
    const number = String(i + 1).padStart(2, '0');
    navigationLinks += `<li><a href="${item.file}"${active}${buttonStyle}><span class="nav-index" aria-hidden="true">${number}</span><span>${item.label}</span></a></li>`;
}
const header = document.getElementById('site-header');
header.innerHTML = `
    <div class="wrap header-inner">
        <a class="brand" href="index.html" aria-label="Inner Sleeve Archive home">
            <img src="favicon.svg" alt="" width="38" height="38">
            <span class="brand-name"><span class="brand-title"><span class="brand-metric-text">INNER SLEEVE</span><img class="brand-wordmark" src="images/brand-wordmark.svg" alt=""></span><small><span class="brand-metric-text">A MUSIC &amp; LISTENING ARCHIVE</span><span class="brand-tagline">A MUSIC &amp; LISTENING ARCHIVE</span></small></span>
        </a>
        <button class="menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu +</button>
        <nav class="site-nav" id="site-nav" aria-label="Primary">
            <span class="nav-label" aria-hidden="true">Explore the archive / ${String(navigation.length).padStart(2, '0')} chapters</span>
            <ul class="nav-list">${navigationLinks}</ul>
        </nav>
    </div>`;

const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');

function setMenuOpen(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? 'Close \u00d7' : 'Menu +';
    siteNav.classList.toggle('is-open', open);
}

menuToggle.addEventListener('click', function () {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!expanded);
});

siteNav.addEventListener('click', function (event) {
    if (event.target.closest('a')) {
        setMenuOpen(false);
    }
});

document.addEventListener('click', function (event) {
    if (!header.contains(event.target)) {
        setMenuOpen(false);
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuToggle.focus();
    }
});

window.matchMedia('(max-width: 940px)').addEventListener('change', function () {
    setMenuOpen(false);
});

document.getElementById('site-footer').innerHTML = `
    <div class="wrap footer-inner">
        <div class="footer-details">
            <p>&copy; 2026 Inner Sleeve Archive. A student listening journal.</p>
            <p class="footer-contact"><span>Created by Diancheng Jiang</span><a href="mailto:X20250059@stu.hibiuh.edu.cn">X20250059@stu.hibiuh.edu.cn</a></p>
        </div>
        <div class="footer-links"><a href="sources.html">Sources &amp; credits</a><a href="#top">Back to top &uarr;</a></div>
    </div>`;
