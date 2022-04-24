module.exports = class {
  constructor(opts = {}) {
    const defaultFilter = '\0\r\n\t ';
    const filter = opts.filter || [];
    this.__filter = [...new Set(Array.from(defaultFilter + filter))];

    this.__tokensAtOnce = opts.tokensAtOnce || 256;
    this.__generatedTokens = 0;
    this.__tokens = [];
    this.__generateTokens();
  }

  __generateTokens() {
    const tokens = [];

    for (
      let i = this.__generatedTokens;
      i < this.__generatedTokens + this.__tokensAtOnce;
      i++
    ) {
      tokens.push(String.fromCharCode(i));
    }

    this.__generatedTokens += this.__tokensAtOnce;
    this.__tokens.push(...tokens.filter(t => !this.__filter.includes(t)));
  }

  next() {
    if (this.__tokens.length === 0) {
      this.__generateTokens();
    }

    return this.__tokens.shift();
  }
};
