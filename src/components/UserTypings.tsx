import { useEffect } from "react"
import Caret from "./Caret"
import useSound from "use-sound"

const UserTypings = ({
  userInput,
  className,
  words,
}: {
  userInput: string
  className?: string
  words: string
}) => {
  const typedCharacters = userInput.split("")
  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return (
          <Character
            key={`${char}_${index}`}
            actual={char}
            expected={words[index]}
          />
        )
      })}
      <Caret />
    </div>
  )
}

const Character = ({
  actual,
  expected,
}: {
  actual: string
  expected: string
}) => {
  const isCorrect = actual === expected
  const isWhiteSpace = expected === " "
  const [playStroke] = useSound("/keyboard_stroke.wav", { volume: 0.5 })
  const [playError] = useSound("/typing-error.wav", { volume: 0.5 })
  useEffect(() => {
    if (isCorrect) {
      playStroke()
    } else {
      playError()
    }
  }, [playStroke, playError, isCorrect])
  return (
    <span
      className={cn({
        "text-red-500": !isCorrect && !isWhiteSpace,
        "text-green-500": isCorrect && !isWhiteSpace,
        "bg-red-500/50": !isCorrect && isWhiteSpace,
        "dark:text-red-500": !isCorrect && !isWhiteSpace,
        "dark:text-primary-500": isCorrect && !isWhiteSpace,
        "dark:bg-red-500/50": !isCorrect && isWhiteSpace,
      })}
    >
      {expected}
    </span>
  )
}

function cn(classes: { [key: string]: boolean }) {
  return Object.entries(classes)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(" ")
}

export default UserTypings
