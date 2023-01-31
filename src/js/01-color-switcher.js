//  пошук елементів у DOM
const startBtn = document.querySelector('button[data-start]');
const stoptBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

// Запис початкового значення intervalId
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// створення колбек-функцій для слухачів подій для кнопок Start і Stop
const onStartBtnClick = () => {
  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);
  startBtn.setAttribute('disabled', false);
  stoptBtn.removeAttribute('disabled', true);
};

const onStopBtnClick = () => {
  clearInterval(intervalId);
  startBtn.removeAttribute('disabled', true);
  stoptBtn.setAttribute('disabled', false);
};

// додавання слухачів подій для кнопок
startBtn.addEventListener('click', onStartBtnClick);
stoptBtn.addEventListener('click', onStopBtnClick);
