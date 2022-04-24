const { add } = require('.');

describe('Add function', () => {
  it('Adds 2 + 2', () => {
    expect(add(2, 2)).toBe(4);
  });
});
