// Artist pages share the player so readers can listen beside the article.
const listeningDialog = document.getElementById('listening-dialog');
const artistPlayer = createArchivePlayer(document.getElementById('artist-player'));
let lastListeningLink = null;
for (const link of document.querySelectorAll('.music-link')) {
    link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        if (!listeningDialog.showModal) return;
        event.preventDefault();
        lastListeningLink = link;
        listeningDialog.showModal();
        document.body.classList.add('listening-open');
        artistPlayer.selectTrack(link.dataset.trackId, true);
    });
}
document.getElementById('listening-close').addEventListener('click', () => listeningDialog.close());
listeningDialog.addEventListener('click', event => {
    if (event.target !== listeningDialog) return;
    const box = listeningDialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) listeningDialog.close();
});
listeningDialog.addEventListener('close', () => {
    artistPlayer.pause();
    document.body.classList.remove('listening-open');
    if (lastListeningLink) lastListeningLink.focus({ preventScroll: true });
});
