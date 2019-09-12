function sieve(n){
	let map = {1: true};
	let primes = [];
	for (let i = 2; i <= n; i++){
		if (i in map){
			delete map[i];
		}
		else{
			primes.push(i);
			for (let j = i; j <= n; j += i) map[j] = true;
		}
	}
	return primes;
}

function PrimeFinder(n){
	this.n = n;
	this.map = {1: true};
	this.primes = [];
	this.position = 2;
	
}
PrimeFinder.prototype = {
	continue: function(iterations){
		for (; this.position <= this.n && iterations > 0; this.position++, iterations--){
			if (this.position in this.map){
				delete this.map[this.position];
			}else{
				this.primes.push(this.position);
				for (let j = this.position; j <= this.n; j += this.position) this.map[j] = true;
			}
		}
		if (this.position >= this.n) {
			this.map = null;
			return true;
		}
		return false;
	},
	sieve: function(){
		let self = this;
		return new Promise(function(resolve, reject) {
		  setTimeout(function step() {
			if (self.continue(5000)) resolve(self.primes);
			else setTimeout(step, 20);
		  }, 0);
		});
	}
}