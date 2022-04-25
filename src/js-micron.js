#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const GetOpt = require('node-getopt');
const compress = require('./compress');

Number.toStringWithPlus = num =>
  num < 0 ? num.toString() : num > 0 ? `+${num}` : '0';

function main() {
  console.log('== js-micron ==');
  console.log('Input file:', inputFile);
  console.log('Output file:', outputFile);

  if (process.env.VERBOSE) {
    console.log(`Reading code from ${inputFile}...`);
  }
  const js = fs.readFileSync(inputFile, 'utf8');
  const compressedJS = compress(js);

  if (process.env.VERBOSE) {
    console.log(`Writing code to ${outputFile}...`);
  }
  fs.writeFileSync(outputFile, compressedJS, { encoding: 'utf8' });

  const inputSize = fs.statSync(inputFile).size;
  const outputSize = fs.statSync(outputFile).size;

  const diff = outputSize - inputSize;
  const percent = (diff / inputSize) * 100;

  console.log(
    `Done: ${inputSize}B -> ${outputSize}B ` +
      `(${Number.toStringWithPlus(diff)}B ${Number.toStringWithPlus(
        percent.toFixed(2)
      )}%)`
  );
}

const opt = new GetOpt([
  ['h', 'help', 'display this help'],
  ['V', 'version', 'display version'],
  ['v', 'verbose', 'verbose output'],
]);

opt.setHelp(
  `Usage: node ${path.basename(
    __filename
  )} [OPTIONS] <INPUT FILE> <OUTPUT FILE>\n\nOptions:\n[[OPTIONS]]\n`
);

opt.bindHelp();
opt.parseSystem();

const { options, argv } = opt;
const [inputFile, outputFile] = argv;

if (options.version) {
  const { version } = require(path.join(__dirname, '../package.json'));
  console.log(`js-micron v${version}`);
  process.exit(0);
}

if (!inputFile || !outputFile) {
  console.error('Missing input and/or output file.');
  opt.showHelp();
  process.exit(1);
}

process.env.VERBOSE = options.verbose || '';
main();
