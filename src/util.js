import { curry } from 'ramda'

const add = (a, b) => a + b
export const sum = arr => arr.reduce(add)

export const times = curry((n, fn) => {
  for (let i=0; i<n; i++) fn(i)
})
