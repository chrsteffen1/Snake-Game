/*-------------------------------- Constants --------------------------------*/



/*----------------------------- Variables (state) ---------------------------*/
let board, snake, apple, direction, score, snakeHead, snakeTail, highScore, intervalId, badSnake, gameStart, speed, pixel, winMessage

/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('#board')
const scoreEl = document.querySelector('#score')
const highScoreEl = document.querySelector('#high-score')
const startBtn = document.querySelector('button')
const keyBoard = document.querySelector('body')
const resetBtn = document.querySelector('#reset')
const gaemOverMessageEl = document.querySelector('#game-over')




/*----------------------------- Event Listeners -----------------------------*/

keyBoard.addEventListener('keydown', keyPress)
resetBtn.addEventListener('click', init)
startBtn.addEventListener('click', startGame)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  score = 0
  snake = 0
  apple = 0
  direction = 'right'
  highScore = 0
  scoreEl.textContent = (`Score:${score}`)
  snakeHead = [snake]
  snakeTail =[]
  gameStart = false
  boardEl.innerHTML = ''
  boardEl.style.display ='grid '
  gaemOverMessageEl.textContent = ''
  resetBtn.setAttribute("hidden" , true)
  startBtn.removeAttribute('hidden')
  getBoard()
  createSnake()
  createApple()
  clearInterval(intervalId)
}
function startGame(){
  gameStart = true
  speed = 2
  intervalId = setInterval(move, (1000 / speed) ,direction)
  startBtn.setAttribute("hidden", true)
}

function getBoard () {
  for (let i =0; i < 100; i ++){
    pixel = document.createElement('div')
    pixel.classList.add('board-square' + i)
    boardEl.appendChild(pixel)
  }
}

function createSnake() {
  boardEl.children[snake].classList.add('snake-head')
}

function createApple() {
  while(snakeHead.includes(apple)){
    apple = Math.floor(Math.random() * 100)
  }
  boardEl.children[apple].classList.add('apple')
}

function keyPress(evt) { 
  if (gameStart === false){
    return
  }
  if (evt.code === 'ArrowDown'){
    if(direction === 'up' || direction === 'down'){
      return
    } else {
      direction = 'down'
    }
  } else if (evt.code === 'ArrowRight'){
    if(direction === 'right' || direction === 'left'){
      return
    } else {
      direction = 'right'
    }
  } else if (evt.code === 'ArrowUp'){
    if(direction === 'up' || direction === 'down'){
      return
    } else {
      direction = 'up'
    }
  } else if (evt.code === 'ArrowLeft'){
    if(direction === 'right' || direction === 'left'){
      return
    } else {
      direction = 'left'
    }
  }
}

function removeTail() {
  snakeTail.forEach(function(spot){
    boardEl.children[spot].classList.remove('snake')
    boardEl.children[spot].classList.remove('snake-head')
  })
}

function updateSnake() {
  snakeTail = snakeHead.slice(-1)
  if (snake === apple){
    boardEl.children[snake].classList.remove('apple')
    snakeHead.push(snake)
    snakeTail.push(snake)
    createApple()
    score +=1
  } if (score === 99){
    winner()
  }
  snakeHead.forEach(function(spot){
    boardEl.children[spot].classList.add('snake')
    boardEl.children[snakeHead[0]].classList.replace('snake','snake-head')
  })
}

function move(){
  boardEl.children[snake].classList.remove('snake-head')
  if(direction === 'down'){
    snake +=10
    snakeHead.unshift((snake))
    snakeHead.pop()
    if (snake >= 100){
      gameOver()
    }
  } else if (direction === 'right'){
    snake += 1
    snakeHead.unshift((snake)) 
    snakeHead.pop()
    if ((snake % 10) === 0){
      gameOver()
    }
  }else if (direction === 'up'){
    snake -= 10
    snakeHead.unshift((snake)) 
    snakeHead.pop()
    if (snake < 0){
      gameOver()
    }
  } else if( direction === 'left'){
    snake -= 1
    snakeHead.unshift(snake) 
    snakeHead.pop()
    if (((snake + 1)% 10) === 0){
      gameOver()
    }
  } 
  hitSnake()
  removeTail()
  updateSnake()  
  scoreEl.textContent = (`Score:${score}`)
}

function hitSnake() {
  badSnake = snakeHead.slice(1)
  if(badSnake.length > 1){
    badSnake.forEach((spot) => {
      if(spot === snake) {
        gameOver()
      }
    })
  }
}

function gameOver() {
  boardEl.style.display = 'none'
  gaemOverMessageEl.textContent = `Game Over! Your Score: ${score}`
  clearInterval(intervalId)
  snakeHead =[]
  snakeTail = []
  if (score > highScore) {
    highScore = score
  }
  highScoreEl.textContent = (`HighScore:${highScore}`)
  resetBtn.removeAttribute('hidden')
}
function winner(){
  clearInterval(intervalId)
boardEl.style.display= 'none'
  gaemOverMessageEl.textContent = 'WOW Great Job'
}