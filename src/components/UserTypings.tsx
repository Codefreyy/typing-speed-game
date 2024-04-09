import Caret from "./Caret"

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

  return (
    <span
      className={cn({
        "text-red-500": !isCorrect && !isWhiteSpace,
        "text-primary-500": isCorrect && !isWhiteSpace,
        "bg-red-500/50": !isCorrect && isWhiteSpace,
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
