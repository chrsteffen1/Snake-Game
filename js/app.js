/*-------------------------------- Constants --------------------------------*/



/*----------------------------- Variables (state) ---------------------------*/
let board, snake, apple, direction, score, snakeHead, snakeTail, highScore, intervalId

/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('#board')
const scoreEl = document.querySelector('#score')
const highScoreEl = document.querySelector('#high-score')
const startBtn = document.querySelector('button')
const keyBoard = document.querySelector('body')
const resetBtn = document.querySelector('#reset')
// const imgEl = document.querySelector('#pic')




/*----------------------------- Event Listeners -----------------------------*/

keyBoard.addEventListener('keydown', keyPress)
resetBtn.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  score = 0
  snake = 0
  apple = 0
  highScore = 0
  direction = 39
  scoreEl.textContent = (`Score:${score}`)
  highScoreEl.textContent = (`HighScore:${highScore}`)
  snakeHead = [snake]
  snakeTail =[]
  boardEl.innerHTML = ''
  boardEl.style.visibility = 'visible'
  getBoard()
  createSnake()
  createApple()
  // startGame()
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
function createApple() {
  while(snakeHead.includes(apple)){
    apple = Math.floor(Math.random() * 100)
  }
  boardEl.children[apple].classList.add('apple')
}

function updateSnake() {
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
  // imgEl.setAttribute("hidden", false)
}
function keyPress(evt) { 
  if (evt.code === 'ArrowDown'){
    direction = 40
  } else if (evt.code === 'ArrowRight'){
    direction = 39
  } else if (evt.code === 'ArrowUp'){
    direction = 38
  } else if (evt.code === 'ArrowLeft'){
    direction = 37
  }
  move(direction)
  return direction
}



function startGame(){
  intervalId = setInterval(move, 1000, direction)
}
function move(){
  boardEl.children[snake].classList.remove('snake')
    if(direction === 40){
      snake +=10
      snakeHead.unshift((snake))
      snakeHead.pop()
      if (snake >= 100){
        gameOver()
      }
    } else if (direction === 39){
        snake += 1
        snakeHead.unshift((snake)) 
        snakeHead.pop()
        if ((snake % 10) === 0){
        gameOver()
        }
      }else if (direction === 38){
        snake -= 10
        snakeHead.unshift((snake)) 
        snakeHead.pop()
        if (snake < 0){
        gameOver()
        }
      } else if( direction === 37){
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

