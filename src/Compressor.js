const TokenManager = require('./TokenManager');

Array.prototype.occurrences = function (item) {
  return this.filter(i => i === item).length;
};

module.exports = class {
  constructor(opts = {}) {
    this.__minOccurrences = opts.minOccurrences || 2;
    this.__minLength = opts.minLength || 3;
  }

  analyze(code) {
    const chunks = [];

    // Remove unnecessary whitespace
    // TODO: remove comments
    code = code
      .replace(/([\r\n]|\s)/g, ' ')
      .replace(/ +/g, ' ')
      .trim();

    // Split the code into small chunks
    const splitted = code.split(/["'`()[\],;:+\-*/%!&| ]/g);

    // Check if each chunk is worth replacing with a token
    // (if it occurs multiple times and is long enough)
    for (const chunk of [...new Set(splitted)]) {
      if (
        chunk.length >= this.__minLength &&
        splitted.occurrences(chunk) >= this.__minOccurrences
      ) {
        chunks.push(chunk);
      }
    }

    // Save chunks for later
    this.__chunks = chunks;
  }

  compress(code) {
    // Prepare code for compression (remove whitespace, trim, get rid of trailing comma)
    // TODO: remove comments
    code = code.replace(/[\r\n]/g, '').trim();
    if (code.slice(-1) === ';') code = code.slice(0, -1);

    let tokens = new TokenManager(code);
    const pairs = [];

    // Replace chunks with tokens
    for (const chunk of this.__chunks) {
      const token = tokens.next();
      pairs.push({ token, chunk });
      code = code.replace(new RegExp(chunk, 'g'), token);
    }

    // Add strings that have been replaced with tokens
    for (const { token, chunk } of pairs) {
      code += `${token}${chunk}`;
    }

    // Prepare tokens to decompress (they must be in reversed order)
    tokens = pairs
      .reverse()
      .map(p => p.token)
      .join('');

    // Add decompressing code
    // TODO: for..of
    return `_="${code}";for(X in $="${tokens}")with(_.split($[X]))_=join(pop());eval(_)`;
  }
};
