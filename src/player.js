const Player = () => {
  const attackedGrid = [];

  const checkAttack = (gridToAttack) => {
    let attacked = false;
    const [x1, y1] = gridToAttack;
    if (attackedGrid) {
      attackedGrid.forEach((grid) => {
        const [x2, y2] = grid;
        attacked = x1 === x2 && y1 === y2 ? true : false;
      });
    }
    return attacked;
  };

  const attack = (grid, board) => {
    board.receiveAttack(grid);
  };

  const autoAttack = (board) => {
    let gridToAttack = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];

    while (checkAttack(gridToAttack)) {
      gridToAttack = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];
    }
    board.receiveAttack(gridToAttack);
    attackedGrid.push(gridToAttack);
  };

  return {
    attack,
    autoAttack
  };
};

export { Player };
