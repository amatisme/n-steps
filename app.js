exports.staircase = function(n) {
  if(n <= 1) return 1;
  return this.staircase(n - 1) + this.staircase(n - 2);
};

exports.staircase2 = function(n) {
  let [a,b] = [1,2];
  [...Array(n - 1).keys()].map(_ => {
    [a,b] = [b, a + b];
  });
  return a;
}

exports.staircase3 = function(n, x) {
  if(n < 0) {
    return 0;
  } else if(n == 0) {
    return 1;
  } else {
    return x.reduce((total, item) => {
      return total + this.staircase3((n - item),x);
    }, 0);
  }
}

exports.staircase4 = function(n, x) {
  let cache = Array(n + 1).fill(0);
  cache[0] = 1;

  //map once for range, a second time to add to cache array
  [...Array(n + 1).keys()].map(r => r + 1).map(i => {
    cache[i] += x.filter(j => i - j >= 0).reduce((total,k) => {
      return total + cache[i - k];
    }, 0);
  }, 0);

  return cache[n];
}
