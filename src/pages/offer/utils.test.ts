import { getFormateDate, getRatingPercent } from "./utils"

describe('return rating percent', () => {
    it('should rating percent', () => {
        const expectedRating = 42
        const rating = 2.1

        const result = getRatingPercent(rating)

        expect(result).toBe(expectedRating)
    })

    it('return 0%', () => {
        expect(getRatingPercent(0)).toBe(0)
    })

    it('return 4.4 → 88%', () => {
    expect(getRatingPercent(4.4)).toBe(88);
  });
})


describe('return valid date with comments', () => {
    it('should return valid date', () => {
        const date = '2023-01-01'
        const result = getFormateDate(date)
        expect(result).toBe('January 2023')
    })

    it('should return valid date', () => {
        const date = '2019-02-01'
        const result = getFormateDate(date)
        expect(result).toBe('February 2019')
    })
})