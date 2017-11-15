import React from "react"
import { App } from "./index.jsx"

describe("<App />", () => {
  const wrapper = shallow(<App />)
  const container = wrapper.instance()

  beforeEach(() => {
    wrapper.setState(App.initialState)
  })

  it("renders without crashing", () => {
    expect(wrapper).toBeTruthy()
    expect(container).toBeTruthy()
  })

  describe(".handleNumberClick", () => {
    const curry = container.handleNumberClick(1)

    it("takes a number and returns a function", () => {
      expect(curry).toBeInstanceOf(Function)
    })

    describe("when readyForNextOperand is false", () => {
      it("sets the stdout to the number", () => {
        wrapper.setState({
          stdout: "2",
          readyForNextOperand: false,
        })
        curry()
        expect(container.state.stdout).toEqual("21")
      })
    })

    describe("when readyForNextOperand is true", () => {
      it("resets the stdout to the next operand", () => {
        wrapper.setState({
          stdout: "2",
          readyForNextOperand: true,
        })

        curry()
        expect(container.state.stdout).toEqual("1")
      })
    })
  })

  describe(".handleClearClick", () => {
    it("returns a function", () => {
      const curry = container.handleClearClick()
      expect(curry).toBeInstanceOf(Function)
    })

    it("sets state to initial state", () => {
      wrapper.setState({
        stdout: "123",
        result: "321",
        command: "add",
        readyForNextOperand: false,
      })

      const curry = container.handleClearClick()
      expect(curry).toBeInstanceOf(Function)
      curry()
      expect(container.state).toEqual(App.initialState)
    })
  })

  describe(".handleCommandClick", () => {
    const curry = container.handleCommandClick("add")

    it("takes a command name and returns a function", () => {
      expect(curry).toBeInstanceOf(Function)
    })

    it("sets the command state", () => {
      expect(container.state.command).toEqual("")
      curry()

      expect(container.state.command).toEqual("add")
    })

    it("sets the stdout to the result state", () => {
      wrapper.setState({ stdout: "1" })
      expect(container.state.result).toEqual("")
      curry()

      expect(container.state.result).toEqual("1")
    })

    it("sets readyForNextOperand to true", () => {
      wrapper.setState({ readyForNextOperand: false })
      curry()

      expect(container.state.readyForNextOperand).toEqual(true)
    })

    describe("when there is a number in result and stdout", () => {
      it("result and stdout is set to the result of result command stdout", () => {
        wrapper.setState({
          result: "12",
          stdout: "8",
        })
        curry()
        expect(container.state.result).toEqual("20")
        expect(container.state.stdout).toEqual("20")
      })
    })

    describe('when the command is "equals"', () => {
      const curry = container.handleCommandClick("equals")
      beforeEach(() => {
        wrapper.setState({
          stdout: "5",
          command: "add",
          result: "2",
        })
      })

      it("sets result to empty", () => {
        curry()
        expect(container.state.result).toEqual("")
      })

      it("sets command to empty", () => {
        curry()
        expect(container.state.command).toEqual("")
      })

      it("sets command to the result of result command stdout", () => {
        curry()
        expect(container.state.stdout).toEqual("7")
      })
    })
  })

  describe(".handlePlusMinusClick", () => {
    const curry = container.handlePlusMinusClick()

    it("returns a function", () => {
      expect(curry).toBeInstanceOf(Function)
    })

    it("sets the stdout to the opposite sign", () => {
      wrapper.setState({ stdout: "1" })
      curry()

      expect(container.state.stdout).toEqual("-1")
    })

    describe("when readyForNextOperand is true", () => {
      it("sets the result to the new stdout", () => {
        wrapper.setState({ stdout: "1", readyForNextOperand: true })
        curry()

        expect(container.state.stdout).toEqual("-1")
        expect(container.state.result).toEqual("-1")
      })
    })

    describe("when readyForNextOperand is false", () => {
      it("leaves the result alone", () => {
        wrapper.setState({ stdout: "1", readyForNextOperand: false })
        curry()

        expect(container.state.stdout).toEqual("-1")
        expect(container.state.result).toEqual("")
      })
    })
  })
})
