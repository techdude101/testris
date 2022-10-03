// require('../css/styles.css');

import { Game } from './game';

// Elements
const gameContainer = document.querySelector('.game-container');
const gameScore = document.querySelector('.game-score');
const gameLives = document.querySelector('.game-lives');
const gameElement = document.querySelector('.game');
const gameCanvas = document.querySelector('.game-canvas');
const buttonRotateContainer = document.querySelector('.button-rotate-container');
const controlsContainer = document.querySelector('.controls-container');

const PIXEL_RATIO = (function () {
    let ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();


const convertHiDPICanvas = function (canvas, w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return canvas;
}

//Create canvas with the device resolution.
// const canvas = convertHiDPICanvas(gameCanvas, window.innerWidth * 0.5, window.innerHeight * 0.5);

const game = new Game(gameCanvas);

controlsContainer.style.visibility = "hidden";
controlsContainer.style.display = "none";

// Detect touch event and display controls if touch is detected
window.addEventListener('touchstart', () => {
    controlsContainer.style.visibility = "visible";
    controlsContainer.style.display = "flex";
}, false);

setTimeout(function() {
    game.draw();
}, 1000);

// Game loop
setInterval(game.update, 50);