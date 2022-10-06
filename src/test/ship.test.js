import Ship from '../ship';

describe('ship factory', () => {
  const newShip = Ship(4);

  test('hit ship and notSunk', () => {
    newShip.hit();
    newShip.hit();
    newShip.hit();
    expect(newShip.isSunk()).toBe(false);
  });

  test('hit ship and isSunk', () => {
    newShip.hit();
    expect(newShip.isSunk()).toBe(true);
  });
});
