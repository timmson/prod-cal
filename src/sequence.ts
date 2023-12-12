export const getSequencedArray = (start :number, length: number): Array<number> =>
	Array.from(Array(length).keys()).map((i) => i + start)
