import React, { Component } from "react"
import classNames from "classnames/bind"

import styles from "./App.css"

const cx = classNames.bind(styles)

const NUMBERS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
]

const COMMANDS = [
  { name: "multiply", symbol: "×" },
  { name: "divide", symbol: "÷" },
  { name: "add", symbol: "+" },
  { name: "subtract", symbol: "-" },
  { name: "clear", symbol: "A/C" },
  { name: "equals", symbol: "=" },
  { name: "plus-minus", symbol: "±" },
  { name: "decimal", symbol: "." },
  { name: "percent", symbol: "%" },
]

const flex = { flex: true }
const itemsCenter = { "items-center": true }
const justifyCenter = { "justify-center": true }
const flexCenterCenter = cx(flex, itemsCenter, justifyCenter)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stdout: "0",
    }
  }

  handleNumberClick = number => () => {
    this.setState(({ stdout: prevStdout }) => {
      const stdout =
        prevStdout === "0" ? String(number) : prevStdout + String(number)
      return { stdout }
    })
  }

  handleClearClick = () => {
    this.setState({ stdout: "0" })
  }

  render() {
    const className = cx("App")

    const numberCells = NUMBERS.map((number, index) => {
      const isZero = number === "zero"

      const className = cx(flexCenterCenter, number, "number", "button")

      const props = {
        className,
        key: number,
        onClick: this.handleNumberClick(index),
      }

      if (isZero) {
        const zeroClassName = cx(flexCenterCenter, "zero-inner")

        return (
          <div {...props}>
            <article className={zeroClassName}>0</article>
            <div className="col6" />
          </div>
        )
      }

      return <article {...props}>{index}</article>
    })

    const commandCells = COMMANDS.map(({ name, symbol }) => {
      const className = cx(flexCenterCenter, name, "button", "command")

      const capitalName = name[0].toUpperCase() + name.slice(1)
      const onClick = this[`handle${capitalName}Click`]

      const props = {
        className,
        key: name,
        onClick,
      }

      return <article {...props}>{symbol}</article>
    })

    const stdoutClassName = cx(flex, itemsCenter, "stdout")

    return (
      <div className={className}>
        <article className={stdoutClassName}>{this.state.stdout}</article>
        {numberCells}
        {commandCells}
      </div>
    )
  }
}

export default App
