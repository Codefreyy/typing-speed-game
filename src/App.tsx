import { faker } from "@faker-js/faker"
import CountdownTimer from "./components/CountdownTimer"
import { useCallback, useEffect, useState } from "react"
import DisplayResult from "./components/DisplayResult"
import GenerateWords from "./components/GenerateWords"

const countDownSeconds = 30

// todo: when all words are typed, change a new one
// todo: add a button to restart the game
// todo: result animation

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

  return (
    <>
      <CountdownTimer timeLeft={timeLeft} />
      <GenerateWords words={words} wordStatus={resultIndexArr} />
      <DisplayResult
        resultArr={resultIndexArr}
        isCountDownEnd={!isCountDownStart}
        originalWords={words}
      />
    </>
  )
}

export default App
