// eslint-disable-next-line import/no-unresolved, import/extensions
import { Marker, getBoard } from './board';

const MIN = -11;
const MAX = 11;
const USER: Marker = 'X';
const COMP: Marker = 'O';
const EMPTY = '';

function getEmptySquares(board: string[]): number[] {
  const indices: number[] = [];

  if (board.indexOf(EMPTY) !== -1) {
    board.forEach((v, i) => {
      if (v === EMPTY) indices.push(i);
    });
  }

  return indices;
}

function getWinner(board: string[]): string {
  let winner = EMPTY;
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  lines.forEach(([a, b, c]) => {
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
    }
  });

  return winner;
}

function getScore(winner: string, depth: number): number {
  if (winner === COMP) return 10 - depth;
  if (winner === USER) return -10 + depth;
  return 0;
}

function minimax(board: string[], player: Marker, depth: number): number {
  const currentMoves = getEmptySquares(board);
  const winner = getWinner(board);
  const opponent: Marker = player === COMP ? USER : COMP;

  if (winner !== EMPTY || currentMoves.length === 0) {
    return getScore(winner, depth);
  }

  let bestScore = player === COMP ? MIN : MAX;
  let score: number;

  currentMoves.forEach((move) => {
    // eslint-disable-next-line no-param-reassign
    board[move] = player;
    score = minimax(board, opponent, depth + 1);

    if (
      (player === COMP && score > bestScore) ||
      (player === USER && score < bestScore)
    ) {
      bestScore = score;
    }

    // eslint-disable-next-line no-param-reassign
    board[move] = EMPTY;
  });

  return bestScore;
}

export default function aiMove(): number {
  const board = getBoard();
  const currentMoves = getEmptySquares(board);
  let [bestMove] = currentMoves;
  let bestScore = MIN;

  currentMoves.forEach((move) => {
    // eslint-disable-next-line no-param-reassign
    board[move] = COMP;
    const score = minimax(board, USER, 1);
    // eslint-disable-next-line no-param-reassign
    board[move] = EMPTY;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  });

  return bestMove;
}
