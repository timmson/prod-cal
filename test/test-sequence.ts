import {getSequencedArray} from "../src/sequence"

describe("Sequence should", () => {

	test("generate array", () => {
		const expected = [1, 2, 3]

		const actual = getSequencedArray(1, 3)

		expect(actual).toEqual(expected)
	})

})
