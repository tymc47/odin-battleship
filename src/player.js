import Gameboard from './gameboard';
import domController from './domController';

let playerBoard = null;
let aiBoard = null;

const attackedGrid = [];
const gridtoTry = [];
const placingGrid = [];

let isBoardSet = false;
let Fleet = {};

const fleetToset = [
  { shipType: 'carrier', shipLength: 5, direction: 'x' },
  { shipType: 'battleship', shipLength: 4, direction: 'x' },
  { shipType: 'cruiser', shipLength: 3, direction: 'x' },
  { shipType: 'submarine', shipLength: 3, direction: 'x' },
  { shipType: 'destroyer', shipLength: 2, direction: 'x' }
];

const getBoard = (player = 'player') => {
  return player === 'player' ? playerBoard : aiBoard;
};

const isAttacked = (gridToAttack) => {
  let attacked = false;
  const [x1, y1] = gridToAttack;
  if (attackedGrid) {
    attackedGrid.forEach((grid) => {
      const [x2, y2] = grid;
      if (x1 === x2 && y1 === y2) attacked = true;
    });
  }
  return attacked;
};

const playerAttack = (grid) => {
  return aiBoard.receiveAttack(grid);
};

const autoAttack = () => {
  let gridToAttack =
    gridtoTry.length === 0 ? [Math.round(Math.random() * 9), Math.round(Math.random() * 9)] : gridtoTry.shift();

  if (isAttacked(gridToAttack)) {
    console.log('again');
    return autoAttack();
  }

  const result = playerBoard.receiveAttack(gridToAttack);
  attackedGrid.push(gridToAttack);

  if (result) {
    //add adjacent square to try
    const [x, y] = gridToAttack;
    if (x + 1 <= 9 && !isAttacked([x + 1, y])) gridtoTry.push([x + 1, y]);
    if (x - 1 >= 0 && !isAttacked([x - 1, y])) gridtoTry.push([x - 1, y]);
    if (y + 1 <= 9 && !isAttacked([x, y + 1])) gridtoTry.push([x, y + 1]);
    if (y - 1 >= 0 && !isAttacked([x, y - 1])) gridtoTry.push([x, y - 1]);

    //add diagonal square to attacked array for skipping;
    if (x + 1 <= 9 && y + 1 <= 9 && !isAttacked([x + 1, y + 1])) attackedGrid.push([x + 1, y + 1]);
    if (x - 1 >= 0 && y - 1 >= 0 && !isAttacked([x - 1, y - 1])) attackedGrid.push([x - 1, y - 1]);
    if (x - 1 >= 0 && y + 1 <= 9 && !isAttacked([x - 1, y + 1])) attackedGrid.push([x - 1, y + 1]);
    if (x + 1 <= 9 && y - 1 >= 0 && !isAttacked([x + 1, y - 1])) attackedGrid.push([x + 1, y - 1]);
  }
  console.log(gridToAttack);
  return [gridToAttack, result];
};

const resetFleet = () => {
  Fleet = {};
  fleetToset.forEach((ship) => (ship.direction = 'x'));
  placingGrid.length = 0;
  isBoardSet = false;
};

const setFleet = (random = false) => {
  if (fleetToset.length === Object.keys(Fleet).length) {
    playerBoard = Gameboard(Fleet);
    resetFleet();
    aiBoard = Gameboard(randomFleet());
    domController.displayMsg('Your Fleet is set! Press START when you are ready!');
    isBoardSet = true;
    return;
  }

  if (random) {
    Fleet = randomFleet();
    setFleet();
  } else domController.setShip(fleetToset[Object.keys(Fleet).length]);
};

const rotateFleet = () => {
  fleetToset.forEach((ship) => (ship.direction = ship.direction === 'x' ? 'y' : 'x'));
};

const placeShip = (gridArray, ship) => {
  let result = true;

  if (placingGrid.length === 0) {
    for (let i = 0; i < 12; i++) {
      let row = [];
      for (let j = 0; j < 12; j++) {
        row.push(false);
      }
      placingGrid.push(row);
    }
  }

  if (gridArray.length === 0 || gridArray.length !== ship.shipLength) return false;

  gridArray.forEach((grid) => {
    let x = grid[0] + 1;
    let y = grid[1] + 1;
    if (placingGrid[y - 1][x - 1]) result = false;
    if (placingGrid[y - 1][x]) result = false;
    if (placingGrid[y - 1][x + 1]) result = false;
    if (placingGrid[y][x - 1]) result = false;
    if (placingGrid[y][x]) result = false;
    if (placingGrid[y][x + 1]) result = false;
    if (placingGrid[y + 1][x - 1]) result = false;
    if (placingGrid[y + 1][x]) result = false;
    if (placingGrid[y + 1][x + 1]) result = false;
  });

  if (result) {
    gridArray.forEach((grid) => {
      let x = grid[0] + 1;
      let y = grid[1] + 1;
      placingGrid[y][x] = true;
    });

    const shiptype = ship.shipType;
    Fleet[shiptype] = {
      grid: gridArray[0],
      direction: ship.direction,
      length: ship.shipLength
    };
  }

  return result;
};

const randomShip = (length, direction) => {
  const array = [];
  const x = Math.round(Math.random() * 9);
  const y = Math.round(Math.random() * 9);
  for (let i = 0; i < length; i++) {
    let row, col;
    if (direction === 'x') {
      row = y;
      col = x + i;
    } else {
      row = y + i;
      col = x;
    }
    if (row > 9 || col > 9) continue;
    array.push([col, row]);
  }
  return array;
};

const randomFleet = () => {
  if (fleetToset.length === Object.keys(Fleet).length) return Fleet;

  const ship = fleetToset[Object.keys(Fleet).length];
  //randomising direction
  ship.direction = Math.random() <= 0.5 ? 'x' : 'y';

  let array = randomShip(ship.shipLength, ship.direction);

  while (!placeShip(array, ship)) {
    array = randomShip(ship.shipLength, ship.direction);
  }
  return randomFleet();
};

const checkBoardSet = () => isBoardSet;

export { getBoard, playerAttack, autoAttack, placeShip, setFleet, rotateFleet, resetFleet, checkBoardSet };
