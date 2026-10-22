// quotes is an array supplied by quotes-data.js. No request or server is needed.
let featuredIndex = Math.floor(Math.random() * quotes.length);
const featuredText = document.getElementById('featured-quote-text');
const featuredAuthor = document.getElementById('featured-quote-author');
const featuredSource = document.getElementById('featured-quote-source');

function showFeaturedQuote() {
    const quote = quotes[featuredIndex];
    featuredText.textContent = '\u201c' + quote.text + '\u201d';
    featuredAuthor.textContent = quote.name;
    featuredSource.textContent = quote.sourceLabel;
    featuredSource.href = quote.sourceUrl;
}

if (featuredText) {
    showFeaturedQuote();
    document.getElementById('another-quote').addEventListener('click', function () {
        // Move by at least one place, so the next quote always changes.
        featuredIndex = (featuredIndex + 1 + Math.floor(Math.random() * (quotes.length - 1))) % quotes.length;
        showFeaturedQuote();
    });
}

const filterButtons = document.querySelectorAll('[data-filter]');
const quoteCards = document.querySelectorAll('.quote-card');
for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', function () {
        const filter = filterButtons[i].dataset.filter;
        let visibleCount = 0;
        for (let j = 0; j < quoteCards.length; j++) {
            const show = filter === 'all' || quoteCards[j].dataset.artist === filter;
            quoteCards[j].hidden = !show;
            if (show) visibleCount++;
        }
        for (let j = 0; j < filterButtons.length; j++) {
            filterButtons[j].setAttribute('aria-pressed', String(filterButtons[j] === filterButtons[i]));
        }
        document.getElementById('quote-count').textContent = visibleCount + ' excerpts';
    });
}
