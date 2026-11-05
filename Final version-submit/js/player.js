// A shared player uses one native audio element and the local track catalogue.
// Preview windows can use a different document URL from the website files.
const archiveAssetBase = new URL('../', document.currentScript.src);

function createArchivePlayer(root) {
    const instance = root.id;
    root.classList.add('archive-player');
    root.innerHTML = `
        <div class="player-now">
            <div class="player-art"><img class="player-cover" alt="" width="420" height="420"><span class="player-record" aria-hidden="true"></span></div>
            <div class="player-copy">
                <p class="eyebrow">Now on the record</p>
                <p class="player-artist"></p>
                <h2 class="player-title" id="${instance}-title"></h2>
                <p class="player-album"></p><p class="player-cue"></p>
                <audio preload="metadata"></audio>
                <div class="player-buttons">
                    <button class="player-previous" type="button" aria-label="Previous track">&#8592;</button>
                    <button class="player-toggle" type="button" aria-label="Play">Play &#9654;</button>
                    <button class="player-next" type="button" aria-label="Next track">&#8594;</button>
                </div>
                <label class="sr-only" for="${instance}-seek">Playback position in seconds</label>
                <input class="player-seek" id="${instance}-seek" type="range" min="0" max="0" value="0" step="0.1" disabled>
                <div class="player-times"><span class="player-elapsed">0:00</span><span class="player-duration">0:00</span></div>
                <div class="player-bottom"><label for="${instance}-volume">Volume</label><input class="player-volume" id="${instance}-volume" type="range" min="0" max="1" value="0.75" step="0.05"></div>
                <p class="player-status" role="status" aria-live="polite">Choose a track, then press Play.</p>
            </div>
        </div>
        <div class="player-library">
            <div class="library-heading"><h3>On the shelf</h3><span>13 tracks</span></div>
            <div class="player-filters" role="group" aria-label="Filter tracks by artist">
                <button type="button" data-artist-filter="all" aria-pressed="true">All</button>
                <button type="button" data-artist-filter="frank" aria-pressed="false">Frank</button>
                <button type="button" data-artist-filter="daniel" aria-pressed="false">Daniel</button>
                <button type="button" data-artist-filter="tyler" aria-pressed="false">Tyler</button>
            </div><ol class="player-tracks"></ol>
        </div>`;
    const audio = root.querySelector('audio');
    const playButton = root.querySelector('.player-toggle');
    const seek = root.querySelector('.player-seek');
    const status = root.querySelector('.player-status');
    const rows = new Map();
    let current = archiveTracks[0];
    let filter = 'all';
    let requestNumber = 0;
    audio.volume = 0.75;

    function timeLabel(seconds) {
        const value = Number.isFinite(seconds) ? Math.floor(seconds) : 0;
        return Math.floor(value / 60) + ':' + String(value % 60).padStart(2, '0');
    }
    for (const track of archiveTracks) {
        const item = document.createElement('li');
        item.className = 'track-row';
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.trackId = track.id;
        const cover = document.createElement('img');
        cover.src = new URL(track.cover, archiveAssetBase).href;
        cover.alt = '';
        cover.width = 48;
        cover.height = 48;
        cover.loading = 'lazy';
        const copy = document.createElement('span');
        const title = document.createElement('strong');
        title.textContent = track.title;
        const artist = document.createElement('small');
        artist.textContent = track.artist;
        copy.append(title, artist);
        const indicator = document.createElement('span');
        indicator.className = 'track-indicator';
        indicator.setAttribute('aria-hidden', 'true');
        indicator.textContent = '\u25b7';
        button.append(cover, copy, indicator);
        button.addEventListener('click', () => selectTrack(track.id, true));
        item.appendChild(button);
        root.querySelector('.player-tracks').appendChild(item);
        rows.set(track.id, { item, button, indicator });
    }
    function updatePlayback() {
        const playing = !audio.paused && !audio.ended;
        playButton.textContent = playing ? 'Pause \u275a\u275a' : 'Play \u25b6';
        playButton.setAttribute('aria-label', playing ? 'Pause' : 'Play');
        root.classList.toggle('is-playing', playing);
        for (const track of archiveTracks) {
            const row = rows.get(track.id);
            const selected = track.id === current.id;
            if (selected) row.button.setAttribute('aria-current', 'true');
            else row.button.removeAttribute('aria-current');
            row.indicator.textContent = selected && playing ? '\u266b' : '\u25b7';
        }
    }
    async function play() {
        const request = ++requestNumber;
        status.textContent = 'Loading ' + current.title + '...';
        try {
            await audio.play();
            if (request === requestNumber) status.textContent = 'Playing ' + current.title + '.';
        } catch (error) {
            if (request !== requestNumber || error.name === 'AbortError') return;
            status.textContent = error.name === 'NotAllowedError'
                ? 'Press Play to start this track.'
                : 'This track could not be played. Try another track or press Play to retry.';
            updatePlayback();
        }
    }
    function selectTrack(id, autoplay = false) {
        const track = archiveTracks.find(item => item.id === id);
        if (!track) return;
        // An article can request a track outside the previously filtered artist.
        if (filter !== 'all' && filter !== track.artistKey) {
            filter = 'all';
            for (const control of root.querySelectorAll('[data-artist-filter]')) control.setAttribute('aria-pressed', String(control.dataset.artistFilter === 'all'));
            for (const row of rows.values()) row.item.hidden = false;
        }
        requestNumber++;
        audio.pause();
        current = track;
        root.dataset.currentTrack = id;
        root.querySelector('.player-title').textContent = track.title;
        root.querySelector('.player-artist').textContent = track.artist;
        root.querySelector('.player-album').textContent = [track.album, track.year].filter(Boolean).join(' / ');
        root.querySelector('.player-cue').textContent = track.cue;
        const cover = root.querySelector('.player-cover');
        cover.src = new URL(track.cover, archiveAssetBase).href;
        cover.alt = track.album + ' cover';
        seek.value = 0;
        seek.max = 0;
        seek.disabled = true;
        root.querySelector('.player-elapsed').textContent = '0:00';
        root.querySelector('.player-duration').textContent = '0:00';
        audio.src = new URL(track.src, archiveAssetBase).href;
        audio.load();
        status.textContent = track.title + ' is ready. Press Play to listen.';
        updatePlayback();
        if (autoplay) play();
    }
    function moveTrack(direction) {
        const queue = archiveTracks.filter(track => filter === 'all' || track.artistKey === filter);
        const index = queue.findIndex(track => track.id === current.id);
        const next = index < 0 ? 0 : (index + direction + queue.length) % queue.length;
        selectTrack(queue[next].id, true);
    }
    playButton.addEventListener('click', () => {
        if (audio.paused) {
            if (audio.error) audio.load();
            play();
        } else {
            requestNumber++;
            audio.pause();
            status.textContent = 'Paused.';
        }
    });
    root.querySelector('.player-previous').addEventListener('click', () => moveTrack(-1));
    root.querySelector('.player-next').addEventListener('click', () => moveTrack(1));
    root.querySelector('.player-volume').addEventListener('input', event => { audio.volume = Number(event.target.value); });
    seek.addEventListener('input', () => { if (Number.isFinite(audio.duration)) audio.currentTime = Number(seek.value); });
    audio.addEventListener('loadedmetadata', () => {
        seek.max = Number.isFinite(audio.duration) ? audio.duration : 0;
        seek.disabled = !Number.isFinite(audio.duration);
        root.querySelector('.player-duration').textContent = timeLabel(audio.duration);
    });
    audio.addEventListener('timeupdate', () => {
        seek.value = audio.currentTime;
        seek.setAttribute('aria-valuetext', timeLabel(audio.currentTime) + ' of ' + timeLabel(audio.duration));
        root.querySelector('.player-elapsed').textContent = timeLabel(audio.currentTime);
    });
    audio.addEventListener('play', updatePlayback);
    audio.addEventListener('pause', updatePlayback);
    audio.addEventListener('playing', () => { status.textContent = 'Playing ' + current.title + '.'; });
    audio.addEventListener('waiting', () => { status.textContent = 'Buffering ' + current.title + '...'; });
    audio.addEventListener('ended', () => moveTrack(1));
    audio.addEventListener('error', () => {
        status.textContent = 'This track could not be loaded. Try another track or press Play to retry.';
        updatePlayback();
    });
    for (const button of root.querySelectorAll('[data-artist-filter]')) {
        button.addEventListener('click', () => {
            filter = button.dataset.artistFilter;
            for (const control of root.querySelectorAll('[data-artist-filter]')) control.setAttribute('aria-pressed', String(control === button));
            for (const track of archiveTracks) rows.get(track.id).item.hidden = filter !== 'all' && track.artistKey !== filter;
        });
    }
    root.addEventListener('archive-select-track', event => selectTrack(event.detail.id));
    selectTrack(archiveTracks[0].id);
    return { selectTrack, pause: () => { requestNumber++; audio.pause(); } };
}

const roomPlayer = document.getElementById('player');
if (roomPlayer) {
    const player = createArchivePlayer(roomPlayer);
    const trackId = new URLSearchParams(location.search).get('track');
    if (trackId) player.selectTrack(trackId);
}
