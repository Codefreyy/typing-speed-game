import { useState } from "react"
import useWords from "./useWords"

const NUMBER_OF_WORDS = 12

export type State = 'start' | 'run' | 'finish'

const useEngine = () => {
    const [state, setState] = useState<State>("start")
    const { words, updateWords } = useWords(NUMBER_OF_WORDS)
    return { state, words }
}

export default useEngine