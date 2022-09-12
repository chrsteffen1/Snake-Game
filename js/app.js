/*-------------------------------- Constants --------------------------------*/



/*----------------------------- Variables (state) ---------------------------*/
let board, snake, apple, direction, score, snakeHead, snakeTail

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
  apple = 0
  scoreEl.textContent = (`Score:${score}`)
  snakeHead = [snake]
  snakeTail =[]
  boardEl.innerHTML = ''
  boardEl.style.visibility = 'visible'
  getBoard()
  createSnake()
  createApple()
  // setInterval(updateSnake, 1000 );
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
  boardEl.children[snake].classList.remove('snake')
  if (evt.code === 'ArrowDown'){
    snake +=10
    snakeHead.unshift((snake)) 
    snakeHead.pop()
    if (snake >= 100){
      gameOver()
    }
  } else if (evt.code === 'ArrowRight'){
    snake += 1
    snakeHead.unshift((snake)) 
    snakeHead.pop()
    if ((snake % 10) === 0){
      gameOver()
    }
  } else if (evt.code === 'ArrowUp'){
    snake -= 10
    snakeHead.unshift((snake)) 
    snakeHead.pop()
    if (snake < 0){
      gameOver()
    }
  } else if (evt.code === 'ArrowLeft'){
    snake -= 1
    snakeHead.unshift(snake) 
    snakeHead.pop()
    if (((snake + 1)% 10) === 0){
      gameOver()
    }
  }
  removeTail()
  updateSnake()
}
function createApple() {
  while(snakeHead.includes(apple)){
    apple = Math.floor(Math.random() * 100)
  }
  boardEl.children[apple].classList.add('apple')
}

function updateSnake(position) {
  snakeTail = snakeHead.slice(-1)
  if (snake === apple){
    boardEl.children[snake].classList.remove('apple')
    snakeHead.push(snake)
    snakeTail.push(snake)
    createApple()
  }
  snakeHead.forEach(function(spot){
    boardEl.children[spot].classList.add('snake')
  })
}
function removeTail() {
  snakeTail.forEach(function(spot){
    boardEl.children[spot].classList.remove('snake')
  })
}
function gameOver() {
  boardEl.style.visibility = 'hidden'
}
