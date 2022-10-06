import Ship from './ship';

const Gameboard = (position) => {
  const fleet = {};

  const setBoard = (position) => {
    const board = [];
    while (board.length !== 10) {
      const row = [];
      while (row.length !== 10) {
        row.push(null);
      }
      board.push(row);
    }
    if (!position) return board;

    Object.entries(position).forEach(([key, value]) => {
      fleet[key] = Ship(value.length);
      const [x, y] = value.grid;
      if (value.direction === 'x') {
        for (let col = x; col < x + value.length; col++) {
          board[y][col] = key;
        }
      }
      if (value.direction === 'y') {
        for (let row = y; row < y + value.length; row++) {
          board[row][x] = key;
        }
      }
    });

    return board;
  };

  const board = setBoard(position);

  // hit successful, board = true else false
  const receiveAttack = (grid) => {
    let validHit = false;
    const [x, y] = grid;
    if (typeof board[y][x] === 'string') {
      const shipName = board[y][x];
      board[y][x] = true;
      fleet[shipName].hit();
      validHit = true;
    } else if (board[y][x] === null) {
      board[y][x] = false;
      validHit = true;
    }

    return validHit;
  };

  const checkAllSunk = () => {
    let isAllSunk = true;
    Object.entries(fleet).forEach(([ship, ptys]) => {
      if (!ptys.isSunk()) isAllSunk = false;
    });
    return isAllSunk;
  };

  const getBoard = () => board;

  return {
    receiveAttack,
    getBoard,
    checkAllSunk
  };
};

export default Gameboard;
