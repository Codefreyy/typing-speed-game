import { faker } from "@faker-js/faker"
import UserTypings from "./components/UserTypings"
import Results from "./components/Results"
import RestartButton from "./components/RestartButton"
import GenerateWords from "./components/GenerateWords"
import useEngine from "./hooks/useEngine"

const App = () => {
  const { state, words } = useEngine()
  return (
    <>
      <CountdownTimer timeLeft={30} />
      <WordsContainer>
        {/* <GenerateWords/> */}
        <GenerateWords words={words} />
        <UserTypings userInput={"test"} className="absolute inset-0" />
      </WordsContainer>
      <RestartButton
        className="mx-auto mt-10 text-slate-500"
        onRestart={() => null}
      />
      <Results
        className="mt-10"
        errors={10}
        accuracyPercentage={100}
        total={200}
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
  return <h2 className="text-primary-400 font-medium">Time: {timeLeft}</h2>
}

export default App
