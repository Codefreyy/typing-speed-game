export function formatPercentage(percentage: number) {
  return percentage.toFixed(0) + '%'
}

export const countErrors = (actual: string, expected: string) => {
  const expectedChars = expected.split("")

  return expectedChars.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i]
    return errors + (actualChar === expectedChar ? 0 : 1)
  }, 0)
}

export const calculatedAccuracy = (total: number, errors: number) => {
  if (total > 0) {
    const corrects = total - errors
    return (corrects / total) * 100
  }
  return 0
}