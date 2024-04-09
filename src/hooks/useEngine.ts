import { useState } from "react"
import useWords from "./useWords"
import useCountdownTimer from "./useCountdownTimer"

const NUMBER_OF_WORDS = 12
const COUNTDOWN_SECONDS = 30

export type State = 'start' | 'run' | 'finish'

const useEngine = () => {
    const [state, setState] = useState<State>("start")
    const { words, updateWords } = useWords(NUMBER_OF_WORDS)
    const { timeLeft, startCountdown, resetCountdown } = useCountdownTimer(COUNTDOWN_SECONDS)
    return { state, words, timeLeft }
}

export default useEngine