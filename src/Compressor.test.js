const Compressor = require('./Compressor');

const js = `console.log('Hello world!');
console.log('Good morning world!');
`;

const compressedJS = `_="\x01('Hello \x02!');\x01('Good morning \x02!')\x01console.log\x02world";for($ of "\x02\x01")with(_.split($))_=join(pop());eval(_)`;

describe('Compressor', () => {
  it('Analyzes the code', () => {
    const compressor = new Compressor();
    compressor.analyze(js);
    expect(compressor.__chunks).toEqual(['console.log', 'world']);
  });

  it('Compresses the code', () => {
    const compressor = new Compressor();

    compressor.analyze(js);
    expect(compressor.compress(js)).toEqual(compressedJS);
  });

  it('Omits the comments', () => {
    const jsWithComment =
      js + "/* You won't see me anymore */ // I'll disappear too";
    const compressor = new Compressor();
    compressor.analyze(jsWithComment);
    expect(compressor.compress(jsWithComment)).toEqual(compressedJS);
  });
});
