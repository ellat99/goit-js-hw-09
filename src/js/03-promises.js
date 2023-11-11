// aceasta functie primeste 2 parametri
function createPromise(position, delay) {
  //creaza si returneaza un nou obiect Promise
  return new Promise((resolve, reject) => {
    //cu ajutorul math.random se decide daca promise ul trebuie rezolvat/respins,exista o probabilitate de 70% sa fie rezolvat
    const shouldResolve = Math.random() > 0.3;
    //folosit pentru a amana rezolvarea sau respingerea promise-ului dupa o anumita intarzie 'delay'
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  //asigură că scriptul rulează doar după ce întregul document HTML este complet încărcat.
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); //adaugă un eveniment pentru a asculta acțiunile de submit pe formular.

    const firstDelay = parseInt(form.elements['delay'].value);
    const step = parseInt(form.elements['step'].value);
    const amount = parseInt(form.elements['amount'].value);
    //extrag valorile din câmpurile formularului.

    for (let i = 0; i < amount; i++) {
      const position = i + 1;
      const currentDelay = firstDelay + i * step;
      //Un for loop este utilizat pentru a crea și gestiona promise-urile în funcție de valorile introduse în formular.
      //Pentru fiecare iterare a buclei, se calculează position și currentDelay în funcție de formula specificată.
      createPromise(position, currentDelay)
        //createPromise este apelata pentru a crea promise ul
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      /**În caz de rezolvare (then), se afișează un mesaj în consolă cu privire la îndeplinirea promise-ului.
În caz de respingere (catch), se afișează un mesaj în consolă cu privire la respingerea promise-ului. */
    }
  });
});
