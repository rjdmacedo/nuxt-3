export const randomNumberBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const arrayOfLength = (length: number): number[] => {
  const arr = []
  for (let i = 0; i < length; i++) {
    arr.push(i)
  }
  return arr
}

export const hash = (str: string | object): string => {
  if (typeof str === "object") {
    str = JSON.stringify(str)
  }
  let hash = 0
  if (str.length === 0) return hash.toString()
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString()
}
