import { reducer } from '../state';

describe('State Reducer', () => {
  it('Should throw exception if unsupported action type is dispatched', () => {
    try {
      reducer({}, { type: 'test' });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'Unsupported action type: "test" in useForm reducer.');
    }
  });
});
