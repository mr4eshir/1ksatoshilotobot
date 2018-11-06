function randomNumber() {
    var arr = [];
    var n = 90;
    for (var i = 1; i <= n; i++) {
       arr.push(i);
    }
    Array.prototype.shuffle = function() {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
      return this;
    }
    return arr.shuffle().slice(n-30).join();
}
    
module.exports = randomNumber;