//const functions = require('../backend_src/backend');
import { sum2, saveToLocalStorage, deleteRecipe, save, imgToURL, getAll, get } from '../backend_src/backend.js';

test('adds 1 + 2 to equal 3', () => {
    expect(sum2(1, 2)).toBe(3);
  });