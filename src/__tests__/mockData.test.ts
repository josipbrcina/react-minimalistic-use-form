import { ElementValidity } from '../__mock__/mockData';

describe('MockData Test', () => {
  it('Should Set default ElementValidity constructor values', () => {
    const sut = new ElementValidity();

    expect(sut.valid).toBe(true);
    expect(sut.badInput).toBe(false);
    expect(sut.patternMismatch).toBe(false);
    expect(sut.rangeOverflow).toBe(false);
    expect(sut.rangeUnderflow).toBe(false);
    expect(sut.stepMismatch).toBe(false);
    expect(sut.tooLong).toBe(false);
    expect(sut.tooShort).toBe(false);
    expect(sut.typeMismatch).toBe(false);
    expect(sut.valueMissing).toBe(false);
  });
  it('Should Set ElementValidity provided constructor values', () => {
    const sut = new ElementValidity({
      valid: false,
      badInput: true,
      patternMismatch: false,
      rangeOverflow: true,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: true,
      valueMissing: false,
    });

    expect(sut.valid).toBe(false);
    expect(sut.badInput).toBe(true);
    expect(sut.patternMismatch).toBe(false);
    expect(sut.rangeOverflow).toBe(true);
    expect(sut.rangeUnderflow).toBe(false);
    expect(sut.stepMismatch).toBe(false);
    expect(sut.tooLong).toBe(false);
    expect(sut.tooShort).toBe(false);
    expect(sut.typeMismatch).toBe(true);
    expect(sut.valueMissing).toBe(false);
  });
});
