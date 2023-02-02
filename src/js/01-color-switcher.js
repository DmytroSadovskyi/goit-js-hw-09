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
  startBtn.disabled = true;
  stoptBtn.disabled = false;
};

const onStopBtnClick = () => {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stoptBtn.disabled = true;
};

// додавання слухачів подій для кнопок
startBtn.addEventListener('click', onStartBtnClick);
stoptBtn.addEventListener('click', onStopBtnClick);
