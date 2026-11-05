// Preview a listening destination without losing the current reading position.
const listeningDialog = document.getElementById('listening-dialog');
const musicLinks = document.querySelectorAll('.music-link');
let lastListeningLink = null;

for (let i = 0; i < musicLinks.length; i++) {
    musicLinks[i].addEventListener('click', function (event) {
        // Modified clicks retain the browser's normal open-in-new-tab behaviour.
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        if (!listeningDialog.showModal) return;
        event.preventDefault();
        const link = musicLinks[i];
        lastListeningLink = link;
        document.getElementById('listening-track').textContent = link.dataset.track;
        document.getElementById('listening-artist').textContent = link.dataset.artist;
        document.getElementById('listening-album').textContent = link.dataset.album;
        document.getElementById('listening-cover').src = link.dataset.cover;
        document.getElementById('listening-cover').alt = link.dataset.artLabel === 'Artist portrait'
            ? link.dataset.artist + ' portrait' : link.dataset.album + ' artwork';
        document.getElementById('listening-art-label').textContent = link.dataset.artLabel;
        document.getElementById('listening-open').href = link.href;
        document.getElementById('listening-description').textContent = link.dataset.mode === 'search'
            ? 'Find this recording by its title and artist on NetEase Cloud Music.'
            : 'Open this recording on NetEase Cloud Music.';
        document.body.classList.add('listening-open');
        listeningDialog.showModal();
    });
}

document.getElementById('listening-close').addEventListener('click', function () {
    listeningDialog.close();
});

document.getElementById('listening-open').addEventListener('click', function () {
    listeningDialog.close();
});

listeningDialog.addEventListener('click', function (event) {
    const bounds = listeningDialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right
        || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (event.target === listeningDialog && outside) listeningDialog.close();
});

listeningDialog.addEventListener('close', function () {
    document.body.classList.remove('listening-open');
    if (lastListeningLink) lastListeningLink.focus({ preventScroll: true });
});
