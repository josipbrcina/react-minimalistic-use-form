import React, {
  useRef, useEffect, useCallback, useMemo, useReducer,
} from 'react';

import { getDefaultDateValue } from '../utils/getDefaultDateValue';
import { getInitialState, reducer } from './state';
import {
  eventTypes, htmlAttributes, htmlInputTypes, STATE_ACTIONS,
} from './enums';
import {
  ISetNativeValue,
  IUseForm,
  IValidityDefaultErrorMessages,
  IOnSubmitCallbackFn,
  Obj,
  IuseFormResponse,
} from './index';
import { validatePlugins } from '../utils/validatePlugins';
import { useIsUpdated } from '../hooks/is-updated';

const IS_DIRTY_CLASS_NAME = 'is-dirty';
const ERROR_CLASS_NAME = 'has-error';
const ELEMENT_TAG_NAME_SELECT = 'SELECT';
const CHECKBOX_DEFAULT_VALUE = 'on';
const supportedFormElements: Array<string> = [
  'text',
  'email',
  'password',
  'checkbox',
  'radio',
  'number',
  'textarea',
  'date',
  'tel',
  'search',
  'url',
  'color',
];

const validityDefaultErrorMessages: IValidityDefaultErrorMessages = {
  badInput: () => 'Invalid input',
  patternMismatch: ({ pattern }) => `Please match the format requested : "${pattern}"`,
  rangeOverflow: ({ value }) => `Value must be less than or equal to ${value}.`,
  rangeUnderflow: ({ value }) => `Value must be greater than or equal to ${value}.`,
  stepMismatch: ({ step }) => `Please enter a valid value. Number must have step of ${step}`,
  tooLong: ({ maxLength, value }) => `Please lengthen this text to ${maxLength} characters or less (you are currently using ${value} character).`,
  tooShort: ({ minLength, value }) => `Please lengthen this text to ${minLength} characters or more (you are currently using ${value} character).`,
  typeMismatch: ({ type }) => `Type mismatch. Must be type of "${type}".`,
  valueMissing: () => 'Please fill in this field.',
};

/**
 *
 * This function is used on <resetForm>. The function updates the field value natively with initialValue
 * provided either via initialValues or custom one in case of custom controlled input.
 * Since Events (change | click) must be fired manually in order to call event handlers
 * of parent component that controls the input we have to update value via setter function
 * which will be picked up by input event handler attached as element attribute callback
 *
 * Why? Because React tracks when you set the value property on an input to keep track of the node's value.
 * When you dispatch a change event, it checks it's last value against the current value
 * (https://github.com/facebook/react/blob/dd5fad29616f706f484938663e93aaadd2a5e594/packages/react-dom/src/client/inputValueTracking.js#L129)
 * and if they're the same it does not call any event handlers (as no change has taken place as far as react is concerned).
 * So we have to set the value in a way that React's value setter function
 * (https://github.com/facebook/react/blob/dd5fad29616f706f484938663e93aaadd2a5e594/packages/react-dom/src/client/inputValueTracking.js#L78-L81)
 * will not be called, which is where the setNativeValue comes into play.
 * This function was a team effort: https://github.com/facebook/react/issues/10135#issuecomment-401496776
 * @param {Node} element
 * @param {String} attributeToUpdate
 * @param {String | Boolean} value
 */
export const setNativeValue = ({
  element,
  attributeToUpdate = htmlAttributes.value,
  value = '',
}: ISetNativeValue): void => {
  const { set: valueSetter } = Object.getOwnPropertyDescriptor(element, attributeToUpdate) || {};
  const prototype = Object.getPrototypeOf(element);
  const { set: prototypeValueSetter } = Object.getOwnPropertyDescriptor(prototype, attributeToUpdate) || {};

  if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else if (valueSetter) {
    valueSetter.call(element, value);
  } else {
    throw new Error('The given element does not have a value setter');
  }
};

