const UglifyJS = require('uglify-js');
const Compressor = require('./Compressor');

module.exports = function (code) {
  // Compress the code, shorten identifiers and beautify (to make it easier for Compressor to analyze)
  code = UglifyJS.minify(code, {
    mangle: true,
    compress: true,
    toplevel: true,
    output: { beautify: true },
  }).code;

  const compressor = new Compressor();
  compressor.analyze(code);

  // Again compress the code, but this time without beautifying
  code = UglifyJS.minify(code, {
    mangle: true,
    compress: true,
    toplevel: true,
  }).code;

  code = compressor.compress(code);

  return code;
};
