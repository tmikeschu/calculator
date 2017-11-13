import React from "react"
import App from "./App"

describe("<App />", () => {
  const wrapper = shallow(<App />)
  const container = wrapper.instance()

  it("renders without crashing", () => {
    expect(wrapper).toBeTruthy()
    expect(container).toBeTruthy()
  })

  describe(".handleNumberClick", () => {
    it("takes a number and returns a function", () => {
      const curry = container.handleNumberClick(1)
      expect(curry).toBeInstanceOf(Function)
    })

    it("sets the stdout to the number", () => {
      expect(container.state.stdout).toEqual("0")

      const curry = container.handleNumberClick(1)
      curry()

      expect(container.state.stdout).toEqual("1")
    })
  })

  describe(".handleClearClick", () => {
    it("sets stdout to 0", () => {
      wrapper.setState({ stdout: "123" })
      container.handleClearClick()
      expect(container.state.stdout).toEqual("0")
    })
  })
})
