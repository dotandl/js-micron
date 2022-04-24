Array.prototype.occurrences = function (item) {
  return this.filter(i => i === item).length;
};

module.exports = class {
  constructor(opts = {}) {
    this.__minOccurrences = opts.minOccurrences || 2;
    this.__minLength = opts.minLength || 3;
  }

  analyze(code) {
    const buf = [];

    // Remove unnecessary whitespace
    code = code
      .replace(/([\r\n]|\s)/g, ' ')
      .replace(/ +/g, ' ')
      .trim();

    const splitted = code.split(/["'`()[\]; ]/g);

    for (const chunk of [...new Set(splitted)]) {
      if (
        chunk.length >= this.__minLength &&
        splitted.occurrences(chunk) >= this.__minOccurrences
      ) {
        buf.push(chunk);
      }
    }

    this.__buf = buf;
  }
};
