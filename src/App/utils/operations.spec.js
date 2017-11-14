import * as ops from "./operations"

describe("static math functions", () => {
  describe("add", () => {
    it("adds two numbers", () => {
      expect(ops.add(1, 2)).toEqual(3)
    })
  })

  describe("subtract", () => {
    it("subtracts the second number from the first", () => {
      expect(ops.subtract(1, 2)).toEqual(-1)
    })
  })

  describe("divide", () => {
    it("subtracts the second number from the first", () => {
      expect(ops.divide(6, 3)).toEqual(2)
    })
  })

  describe("multiply", () => {
    it("subtracts the second number from the first", () => {
      expect(ops.multiply(6, 3)).toEqual(18)
    })
  })
})
