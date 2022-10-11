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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameController */ \"./src/gameController.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\n\nconst domController = (() => {\n  const playerBoard = document.querySelector('.playerboard');\n  const aiBoard = document.querySelector('.aiboard');\n  let currentBoardArray = [];\n\n  const resetGrid = () => {\n    playerBoard.innerHTML = '';\n    aiBoard.innerHTML = '';\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        const grid = document.createElement('div');\n        grid.dataset.col = j;\n        grid.dataset.row = i;\n        grid.classList.add('boardgrid');\n        playerBoard.appendChild(grid);\n        aiBoard.appendChild(grid.cloneNode());\n      }\n    }\n  };\n\n  const setShip = (ship) => {\n    const grids = playerBoard.querySelectorAll('.boardgrid');\n\n    const getShipGrid = (event) => {\n      const x = event.currentTarget.dataset.col;\n      const y = event.currentTarget.dataset.row;\n      const shipGrid = [];\n      for (let i = 0; i < ship.shipLength; i++) {\n        let row, col;\n        if (ship.direction === 'x') {\n          row = parseInt(y);\n          col = parseInt(x) + i;\n        } else {\n          row = parseInt(y) + i;\n          col = parseInt(x);\n        }\n        if (row > 9 || col > 9) continue;\n        shipGrid.push([col, row]);\n      }\n      return shipGrid;\n    };\n\n    const hoverEffect = (event) => {\n      const array = getShipGrid(event);\n\n      array.forEach((grid) => {\n        const target = playerBoard.querySelector(`[data-row=\"${grid[1]}\"][data-col=\"${grid[0]}\"]`);\n        target.classList.toggle('shiphover');\n      });\n    };\n\n    const placement = (event) => {\n      const array = getShipGrid(event);\n      if (!(0,_player__WEBPACK_IMPORTED_MODULE_1__.placeShip)(array, ship)) return;\n\n      array.forEach((grid) => {\n        const target = playerBoard.querySelector(`[data-row=\"${grid[1]}\"][data-col=\"${grid[0]}\"]`);\n        target.classList.add('ship');\n      });\n\n      grids.forEach((grid) => {\n        grid.removeEventListener('click', placement);\n        grid.removeEventListener('mouseover', hoverEffect);\n        grid.removeEventListener('mouseout', hoverEffect);\n      });\n\n      (0,_player__WEBPACK_IMPORTED_MODULE_1__.setFleet)();\n    };\n\n    //if grid is set using random button, remove all listeners\n\n    grids.forEach((grid) => {\n      grid.addEventListener('mouseover', hoverEffect);\n      grid.addEventListener('mouseout', hoverEffect);\n      grid.addEventListener('click', placement);\n    });\n  };\n\n  const initiatePreGame = () => {\n    const startBtn = document.querySelector('#startbtn');\n    const newgameBtn = document.querySelector('#newgamebtn');\n    const rotateBtn = document.querySelector('#rotatebtn');\n    const randomBtn = document.querySelector('#randombtn');\n    const resetBtn = document.querySelector('#resetbtn');\n\n    startBtn.addEventListener('click', () => {\n      //start check\n      if (!(0,_player__WEBPACK_IMPORTED_MODULE_1__.checkBoardSet)()) {\n        displayMsg('Please set up your Fleet before starting!');\n        return;\n      }\n      enableAttack();\n      newgameBtn.style.display = 'block';\n      startBtn.style.display = 'none';\n      rotateBtn.disabled = true;\n      resetBtn.disabled = true;\n      randomBtn.disabled = true;\n      displayMsg('Game starts! Click on the right plane to attack!');\n    });\n\n    newgameBtn.addEventListener('click', () => {\n      (0,_gameController__WEBPACK_IMPORTED_MODULE_0__.resetGame)();\n      rotateBtn.removeAttribute('disabled');\n      resetBtn.removeAttribute('disabled');\n      randomBtn.removeAttribute('disabled');\n      newgameBtn.style.display = 'none';\n      startBtn.style.display = 'block';\n    });\n\n    rotateBtn.addEventListener('click', _player__WEBPACK_IMPORTED_MODULE_1__.rotateFleet);\n\n    randomBtn.addEventListener('click', () => {\n      resetGrid();\n      (0,_player__WEBPACK_IMPORTED_MODULE_1__.setFleet)(true);\n      setShip();\n      displayBoard((0,_player__WEBPACK_IMPORTED_MODULE_1__.getBoard)());\n      const grids = playerBoard.querySelectorAll('.boardgrid');\n      playerBoard.innerHTML = '';\n      grids.forEach((grid) => playerBoard.appendChild(grid.cloneNode()));\n    });\n\n    resetBtn.addEventListener('click', () => {\n      resetGrid();\n      (0,_player__WEBPACK_IMPORTED_MODULE_1__.resetFleet)();\n      (0,_player__WEBPACK_IMPORTED_MODULE_1__.setFleet)();\n    });\n  };\n\n  // attack by clicking the grid\n  const enableAttack = () => {\n    const grids = document.querySelectorAll('.aiboard > .boardgrid');\n    grids.forEach((grid) => grid.addEventListener('click', _gameController__WEBPACK_IMPORTED_MODULE_0__.playerTurn, { once: true }));\n  };\n\n  const disableAttack = () => {\n    const grids = document.querySelectorAll('.aiboard > .boardgrid');\n    grids.forEach((grid) => grid.removeEventListener('click', _gameController__WEBPACK_IMPORTED_MODULE_0__.playerTurn));\n  };\n\n  const displayBoard = (board) => {\n    currentBoardArray = board.getBoard();\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        if (currentBoardArray[i][j] !== null) {\n          const grid = playerBoard.querySelector(`[data-row=\"${i}\"][data-col=\"${j}\"]`);\n          grid.classList.add('ship');\n        }\n      }\n    }\n  };\n\n  const displayAttack = (player, grid, result) => {\n    const board = player === 'player' ? aiBoard : playerBoard;\n    const gridbox = board.querySelector(`[data-row=\"${grid[1]}\"][data-col=\"${grid[0]}\"]`);\n    if (result) {\n      gridbox.classList.add('hit');\n    } else {\n      gridbox.classList.add('miss');\n    }\n  };\n\n  const displayMsg = (msg) => {\n    const msgContainer = document.querySelector('.msg');\n\n    msgContainer.textContent = msg;\n  };\n\n  return {\n    resetGrid,\n    displayBoard,\n    enableAttack,\n    displayAttack,\n    displayMsg,\n    disableAttack,\n    initiatePreGame,\n    setShip\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domController);\n\n\n//# sourceURL=webpack://odin-battleship/./src/domController.js?");

