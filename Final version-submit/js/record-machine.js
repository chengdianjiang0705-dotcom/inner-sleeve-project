// Reveal a record and leave it available to explore or play.
const recordButton = document.getElementById('record-button');
const recordObject = document.querySelector('.record-object');
const recordAlbums = [
    { title: 'Blonde', artist: 'Frank Ocean', year: 2016, cover: 'images/frank-album.jpg', page: 'frank.html', name: 'Frank', track: 'self-control', note: 'Intimate voices. Memories that change shape.' },
    { title: 'NEVER ENOUGH', artist: 'Daniel Caesar', year: 2023, cover: 'images/daniel-album.jpg', page: 'daniel.html', name: 'Daniel', track: 'let-me-go', note: 'A close voice, spacious arrangements and room for uncertainty.' },
    { title: 'Flower Boy', artist: 'Tyler, the Creator', year: 2017, cover: 'images/tyler-album.jpg', page: 'tyler.html', name: 'Tyler', track: 'november', note: 'Colourful worlds. A personal place in memory.' }
];
let recordIndex = -1;
function showRecord(album) {
    document.getElementById('sleeve-album').src = album.cover;
    document.getElementById('record-title').textContent = album.title;
    document.getElementById('record-byline').textContent = album.artist + ' / ' + album.year;
    document.getElementById('record-byline').hidden = false;
    document.getElementById('record-response').textContent = album.note;
    const explore = document.getElementById('record-explore');
    explore.href = album.page;
    explore.textContent = 'Explore ' + album.name;
    document.getElementById('record-listen').href = 'machine.html?track=' + album.track + '#player';
    document.getElementById('record-links').hidden = false;
}
recordButton.addEventListener('click', () => {
    if (recordButton.disabled) return;
    const firstReveal = recordIndex < 0;
    recordIndex = (recordIndex + 1) % recordAlbums.length;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    recordButton.disabled = true;
    if (firstReveal) {
        showRecord(recordAlbums[recordIndex]);
        recordObject.classList.add('is-revealed');
    } else {
        recordObject.classList.add('is-turning');
        setTimeout(() => showRecord(recordAlbums[recordIndex]), reducedMotion ? 0 : 380);
    }
    setTimeout(() => {
        recordObject.classList.remove('is-turning');
        recordButton.disabled = false;
    }, reducedMotion ? 0 : 820);
});
