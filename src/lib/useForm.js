import {
  useRef, useEffect, useCallback, useMemo, useReducer,
} from 'react';
import { getDefaultDateValue } from '../utils/getDefaultDateValue';
import { getInitialState, reducer, STATE_ACTIONS } from '../state';
import { eventTypes, htmlAttributes, htmlInputTypes } from '../enums';

const IS_DIRTY_CLASS_NAME = 'is-dirty';
const ERROR_CLASS_NAME = 'has-error';
const ELEMENT_TAG_NAME_SELECT = 'SELECT';
const CHECKBOX_DEFAULT_VALUE = 'on';
const supportedFormElements = ['text', 'email', 'password', 'checkbox', 'radio', 'number', 'textarea', 'date', 'tel', 'search'];
const validityDefaultErrorMessages = {
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

export const useForm = ({
  initialValues = {},
  errorClassName = ERROR_CLASS_NAME,
  isFieldDirtyClassName = IS_DIRTY_CLASS_NAME,
  scrollToError = false,
  validateOnInput = true,
  validateOnSubmit = false,
} = {}) => {
  const [state, dispatch] = useReducer(reducer, getInitialState({ initialValues, validateOnSubmit }));
  const formRef = useRef();

  const checkFormRefAndThrowError = form => {
    if (form === undefined) {
      throw new Error('formRef is empty! useForm "formRef" needs to be attached to form element');
    }
  };

  const getFormElements = form => [...form.elements]
    .filter(element => {
      console.log(element.type);
      return supportedFormElements.includes(element.type) || element.tagName === ELEMENT_TAG_NAME_SELECT;
    });

  const validateForm = useCallback(() => {
    const { current: form } = formRef;
    checkFormRefAndThrowError(form);
    const _isFormValid = getFormElements(form).every(element => element.validity.valid === true);

    dispatch({ type: STATE_ACTIONS.SET_IS_FORM_VALID, payload: { isFormValid: _isFormValid } });

    return _isFormValid;
  }, []);

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
  const setNativeValue = ({ element, attributeToUpdate = htmlAttributes.value, value = '' }) => {
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

  const _scrollToError = element => {
    const { previousSibling, name } = element;
    let elementLabel = previousSibling;
    let isValidLabel = elementLabel && elementLabel.getAttribute(htmlAttributes.for) === name;
    if (isValidLabel === false) {
      elementLabel = element.closest('label');
      isValidLabel = Boolean(elementLabel);
    }
    const elementToScrollTo = isValidLabel ? elementLabel : element;
    elementToScrollTo.scrollIntoView();
  };

  const updateError = useCallback(element => {
    const {
      validity, classList, name,
    } = element;

    if (validity.valid === true) {
      classList.remove(errorClassName);
      dispatch({ type: STATE_ACTIONS.SET_FIELD_ERRORS, payload: { name, errors: {} } });

      return { [name]: {} };
    }

    classList.add(errorClassName);
    const elementErrors = {};

    for (const validityName in validity) {
      /* eslint-disable-next-line */
      if (validityDefaultErrorMessages.hasOwnProperty(validityName) === true && validity[validityName] === true) {
        elementErrors[validityName] = validityDefaultErrorMessages[validityName](element);
      }
    }

    dispatch({ type: STATE_ACTIONS.SET_FIELD_ERRORS, payload: { name, errors: elementErrors } });

    if (scrollToError === true) {
      _scrollToError(element);
    }

    return { [name]: elementErrors };
  }, [errorClassName, scrollToError]);

  const resetForm = () => {
    const { current: form } = formRef;
    checkFormRefAndThrowError(form);
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

  const onChange = useCallback(({ target }) => {
    // Input is dirty - checking for validity live...
    if (validateOnInput === true) {
      if (target.classList.contains(isFieldDirtyClassName) === true) {
        updateError(target);
      }
      validateForm();
    }

    dispatch({ type: STATE_ACTIONS.SET_FIELD_VALUE, payload: target });
  }, [isFieldDirtyClassName, updateError, validateForm, validateOnInput]);

  const onBlur = useCallback(({ target }) => {
    // once blur is triggered, input is set to dirty which _flags_ onChange
    // handler to do live validation as the user types
    target.classList.add(isFieldDirtyClassName);

    if (validateOnInput === true) {
      updateError(target);
    }
  }, [isFieldDirtyClassName, updateError, validateOnInput]);

  const onSubmit = callbackFn => event => {
    let _isFormValid = state.isFormValid;
    let _errors = state.errors;

    if (validateOnSubmit === true) {
      const _formElements = getFormElements(formRef.current);
      _errors = _formElements.reduce((acc, element) => ({ ...acc, ...updateError(element) }), {});
      _isFormValid = validateForm();
      if (scrollToError === true) {
        const elementToScrollInto = _formElements.find(element => element.validity.valid === false);
        if (elementToScrollInto !== undefined) {
          _scrollToError(elementToScrollInto);
        }
      }
    }

    return callbackFn({
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
      elementInitialValue = isDefaultNativeHtmlCheckboxValue ? state.initialValues[name] : Boolean(elementInitialValue);
    } else if (isCheckbox && hasInitialValue === false) {
      elementInitialValue = isDefaultNativeHtmlCheckboxValue ? false : Boolean(elementInitialValue);
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
    const initialValuesToOverride = {};

    getFormElements(form)
      .forEach(element => {
        console.log(element.tagName);
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
  }, [getElementInitialValue, state.initialValues]);

  useEffect(() => {
    const { current: form } = formRef;
    checkFormRefAndThrowError(form);
    bindInitialValues(form);
  }, [bindInitialValues]);

  const bindUseForm = useMemo(() => ({
    formRef, onBlur, onChange,
  }), [formRef, onChange, onBlur]);

  return {
    resetForm,
    onChange,
    onBlur,
    onSubmit,
    validateForm,
    isFormValid: state.isFormValid,
    formRef,
    values: state.values,
    errors: state.errors,
    bindUseForm,
  };
};
