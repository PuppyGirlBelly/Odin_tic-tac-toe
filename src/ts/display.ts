// eslint-disable-next-line import/no-unresolved, import/extensions
import { GameStatus } from './board';
import * as board from './board';

/**
 * Displays an element with the declared ID
 *
 * @param {type} id - ID selector of the element you want to show
 */
function displayElement(id: string): void {
  const modal = document.getElementById(id);
  if (modal != null) {
    modal.style.display = 'block';
  }
}

/**
 * Hides an element with the declared ID
 *
 * @param {type} id - ID selector of the element you want to hide
 */
function hideElement(id: string): void {
  const modal = document.getElementById(id);
  if (modal != null) {
    modal.style.display = 'none';
  }
}

/**
 * Write board to page, gets the associated squares of the board from board.ts
 * and then adds a class to the square on the page that's associated with the
 * maker; using the CSS class to display it on the page.
 */
function writeBoardToPage(): void {
  const squares = document.querySelectorAll<HTMLElement>('.square');
  let marker: string = '';

  squares.forEach((square, i) => {
    marker = board.getSquare(i);
    if (marker !== '') {
      square.classList.add(`${marker}`);
    }
  });
}

/**
 * Iterates through all of the squares on the page, and removes any player
 * marker classes from them.
 */
function resetBoardClasses(): void {
  const squares = document.querySelectorAll<HTMLElement>('.square');

  squares.forEach((square) => {
    square.classList.remove('X', 'O');
  });
}

/**
 * Gets the 'X' and 'O' player's label, scores, and current player's marker and
 * writes the information on the UI at the top of the page.
 */
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

  p1Label!.textContent = `${p1Name}\nScore`;
  p1Info!.textContent = p1Score.toString();
  turn[0].parentElement!.classList.value = `${player} infobox`;
  turn.forEach((e) => {
    e.textContent = marker;
  });
  p2Label!.textContent = `${p2Name}\nScore`;
  p2Info!.textContent = p2Score.toString();
}

/**
 * Adds event handlers to the squares on the page. On each click, the index of
 * the square is grabbed, and the square is played on the board. Writing the
 * new board to the screen as well as turn info. Finally checking if a win or
 * tie modal needs to be displayed.
 */
function setSquareEventHandlers(): void {
  const squares = document.querySelectorAll<HTMLElement>('.square');
  let win: GameStatus;

  squares.forEach((square) => {
    square.addEventListener('click', () => {
      const index: number = Number(square.id);
      win = board.takeTurn(index);
      writeInfoToPage();
      writeBoardToPage();

      if (win === 'win') displayElement('win-screen');
      if (win === 'tie') displayElement('tie-screen');
    });
  });
}

/**
 * Sets an event listener for the 'new game' button on win and ties screens.
 * When the button is clicked, the board is reset and new player stats are
 * written to the screen. Finally hiding the win/tie modal
 */
function setNewGameButton(): void {
  const newGame = document.querySelectorAll('.new-game');

  newGame!.forEach((button) => {
    button.addEventListener('click', () => {
      board.resetBoard();
      resetBoardClasses();
      writeBoardToPage();
      writeInfoToPage();
      hideElement('win-screen');
      hideElement('tie-screen');
    });
  });
}

/**
 * Adds an event listener on the 'Start Game' button on the name screen. First
 * it gets the player names entered and the info about the number of players
 * and difficulty of AI.
 *
 * Then it sets that info onto the board module; before hiding the name modal.
 */
function setNameSubmitButton(): void {
  const submit = document.querySelector('.name-submit');

  submit!.addEventListener('click', () => {
    const p1Name = (<HTMLInputElement>document.getElementById('p1-name')).value;
    const p2Name = (<HTMLInputElement>document.getElementById('p2-name')).value;
    const multi = document.getElementById('multi-player') as HTMLInputElement;
    const easy = document.getElementById('easy-mode') as HTMLInputElement;
    const hard = document.getElementById('hard-mode') as HTMLInputElement;

    if (multi!.checked) {
      board.setMultiplayer(true);
    } else {
      board.setMultiplayer(false);
      if (easy!.checked) board.setAiToHard(false);
      if (hard!.checked) board.setAiToHard(true);
    }
    board.setPlayerNames([p1Name, p2Name]);
    writeInfoToPage();
    hideElement('names-screen');
  });
}

/**
 * Sets an event listener onto the reset button. It resets the state of the
 * game, as well as the classes and info on the page. Before displaying the
 * name modal again.
 */
function setResetButton(): void {
  const newGame = document.querySelector('.reset');

  newGame!.addEventListener('click', () => {
    board.resetGame();
    resetBoardClasses();
    writeBoardToPage();
    writeInfoToPage();
    displayElement('names-screen');
  });
}

/**
 * Sets a toggle on the 'O' (or Player 2) name input. If a single-player game
 * is selected, the name is hidden. If a two-player game is selected, then the
 * element is shown.
 */
function toggleNameInput(): void {
  const multi = document.getElementById('multi-player') as HTMLInputElement;
  const p2NameInput = document.getElementById('p2-input');

  if (multi!.checked) {
    p2NameInput!.style.display = 'block';
  } else {
    p2NameInput!.style.display = 'none';
  }
}

/**
 * Sets a name toggle on the player screen's radio buttons.
 */
function setPlayerSelectHandler(): void {
  const radioButtons = document.querySelectorAll('input[name="player-select"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener('click', toggleNameInput);
  });
}

/**
 * Sets the event handlers on the page, and then displays the board and info.
 */
export default function displayHandler(): void {
  setNewGameButton();
  setNameSubmitButton();
  setResetButton();
  setSquareEventHandlers();
  setPlayerSelectHandler();
  writeBoardToPage();
  writeInfoToPage();
}
