/*-------------------------------- Constants --------------------------------*/

const audioElement = new Audio(`../assests/Retro-music.mp3`)

/*----------------------------- Variables (state) ---------------------------*/
let board, snake, apple, direction, score, snakeHead, snakeTail, intervalId, badSnake, gameStart, speed, pixel, winMessage, newDirection, difficulty  
let highScore = 0
/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('#board')
const scoreEl = document.querySelector('#score')
const highScoreEl = document.querySelector('#high-score')
const speedEl = document.querySelector('#speed')
const startBtn = document.querySelector('#start-game')
const keyBoard = document.querySelector('body')
const resetBtn = document.querySelector('#reset')
const gameOverMessageEl = document.querySelector('#game-over')
const easyBtn = document.querySelector('#easy')
const normalBtn = document.querySelector('#normal')
const hardBtn = document.querySelector('#hard')
const ludicrousBtn = document.querySelector('#ludicrous')
const upBtn = document.querySelector('#up')
const downBtn = document.querySelector('#down')
const leftBtn = document.querySelector('#left')
const rightBtn = document.querySelector('#right')
const musicBtn = document.querySelector('#music-button')
/*----------------------------- Event Listeners -----------------------------*/

keyBoard.addEventListener('keydown', keyPress)
resetBtn.addEventListener('click', init)
startBtn.addEventListener('click', startGame)
easyBtn.addEventListener('click', easyMode)
normalBtn.addEventListener('click', normalMode)
hardBtn.addEventListener('click', hardMode)
ludicrousBtn.addEventListener('click', ludicrousMode)
upBtn.addEventListener('click', keyPress)
downBtn.addEventListener('click', keyPress)
leftBtn.addEventListener('click', keyPress)
rightBtn.addEventListener('click', keyPress)
musicBtn.addEventListener('click', playMusic)

/*-------------------------------- Functions --------------------------------*/
init()
normalMode()

function init() {
  score = 0
  snake = 0
  apple = 0
  direction = 'right'
  scoreEl.textContent = (`Score: ${score}`)
  snakeHead = [snake]
  snakeTail =[]
  gameStart = false
  boardEl.innerHTML = ''
  boardEl.style.display ='grid '
  gameOverMessageEl.textContent = ''
  resetBtn.setAttribute("hidden" , true)
  startBtn.removeAttribute('hidden')
  easyBtn.removeAttribute("hidden")
  normalBtn.removeAttribute("hidden")
  hardBtn.removeAttribute("hidden")
  ludicrousBtn.removeAttribute("hidden")
  upBtn.removeAttribute("hidden")
  downBtn.removeAttribute("hidden")
  rightBtn.removeAttribute("hidden")
  leftBtn.removeAttribute("hidden")
  speedEl.textContent = `${difficulty}`
  getBoard()
  createSnake()
  createApple()
  clearInterval(intervalId)
}
function startGame(){
  gameStart = true
  intervalId = setInterval(move, (1000 / speed) ,direction)
  startBtn.setAttribute("hidden", true)
}

function getBoard () {
  for (let i =0; i < 900; i ++){
    pixel = document.createElement('div')
    pixel.classList.add('board-square' + i)
    boardEl.appendChild(pixel)
  }
}

function easyMode(){
  speed = 4
  difficulty = 'Easy'
  init()
}
function normalMode(){
  speed = 6
  difficulty = 'Normal'
  init()
}
function hardMode() {
  speed = 20
  difficulty = 'Hard'
  init()
}
function ludicrousMode() {
  speed = 40
  difficulty = 'Ludicrous'
  init()
}

function createSnake() {
  boardEl.children[snake].classList.add('snake-head')
}

function createApple() {
  while(snakeHead.includes(apple)){
    apple = Math.floor(Math.random() * 900)
  }
  boardEl.children[apple].classList.add('apple')
}

function keyPress(evt) { 
  if (gameStart === false){
    return
  }
  if (evt.code === 'ArrowDown' || evt.target.id === 'down'){
    if(direction === 'up' || direction === 'down'){
      return
    } else {
      newDirection = 'down'
    }
  } else if (evt.code === 'ArrowRight' || evt.target.id === 'right'){
    if(direction === 'right' || direction === 'left'){
      return
    } else {
      newDirection = 'right'
    }
  } else if (evt.code === 'ArrowUp' || evt.target.id === 'up'){
    if(direction === 'up' || direction === 'down'){
      return
    } else {
      newDirection = 'up'
    }
  } else if (evt.code === 'ArrowLeft' || evt.target.id === 'left'){
    if(direction === 'right' || direction === 'left'){
      return
    } else {
      newDirection = 'left'
    }
  } else {
    return
  }
  setTimeout(() => { direction = newDirection}, (999/speed))
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
  } if (score === 899){
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
    snake +=30
    snakeHead.unshift((snake))
    snakeHead.pop()
    if (snake >= 900){
      gameOver()
    }
  } else if (direction === 'right'){
    snake += 1
    snakeHead.unshift((snake)) 
    snakeHead.pop()
    if ((snake % 30) === 0){
      gameOver()
    }
  }else if (direction === 'up'){
    snake -= 30
    snakeHead.unshift((snake)) 
    snakeHead.pop()
    if (snake < 0){
      gameOver()
    }
  } else if( direction === 'left'){
    snake -= 1
    snakeHead.unshift(snake) 
    snakeHead.pop()
    if (((snake + 1)% 30) === 0){
      gameOver()
    }
  } 
  hitSnake()
  removeTail()
  updateSnake()  
  scoreEl.textContent = (`Score: ${score}`)
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
  gameOverMessageEl.textContent = `Game Over! Your Score: ${score}`
  clearInterval(intervalId)
  snakeHead =[]
  snakeTail = []
  if (score > highScore) {
    highScore = score
  }
  highScoreEl.textContent = (`HighScore: ${highScore}`)
  resetBtn.removeAttribute('hidden')
  easyBtn.setAttribute("hidden" , true)
  normalBtn.setAttribute("hidden" , true)
  hardBtn.setAttribute("hidden" , true)
  ludicrousBtn.setAttribute("hidden" , true)
  upBtn.setAttribute("hidden" , true)
  downBtn.setAttribute("hidden" , true)
  rightBtn.setAttribute("hidden" , true)
  leftBtn.setAttribute("hidden" , true)
  gameStart = false
}
function winner(){
  clearInterval(intervalId)
  boardEl.style.display= 'none'
  gameOverMessageEl.textContent = 'WOW Great Job'
  easyBtn.setAttribute("hidden" , true)
  normalBtn.setAttribute("hidden" , true)
  hardBtn.setAttribute("hidden" , true)
  ludicrousBtn.setAttribute("hidden" , true)
}

function playMusic(){
  audioElement.play()
  audioElement.volume = .10
}