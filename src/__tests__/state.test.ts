import { reducer, getInitialState } from '../lib/state';
import { STATE_ACTIONS } from '../lib/enums';
import { IState } from '../lib';

describe('State Reducer', () => {
  it('Should throw exception if unsupported action type is dispatched', () => {
    try {
      const state: IState = {
        values: {},
        initialValues: {},
        overriddenInitialValues: {},
        errors: {},
        initialIsFormValid: false,
        isFormValid: false,
      };
      reducer(state, { type: 'test' });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'Unsupported action type: "test" in useForm reducer.');
    }
  });

  it('Should set checked value as "value" for element type checkbox', () => {
    const state: IState = {
      values: {
        testCheckbox: false,
      },
      initialValues: {},
      overriddenInitialValues: {},
      errors: {},
      initialIsFormValid: false,
      isFormValid: false,
    };

    const updatedState = reducer(state, {
      type: STATE_ACTIONS.SET_FIELD_VALUE,
      payload: {
        name: 'testCheckbox',
        checked: true,
        type: 'checkbox',
      },
    });

    expect(updatedState).toEqual({
      values: { testCheckbox: true },
      initialValues: {},
      overriddenInitialValues: {},
      errors: {},
      initialIsFormValid: false,
      isFormValid: false,
    });
  });
});

describe('getInitialState', () => {
  it('Should return initialState object with default values', () => {
    expect(getInitialState()).toEqual({
      values: {},
      initialValues: {},
      overriddenInitialValues: {},
      errors: {},
      initialIsFormValid: false,
      isFormValid: false,
    });
  });

  it('Should return initialState object with correct values', () => {
    const initialValues = {
      foo: 'foo',
      bar: 'bar',
    };

    expect(getInitialState({ initialValues, validateOnSubmit: true })).toEqual({
      values: {
        foo: 'foo',
        bar: 'bar',
      },
      initialValues: {
        foo: 'foo',
        bar: 'bar',
      },
      overriddenInitialValues: {},
      errors: {},
      initialIsFormValid: true,
      isFormValid: true,
    });
  });
});
