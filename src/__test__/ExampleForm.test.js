import React from 'react';
import { mount } from 'enzyme';
import { getDefaultDateValue } from '../utils/getDefaultDateValue';
import { FormWithUseForm } from './ExampleForm';

const initialValues = {
  email: 'test@test.com',
  password: 'password',
  text: 'text',
  search: 'search',
  url: 'http://example.com',
  number: 11,
  text_area: 'foobar',
  checkbox: true,
  select: 'option2',
  date: '2020-29-06',
  tel: '+12345678',
  color: '#ffffff',
};

describe('FormWithUseForm should render WITH provided initial values', () => {
  it('Should set properly provided initial values', () => {
    const sut = mount(<FormWithUseForm initialValues={initialValues} />);

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

    const inputDate = sut.find('#date');
    expect(inputDate.props().value).toEqual('2020-29-06');

    const inputTel = sut.find('#tel');
    expect(inputTel.props().value).toEqual('+12345678');

    const inputColor = sut.find('#color');
    expect(inputColor.props().value).toEqual('#ffffff');
  });
});

describe('FormWithUseForm should render WITHOUT provided initial values', () => {
  it('Should set properly default initial values if initial values are not provided', () => {
    const sut = mount(<FormWithUseForm />);
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

describe('FormWithUseForm should render with isFormValid', () => {
  it('Should have initial isFormValid TRUE and enabled submit button', () => {
    const sut = mount(<FormWithUseForm validateOnSubmit />);
    expect(sut.find({ type: 'submit' }).props().disabled).toBe(false);
  });
  it('Should have initial isFormValid FALSE and disabled submit button', () => {
    const sut = mount(<FormWithUseForm />);
    expect(sut.find({ type: 'submit' }).props().disabled).toBe(true);
  });
});

describe('FormWithUseForm should reset form values', () => {
  const sut = mount(<FormWithUseForm validateOnSubmit initialValues={initialValues} />);
  const resetButton = sut.find({ type: 'button' });
  const getElement = selector => sut.find(selector);

  it('Should update fields value on change', () => {
    getElement('#email').simulate('change', { target: { name: 'email', value: 'changed@email', classList: { contains() {} } } });
    expect(getElement('#email').props().value).toEqual('changed@email');

    getElement('#password').simulate('change', { target: { name: 'password', value: 'changedPassword', classList: { contains() {} } } });
    expect(getElement('#password').props().value).toEqual('changedPassword');

    getElement('#text').simulate('change', { target: { name: 'text', value: 'updated text', classList: { contains() {} } } });
    expect(getElement('#text').props().value).toEqual('updated text');

    getElement('#search').simulate('change', { target: { name: 'search', value: 'updated search', classList: { contains() {} } } });
    expect(getElement('#search').props().value).toEqual('updated search');

    getElement('#url').simulate('change', { target: { name: 'url', value: 'updated url', classList: { contains() {} } } });
    expect(getElement('#url').props().value).toEqual('updated url');

    getElement('#number').simulate('change', { target: { name: 'number', value: 25, classList: { contains() {} } } });
    expect(getElement('#number').props().value).toEqual(25);

    getElement('#text_area').simulate('change', { target: { name: 'text_area', value: 'updated text_area', classList: { contains() {} } } });
    expect(getElement('#text_area').props().value).toEqual('updated text_area');

    getElement('#checkbox').simulate('change', { target: { name: 'checkbox', value: false, classList: { contains() {} } } });
    expect(getElement('#checkbox').props().value).toEqual(false);

    getElement('#select').simulate('change', { target: { name: 'select', value: 'option1', classList: { contains() {} } } });
    expect(getElement('#select').props().value).toEqual('option1');

    getElement('#date').simulate('change', { target: { name: 'date', value: '1996-28-03', classList: { contains() {} } } });
    expect(getElement('#date').props().value).toEqual('1996-28-03');

    getElement('#tel').simulate('change', { target: { name: 'tel', value: '555-444', classList: { contains() {} } } });
    expect(getElement('#tel').props().value).toEqual('555-444');

    getElement('#color').simulate('change', { target: { name: 'color', value: '#c4c4c4', classList: { contains() {} } } });
    expect(getElement('#color').props().value).toEqual('#c4c4c4');
  });

  it('Should reset fields values on "resetForm"', () => {
    resetButton.simulate('click');

    expect(getElement('#email').props().value).toEqual('test@test.com');

    expect(getElement('#password').props().value).toEqual('password');

    expect(getElement('#text').props().value).toEqual('text');

    expect(getElement('#search').props().value).toEqual('search');

    expect(getElement('#url').props().value).toEqual('http://example.com');

    expect(getElement('#number').props().value).toEqual('11');

    expect(getElement('#text_area').props().value).toEqual('foobar');

    expect(getElement('#checkbox').props().value).toEqual(true);

    expect(getElement('#select').props().value).toEqual('option2');

    expect(getElement('#date').props().value).toEqual('2020-29-06');

    expect(getElement('#tel').props().value).toEqual('+12345678');

    expect(getElement('#color').props().value).toEqual('#ffffff');
  });
});

describe('Input fields should be validated onInput', () => {
  it('Should validate field for required', () => {
    const sut = mount(<FormWithUseForm />);
    const getElement = selector => sut.find(selector);

    const emailInput = getElement('#email');
    emailInput.simulate('blur');
    emailInput.simulate('change');
    const updatedEmail = sut.getDOMNode().querySelector('#email');
    const emailClassList = updatedEmail.className.split(' ');
    const isValid = updatedEmail.validity.valid;

    expect(emailClassList).toContain('is-dirty');
    expect(emailClassList).toContain('has-error');
    expect(isValid).toBe(false);
  });
});
