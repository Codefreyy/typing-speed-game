interface displayResult {
  resultArr: Array<boolean | number>
  isCountDownEnd: boolean
  originalWords: string[]
}

export default function DisplayResult({
  resultArr,
  isCountDownEnd,
}: displayResult) {
  if (resultArr.length !== 0 && resultArr[0] !== 1 && isCountDownEnd) {
    let correctWordCount = 0
    let errorWordCount = 0
    resultArr.forEach((i) => {
      if (i === true) {
        correctWordCount += 1
      } else if (i === false) {
        errorWordCount += 1
      }
    })
    const typedArr = [...resultArr].filter((i) => i !== 1)
    const correctRate = (correctWordCount / typedArr.length) * 100
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
  } else {
    return <></>
  }
}
