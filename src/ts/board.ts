// eslint-disable-next-line no-unused-vars, import/no-unresolved, import/extensions
import aiMove from './ai';

export type Marker = 'O' | 'X';

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

function checkIfEqual(winSet: string[]): boolean {
  return winSet[0] === winSet[1] && winSet[1] === winSet[2] && winSet[0] !== '';
}

function checkForWin(): boolean {
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

function markSquare(i: number): boolean {
  let win = false;

  const marker = getCurrentPlayerMarker();
  const successful = setSquare(i, marker);

  if (successful) {
    win = checkForWin();
    if (win) {
      updateScores();
      return win;
    }
  }

  swapPlayers();
  return win;
}

export function playSquare(i: number): boolean {
  let win = false;

  if (multiplayer) {
    win = markSquare(i);
    return win;
  }

  win = markSquare(i);
  if (win) return win;

  const aiSquare = aiMove();
  win = markSquare(aiSquare);
  return win;
}
