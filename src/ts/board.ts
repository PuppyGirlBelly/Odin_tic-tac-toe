type Marker = 'X' | 'O';

interface Player {
  marker: Marker;
  score: number;
  turn: boolean;
}

interface Players {
  X: Player;
  O: Player;
}

const squares = ['', '', '', '', '', '', '', '', ''];
const players: Players = {
  X: { marker: 'X', score: 0, turn: true },
  O: { marker: 'O', score: 0, turn: false },
};

function swapPlayers() {
  players.X.turn = !players.X.turn;
  players.O.turn = !players.O.turn;
}

export function getPlayerTurn() {
  if (players.X.turn) {
    return players.X;
  }
  return players.O;
}

export function getScores() {
  return [players.X.score, players.O.score];
}

export function getBoard(): string[] {
  return squares;
}

export function getSquare(i: number) {
  return squares[i];
}

export function setSquare(i: number) {
  let marker: string;
  if (players.X.turn === true) marker = 'X';
  if (players.O.turn === true) marker = 'O';

  if (squares[i] === '') {
    squares[i] = marker;
    swapPlayers();
  }
}
