import Gameboard from './gameboard';
import Player from './player';

const sampleFleet = {
  submarine: { grid: [3, 1], direction: 'y', length: 3 },
  destroyer: { grid: [6, 2], direction: 'x', length: 2 }
};

const newGame = () => {
  const hero = Player();
  const villan = Player();
  const heroBoard = Gameboard(sampleFleet);
  const villanBoard = Gameboard(sampleFleet);
  let gameEnd = false;
  let currentPlayer = hero;

  while (!gameEnd) {
    if (currentPlayer === hero) {
      console.log('hero');
      let x = prompt('Please enter X');
      let y = prompt('Please enter Y');
      currentPlayer.attack([parseInt(x), parseInt(y)], villanBoard);
      console.log(villanBoard.getBoard());
      if (villanBoard.checkAllSunk()) gameEnd = true;
      currentPlayer = villan;
    } else {
      console.log('villain');
      currentPlayer.autoAttack(heroBoard);
      if (heroBoard.checkAllSunk()) gameEnd = true;
      currentPlayer = hero;
    }
  }
};

newGame();
