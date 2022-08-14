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

export function writeInfoToPage(): void {
  const p1 = document.querySelector('.player1');
  const turn = document.querySelectorAll('.turn');
  const p2 = document.querySelector('.player2');

  const [p1score, p2score] = board.getScores();
  const marker = board.getCurrentPlayerMarker() === 'X' ? '✖' : 'ⵔ ';

  if (p1 !== null && turn !== null && p2 !== null) {
    p1.textContent = p1score.toString();
    turn.forEach((e) => {
      e.textContent = marker;
    });
    p2.textContent = p2score.toString();
  }
}

function resetBoardClasses(): void {
  squares.forEach((square) => {
    square.classList.remove('X', 'O');
  });
}

function displayWin(): void {
  // TODO: Fix players swapping before displaying win page.
  const winScreen = document.getElementById('win-screen');
  if (winScreen != null) {
    winScreen.style.display = 'block';
  }
}

function hideWin(): void {
  const winScreen = document.getElementById('win-screen');
  if (winScreen != null) {
    winScreen.style.display = 'none';
  }
}

function setSquareEventHandlers(): void {
  let isWin = false;

  squares.forEach((square) => {
    square.addEventListener('click', () => {
      const index: number = Number(square.id);
      isWin = board.playSquare(index);
      if (isWin) {
        writeBoardToPage();
        displayWin();
      } else {
        writeBoardToPage();
        writeInfoToPage();
      }
    });
  });
}

function setResetButton(): void {
  const reset = document.querySelectorAll('.reset');

  reset?.forEach((e) => {
    e.addEventListener('click', () => {
      board.resetBoard();
      resetBoardClasses();
      writeBoardToPage();
      writeInfoToPage();
      hideWin();
    });
  });
}

export default function displayHandler(): void {
  setResetButton();
  setSquareEventHandlers();
  writeBoardToPage();
  writeInfoToPage();
}
