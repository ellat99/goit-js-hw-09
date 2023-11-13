function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function showSnackbar(message, type = 'info') {
  const snackbar = document.getElementById('snackbar');
  snackbar.textContent = message;
  snackbar.style.backgroundColor = type === 'error' ? '#ff3333' : '#333'; // Red color for errors, default color for info
  snackbar.style.display = 'block';

  // Ascunde snackbar-ul după 3 secunde
  setTimeout(() => {
    snackbar.style.display = 'none';
  }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const firstDelay = parseInt(form.elements['delay'].value);
    const step = parseInt(form.elements['step'].value);
    const amount = parseInt(form.elements['amount'].value);

    for (let i = 0; i < amount; i++) {
      const position = i + 1;
      const currentDelay = firstDelay + i * step;

      createPromise(position, currentDelay)
        .then(({ position, delay }) => {
          const fulfilledMessage = `✅ Fulfilled promise ${position} in ${delay}ms`;
          showSnackbar(fulfilledMessage, 'info');
        })
        .catch(({ position, delay }) => {
          const rejectedMessage = `❌ Rejected promise ${position} in ${delay}ms`;
          showSnackbar(rejectedMessage, 'error');
        });
    }
  });
});
