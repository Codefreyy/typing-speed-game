import { useEffect, useState } from "react"

export default function GenerateWords({
  words,
  wordStatus,
}: {
  words: string[]
  wordStatus: Array<boolean | number>
}) {
  const [usedString, setUsedString] = useState("")
  const [prevIndex, setPrevIndex] = useState(0)

  useEffect(() => {
    if (words.length > 0) {
      //word.lenght =1
      setUsedString(words[words.length - 1])
    }

    if (words.length > 1) {
      const prevCharsCount = words.slice(0, words.length - 1).join("").length
      setPrevIndex(prevCharsCount - (words.length - 1))
    }
  }, [words])

  return (
    <div className="text-4xl text-slate-500 p-4 align-justify break-all">
      {words.length &&
        usedString.split("").map((char, index) => {
          let styleClass
          if (wordStatus[index + prevIndex] === true) {
            styleClass = "text-primary-500"
          } else if (wordStatus[index + prevIndex] === false) {
            if (char == " ") {
              styleClass = "bg-error-400"
            } else {
              styleClass = "text-error-500"
            }
          } else {
            styleClass = "text-slate-500"
          }
          return (
            <span key={index} className={styleClass}>
              {char}
            </span>
          )
        })}
    </div>
  )
}
