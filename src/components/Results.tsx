import { motion } from "framer-motion"
import { calculateWPM, formatPercentage } from "../utils/helpers"
import { IoIosHelpCircleOutline } from "react-icons/io"
import { useSound } from "use-sound"

const Results = ({
  errors,
  accuracyPercentage,
  total,
  className = "",
  state,
  totalTime,
}: {
  errors: number
  accuracyPercentage: number
  total: number
  className?: string
  state: string
  totalTime: number
}) => {
  const [playHint] = useSound("/bubble.wav", { volume: 0.5 })

  if (state !== "finish") return null

  const initial = { opacity: 0 }
  const animate = { opacity: 1 }

  return (
    <motion.ul
      initial={initial}
      animate={animate}
      className={`flex flex-col items-center dark:text-primary-400 text-green-500 space-y-3 ${className}`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3 }}
        className="text-xl font-semibold"
      >
        Results
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        onMouseEnter={playHint}
        className="relative has-tooltip cursor-pointer flex gap-1 items-center"
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        Speed: {calculateWPM(total - errors, totalTime)}
        <IoIosHelpCircleOutline className="hover:scale-105 hover:cursor-pointer text-slate-700 dark:text-slate-300" />
        <span className="absolute bottom-[-0.5rem] left-[12rem] text-sm w-full max-w-[20rem] px-2 tooltip rounded bg-transparent dark:text-slate-300 text-slate-600 transition">
          WPM = (Correct characters / 5) / Time (minutes)
        </span>
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1 }}
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1.4 }}
      >
        Typed: {total}
      </motion.li>
    </motion.ul>
  )
}

export default Results
