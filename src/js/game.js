import  Tetromino from './tetromino';

export class Game {
    constructor(gameCanvas, score = 0, lives = 1, speed = 1) {
        this.keys = {
            left: false,
            right: false,
            rotate: false,
        };

        this.mouseDown = false;
        
        this.gameBoard = [];

        this.squareSize = 10;

        this.level = 1;
        this.score = score;
        this.lives = lives;
        this.speed = speed;
        this.delta = 1 / speed;
        this.gameCanvas = gameCanvas;
        this.state = 'New Game';
        this.dead = false;
        this.gameFont = "monospace";

        this.tickCount = 0;

        this.newGame();

        this.update = this.update.bind(this);

        // Event listeners
        this.keyDownHandlerBind = this.keyDownHandlerBind.bind(this);
        this.keyUpHandlerBind = this.keyUpHandlerBind.bind(this);
        this.mouseHandlerBind = this.mouseHandlerBind.bind(this);
        this.touchHandlerBind = this.touchHandlerBind.bind(this);
        this.controlsHandlerBind = this.controlsHandlerBind.bind(this);

        document.addEventListener('keydown', this.keyDownHandlerBind);
        document.addEventListener('keyup', this.keyUpHandlerBind);
        document.addEventListener('mousedown', this.mouseHandlerBind);
        document.addEventListener('mouseup', this.mouseHandlerBind);
        
        const buttons = document.querySelectorAll('.controls-container button');
        buttons.forEach(button => {
            button.addEventListener('click', this.controlsHandlerBind);
            button.addEventListener('touchend', this.touchHandlerBind);
            button.addEventListener('touchstart', this.touchHandlerBind);
            button.addEventListener('touchcancel', this.touchHandlerBind);
            button.addEventListener('touchmove', this.touchHandlerBind);
        });
    }

    newGame() {
        this.keys = {
            left: false,
            right: false,
            rotate: false,
        };

        this.mouseDown = false;

        this.gameBoard = [];
        for (let row = 0; row < (this.gameCanvas.height / this.squareSize); row++) {
            let cells = [];
            for (let cell = 0; cell < (this.gameCanvas.width / this.squareSize); cell++) {
                cells.push('0');
            }
            this.gameBoard.push(cells);
        }

        // For testing
        for (let i = 0; i < 28; i++) {
            this.gameBoard[39][i] = '1';
        }

        for (let i = 0; i < 28; i++) {
            this.gameBoard[38][i] = '1';
        }

        if (this.state === 'Won') {
            this.dead = true;
        }
        if (this.dead) {
            this.score = 0;
            this.level = 1;
            this.dead = false;
            this.lives = 1;
        }

        this.tickCount = 0;

        // Create game objects
        this.tetromino = new Tetromino(this.gameCanvas, this.squareSize);

        this.drawNewGame(this.gameCanvas.width / 2, this.gameCanvas.height / 2, 40);
    }

    controlsHandlerBind(e) {
        // if (e.target.id === 'control-left') {
        //     this.tetromino.moveLeft();
        // } else if (e.target.id === 'control-right') {
        //     this.tetromino.moveRight();
        // } else if (e.target.id === 'control-rotate') {
        //     this.rotate();
        // }
    }
    
    touchHandlerBind(e) {
        e.preventDefault();
        if (e.type === "touchstart") {
            if (e.target.id === 'control-left') {
                this.keys['left'] = true;
            } else if (e.target.id === 'control-right') {
                this.keys['right'] = true;
            } else if (e.target.id === 'control-rotate') {
                this.keys['rotate'] = true;
            }
        } else if (e.type === "touchend") {
            if (e.target.id === 'control-left') {
                // this.keys['left'] = false;
            } else if (e.target.id === 'control-right') {
                // this.keys['right'] = false;
            } else if (e.target.id === 'control-rotate') {
                // this.keys['rotate'] = false;
            }
        }
    }

    mouseHandlerBind(e) {
        if (e.buttons > 0) {
            this.mouseDown = true;
        } else {
            this.mouseDown = false;
        }
    }

    keyDownHandlerBind(e) {
        if (e.key === 'a') { this.keys['left'] = true; }
        if (e.key === 'ArrowLeft') {
            this.keys['left'] = true;
        }

        if (e.key === 'd') { this.keys['right'] = true; }
        if (e.key === 'ArrowRight') {
            this.keys['right'] = true;
        }

        if (e.key === 's') { this.keys['rotate'] = true; }
    }

    keyUpHandlerBind(e) {
        // if (e.key === 'a') { this.keys['left'] = false; }
        // if (e.key === 'ArrowLeft') {
        //     this.keys['left'] = false;
        // }

        // if (e.key === 'd') { this.keys['right'] = false; }
        // if (e.key === 'ArrowRight') {
        //     this.keys['right'] = false;
        // }

        // if (e.key === 's') { this.keys['rotate'] = false; }
    }

