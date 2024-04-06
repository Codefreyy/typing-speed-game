export default function WordComponent({
  words,
  wordStatus,
}: {
  words: string
  wordStatus: boolean[]
}) {
  return (
    <div className="text-4xl text-center text-slate-500">
      {words.split("").map((char, index) => {
        let styleClass
        if (wordStatus[index] === true) {
          styleClass = "text-primary-500"
        } else if (wordStatus[index] === false) {
          styleClass = "text-error-500"
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
