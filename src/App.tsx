import { faker } from "@faker-js/faker"
import WordComponent from "./components/GenerateWords"
import CountdownTimer from "./components/CountdownTimer"
import { useEffect, useState } from "react"

const words = faker.word.words(10)

function App() {
  const [timeLeft, setTimeLeft] = useState(30)
  const [isCountDownStart, setIsCountDownStart] = useState(false)

  function countDown() {
    setInterval(() => {
      setTimeLeft((p) => p - 1)
    }, 1000)
  }

  useEffect(() => {
    document.addEventListener("keyup", PopKeyUp, false)

    return () => {
      document.removeEventListener("keyup", PopKeyUp, false)
    }
  })

  function PopKeyUp(e: KeyboardEvent) {
    if (!isCountDownStart) {
      countDown()
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
