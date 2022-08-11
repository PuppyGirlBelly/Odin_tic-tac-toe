// eslint-disable-next-line import/extensions
import * as board from './board';
import displayHandler from './display';

board.resetBoard();
board.playSquare(0);
board.playSquare(1);
board.playSquare(3);

displayHandler();
