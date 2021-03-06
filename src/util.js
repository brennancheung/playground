const add = (a, b) => a + b
export const sum = arr => arr.reduce(add)

export const times = n => {
  const arr = []
  for (let i=0; i<n; i++) arr.push(i)
  return arr
}

export const wrapOnChange = fn => (e, v) => fn(v)
export const wrapEventValue = fn => e => fn(e.target.value)
