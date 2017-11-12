import React from "react"
import App from "./App"

describe("<App />", () => {
  const wrapper = shallow(<App />)
  const container = wrapper.instance()

  it("renders without crashing", () => {
    expect(wrapper).toBeTruthy()
    expect(container).toBeTruthy()
  })
})
