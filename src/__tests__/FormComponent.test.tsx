import React from 'react';
import { act } from 'react-dom/test-utils';
import {
  HTMLAttributes, mount, ReactWrapper,
} from 'enzyme';
import { ErrorBoundary } from './ErrorBoundary';
import { getDefaultDateValue } from '../utils/getDefaultDateValue';
import { FormComponent } from './FormComponent';
import {
  ElementClassList, ERROR_CLASS_NAME, TOUCHED_CLASS_NAME, initialValues, ElementValidity,
} from '../__mock__/mockData';
import { Obj } from '../lib';

const waitForComponentToPaint = async (wrapper: ReactWrapper) => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper.update();
  });
};

describe('Form Component - Exception', () => {
  it('Should throw Form is missing bindUseForm prop error', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => {});

    const spy = jest.fn();
    const wrapper = mount(<ErrorBoundary spy={spy}><FormComponent initialValues={initialValues} addBindUseForm={false} /></ErrorBoundary>);

    expect(wrapper.state()).toHaveProperty('hasError', true);
    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toEqual('Form is missing bindUseForm prop.');

    consoleSpy.mockRestore();
  });
});

describe('FormComponent - Default values should be provided INITIAL VALUES', () => {
  it('Should set properly provided initial values', () => {
    const sut = mount(<FormComponent initialValues={initialValues} />);

    const inputEmail = sut.find('#email');
    expect(inputEmail.props().value).toEqual('test@test.com');

    const inputPassword = sut.find('#password');
    expect(inputPassword.props().value).toEqual('password');

    const inputText = sut.find('#text');
    expect(inputText.props().value).toEqual('text');

    const inputSearch = sut.find('#search');
    expect(inputSearch.props().value).toEqual('search');

    const inputUrl = sut.find('#url');
    expect(inputUrl.props().value).toEqual('http://example.com');

    const inputNumber = sut.find('#number');
    expect(inputNumber.props().value).toEqual('11');

    const inputTextArea = sut.find('#text_area');
    expect(inputTextArea.props().value).toEqual('foobar');

    const inputCheckbox = sut.find('#checkbox');
    expect(inputCheckbox.props().value).toEqual(true);

    const inputSelect = sut.find('#select');
    expect(inputSelect.props().value).toEqual('option2');

    // TODO: fix test
    /* const inputDate = sut.find('#date');
    expect(inputDate.instance().value).toEqual('2020-29-06'); */

    const inputTel = sut.find('#tel');
    expect(inputTel.props().value).toEqual('+12345678');

    const inputColor = sut.find('#color');
    expect(inputColor.props().value).toEqual('#ffffff');
  });
});

describe('FormComponent - Default values should be set WITHOUT provided initial values', () => {
  it('Should set properly default initial values if initial values are not provided', () => {
    const sut: ReactWrapper = mount(<FormComponent />);
    const inputEmail = sut.find('#email');
    expect(inputEmail.props().value).toEqual('');

    const inputPassword = sut.find('#password');
    expect(inputPassword.props().value).toEqual('');

    const inputText = sut.find('#text');
    expect(inputText.props().value).toEqual('');

    const inputSearch = sut.find('#search');
    expect(inputSearch.props().value).toEqual('');

    const inputUrl = sut.find('#url');
    expect(inputUrl.props().value).toEqual('');

    const inputNumber = sut.find('#number');
    expect(inputNumber.props().value).toEqual('');

    const inputTextArea = sut.find('#text_area');
    expect(inputTextArea.props().value).toEqual('');

    const inputCheckbox = sut.find('#checkbox');
    expect(inputCheckbox.props().value).toEqual(false);

    const inputSelect = sut.find('#select');
    expect(inputSelect.props().value).toEqual('option1');

    const inputDate = sut.find('#date');
    expect(inputDate.props().value).toEqual(getDefaultDateValue());

    const inputTel = sut.find('#tel');
    expect(inputTel.props().value).toEqual('');

    const inputColor = sut.find('#color');
    expect(inputColor.props().value).toEqual('#000000');
  });
});

describe('FormComponent - isFormValid', () => {
  it('Should have initial isFormValid FALSE and disabled submit button', () => {
    const sut: ReactWrapper = mount(<FormComponent validateOnSubmit />);
    expect(sut.find({ type: 'submit' }).props().disabled).toBe(true);
  });
  it('Should have initial isFormValid FALSE and disabled submit button', () => {
    const sut = mount(<FormComponent />);
    expect(sut.find({ type: 'submit' }).props().disabled).toBe(true);
  });
  it('Should be boolean value', () => {
    const sut = mount(<FormComponent validateOnSubmit />);
    const isFormValid = sut.find('#isFormValid');

    expect(isFormValid.props().children).toEqual(['false']);
  });
});

