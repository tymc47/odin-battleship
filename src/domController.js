import { newGame, attack, resetGame } from './gameController';
import { getBoard, placeShip, resetFleet, rotateFleet, setFleet } from './player';

const domController = (() => {
  const playerBoard = document.querySelector('.playerboard');
  const aiBoard = document.querySelector('.aiboard');
  let currentBoardArray = [];

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

  const setShip = (ship) => {
    const grids = playerBoard.querySelectorAll('.boardgrid');

    const getShipGrid = (event) => {
      const x = event.currentTarget.dataset.col;
      const y = event.currentTarget.dataset.row;
      const shipGrid = [];
      for (let i = 0; i < ship.shipLength; i++) {
        let row, col;
        if (ship.direction === 'x') {
          row = parseInt(y);
          col = parseInt(x) + i;
        } else {
          row = parseInt(y) + i;
          col = parseInt(x);
        }
        if (row > 9 || col > 9) continue;
        shipGrid.push([col, row]);
      }
      return shipGrid;
    };

    const hoverEffect = (event) => {
      const array = getShipGrid(event);

      array.forEach((grid) => {
        const target = playerBoard.querySelector(`[data-row="${grid[1]}"][data-col="${grid[0]}"]`);
        target.classList.toggle('shiphover');
      });
    };

    const placement = (event) => {
      const array = getShipGrid(event);
      if (!placeShip(array, ship)) return;

      array.forEach((grid) => {
        const target = playerBoard.querySelector(`[data-row="${grid[1]}"][data-col="${grid[0]}"]`);
        target.classList.add('ship');
      });

      grids.forEach((grid) => {
        grid.removeEventListener('click', placement);
        grid.removeEventListener('mouseover', hoverEffect);
        grid.removeEventListener('mouseout', hoverEffect);
      });

      setFleet();
    };

    //if grid is set using random button, remove all listeners

    grids.forEach((grid) => {
      grid.addEventListener('mouseover', hoverEffect);
      grid.addEventListener('mouseout', hoverEffect);
      grid.addEventListener('click', placement);
    });
  };

  const initiatePreGame = () => {
    const startBtn = document.querySelector('#startbtn');
    const restartBtn = document.querySelector('#restartbtn');
    const rotateBtn = document.querySelector('#rotatebtn');
    const randomBtn = document.querySelector('#randombtn');
    const resetBtn = document.querySelector('#resetbtn');

    startBtn.addEventListener('click', () => {
      //start check
      enableAttack();
      restartBtn.style.display = 'block';
      startBtn.style.display = 'none';
      rotateBtn.disabled = true;
      resetBtn.disabled = true;
      randomBtn.disabled = true;
    });

    restartBtn.addEventListener('click', () => {
      resetGame();
      restartBtn.style.display = 'none';
      startBtn.style.display = 'block';
    });

    rotateBtn.addEventListener('click', rotateFleet);

    randomBtn.addEventListener('click', () => {
      resetGrid();
      setFleet(true);
      setShip();
      displayBoard(getBoard());
      const grids = playerBoard.querySelectorAll('.boardgrid');
      playerBoard.innerHTML = '';
      grids.forEach((grid) => playerBoard.appendChild(grid.cloneNode()));
    });

    resetBtn.addEventListener('click', () => {
      resetGrid();
      resetFleet();
      setFleet();
    });
  };

  // attack by clicking the grid
  const enableAttack = () => {
    const grids = document.querySelectorAll('.aiboard > .boardgrid');
    grids.forEach((grid) => grid.addEventListener('click', attack, { once: true }));
  };

  const disableAttack = () => {
    const grids = document.querySelectorAll('.aiboard > .boardgrid');
    grids.forEach((grid) => grid.removeEventListener('click', attack));
  };

  const displayBoard = (board) => {
    currentBoardArray = board.getBoard();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (currentBoardArray[i][j] !== null) {
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
    disableAttack,
    initiatePreGame,
    setShip
  };
})();

export default domController;
