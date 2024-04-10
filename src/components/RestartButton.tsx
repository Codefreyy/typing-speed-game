import { useRef } from "react"
import { MdRefresh } from "react-icons/md"

function RestartButton({
  className = "",
  onRestart: handleRestart,
}: {
  className?: string
  onRestart: () => void
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    // remove the focus after click this button so that when you type it will not hit the button again
    buttonRef.current?.blur()
    handleRestart()
  }
  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`block rounded px-8 py-2 dark:hover:bg-slate-700/50 hover:bg-slate-200 ${className}`}
    >
      <MdRefresh className="w-6 h-6" />
    </button>
  )
}

export default RestartButton
