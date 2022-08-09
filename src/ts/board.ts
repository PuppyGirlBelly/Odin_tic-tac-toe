export type Marker = 'ⵔ' | '🞬';

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
  X: { marker: 'ⵔ', score: 0, turn: true },
  O: { marker: '🞬', score: 0, turn: false },
};

function swapPlayers() {
  players.X.turn = !players.X.turn;
  players.O.turn = !players.O.turn;
}

export function getPlayerTurn(): Player {
  if (players.X.turn) {
    return players.X;
  }
  return players.O;
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

export function setSquare(i: number, v: string): boolean {
  if (squares[i] === '') {
    squares[i] = v;
    return true;
  }
  return false;
}

export function getSquare(i: number): string {
  return squares[i];
}

export function playSquare(i: number) {
  let marker = '';
  if (players.X.turn === true) marker = 'X';
  if (players.O.turn === true) marker = 'O';

  const successful = setSquare(i, marker);

  if (successful) {
    swapPlayers();
  }
}
