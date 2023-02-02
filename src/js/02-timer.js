import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInput = document.getElementById('datetime-picker');
const startCountdownBtn = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let targetTime = null;
let startTime = null;
let timerId = null;
startCountdownBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCheckDate(selectedDates);
  },
};

function onCheckDate(selectedDates) {
  targetTime = selectedDates[0].getTime();
  startTime = new Date().getTime();
  if (targetTime < startTime) {
    Notify.failure('Please choose a date in the future');
  } else {
    Notify.success('Now you can launch your timer!');
    startCountdownBtn.disabled = false;
  }
}
flatpickr(dateInput, options);

const onStartCountdownBtnClick = () => {
  timerId = setInterval(() => {
    startTime = new Date().getTime();
    const deltaTime = targetTime - startTime;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      dateInput.disabled = false;
    } else {
      const time = convertMs(deltaTime);
      updateClockface(time);
      startCountdownBtn.disabled = true;
      dateInput.disabled = true;
    }
  }, 1000);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startCountdownBtn.addEventListener('click', onStartCountdownBtnClick);

function updateClockface({ days, hours, minutes, seconds }) {
  daysSpan.textContent = days;
  hoursSpan.textContent = hours;
  minutesSpan.textContent = minutes;
  secondsSpan.textContent = seconds;
}
