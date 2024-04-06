import { faker } from "@faker-js/faker"
import WordComponent from "./components/GenerateWords"
import CountdownTimer from "./components/CountdownTimer"
import { useEffect, useState } from "react"
import DisplayResult from "./components/DisplayResult"

const wordsTobeUsed = faker.word.words(10)
let timer: number
const countDownSeconds = 10

function App() {
  const [timeLeft, setTimeLeft] = useState(countDownSeconds)
  const [isCountDownStart, setIsCountDownStart] = useState(false)
  const [words, setWords] = useState(wordsTobeUsed)
  const [resultIndexArr, setResultIndexArr] = useState<boolean[]>([])

  function startCountDown() {
    setIsCountDownStart(true)
    timer = setInterval(() => {
      setTimeLeft((p) => p - 1)
    }, 1000)
  }

  useEffect(() => {
    if (timeLeft == 0) {
      clearInterval(timer)
      setIsCountDownStart(false)
    }
  }, [isCountDownStart, timeLeft, resultIndexArr])

  useEffect(() => {
    document.addEventListener("keypress", PopKeyUp, false)

    return () => {
      console.log("stof listenr")
      document.removeEventListener("keypress", PopKeyUp, false)
    }
  })

  function PopKeyUp(e: KeyboardEvent) {
    if (!isCountDownStart) {
      startCountDown()
    } else if (isCountDownStart) {
      const typedCharacter = e.code.toLocaleLowerCase().slice(3)
      // console.log(Array.from(words))
      checkCorrect(typedCharacter)
    }
  }

  function checkCorrect(char: string) {
    const shiftFirstChar = Array.from(words).shift()
    setWords((words) => words.slice(1))
    if (shiftFirstChar == char || (char == "ce" && shiftFirstChar == " ")) {
      setResultIndexArr([...resultIndexArr, true])
    } else {
      setResultIndexArr([...resultIndexArr, false])
    }
  }
  return (
    <>
      <CountdownTimer timeLeft={timeLeft} />
      <WordComponent words={wordsTobeUsed} wordStatus={resultIndexArr} />
      <DisplayResult
        resultArr={resultIndexArr}
        inCountDownEnd={!isCountDownStart}
        originalWords={wordsTobeUsed}
      />
    </>
  )
}

export default App
