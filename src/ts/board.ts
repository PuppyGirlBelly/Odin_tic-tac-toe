// eslint-disable-next-line no-unused-vars, import/no-unresolved, import/extensions
import aiMove from './ai';

export type Marker = 'O' | 'X';
export type GameStatus = 'playing' | 'tie' | 'win';

interface Player {
  name: string;
  marker: Marker;
  score: number;
  turn: boolean;
}

interface Players {
  X: Player;
  O: Player;
}

let isMultiplayer = false;
let aiHardMode = false;
let board = ['', '', '', '', '', '', '', '', ''];
const players: Players = {
  X: { name: '✖', marker: 'X', score: 0, turn: true },
  O: { name: 'ⵔ', marker: 'O', score: 0, turn: false },
};

/**
 * Swaps which player's turn it is.
 */
function swapPlayers(): void {
  players.X.turn = !players.X.turn;
  players.O.turn = !players.O.turn;
}

/**
 * Returns the who is currently playing
 *
 * @returns {Player} Object of the current turn's player.
 */
function getCurrentPlayer(): Player {
  if (players.X.turn) {
    return players.X;
  }
  return players.O;
}

/**
 * Returns the Marker of who is currently playing
 *
 * @returns {Marker} 'X' or 'O' string representing the current turn's player.
 */
export function getCurrentPlayerMarker(): Marker {
  const player = getCurrentPlayer();
  return player.marker;
}

/**
 * Returns an array of the two player's scores.
 *
 * @returns {number[]} An array of player 'X' and player 'O's scores
 */
export function getScores(): number[] {
  return [players.X.score, players.O.score];
}

/**
 * Sets the stored names of the two players
 *
 * @param {string[]} names - An array of two strings, 'X' and 'O' new names respectively
 */
export function setPlayerNames(names: string[]): void {
  [players.X.name, players.O.name] = names;
}

/**
 * Returns the names of the two players
 *
 * @returns {string[]} An array of two strings, 'X' and 'O' names respectively
 */
export function getPlayerNames(): string[] {
  return [players.X.name, players.O.name];
}

/**
 * Sets whether multiplayer is active.
 *
 * @param {boolean} bool - True for multiplayer, false for single player
 */
export function setMultiplayer(bool: boolean): void {
  isMultiplayer = bool;
}

/**
 * Sets the AI difficulty
 *
 * @param {boolean} bool - True for hard AI, false for easy AI
 */
export function setAiToHard(bool: boolean): void {
  aiHardMode = bool;
}

/**
 * Increments the current player's score
 *
 * @param {Player} player - the player to score to increment
 */
function incrementScore(player: Marker): void {
  players[player].score += 1;
}

/**
 * returns a shallow copy of the current board
 *
 * @returns {string[]} a copy of the game board
 */
export function getBoard(): string[] {
  return [...board];
}

/**
 * Empties the current board and sets the current player back to 'X'
 */
export function resetBoard(): void {
  board = ['', '', '', '', '', '', '', '', ''];
  players.X.turn = true;
  players.O.turn = false;
}

/**
 * Empties the current board and sets the current player back to 'X', and sets
 * both scores to 0
 */
export function resetGame(): void {
  resetBoard();
  players.X.score = 0;
  players.O.score = 0;
}

/**
 * Gets the square at the given index
 *
 * @param {number} i - Index of the square you want.
 * @returns {string} The marker on the square. Either 'X', 'O', or ''.
 */
export function getSquare(i: number): string {
  return board[i];
}

/**
 * Sets the value of the square at the given index; returns 'true' if
 * successful or 'false' if the square is invalid.
 *
 * @param {number} i - Index of the square you want.
 * @param {Marker} mark - The value to set at the square.
 * @returns {string} The marker on the square. Either 'X', 'O', or ''.
 */
function setSquare(i: number, mark: Marker): boolean {
  if (getSquare(i) === '') {
    board[i] = mark;
    return true;
  }
  return false;
}

/**
 * Checks each 'line' of the board to see if all three squares is filled by a
 * player. Returns the marker of the player if a winner is found; or '' if no
 * winner is found.
 *
 * @param {string[]} gameBoard - A 1D array representing the game board
 * @returns {string} Marker of the winner, or '' if no winner is found.
 */
export function getWinner(gameBoard: string[]): string {
  let winner = '';
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
    if (
      gameBoard[a] !== '' &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      winner = gameBoard[a];
    }
  });

  return winner;
}

/**
 * checks if the board has any empty spaces, and then returns true or false
 *
 * @returns {boolean} true if the board is full, false if not
 */
export function boardIsFull(): boolean {
  return board.indexOf('') === -1;
}

/**
 * Plays a spot on the board from a given index, and if successful, then it
 * will return the status of the game.
 *
 * @param {number} i - Index of the square to play on.
 * @returns {GameStatus} Status of the game; 'playing', 'win', or 'tie'.
 */
function playSquare(i: number): GameStatus {
  let state: GameStatus = 'playing';

  const marker = getCurrentPlayerMarker();
  const successful = setSquare(i, marker);

  if (successful) {
    const winner = getWinner(board);
    if (winner !== '') {
      state = 'win';
      incrementScore(winner as Marker);
      return state;
    }
    if (boardIsFull()) {
      state = 'tie';
      return state;
    }
  }

  swapPlayers();
  return state;
}

/**
 * Plays a spot on the board from a given index, and if single player then it
 * will perform an AI's move as well.
 *
 * @param {number} i - Index of the square to play on.
 * @returns {GameStatus} Status of the game; 'playing', 'win', or 'tie'.
 */
export function takeTurn(i: number): GameStatus {
  let state: GameStatus = 'playing';

  if (isMultiplayer) {
    state = playSquare(i);
    return state;
  }

  state = playSquare(i);
  if (state === 'win' || state === 'tie') return state;

  const aiSquare = aiMove(aiHardMode);
  state = playSquare(aiSquare);
  return state;
}
