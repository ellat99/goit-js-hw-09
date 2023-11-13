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

function showNotification(message) {
  if (!('Notification' in window)) {
    console.error('This browser does not support desktop notification');
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification('Promise Notification', { body: message });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Promise Notification', { body: message });
      }
    });
  }
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
          showNotification(fulfilledMessage);
        })
        .catch(({ position, delay }) => {
          const rejectedMessage = `❌ Rejected promise ${position} in ${delay}ms`;
          showNotification(rejectedMessage);
        });
    }
  });
});
