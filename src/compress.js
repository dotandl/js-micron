const UglifyJS = require('uglify-js');
const Compressor = require('./Compressor');

module.exports = code => {
  if (process.env.VERBOSE) {
    console.log('Optimizing code using UglifyJS & preparing for analyze...');
  }
  // Compress the code, shorten identifiers and beautify (to make it easier for Compressor to analyze)
  code = UglifyJS.minify(code, {
    mangle: true,
    compress: true,
    toplevel: true,
    output: { beautify: true, quote_style: 1 },
  }).code;

  if (process.env.VERBOSE) {
    console.log('Analyzing code...');
  }
  const compressor = new Compressor();
  compressor.analyze(code);

  if (process.env.VERBOSE) {
    console.log('Minifying code using UglifyJS...');
  }
  // Again compress the code, but this time without beautifying
  code = UglifyJS.minify(code, {
    mangle: true,
    compress: true,
    toplevel: true,
    output: { quote_style: 1 },
  }).code;

  if (process.env.VERBOSE) {
    console.log('Compressing code...');
  }
  code = compressor.compress(code);

  return code;
};
