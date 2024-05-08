import UserTypings from "./components/UserTypings"
import Results from "./components/Results"
import RestartButton from "./components/RestartButton"
import GenerateWords from "./components/GenerateWords"
import useEngine, { State } from "./hooks/useEngine"
import { calculatedAccuracy } from "./utils/helpers"
import DarkModeToggle from "./components/DarkModeToggle"
import ChooseTime from "./components/ChooseTime"
import { Toaster } from "react-hot-toast"

const App = () => {
  const {
    state,
    words,
    timeLeft,
    typed,
    totalTyped,
    errors,
    restart,
    setCountdownSeconds,
  } = useEngine()

  return (
    <>
      <DarkModeToggle />
      <Toaster />
      <CountdownTimer
        timeLeft={timeLeft}
        state={state}
        setCountdownTime={(time) => {
          setCountdownSeconds(time)
        }}
      />

      <WordsContainer>
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

const CountdownTimer = ({
  timeLeft,
  state,
  setCountdownTime,
}: {
  timeLeft: number
  state: State
  setCountdownTime: (time: number) => void
}) => {
  const handleTimeChose = (time: number) => {
    setCountdownTime(time)
  }
  if (state == "start") {
    return <ChooseTime onTimeChose={handleTimeChose} />
  } else {
    return (
      <h2 className="dark:text-primary-400 text-green-600 font-medium">
        Time: {timeLeft}
      </h2>
    )
  }
}

export default App
