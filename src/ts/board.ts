export type Marker = 'O' | 'X';

interface Player {
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
  X: { marker: 'O', score: 0, turn: true },
  O: { marker: 'X', score: 0, turn: false },
};

function swapPlayers() {
  players.X.turn = !players.X.turn;
  players.O.turn = !players.O.turn;
}

export function getPlayerTurn(): string {
  if (players.X.turn) {
    return players.X.marker;
  }
  return players.O.marker;
}

export function getScores(): number[] {
  return [players.X.score, players.O.score];
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

export function playSquare(i: number) {
  const marker = getPlayerTurn();

  const successful = setSquare(i, marker);

  if (successful) {
    swapPlayers();
  }
}
