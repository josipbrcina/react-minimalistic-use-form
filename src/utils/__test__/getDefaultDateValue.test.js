import { getDefaultDateValue } from '../getDefaultDateValue';

describe('getDefaultDateValue', () => {
  it('Should return proper date format if month and day are less than 10', () => {
    const defaultDate = getDefaultDateValue(new Date(2020, 8, 6));
    expect(defaultDate).toEqual('2020-09-06');
  });

  it('Should return proper date format if month and day are more than 9', () => {
    const defaultDate = getDefaultDateValue(new Date(2020, 10, 10));
    expect(defaultDate).toEqual('2020-11-10');
  });
});
