import domController from './domController';
import { playerAttack, getBoard, autoAttack, setFleet, resetFleet } from './player';

const preGame = () => {
  domController.initiatePreGame();
  domController.resetGrid();
  resetFleet();
  setFleet();
  domController.displayMsg('Click on the left plane to set your Fleet');
};

const playerTurn = (event) => {
  const grid = [event.currentTarget.dataset.col, event.currentTarget.dataset.row];

  const result = playerAttack(grid);

  domController.displayAttack('player', grid, result);

  const result2 = autoAttack();
  console.log(result2);
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

const gameEnd = (winner) => {
  let msg = '';
  //announce winner
  if (winner === 'player') {
    msg = 'You win!';
  } else if (winner === 'ai') {
    msg = 'You lose!';
  } else {
    msg = "It's a draw!";
  }

  domController.displayMsg(msg);
  //diable all event listener
  domController.disableAttack();
};

const resetGame = () => {
  domController.resetGrid();
  resetFleet();
  setFleet();
  domController.displayMsg('Click on the left plane to set your Fleet');
};

//Initial load
preGame();

export { playerTurn, preGame, resetGame };
