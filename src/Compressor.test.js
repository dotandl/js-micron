const Compressor = require('./Compressor');

const js = `console.log('Hello world!');
console.log('Good morning world!');
`;

describe('Compressor', () => {
  it('Analyzes the code', () => {
    const compressor = new Compressor();
    compressor.analyze(js);
    expect(compressor.__chunks).toEqual(['console.log', 'world']);
  });

  it('Compresses the code', () => {
    const compressor = new Compressor();
    const compressedJS = `_="\x01('Hello \x02!');\x01('Good morning \x02!')\x01console.log\x02world";for(X in $="\x02\x01")with(_.split($[X]))_=join(pop());eval(_)`;

    compressor.analyze(js);
    expect(compressor.compress(js)).toEqual(compressedJS);
  });
});
