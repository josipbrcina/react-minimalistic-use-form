import { validatePlugins } from '../validatePlugins';
import { noop } from '../noop';

describe('validatePlugins utility function', () => {
  it('Should throw an error if scrollToError is not a function', () => {
    // @ts-ignore
    expect(() => validatePlugins({ scrollToError: 'string' })).toThrow('Plugin scrollToError must be a type of function!');
  });

  it('Should not throw if scrollToError is a function', () => {
    expect(() => validatePlugins({ scrollToError: noop })).not.toThrow(Error);
  });
});
