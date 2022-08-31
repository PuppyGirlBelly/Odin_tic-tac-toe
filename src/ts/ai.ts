/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved, import/extensions
import { Marker, getBoard, getWinner } from './board';

const MIN = -11;
const MAX = 11;
const USER: Marker = 'X';
const COMP: Marker = 'O';
const EMPTY = '';

/**
 * Gets an array containing the indexes of unplayed squares on a board
 *
 * @param {string[]} board - An array representing game board state
 * @returns {number[]} An array containing indexes of empty spaces on the board
 */
function getEmptySquares(board: string[]): number[] {
  const indices: number[] = [];

  if (board.indexOf(EMPTY) !== -1) {
    board.forEach((v, i) => {
      if (v === EMPTY) indices.push(i);
    });
  }

  return indices;
}

/**
 * Returns a weighted score based on which player is returned from 'getWinner'.
 *
 * The score is weighted depending on how deep within a minimax loop, as moves
 * deeper into the loop will have less weight than a more recent win/loss.
 *
 * @param {string} winner - A string representing a winning player
 * @param {number} depth - # of moves away from the inital game state
 * @returns {string} The weighted score of the current win state
 */
function evaluateScore(winner: string, depth: number): number {
  if (winner === COMP) return 10 - depth;
  if (winner === USER) return -10 + depth;
  return 0;
}

/**
 * A function implementing the minimax algorithm. A recursive function that
 * loops through a tree of each possible branch of the game's state, and each
 * recursion is terminated once a game's win/loss/tie state is reached (i.e. it
 * reaches a leaf on that tree).
 *
 * Within each iteration of the loop, a score is passed through each layer;
 * and on the User's (represented by 'X') the most minimal score is found.
 * Likewise, on the computer's turn (represented by 'O') the most maximal score
 * is found. Bubbling up on each turn until the initial minmax() call is made.
 *
 * @param {string[]} board - A string representing a winning player
 * @param {Marker} player - An 'X' or 'O' to represent User or Computer.
 * @param {number} depth - # of moves away from the inital game state
 * @returns {number} The weighted minimal/maximal score of each branch.
 */
function minimax(board: string[], player: Marker, depth: number): number {
  const currentMoves = getEmptySquares(board);
  const winner = getWinner(board);

  // Check if the current board has a winner, or if a tie is reached.
  if (winner !== EMPTY || currentMoves.length === 0) {
    return evaluateScore(winner, depth);
  }

  const opponent: Marker = player === COMP ? USER : COMP;
  let bestScore = player === COMP ? MIN : MAX;
  let score: number;

  // Iterate through each possible move available.
  currentMoves.forEach((move) => {
    // Perform move, do next minimax iteration, and then undo move
    board[move] = player;
    score = minimax(board, opponent, depth + 1);

    // Set the best score if score is more maximal/minimal for computer/user
    if (
      (player === COMP && score > bestScore) ||
      (player === USER && score < bestScore)
    ) {
      bestScore = score;
    }

    board[move] = EMPTY;
  });

  return bestScore;
}

/**
 * Gets the most optimal move to make, should be unbeatable. Uses minimax
 * algorithm to find the most optimal move, and then sets the best move to make
 * based on the branch that has the highest score.
 *
 * @returns {number} The most optimal move
 */
function smartAiMove(): number {
  const board = getBoard();
  const currentMoves = getEmptySquares(board);
  // Set bestMove to a valid move to satisfy compiler
  let [bestMove] = currentMoves;
  let bestScore = MIN;

  currentMoves.forEach((move) => {
    board[move] = COMP;
    // Each minimax call needs depth to start at '1'. Starting at 0 results in
    // non-optimal play due to scoring to be inaccurate.
    const score = minimax(board, USER, 1);
    board[move] = EMPTY;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  });

  return bestMove;
}

/**
 * Gets a random valid move to perform. Gets a list of all valid moves, and
 * returns a random one.
 *
 * @returns {number} A random move.
 */
function randomAiMove(): number {
  const board = getBoard();
  const squares = getEmptySquares(board);

  return squares[Math.floor(Math.random() * squares.length)];
}

/**
 * External call to get an AI move. The call declares whether the AI should be
 * "smart" or not, and then returns either an optimal move or a random move
 * based on that declaration.
 *
 * @param {boolean} isSmart - declares whether to use unbeatable or random AI
 * @returns {number} A valid move
 */
export default function aiMove(isSmart: boolean): number {
  let move: number = 0;

  if (isSmart) {
    move = smartAiMove();
  } else {
    move = randomAiMove();
  }

  return move;
}
