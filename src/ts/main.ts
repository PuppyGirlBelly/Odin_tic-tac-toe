// eslint-disable-next-line import/extensions
import * as board from './board';
import displayHandler from './display';

board.resetBoard();
board.playSquare(0);

displayHandler();
