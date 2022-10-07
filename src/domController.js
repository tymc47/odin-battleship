import { newGame, attack, resetGame } from './gameController';

const domController = (() => {
  const playerBoard = document.querySelector('.playerboard');
  const aiBoard = document.querySelector('.aiboard');

  const resetGrid = () => {
    playerBoard.innerHTML = '';
    aiBoard.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const grid = document.createElement('div');
        grid.dataset.col = j;
        grid.dataset.row = i;
        grid.classList.add('boardgrid');
        playerBoard.appendChild(grid);
        aiBoard.appendChild(grid.cloneNode());
      }
    }
  };

  const initiatePreGame = () => {
    const startBtn = document.querySelector('#startbtn');
    const restartBtn = document.querySelector('#restartbtn');

    startBtn.addEventListener('click', () => {
      newGame();
      restartBtn.style.display = 'block';
      startBtn.style.display = 'none';
    });

    restartBtn.addEventListener('click', () => {
      resetGame();
      restartBtn.style.display = 'none';
      startBtn.style.display = 'block';
    });
  };

  // attack by clicking the grid
  const enableAttack = () => {
    const grids = document.querySelectorAll('.aiboard > .boardgrid');
    grids.forEach((grid) => grid.addEventListener('click', attack, { once: true }));
  };

  const disableGrid = () => {
    const grids = document.querySelectorAll('.aiboard > .boardgrid');
    grids.forEach((grid) => grid.removeEventListener('click', attack));
  };

  const displayBoard = (board) => {
    const boardArray = board.getBoard();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (boardArray[i][j] !== null) {
          const grid = playerBoard.querySelector(`[data-row="${i}"][data-col="${j}"]`);
          grid.classList.add('ship');
        }
      }
    }
  };

  const displayAttack = (player, grid, result) => {
    const board = player === 'player' ? aiBoard : playerBoard;
    const gridbox = board.querySelector(`[data-row="${grid[1]}"][data-col="${grid[0]}"]`);
    if (result) {
      gridbox.classList.add('hit');
    } else {
      gridbox.classList.add('miss');
    }
  };

  const displayMsg = (msg) => {
    const msgContainer = document.querySelector('.msg');

    msgContainer.textContent = msg;
  };

  return {
    resetGrid,
    displayBoard,
    enableAttack,
    displayAttack,
    displayMsg,
    disableGrid,
    initiatePreGame
  };
})();

export default domController;
