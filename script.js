function sieve(n) {
  let map = {1: true};
  let primes = [];
  for (let i = 2; i <= n; i++) {
    if (i in map) {
      delete map[i];
    } else {
      primes.push(i);
      for (let j = i; j <= n; j += i) map[j] = true;
    }
  }
  return primes;
}

function PrimeFinder(n) {
  this.n = n;
  this.map = {};
  this.primes = [2];
  this.position = 3;
}

PrimeFinder.prototype = {
  continue: function (iterations) {
    const stepLimit = Math.min(this.position + iterations, this.n);

    for (let lastKnownPrime = this.primes[this.primes.length - 1];
         lastKnownPrime * lastKnownPrime < stepLimit;
         lastKnownPrime = this.primes[this.primes.length - 1]) {
      let preIterations = lastKnownPrime * lastKnownPrime - this.position;
      this.continue(preIterations);
    }

    const lastPrime = Math.floor(Math.sqrt(stepLimit));

    for (let i = 0, p; (p = this.primes[i]) <= lastPrime; ++i)
      for (let j = Math.ceil(this.position / p) * p; j <= stepLimit; j += p) this.map[j] = true;

    for (; this.position <= stepLimit; this.position++) {
      if (this.position in this.map)
        delete this.map[this.position];
      else
        this.primes.push(this.position);
    }

    if (this.position >= this.n) {
      this.map = null;
      return true;
    }

    return false;
  },
  sieve: function () {
    let self = this;
    return new Promise(function (resolve, reject) {
      setTimeout(function step() {
        if (self.continue(5000)) resolve(self.primes);
        else setTimeout(step, 1);
      }, 0);
    });
  }
};
//5761455