/***/ }),

/***/ "./src/gameController.js":
/*!*******************************!*\
  !*** ./src/gameController.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"playerTurn\": () => (/* binding */ playerTurn),\n/* harmony export */   \"preGame\": () => (/* binding */ preGame),\n/* harmony export */   \"resetGame\": () => (/* binding */ resetGame)\n/* harmony export */ });\n/* harmony import */ var _domController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domController */ \"./src/domController.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\n\nconst preGame = () => {\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].initiatePreGame();\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].resetGrid();\n  (0,_player__WEBPACK_IMPORTED_MODULE_1__.resetFleet)();\n  (0,_player__WEBPACK_IMPORTED_MODULE_1__.setFleet)();\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayMsg('Click on the left plane to set your Fleet');\n};\n\nconst playerTurn = (event) => {\n  const grid = [event.currentTarget.dataset.col, event.currentTarget.dataset.row];\n\n  const result = (0,_player__WEBPACK_IMPORTED_MODULE_1__.playerAttack)(grid);\n\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayAttack('player', grid, result);\n\n  const result2 = (0,_player__WEBPACK_IMPORTED_MODULE_1__.autoAttack)();\n\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayAttack('ai', result2[0], result2[1]);\n  //check win\n  if ((0,_player__WEBPACK_IMPORTED_MODULE_1__.getBoard)('player').checkAllSunk() && (0,_player__WEBPACK_IMPORTED_MODULE_1__.getBoard)('ai').checkAllSunk()) {\n    _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].disableAttack();\n    gameEnd('draw');\n    return;\n  }\n  if ((0,_player__WEBPACK_IMPORTED_MODULE_1__.getBoard)('player').checkAllSunk()) {\n    _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].disableAttack();\n    gameEnd('ai');\n  } else if ((0,_player__WEBPACK_IMPORTED_MODULE_1__.getBoard)('ai').checkAllSunk()) {\n    _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].disableAttack();\n    gameEnd('player');\n  }\n};\n\nconst gameEnd = (winner) => {\n  let msg = '';\n  //announce winner\n  if (winner === 'player') {\n    msg = 'You win!';\n  } else if (winner === 'ai') {\n    msg = 'You lose!';\n  } else {\n    msg = \"It's a draw!\";\n  }\n\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayMsg(msg);\n  //diable all event listener\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].disableAttack();\n};\n\nconst resetGame = () => {\n  _domController__WEBPACK_IMPORTED_MODULE_0__[\"default\"].resetGrid();\n  (0,_player__WEBPACK_IMPORTED_MODULE_1__.resetFleet)();\n  (0,_player__WEBPACK_IMPORTED_MODULE_1__.setFleet)();\n};\n\n\n\n\n//# sourceURL=webpack://odin-battleship/./src/gameController.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"autoAttack\": () => (/* binding */ autoAttack),\n/* harmony export */   \"checkBoardSet\": () => (/* binding */ checkBoardSet),\n/* harmony export */   \"getBoard\": () => (/* binding */ getBoard),\n/* harmony export */   \"placeShip\": () => (/* binding */ placeShip),\n/* harmony export */   \"playerAttack\": () => (/* binding */ playerAttack),\n/* harmony export */   \"resetFleet\": () => (/* binding */ resetFleet),\n/* harmony export */   \"rotateFleet\": () => (/* binding */ rotateFleet),\n/* harmony export */   \"setFleet\": () => (/* binding */ setFleet)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _domController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domController */ \"./src/domController.js\");\n\n\n\nlet playerBoard = null;\nlet aiBoard = null;\n\nconst attackedGrid = [];\nconst placingGrid = [];\n\nlet isBoardSet = false;\nlet Fleet = {};\n\nconst fleetToset = [\n  { shipType: 'carrier', shipLength: 5, direction: 'x' },\n  { shipType: 'battleship', shipLength: 4, direction: 'x' },\n  { shipType: 'cruiser', shipLength: 3, direction: 'x' },\n  { shipType: 'submarine', shipLength: 3, direction: 'x' },\n  { shipType: 'destroyer', shipLength: 2, direction: 'x' }\n];\n\nconst getBoard = (player = 'player') => {\n  return player === 'player' ? playerBoard : aiBoard;\n};\n\nconst checkAttack = (gridToAttack) => {\n  let attacked = false;\n  const [x1, y1] = gridToAttack;\n  if (attackedGrid) {\n    attackedGrid.forEach((grid) => {\n      const [x2, y2] = grid;\n      if (x1 === x2 && y1 === y2) attacked = true;\n    });\n  }\n  return attacked;\n};\n\nconst playerAttack = (grid) => {\n  return aiBoard.receiveAttack(grid);\n};\n\nconst autoAttack = () => {\n  let gridToAttack = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];\n  while (checkAttack(gridToAttack)) {\n    gridToAttack = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];\n  }\n  const result = playerBoard.receiveAttack(gridToAttack);\n  attackedGrid.push(gridToAttack);\n  return [gridToAttack, result];\n};\n\nconst resetFleet = () => {\n  Fleet = {};\n  fleetToset.forEach((ship) => (ship.direction = 'x'));\n  placingGrid.length = 0;\n  isBoardSet = false;\n};\n\nconst setFleet = (random = false) => {\n  if (fleetToset.length === Object.keys(Fleet).length) {\n    playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Fleet);\n    resetFleet();\n    aiBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(randomFleet());\n    _domController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayMsg('Your Fleet is set! Press START when you are ready!');\n    isBoardSet = true;\n    return;\n  }\n\n  if (random) {\n    Fleet = randomFleet();\n    setFleet();\n  } else _domController__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setShip(fleetToset[Object.keys(Fleet).length]);\n};\n\nconst rotateFleet = () => {\n  fleetToset.forEach((ship) => (ship.direction = ship.direction === 'x' ? 'y' : 'x'));\n};\n\nconst placeShip = (gridArray, ship) => {\n  let result = true;\n\n  if (placingGrid.length === 0) {\n    for (let i = 0; i < 12; i++) {\n      let row = [];\n      for (let j = 0; j < 12; j++) {\n        row.push(false);\n      }\n      placingGrid.push(row);\n    }\n  }\n\n  if (gridArray.length === 0 || gridArray.length !== ship.shipLength) return false;\n\n  gridArray.forEach((grid) => {\n    let x = grid[0] + 1;\n    let y = grid[1] + 1;\n    if (placingGrid[y - 1][x - 1]) result = false;\n    if (placingGrid[y - 1][x]) result = false;\n    if (placingGrid[y - 1][x + 1]) result = false;\n    if (placingGrid[y][x - 1]) result = false;\n    if (placingGrid[y][x]) result = false;\n    if (placingGrid[y][x + 1]) result = false;\n    if (placingGrid[y + 1][x - 1]) result = false;\n    if (placingGrid[y + 1][x]) result = false;\n    if (placingGrid[y + 1][x + 1]) result = false;\n  });\n\n  if (result) {\n    gridArray.forEach((grid) => {\n      let x = grid[0] + 1;\n      let y = grid[1] + 1;\n      placingGrid[y][x] = true;\n    });\n\n    const shiptype = ship.shipType;\n    Fleet[shiptype] = {\n      grid: gridArray[0],\n      direction: ship.direction,\n      length: ship.shipLength\n    };\n  }\n\n  return result;\n};\n\nconst randomShip = (length, direction) => {\n  const array = [];\n  const x = Math.round(Math.random() * 9);\n  const y = Math.round(Math.random() * 9);\n  for (let i = 0; i < length; i++) {\n    let row, col;\n    if (direction === 'x') {\n      row = y;\n      col = x + i;\n    } else {\n      row = y + i;\n      col = x;\n    }\n    if (row > 9 || col > 9) continue;\n    array.push([col, row]);\n  }\n  return array;\n};\n\nconst randomFleet = () => {\n  if (fleetToset.length === Object.keys(Fleet).length) return Fleet;\n\n  const ship = fleetToset[Object.keys(Fleet).length];\n  //randomising direction\n  ship.direction = Math.random() <= 0.5 ? 'x' : 'y';\n\n  let array = randomShip(ship.shipLength, ship.direction);\n\n  while (!placeShip(array, ship)) {\n    array = randomShip(ship.shipLength, ship.direction);\n  }\n  return randomFleet();\n};\n\nconst checkBoardSet = () => isBoardSet;\n\n\n\n\n//# sourceURL=webpack://odin-battleship/./src/player.js?");

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