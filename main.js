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

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nconst Gameboard = (position) => {\n  const fleet = {};\n\n  const setBoard = (position) => {\n    const board = [];\n    while (board.length !== 10) {\n      const row = [];\n      while (row.length !== 10) {\n        row.push(null);\n      }\n      board.push(row);\n    }\n    if (!position) return board;\n\n    Object.entries(position).forEach(([key, value]) => {\n      fleet[key] = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value.length);\n      const [x, y] = value.grid;\n      if (value.direction === 'x') {\n        for (let col = x; col < x + value.length; col++) {\n          board[y][col] = key;\n        }\n      }\n      if (value.direction === 'y') {\n        for (let row = y; row < y + value.length; row++) {\n          board[row][x] = key;\n        }\n      }\n    });\n\n    return board;\n  };\n\n  const board = setBoard(position);\n\n  // hit successful, board = true else false\n  const receiveAttack = (grid) => {\n    let validHit = false;\n    const [x, y] = grid;\n    if (typeof board[y][x] === 'string') {\n      const shipName = board[y][x];\n      board[y][x] = true;\n      fleet[shipName].hit();\n      validHit = true;\n    } else if (board[y][x] === null) {\n      board[y][x] = false;\n      validHit = true;\n    }\n\n    return validHit;\n  };\n\n  const checkAllSunk = () => {\n    let isAllSunk = true;\n    Object.entries(fleet).forEach(([ship, ptys]) => {\n      if (!ptys.isSunk()) isAllSunk = false;\n    });\n    return isAllSunk;\n  };\n\n  const getBoard = () => board;\n\n  return {\n    receiveAttack,\n    getBoard,\n    checkAllSunk\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://odin-battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\n\nconst sampleFleet = {\n  submarine: { grid: [3, 1], direction: 'y', length: 3 },\n  destroyer: { grid: [6, 2], direction: 'x', length: 2 }\n};\n\nconst newGame = () => {\n  const hero = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  const villan = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  const heroBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(sampleFleet);\n  const villanBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(sampleFleet);\n  let gameEnd = false;\n  let currentPlayer = hero;\n\n  while (!gameEnd) {\n    if (currentPlayer === hero) {\n      console.log('hero');\n      let x = prompt('Please enter X');\n      let y = prompt('Please enter Y');\n      currentPlayer.attack([parseInt(x), parseInt(y)], villanBoard);\n      console.log(villanBoard.getBoard());\n      if (villanBoard.checkAllSunk()) gameEnd = true;\n      currentPlayer = villan;\n    } else {\n      console.log('villain');\n      currentPlayer.autoAttack(heroBoard);\n      if (heroBoard.checkAllSunk()) gameEnd = true;\n      currentPlayer = hero;\n    }\n  }\n};\n\nnewGame();\n\n\n//# sourceURL=webpack://odin-battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Player = () => {\n  const attackedGrid = [];\n\n  const checkAttack = (gridToAttack) => {\n    let attacked = false;\n    const [x1, y1] = gridToAttack;\n    if (attackedGrid) {\n      attackedGrid.forEach((grid) => {\n        const [x2, y2] = grid;\n        attacked = x1 === x2 && y1 === y2 ? true : false;\n      });\n    }\n    return attacked;\n  };\n\n  const attack = (grid, board) => {\n    board.receiveAttack(grid);\n  };\n\n  const autoAttack = (board) => {\n    let gridToAttack = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];\n\n    while (checkAttack(gridToAttack)) {\n      gridToAttack = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];\n    }\n    board.receiveAttack(gridToAttack);\n    attackedGrid.push(gridToAttack);\n  };\n\n  return {\n    attack,\n    autoAttack\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://odin-battleship/./src/player.js?");

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