const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player_slider");

function togglePlay(){
    video.paused ? video.play() : video.pause();
}

function toggleButton(){
    toggle.textContent = this.paused ?  "▶" : "❚❚";
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleChangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", toggleButton);
video.addEventListener("pause", toggleButton);
toggle.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleChangeUpdate));
ranges.forEach((range) => range.addEventListener("mousemove", handleChangeUpdate));

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove" ,(e) => mousedown && scrub(e));
progress.addEventListener("mouseup", () => (mousedown = false));
progress.addEventListener("mousedown", () => (mousedown = true));