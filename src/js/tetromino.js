export default class Tetromino {
  constructor(canvasElement, squareSize) {
    this.gameCanvas = canvasElement;
    this.squareSize = squareSize;

    this.x = this.gameCanvas.width / 2;
    this.y = this.squareSize;

    this.top = this.y;
    this.left = this.x;
    this.bottom = this.y + this.squareSize;
    this.right = this.x + this.squareSize;

    this.rotation = 0;

    this.speed = 5;
    this.locked = false;

    // Generate random tetromino type
    let typeIndex = parseInt((Math.random() * 10) % 5);
    this.types = { 0: "straight", 1: "skew", 2: "T", 3: "L", 4: "square" };

    // For testing complete row
    // typeIndex = 4;

    this.initializeTetromino(this.types[typeIndex]);
  }

  initializeTetromino(type) {
    let tetromino = `
        0000
        0000
        0000
        0000`;

    if (type == "straight") {
      tetromino = "1111";
      tetromino += "0000";
      tetromino += "0000";
      tetromino += "0000";
      tetromino += "0000";
      tetromino += "0000";
    } else if (type == "square") {
      tetromino = "0110";
      tetromino += "0110";
      tetromino += "0000";
      tetromino += "0000";
    } else if (type == "L") {
      tetromino = "1000";
      tetromino += "1000";
      tetromino += "1100";
      tetromino += "0000";
    } else if (type == "T") {
      tetromino = "1110";
      tetromino += "0100";
      tetromino += "0000";
      tetromino += "0000";
    } else if (type == "skew") {
      tetromino = "0011";
      tetromino += "0110";
      tetromino += "0000";
      tetromino += "0000";
    }

    this.tetromino = tetromino;
    this.type = type;
  }

  getBottom() {
    if (this.type == "straight") {
      return this.y + this.squareSize;
    } else if (
      this.type == "skew" ||
      this.type == "square" ||
      this.type == "T"
    ) {
      return this.y + this.squareSize * 2;
    } else if (this.type == "L") {
      return this.y + this.squareSize * 4;
    }
  }

  getFilledWidth() {
    if (this.type == "square") {
      return this.squareSize * 2;
    }
    switch (this.rotation) {
      case 0:
      // Fall through
      case 180:
        if (this.type == "straight") {
          return this.squareSize * 4;
        } else if (this.type == "L") {
          return this.squareSize * 2;
        } else if (this.type == "T" || this.type == "skew") {
          return this.squareSize * 3;
        }
        break;
      case 90:
      // Fall through
      case 270:
        if (this.type == "straight") {
          return this.squareSize * 1;
        } else if (this.type == "skew" || this.type == "T") {
          return this.squareSize * 2;
        } else if (this.type == "L") {
          return this.squareSize * 3;
        }
        break;

      default:
        break;
    }
  }

  lock() {
    this.locked = true;
  }

  rotate() {
    // TODO: Do this in a better way
    let tetromino = "";
    let type = this.type;
    console.log("Rotate");
    if (this.locked === false) {
      this.rotation += 90;
      if (this.rotation > 270) {
        this.rotation = 0;
      }
    }
    switch (this.rotation) {
        case 0: {
            this.initializeTetromino(type);
            tetromino = this.tetromino;
            break;
        }
        case 90:
        if (type == "straight") {
          tetromino = "0001";
          tetromino += "0001";
          tetromino += "0001";
          tetromino += "0001";
        } else if (type == "square") {
          tetromino = "0110";
          tetromino += "0110";
          tetromino += "0000";
          tetromino += "0000";
        } else if (type == "L") {
          tetromino = "1110";
          tetromino += "1000";
          tetromino += "0000";
          tetromino += "0000";
        } else if (type == "T") {
          tetromino = "0001";
          tetromino += "0011";
          tetromino += "0001";
          tetromino += "0000";
        } else if (type == "skew") {
          tetromino = "0000";
          tetromino += "0010";
          tetromino += "0011";
          tetromino += "0001";
        }
        break;
      case 180:
        if (type == "straight") {
          tetromino = "0000";
          tetromino += "0000";
          tetromino += "0000";
          tetromino += "1111";
        } else if (type == "square") {
          tetromino = "0110";
          tetromino += "0110";
          tetromino += "0000";
          tetromino += "0000";
        } else if (type == "L") {
          tetromino = "0011";
          tetromino += "0001";
          tetromino += "0001";
          tetromino += "0000";
        } else if (type == "T") {
          tetromino = "0000";
          tetromino += "0000";
          tetromino += "0010";
          tetromino += "0111";
        } else if (type == "skew") {
          tetromino = "0000";
          tetromino += "0000";
          tetromino += "0110";
          tetromino += "1100";
        }
        break;
      case 270:
        if (type == "straight") {
          tetromino = "1000";
          tetromino += "1000";
          tetromino += "1000";
          tetromino += "1000";
        } else if (type == "square") {
          tetromino = "0110";
          tetromino += "0110";
          tetromino += "0000";
          tetromino += "0000";
        } else if (type == "L") {
          tetromino = "0000";
          tetromino += "0000";
          tetromino += "0100";
          tetromino += "0111";
        } else if (type == "T") {
          tetromino = "1000";
          tetromino += "1100";
          tetromino += "1000";
          tetromino += "0000";
        } else if (type == "skew") {
          tetromino = "1000";
          tetromino += "1100";
          tetromino += "0100";
          tetromino += "0000";
        }
        break;
    }
    this.tetromino = tetromino;
  }

  getFilledPositions() {
    let positions = [];

    let x = this.x;
    let y = this.y;

    for (let i = 0; i < this.tetromino.length; i++) {
      if (i % 4 == 0) {
        y += this.squareSize;
      }

      if (this.tetromino[i] == "1") {
        positions.push({ x: x, y: y });
      }

      x += this.squareSize;

      if (x >= this.x + 4 * this.squareSize) {
        x = this.x;
      }
    }
    return positions;
  }

  drawSquare(x, y) {
    const context = this.gameCanvas.getContext("2d");
    context.beginPath();
    context.fillStyle = "green";
    context.strokeStyle = "black";
    context.fillRect(x, y, this.squareSize, this.squareSize);
    context.rect(x, y, this.squareSize, this.squareSize);
    context.stroke();
  }

  draw() {
    let x = this.x;
    let y = this.y;

    for (let i = 0; i < this.tetromino.length; i++) {
      if (i % 4 == 0) {
        y += this.squareSize;
      }

      if (this.tetromino[i] == "1") {
        this.drawSquare(x, y);
      }

      x += this.squareSize;

      if (x >= this.x + 4 * this.squareSize) {
        x = this.x;
      }
    }
  }

  moveLeft() {
    if (this.locked === false) {
      let x = 0;
      let y = 0;
      let canMove = true;
      for (let i = 0; i < this.tetromino.length; i++) {
        if (i % 4 == 0) {
          y += this.squareSize;
        }

        if (this.tetromino[i] == "1") {
          // If x position of '1' is > 0
          // OK to move piece left
          x = i % 4;
          x *= this.squareSize;
          canMove &= (this.x + x) > 0;
        }
      }

      if (canMove) {
        this.x -= this.squareSize;
      }
    }
  }

  moveRight() {
    if (this.locked === false) {
      let x = 0;
      let y = 0;
      let canMove = true;
      for (let i = 0; i < this.tetromino.length; i++) {
        if (i % 4 == 0) {
          y += this.squareSize;
        }

        if (this.tetromino[i] == "1") {
          // If x position of '1' is > 0
          // OK to move piece left
          x = i % 4;
          x *= this.squareSize;
          canMove &= (this.x + x) < (this.gameCanvas.width - this.squareSize);
        }
      }

      if (canMove) {
        this.x += this.squareSize;
      }
    }
  }

  moveDown() {
    if (this.locked === false) {
      this.y += this.squareSize;
      if (this.y + this.squareSize > this.gameCanvas.height) {
        this.y = this.gameCanvas.width - this.squareSize;
      }
    }
  }
}
