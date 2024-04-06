export default function CountdownTimer({ timeLeft }: { timeLeft: number }) {
  return (
    <h2 className="text-primary-400 font-medium text-center mt-5">
      Time: {timeLeft}
    </h2>
  )
}
