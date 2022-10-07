/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domController.js":
/*!******************************!*\
  !*** ./src/domController.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameController */ \"./src/gameController.js\");\n\n\nconst domController = (() => {\n  const playerBoard = document.querySelector('.playerboard');\n  const aiBoard = document.querySelector('.aiboard');\n\n  const resetGrid = () => {\n    playerBoard.innerHTML = '';\n    aiBoard.innerHTML = '';\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        const grid = document.createElement('div');\n        grid.dataset.col = j;\n        grid.dataset.row = i;\n        grid.classList.add('boardgrid');\n        playerBoard.appendChild(grid);\n        aiBoard.appendChild(grid.cloneNode());\n      }\n    }\n  };\n\n  const initiatePreGame = () => {\n    const startBtn = document.querySelector('#startbtn');\n    const restartBtn = document.querySelector('#restartbtn');\n\n    startBtn.addEventListener('click', () => {\n      (0,_gameController__WEBPACK_IMPORTED_MODULE_0__.newGame)();\n      restartBtn.style.display = 'block';\n      startBtn.style.display = 'none';\n    });\n\n    restartBtn.addEventListener('click', () => {\n      (0,_gameController__WEBPACK_IMPORTED_MODULE_0__.resetGame)();\n      restartBtn.style.display = 'none';\n      startBtn.style.display = 'block';\n    });\n  };\n\n  // attack by clicking the grid\n  const enableAttack = () => {\n    const grids = document.querySelectorAll('.aiboard > .boardgrid');\n    grids.forEach((grid) => grid.addEventListener('click', _gameController__WEBPACK_IMPORTED_MODULE_0__.attack, { once: true }));\n  };\n\n  const disableGrid = () => {\n    const grids = document.querySelectorAll('.aiboard > .boardgrid');\n    grids.forEach((grid) => grid.removeEventListener('click', _gameController__WEBPACK_IMPORTED_MODULE_0__.attack));\n  };\n\n  const displayBoard = (board) => {\n    const boardArray = board.getBoard();\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        if (boardArray[i][j] !== null) {\n          const grid = playerBoard.querySelector(`[data-row=\"${i}\"][data-col=\"${j}\"]`);\n          grid.classList.add('ship');\n        }\n      }\n    }\n  };\n\n  const displayAttack = (player, grid, result) => {\n    const board = player === 'player' ? aiBoard : playerBoard;\n    const gridbox = board.querySelector(`[data-row=\"${grid[1]}\"][data-col=\"${grid[0]}\"]`);\n    if (result) {\n      gridbox.classList.add('hit');\n    } else {\n      gridbox.classList.add('miss');\n    }\n  };\n\n  const displayMsg = (msg) => {\n    const msgContainer = document.querySelector('.msg');\n\n    msgContainer.textContent = msg;\n  };\n\n  return {\n    resetGrid,\n    displayBoard,\n    enableAttack,\n    displayAttack,\n    displayMsg,\n    disableGrid,\n    initiatePreGame\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domController);\n\n\n//# sourceURL=webpack://odin-battleship/./src/domController.js?");

/***/ }),

