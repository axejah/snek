// header DOM
let header = document.getElementsByClassName("header")[0];
let gameFrame = document.getElementsByClassName("game")[0];

// start game text
let playGame = document.getElementById("playGame");

let gameTitle = document.createElement("h1");
gameTitle.innerText = "SNEK";
header.appendChild(gameTitle);

let gameDescription = document.createElement("p");
gameDescription.innerText = "My first try at creating a Snake game";
header.appendChild(gameDescription);

let GAME_SPEED = 80;
let playerLevel = 1;

showPlayerLevel = document.createElement("p");
showPlayerLevel.innerText = `LEVEL: ${playerLevel}`;
gameFrame.appendChild(showPlayerLevel);

// colors
const CANVAS_BORDER = "#c295d8";
const CANVAS_BACKGROUND = "#ffc8c8";
const SNEK_COLOR = "#d8345f";
const SNEK_BORDER = "#100303";
const SNEK_FOOD = "#a3de83";
const SNEK_FOOD_BORDER = SNEK_BORDER;

// canvas context en color assignment
var gameCanvas = document.getElementById("snekCanvas");
var ctx = snekCanvas.getContext("2d");

// wrap gameifeld in function for it to be repainted each time snake moves
function clearCanvas() {
  ctx.fillStyle = CANVAS_BACKGROUND;
  ctx.strokeStyle = CANVAS_BORDER;
  ctx.fillRect(0, 0, snekCanvas.width, snekCanvas.height);
  ctx.strokeRect(0, 0, snekCanvas.width, snekCanvas.height);
}
clearCanvas();

// eerste snake / main snake array
let snek = [
  { x: 300, y: 300 },
  { x: 280, y: 300 },
  { x: 260, y: 300 },
  { x: 240, y: 300 },
  { x: 220, y: 300 },
];

let gameScore = 0;
showScore = document.createElement("p");
showScore.innerText = `SCORE: ${gameScore}`;
gameFrame.appendChild(showScore);

// when true snake is changing direction
let direction = false;

// snek directions
let dx = 20;
let dy = 0;

// start game after pressing spacebar

document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    snekGame();
  }
};

// create first chaps
createFood();

// event listener for moving snake
document.addEventListener("keydown", snekDirection);

// main function that moves the snake initially
function snekGame() {
  if (endGame()) {
    playGame.innerText = "Game Over! Press the R to try again";
    addEventListener("keydown", function (event) {
      if (event.keyCode == 82) location.reload();
    });
    return;
  }
  setTimeout(function onTick() {
    direction = false;
    playGame.innerText = "SssSssSsnek!";
    clearCanvas();
    drawFood();
    moveSnek();
    drawSnek();
    // Call main again
    snekGame();
  }, GAME_SPEED);
}

// give snake color and border
function drawSnekPart(snekPart) {
  ctx.fillStyle = SNEK_COLOR;
  ctx.strokeStyle = SNEK_BORDER;
  ctx.fillRect(snekPart.x, snekPart.y, 20, 20);
  ctx.strokeRect(snekPart.x, snekPart.y, 20, 20);
}

// movement handler
function snekDirection(e) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const W_KEY = 87;
  const A_KEY = 65;
  const S_KEY = 83;
  const D_KEY = 68;

  if (direction) return;
  direction = true;

  const kPress = e.keyCode;
  const up = dy === -20;
  const down = dy === 20;
  const right = dx === 20;
  const left = dx === -20;

  if (kPress === (LEFT_KEY || A_KEY) && !right) {
    dx = -20;
    dy = 0;
  }
  if (kPress === (UP_KEY || W_KEY) && !down) {
    dx = 0;
    dy = -20;
  }
  if (kPress === (DOWN_KEY || S_KEY) && !up) {
    dx = 0;
    dy = 20;
  }
  if (kPress === (RIGHT_KEY || D_KEY) && !left) {
    dx = 20;
    dy = 0;
  }
}

// create snake from array
function drawSnek() {
  snek.forEach(drawSnekPart);
}
// spawn snake
drawSnek();

function moveSnek() {
  const head = { x: snek[0].x + dx, y: snek[0].y + dy };
  snek.unshift(head);
  const snekEatFood = snek[0].x === foodX && snek[0].y === foodY;
  if (snekEatFood) {
    gameScore += 1;
    let playerScore = gameScore * 5;
    showScore.innerText = `SCORE: ${playerScore}`;
    if (gameScore % 5 == 0 && GAME_SPEED > 50) {
      GAME_SPEED -= 2;
      playerLevel += 1;
      showPlayerLevel.innerText = `LEVEL: ${playerLevel}`;
    }
    createFood();
  } else {
    snek.pop();
  }
}

// generate food
function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

// check for snake position
function createFood() {
  foodX = randomFood(0, gameCanvas.width - 20);
  foodY = randomFood(0, gameCanvas.height - 20);
  snek.forEach(function isFoodOnSnek(part) {
    const foodIsOnSnek = part.x == foodX && part.y == foodY;
    if (foodIsOnSnek) {
      createFood();
    }
  });
}

// draw food on canvas
function drawFood() {
  ctx.fillStyle = SNEK_FOOD;
  ctx.strokeStyle = SNEK_FOOD_BORDER;
  ctx.fillRect(foodX, foodY, 20, 20);
  ctx.strokeRect(foodX, foodY, 20, 20);
}

function endGame() {
  for (let i = 4; i < snek.length; i++) {
    const hitSnek = snek[i].x === snek[0].x && snek[i].y === snek[0].y;
    if (hitSnek) return true;
  }
  const hitLeft = snek[0].x < 0;
  const hitRight = snek[0].x > gameCanvas.width - 20;
  const hitTop = snek[0].y < 0;
  const hitBottom = snek[0].y > gameCanvas.height - 20;
  return hitLeft || hitRight || hitTop || hitBottom;
}

function increaseDifficulty() {}
