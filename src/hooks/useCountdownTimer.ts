import { useCallback, useEffect, useRef, useState } from "react"

const useCountdownTimer = (seconds: number) => {
    const [timeLeft, setTimeLeft] = useState(seconds)


    useEffect(() => {
        setTimeLeft(seconds - 1); // when the user start typing, the countdown starts immdeiately, so when they see the time, it's already 1 second less
    }, [seconds]);

    const intervalRef = useRef<number | null>(null)

    const startCountdown = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft(timeLeft => {
                console.log('timeLeft:', timeLeft)
                return timeLeft - 1
            })

        }, 1000)

    }, [setTimeLeft])

    const resetCountdown = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        setTimeLeft(seconds)
    }, [seconds])


    // when the countdown reaches 0, clear the countdown interval
    useEffect(() => {
        if (!timeLeft && intervalRef.current) {
            clearInterval(intervalRef.current)
        }
    }, [timeLeft, intervalRef])

    return { timeLeft, startCountdown, resetCountdown }
}

export default useCountdownTimer