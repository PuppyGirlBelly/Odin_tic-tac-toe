!function e(r,t,n){function o(a,c){if(!t[a]){if(!r[a]){var i="function"==typeof require&&require;if(!c&&i)return i(a,!0);if(u)return u(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var f=t[a]={exports:{}};r[a][0].call(f.exports,(function(e){return o(r[a][1][e]||e)}),f,f.exports,e,r,t,n)}return t[a].exports}for(var u="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({1:[function(e,r,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.playSquare=t.getSquare=t.setSquare=t.resetBoard=t.getBoard=t.resetScores=t.getScores=t.getCurrentPlayer=void 0;var n=["","","","","","","","",""],o={X:{marker:"ⵔ",score:0,turn:!0},O:{marker:"🞬",score:0,turn:!1}};function u(e,r){return""===n[e]&&(n[e]=r,!0)}t.getCurrentPlayer=function(){return o.X.turn?o.X:o.O},t.getScores=function(){return[o.X.score,o.O.score]},t.resetScores=function(){o.X.score=0,o.O.score=0},t.getBoard=function(){return n},t.resetBoard=function(){n=["","","","","","","","",""]},t.setSquare=u,t.getSquare=function(e){return n[e]},t.playSquare=function(e){var r="";!0===o.X.turn&&(r="X"),!0===o.O.turn&&(r="O"),u(e,r)&&(o.X.turn=!o.X.turn,o.O.turn=!o.O.turn)}},{}],2:[function(e,r,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.writeInfoToPage=t.writeBoardToPage=void 0;var n=e("./board"),o=document.querySelectorAll(".square");function u(){var e=0,r="";o.forEach((function(t){r=n.getSquare(e),t.textContent=r,e++}))}function a(){var e=document.querySelector(".player1"),r=document.querySelector(".turn"),t=document.querySelector(".player2"),o=n.getScores(),u=o[0],a=o[1];e.textContent=u.toString(),r.textContent=n.getCurrentPlayer().marker,t.textContent=a.toString()}t.writeBoardToPage=u,t.writeInfoToPage=a,t.default=function(){var e;null==(e=document.querySelector(".reset"))||e.addEventListener("click",(function(){n.resetBoard(),n.resetScores(),u()})),u(),a()}},{"./board":1}],3:[function(e,r,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("./board"),o=e("./display");n.resetBoard(),n.setSquare(0,"X"),n.setSquare(1,"O"),n.setSquare(2,"O"),n.setSquare(3,"O"),n.setSquare(4,"X"),n.setSquare(5,"X"),n.setSquare(6,"O"),n.setSquare(7,"X"),n.setSquare(8,"O"),(0,o.default)()},{"./board":1,"./display":2}]},{},[3]);
//# sourceMappingURL=bundle.js.map
