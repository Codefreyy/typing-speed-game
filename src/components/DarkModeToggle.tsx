import { useRef } from "react"
import { MdDarkMode } from "react-icons/md"
import { MdOutlineLightMode } from "react-icons/md"
import useDarkMode from "../hooks/useDarkMode"
import { useSound } from "use-sound"

function DarkModeToggle() {
  const togglerRef = useRef<HTMLButtonElement>(null)
  const { isDark, setIsDark } = useDarkMode()
  const [playLight] = useSound("/light-on.mp3", { volume: 0.5 })
  const [playDark] = useSound("/light-off.mp3", { volume: 0.5 })

  const handleToggleDarkMode = () => {
    togglerRef.current?.blur()
    if (isDark) {
      playLight()
    } else {
      playDark()
    }
    setIsDark(!isDark)
  }
  return (
    <button
      ref={togglerRef}
      className="dark:text-slate-500 text-slate-800 absolute top-10 right-10"
      onClick={() => {
        handleToggleDarkMode()
      }}
    >
      {isDark ? (
        <MdDarkMode className="w-5 h-5" />
      ) : (
        <MdOutlineLightMode className="w-5 h-5" />
      )}
    </button>
  )
}

export default DarkModeToggle
