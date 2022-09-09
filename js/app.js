/*-------------------------------- Constants --------------------------------*/



/*----------------------------- Variables (state) ---------------------------*/
let board, snake, apple, score

/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('#board')
const snakeEl = document.querySelector('#snake')
const scoreEl = document.querySelector('#score')
const highScoreEl = document.querySelector('#high-score')
const startBtn = document.querySelector('button')



/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  snake = [0,0]
  score = 0
  apple = 0
  board = getBoard()
  render()
}

function render() {

}
function getBoard () {
  for (let i =0; i < 100; i ++){
    let pixel = document.createElement('div')
    boardEl.appendChild(pixel)
  }
}