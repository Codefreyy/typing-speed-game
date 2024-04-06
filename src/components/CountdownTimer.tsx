export default function CountdownTimer({ timeLeft }: { timeLeft: number }) {
  return (
    <div className="text-primary-400 p-4 font-medium">Time: {timeLeft}</div>
  )
}
