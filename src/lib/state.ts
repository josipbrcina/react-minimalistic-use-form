import { htmlInputTypes, STATE_ACTIONS } from '../enums';
import { Obj, IInitialState, IState, Action } from './index';

const getInitialErrorsState = (initialValues: Obj) => Object.keys(initialValues).reduce((acc: Obj, fieldName) => {
  acc[fieldName] = {};
  return acc;
}, {});

export const getInitialState = ({
  initialValues = {},
  validateOnSubmit = false,
}: IInitialState = {}): IState => ({
  values: initialValues,
  initialValues,
  overriddenInitialValues: {},
  errors: {},
  initialIsFormValid: validateOnSubmit,
  isFormValid: validateOnSubmit,
});

export const reducer = (state: IState, action: Action): IState => {
  const { type, payload } = action;
  switch (type) {
    case STATE_ACTIONS.SET_FIELD_VALUE: {
      const {
        name, type: elementType, checked, value,
      } = payload;

      return {
        ...state,
        values: {
          ...state.values,
          [name]: elementType === htmlInputTypes.checkbox ? checked : value,
        },
      };
    }
    case STATE_ACTIONS.SET_IS_FORM_VALID: {
      const { isFormValid } = payload;
      return {
        ...state,
        isFormValid,
      };
    }
    case STATE_ACTIONS.SET_FIELD_ERRORS: {
      const { name, errors } = payload;
      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: errors,
        },
      };
    }
    case STATE_ACTIONS.RESET_FORM: {
      return {
        ...state,
        values: state.overriddenInitialValues,
        isFormValid: state.initialIsFormValid,
        errors: getInitialErrorsState(state.overriddenInitialValues),
      };
    }
    case STATE_ACTIONS.SET_OVERRIDDEN_INITIAL_VALUES: {
      const { overriddenInitialValues } = payload;
      return {
        ...state,
        values: overriddenInitialValues,
        overriddenInitialValues,
        errors: getInitialErrorsState(overriddenInitialValues),
      };
    }
    default:
      throw new Error(`Unsupported action type: "${type}" in useForm reducer.`);
  }
};
