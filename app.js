const  musicContainer = document.getElementById('music-container');
const  playBtn = document.getElementById('play');
const  prevBtn = document.getElementById('prev');
const  nextBtn = document.getElementById('next');
const  audio = document.getElementById('audio');
const  progress = document.getElementById('progress');
const  progressContainer = document.getElementById('progress-container');
const  title = document.getElementById('title');
const  cover = document.getElementById('cover');

//Song titles
const song = ['goinghigher', 'inspire', 'littleidea', 'sweet'];

//Keep track of song
let songIndex = 0;

//Load song details into dom.
loadSongs(song[songIndex]);

//update song details
function loadSongs(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

//Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();

}

//Pause Song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();

}

//Prev Song
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = song.length - 1;
    }

    loadSongs(song[songIndex]);
    playSong();
}

//Next Song
function nextSong() {
    songIndex++;
    if(songIndex > song.length - 1) {
        songIndex = 0;
    }

    loadSongs(song[songIndex]);
    playSong();
}

//Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//Update Progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

//Event listener
playBtn.addEventListener('click', () => {
    const isplaying = musicContainer.classList.contains('play');
    if(isplaying) {
        pauseSong();
    } else {
        playSong();
    }

});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

//click on progress bar
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);