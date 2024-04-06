interface displayResult {
  resultArr: boolean[]
  inCountDownEnd: boolean
  originalWords: string
}

export default function DisplayResult({
  resultArr,
  inCountDownEnd,
}: displayResult) {
  if (resultArr.length !== 0 && inCountDownEnd) {
    let correctWordCount = 0
    let errorWordCount = 0
    resultArr.forEach((i) => {
      if (i) {
        correctWordCount += 1
      } else {
        errorWordCount += 1
      }
    })
    const correctRate = (correctWordCount / resultArr.length) * 100
    return (
      <div className="grid place-items-center ">
        <span className="text-primary-500 font-bold">Results</span>
        <span className="text-primary-500">
          Accuracy: {correctRate.toFixed(1)} %
        </span>
        <span className="text-primary-500">Errors: {errorWordCount}</span>
        <span className="text-primary-500">Typed: {resultArr.length}</span>
      </div>
    )
  }
}
