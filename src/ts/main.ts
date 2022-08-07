type turn = 1 | 2;

interface Board {
  square: string[];
  player: turn;
  p1Score: number;
  p2Score: number;
}

function getBoard() {
  const board: Board = {
    square: ['', '', '', '', '', '', '', '', ''],
    player: 1,
    p1Score: 0,
    p2Score: 0,
  };
  return board;
}

const board = getBoard();
// eslint-disable-next-line no-console
console.log(board);
