const Compressor = require('../src/Compressor');

describe('Compressor', () => {
  it('Analyzes the code', () => {
    const compressor = new Compressor();
    const js = `console.log('Hello world!');
console.log('Good morning world!');
`;

    compressor.analyze(js);
    expect(compressor.__buf).toEqual(['console.log', 'world!']);
  });
});
