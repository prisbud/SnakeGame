const grid = document.querySelector(".grid");
const btnStart = document.getElementById("start");
const ScoreDisplay = document.getElementById("score");
let squares = [];
let currentsnake = [2, 1, 0];
let direction = 1;
let width = 10;
let appleIndex = 0;
let Score = 0;
let intervalTime = 1000;
let timerId = 0;
let speed = 0.9;

function createGrid() {
  // create 100 of elecments

  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}

createGrid();
currentsnake.forEach((index) => squares[index].classList.add("snake"));

function startGame() {
  //remove the snake
  currentsnake.forEach((index) => squares[index].classList.remove("snake"));
  //remove the apple
  squares[appleIndex].classList.remove("apple");
  clearInterval(timerId);
  currentsnake = [2, 1, 0];
  Score = 0;
  direction = 1;
  intervalTime = 1000;

  ScoreDisplay.textContent = Score;
  generateApple();
  currentsnake.forEach((index) => squares[index].classList.add("snake"));
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    (currentsnake[0] + width >= width * width && direction === width) ||
    (currentsnake[0] % width === 9 && direction === 1) ||
    (currentsnake[0] % width === 0 && direction === -1) ||
    (currentsnake[0] + width < 0 && direction === -width) ||
    squares[currentsnake[0] + direction].classList.contains("snake")
  ) {
    return clearInterval(timerId);
  }

  //remove last element from our currentSnake array
  const tail = currentsnake.pop();
  //remove styling from last element
  squares[tail].classList.remove("snake");
  //add square in direction we are heading
  currentsnake.unshift(currentsnake[0] + direction);
  //add styling so we can see it
  squares[currentsnake[0]].classList.add("snake");

  if (squares[currentsnake[0]].classList.contains("apple")) {
    //remove class of apple
    squares[currentsnake[0]].classList.remove("apple");
    //grow our snake by 1
    squares[tail].classList.add("snake");
    //grow our snake array
    currentsnake.push(tail);
    //generate new apple
    generateApple();
    //display score
    Score++;

    ScoreDisplay.textContent = Score;
    //speed up our snake
    clearInterval(timerId);
    intervalTime = intervalTime * 0.9;
    timerId = setInterval(move, intervalTime);
  }
}
//move();

//generate apple
function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));

  squares[appleIndex].classList.add("apple");
}

//clearInterval(timerID);
function control(e) {
  console.log();
  if (e.keyCode === 39) {
    console.log("right pressed");
    direction = 1;
  } else if (e.keyCode === 38) {
    console.log("up pressed");
    direction = -width;
  } else if (e.keyCode === 37) {
    console.log("left pressed");
    direction = -1;
  } else if (e.keyCode === 40) {
    console.log("down pressed");
    direction = +width;
  }
}

//document.addEventListener("keypress", control);
document.addEventListener("keydown", control);
btnStart.addEventListener("click", startGame);
