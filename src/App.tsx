import { faker } from "@faker-js/faker"
import CountdownTimer from "./components/CountdownTimer"
import { useCallback, useEffect, useState } from "react"
import DisplayResult from "./components/DisplayResult"
import GenerateWords from "./components/GenerateWords"
import RestartButton from "./components/RestartButton"

const countDownSeconds = 10

function App() {
  const [timeLeft, setTimeLeft] = useState(countDownSeconds)
  const [isCountDownStart, setIsCountDownStart] = useState(false)
  const [words, setWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [resultIndexArr, setResultIndexArr] = useState<Array<boolean | number>>(
    []
  )

  useEffect(() => {
    const words = faker.word.words(10)
    setWords([words]) // initialize word list
    setResultIndexArr(resultIndexArr.concat(Array(words.length).fill(1)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkCorrect = useCallback(
    (char: string) => {
      const currentChar = words[words.length - 1][currentWordIndex]
      const updatedResultArr = [...resultIndexArr]
      console.log(currentChar, char, resultIndexArr)
      if (currentChar == char || (char == "ce" && currentChar == " ")) {
        const firstUndefinedIndex = updatedResultArr.indexOf(1)
        if (firstUndefinedIndex !== -1) {
          updatedResultArr[firstUndefinedIndex] = true
          setResultIndexArr(updatedResultArr)
        } else {
          updatedResultArr.push(true)
        }
      } else {
        const firstUndefinedIndex = updatedResultArr.indexOf(1)
        if (firstUndefinedIndex !== -1) {
          updatedResultArr[firstUndefinedIndex] = false
          setResultIndexArr(updatedResultArr)
        } else {
          updatedResultArr.push(false)
        }
      }
      if (currentWordIndex == words[words.length - 1].length - 1) {
        setCurrentWordIndex(0)
        const newWords = faker.word.words(10)

        setResultIndexArr(resultIndexArr.concat(Array(newWords.length).fill(1)))
        setWords((words) => [...words, newWords])
      } else {
        setCurrentWordIndex((prev) => prev + 1)
      }
    },
    [words, currentWordIndex, resultIndexArr]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()
      if (!isCountDownStart) {
        startCountDown()
      }
      const typedCharacter = e.code.toLocaleLowerCase().slice(3)
      checkCorrect(typedCharacter)
    },
    [isCountDownStart, checkCorrect]
  )

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown, false)

    return () => {
      document.removeEventListener("keydown", onKeyDown, false)
    }
  }, [isCountDownStart, onKeyDown, currentWordIndex, resultIndexArr, words])

  useEffect(() => {
    if (timeLeft == 0) {
      setIsCountDownStart(false)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [timeLeft, onKeyDown])

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

  const handleRestart = () => {
    // setWords([faker.word.words(10)])
    // setCurrentWordIndex(0)
    // setTimeLeft(countDownSeconds)
    // setIsCountDownStart(true)
    // setResultIndexArr([])
    window.location.reload()
  }

  return (
    <>
      <CountdownTimer timeLeft={timeLeft} />
      <GenerateWords words={words} wordStatus={resultIndexArr} />
      <DisplayResult
        resultArr={resultIndexArr}
        isCountDownEnd={!isCountDownStart}
        originalWords={words}
        totalTime={countDownSeconds}
      />
      {resultIndexArr.length !== 0 &&
        resultIndexArr[0] !== 1 &&
        !isCountDownStart && (
          <RestartButton
            className="mx-auto mt-10 text-slate-500"
            onRestart={handleRestart}
          />
        )}
    </>
  )
}

export default App
