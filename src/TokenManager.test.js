const TokenManager = require('./TokenManager');

describe('Token Manager', () => {
  it('Returns correct tokens', () => {
    const tokens = new TokenManager();
    expect(tokens.next()).toBe('\x01');
    expect(tokens.next()).toBe('\x02');
    expect(tokens.next()).toBe('\x03');
  });

  it('Makes extra tokens when needed', () => {
    const tokens = new TokenManager({ tokensAtOnce: 2 });
    tokens.__generateTokens = jest.fn(tokens.__generateTokens);

    expect(tokens.next()).toBe('\x01');
    expect(tokens.__generateTokens).not.toHaveBeenCalled();
    expect(tokens.next()).toBe('\x02');
    expect(tokens.__generateTokens).toHaveBeenCalled();
  });

  it('Filters out unwanted tokens', () => {
    const tokens = new TokenManager({ filter: '\x01\x02\x04\x06' });
    expect(tokens.next()).toBe('\x03');
    expect(tokens.next()).toBe('\x05');
    expect(tokens.next()).toBe('\x07');
  });
});
