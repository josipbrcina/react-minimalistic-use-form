import React from 'react';
import { mount } from 'enzyme';
import { ErrorBoundary } from './ErrorBoundary';
import { getDefaultDateValue } from '../utils/getDefaultDateValue';
import { FormComponent } from './FormComponent';
import {
  ElementClassList, ERROR_CLASS_NAME, IS_DIRTY_CLASS_NAME, initialValues, ElementValidity,
} from '../__mock__/mockData';

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
    const sut = mount(<FormComponent />);
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
  it('Should have initial isFormValid TRUE and enabled submit button', () => {
    const sut = mount(<FormComponent validateOnSubmit />);
    expect(sut.find({ type: 'submit' }).props().disabled).toBe(false);
  });
  it('Should have initial isFormValid FALSE and disabled submit button', () => {
    const sut = mount(<FormComponent />);
    expect(sut.find({ type: 'submit' }).props().disabled).toBe(true);
  });
  it('Should be boolean value', () => {
    const sut = mount(<FormComponent validateOnSubmit />);
    expect(sut.find('#isFormValid').props().isformvalid === 'true').toBeTruthy();
  });
});

describe('FormComponent - ResetForm', () => {
  const sut = mount(<FormComponent validateOnSubmit initialValues={initialValues} />);
  const resetButton = sut.find('#resetForm');
  const getElement = selector => sut.find(selector);

  it('Should ADD "is-dirty" className on blur', () => {
    getElement('#email').simulate('blur');
    expect(getElement('#email').instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);

    getElement('#password').simulate('blur');
    expect(getElement('#password').instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);

    getElement('#text').simulate('blur');
    expect(getElement('#text').instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);

    getElement('#search').simulate('blur');
    expect(getElement('#search').instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);

    getElement('#url').simulate('blur');
    expect(getElement('#url').instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);

    getElement('#number').simulate('blur');
    expect(getElement('#number').instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);

    getElement('#text_area').simulate('blur');
    expect(getElement('#text_area').instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);

    getElement('#checkbox').simulate('blur');
    expect(getElement('#checkbox').instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);

    getElement('#select').simulate('blur');
    expect(getElement('#select').instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);

    getElement('#date').simulate('blur');
    expect(getElement('#date').instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);

    getElement('#tel').simulate('blur');
    expect(getElement('#tel').instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);

    getElement('#color').simulate('blur');
    expect(getElement('#color').instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
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
    expect(getElement('#date').instance().value).toEqual('1996-03-28');

    getElement('#tel').simulate('change', { target: { name: 'tel', value: '555-444', classList: new ElementClassList() } });
    expect(getElement('#tel').props().value).toEqual('555-444');

    getElement('#color').simulate('change', { target: { name: 'color', value: '#c4c4c4', classList: new ElementClassList() } });
    expect(getElement('#color').props().value).toEqual('#c4c4c4');
  });

  it('Should reset fields values, classNames and errors on "resetForm"', () => {
    resetButton.simulate('click');

    const { errors } = getElement('#errors').props();
    Object.values(errors).forEach(inputErrorsObject => {
      expect(Object.keys(inputErrorsObject).length === 0).toBeTruthy();
    });

    const email = getElement('#email');
    expect(email.instance().value).toEqual('test@test.com');
    expect(email.instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(false);
    expect(email.instance().classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const password = getElement('#password');
    expect(getElement('#password').instance().value).toEqual('password');
    expect(password.instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(false);
    expect(password.instance().classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const text = getElement('#text');
    expect(text.instance().value).toEqual('text');
    expect(text.instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(false);
    expect(text.instance().classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const search = getElement('#search');
    expect(search.instance().value).toEqual('search');
    expect(search.instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(false);
    expect(search.instance().classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const url = getElement('#url');
    expect(url.instance().value).toEqual('http://example.com');
    expect(url.instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(false);
    expect(url.instance().classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const number = getElement('#number');
    expect(number.instance().value).toEqual('11');
    expect(number.instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(false);
    expect(number.instance().classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const text_area = getElement('#text_area');
    expect(text_area.instance().value).toEqual('foobar');
    expect(text_area.instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(false);
    expect(text_area.instance().classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const checkbox = getElement('#checkbox');
    expect(checkbox.instance().value).toEqual('true');
    expect(checkbox.instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(false);
    expect(checkbox.instance().classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const select = getElement('#select');
    expect(select.instance().value).toEqual('option2');
    expect(select.instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(false);
    expect(select.instance().classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const date = getElement('#date');
    expect(date.instance().value).toEqual('2020-06-29');
    expect(date.instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(false);
    expect(date.instance().classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const tel = getElement('#tel');
    expect(tel.instance().value).toEqual('+12345678');
    expect(tel.instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(false);
    expect(tel.instance().classList.contains(ERROR_CLASS_NAME)).toBe(false);

    const color = getElement('#color');
    expect(color.instance().value).toEqual('#ffffff');
    expect(color.instance().classList.contains(IS_DIRTY_CLASS_NAME)).toBe(false);
    expect(color.instance().classList.contains(ERROR_CLASS_NAME)).toBe(false);
  });
});

describe('FormComponent - Input field validation', () => {
  it('Should scroll to error on input', () => {
    const sut = mount(<FormComponent scrollToError />);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const textInput = sut.find('#password');
    textInput.simulate('blur');

    expect(textInput.instance().scrollIntoView).toBeCalled();
  });

  it('Should NOT scroll to error on input', () => {
    const sut = mount(<FormComponent scrollToError validateOnInput={false} />);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const textInput = sut.find('#password');
    textInput.simulate('blur');

    expect(textInput.instance().scrollIntoView).toBeCalledTimes(0);
  });

  it('Should scroll to error on submit', () => {
    const sut = mount(<FormComponent scrollToError validateOnInput={false} validateOnSubmit />);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const submitButton = sut.find({ type: 'submit' });
    submitButton.props().disabled = false;
    submitButton.simulate('submit');
    const textInput = sut.find('#password');

    expect(textInput.instance().scrollIntoView).toBeCalled();
  });

  it('Should validate field for required constraint', () => {
    const sut = mount(<FormComponent />);
    const getElement = selector => sut.find(selector);

    const textInput = getElement('#text');
    textInput.simulate('blur');
    let isValid = textInput.instance().validity.valid;
    let { classList } = textInput.instance();

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(isValid).toBe(false);
    expect(getElement('#errors').props().errors.text.valueMissing).toBeDefined();

    textInput.instance().value = 'test text';
    textInput.simulate('change');

    isValid = textInput.instance().validity.valid;
    classList = textInput.instance().classList;

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(isValid).toBe(true);
    expect(getElement('#errors').props().errors.text.valueMissing).toBeUndefined();
  });

  it('Should validate field for type constraint', () => {
    const sut = mount(<FormComponent />);
    const getElement = selector => sut.find(selector);

    const emailInput = getElement('#email');
    emailInput.simulate('blur');
    emailInput.instance().value = 'foo';
    emailInput.simulate('change');
    let isValid = emailInput.instance().validity.valid;
    let { classList } = emailInput.instance();

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(isValid).toBe(false);
    expect(getElement('#errors').props().errors.email.typeMismatch).toBeDefined();

    emailInput.instance().value = 'foo@bar.com';
    emailInput.simulate('change');

    isValid = emailInput.instance().validity.valid;
    classList = emailInput.instance().classList;

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(isValid).toBe(true);
    expect(getElement('#errors').props().errors.email.typeMismatch).toBeUndefined();
  });

  it('Should validate field for minLength constraint', () => {
    const sut = mount(<FormComponent initialValues={{ min_length_3: '12' }} />);
    const getElement = selector => sut.find(selector);

    const validity = new ElementValidity({ valid: false, tooShort: true });
    const classList = new ElementClassList();

    const numberInput = getElement('#min_length_3');
    numberInput.simulate('blur', {
      target: {
        name: 'min_length_3', type: 'text', validity, classList,
      },
    });

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(validity.valid).toBe(false);
    expect(getElement('#errors').props().errors.min_length_3.tooShort).toBeDefined();

    validity.setValidity({ name: 'valid', value: true });
    validity.setValidity({ name: 'tooShort', value: false });
    numberInput.simulate('change', {
      target: {
        name: 'min_length_3', type: 'text', value: '123', validity, classList,
      },
    });

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(validity.valid).toBe(true);
    expect(getElement('#errors').props().errors.min_length_3.tooShort).toBeUndefined();
  });

  it('Should validate field for maxLength constraint', () => {
    const sut = mount(<FormComponent initialValues={{ max_length_3: '1234' }} />);
    const getElement = selector => sut.find(selector);

    const validity = new ElementValidity({ valid: false, tooLong: true });
    const classList = new ElementClassList();

    const numberInput = getElement('#max_length_3');
    numberInput.simulate('blur', {
      target: {
        name: 'max_length_3', type: 'text', validity, classList,
      },
    });

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(validity.valid).toBe(false);
    expect(getElement('#errors').props().errors.max_length_3.tooLong).toBeDefined();

    validity.setValidity({ name: 'valid', value: true });
    validity.setValidity({ name: 'tooLong', value: false });
    numberInput.simulate('change', {
      target: {
        name: 'max_length_3', type: 'text', value: '12', validity, classList,
      },
    });

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(validity.valid).toBe(true);
    expect(getElement('#errors').props().errors.max_length_3.tooLong).toBeUndefined();
  });

  it('Should validate field for min constraint', () => {
    const sut = mount(<FormComponent initialValues={{ number_min_3: 2 }} />);
    const getElement = selector => sut.find(selector);

    const numberMin3Input = getElement('#number_min_3');
    numberMin3Input.simulate('blur');
    let isValid = numberMin3Input.instance().validity.valid;
    let { classList } = numberMin3Input.instance();

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(isValid).toBe(false);
    expect(getElement('#errors').props().errors.number_min_3.rangeUnderflow).toBeDefined();

    numberMin3Input.instance().value = 4;
    numberMin3Input.simulate('change');

    isValid = numberMin3Input.instance().validity.valid;
    classList = numberMin3Input.instance().classList;

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(isValid).toBe(true);
    expect(getElement('#errors').props().errors.number_min_3.rangeUnderflow).toBeUndefined();
  });

  it('Should validate field for max constraint', () => {
    const sut = mount(<FormComponent initialValues={{ number_max_3: 4 }} />);
    const getElement = selector => sut.find(selector);

    const numberMax3Input = getElement('#number_max_3');
    numberMax3Input.simulate('blur');

    let isValid = numberMax3Input.instance().validity.valid;
    let { classList } = numberMax3Input.instance();

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(isValid).toBe(false);
    expect(getElement('#errors').props().errors.number_max_3.rangeOverflow).toBeDefined();

    numberMax3Input.instance().value = 2;
    numberMax3Input.simulate('change');

    isValid = numberMax3Input.instance().validity.valid;
    classList = numberMax3Input.instance().classList;

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(isValid).toBe(true);
    expect(getElement('#errors').props().errors.number_max_3.rangeOverflow).toBeUndefined();
  });

  it('Should validate field for pattern constraint', () => {
    const sut = mount(<FormComponent initialValues={{ pattern: 'foo' }} />);
    const getElement = selector => sut.find(selector);

    const patternInput = getElement('#pattern');
    patternInput.simulate('blur');
    let isValid = patternInput.instance().validity.valid;
    let { classList } = patternInput.instance();

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(isValid).toBe(false);
    expect(getElement('#errors').props().errors.pattern.patternMismatch).toBeDefined();

    patternInput.instance().value = 'A2323.1';
    patternInput.simulate('change');

    isValid = patternInput.instance().validity.valid;
    classList = patternInput.instance().classList;

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(isValid).toBe(true);
    expect(getElement('#errors').props().errors.pattern.patternMismatch).toBeUndefined();
  });

  it('Should validate field for step constraint', () => {
    const sut = mount(<FormComponent initialValues={{ number: 0.123 }} />);
    const getElement = selector => sut.find(selector);

    const validity = new ElementValidity({ valid: false, stepMismatch: true });
    const classList = new ElementClassList();

    const numberInput = getElement('#number');
    numberInput.simulate('blur', {
      target: {
        name: 'number', type: 'number', validity, classList,
      },
    });

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(true);
    expect(validity.valid).toBe(false);
    expect(getElement('#errors').props().errors.number.stepMismatch).toBeDefined();

    validity.setValidity({ name: 'valid', value: true });
    validity.setValidity({ name: 'stepMismatch', value: false });
    numberInput.simulate('change', {
      target: {
        name: 'number', type: 'number', value: 1.11, validity, classList,
      },
    });

    expect(classList.contains(IS_DIRTY_CLASS_NAME)).toBe(true);
    expect(classList.contains(ERROR_CLASS_NAME)).toBe(false);
    expect(validity.valid).toBe(true);
    expect(getElement('#errors').props().errors.number.stepMismatch).toBeUndefined();
  });
});