    drawWonScreen(x, y, fontSize) {
        const context = this.gameCanvas.getContext('2d');
        context.fillStyle = '#FFF';
        context.font = `${fontSize}px ${this.gameFont}`;
        const text = "You won!";
        let textWidth = context.measureText(text).width;

        context.fillText(text, x - (textWidth / 2), y - (fontSize / 2));

        const controlsFontSize = fontSize / 3;
        context.font = `bold ${controlsFontSize}px ${this.gameFont}`;
        const controls = "Press a button to play again";
        textWidth = context.measureText(controls).width;
        context.fillText(controls, x - (textWidth / 2), y + controlsFontSize);
    }

    drawGameOver(x, y, text, fontSize) {
        const context = this.gameCanvas.getContext('2d');
        context.fillStyle = '#FFF';
        context.font = `${fontSize}px ${this.gameFont}`;

        const textWidth = context.measureText(text).width;

        context.fillText(text, x - (textWidth / 2), y);
    }

    drawInstructions(x, y, fontSize) {
        const context = this.gameCanvas.getContext('2d');
        context.fillStyle = '#FFF';
        context.font = `${fontSize}px ${this.gameFont}`;
        const text = `Press a key to continue`;
        const textWidth = context.measureText(text).width;

        context.fillText(text, x - (textWidth / 2), y + (fontSize / 2));
    }

    drawLevel(x, y, level, fontSize) {
        const context = this.gameCanvas.getContext('2d');
        context.fillStyle = '#FFF';
        context.font = `${fontSize}px ${this.gameFont}`;
        const text = `Level: ${level}`;
        const textWidth = context.measureText(text).width;

        context.fillText(text, x - (textWidth / 2), y);
    }

    drawNewGame(x, y, fontSize) {
        const context = this.gameCanvas.getContext('2d');
        context.fillStyle = '#FFF';
        context.font = `${fontSize}px ${this.gameFont}`;
        const text = "New Game";
        let textWidth = context.measureText(text).width;

        context.fillText(text, x - (textWidth / 2), y - (fontSize / 2));

        const controlsFontSize = fontSize / 3;
        context.font = `bold ${controlsFontSize}px ${this.gameFont}`;
        const controls = "Left: A, Right: D, Rotate: S";
        textWidth = context.measureText(controls).width;
        context.fillText(controls, x - (textWidth / 2), y + controlsFontSize);
    }

    drawSquare(x, y) {
        const context = this.gameCanvas.getContext('2d');
        context.beginPath();
        context.fillStyle = "green";
        context.strokeStyle = "black";
        context.fillRect(x, y, this.squareSize, this.squareSize);
        context.rect(x, y, this.squareSize, this.squareSize);
        context.stroke();        
    }

    draw() {
        const context = this.gameCanvas.getContext('2d');
        // Clear the canvas
        context.fillStyle = '#000';
        context.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
        if (this.state !== 'Playing') {
            context.globalAlpha = 0.3;
        } else {
            context.globalAlpha = 1;
        }
        
        this.tetromino.draw();

        for (let i = 0; i < this.gameBoard.length; i++) {
            for (let j = 0; j < this.gameBoard[i].length; j++) {
                if (this.gameBoard[i][j] == '1') {
                    this.drawSquare(j * this.squareSize, i * this.squareSize);
                }
            }
        }

        context.globalAlpha = 1;

        if (this.state === 'Next Level') {
            const middleOfCanvas = this.gameCanvas.width / 2;
            const fontSize = 40;
            // this.drawLevel(middleOfCanvas, this.gameCanvas.height / 2, this.level, fontSize);
            this.drawInstructions(middleOfCanvas, this.gameCanvas.height / 2 + (fontSize), (fontSize / 3));
        } else if (this.state === 'Game Over') {
            const middleOfCanvas = this.gameCanvas.width / 2;
            const fontSize = 40;
            this.drawGameOver(middleOfCanvas, this.gameCanvas.height / 2, "Game Over", fontSize);
            this.drawInstructions(middleOfCanvas, this.gameCanvas.height / 2 + (fontSize), (fontSize / 3));
        } else if (this.state === 'New Game') {
            const middleOfCanvas = this.gameCanvas.width / 2;
            const fontSize = 40;
            this.drawNewGame(middleOfCanvas, this.gameCanvas.height / 2, fontSize);
        } else if (this.state === 'Won') {
            const middleOfCanvas = this.gameCanvas.width / 2;
            const fontSize = 30;
            this.drawWonScreen(middleOfCanvas, this.gameCanvas.height / 2, fontSize);
        }
    }

    isRowComplete(row) {
        let expectedCellCount = this.gameCanvas.width / this.squareSize;

        for (let i = 0; i < expectedCellCount; i++) {
            if (this.gameBoard[row][i] != '1') {
                return false;
            }
        }
        return true;
    }

    isGameOver() {
        return (this.lives < 1);
    }

    removeRow(row) {
        for (let i = 0; i < this.gameBoard.length; i++) {
            this.gameBoard[row - 1][i] = '0';
        }
    }

