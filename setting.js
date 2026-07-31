const MIN_MINUTES = 1;
const MAX_MINUTES = 60;
const DEFAULT_MINUTES = 25;
const STORAGE_KEY = "pomodoroMinutes";

const minutesInput = document.getElementById("timer-minutes");

function loadSavedMinutes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  minutesInput.value = saved !== null ? saved : DEFAULT_MINUTES;
}

function saveSetting(event) {
  const value = minutesInput.value.trim();

  if (value === "") {
    event.preventDefault();
    return;
  }

  const minutes = Number(value);

  if (!Number.isInteger(minutes) || minutes < MIN_MINUTES || minutes > MAX_MINUTES) {
    event.preventDefault();
    return;
  }

  localStorage.setItem(STORAGE_KEY, String(minutes));
}

loadSavedMinutes();
