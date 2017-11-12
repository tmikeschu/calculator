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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stdout: 0,
    }
  }

  render() {
    const className = cx({
      App: true,
    })

    const numberCells = NUMBERS.map((number, index) => {
      const isZero = number === "zero"

      const className = cx({
        flex: true,
        "items-center": true,
        "justify-center": true,
        [number]: true,
        number: true,
        button: true,
      })

      if (isZero) {
        const zeroClassName = cx({
          "zero-inner": true,
          flex: true,
          "items-center": true,
          "justify-center": true,
        })

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
      const className = cx({
        flex: true,
        "items-center": true,
        "justify-center": true,
        [operator.operation]: true,
        button: true,
        command: true,
      })

      return (
        <article className={className} key={operator.operation}>
          {operator.symbol}
        </article>
      )
    })

    const stdoutClassName = cx({
      stdout: true,
      flex: true,
      "items-center": true,
    })

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
