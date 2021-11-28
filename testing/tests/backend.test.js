const functions = require('../"backend src"/backend');

test('adds 1 + 2 to equal 3', () => {
    expect(functions.sum2(1, 2)).toBe(3);
  });