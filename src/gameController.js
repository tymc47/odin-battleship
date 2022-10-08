import domController from './domController';
import { playerAttack, createPlayer, getBoard, autoAttack } from './player';

const preGame = () => {
  // create player for initial loadout, disable attack
  domController.initiatePreGame();
  createPlayer();
  domController.resetGrid();
  domController.enableSetFleet();
  domController.displayMsg('Press START when you are ready');
};

const newGame = () => {
  console.log('newgame');
  createPlayer();
  domController.resetGrid();
  domController.displayBoard(getBoard('p1'));
  domController.enableAttack();
  domController.displayMsg("Attack by click your opponent's board");
  //change start game button to restart
};

const attack = (event) => {
  const grid = [];
  grid.push(event.currentTarget.dataset.col);
  grid.push(event.currentTarget.dataset.row);

  const result = playerAttack(grid);

  domController.displayAttack('player', grid, result);
  //check if Win
  //AI Auto Attack
  const result2 = autoAttack();
  domController.displayAttack('ai', result2[0], result2[1]);
  //check win
  if (getBoard('player').checkAllSunk() && getBoard('ai').checkAllSunk()) {
    gameEnd('draw');
    return;
  }
  if (getBoard('player').checkAllSunk()) {
    gameEnd('ai');
  } else if (getBoard('ai').checkAllSunk()) {
    gameEnd('player');
  }
};

const resetGame = () => {
  domController.disableGrid();
  domController.resetGrid();
  createPlayer();
  domController.displayBoard(getBoard('p1'));
  domController.displayMsg('Press START when you are ready');
};

const gameEnd = (winner) => {
  let msg = '';
  //announce winner
  if (winner === 'player') {
    msg = 'You win';
  } else if (winner === 'ai') {
    msg = 'You lose';
  } else {
    msg = "It's a draw";
  }

  domController.displayMsg(msg);
  //diable all event listener
  domController.disableGrid();
};

export { newGame, attack, preGame, resetGame };
