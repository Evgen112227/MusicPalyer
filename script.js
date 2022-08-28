const image = document.querySelector('img');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const music = document.querySelector('audio');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#forward');
const progressContainer = document.querySelector('.progress-container ');
const progress = document.querySelector('.progress');
const currentTimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');
let songIndex = 0;

const songs = [
	{
		name: 'jacinto-1',
		displayName: 'Electric Chill Machine',
		artist: 'Jacinto Design',
	},
	{
		name: 'jacinto-2',
		displayName: 'Seven Nation Army(Remix)',
		artist: 'Jacinto Design',
	},
	{
		name: 'jacinto-3',
		displayName: 'Goodnight, Disco Queen',
		artist: 'Jacinto Design',
	},
	{
		name: 'metric-1',
		displayName: 'Front Row(Remix)',
		artist: 'Metrci/Jacinto Design',
	},

];


let isPlaying = false;

function playSong() {
	music.play();
	playBtn.classList.replace('fa-play', 'fa-pause');
	isPlaying = true;
};

function pauseSong() {
	music.pause();
	playBtn.classList.replace('fa-pause', 'fa-play');
	isPlaying = false;
};



function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) songIndex = 0;
	loadSong(songs[songIndex]);
	playSong();
}

function prevSong() {
	songIndex--;
	if (songIndex < 0) songIndex = songs.length - 1;
	loadSong(songs[songIndex]);
	playSong();
}

function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpg`;
}

function updateProgressBar(e) {
	if (isPlaying) {
		const { duration, currentTime } = e.srcElement;
		let progressPercent = (currentTime / duration) * 100;
		progress.style.width = `${progressPercent}%`;
		let durationMinutes = Math.floor(duration / 60);
		let durationSeconds = Math.floor(duration % 60);
		if (durationSeconds) durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? ('0' + +durationSeconds) : durationSeconds}`
		let currentMinutes = Math.floor(currentTime / 60);
		let currentSeconds = Math.floor(currentTime % 60)
		currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + +currentSeconds : currentSeconds}`
	}
}

function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const { duration } = music;
	music.currentTime = (clickX / width) * duration;

}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

loadSong(songs[songIndex]);

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);




