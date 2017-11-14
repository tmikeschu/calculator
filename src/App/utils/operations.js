export const add = (a, ...args) =>
  args.reduce((result, arg) => parseFloat(result) + parseFloat(arg), a)

export const subtract = (a, ...args) =>
  args.reduce((result, arg) => parseFloat(result) - parseFloat(arg), a)

export const divide = (a, ...args) =>
  args.reduce((result, arg) => parseFloat(result) / parseFloat(arg), a)

export const multiply = (a, ...args) =>
  args.reduce((result, arg) => parseFloat(result) * parseFloat(arg), a)
