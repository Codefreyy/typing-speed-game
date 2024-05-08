import { useCallback, useEffect, useState } from "react"
import useWords from "./useWords"
import useCountdownTimer from "./useCountdownTimer"
import useTypings from "./useTypings"
import { countErrors } from "../utils/helpers"

const NUMBER_OF_WORDS = 12

export type State = 'start' | 'run' | 'finish'

const useEngine = () => {
    const [state, setState] = useState<State>("start")
    const [countdownSeconds, setCountdownSeconds] = useState(0)
    const { words, updateWords } = useWords(NUMBER_OF_WORDS)
    const { timeLeft, startCountdown, resetCountdown } = useCountdownTimer(countdownSeconds)
    const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTypings(state !== 'finish', countdownSeconds)


    const [errors, setErrors] = useState(0)

    const isStarting = state === 'start' && cursor > 0
    const areWordsFinished = cursor == words.length;

    const restart = useCallback(() => {
        resetCountdown()
        resetTotalTyped()
        setState('start')
        updateWords()
        clearTyped()
        setErrors(0)
    }, [clearTyped, resetCountdown, resetTotalTyped, updateWords])
    const sumErrors = useCallback(() => {
        const wordsReached = words.substring(0, Math.min(cursor, words.length))

        setErrors(prevErrors => prevErrors + countErrors(typed, wordsReached))
    }, [typed, words, cursor])

    // as soon as the user types the first character, start the countdown
    useEffect(() => {
        if (isStarting && countdownSeconds > 0) {
            setState('run')
            startCountdown()
        }
    }, [isStarting, startCountdown, countdownSeconds])


    // when the countdown reaches 0, stop the game
    useEffect(() => {
        if (timeLeft === 0 && state == 'run') {
            setState('finish')
            sumErrors()
            setCountdownSeconds(0)
        }
    }, [timeLeft, state, sumErrors])

    // when the current words are filled up, generate new words
    useEffect(() => {
        if (areWordsFinished) {
            updateWords()
            clearTyped()
            sumErrors()
        }
    }, [clearTyped, updateWords, sumErrors, areWordsFinished])


    return { state, words, timeLeft, typed, cursor, clearTyped, resetTotalTyped, totalTyped, errors, restart, setCountdownSeconds }
}

export default useEngine