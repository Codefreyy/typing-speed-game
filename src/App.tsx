import UserTypings from "./components/UserTypings"
import Results from "./components/Results"
import RestartButton from "./components/RestartButton"
import GenerateWords from "./components/GenerateWords"
import useEngine from "./hooks/useEngine"
import { calculatedAccuracy } from "./utils/helpers"
import useDarkMode from "./hooks/useDarkMode"
import { useEffect } from "react"
import DarkModeToggle from "./components/DarkModeToggle"

const App = () => {
  const { state, words, timeLeft, typed, totalTyped, errors, restart } =
    useEngine()

  const { isDark, setIsDark } = useDarkMode()

  useEffect(() => {
    if (isDark) {
      console.log("isDark", isDark)
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  return (
    <>
      <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        {/* <GenerateWords/> */}
        <GenerateWords words={words} />
        <UserTypings
          userInput={typed}
          className="absolute inset-0"
          words={words}
        />
      </WordsContainer>
      <RestartButton
        className="mx-auto mt-10 text-slate-500"
        onRestart={() => restart()}
      />
      <Results
        state={state}
        className="mt-10"
        errors={errors}
        accuracyPercentage={calculatedAccuracy(totalTyped, errors)}
        total={totalTyped}
      />
    </>
  )
}

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-xl leading-relaxed break-all mt-3 align-justify">
      {children}
    </div>
  )
}

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return (
    <h2 className="dark:text-primary-400 text-green-500 font-medium">
      Time: {timeLeft}
    </h2>
  )
}

export default App
