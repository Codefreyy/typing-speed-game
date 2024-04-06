import { faker } from "@faker-js/faker"
import WordComponent from "./components/GenerateWords"
import CountdownTimer from "./components/CountdownTimer"
import { useEffect, useState } from "react"
import DisplayResult from "./components/DisplayResult"

let timer: number
const countDownSeconds = 10

function App() {
  const [timeLeft, setTimeLeft] = useState(countDownSeconds)
  const [isCountDownStart, setIsCountDownStart] = useState(false)
  const [words, setWords] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [resultIndexArr, setResultIndexArr] = useState<boolean[]>([])

  useEffect(() => {
    setWords(faker.word.words(10)) // initialize word list
  }, [])

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
    document.addEventListener("keyup", PopKeyUp, false)

    return () => {
      console.log("stof listenr")
      document.removeEventListener("keyup", PopKeyUp, false)
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
    const currentChar = words[currentWordIndex]
    setCurrentWordIndex((prev) => prev + 1)
    if (currentChar == char || (char == "ce" && currentChar == " ")) {
      setResultIndexArr([...resultIndexArr, true])
    } else {
      setResultIndexArr([...resultIndexArr, false])
    }
  }
  return (
    <>
      <CountdownTimer timeLeft={timeLeft} />
      <WordComponent words={words} wordStatus={resultIndexArr} />
      <DisplayResult
        resultArr={resultIndexArr}
        inCountDownEnd={!isCountDownStart}
        originalWords={words}
      />
    </>
  )
}

export default App
