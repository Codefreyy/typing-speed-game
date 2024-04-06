import { faker } from "@faker-js/faker"
import WordComponent from "./components/GenerateWords"
import CountdownTimer from "./components/CountdownTimer"
import { useCallback, useEffect, useState } from "react"
import DisplayResult from "./components/DisplayResult"

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

  const checkCorrect = useCallback(
    (char: string) => {
      const currentChar = words[currentWordIndex]
      setCurrentWordIndex((prev) => prev + 1)
      if (currentChar == char || (char == "ce" && currentChar == " ")) {
        setResultIndexArr([...resultIndexArr, true])
      } else {
        setResultIndexArr([...resultIndexArr, false])
      }
    },
    [words, currentWordIndex, resultIndexArr]
  )

  const PopKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (!isCountDownStart) {
        startCountDown()
      } else if (isCountDownStart) {
        const typedCharacter = e.code.toLocaleLowerCase().slice(3)
        checkCorrect(typedCharacter)
      }
    },
    [isCountDownStart, checkCorrect]
  )

  useEffect(() => {
    document.addEventListener("keyup", PopKeyUp, false)

    return () => {
      document.removeEventListener("keyup", PopKeyUp, false)
    }
  }, [isCountDownStart, PopKeyUp, currentWordIndex, resultIndexArr, words])

  useEffect(() => {
    if (timeLeft == 0) {
      setIsCountDownStart(false)
      document.removeEventListener("keyup", PopKeyUp)
    }
  }, [timeLeft, PopKeyUp])

  function startCountDown() {
    setIsCountDownStart(true)
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer)
          setIsCountDownStart(false)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
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