export const useForm = ({
  initialValues = {},
  errorClassName = ERROR_CLASS_NAME,
  isFieldDirtyClassName = IS_DIRTY_CLASS_NAME,
  scrollToError = false,
  scrollToErrorOptions,
  validateOnInput = true,
  validateOnSubmit = false,
  debounceValidation = false,
  debounceTime = 300,
  plugins = {},
}: IUseForm = {}): IuseFormResponse => {
  const [state, dispatch] = useReducer(reducer, getInitialState(initialValues));
  const formRef = useRef<HTMLFormElement>(null);
  const validatorDebounceTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const throwFormRefError = (): never => {
    throw new Error('formRef is empty! useForm "formRef" needs to be attached to form element');
  };

  const getFormElements = useCallback((form?: HTMLFormElement | null): HTMLInputElement[] => {
    if (form === null || form === undefined) {
      return throwFormRefError();
    }

    const formElements = form.elements as unknown as HTMLInputElement[];

    return [...formElements]
      .filter(element => supportedFormElements.includes(element.type) || element.tagName === ELEMENT_TAG_NAME_SELECT);
  }, []);

  /**
   * Method runs on each change of state.errors to properly update "isFormValid".
   */
  const updateIsFormValid = useCallback(() => {
    const formElements = getFormElements(formRef.current);
    const allValidityValid = formElements.every(element => element.validity.valid);
    const noErrors = Object.values(state.errors).every(fieldErrors => Object.keys(fieldErrors).length === 0);

    const isFormValid = allValidityValid && noErrors;

    dispatch({ type: STATE_ACTIONS.SET_IS_FORM_VALID, payload: { isFormValid } });

    return isFormValid;
  }, [getFormElements, state.errors]);

  const _scrollToError = useCallback(async (element: HTMLInputElement): Promise<unknown> => {
    const inputLabel = element?.closest('label') ?? document.querySelector(`label[for="${element.name}"`);
    const elementToScrollInto = inputLabel ?? element;

    if (plugins?.scrollToError !== undefined) {
      await plugins.scrollToError(elementToScrollInto);
      return;
    }

    elementToScrollInto.scrollIntoView(scrollToErrorOptions);
  }, [plugins, scrollToErrorOptions]);

  const updateError = useCallback(async ({ element, shouldScrollToError } : { element: HTMLInputElement, shouldScrollToError: boolean }) => {
    const {
      validity, classList, name, value,
    } = element;

    let elementErrors: Obj = {};

    if (!validity.valid) {
      for (const validityName in validity) {
        // @ts-ignore
        if (validityDefaultErrorMessages.hasOwnProperty(validityName) === true && validity[validityName] === true) { // eslint-disable-line
          elementErrors[validityName] = validityDefaultErrorMessages[validityName](element);
        }
      }
    }

    const { validator } = plugins;

    if (validator !== undefined) {
      const errors = await validator({
        name, value, values: state.values, target: element,
      });
      elementErrors = {
        ...elementErrors,
        ...errors,
      };
    }

    if (Object.keys(elementErrors).length === 0) {
      classList.remove(errorClassName);
      dispatch({ type: STATE_ACTIONS.SET_FIELD_ERRORS, payload: { name, errors: {} } });

      return { [name]: {} };
    }

    classList.add(errorClassName);
    dispatch({ type: STATE_ACTIONS.SET_FIELD_ERRORS, payload: { name, errors: elementErrors } });

    if (shouldScrollToError) {
      _scrollToError(element);
    }

    return { [name]: elementErrors };
  }, [errorClassName, _scrollToError, state.values, plugins]);

  const resetForm = () => {
    const { current: form } = formRef;
    const { overriddenInitialValues } = state;

    getFormElements(form)
      .forEach(element => {
        const {
          classList, type, value, name,
        } = element;
        classList.remove(errorClassName, isFieldDirtyClassName);

        setNativeValue({ element, value: overriddenInitialValues[name] });

        if (type === htmlInputTypes.checkbox || type === htmlInputTypes.radio) {
          const checked = type === htmlInputTypes.radio ? value === overriddenInitialValues[name] : overriddenInitialValues[name] === true;
          setNativeValue({ element, value: checked, attributeToUpdate: htmlAttributes.checked });
          element.dispatchEvent(new window.InputEvent(eventTypes.click, { bubbles: true }));
        }

        element.dispatchEvent(new window.InputEvent(eventTypes.input, { bubbles: true }));
        element.dispatchEvent(new window.InputEvent(eventTypes.change, { bubbles: true }));
      });

    dispatch({ type: STATE_ACTIONS.RESET_FORM });
  };

  const validateInputOnChange = useCallback(async event => {
    // Input is dirty - checking for validity live...
    const shouldValidate = validateOnInput === true && event.target.classList.contains(isFieldDirtyClassName);

    if (!shouldValidate) return;

    if (debounceValidation) {
      // @ts-ignore
      clearTimeout(validatorDebounceTimeout.current);
      event.persist();
      validatorDebounceTimeout.current = setTimeout(async () => {
        await updateError({ element: event.target, shouldScrollToError: scrollToError });
      }, debounceTime);

      return;
    }

    await updateError({ element: event.target, shouldScrollToError: scrollToError });
  }, [debounceValidation, debounceTime, isFieldDirtyClassName, scrollToError, updateError, validateOnInput]);

  const onChange = useCallback(async (event) : Promise<void> => {
    const {
      name, value, type, checked,
    } = event.target;

    dispatch({
      type: STATE_ACTIONS.SET_FIELD_VALUE,
      payload: {
        name, type, checked, value,
      },
    });

    await validateInputOnChange(event);
  }, [validateInputOnChange]);

  const setFieldTouched = useCallback((element: HTMLInputElement) => element.classList.add(isFieldDirtyClassName), [isFieldDirtyClassName]);

  const onBlur = useCallback(async ({ target }) => {
    // once blur is triggered, input is set to dirty which _flags_ onChange
    // handler to do live validation as the user types
    setFieldTouched(target);

    if (validateOnInput === true) {
      await updateError({ element: target, shouldScrollToError: scrollToError });
    }
  }, [updateError, validateOnInput, scrollToError, setFieldTouched]);

  const setIsSubmitting = useCallback((isSubmitting) => {
    dispatch({ type: STATE_ACTIONS.SET_IS_SUBMITTING, payload: { isSubmitting } });
  }, []);

  const validateForm = useCallback(async ({ shouldTouchField = true, shouldScrollToError = false }: { shouldTouchField?: boolean, shouldScrollToError?: boolean } = {}) => {
    const _formElements = getFormElements(formRef.current);

    if (shouldTouchField === true) {
      _formElements.forEach(element => setFieldTouched(element));
    }

    return Promise.all<Obj>(_formElements.map(element => updateError({ element, shouldScrollToError })));
  }, []);

  const onSubmit = (callbackFn: IOnSubmitCallbackFn) => async (event: React.FormEvent) => {
    event.persist();
    setIsSubmitting(true);

    let _isFormValid = state.isFormValid;
    let _errors = state.errors;

    if (validateOnSubmit === true) {
      const _formElements = getFormElements(formRef.current);
      const updatedErrors = await validateForm();
      _errors = updatedErrors.reduce((acc, error) => ({ ...acc, ...error }), _errors);
      _isFormValid = Object.values(_errors).every(fieldErrors => Object.keys(fieldErrors).length === 0);

      if (!_isFormValid && scrollToError === true) {
        const elementToScrollInto = _formElements.find(element => !element.validity.valid || Object.keys(_errors[element.name]).length > 0);

        if (elementToScrollInto !== undefined) {
          _scrollToError(elementToScrollInto);
        }
      }
    }

    await callbackFn({
      event, isFormValid: _isFormValid, errors: _errors, values: state.values,
    });
  };

  /**
   * getElementInitialValue gets elements "right" initialValue where multiple cases are covered:
   * 1) Form field doesn't have explicitly set attribute <value> and it's not set in useForm via initialValues prop
   * 2) Form field doesn't have explicitly set attribute <value> but it's set in useForm via initialValues prop
   * 3) Form field has explicitly set attribute <value> (controlled input) and it's not set in useForm via initialValues prop
   * 4) Form field has explicitly set attribute <value> (controlled input) and has set value via initialValues prop - in this
   * case controlled input has precedence and the value from initialValues is overridden
   */
  const getElementInitialValue = useCallback(({ name, type, value }) => {
    let elementInitialValue = value;
    const hasInitialValue = name in state.initialValues;
    const isCheckbox = type === htmlInputTypes.checkbox;
    const isDefaultNativeHtmlCheckboxValue = value === CHECKBOX_DEFAULT_VALUE;

    if (isCheckbox && hasInitialValue === true) {
      elementInitialValue = isDefaultNativeHtmlCheckboxValue ? state.initialValues[name] : elementInitialValue === 'true';
    } else if (isCheckbox && hasInitialValue === false) {
      elementInitialValue = isDefaultNativeHtmlCheckboxValue ? false : elementInitialValue === 'true';
    } else if (!isCheckbox && hasInitialValue === true) {
      elementInitialValue = Boolean(value) === false ? state.initialValues[name] : elementInitialValue;
    } else if (!isCheckbox && hasInitialValue === false) {
      elementInitialValue = type === htmlInputTypes.date ? getDefaultDateValue() : elementInitialValue;
    }

    return elementInitialValue;
  }, [state.initialValues]);

  /**
   * This function ensures that consumer can have custom controlled form fields. In that case
   * initial value on the form will be overridden by consumer's custom controlled value
   * to persist valid form values in case form gets submitted
   * without changing the value in custom controlled input fields
   */
  const bindInitialValues = useCallback(form => {
    const initialValuesToOverride: Obj = {};

    getFormElements(form)
      .forEach(element => {
        const elementInitialValue = getElementInitialValue(element);
        const shouldOverrideInitialValue = element.type !== htmlInputTypes.radio || (element.type === htmlInputTypes.radio && element.checked === true);

        if (shouldOverrideInitialValue) {
          initialValuesToOverride[element.name] = elementInitialValue;
        }

        // eslint-disable-next-line no-param-reassign
        element.value = elementInitialValue;

        if (element.type === htmlInputTypes.checkbox) {
          // eslint-disable-next-line no-param-reassign
          element.checked = elementInitialValue === true;
        }
      });

    const updatedInitialValues = { ...state.initialValues, ...initialValuesToOverride };

    // Set proper initial <checked> attribute for radio buttons
    [...form.elements].filter(element => element.type === htmlInputTypes.radio)
      .forEach(element => {
        // eslint-disable-next-line no-param-reassign
        element.checked = element.value === updatedInitialValues[element.name];
      });

    dispatch({ type: STATE_ACTIONS.SET_OVERRIDDEN_INITIAL_VALUES, payload: { overriddenInitialValues: updatedInitialValues } });
  }, [getElementInitialValue, state.initialValues, getFormElements]);

  const _validatePlugins = useCallback(() => validatePlugins(plugins), [plugins]);

  useEffect(_validatePlugins, []);

  useIsUpdated(() => {
    updateIsFormValid();
  }, [state.errors]);

  useEffect(() => {
    const { current: form } = formRef;
    bindInitialValues(form);
  }, [bindInitialValues]);

  const bindUseForm = useMemo(() => ({
    formRef, onBlur, onChange, values: state.values,
  }), [formRef, onChange, onBlur, state.values]);

  return {
    resetForm,
    onChange,
    onBlur,
    onSubmit,
    validateForm,
    isFormValid: state.isFormValid,
    isSubmitting: state.isSubmitting,
    formRef,
    values: state.values,
    errors: state.errors,
    bindUseForm,
    setIsSubmitting,
  };
};
