function createPromise(position, delay) {
  //returneaza un obiect care accepta sau respinge in functie de shouldResolve
  //aici probabilitatea este de 70% sa accepte
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    //am folosit setTimeout pt a simula actiunea asincrona si pentru a intarzia rezolvarea sau respingerea promisiunii
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
//afișează un "snackbar" (o notificare temporară) în pagina web.
function showSnackbar(message, type = 'info') {
  const snackbar = document.getElementById('snackbar');
  snackbar.textContent = message;
  snackbar.style.backgroundColor = type === 'error' ? '#ff3333' : '#333';
  snackbar.style.display = 'block';

  // Ascunde snackbar-ul după 3 secunde
  setTimeout(() => {
    snackbar.style.display = 'none';
  }, 3000);
}
/**Utilizarea evenimentului DOMContentLoaded este utilă atunci când dorești să te asiguri că codul
 * JavaScript se execută doar după ce întregul DOM este pregătit pentru manipulare, evitând astfel
 * situații în care elementele DOM pe care încerci să le selectezi și să le manipulezi nu au fost
 * încă create sau încărcate. */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const firstDelay = parseInt(form.elements['delay'].value);
    const step = parseInt(form.elements['step'].value);
    const amount = parseInt(form.elements['amount'].value);
    //Un loop for creează și gestionează promise-urile utilizând funcția createPromise.
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
