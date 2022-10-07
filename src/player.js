import Gameboard from './gameboard';

let playerBoard = null;
let aiBoard = null;

const attackedGrid = [];

const presetFleet = {
  carrier: { grid: [1, 1], direction: 'y', length: 5 },
  battleship: { grid: [4, 1], direction: 'y', length: 4 },
  cruiser: { grid: [2, 8], direction: 'x', length: 3 },
  submarine: { grid: [7, 1], direction: 'y', length: 3 },
  destroyer: { grid: [7, 5], direction: 'x', length: 2 }
};

const createPlayer = (fleet = presetFleet) => {
  playerBoard = Gameboard(fleet);
  aiBoard = Gameboard(presetFleet);
};

const getBoard = (player) => {
  return player === 'player' ? playerBoard : aiBoard;
};

const checkAttack = (gridToAttack) => {
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
  let gridToAttack = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
  while (checkAttack(gridToAttack)) {
    console.log('Resaagin');
    gridToAttack = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
  }
  const result = playerBoard.receiveAttack(gridToAttack);
  attackedGrid.push(gridToAttack);
  return [gridToAttack, result];
};

export { createPlayer, getBoard, playerAttack, autoAttack };
