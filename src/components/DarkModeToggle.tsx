import { useRef } from "react"
import { MdDarkMode } from "react-icons/md"
import { MdOutlineLightMode } from "react-icons/md"

function DarkModeToggle({
  isDark,
  setIsDark,
}: {
  isDark: boolean
  setIsDark: (isDark: boolean) => void
}) {
  const togglerRef = useRef<HTMLButtonElement>(null)
  const handleToggleDarkMode = () => {
    togglerRef.current?.blur()
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
