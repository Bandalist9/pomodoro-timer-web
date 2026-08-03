const DEFAULT_MINUTES = 25;
const STORAGE_KEY = "pomodoroMinutes";

function getSavedMinutes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved !== null ? Number(saved) : DEFAULT_MINUTES;
}

let totalSeconds = getSavedMinutes() * 60;
let remainingSeconds = totalSeconds;
let intervalId = null;

const timeDisplay = document.getElementById("time-display");
const currentTimeDisplay = document.getElementById("current-time");

function updateCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
}

function startTimer() {
  if (intervalId !== null) return;

  intervalId = setInterval(() => {
    if (remainingSeconds <= 0) {
      stopTimer();
      return;
    }
    remainingSeconds--;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  stopTimer();
  totalSeconds = getSavedMinutes() * 60;
  remainingSeconds = totalSeconds;
  updateDisplay();
}

updateDisplay();
updateCurrentTime();
setInterval(updateCurrentTime, 1000);
