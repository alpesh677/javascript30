let countDown;

const timeLeft = document.querySelector(".time-left");
const timeEnd = document.querySelector(".time-end");
const buttons = document.querySelectorAll("[data-time]");
const audioAlert = document.querySelector("#timer-alert");

function timer(seconds) {
  clearInterval(countDown);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countDown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      audioAlert.play();
      clearInterval(countDown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainSecond = seconds % 60;
  const display = `${minutes < 10 ? "0" : ""}${minutes}: 
  ${remainSecond < 10 ? "0" : ""}${remainSecond}`;

  document.title = display;
  timeLeft.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  timeEnd.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function newTimer(e) {
  e.preventDefault();
  timer(this.minutes.value * 60);
  this.reset();
}

buttons.forEach((button) => {
  button.addEventListener("click", startTimer);
});

document.customForm.addEventListener("submit", newTimer);
