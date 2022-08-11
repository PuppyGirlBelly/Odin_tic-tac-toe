// eslint-disable-next-line import/no-unresolved, import/extensions
import * as board from './board';

const squares = document.querySelectorAll<HTMLElement>('.square');

export function writeBoardToPage(): void {
  let counter = 0;
  let marker: string = '';

  squares.forEach((square) => {
    marker = board.getSquare(counter);
    if (marker !== '') {
      square.classList.add(`${marker}`);
    }
    counter += 1;
  });
}

function resetBoardClasses(): void {
  squares.forEach((square) => {
    square.classList.remove('X', 'O');
  });
}

export function writeInfoToPage(): void {
  const p1 = document.querySelector('.player1');
  const turn = document.querySelector('.turn');
  const p2 = document.querySelector('.player2');

  const [p1score, p2score] = board.getScores();
  const marker = board.getPlayerTurn() === 'X' ? '🞬 ' : 'ⵔ ';

  if (p1 !== null && turn !== null && p2 !== null) {
    p1.textContent = p1score.toString();
    turn.textContent = marker;
    p2.textContent = p2score.toString();
  }
}

function setResetButton(): void {
  const reset = document.querySelector('.reset');

  reset?.addEventListener('click', () => {
    board.resetBoard();
    resetBoardClasses();
    writeBoardToPage();
  });
}

export default function displayHandler(): void {
  setResetButton();
  writeBoardToPage();
  writeInfoToPage();
}
