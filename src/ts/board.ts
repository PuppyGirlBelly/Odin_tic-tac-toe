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

function updateScores(): void {
  const player = getCurrentPlayer();
  player.score += 1;
}

export function getBoard(): string[] {
  return squares;
}

export function resetBoard(): void {
  squares = ['', '', '', '', '', '', '', '', ''];
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

export function playSquare(i: number): boolean {
  console.dir(players);
  const marker = getCurrentPlayerMarker();
  let win = false;

  const successful = setSquare(i, marker);

  if (successful) {
    win = checkForWin();
    if (win) updateScores();
    swapPlayers();
  }

  return win;
}
