!function e(n,t,r){function u(a,c){if(!t[a]){if(!n[a]){var i="function"==typeof require&&require;if(!c&&i)return i(a,!0);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var s=t[a]={exports:{}};n[a][0].call(s.exports,(function(e){return u(n[a][1][e]||e)}),s,s.exports,e,n,t,r)}return t[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)u(r[a]);return u}({1:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("./board"),u="X",o="O",a="";function c(e){var n=[];return-1!==e.indexOf(a)&&e.forEach((function(e,t){e===a&&n.push(t)})),n}function i(e,n,t){var r=c(e),l=function(e){var n=a;return[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].forEach((function(t){var r=t[0],u=t[1],o=t[2];null!==e[r]&&e[r]===e[u]&&e[r]===e[o]&&(n=e[r])})),n}(e),s=n===o?u:o;if(l!==a||0===r.length)return function(e,n){return e===o?10-n:e===u?-10+n:0}(l,t);var f,d=n===o?-11:11;return r.forEach((function(r){e[r]=n,f=i(e,s,t+1),(n===o&&f>d||n===u&&f<d)&&(d=f),e[r]=a})),d}t.default=function(){var e=(0,r.getBoard)(),n=c(e),t=n[0],l=-11;return n.forEach((function(n){e[n]=o;var r=i(e,u,1);e[n]=a,r>l&&(l=r,t=n)})),t}},{"./board":2}],2:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.playSquare=t.setSquare=t.getSquare=t.resetGame=t.resetBoard=t.getBoard=t.setMultiplayer=t.getPlayerNames=t.setPlayerNames=t.getScores=t.getCurrentPlayerMarker=void 0;var r=e("./ai"),u=!1,o=["","","","","","","","",""],a={X:{name:"✖",marker:"X",score:0,turn:!0},O:{name:"ⵔ",marker:"O",score:0,turn:!1}};function c(){return a.X.turn?a.X:a.O}function i(){return c().marker}function l(e){return o[e]}function s(e,n){return""===l(e)&&(o[e]=n,!0)}function f(e){var n,t="playing";if(s(e,i())){if(""!==(n="",[[o[0],o[1],o[2]],[o[3],o[4],o[5]],[o[6],o[7],o[8]],[o[0],o[3],o[6]],[o[1],o[4],o[7]],[o[2],o[5],o[8]],[o[0],o[4],o[8]],[o[2],o[4],o[6]]].forEach((function(e){e.every((function(n){return n===e[0]&&""!==n}))&&(n=e[0])})),n))return t="win",c().score+=1,t;if(-1===o.indexOf(""))return t="tie"}return a.X.turn=!a.X.turn,a.O.turn=!a.O.turn,t}t.getCurrentPlayerMarker=i,t.getScores=function(){return[a.X.score,a.O.score]},t.setPlayerNames=function(e){a.X.name=e[0],a.O.name=e[1]},t.getPlayerNames=function(){return[a.X.name,a.O.name]},t.setMultiplayer=function(e){u=e},t.getBoard=function(){return o},t.resetBoard=function(){o=["","","","","","","","",""],a.X.turn=!0,a.O.turn=!1},t.resetGame=function(){o=["","","","","","","","",""],a.X.turn=!0,a.X.score=0,a.O.turn=!1,a.O.score=0},t.getSquare=l,t.setSquare=s,t.playSquare=function(e){var n="playing";return u?n=f(e):"win"===(n=f(e))||"tie"===n?n:n=f((0,r.default)())}},{"./ai":1}],3:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.displayHandler=t.displayNames=void 0;var r=e("./board"),u=document.querySelectorAll(".square");function o(e){var n=document.getElementById(e);null!=n&&(n.style.display="block")}function a(e){var n=document.getElementById(e);null!=n&&(n.style.display="none")}function c(){var e=0,n="";u.forEach((function(t){""!==(n=r.getSquare(e))&&t.classList.add("".concat(n)),e+=1}))}function i(){var e=document.querySelector(".p1-label"),n=document.querySelector(".p1-info"),t=document.querySelectorAll(".turn-info"),u=document.querySelector(".p2-label"),o=document.querySelector(".p2-info"),a=r.getScores(),c=a[0],i=a[1],l=r.getPlayerNames(),s=l[0],f=l[1],d=r.getCurrentPlayerMarker(),y="X"===d?"✖":"ⵔ ";e.textContent="".concat(s," Score"),n.textContent=c.toString(),t[0].parentElement.classList.value="".concat(d," infobox"),t.forEach((function(e){e.textContent=y})),u.textContent="".concat(f," Score"),o.textContent=i.toString()}function l(){u.forEach((function(e){e.classList.remove("X","O")}))}function s(){var e=document.getElementById("multi-player"),n=document.getElementById("p2-input");e.checked?(n.style.display="block",r.setMultiplayer(!0)):(n.style.display="none",r.setMultiplayer(!1))}t.displayNames=function(){o("names-screen")},t.displayHandler=function(){var e;document.querySelectorAll(".new-game").forEach((function(e){e.addEventListener("click",(function(){r.resetBoard(),l(),c(),i(),a("win-screen"),a("tie-screen")}))})),document.querySelector(".name-submit").addEventListener("click",(function(){var e=document.getElementById("p1-name").value,n=document.getElementById("p2-name").value;r.setPlayerNames([e,n]),i(),a("names-screen")})),document.querySelector(".reset").addEventListener("click",(function(){r.resetGame(),l(),c(),i(),o("names-screen")})),e="playing",u.forEach((function(n){n.addEventListener("click",(function(){var t=Number(n.id);e=r.playSquare(t),i(),c(),"win"===e&&o("win-screen"),"tie"===e&&o("tie-screen")}))})),document.querySelectorAll('input[name="player-select"]').forEach((function(e){e.addEventListener("click",s)})),c(),i()}},{"./board":2}],4:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("./display");(0,r.displayNames)(),(0,r.displayHandler)()},{"./display":3}]},{},[4]);
//# sourceMappingURL=bundle.js.map
