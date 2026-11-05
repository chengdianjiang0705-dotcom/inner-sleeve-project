// Sitewide keyword search. The generated data works without a server or fetch.
(function () {
    const button = document.getElementById('site-search-toggle');
    if (!button) return;
    const data = typeof archiveSearchData === 'undefined' ? null : archiveSearchData;
    const dialog = document.createElement('dialog');
    dialog.id = 'site-search-dialog';
    dialog.className = 'site-search-dialog';
    dialog.setAttribute('aria-labelledby', 'site-search-title');
    dialog.innerHTML = `
        <div class="search-dialog-heading"><h2 id="site-search-title">Search the archive</h2><button class="search-close" type="button" aria-label="Close search">Close &times;</button></div>
        <form class="search-form" role="search">
            <label for="site-search-input">Keywords</label>
            <div class="search-field"><input id="site-search-input" type="search" placeholder="Artist, song, album or an idea..." maxlength="160" autocomplete="off" aria-controls="site-search-results"><button type="submit">Search</button></div>
        </form>
        <p class="search-status" id="site-search-status" role="status" aria-live="polite">Type a keyword to explore the archive.</p>
        <ol class="search-results" id="site-search-results"></ol>
        <p class="search-help">Use several words to narrow your results. Press Esc to close.</p>`;
    document.body.appendChild(dialog);
    const input = dialog.querySelector('input');
    const results = dialog.querySelector('.search-results');
    const status = dialog.querySelector('.search-status');
    let previousFocus = null;

    function normalise(value) {
        return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/['\u2019\u2018]/g, '').replace(/[^a-z0-9\u4e00-\u9fff]+/g, ' ').trim();
    }
    const indexed = data ? data.entries.map(function (entry) {
        return { entry: entry, title: normalise(entry.title), text: normalise(entry.page + ' ' + entry.title + ' ' + entry.context + ' ' + entry.text) };
    }) : [];

    // Keep character positions so can't/cant and accented letters match while
    // the displayed quotation keeps its exact original spelling.
    function matchRanges(text, words) {
        let plain = '';
        let offset = 0;
        const starts = [];
        const ends = [];
        for (const character of text) {
            const cleaned = character.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/['\u2019\u2018]/g, '');
            for (const letter of cleaned) {
                plain += letter;
                starts.push(offset);
                ends.push(offset + character.length);
            }
            offset += character.length;
        }
        const pattern = new RegExp(words.slice().sort(function (a, b) { return b.length - a.length; }).join('|'), 'g');
        return [...plain.matchAll(pattern)].map(function (match) {
            return { start: starts[match.index], end: ends[match.index + match[0].length - 1] };
        });
    }
    // Only text nodes and mark elements are created from queries and indexed copy.
    function highlight(parent, text, words) {
        let start = 0;
        for (const match of matchRanges(text, words)) {
            if (match.start < start) continue;
            parent.appendChild(document.createTextNode(text.slice(start, match.start)));
            const mark = document.createElement('mark');
            mark.textContent = text.slice(match.start, match.end);
            parent.appendChild(mark);
            start = match.end;
        }
        parent.appendChild(document.createTextNode(text.slice(start)));
    }
    function snippet(text, words) {
        const positions = matchRanges(text, words).map(function (match) { return match.start; });
        let start = positions.length ? Math.max(0, Math.min(...positions) - 60) : 0;
        if (start > 0) start = Math.max(0, text.lastIndexOf(' ', start) + 1);
        return (start ? '...' : '') + text.slice(start, start + 230) + (start + 230 < text.length ? '...' : '');
    }
    function renderResults() {
        results.replaceChildren();
        if (!data) {
            status.textContent = 'Search data could not be loaded. Please reload this page.';
            return;
        }
        const query = normalise(input.value);
        if (!query) {
            status.textContent = 'Type a keyword to search all ' + data.pages.length + ' pages.';
            return;
        }
        const words = [...new Set(query.split(' '))];
        const matches = indexed.filter(function (item) {
            return words.every(function (word) { return item.text.includes(word); });
        }).map(function (item) {
            const score = (item.title === query ? 30 : 0) + words.reduce(function (total, word) { return total + (item.title.includes(word) ? 5 : 0); }, 0);
            return { entry: item.entry, score: score };
        }).sort(function (a, b) { return b.score - a.score; });
        status.textContent = matches.length ? matches.length + (matches.length === 1 ? ' result' : ' results') + ' across the archive.' : 'No results. Try another keyword or fewer words.';
        for (const match of matches) {
            const entry = match.entry;
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.className = 'search-result';
            link.href = entry.href;
            const page = document.createElement('span');
            page.className = 'search-page';
            page.textContent = entry.page;
            const title = document.createElement('h3');
            highlight(title, entry.title, words);
            const excerpt = document.createElement('p');
            highlight(excerpt, snippet(entry.text, words), words);
            link.append(page, title, excerpt);
            item.appendChild(link);
            results.appendChild(item);
        }
    }
    function openSearch() {
        if (document.querySelector('dialog[open]')) return;
        previousFocus = document.activeElement;
        if (typeof setMenuOpen === 'function') setMenuOpen(false);
        renderResults();
        dialog.showModal();
        document.body.classList.add('site-search-open');
        input.focus();
    }
    button.addEventListener('click', openSearch);
    dialog.querySelector('.search-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('keydown', function (event) {
        // A search input normally consumes Esc to clear its value first.
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            dialog.close();
        }
    });
    dialog.addEventListener('close', function () {
        document.body.classList.remove('site-search-open');
        if (previousFocus && previousFocus.isConnected) previousFocus.focus();
    });
    dialog.addEventListener('click', function (event) {
        if (event.target !== dialog) return;
        const box = dialog.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
    input.addEventListener('input', renderResults);
    dialog.querySelector('form').addEventListener('submit', function (event) { event.preventDefault(); renderResults(); });
    results.addEventListener('click', function (event) {
        const link = event.target.closest('a');
        if (!link) return;
        // Let the browser handle opening links in another tab or window.
        if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        const destination = new URL(link.href);
        if (destination.pathname === location.pathname) {
            const player = document.getElementById('player');
            const trackId = destination.searchParams.get('track');
            if (player && trackId) {
                event.preventDefault();
                player.dispatchEvent(new CustomEvent('archive-select-track', { detail: { id: trackId } }));
                dialog.close();
                player.scrollIntoView({ block: 'start' });
                return;
            }
        }
        dialog.close();
    });
    document.addEventListener('keydown', function (event) {
        const editing = event.target.closest('input,textarea,select,[contenteditable="true"]');
        if (event.key === '/' && !editing && !event.ctrlKey && !event.metaKey && !event.altKey && !document.querySelector('dialog[open]')) {
            event.preventDefault();
            openSearch();
        }
    });
})();
