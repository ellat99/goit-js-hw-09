// Importați flatpickr
import flatpickr from 'flatpickr';
// Adăugați stilurile flatpickr
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

// Configurați flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Verificați dacă data este în viitor
    const selectedDate = selectedDates[0];
    if (selectedDate > new Date()) {
      startBtn.removeAttribute('disabled');
    } else {
      startBtn.setAttribute('disabled', 'true');
      alert('Please choose a date in the future');
    }
  },
};

const flatpickrInstance = flatpickr(datetimePicker, options);

//  eveniment de clic pentru butonul "Start"
startBtn.addEventListener('click', () => {
  // Oprește intervalul dacă rulează
  clearInterval(countdownInterval);

  // Obține diferența dintre data curentă și data selectată pentru a afisa pe timer
  const timeDifference = flatpickrInstance.selectedDates[0] - new Date();

  // Actualizează timerul imediat și apoi la fiecare secundă
  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
});

// Funcție pentru actualizarea timerului
function updateTimer() {
  // Obține timpul rămas
  const remainingTime = convertMs(
    flatpickrInstance.selectedDates[0] - new Date()
  );

  // Actualizează elementele HTML cu timpul rămas
  daysElement.textContent = addLeadingZero(remainingTime.days);
  hoursElement.textContent = addLeadingZero(remainingTime.hours);
  minutesElement.textContent = addLeadingZero(remainingTime.minutes);
  secondsElement.textContent = addLeadingZero(remainingTime.seconds);

  // Opriți numărătoarea inversă dacă timpul a expirat
  if (
    remainingTime.days === 0 &&
    remainingTime.hours === 0 &&
    remainingTime.minutes === 0 &&
    remainingTime.seconds === 0
  ) {
    clearInterval(countdownInterval);
  }
}

// Funcție pentru conversia milisecundelor în zile, ore, minute și secunde
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Funcție pentru adăugarea unui zero în fața numerelor mai mici de 10
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
