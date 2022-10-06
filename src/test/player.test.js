import { Player } from '../player';
import Gameboard from '../gameboard';

const player = Player();
const AI = Player();
const playerBoard = Gameboard({
  carrier: { grid: [4, 5], direction: 'y', length: 5 }
});

const AIBoard = Gameboard({
  carrier: { grid: [1, 1], direction: 'y', length: 5 }
});

beforeEach(() => {
  jest
    .spyOn(global.Math, 'random')
    .mockReturnValueOnce('0.5')
    .mockReturnValueOnce('0.5')
    .mockReturnValueOnce('0.5')
    .mockReturnValueOnce('0.5')
    .mockReturnValueOnce('1')
    .mockReturnValueOnce('1');
});

afterEach(() => {
  jest.spyOn(global.Math, 'random').mockRestore();
});

test('player attack', () => {
  player.attack([1, 1], AIBoard);
  player.attack([4, 5], AIBoard);
  expect(AIBoard.getBoard()[1]).toEqual([null, true, null, null, null, null, null, null, null, null]);
  expect(AIBoard.getBoard()[5]).toEqual([null, 'carrier', null, null, false, null, null, null, null, null]);
});

test.only('AI Attack', () => {
  AI.autoAttack(playerBoard);
  AI.autoAttack(playerBoard);
  expect(playerBoard.getBoard()).toEqual([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, false, null, null, null, null, null],
    [null, null, null, null, 'carrier', null, null, null, null, null],
    [null, null, null, null, 'carrier', null, null, null, null, null],
    [null, null, null, null, 'carrier', null, null, null, null, null],
    [null, null, null, null, 'carrier', null, null, null, null, null],
    [null, null, null, null, 'carrier', null, null, null, null, false]
  ]);
});
