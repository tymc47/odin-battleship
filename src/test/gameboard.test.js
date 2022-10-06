import Gameboard from '../gameboard';

test.skip('empty board', () => {
  const gameboard = Gameboard();
  expect(gameboard.getBoard()).toEqual([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null]
  ]);
});

describe('gameboard factory', () => {
  const gameboard = Gameboard({
    carrier: { grid: [1, 1], direction: 'y', length: 5 },
    battleship: { grid: [3, 1], direction: 'y', length: 4 },
    cruiser: { grid: [4, 6], direction: 'x', length: 3 },
    submarine: { grid: [7, 1], direction: 'y', length: 3 },
    destroyer: { grid: [9, 1], direction: 'y', length: 2 }
  });

  test('setBoard & getBoard', () => {
    expect(gameboard.getBoard()).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, 'carrier', null, 'battleship', null, null, null, 'submarine', null, 'destroyer'],
      [null, 'carrier', null, 'battleship', null, null, null, 'submarine', null, 'destroyer'],
      [null, 'carrier', null, 'battleship', null, null, null, 'submarine', null, null],
      [null, 'carrier', null, 'battleship', null, null, null, null, null, null],
      [null, 'carrier', null, null, null, null, null, null, null, null],
      [null, null, null, null, 'cruiser', 'cruiser', 'cruiser', null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null]
    ]);
  });

  test('valid attack', () => {
    const exp = [null, true, false, 'battleship', null, null, null, 'submarine', null, 'destroyer'];
    expect(gameboard.receiveAttack([1, 1])).toBe(true);
    expect(gameboard.receiveAttack([2, 1])).toBe(true);
    expect(gameboard.getBoard()[1]).toEqual(exp);
  });

  test('invalid attack', () => {
    expect(gameboard.receiveAttack([2, 1])).toBe(false);
  });
});

describe.only('smaller fleet', () => {
  const gameboard = Gameboard({
    destroyer: { grid: [3, 5], direction: 'y', length: 2 }
  });

  test('setBoard & getBoard', () => {
    expect(gameboard.getBoard()).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, 'destroyer', null, null, null, null, null, null],
      [null, null, null, 'destroyer', null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null]
    ]);
  });

  test('valid attack & not sunk', () => {
    expect(gameboard.receiveAttack([3, 5])).toBe(true);
    expect(gameboard.checkAllSunk()).toBe(false);
  });

  test('valid attack & all sunk', () => {
    expect(gameboard.receiveAttack([3, 6])).toBe(true);
    expect(gameboard.checkAllSunk()).toBe(true);
  });
});
