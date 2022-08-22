import { getBoard } from './board';

function getRandomElement<Type>(arr: Array<Type>): Type {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getValidSquares(): number[] {
  const board = getBoard();

  const indices = [];
  let i = board.indexOf('');

  while (i !== -1) {
    indices.push(i);
    i = board.indexOf('', i + 1);
  }

  return indices;
}

export default function aiMove(): number {
  const moves = getValidSquares();
  return getRandomElement(moves);
}
