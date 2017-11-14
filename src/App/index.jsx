import React, { Component } from "react"
import classNames from "classnames/bind"

import "./numbers.css"
import "./commands.css"
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
  { name: "multiply", symbol: "×", handler: "Command" },
  { name: "divide", symbol: "÷", handler: "Command" },
  { name: "add", symbol: "+", handler: "Command" },
  { name: "subtract", symbol: "-", handler: "Command" },
  { name: "clear", symbol: "A/C", handler: "Clear" },
  { name: "equals", symbol: "=", handler: "Command" },
  { name: "plus-minus", symbol: "±", handler: "PlusMinus" },
  { name: "decimal", symbol: ".", handler: "Decimal" },
  { name: "percent", symbol: "%", handler: "Percent" },
]

const flex = { flex: true }
const itemsCenter = { "items-center": true }
const justifyCenter = { "justify-center": true }
const flexCenterCenter = cx(flex, itemsCenter, justifyCenter)

class App extends Component {
  static initialState = {
    stdout: "0",
    command: "",
    result: "",
    readyForNextOperand: true,
  }

  static add = (a, b) => parseFloat(a) + parseFloat(b)
  static subtract = (a, b) => parseFloat(a) - parseFloat(b)
  static multiply = (a, b) => parseFloat(a) * parseFloat(b)
  static divide = (a, b) => parseFloat(a) / parseFloat(b)

  constructor(props) {
    super(props)
    this.state = App.initialState
  }

  handleNumberClick = number => () => {
    this.setState(({ stdout: prevStdout }) => {
      const stdout = this.state.readyForNextOperand
        ? String(number)
        : prevStdout + String(number)
      return {
        stdout,
        readyForNextOperand: false,
      }
    })
  }

  handleClearClick = () => () => {
    this.setState(App.initialState)
  }

  handleCommandClick = command => () => {
    this.setState(
      ({ result: prevResult, stdout: prevStdout, command: prevCommand }) => {
        const isEquals = command === "equals"
        const result = String(
          prevResult
            ? App[prevCommand || command](prevResult, prevStdout)
            : prevStdout
        )
        const stdout = result
        const nextResult = isEquals ? "" : result
        const nextCommand = isEquals ? "" : command

        return {
          command: nextCommand,
          result: nextResult,
          stdout,
          readyForNextOperand: true,
        }
      }
    )
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

    const commandCells = COMMANDS.map(({ name, symbol, handler }) => {
      const className = cx(flexCenterCenter, name, "button", "command")
      const onClick = this[`handle${handler}Click`]
      const props = {
        className,
        key: name,
        onClick: onClick && onClick(name),
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

export { App }
