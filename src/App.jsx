import './App.css'
import Snake from './components/Snake'
import Food from './components/Food'
import {
  useState,
  useEffect
} from 'react'

const getRandomCoordinates = () => {
  let min = 1
  let max = 98
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
  return [x, y]
}

let interval = null


function App() {
  const [direction, setDirection] = useState('RIGHT')
  const [snake, setSnake] = useState([
    [0, 2],
    [0, 0],
    [2, 0]
  ])
  const [food, setFood] = useState(getRandomCoordinates())
  const [speed, setSpeed] = useState(200)
  const [gameover, setGameover] = useState(false)
  const [score, setScore] = useState(0)

  const state = {
    food: food,
    speed: speed,
    direction: direction,
    snakeDots: snake
  }

  const keyPress = (e) => {
    if (e.key == 'a' && direction != 'RIGHT') {
      setDirection('LEFT')
    }
    if (e.key == 'w' && direction != 'DOWN') {
      setDirection('UP')
    }
    if (e.key == 'd' && direction != 'LEFT') {
      setDirection('RIGHT')
    }
    if (e.key == 's' && direction != 'UP') {
      setDirection('DOWN')
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const moveSnake = () => {
    let dots = [...state.snakeDots]
    let head = dots[dots.length - 1]

    switch (state.direction) {
      case 'LEFT':
        head = [head[0] - 2, head[1]]
        break;
      case 'UP':
        head = [head[0], head[1] - 2]
        break;
      case 'RIGHT':
        head = [head[0] + 2, head[1]]
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2]
        break;
    }
    dots.push(head)
    dots.shift()
    setSnake(dots)
  }

  const checkCollisionBorders = () => {
    let head = state.snakeDots[state.snakeDots.length - 1]
    if (head[0] >= 100 || head[0] < 0 || head[1] >= 100 || head[1] < 0) {
      onGameOver();
      return true;
    }
  }

  const checkIfCollapsed = () => {
    let dots = [...state.snakeDots]
    let head = dots[dots.length - 1]
    dots.pop()
    for (let i = 0; i < dots.length; i++) {
      if (head[0] === dots[i][0] && head[1] === dots[i][1]) {
        onGameOver();
        return true;
      }
    }
  }

  const enlargeSnake = () => {
    let newSnake = [...state.snakeDots]
    newSnake.unshift([])
    setSnake(newSnake)
  }

  const checkIfEat = () => {
    let head = state.snakeDots[state.snakeDots.length - 1]
    let food = state.food
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(getRandomCoordinates())
      enlargeSnake();
      setSpeed(speed - 5);
      setScore(score + 1);
    }
  }


  const onGameOver = () => {
    setGameover(true)
    clearInterval(interval)
    alert(`Game Over. Your score is ${score}`)
  }

  if (gameover) {
    clearInterval(interval)
    interval = null;
  } else {
    clearInterval(interval)
    interval = setInterval(() => {
      if (checkCollisionBorders() || checkIfCollapsed()) return;
      moveSnake()
      checkIfEat()
    }, speed);
  }

  return ( 
    <div className='app'>
      <div className="game-area">
        <Snake snakeDots = {state.snakeDots}/>
        <Food dot = {state.food}/>
      </div> 
      <div className='game-points'>
        <div> Score: {score} </div>
        <div> Speed: {score * 10 + 10} </div>
      </div> 
    </div>
  )
}

export default App