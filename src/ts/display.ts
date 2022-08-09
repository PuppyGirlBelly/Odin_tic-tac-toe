import * as board from './board';

const squares = document.querySelectorAll<HTMLElement>('.square');

export function writeBoardToPage(): void {
  let counter = 0;
  let marker: string = '';

  squares.forEach((square) => {
    marker = board.getSquare(counter);
    // eslint-disable-next-line no-param-reassign
    square.textContent = marker;
    // eslint-disable-next-line no-plusplus
    counter++;
  });
}

export function writeInfoToPage(): void {
  const p1 = document.querySelector('.player1');
  const turn = document.querySelector('.turn');
  const p2 = document.querySelector('.player2');
  const [p1score, p2score] = board.getScores();

  p1.textContent = p1score.toString();
  turn.textContent = board.getCurrentPlayer().marker;
  p2.textContent = p2score.toString();
}

function setResetButton(): void {
  const reset = document.querySelector('.reset');

  reset?.addEventListener('click', () => {
    board.resetBoard();
    writeBoardToPage();
  });
}

export default function displayHandler(): void {
  setResetButton();
  writeBoardToPage();
  writeInfoToPage();
}
