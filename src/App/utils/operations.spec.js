import * as ops from "./operations"

describe("static math functions", () => {
  describe("add", () => {
    it("adds two numbers", () => {
      expect(ops.add(1, 2)).toEqual(3)
    })

    it("adds multiple numbers", () => {
      expect(ops.add(1, 2, 4)).toEqual(7)
      expect(ops.add(1, 2, 10, -8)).toEqual(5)
    })
  })

  describe("subtract", () => {
    it("subtracts the second number from the first", () => {
      expect(ops.subtract(1, 2)).toEqual(-1)
    })

    it("subtracts multiple numbers from the first", () => {
      expect(ops.subtract(1, 2, 3)).toEqual(-4)
      expect(ops.subtract(1, 2, 3, -8)).toEqual(4)
    })
  })

  describe("divide", () => {
    it("divides the first number by the second", () => {
      expect(ops.divide(6, 3)).toEqual(2)
    })

    it("divides the first number by multiple numbers", () => {
      expect(ops.divide(6, 3, 2)).toEqual(1)
      expect(ops.divide(20, 5, 2)).toEqual(2)
    })
  })

  describe("multiply", () => {
    it("multiplies the first number by the second", () => {
      expect(ops.multiply(6, 3)).toEqual(18)
    })

    it("multiplies the first number by multiple numbers", () => {
      expect(ops.multiply(6, 3, 2)).toEqual(36)
      expect(ops.multiply(6, 3, 2, -2)).toEqual(-72)
    })
  })
})
