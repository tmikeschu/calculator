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

const OPERATORS = [
  { operation: "multiply", symbol: "×" },
  { operation: "divide", symbol: "÷" },
  { operation: "add", symbol: "+" },
  { operation: "subtract", symbol: "-" },
  { operation: "clear", symbol: "A/C" },
  { operation: "equals", symbol: "=" },
  { operation: "plus-minus", symbol: "±" },
  { operation: "decimal", symbol: "." },
  { operation: "percent", symbol: "%" },
]

const flex = { flex: true }
const itemsCenter = { "items-center": true }
const justifyCenter = { "justify-center": true }
const flexCenterCenter = cx(flex, itemsCenter, justifyCenter)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stdout: 0,
    }
  }

  render() {
    const className = cx("App")

    const numberCells = NUMBERS.map((number, index) => {
      const isZero = number === "zero"

      const className = cx(flexCenterCenter, number, "number", "button")

      if (isZero) {
        const zeroClassName = cx(flexCenterCenter, "zero-inner")

        return (
          <div className={className} key={number}>
            <article className={zeroClassName}>0</article>
            <div className="spacer" />
          </div>
        )
      }

      return (
        <article className={className} key={number}>
          {index}
        </article>
      )
    })

    const operatorCells = OPERATORS.map(operator => {
      const className = cx(
        flexCenterCenter,
        operator.operation,
        "button",
        "command"
      )

      return (
        <article className={className} key={operator.operation}>
          {operator.symbol}
        </article>
      )
    })

    const stdoutClassName = cx(flex, itemsCenter, "stdout")

    return (
      <div className={className}>
        <article className={stdoutClassName}>{this.state.stdout}</article>
        {numberCells}
        {operatorCells}
      </div>
    )
  }
}

export default App
