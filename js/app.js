/*-------------------------------- Constants --------------------------------*/



/*----------------------------- Variables (state) ---------------------------*/
let board, snake, apple, direction, score

/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('#board')
const snakeEl = document.querySelector('#snake')
const scoreEl = document.querySelector('#score')
const highScoreEl = document.querySelector('#high-score')
const startBtn = document.querySelector('button')
const keyBoard = document.querySelector('body')
const resetBtn = document.querySelector('#reset')




/*----------------------------- Event Listeners -----------------------------*/

keyBoard.addEventListener('keydown', keyPress)
resetBtn.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  score = 0
  snake = 0
  boardEl.innerHTML = ''
  getBoard()
  createSnake()
  createApple()
  render()
  // setInterval(updateSnake, 1000 );
}

function render() {

}
function getBoard () {
  for (let i =0; i < 100; i ++){
    let pixel = document.createElement('div')
    pixel.classList.add('board-square' + i)
    boardEl.appendChild(pixel)
  }
}
function createSnake() {
  boardEl.children[snake].classList.add('snake')
}
function keyPress(evt) { 
  boardEl.children[snake].classList.remove('snake')
  if (evt.code === 'ArrowDown'){
    // snake.forEach(function(spot) {
    //   spot += 10
    // }) 
    snake += 10
    if (snake >= 100){
      gameOver()
    }
  } else if (evt.code === 'ArrowRight'){
    snake += 1
    if ((snake % 10) === 0){
      gameOver()
    }
  } else if (evt.code === 'ArrowUp'){
    snake -= 10
    if (snake < 0){
      gameOver()
    }
  } else if (evt.code === 'ArrowLeft'){
    snake -= 1
    if (((snake + 1)% 10) === 0){
      gameOver()
    }
  }
  updateSnake()
}
function createApple() {
  boardEl.children[Math.floor(Math.random() * 100)].classList.add('apple')
}

function updateSnake(position) {
  if(boardEl.style.visibility !== 'hidden')
    boardEl.children[snake].classList.add('snake')
}
function gameOver() {
  boardEl.style.visibility = 'hidden'
}