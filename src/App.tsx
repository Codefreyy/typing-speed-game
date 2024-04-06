import { faker } from "@faker-js/faker"
import WordComponent from "./components/GenerateWords"
import CountdownTimer from "./components/CountdownTimer"
import { useEffect, useState } from "react"

const wordsTobeUsed = faker.word.words(10)
let timer: number

function App() {
  const [timeLeft, setTimeLeft] = useState(30)
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
      calculateResults()
    }

    function calculateResults() {
      console.log(resultIndexArr)
    }
  }, [isCountDownStart, timeLeft, resultIndexArr])

  useEffect(() => {
    document.addEventListener("keypress", PopKeyUp, false)

    return () => {
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
    console.log({ char })
    const shiftFirstChar = Array.from(words).shift()
    setWords((words) => words.slice(1))
    console.log(shiftFirstChar, char)
    if (shiftFirstChar == char || (char == "ce" && shiftFirstChar == " ")) {
      setResultIndexArr([...resultIndexArr, true])
    } else {
      setResultIndexArr([...resultIndexArr, false])
    }
  }
  return (
    <>
      <WordComponent words={wordsTobeUsed} wordStatus={resultIndexArr} />
      <CountdownTimer timeLeft={timeLeft} />
    </>
  )
}

export default App
