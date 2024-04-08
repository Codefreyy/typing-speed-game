import { motion } from "framer-motion"
import { formatPercentage } from "../utils/help"
interface displayResult {
  resultArr: Array<boolean | number>
  isCountDownEnd: boolean
  originalWords: string[]
  totalTime: number
}

export default function DisplayResult({
  resultArr,
  isCountDownEnd,
  totalTime,
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

    const initial = { opacity: 0 }
    const animate = { opacity: 1 }
    const duration = { duration: 0.3 }

    return (
      <motion.ul className="flex flex-col items-center text-primary-400 space-y-3">
        <motion.li
          initial={initial}
          animate={animate}
          transition={{ ...duration, delay: 0 }}
          className="font-bold"
        >
          Results
        </motion.li>
        <motion.li
          initial={initial}
          animate={animate}
          transition={{ ...duration, delay: 0.5 }}
        >
          {((typedArr.length / totalTime) * 60).toFixed(0)} characters per
          minute
        </motion.li>
        <motion.li
          initial={initial}
          animate={animate}
          transition={{ ...duration, delay: 1.0 }}
        >
          Accuracy: {formatPercentage(correctRate)}
        </motion.li>
        <motion.li
          initial={initial}
          animate={animate}
          transition={{ ...duration, delay: 1.5 }}
          className="text-error-500"
        >
          Errors: {errorWordCount}
        </motion.li>
        <motion.li
          initial={initial}
          animate={animate}
          transition={{ ...duration, delay: 2.0 }}
        >
          Typed: {resultArr.length}
        </motion.li>
      </motion.ul>
    )
  } else {
    return <></>
  }
}
