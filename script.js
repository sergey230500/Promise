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