describe('FormComponent - ResetForm', () => {
  const sut = mount(<FormComponent validateOnSubmit initialValues={initialValues} />);
  const resetButton = sut.find('#resetForm');
  const getElement = (selector: string): ReactWrapper<HTMLAttributes, unknown> => sut.find(selector);

  it('Should ADD "is-dirty" className on blur', () => {
    getElement('#email').simulate('blur');
    const email = sut.find('#email');
    const emailInstance = email.instance() as unknown as HTMLInputElement;
    expect(emailInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(true);

    getElement('#password').simulate('blur');
    const passwordInstance = getElement('#password').instance() as unknown as HTMLInputElement;
    expect(passwordInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(true);

    getElement('#text').simulate('blur');
    const textInstance = getElement('#text').instance() as unknown as HTMLInputElement;
    expect(textInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(true);

    getElement('#search').simulate('blur');
    const searchInstance = getElement('#search').instance() as unknown as HTMLInputElement;
    expect(searchInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(true);

    getElement('#url').simulate('blur');
    const urlInstance = getElement('#url').instance() as unknown as HTMLInputElement;
    expect(urlInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(true);

    getElement('#number').simulate('blur');
    const numberInstance = getElement('#number').instance() as unknown as HTMLInputElement;
    expect(numberInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(true);

    getElement('#text_area').simulate('blur');
    const text_areaInstance = getElement('#text_area').instance() as unknown as HTMLInputElement;
    expect(text_areaInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(true);

    getElement('#checkbox').simulate('blur');
    const checkboxInstance = getElement('#checkbox').instance() as unknown as HTMLInputElement;
    expect(checkboxInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(true);

    getElement('#select').simulate('blur');
    const selectInstance = getElement('#select').instance() as unknown as HTMLInputElement;
    expect(selectInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(true);

    getElement('#date').simulate('blur');
    const dateInstance = getElement('#date').instance() as unknown as HTMLInputElement;
    expect(dateInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(true);

    getElement('#tel').simulate('blur');
    const telInstance = getElement('#tel').instance() as unknown as HTMLInputElement;
    expect(telInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(true);

    getElement('#color').simulate('blur');
    const colorInstance = getElement('#color').instance() as unknown as HTMLInputElement;
    expect(colorInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
  });

  it('Should update fields value on change', () => {
    getElement('#email').simulate('change', {
      target: {
        name: 'email', type: 'email', value: 'changed@email', classList: new ElementClassList(),
      },
    });
    expect(getElement('#email').props().value).toEqual('changed@email');

    getElement('#password').simulate('change', { target: { name: 'password', value: 'changedPassword', classList: new ElementClassList() } });
    expect(getElement('#password').props().value).toEqual('changedPassword');

    getElement('#text').simulate('change', { target: { name: 'text', value: 'updated text', classList: new ElementClassList() } });
    expect(getElement('#text').props().value).toEqual('updated text');

    getElement('#search').simulate('change', { target: { name: 'search', value: 'updated search', classList: new ElementClassList() } });
    expect(getElement('#search').props().value).toEqual('updated search');

    getElement('#url').simulate('change', { target: { name: 'url', value: 'updated url', classList: new ElementClassList() } });
    expect(getElement('#url').props().value).toEqual('updated url');

    getElement('#number').simulate('change', { target: { name: 'number', value: 25, classList: new ElementClassList() } });
    expect(getElement('#number').props().value).toEqual(25);

    getElement('#text_area').simulate('change', { target: { name: 'text_area', value: 'updated text_area', classList: new ElementClassList() } });
    expect(getElement('#text_area').props().value).toEqual('updated text_area');

    getElement('#checkbox').simulate('change', { target: { name: 'checkbox', value: false, classList: new ElementClassList() } });
    expect(getElement('#checkbox').props().value).toEqual(false);

    getElement('#select').simulate('change', { target: { name: 'select', value: 'option1', classList: new ElementClassList() } });
    expect(getElement('#select').props().value).toEqual('option1');

    getElement('#date').simulate('change', { target: { name: 'date', value: '1996-03-28', classList: new ElementClassList() } });
    expect(getElement('#date').props().value).toEqual('1996-03-28');
    const dateInstance = getElement('#date').instance() as unknown as HTMLInputElement;
    expect(dateInstance.value).toEqual('1996-03-28');

    getElement('#tel').simulate('change', { target: { name: 'tel', value: '555-444', classList: new ElementClassList() } });
    expect(getElement('#tel').props().value).toEqual('555-444');

    getElement('#color').simulate('change', { target: { name: 'color', value: '#c4c4c4', classList: new ElementClassList() } });
    expect(getElement('#color').props().value).toEqual('#c4c4c4');
  });

  it('Should reset fields values, classNames and errors on "resetForm"', () => {
    resetButton.simulate('click');
    const errors = getElement('#errors').props().children as string;
    const parsedErrors: Obj = JSON.parse(errors);

    Object.values(parsedErrors).forEach(inputErrorsObject => {
      expect(Object.keys(inputErrorsObject).length === 0).toBeTruthy();
    });

    const email = getElement('#email');
    const emailInstance = email.instance() as unknown as HTMLInputElement;
    expect(emailInstance.value).toEqual('test@test.com');
    expect(emailInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(false);
    expect(emailInstance.classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const password = getElement('#password');
    const passwordInstance = password.instance() as unknown as HTMLInputElement;
    expect(passwordInstance.value).toEqual('password');
    expect(passwordInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(false);
    expect(passwordInstance.classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const text = getElement('#text');
    const textInstance = text.instance() as unknown as HTMLInputElement;
    expect(textInstance.value).toEqual('text');
    expect(textInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(false);
    expect(textInstance.classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const search = getElement('#search');
    const searchInstance = search.instance() as unknown as HTMLInputElement;
    expect(searchInstance.value).toEqual('search');
    expect(searchInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(false);
    expect(searchInstance.classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const url = getElement('#url');
    const urlInstance = url.instance() as unknown as HTMLInputElement;
    expect(urlInstance.value).toEqual('http://example.com');
    expect(urlInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(false);
    expect(urlInstance.classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const number = getElement('#number');
    const numberInstance = number.instance() as unknown as HTMLInputElement;
    expect(numberInstance.value).toEqual('11');
    expect(numberInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(false);
    expect(numberInstance.classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const text_area = getElement('#text_area');
    const text_areaInstance = text_area.instance() as unknown as HTMLInputElement;
    expect(text_areaInstance.value).toEqual('foobar');
    expect(text_areaInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(false);
    expect(text_areaInstance.classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const checkbox = getElement('#checkbox');
    const checkboxInstance = checkbox.instance() as unknown as HTMLInputElement;
    expect(checkboxInstance.value).toEqual('true');
    expect(checkboxInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(false);
    expect(checkboxInstance.classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const select = getElement('#select');
    const selectInstance = select.instance() as unknown as HTMLInputElement;
    expect(selectInstance.value).toEqual('option2');
    expect(selectInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(false);
    expect(selectInstance.classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const date = getElement('#date');
    const dateInstance = date.instance() as unknown as HTMLInputElement;
    expect(dateInstance.value).toEqual('2020-06-29');
    expect(dateInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(false);
    expect(dateInstance.classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const tel = getElement('#tel');
    const telInstance = tel.instance() as unknown as HTMLInputElement;
    expect(telInstance.value).toEqual('+12345678');
    expect(telInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(false);
    expect(telInstance.classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const color = getElement('#color');
    const colorInstance = color.instance() as unknown as HTMLInputElement;
    expect(colorInstance.value).toEqual('#ffffff');
    expect(colorInstance.classList.contains(TOUCHED_CLASS_NAME)).toBe(false);
    expect(colorInstance.classList.contains(ERROR_CLASS_NAME)).toBe(false);
  });
});

describe('FormComponent - onSubmit', () => {
  it('onSubmit should set isSubmitting to TRUE', async () => {
    const sut = mount(<FormComponent validateOnInput={false} validateOnSubmit />);
    const submitButton = sut.find({ type: 'submit' });
    submitButton.simulate('submit');
    await waitForComponentToPaint(sut);
    const isSubmitting = sut.find('#isSubmitting');

    expect(JSON.parse(isSubmitting.props().children as string)).toBe(true);
  });

  it('setIsSubmitting should set isSubmitting to FALSE', async () => {
    const sut = mount(<FormComponent validateOnInput={false} validateOnSubmit />);
    const submitButton = sut.find({ type: 'submit' });
    submitButton.simulate('submit');
    await waitForComponentToPaint(sut);
    const isSubmitting = sut.find('#isSubmitting');

    expect(JSON.parse(isSubmitting.props().children as string)).toBe(true);

    const setIsSubmittingFalseButton = sut.find('#setIsSubmitting');

    setIsSubmittingFalseButton.simulate('click');
    await waitForComponentToPaint(sut);
    const isSubmittingAfterSubmission = sut.find('#isSubmitting');

    expect(JSON.parse(isSubmittingAfterSubmission.props().children as string)).toBe(false);
  });
});

describe('FormComponent - Scroll to Error', () => {
  it('Should scroll to error on input', () => {
    const sut = mount(<FormComponent scrollToError />);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const textInput = sut.find('#password');
    textInput.simulate('blur');
    const textInputInstance = textInput.instance() as unknown as HTMLInputElement;

    expect(textInputInstance.scrollIntoView).toBeCalled();
  });

  it('Should NOT scroll to error on input', () => {
    const sut = mount(<FormComponent scrollToError validateOnInput={false} />);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const textInput = sut.find('#password');
    textInput.simulate('blur');
    const textInputInstance = textInput.instance() as unknown as HTMLInputElement;

    expect(textInputInstance.scrollIntoView).toBeCalledTimes(0);
  });

  it('Should scroll to error on submit', async () => {
    const sut = mount(<FormComponent scrollToError validateOnInput={false} validateOnSubmit />);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const submitButton = sut.find({ type: 'submit' });
    submitButton.props().disabled = false;
    submitButton.simulate('submit');
    await waitForComponentToPaint(sut);
    const textInput = sut.find('#password');
    const textInputInstance = textInput.instance() as unknown as HTMLInputElement;

    expect(textInputInstance.scrollIntoView).toBeCalled();
  });
});

describe('FormComponent - Input field validation', () => {
  it('Should validate field for required constraint', async () => {
    const sut = mount(<FormComponent />);
    const getElement = (selector: string): ReactWrapper<HTMLAttributes, unknown> => sut.find(selector);

    const textInput = getElement('#text');
    await act(async () => {
      textInput.simulate('blur');
    });
    const textInputInstance = textInput.instance() as unknown as HTMLInputElement;
    let isValid = textInputInstance.validity.valid;
    let { classList } = textInputInstance;

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(isValid).toBe(false);

    await waitForComponentToPaint(sut);
    const errors = sut.find('#errors').props().children as string;
    const parsedErrors: Obj = JSON.parse(errors);

    expect(parsedErrors.text.valueMissing).toBeDefined();

    const textInputUpdatedInstance = textInput.instance() as unknown as HTMLInputElement;

    textInputUpdatedInstance.value = 'test text';
    await act(async () => {
      textInput.simulate('change');
    });

    const textInputUpdatedInstance2 = textInput.instance() as unknown as HTMLInputElement;

    isValid = textInputUpdatedInstance2.validity.valid;
    classList = textInputUpdatedInstance2.classList;

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(isValid).toBe(true);

    await waitForComponentToPaint(sut);
    const errorsUpdated = sut.find('#errors').props().children as string;
    const parsedErrorsUpdated: Obj = JSON.parse(errorsUpdated);
    expect(parsedErrorsUpdated.text.valueMissing).toBeUndefined();
  });

  it('Should validate field for type constraint', async () => {
    const sut = mount(<FormComponent />);
    const getElement = (selector: string): ReactWrapper<HTMLAttributes, unknown> => sut.find(selector);

    const emailInput = getElement('#email');
    await act(async () => {
      emailInput.simulate('blur');
    });
    const emailInputInstance = emailInput.instance() as unknown as HTMLInputElement;
    emailInputInstance.value = 'foo';
    await act(async () => {
      emailInput.simulate('change');
    });
    const emailInputUpdatedInstance = emailInput.instance() as unknown as HTMLInputElement;
    let isValid = emailInputUpdatedInstance.validity.valid;
    let { classList } = emailInputUpdatedInstance;

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(isValid).toBe(false);

    await waitForComponentToPaint(sut);
    const errors = sut.find('#errors').props().children as string;
    const parsedErrors: Obj = JSON.parse(errors);
    expect(parsedErrors.email.typeMismatch).toBeDefined();

    emailInputInstance.value = 'foo@bar.com';
    await act(async () => {
      emailInput.simulate('change');
    });

    isValid = emailInputInstance.validity.valid;
    classList = emailInputInstance.classList;

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(isValid).toBe(true);

    await waitForComponentToPaint(sut);
    const errorsUpdated = sut.find('#errors').props().children as string;
    const parsedErrorsUpdated: Obj = JSON.parse(errorsUpdated);
    expect(parsedErrorsUpdated.email.typeMismatch).toBeUndefined();
  });

  it('Should validate field for minLength constraint', async () => {
    const sut = mount(<FormComponent initialValues={{ min_length_3: '12' }} />);
    const getElement = (selector: string): ReactWrapper<HTMLAttributes, unknown> => sut.find(selector);

    const validity = new ElementValidity({ valid: false, tooShort: true });
    const classList = new ElementClassList();

    const numberInput = getElement('#min_length_3');
    await act(async () => {
      numberInput.simulate('blur', {
        target: {
          name: 'min_length_3', type: 'text', validity, classList,
        },
      });
    });

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(validity.valid).toBe(false);

    await waitForComponentToPaint(sut);
    const errors = sut.find('#errors').props().children as string;
    const parsedErrors: Obj = JSON.parse(errors);

    expect(parsedErrors.min_length_3.tooShort).toBeDefined();

    validity.setValidity({ name: 'valid', value: true });
    validity.setValidity({ name: 'tooShort', value: false });
    await act(async () => {
      numberInput.simulate('change', {
        target: {
          name: 'min_length_3', type: 'text', value: '123', validity, classList,
        },
      });
    });

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(validity.valid).toBe(true);

    await waitForComponentToPaint(sut);
    const errorsUpdated = sut.find('#errors').props().children as string;
    const parsedErrorsUpdated: Obj = JSON.parse(errorsUpdated);

    expect(parsedErrorsUpdated.min_length_3.tooShort).toBeUndefined();
  });

  it('Should validate field for maxLength constraint', async () => {
    const sut = mount(<FormComponent initialValues={{ max_length_3: '1234' }} />);
    const getElement = (selector: string): ReactWrapper<HTMLAttributes, unknown> => sut.find(selector);

    const validity = new ElementValidity({ valid: false, tooLong: true });
    const classList = new ElementClassList();

    const numberInput = getElement('#max_length_3');
    await act(async () => {
      numberInput.simulate('blur', {
        target: {
          name: 'max_length_3', type: 'text', validity, classList,
        },
      });
    });

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(validity.valid).toBe(false);

    await waitForComponentToPaint(sut);
    const errors = sut.find('#errors').props().children as string;
    const parsedErrors: Obj = JSON.parse(errors);

    expect(parsedErrors.max_length_3.tooLong).toBeDefined();

    validity.setValidity({ name: 'valid', value: true });
    validity.setValidity({ name: 'tooLong', value: false });
    await act(async () => {
      numberInput.simulate('change', {
        target: {
          name: 'max_length_3', type: 'text', value: '12', validity, classList,
        },
      });
    });

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(validity.valid).toBe(true);

    await waitForComponentToPaint(sut);
    const errorsUpdated = sut.find('#errors').props().children as string;
    const parsedErrorsUpdated: Obj = JSON.parse(errorsUpdated);

    expect(parsedErrorsUpdated.max_length_3.tooLong).toBeUndefined();
  });

  it('Should validate field for min constraint', async () => {
    const sut = mount(<FormComponent initialValues={{ number_min_3: 2 }} />);
    const getElement = (selector: string): ReactWrapper<HTMLAttributes, unknown> => sut.find(selector);

    const numberMin3Input = getElement('#number_min_3');
    await act(async () => {
      numberMin3Input.simulate('blur');
    });

    const numberMin3InputInstance = numberMin3Input.instance() as unknown as HTMLInputElement;
    let isValid = numberMin3InputInstance.validity.valid;
    let { classList } = numberMin3InputInstance;

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(isValid).toBe(false);

    await waitForComponentToPaint(sut);
    const errors = sut.find('#errors').props().children as string;
    const parsedErrors: Obj = JSON.parse(errors);

    expect(parsedErrors.number_min_3.rangeUnderflow).toBeDefined();

    numberMin3InputInstance.value = '4';
    await act(async () => {
      numberMin3Input.simulate('change');
    });

    isValid = numberMin3InputInstance.validity.valid;
    classList = numberMin3InputInstance.classList;

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(isValid).toBe(true);

    await waitForComponentToPaint(sut);
    const errorsUpdated = sut.find('#errors').props().children as string;
    const parsedErrorsUpdated: Obj = JSON.parse(errorsUpdated);

    expect(parsedErrorsUpdated.number_min_3.rangeUnderflow).toBeUndefined();
  });

  it('Should validate field for max constraint', async () => {
    const sut = mount(<FormComponent initialValues={{ number_max_3: 4 }} />);
    const getElement = (selector: string): ReactWrapper<HTMLAttributes, unknown> => sut.find(selector);

    const numberMax3Input = getElement('#number_max_3');
    await act(async () => {
      numberMax3Input.simulate('blur');
    });

    const numberMax3InputInstance = numberMax3Input.instance() as unknown as HTMLInputElement;

    let isValid = numberMax3InputInstance.validity.valid;
    let { classList } = numberMax3InputInstance;

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(isValid).toBe(false);

    await waitForComponentToPaint(sut);
    const errors = sut.find('#errors').props().children as string;
    const parsedErrors: Obj = JSON.parse(errors);

    expect(parsedErrors.number_max_3.rangeOverflow).toBeDefined();

    numberMax3InputInstance.value = '2';
    await act(async () => {
      numberMax3Input.simulate('change');
    });

    isValid = numberMax3InputInstance.validity.valid;
    classList = numberMax3InputInstance.classList;

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(isValid).toBe(true);

    await waitForComponentToPaint(sut);
    const errorsUpdated = sut.find('#errors').props().children as string;
    const parsedErrorsUpdated: Obj = JSON.parse(errorsUpdated);

    expect(parsedErrorsUpdated.number_max_3.rangeOverflow).toBeUndefined();
  });

  it('Should validate field for pattern constraint', async () => {
    const sut = mount(<FormComponent initialValues={{ pattern: 'foo' }} />);
    const getElement = (selector: string): ReactWrapper<HTMLAttributes, unknown> => sut.find(selector);

    const patternInput = getElement('#pattern');
    await act(async () => {
      patternInput.simulate('blur');
    });

    const patternInputInstance = patternInput.instance() as unknown as HTMLInputElement;
    let isValid = patternInputInstance.validity.valid;
    let { classList } = patternInputInstance;

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(isValid).toBe(false);

    await waitForComponentToPaint(sut);
    const errors = sut.find('#errors').props().children as string;
    const parsedErrors: Obj = JSON.parse(errors);

    expect(parsedErrors.pattern.patternMismatch).toBeDefined();

    patternInputInstance.value = 'A2323.1';
    await act(async () => {
      patternInput.simulate('change');
    });

    isValid = patternInputInstance.validity.valid;
    classList = patternInputInstance.classList;

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(isValid).toBe(true);

    await waitForComponentToPaint(sut);
    const errorsUpdated = sut.find('#errors').props().children as string;
    const parsedErrorsUpdated: Obj = JSON.parse(errorsUpdated);

    expect(parsedErrorsUpdated.pattern.patternMismatch).toBeUndefined();
  });

  it('Should validate field for step constraint', async () => {
    const sut = mount(<FormComponent initialValues={{ number: 0.123 }} />);
    const getElement = (selector: string): ReactWrapper<HTMLAttributes, unknown> => sut.find(selector);

    const validity = new ElementValidity({ valid: false, stepMismatch: true });
    const classList = new ElementClassList();

    const numberInput = getElement('#number');
    await act(async () => {
      numberInput.simulate('blur', {
        target: {
          name: 'number', type: 'number', validity, classList,
        },
      });
    });

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(validity.valid).toBe(false);

    await waitForComponentToPaint(sut);
    const errors = sut.find('#errors').props().children as string;
    const parsedErrors: Obj = JSON.parse(errors);

    expect(parsedErrors.number.stepMismatch).toBeDefined();

    validity.setValidity({ name: 'valid', value: true });
    validity.setValidity({ name: 'stepMismatch', value: false });
    await act(async () => {
      numberInput.simulate('change', {
        target: {
          name: 'number', type: 'number', value: 1.11, validity, classList,
        },
      });
    });

    expect(classList.contains(TOUCHED_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(validity.valid).toBe(true);

    await waitForComponentToPaint(sut);
    const errorsUpdated = sut.find('#errors').props().children as string;
    const parsedErrorsUpdated: Obj = JSON.parse(errorsUpdated);

    expect(parsedErrorsUpdated.number.stepMismatch).toBeUndefined();
  });
});
