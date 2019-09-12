window.addEventListener('load', function () {
  let button = document.querySelector('#compute');
  let asyncCheck = document.getElementById('async');
  let outputArea = document.querySelector('#output');
  let progress = document.getElementById('progress');

  const finder = new PrimeFinder(50000000);

  button.addEventListener('click', () => {
    const start = Date.now();
    const promise = finder.sieve();
    button.disabled = true;

    let frameHandle;
    let frameRenderer = function () {
      progress.value = finder.position;
      frameHandle = requestAnimationFrame(frameRenderer);
    };

    promise.then(primes => {
      const finish = Date.now();
      outputArea.innerText = `Готово за ${finish - start}мс; всего ${primes.length} чисел`;
      button.disabled = false;
      if (frameHandle) {
        cancelAnimationFrame(frameHandle);
        frameHandle = null;
      }
      return primes.length; // chained promise
    });

    frameHandle = requestAnimationFrame(frameRenderer);
  });
});
