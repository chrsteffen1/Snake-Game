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




/*----------------------------- Event Listeners -----------------------------*/

keyBoard.addEventListener('keydown', keyPress)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  snake = 0
  score = 0
  apple = 0
  xSpeed = 0
  ySpeed = 0
  getBoard()
  createSnake()
  createApple()
  render()
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
  boardEl.children[0].classList.add('snake')
}
function keyPress(evt) {
  
}
function createApple() {
  boardEl.children[Math.floor(Math.random() * 100)].classList.add('apple')
}

