// eslint-disable-next-line import/extensions
import * as board from './board';
import displayHandler from './display';

board.resetBoard();
board.setSquare(0, 'X');
board.setSquare(1, 'O');
board.setSquare(2, 'O');
board.setSquare(3, 'O');
board.setSquare(4, 'X');
board.setSquare(5, 'X');
board.setSquare(6, 'O');
board.setSquare(7, 'X');
board.setSquare(8, 'O');

displayHandler();
