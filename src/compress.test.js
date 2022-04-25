const compress = require('./compress');

const js = 'const myStr = "Hello"; console.log(myStr); console.log("World!");';

describe('compress()', () => {
  it('Compresses the JS code', () => {
    const compressedJS = `_="\x01('Hello'),\x01('World!')\x01console.log";for($ of "\x01")with(_.split($))_=join(pop());eval(_)`;

    const code = compress(js);
    expect(code).toBe(compressedJS);
  });
});
