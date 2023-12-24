// JavaScript logic here

let timerInterval;
let isRunning = false;
let startTime;
let lapNumber = 1;

function startStop() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  } else {
    startTime = Date.now() - (lapNumber === 1 ? 0 : lapNumber * 1000);
    timerInterval = setInterval(updateTimer, 10);
    isRunning = true;
  }
}

function updateTimer() {
  const currentTime = Date.now() - startTime;
  const formattedTime = formatTime(currentTime);
  document.getElementById('timer').innerText = formattedTime;
}

function formatTime(time) {
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  const milliseconds = Math.floor((time % 1000) / 10);

  return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}.${padTime(milliseconds)}`;
}

function padTime(value) {
  return value < 10 ? `0${value}` : value;
}

function lap() {
  if (isRunning) {
    const lapTime = document.createElement('li');
    lapTime.innerText = `Lap ${lapNumber}: ${document.getElementById('timer').innerText}`;
    document.getElementById('laps').appendChild(lapTime);
    lapNumber++;
  }
}

function reset() {
  clearInterval(timerInterval);
  document.getElementById('timer').innerText = '00:00:00';
  lapNumber = 1;
  isRunning = false;
  document.getElementById('laps').innerHTML = '';
}
