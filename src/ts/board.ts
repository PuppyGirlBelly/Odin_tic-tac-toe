// eslint-disable-next-line no-unused-vars, import/no-unresolved, import/extensions
import aiMove from './ai';

type Marker = 'O' | 'X';
export type GameState = 'playing' | 'tie' | 'win';

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

let multiplayer = false;
let squares = ['', '', '', '', '', '', '', '', ''];
const players: Players = {
  X: { name: '✖', marker: 'X', score: 0, turn: true },
  O: { name: 'ⵔ', marker: 'O', score: 0, turn: false },
};

function swapPlayers() {
  players.X.turn = !players.X.turn;
  players.O.turn = !players.O.turn;
}

function getCurrentPlayer(): Player {
  if (players.X.turn) {
    return players.X;
  }
  return players.O;
}

export function getCurrentPlayerMarker(): string {
  const player = getCurrentPlayer();
  return player.marker;
}

export function getScores(): number[] {
  return [players.X.score, players.O.score];
}

export function setPlayerNames(names: string[]): void {
  [players.X.name, players.O.name] = names;
}

export function getPlayerNames(): string[] {
  return [players.X.name, players.O.name];
}

export function setMultiplayer(bool: boolean): void {
  multiplayer = bool;
}

function updateScores(): void {
  const player = getCurrentPlayer();
  player.score += 1;
}

export function getBoard(): string[] {
  return squares;
}

export function resetBoard(): void {
  squares = ['', '', '', '', '', '', '', '', ''];
  players.X.turn = true;
  players.O.turn = false;
}

export function resetGame(): void {
  squares = ['', '', '', '', '', '', '', '', ''];
  players.X.turn = true;
  players.X.score = 0;
  players.O.turn = false;
  players.O.score = 0;
}

export function getSquare(i: number): string {
  return squares[i];
}

function setSquare(i: number, mark: string): boolean {
  if (getSquare(i) === '') {
    squares[i] = mark;
    return true;
  }
  return false;
}

function checkIfEqual(line: string[]): boolean {
  return line[0] === line[1] && line[1] === line[2] && line[0] !== '';
}

function hasWinner(): boolean {
  const lines = [
    [squares[0], squares[1], squares[2]],
    [squares[3], squares[4], squares[5]],
    [squares[6], squares[7], squares[8]],
    [squares[0], squares[3], squares[6]],
    [squares[1], squares[4], squares[7]],
    [squares[2], squares[5], squares[8]],
    [squares[0], squares[4], squares[8]],
    [squares[2], squares[4], squares[6]],
  ];

  return lines.some(checkIfEqual);
}

function hasTie(): boolean {
  return squares.indexOf('') === -1;
}

function markSquare(i: number): GameState {
  let state: GameState = 'playing';

  const marker = getCurrentPlayerMarker();
  const successful = setSquare(i, marker);

  if (successful) {
    if (hasWinner()) {
      state = 'win';
      updateScores();
      return state;
    }
    if (hasTie()) {
      state = 'tie';
      return state;
    }
  }

  swapPlayers();
  return state;
}

export function playSquare(i: number): GameState {
  let state: GameState = 'playing';

  if (multiplayer) {
    state = markSquare(i);
    return state;
  }

  state = markSquare(i);
  if (state === 'win' || state === 'tie') return state;

  const aiSquare = aiMove();
  state = markSquare(aiSquare);
  return state;
}
