// Choose a record at random, turn the sleeve, then return to the original face.
const recordButton = document.getElementById('record-button');
const recordSleeve = document.querySelector('.record-sleeve');
const recordResponse = document.getElementById('record-response');
const sleeveAlbum = document.getElementById('sleeve-album');
const recordLabel = document.querySelector('.record-label');
const recordAlbums = [
    { title: 'Blonde', artist: 'Frank Ocean', cover: 'images/frank-album.jpg', initials: 'FO' },
    { title: 'NEVER ENOUGH', artist: 'Daniel Caesar', cover: 'images/daniel-album.jpg', initials: 'DC' },
    { title: 'Flower Boy', artist: 'Tyler, the Creator', cover: 'images/tyler-album.jpg', initials: 'TC' }
];
let recordBusy = false;
recordButton.addEventListener('click', function () {
    if (recordBusy) return;
    recordBusy = true;
    const album = recordAlbums[Math.floor(Math.random() * recordAlbums.length)];
    sleeveAlbum.src = album.cover;
    recordLabel.textContent = album.initials;
    recordButton.disabled = true;
    recordButton.textContent = 'Turning the sleeve...';
    recordResponse.textContent = album.title + ' / ' + album.artist;
    recordSleeve.classList.add('is-playing');
    setTimeout(function () {
        recordSleeve.classList.remove('is-playing');
        recordResponse.textContent = 'Ready when you are.';
        recordLabel.textContent = 'IS';
        recordButton.textContent = 'Flip the sleeve \u21bb';
        recordButton.disabled = false;
        recordBusy = false;
    }, 3000);
});
