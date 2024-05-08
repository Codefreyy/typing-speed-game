import { useState } from "react"
import { IoIosHelpCircleOutline } from "react-icons/io"
import { useSound } from "use-sound"

export default function ChooseTime({
  onTimeChose,
}: {
  onTimeChose: (time: number) => void
}) {
  const [selectedTime, setSelectedTime] = useState<number | null>(null)
  const [playHint] = useSound("/bubble.wav", { volume: 0.5 })
  const handleTimeSelect = (time: number) => {
    setSelectedTime(time)
    onTimeChose(time)
  }

  return (
    <div className="flex gap-2 justify-start items-center mt-10">
      <div
        onMouseEnter={playHint}
        className="flex gap-1 cursor-default has-tooltip items-center text-md dark:text-primary-400 text-green-600 font-medium text-start"
      >
        <IoIosHelpCircleOutline className="hover:scale-105 hover:cursor-pointer" />
        <div>Choose time:</div>
        <span className="-mt-[7rem] text-sm w-fit max-w-[22rem] tooltip rounded py-2 bg-transparent dark:text-slate-300 text-slate-600 transition">
          Choose the countdown time and type to start testing your typing speed!
        </span>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => handleTimeSelect(30)}
          className={`${
            selectedTime === 30 ? "bg-gray-200 underline dark:bg-slate-700" : ""
          } hover:underline dark:text-primary-400 text-green-600 p-2 rounded-md`}
        >
          30s
        </button>
        <button
          onClick={() => handleTimeSelect(60)}
          className={`${
            selectedTime === 60 ? "bg-gray-200 underline dark:bg-slate-700" : ""
          } hover:underline dark:text-primary-400 text-green-600 p-2 rounded-md`}
        >
          60s
        </button>
        <button
          onClick={() => handleTimeSelect(90)}
          className={`${
            selectedTime === 90 ? "bg-gray-200 underline dark:bg-slate-700" : ""
          } hover:underline dark:text-primary-400 text-green-600 p-2 rounded-md`}
        >
          90s
        </button>
      </div>
    </div>
  )
}
