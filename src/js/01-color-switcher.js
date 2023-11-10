const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;
let colorsetInterval;

startBtn.addEventListener('click', () => {
  colorsetInterval = setInterval(changeColor, 1000);
});
stopBtn.addEventListener('click', () => {
  clearInterval(colorsetInterval);
});
function changeColor() {
  const randomColor = getRandomHexColor();
  //aplic culoarea pe fundal
  body.style.backgroundColor = randomColor;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
