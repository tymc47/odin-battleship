import domController from './domController';
import { playerAttack, getBoard, autoAttack, setFleet } from './player';

const preGame = () => {
  domController.initiatePreGame();
  domController.resetGrid();
  setFleet();
  domController.displayMsg('Press START when you are ready');
};

const playerTurn = (event) => {
  const grid = [event.currentTarget.dataset.col, event.currentTarget.dataset.row];

  const result = playerAttack(grid);

  domController.displayAttack('player', grid, result);

  const result2 = autoAttack();

  domController.displayAttack('ai', result2[0], result2[1]);
  //check win
  if (getBoard('player').checkAllSunk() && getBoard('ai').checkAllSunk()) {
    domController.disableAttack();
    gameEnd('draw');
    return;
  }
  if (getBoard('player').checkAllSunk()) {
    domController.disableAttack();
    gameEnd('ai');
  } else if (getBoard('ai').checkAllSunk()) {
    domController.disableAttack();
    gameEnd('player');
  }
};

const resetGame = () => {
  domController.disableAttack();
  preGame();
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
  domController.disableAttack();
};

export { playerTurn, preGame, resetGame };