    shiftGameBoardDown(removedRow) {
        // Start at the last row in the array
        // Copy previous row into the last row
        // Decrement the row index and repeat
        // until row index is 1
        for (let row = removedRow; row >= 1; row--) {
            for (let column = 0; column < this.gameBoard[0].length; column++) {
                this.gameBoard[row][column] = this.gameBoard[row - 1][column];
            }
        }
    }

    update() {
        // updates every 50ms
        this.tickCount += 1;
        const gameScore = document.querySelector('.game-score');
        const gameLevel = document.querySelector('.game-level');

        gameLevel.style.visibility = "hidden";

        if (this.isGameOver() && this.state !== 'Game Over') {
            this.state = 'Game Over';
            this.dead = true;
            this.lives = 0;
        }
        
        // updates every 50ms
        if (this.state === 'Playing' ) {
            // Check for collisions
            let collisionDetected = this.collisionCheck('bottom');
            if (collisionDetected) {
                this.tetromino.lock();
                let filledCells = this.tetromino.getFilledPositions();

                filledCells.forEach(cell => {
                    let y = (cell.y / this.squareSize);
                    let x = (cell.x / this.squareSize);
                    this.gameBoard[y][x] = '1';
                })

                this.tetromino = new Tetromino(this.gameCanvas, this.squareSize);
            }

            // Update positions
            if (this.tickCount > 2) {
                this.updatePlayerPosition();
            }

            if (this.tickCount >= 5) {
                this.tickCount = 0;
                this.moveTetrominoDown();
            }

            // For each complete row remove the row
            // Shift all cells above the completed row down
            let rowsComplete = [];
            for (let row = 0; row < this.gameCanvas.height / this.squareSize; row++) {
                if (this.isRowComplete(row)) {
                    rowsComplete.push(row);
                    this.shiftGameBoardDown(row);
                    this.score += 1;
                }
            }

            if (rowsComplete.length > 0) {
                this.tetromino = new Tetromino(this.gameCanvas, this.squareSize);
            }
        }

        // Update score
        gameScore.innerText = `Score: ${this.score}`;

        if ((this.state !== 'Playing') && ((this.mouseDown) 
            || this.keys['rotate']
            || this.keys['left']
            || this.keys['right'])) {
            if (this.state !== 'New Game') { this.newGame(); }
            this.state = 'Playing';
        }

        this.draw();
    }

    moveTetrominoDown() {
        if (this.collisionCheck('bottom') === false) {
            this.tetromino.moveDown();
        }

        if (this.collisionCheck('top')) {
            this.tetromino.lock();
            this.lives = 0;
        }
    }

    updatePlayerPosition() {
        if (this.keys['left']) {
            this.keys['left'] = false;
            if (this.collisionCheck('left') === false) { this.tetromino.moveLeft(); }
        } else if (this.keys['right']) {
            if (this.collisionCheck('right') === false) { this.tetromino.moveRight(); }
            this.keys['right'] = false;
        }
        else if (this.keys['rotate']) {
            this.keys['rotate'] = false;
            this.tetromino.rotate();
        }
    }

    collisionCheck(type) {
        let collision = false;

        // Collision between Tetromino and filled cells
        let tetrominoCells = this.tetromino.getFilledPositions();
        tetrominoCells.forEach(cell => {
            if (type === 'top') {
                // TODO: Prevent code duplication
                if ((cell.y / this.squareSize) + 1 <= this.gameBoard.length - 1) {
                    if (this.gameBoard[(cell.y / this.squareSize) + 1][(cell.x / this.squareSize)] == '1'
                    && (cell.y / this.squareSize) <= 2) {
                        collision = true;
                    }
                }
            }
            else if (type === 'bottom') {
                // Bottom of screen
                // if (this.tetromino.getBottom() >= (this.gameCanvas.height - this.squareSize)) {
                //     collision = true;
                // }
                if ((cell.y / this.squareSize) + 1 > this.gameBoard.length - 1) {
                    collision = true;
                }

                // Directly below
                if ((cell.y / this.squareSize) + 1 <= this.gameBoard.length - 1) {
                    if (this.gameBoard[(cell.y / this.squareSize) + 1][(cell.x / this.squareSize)] == '1') {
                        collision = true;
                    }
                }
            } else if (type === 'left') {
                // Left
                // Prevent array index exception
                if ((cell.x / this.squareSize) - 1 >= 0) {
                    if (this.gameBoard[cell.y / this.squareSize][(cell.x / this.squareSize) - 1] == '1') {
                        collision = true;
                    }
                }
            } else if (type === 'right') {
                // Right
                // Prevent array index exception
                if ((cell.x / this.squareSize) + 1 <= this.gameBoard[0].length - 1) {
                    if (this.gameBoard[cell.y / this.squareSize][(cell.x / this.squareSize) + 1] == '1') {
                        collision = true;
                    }
                }
            }
        });      
        
        return collision;
    }
}