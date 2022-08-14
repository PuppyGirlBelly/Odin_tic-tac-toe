// eslint-disable-next-line import/no-unresolved, import/extensions
import * as board from './board';

const squares = document.querySelectorAll<HTMLElement>('.square');

function displayModal(id: string): void {
  // TODO: Fix players swapping before displaying win page.
  const modal = document.getElementById(id);
  if (modal != null) {
    modal.style.display = 'block';
  }
}

function hideModal(id: string): void {
  const modal = document.getElementById(id);
  if (modal != null) {
    modal.style.display = 'none';
  }
}

function writeBoardToPage(): void {
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

function writeInfoToPage(): void {
  const p1Label = document.querySelector('.p1-label');
  const p1Info = document.querySelector('.p1-info');
  const turn = document.querySelectorAll('.turn-info');
  const p2Label = document.querySelector('.p2-label');
  const p2Info = document.querySelector('.p2-info');

  const [p1Score, p2Score] = board.getScores();
  const [p1Name, p2Name] = board.getPlayerNames();
  const player = board.getCurrentPlayerMarker();
  const marker = player === 'X' ? '✖' : 'ⵔ ';

  p1Label!.textContent = `${p1Name} Score`;
  p1Info!.textContent = p1Score.toString();
  turn[0].parentElement!.classList.value = `${player} infobox`;
  turn.forEach((e) => {
    e.textContent = marker;
  });
  p2Label!.textContent = `${p2Name} Score`;
  p2Info!.textContent = p2Score.toString();
}

function resetBoardClasses(): void {
  squares.forEach((square) => {
    square.classList.remove('X', 'O');
  });
}

function setSquareEventHandlers(): void {
  let isWin = false;

  squares.forEach((square) => {
    square.addEventListener('click', () => {
      const index: number = Number(square.id);
      isWin = board.playSquare(index);
      if (isWin) {
        writeBoardToPage();
        displayModal('win-screen');
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
      hideModal('win-screen');
    });
  });
}

function setNameSubmitButton(): void {
  const submit = document.querySelector('.name-submit');

  submit!.addEventListener('click', () => {
    const p1Name = (<HTMLInputElement>document.getElementById('p1-name')).value;
    const p2Name = (<HTMLInputElement>document.getElementById('p2-name')).value;
    board.setPlayerNames([p1Name, p2Name]);
    writeInfoToPage();
    hideModal('names-screen');
  });
}

export function displayNames(): void {
  displayModal('names-screen');
}

export function displayHandler(): void {
  setResetButton();
  setNameSubmitButton();
  setSquareEventHandlers();
  writeBoardToPage();
  writeInfoToPage();
}
