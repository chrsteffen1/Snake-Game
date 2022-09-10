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
  score = 0
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
    // let code = evt.code
  if (evt.code === 'ArrowDown'){
    console.log('move down')
  } else if (evt.code === 'ArrowRight'){
    console.log('move right')
  } else if (evt.code === 'ArrowUp'){
    console.log('move up')
  } else if (evt.code === 'ArrowLeft'){
    console.log('left')
  }
}
function createApple() {
  boardEl.children[Math.floor(Math.random() * 100)].classList.add('apple')
}

