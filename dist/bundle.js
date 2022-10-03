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

/***/ "./src/js/game.js":
/*!************************!*\
  !*** ./src/js/game.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _tetromino__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tetromino */ \"./src/js/tetromino.js\");\n\r\n\r\nclass Game {\r\n    constructor(gameCanvas, score = 0, lives = 1, speed = 1) {\r\n        this.keys = {\r\n            left: false,\r\n            right: false,\r\n            rotate: false,\r\n        };\r\n\r\n        this.mouseDown = false;\r\n        \r\n        this.gameBoard = [];\r\n\r\n        this.squareSize = 10;\r\n\r\n        this.level = 1;\r\n        this.score = score;\r\n        this.lives = lives;\r\n        this.speed = speed;\r\n        this.delta = 1 / speed;\r\n        this.gameCanvas = gameCanvas;\r\n        this.state = 'New Game';\r\n        this.dead = false;\r\n        this.gameFont = \"monospace\";\r\n\r\n        this.tickCount = 0;\r\n\r\n        this.newGame();\r\n\r\n        this.update = this.update.bind(this);\r\n\r\n        // Event listeners\r\n        this.keyDownHandlerBind = this.keyDownHandlerBind.bind(this);\r\n        this.keyUpHandlerBind = this.keyUpHandlerBind.bind(this);\r\n        this.mouseHandlerBind = this.mouseHandlerBind.bind(this);\r\n        this.touchHandlerBind = this.touchHandlerBind.bind(this);\r\n        this.controlsHandlerBind = this.controlsHandlerBind.bind(this);\r\n\r\n        document.addEventListener('keydown', this.keyDownHandlerBind);\r\n        document.addEventListener('keyup', this.keyUpHandlerBind);\r\n        document.addEventListener('mousedown', this.mouseHandlerBind);\r\n        document.addEventListener('mouseup', this.mouseHandlerBind);\r\n        \r\n        const buttons = document.querySelectorAll('.controls-container button');\r\n        buttons.forEach(button => {\r\n            button.addEventListener('click', this.controlsHandlerBind);\r\n            button.addEventListener('touchend', this.touchHandlerBind);\r\n            button.addEventListener('touchstart', this.touchHandlerBind);\r\n            button.addEventListener('touchcancel', this.touchHandlerBind);\r\n            button.addEventListener('touchmove', this.touchHandlerBind);\r\n        });\r\n    }\r\n\r\n    newGame() {\r\n        this.keys = {\r\n            left: false,\r\n            right: false,\r\n            rotate: false,\r\n        };\r\n\r\n        this.mouseDown = false;\r\n\r\n        this.gameBoard = [];\r\n        for (let row = 0; row < (this.gameCanvas.height / this.squareSize); row++) {\r\n            let cells = [];\r\n            for (let cell = 0; cell < (this.gameCanvas.width / this.squareSize); cell++) {\r\n                cells.push('0');\r\n            }\r\n            this.gameBoard.push(cells);\r\n        }\r\n\r\n        // For testing\r\n        for (let i = 0; i < 28; i++) {\r\n            this.gameBoard[39][i] = '1';\r\n        }\r\n\r\n        for (let i = 0; i < 28; i++) {\r\n            this.gameBoard[38][i] = '1';\r\n        }\r\n\r\n        if (this.state === 'Won') {\r\n            this.dead = true;\r\n        }\r\n        if (this.dead) {\r\n            this.score = 0;\r\n            this.level = 1;\r\n            this.dead = false;\r\n            this.lives = 1;\r\n        }\r\n\r\n        this.tickCount = 0;\r\n\r\n        // Create game objects\r\n        this.tetromino = new _tetromino__WEBPACK_IMPORTED_MODULE_0__.default(this.gameCanvas, this.squareSize);\r\n\r\n        this.drawNewGame(this.gameCanvas.width / 2, this.gameCanvas.height / 2, 40);\r\n    }\r\n\r\n    controlsHandlerBind(e) {\r\n        // if (e.target.id === 'control-left') {\r\n        //     this.tetromino.moveLeft();\r\n        // } else if (e.target.id === 'control-right') {\r\n        //     this.tetromino.moveRight();\r\n        // } else if (e.target.id === 'control-rotate') {\r\n        //     this.rotate();\r\n        // }\r\n    }\r\n    \r\n    touchHandlerBind(e) {\r\n        e.preventDefault();\r\n        if (e.type === \"touchstart\") {\r\n            if (e.target.id === 'control-left') {\r\n                this.keys['left'] = true;\r\n            } else if (e.target.id === 'control-right') {\r\n                this.keys['right'] = true;\r\n            } else if (e.target.id === 'control-rotate') {\r\n                this.keys['rotate'] = true;\r\n            }\r\n        } else if (e.type === \"touchend\") {\r\n            if (e.target.id === 'control-left') {\r\n                // this.keys['left'] = false;\r\n            } else if (e.target.id === 'control-right') {\r\n                // this.keys['right'] = false;\r\n            } else if (e.target.id === 'control-rotate') {\r\n                // this.keys['rotate'] = false;\r\n            }\r\n        }\r\n    }\r\n\r\n    mouseHandlerBind(e) {\r\n        if (e.buttons > 0) {\r\n            this.mouseDown = true;\r\n        } else {\r\n            this.mouseDown = false;\r\n        }\r\n    }\r\n\r\n    keyDownHandlerBind(e) {\r\n        if (e.key === 'a') { this.keys['left'] = true; }\r\n        if (e.key === 'ArrowLeft') {\r\n            this.keys['left'] = true;\r\n        }\r\n\r\n        if (e.key === 'd') { this.keys['right'] = true; }\r\n        if (e.key === 'ArrowRight') {\r\n            this.keys['right'] = true;\r\n        }\r\n\r\n        if (e.key === 's') { this.keys['rotate'] = true; }\r\n    }\r\n\r\n    keyUpHandlerBind(e) {\r\n        // if (e.key === 'a') { this.keys['left'] = false; }\r\n        // if (e.key === 'ArrowLeft') {\r\n        //     this.keys['left'] = false;\r\n        // }\r\n\r\n        // if (e.key === 'd') { this.keys['right'] = false; }\r\n        // if (e.key === 'ArrowRight') {\r\n        //     this.keys['right'] = false;\r\n        // }\r\n\r\n        // if (e.key === 's') { this.keys['rotate'] = false; }\r\n    }\r\n\r\n    drawWonScreen(x, y, fontSize) {\r\n        const context = this.gameCanvas.getContext('2d');\r\n        context.fillStyle = '#FFF';\r\n        context.font = `${fontSize}px ${this.gameFont}`;\r\n        const text = \"You won!\";\r\n        let textWidth = context.measureText(text).width;\r\n\r\n        context.fillText(text, x - (textWidth / 2), y - (fontSize / 2));\r\n\r\n        const controlsFontSize = fontSize / 3;\r\n        context.font = `bold ${controlsFontSize}px ${this.gameFont}`;\r\n        const controls = \"Press a button to play again\";\r\n        textWidth = context.measureText(controls).width;\r\n        context.fillText(controls, x - (textWidth / 2), y + controlsFontSize);\r\n    }\r\n\r\n    drawGameOver(x, y, text, fontSize) {\r\n        const context = this.gameCanvas.getContext('2d');\r\n        context.fillStyle = '#FFF';\r\n        context.font = `${fontSize}px ${this.gameFont}`;\r\n\r\n        const textWidth = context.measureText(text).width;\r\n\r\n        context.fillText(text, x - (textWidth / 2), y);\r\n    }\r\n\r\n    drawInstructions(x, y, fontSize) {\r\n        const context = this.gameCanvas.getContext('2d');\r\n        context.fillStyle = '#FFF';\r\n        context.font = `${fontSize}px ${this.gameFont}`;\r\n        const text = `Press a key to continue`;\r\n        const textWidth = context.measureText(text).width;\r\n\r\n        context.fillText(text, x - (textWidth / 2), y + (fontSize / 2));\r\n    }\r\n\r\n    drawLevel(x, y, level, fontSize) {\r\n        const context = this.gameCanvas.getContext('2d');\r\n        context.fillStyle = '#FFF';\r\n        context.font = `${fontSize}px ${this.gameFont}`;\r\n        const text = `Level: ${level}`;\r\n        const textWidth = context.measureText(text).width;\r\n\r\n        context.fillText(text, x - (textWidth / 2), y);\r\n    }\r\n\r\n    drawNewGame(x, y, fontSize) {\r\n        const context = this.gameCanvas.getContext('2d');\r\n        context.fillStyle = '#FFF';\r\n        context.font = `${fontSize}px ${this.gameFont}`;\r\n        const text = \"New Game\";\r\n        let textWidth = context.measureText(text).width;\r\n\r\n        context.fillText(text, x - (textWidth / 2), y - (fontSize / 2));\r\n\r\n        const controlsFontSize = fontSize / 3;\r\n        context.font = `bold ${controlsFontSize}px ${this.gameFont}`;\r\n        const controls = \"Left: A, Right: D, Rotate: S\";\r\n        textWidth = context.measureText(controls).width;\r\n        context.fillText(controls, x - (textWidth / 2), y + controlsFontSize);\r\n    }\r\n\r\n    drawSquare(x, y) {\r\n        const context = this.gameCanvas.getContext('2d');\r\n        context.beginPath();\r\n        context.fillStyle = \"green\";\r\n        context.strokeStyle = \"black\";\r\n        context.fillRect(x, y, this.squareSize, this.squareSize);\r\n        context.rect(x, y, this.squareSize, this.squareSize);\r\n        context.stroke();        \r\n    }\r\n\r\n    draw() {\r\n        const context = this.gameCanvas.getContext('2d');\r\n        // Clear the canvas\r\n        context.fillStyle = '#000';\r\n        context.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);\r\n        if (this.state !== 'Playing') {\r\n            context.globalAlpha = 0.3;\r\n        } else {\r\n            context.globalAlpha = 1;\r\n        }\r\n        \r\n        this.tetromino.draw();\r\n\r\n        for (let i = 0; i < this.gameBoard.length; i++) {\r\n            for (let j = 0; j < this.gameBoard[i].length; j++) {\r\n                if (this.gameBoard[i][j] == '1') {\r\n                    this.drawSquare(j * this.squareSize, i * this.squareSize);\r\n                }\r\n            }\r\n        }\r\n\r\n        context.globalAlpha = 1;\r\n\r\n        if (this.state === 'Next Level') {\r\n            const middleOfCanvas = this.gameCanvas.width / 2;\r\n            const fontSize = 40;\r\n            // this.drawLevel(middleOfCanvas, this.gameCanvas.height / 2, this.level, fontSize);\r\n            this.drawInstructions(middleOfCanvas, this.gameCanvas.height / 2 + (fontSize), (fontSize / 3));\r\n        } else if (this.state === 'Game Over') {\r\n            const middleOfCanvas = this.gameCanvas.width / 2;\r\n            const fontSize = 40;\r\n            this.drawGameOver(middleOfCanvas, this.gameCanvas.height / 2, \"Game Over\", fontSize);\r\n            this.drawInstructions(middleOfCanvas, this.gameCanvas.height / 2 + (fontSize), (fontSize / 3));\r\n        } else if (this.state === 'New Game') {\r\n            const middleOfCanvas = this.gameCanvas.width / 2;\r\n            const fontSize = 40;\r\n            this.drawNewGame(middleOfCanvas, this.gameCanvas.height / 2, fontSize);\r\n        } else if (this.state === 'Won') {\r\n            const middleOfCanvas = this.gameCanvas.width / 2;\r\n            const fontSize = 30;\r\n            this.drawWonScreen(middleOfCanvas, this.gameCanvas.height / 2, fontSize);\r\n        }\r\n    }\r\n\r\n    isRowComplete(row) {\r\n        let expectedCellCount = this.gameCanvas.width / this.squareSize;\r\n\r\n        for (let i = 0; i < expectedCellCount; i++) {\r\n            if (this.gameBoard[row][i] != '1') {\r\n                return false;\r\n            }\r\n        }\r\n        return true;\r\n    }\r\n\r\n    isGameOver() {\r\n        return (this.lives < 1);\r\n    }\r\n\r\n    removeRow(row) {\r\n        for (let i = 0; i < this.gameBoard.length; i++) {\r\n            this.gameBoard[row - 1][i] = '0';\r\n        }\r\n    }\r\n\r\n    shiftGameBoardDown(removedRow) {\r\n        // Start at the last row in the array\r\n        // Copy previous row into the last row\r\n        // Decrement the row index and repeat\r\n        // until row index is 1\r\n        for (let row = removedRow; row >= 1; row--) {\r\n            for (let column = 0; column < this.gameBoard[0].length; column++) {\r\n                this.gameBoard[row][column] = this.gameBoard[row - 1][column];\r\n            }\r\n        }\r\n    }\r\n\r\n    update() {\r\n        // updates every 50ms\r\n        this.tickCount += 1;\r\n        const gameScore = document.querySelector('.game-score');\r\n        const gameLevel = document.querySelector('.game-level');\r\n\r\n        gameLevel.style.visibility = \"hidden\";\r\n\r\n        if (this.isGameOver() && this.state !== 'Game Over') {\r\n            this.state = 'Game Over';\r\n            this.dead = true;\r\n            this.lives = 0;\r\n        }\r\n        \r\n        // updates every 50ms\r\n        if (this.state === 'Playing' ) {\r\n            // Check for collisions\r\n            let collisionDetected = this.collisionCheck('bottom');\r\n            if (collisionDetected) {\r\n                this.tetromino.lock();\r\n                let filledCells = this.tetromino.getFilledPositions();\r\n\r\n                filledCells.forEach(cell => {\r\n                    let y = (cell.y / this.squareSize);\r\n                    let x = (cell.x / this.squareSize);\r\n                    this.gameBoard[y][x] = '1';\r\n                })\r\n\r\n                this.tetromino = new _tetromino__WEBPACK_IMPORTED_MODULE_0__.default(this.gameCanvas, this.squareSize);\r\n            }\r\n\r\n            // Update positions\r\n            if (this.tickCount > 2) {\r\n                this.updatePlayerPosition();\r\n            }\r\n\r\n            if (this.tickCount >= 5) {\r\n                this.tickCount = 0;\r\n                this.moveTetrominoDown();\r\n            }\r\n\r\n            // For each complete row remove the row\r\n            // Shift all cells above the completed row down\r\n            let rowsComplete = [];\r\n            for (let row = 0; row < this.gameCanvas.height / this.squareSize; row++) {\r\n                if (this.isRowComplete(row)) {\r\n                    rowsComplete.push(row);\r\n                    this.shiftGameBoardDown(row);\r\n                    this.score += 1;\r\n                }\r\n            }\r\n\r\n            if (rowsComplete.length > 0) {\r\n                this.tetromino = new _tetromino__WEBPACK_IMPORTED_MODULE_0__.default(this.gameCanvas, this.squareSize);\r\n            }\r\n        }\r\n\r\n        // Update score\r\n        gameScore.innerText = `Score: ${this.score}`;\r\n\r\n        if ((this.state !== 'Playing') && ((this.mouseDown) \r\n            || this.keys['rotate']\r\n            || this.keys['left']\r\n            || this.keys['right'])) {\r\n            if (this.state !== 'New Game') { this.newGame(); }\r\n            this.state = 'Playing';\r\n        }\r\n\r\n        this.draw();\r\n    }\r\n\r\n    moveTetrominoDown() {\r\n        if (this.collisionCheck('bottom') === false) {\r\n            this.tetromino.moveDown();\r\n        }\r\n\r\n        if (this.collisionCheck('top')) {\r\n            this.tetromino.lock();\r\n            this.lives = 0;\r\n        }\r\n    }\r\n\r\n    updatePlayerPosition() {\r\n        if (this.keys['left']) {\r\n            this.keys['left'] = false;\r\n            if (this.collisionCheck('left') === false) { this.tetromino.moveLeft(); }\r\n        } else if (this.keys['right']) {\r\n            if (this.collisionCheck('right') === false) { this.tetromino.moveRight(); }\r\n            this.keys['right'] = false;\r\n        }\r\n        else if (this.keys['rotate']) {\r\n            this.keys['rotate'] = false;\r\n            this.tetromino.rotate();\r\n        }\r\n    }\r\n\r\n    collisionCheck(type) {\r\n        let collision = false;\r\n\r\n        // Collision between Tetromino and filled cells\r\n        let tetrominoCells = this.tetromino.getFilledPositions();\r\n        tetrominoCells.forEach(cell => {\r\n            if (type === 'top') {\r\n                // TODO: Prevent code duplication\r\n                if ((cell.y / this.squareSize) + 1 <= this.gameBoard.length - 1) {\r\n                    if (this.gameBoard[(cell.y / this.squareSize) + 1][(cell.x / this.squareSize)] == '1'\r\n                    && (cell.y / this.squareSize) <= 2) {\r\n                        collision = true;\r\n                    }\r\n                }\r\n            }\r\n            else if (type === 'bottom') {\r\n                // Bottom of screen\r\n                // if (this.tetromino.getBottom() >= (this.gameCanvas.height - this.squareSize)) {\r\n                //     collision = true;\r\n                // }\r\n                if ((cell.y / this.squareSize) + 1 > this.gameBoard.length - 1) {\r\n                    collision = true;\r\n                }\r\n\r\n                // Directly below\r\n                if ((cell.y / this.squareSize) + 1 <= this.gameBoard.length - 1) {\r\n                    if (this.gameBoard[(cell.y / this.squareSize) + 1][(cell.x / this.squareSize)] == '1') {\r\n                        collision = true;\r\n                    }\r\n                }\r\n            } else if (type === 'left') {\r\n                // Left\r\n                // Prevent array index exception\r\n                if ((cell.x / this.squareSize) - 1 >= 0) {\r\n                    if (this.gameBoard[cell.y / this.squareSize][(cell.x / this.squareSize) - 1] == '1') {\r\n                        collision = true;\r\n                    }\r\n                }\r\n            } else if (type === 'right') {\r\n                // Right\r\n                // Prevent array index exception\r\n                if ((cell.x / this.squareSize) + 1 <= this.gameBoard[0].length - 1) {\r\n                    if (this.gameBoard[cell.y / this.squareSize][(cell.x / this.squareSize) + 1] == '1') {\r\n                        collision = true;\r\n                    }\r\n                }\r\n            }\r\n        });      \r\n        \r\n        return collision;\r\n    }\r\n}\n\n//# sourceURL=webpack://spaceinvaders/./src/js/game.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/js/game.js\");\n// require('../css/styles.css');\r\n\r\n\r\n\r\n// Elements\r\nconst gameContainer = document.querySelector('.game-container');\r\nconst gameScore = document.querySelector('.game-score');\r\nconst gameLives = document.querySelector('.game-lives');\r\nconst gameElement = document.querySelector('.game');\r\nconst gameCanvas = document.querySelector('.game-canvas');\r\nconst buttonRotateContainer = document.querySelector('.button-rotate-container');\r\nconst controlsContainer = document.querySelector('.controls-container');\r\n\r\nconst PIXEL_RATIO = (function () {\r\n    let ctx = document.createElement(\"canvas\").getContext(\"2d\"),\r\n        dpr = window.devicePixelRatio || 1,\r\n        bsr = ctx.webkitBackingStorePixelRatio ||\r\n            ctx.mozBackingStorePixelRatio ||\r\n            ctx.msBackingStorePixelRatio ||\r\n            ctx.oBackingStorePixelRatio ||\r\n            ctx.backingStorePixelRatio || 1;\r\n\r\n    return dpr / bsr;\r\n})();\r\n\r\n\r\nconst convertHiDPICanvas = function (canvas, w, h, ratio) {\r\n    if (!ratio) { ratio = PIXEL_RATIO; }\r\n    canvas.width = w * ratio;\r\n    canvas.height = h * ratio;\r\n    canvas.style.width = w + \"px\";\r\n    canvas.style.height = h + \"px\";\r\n    canvas.getContext(\"2d\").setTransform(ratio, 0, 0, ratio, 0, 0);\r\n    return canvas;\r\n}\r\n\r\n//Create canvas with the device resolution.\r\n// const canvas = convertHiDPICanvas(gameCanvas, window.innerWidth * 0.5, window.innerHeight * 0.5);\r\n\r\nconst game = new _game__WEBPACK_IMPORTED_MODULE_0__.Game(gameCanvas);\r\n\r\ncontrolsContainer.style.visibility = \"hidden\";\r\ncontrolsContainer.style.display = \"none\";\r\n\r\n// Detect touch event and display controls if touch is detected\r\nwindow.addEventListener('touchstart', () => {\r\n    controlsContainer.style.visibility = \"visible\";\r\n    controlsContainer.style.display = \"flex\";\r\n}, false);\r\n\r\nsetTimeout(function() {\r\n    game.draw();\r\n}, 1000);\r\n\r\n// Game loop\r\nsetInterval(game.update, 50);\n\n//# sourceURL=webpack://spaceinvaders/./src/js/index.js?");

