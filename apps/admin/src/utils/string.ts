export function longestCommonPrefix(values: string[]) {
  if (!values[0] || values.length === 1)
    return values[0] || null

  let i = 0
  while (values[0][i] && values.every(w => w[i] === values[0][i]))
    i++

  return values[0].substring(0, i)
}
