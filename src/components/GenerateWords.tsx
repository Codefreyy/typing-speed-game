export default function WordComponent({
  words,
  wordStatus,
}: {
  words: string
  wordStatus: boolean[]
}) {
  return (
    <div className="text-4xl text-slate-500 p-4 align-justify break-all">
      {words.split("").map((char, index) => {
        console.log("char", char)
        let styleClass
        if (wordStatus[index] === true) {
          styleClass = "text-primary-500"
        } else if (wordStatus[index] === false) {
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