/***/ "./src/gameController.js":
/*!*******************************!*\
  !*** ./src/gameController.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"attack\": () => (/* binding */ attack),\n/* harmony export */   \"newGame\": () => (/* binding */ newGame),\n/* harmony export */   \"preGame\": () => (/* binding */ preGame),\n/* harmony export */   \"resetGame\": () => (/* binding */ resetGame)\n/* harmony export */ });\n/* harmony import */ var _domController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domController */ \"./src/domController.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\n\nconst preGame = () => {\n  // create player for initial loadout, disable attack\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].initiatePreGame();\n  (0,_player__WEBPACK_IMPORTED_MODULE_1__.createPlayer)();\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].resetGrid();\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayBoard((0,_player__WEBPACK_IMPORTED_MODULE_1__.getBoard)('p1'));\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayMsg('Press START when you are ready');\n};\n\nconst newGame = () => {\n  console.log('newgame');\n  (0,_player__WEBPACK_IMPORTED_MODULE_1__.createPlayer)();\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].resetGrid();\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayBoard((0,_player__WEBPACK_IMPORTED_MODULE_1__.getBoard)('p1'));\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].enableAttack();\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayMsg(\"Attack by click your opponent's board\");\n  //change start game button to restart\n};\n\nconst attack = (event) => {\n  const grid = [];\n  grid.push(event.currentTarget.dataset.col);\n  grid.push(event.currentTarget.dataset.row);\n\n  const result = (0,_player__WEBPACK_IMPORTED_MODULE_1__.playerAttack)(grid);\n\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayAttack('player', grid, result);\n  //check if Win\n  //AI Auto Attack\n  const result2 = (0,_player__WEBPACK_IMPORTED_MODULE_1__.autoAttack)();\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayAttack('ai', result2[0], result2[1]);\n  //check win\n  if ((0,_player__WEBPACK_IMPORTED_MODULE_1__.getBoard)('player').checkAllSunk() && (0,_player__WEBPACK_IMPORTED_MODULE_1__.getBoard)('ai').checkAllSunk()) {\n    gameEnd('draw');\n    return;\n  }\n  if ((0,_player__WEBPACK_IMPORTED_MODULE_1__.getBoard)('player').checkAllSunk()) {\n    gameEnd('ai');\n  } else if ((0,_player__WEBPACK_IMPORTED_MODULE_1__.getBoard)('ai').checkAllSunk()) {\n    gameEnd('player');\n  }\n};\n\nconst resetGame = () => {\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].disableGrid();\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].resetGrid();\n  (0,_player__WEBPACK_IMPORTED_MODULE_1__.createPlayer)();\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayBoard((0,_player__WEBPACK_IMPORTED_MODULE_1__.getBoard)('p1'));\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayMsg('Press START when you are ready');\n};\n\nconst gameEnd = (winner) => {\n  let msg = '';\n  //announce winner\n  if (winner === 'player') {\n    msg = 'You win';\n  } else if (winner === 'ai') {\n    msg = 'You lose';\n  } else {\n    msg = \"It's a draw\";\n  }\n\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayMsg(msg);\n  //diable all event listener\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].disableGrid();\n};\n\n\n\n\n//# sourceURL=webpack://odin-battleship/./src/gameController.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nconst Gameboard = (position) => {\n  const fleet = {};\n\n  const setBoard = (position) => {\n    const board = [];\n    while (board.length !== 10) {\n      const row = [];\n      while (row.length !== 10) {\n        row.push(null);\n      }\n      board.push(row);\n    }\n    if (!position) return board;\n\n    Object.entries(position).forEach(([key, value]) => {\n      fleet[key] = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value.length);\n      const [x, y] = value.grid;\n      if (value.direction === 'x') {\n        for (let col = x; col < x + value.length; col++) {\n          board[y][col] = key;\n        }\n      }\n      if (value.direction === 'y') {\n        for (let row = y; row < y + value.length; row++) {\n          board[row][x] = key;\n        }\n      }\n    });\n\n    return board;\n  };\n\n  const board = setBoard(position);\n\n  // hit successful, board = true else false\n  const receiveAttack = (grid) => {\n    let validHit = false;\n    const [x, y] = grid;\n    if (typeof board[y][x] === 'string') {\n      const shipName = board[y][x];\n      board[y][x] = true;\n      fleet[shipName].hit();\n      validHit = true;\n    } else if (board[y][x] === null) {\n      board[y][x] = false;\n    }\n\n    return validHit;\n  };\n\n  const checkAllSunk = () => {\n    let isAllSunk = true;\n    Object.entries(fleet).forEach(([ship, ptys]) => {\n      if (!ptys.isSunk()) isAllSunk = false;\n    });\n    return isAllSunk;\n  };\n\n  const getBoard = () => board;\n\n  return {\n    receiveAttack,\n    getBoard,\n    checkAllSunk\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://odin-battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameController */ \"./src/gameController.js\");\n\n\n(0,_gameController__WEBPACK_IMPORTED_MODULE_0__.preGame)();\n\n\n//# sourceURL=webpack://odin-battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"autoAttack\": () => (/* binding */ autoAttack),\n/* harmony export */   \"createPlayer\": () => (/* binding */ createPlayer),\n/* harmony export */   \"getBoard\": () => (/* binding */ getBoard),\n/* harmony export */   \"playerAttack\": () => (/* binding */ playerAttack)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\n\nlet playerBoard = null;\nlet aiBoard = null;\n\nconst attackedGrid = [];\n\nconst presetFleet = {\n  carrier: { grid: [1, 1], direction: 'y', length: 5 },\n  battleship: { grid: [4, 1], direction: 'y', length: 4 },\n  cruiser: { grid: [2, 8], direction: 'x', length: 3 },\n  submarine: { grid: [7, 1], direction: 'y', length: 3 },\n  destroyer: { grid: [7, 5], direction: 'x', length: 2 }\n};\n\nconst createPlayer = (fleet = presetFleet) => {\n  playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(fleet);\n  aiBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(presetFleet);\n};\n\nconst getBoard = (player) => {\n  return player === 'player' ? playerBoard : aiBoard;\n};\n\nconst checkAttack = (gridToAttack) => {\n  let attacked = false;\n  const [x1, y1] = gridToAttack;\n  if (attackedGrid) {\n    attackedGrid.forEach((grid) => {\n      const [x2, y2] = grid;\n      if (x1 === x2 && y1 === y2) attacked = true;\n    });\n  }\n  return attacked;\n};\n\nconst playerAttack = (grid) => {\n  return aiBoard.receiveAttack(grid);\n};\n\nconst autoAttack = () => {\n  let gridToAttack = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];\n  while (checkAttack(gridToAttack)) {\n    console.log('Resaagin');\n    gridToAttack = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];\n  }\n  const result = playerBoard.receiveAttack(gridToAttack);\n  attackedGrid.push(gridToAttack);\n  return [gridToAttack, result];\n};\n\n\n\n\n//# sourceURL=webpack://odin-battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Ship = (length) => {\n  let damage = 0;\n  const hit = () => {\n    damage += 1;\n  };\n  const isSunk = () => length === damage;\n  return { hit, isSunk };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://odin-battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;