/***/ }),

/***/ "./src/js/tetromino.js":
/*!*****************************!*\
  !*** ./src/js/tetromino.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Tetromino)\n/* harmony export */ });\nclass Tetromino {\r\n  constructor(canvasElement, squareSize) {\r\n    this.gameCanvas = canvasElement;\r\n    this.squareSize = squareSize;\r\n\r\n    this.x = this.gameCanvas.width / 2;\r\n    this.y = this.squareSize;\r\n\r\n    this.top = this.y;\r\n    this.left = this.x;\r\n    this.bottom = this.y + this.squareSize;\r\n    this.right = this.x + this.squareSize;\r\n\r\n    this.rotation = 0;\r\n\r\n    this.speed = 5;\r\n    this.locked = false;\r\n\r\n    // Generate random tetromino type\r\n    let typeIndex = parseInt((Math.random() * 10) % 5);\r\n    this.types = { 0: \"straight\", 1: \"skew\", 2: \"T\", 3: \"L\", 4: \"square\" };\r\n\r\n    // For testing complete row\r\n    // typeIndex = 4;\r\n\r\n    this.initializeTetromino(this.types[typeIndex]);\r\n  }\r\n\r\n  initializeTetromino(type) {\r\n    let tetromino = `\r\n        0000\r\n        0000\r\n        0000\r\n        0000`;\r\n\r\n    if (type == \"straight\") {\r\n      tetromino = \"1111\";\r\n      tetromino += \"0000\";\r\n      tetromino += \"0000\";\r\n      tetromino += \"0000\";\r\n      tetromino += \"0000\";\r\n      tetromino += \"0000\";\r\n    } else if (type == \"square\") {\r\n      tetromino = \"0110\";\r\n      tetromino += \"0110\";\r\n      tetromino += \"0000\";\r\n      tetromino += \"0000\";\r\n    } else if (type == \"L\") {\r\n      tetromino = \"1000\";\r\n      tetromino += \"1000\";\r\n      tetromino += \"1100\";\r\n      tetromino += \"0000\";\r\n    } else if (type == \"T\") {\r\n      tetromino = \"1110\";\r\n      tetromino += \"0100\";\r\n      tetromino += \"0000\";\r\n      tetromino += \"0000\";\r\n    } else if (type == \"skew\") {\r\n      tetromino = \"0011\";\r\n      tetromino += \"0110\";\r\n      tetromino += \"0000\";\r\n      tetromino += \"0000\";\r\n    }\r\n\r\n    this.tetromino = tetromino;\r\n    this.type = type;\r\n  }\r\n\r\n  getBottom() {\r\n    if (this.type == \"straight\") {\r\n      return this.y + this.squareSize;\r\n    } else if (\r\n      this.type == \"skew\" ||\r\n      this.type == \"square\" ||\r\n      this.type == \"T\"\r\n    ) {\r\n      return this.y + this.squareSize * 2;\r\n    } else if (this.type == \"L\") {\r\n      return this.y + this.squareSize * 4;\r\n    }\r\n  }\r\n\r\n  getFilledWidth() {\r\n    if (this.type == \"square\") {\r\n      return this.squareSize * 2;\r\n    }\r\n    switch (this.rotation) {\r\n      case 0:\r\n      // Fall through\r\n      case 180:\r\n        if (this.type == \"straight\") {\r\n          return this.squareSize * 4;\r\n        } else if (this.type == \"L\") {\r\n          return this.squareSize * 2;\r\n        } else if (this.type == \"T\" || this.type == \"skew\") {\r\n          return this.squareSize * 3;\r\n        }\r\n        break;\r\n      case 90:\r\n      // Fall through\r\n      case 270:\r\n        if (this.type == \"straight\") {\r\n          return this.squareSize * 1;\r\n        } else if (this.type == \"skew\" || this.type == \"T\") {\r\n          return this.squareSize * 2;\r\n        } else if (this.type == \"L\") {\r\n          return this.squareSize * 3;\r\n        }\r\n        break;\r\n\r\n      default:\r\n        break;\r\n    }\r\n  }\r\n\r\n  lock() {\r\n    this.locked = true;\r\n  }\r\n\r\n  rotate() {\r\n    // TODO: Do this in a better way\r\n    let tetromino = \"\";\r\n    let type = this.type;\r\n    console.log(\"Rotate\");\r\n    if (this.locked === false) {\r\n      this.rotation += 90;\r\n      if (this.rotation > 270) {\r\n        this.rotation = 0;\r\n      }\r\n    }\r\n    switch (this.rotation) {\r\n        case 0: {\r\n            this.initializeTetromino(type);\r\n            tetromino = this.tetromino;\r\n            break;\r\n        }\r\n        case 90:\r\n        if (type == \"straight\") {\r\n          tetromino = \"0001\";\r\n          tetromino += \"0001\";\r\n          tetromino += \"0001\";\r\n          tetromino += \"0001\";\r\n        } else if (type == \"square\") {\r\n          tetromino = \"0110\";\r\n          tetromino += \"0110\";\r\n          tetromino += \"0000\";\r\n          tetromino += \"0000\";\r\n        } else if (type == \"L\") {\r\n          tetromino = \"1110\";\r\n          tetromino += \"1000\";\r\n          tetromino += \"0000\";\r\n          tetromino += \"0000\";\r\n        } else if (type == \"T\") {\r\n          tetromino = \"0001\";\r\n          tetromino += \"0011\";\r\n          tetromino += \"0001\";\r\n          tetromino += \"0000\";\r\n        } else if (type == \"skew\") {\r\n          tetromino = \"0000\";\r\n          tetromino += \"0010\";\r\n          tetromino += \"0011\";\r\n          tetromino += \"0001\";\r\n        }\r\n        break;\r\n      case 180:\r\n        if (type == \"straight\") {\r\n          tetromino = \"0000\";\r\n          tetromino += \"0000\";\r\n          tetromino += \"0000\";\r\n          tetromino += \"1111\";\r\n        } else if (type == \"square\") {\r\n          tetromino = \"0110\";\r\n          tetromino += \"0110\";\r\n          tetromino += \"0000\";\r\n          tetromino += \"0000\";\r\n        } else if (type == \"L\") {\r\n          tetromino = \"0011\";\r\n          tetromino += \"0001\";\r\n          tetromino += \"0001\";\r\n          tetromino += \"0000\";\r\n        } else if (type == \"T\") {\r\n          tetromino = \"0000\";\r\n          tetromino += \"0000\";\r\n          tetromino += \"0010\";\r\n          tetromino += \"0111\";\r\n        } else if (type == \"skew\") {\r\n          tetromino = \"0000\";\r\n          tetromino += \"0000\";\r\n          tetromino += \"0110\";\r\n          tetromino += \"1100\";\r\n        }\r\n        break;\r\n      case 270:\r\n        if (type == \"straight\") {\r\n          tetromino = \"1000\";\r\n          tetromino += \"1000\";\r\n          tetromino += \"1000\";\r\n          tetromino += \"1000\";\r\n        } else if (type == \"square\") {\r\n          tetromino = \"0110\";\r\n          tetromino += \"0110\";\r\n          tetromino += \"0000\";\r\n          tetromino += \"0000\";\r\n        } else if (type == \"L\") {\r\n          tetromino = \"0000\";\r\n          tetromino += \"0000\";\r\n          tetromino += \"0100\";\r\n          tetromino += \"0111\";\r\n        } else if (type == \"T\") {\r\n          tetromino = \"1000\";\r\n          tetromino += \"1100\";\r\n          tetromino += \"1000\";\r\n          tetromino += \"0000\";\r\n        } else if (type == \"skew\") {\r\n          tetromino = \"1000\";\r\n          tetromino += \"1100\";\r\n          tetromino += \"0100\";\r\n          tetromino += \"0000\";\r\n        }\r\n        break;\r\n    }\r\n    this.tetromino = tetromino;\r\n  }\r\n\r\n  getFilledPositions() {\r\n    let positions = [];\r\n\r\n    let x = this.x;\r\n    let y = this.y;\r\n\r\n    for (let i = 0; i < this.tetromino.length; i++) {\r\n      if (i % 4 == 0) {\r\n        y += this.squareSize;\r\n      }\r\n\r\n      if (this.tetromino[i] == \"1\") {\r\n        positions.push({ x: x, y: y });\r\n      }\r\n\r\n      x += this.squareSize;\r\n\r\n      if (x >= this.x + 4 * this.squareSize) {\r\n        x = this.x;\r\n      }\r\n    }\r\n    return positions;\r\n  }\r\n\r\n  drawSquare(x, y) {\r\n    const context = this.gameCanvas.getContext(\"2d\");\r\n    context.beginPath();\r\n    context.fillStyle = \"green\";\r\n    context.strokeStyle = \"black\";\r\n    context.fillRect(x, y, this.squareSize, this.squareSize);\r\n    context.rect(x, y, this.squareSize, this.squareSize);\r\n    context.stroke();\r\n  }\r\n\r\n  draw() {\r\n    let x = this.x;\r\n    let y = this.y;\r\n\r\n    for (let i = 0; i < this.tetromino.length; i++) {\r\n      if (i % 4 == 0) {\r\n        y += this.squareSize;\r\n      }\r\n\r\n      if (this.tetromino[i] == \"1\") {\r\n        this.drawSquare(x, y);\r\n      }\r\n\r\n      x += this.squareSize;\r\n\r\n      if (x >= this.x + 4 * this.squareSize) {\r\n        x = this.x;\r\n      }\r\n    }\r\n  }\r\n\r\n  moveLeft() {\r\n    if (this.locked === false) {\r\n      let x = 0;\r\n      let y = 0;\r\n      let canMove = true;\r\n      for (let i = 0; i < this.tetromino.length; i++) {\r\n        if (i % 4 == 0) {\r\n          y += this.squareSize;\r\n        }\r\n\r\n        if (this.tetromino[i] == \"1\") {\r\n          // If x position of '1' is > 0\r\n          // OK to move piece left\r\n          x = i % 4;\r\n          x *= this.squareSize;\r\n          canMove &= (this.x + x) > 0;\r\n        }\r\n      }\r\n\r\n      if (canMove) {\r\n        this.x -= this.squareSize;\r\n      }\r\n    }\r\n  }\r\n\r\n  moveRight() {\r\n    if (this.locked === false) {\r\n      let x = 0;\r\n      let y = 0;\r\n      let canMove = true;\r\n      for (let i = 0; i < this.tetromino.length; i++) {\r\n        if (i % 4 == 0) {\r\n          y += this.squareSize;\r\n        }\r\n\r\n        if (this.tetromino[i] == \"1\") {\r\n          // If x position of '1' is > 0\r\n          // OK to move piece left\r\n          x = i % 4;\r\n          x *= this.squareSize;\r\n          canMove &= (this.x + x) < (this.gameCanvas.width - this.squareSize);\r\n        }\r\n      }\r\n\r\n      if (canMove) {\r\n        this.x += this.squareSize;\r\n      }\r\n    }\r\n  }\r\n\r\n  moveDown() {\r\n    if (this.locked === false) {\r\n      this.y += this.squareSize;\r\n      if (this.y + this.squareSize > this.gameCanvas.height) {\r\n        this.y = this.gameCanvas.width - this.squareSize;\r\n      }\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://spaceinvaders/./src/js/tetromino.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;