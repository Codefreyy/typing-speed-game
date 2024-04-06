import { faker } from "@faker-js/faker"
import WordComponent from "./components/GenerateWords"
import CountdownTimer from "./components/CountdownTimer"
import { useEffect, useState } from "react"

const words = faker.word.words(10)
let timer: number

function App() {
  const [timeLeft, setTimeLeft] = useState(5)
  const [isCountDownStart, setIsCountDownStart] = useState(false)

  function startCountDown() {
    timer = setInterval(() => {
      setTimeLeft((p) => p - 1)
    }, 1000)
  }

  if (timeLeft == 0) {
    clearInterval(timer)
  }

  useEffect(() => {
    document.addEventListener("keyup", PopKeyUp, false)

    return () => {
      document.removeEventListener("keyup", PopKeyUp, false)
    }
  })

  function PopKeyUp(e: KeyboardEvent) {
    if (!isCountDownStart) {
      startCountDown()
      setIsCountDownStart(true)
    } else {
      console.log(e.code)
    }
  }
  return (
    <>
      <WordComponent words={words} />
      <CountdownTimer timeLeft={timeLeft} />
    </>
  )
}

export default App
