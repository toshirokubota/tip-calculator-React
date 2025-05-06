import { calculateTipAmount, calculateTotalAmount } from "../libs";

describe('calculateTipAmount', () => {
    it('returns the correct value', () => {
      expect(calculateTipAmount(100, 15)).toBe(15);
      expect(calculateTipAmount(123.45, 10)).toBe(12.345);
    })
  });

  describe('calculateTotalAmount', () => {
    it('returns the correct value', () => {
      expect(calculateTotalAmount(100, 15)).toEqual(115.0);
      expect(calculateTotalAmount(123.45, 10)).toBeCloseTo(135.795, 8);
    })
  });

