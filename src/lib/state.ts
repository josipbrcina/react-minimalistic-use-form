import React from 'react';
import { htmlInputTypes, STATE_ACTIONS } from './enums';
import {
  Obj,
  IState,
  Action,
  ISetFieldValueAction,
  ISetIsFormValidAction,
  ISetFieldErrorsAction,
  ISetErrorsAction,
  IResetFormAction,
  ISetOverriddenInitialValuesAction,
  ISetIsSubmittingAction,
} from './index';

const getInitialErrorsState = (initialValues: Obj) => Object.keys(initialValues).reduce((acc: Obj, fieldName) => {
  acc[fieldName] = {};
  return acc;
}, {});

export const getInitialState = (
  initialValues: Obj = {},
): IState => ({
  values: initialValues,
  initialValues,
  overriddenInitialValues: {},
  errors: {},
  initialIsFormValid: false,
  isFormValid: false,
  isSubmitting: false,
});

// The Type Guard Functions
function isSetFieldValueAction(action: Action): action is ISetFieldValueAction {
  return action.type === STATE_ACTIONS.SET_FIELD_VALUE;
}

function isSetIsFormValidAction(action: Action): action is ISetIsFormValidAction {
  return action.type === STATE_ACTIONS.SET_IS_FORM_VALID;
}

function isSetFieldErrorsAction(action: Action): action is ISetFieldErrorsAction {
  return action.type === STATE_ACTIONS.SET_FIELD_ERRORS;
}

function isResetFormAction(action: Action): action is IResetFormAction {
  return action.type === STATE_ACTIONS.RESET_FORM;
}

function isSetOverriddenInitialValuesAction(action: Action): action is ISetOverriddenInitialValuesAction {
  return action.type === STATE_ACTIONS.SET_OVERRIDDEN_INITIAL_VALUES;
}

function isSetIsSubmittingAction(action: Action): action is ISetIsSubmittingAction {
  return action.type === STATE_ACTIONS.SET_IS_SUBMITTING;
}

function isSetErrorsAction(action: Action): action is ISetErrorsAction {
  return action.type === STATE_ACTIONS.SET_ERRORS;
}

export const reducer: React.Reducer<IState, Action> = (state, action): IState => {
  if (isSetFieldValueAction(action)) {
    const {
      name, type: elementType, checked, value,
    } = action.payload;

    return {
      ...state,
      values: {
        ...state.values,
        [name]: elementType === htmlInputTypes.checkbox ? checked : value,
      },
    };
  }

  if (isSetIsFormValidAction(action)) {
    const { isFormValid } = action.payload;
    return {
      ...state,
      isFormValid,
    };
  }

  if (isSetFieldErrorsAction(action)) {
    const { name, errors } = action.payload;
    return {
      ...state,
      errors: {
        ...state.errors,
        [name]: errors,
      },
    };
  }

  if (isSetErrorsAction(action)) {
    const { errors } = action.payload;

    return {
      ...state,
      errors,
    };
  }

  if (isResetFormAction(action)) {
    return {
      ...state,
      values: state.overriddenInitialValues,
      isFormValid: state.initialIsFormValid,
      errors: getInitialErrorsState(state.overriddenInitialValues),
    };
  }

  if (isSetOverriddenInitialValuesAction(action)) {
    const { overriddenInitialValues } = action.payload;
    return {
      ...state,
      values: overriddenInitialValues,
      overriddenInitialValues,
      errors: getInitialErrorsState(overriddenInitialValues),
    };
  }

  if (isSetIsSubmittingAction(action)) {
    const { isSubmitting } = action.payload;

    return {
      ...state,
      isSubmitting,
    };
  }

  return state;
};
