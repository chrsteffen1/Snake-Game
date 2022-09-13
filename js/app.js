/*-------------------------------- Constants --------------------------------*/



/*----------------------------- Variables (state) ---------------------------*/
let board, snake, apple, direction, score, snakeHead, snakeTail, highScore, intervalId, badSnake, gameStart, speed

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
startBtn.addEventListener('click', startGame)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  score = 0
  snake = 0
  apple = 0
  direction = 'right'
  scoreEl.textContent = (`Score:${score}`)
  highScoreEl.textContent = (`HighScore:${highScore}`)
  snakeHead = [snake]
  snakeTail =[]
  gameStart = false
  boardEl.innerHTML = ''
  boardEl.style.visibility = 'visible'
  getBoard()
  createSnake()
  createApple()
  clearInterval(intervalId)
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
    score +=1
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
  snakeHead =[]
  gameStart = false
  clearInterval(intervalId)
  // imgEl.setAttribute("hidden", false)
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
  move(direction)
  hitSnake()
}



function startGame(){
  gameStart = true
  speed = 2
  intervalId = setInterval(move, (1000 / speed) ,direction)
}

function move(){
  boardEl.children[snake].classList.remove('snake')
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
  removeTail()
  updateSnake()  
  scoreEl.textContent = (`Score:${score}`)
}

function hitSnake() {
  badSnake = snakeHead.slice(1, -1)
  if(badSnake.includes(snake) && badSnake.length > 2){
    gameOver()
  }
}

