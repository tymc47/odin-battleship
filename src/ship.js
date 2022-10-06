const Ship = (length) => {
  let damage = 0;
  const hit = () => {
    damage += 1;
  };
  const isSunk = () => length === damage;
  return { hit, isSunk };
};

export default Ship;
