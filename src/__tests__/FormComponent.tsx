import React from 'react';
import {
  IOnSubmitCallbackFn, IonSubmitResponse, Obj,
  Form, useForm, IPluginsObject,
} from '../lib';

import { renderFieldErrors } from '../lib/renderFieldErrors';
import { noop } from '../utils/noop';

export interface IFormComponentProps {
    onSubmit?: IOnSubmitCallbackFn,
    addBindUseForm?: boolean,
    initialValues?: Obj,
    validateOnSubmit?: boolean,
    validateOnInput?: boolean,
    scrollToError?: boolean,
    addFormRef?: boolean,
    plugins?: IPluginsObject
}

export const FormComponent: React.FC<IFormComponentProps> = ({
  onSubmit: _onSubmit = noop,
  addBindUseForm = true,
  initialValues = {},
  validateOnSubmit = false,
  validateOnInput = true,
  scrollToError = false,
  ...props
}) => {
  const {
    values, errors, isFormValid, onSubmit, bindUseForm, resetForm, validateForm,
  } = useForm({
    initialValues, validateOnSubmit, scrollToError, validateOnInput, ...props,
  });

  const submitValues = ({
    event, errors: onSubmitErrors, values: onSubmitValues, isFormValid: onSubmitIsFormValid,
  }: IonSubmitResponse) => {
    event.preventDefault();
    _onSubmit({
      event, errors: onSubmitErrors, values: onSubmitValues, isFormValid: onSubmitIsFormValid,
    });
  };

  return (
    <Form onSubmit={onSubmit(submitValues)} noValidate {...(addBindUseForm ? { bindUseForm } : {})} className="d-flex flex-col form">
      <div className="d-flex flex-col mb-10">
        <label htmlFor="email">
          Email
          <input className="input" type="email" id="email" name="email" />
        </label>
        {renderFieldErrors(errors.email)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="password">
          Password
          <sup>*</sup>
          <input className="input" type="password" id="password" name="password" required />
        </label>
        {renderFieldErrors(errors.password)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="text">
          Text
          <sup>*</sup>
          <input className="input" type="text" id="text" name="text" required />
        </label>
        {renderFieldErrors(errors.text)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="pattern">
          Text Pattern
          <sup>*</sup>
          <input className="input" type="pattern" id="pattern" name="pattern" pattern="^A\d+\.\d+$" />
        </label>
        {renderFieldErrors(errors.pattern)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="min_length_3">
          Text Min length 3
          <input className="input" type="text" id="min_length_3" name="min_length_3" minLength={3} />
        </label>
        {renderFieldErrors(errors.min_length_3)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="max_length_3">
          Text Max length 3
          <input className="input" type="text" id="max_length_3" name="max_length_3" maxLength={3} />
        </label>
        {renderFieldErrors(errors.max_length_3)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="search" className="d-flex flex-align-center">
          Search
          <sup>*</sup>
          <input className="input" type="search" id="search" name="search" required />
        </label>
        {renderFieldErrors(errors.search)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="url" className="d-flex flex-align-center">
          Url
          <sup>*</sup>
          <input className="input" type="url" id="url" name="url" required />
        </label>
        {renderFieldErrors(errors.url)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="number">
          Number With Step
          <sup>*</sup>
          <input className="input" type="number" id="number" name="number" step="0.01" />
        </label>
        {renderFieldErrors(errors.number)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="number_min_3">
          Number Min 3
          <sup>*</sup>
          <input className="input" type="number" id="number_min_3" name="number_min_3" min={3} />
        </label>
        {renderFieldErrors(errors.number_min_3)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="number_max_3">
          Number Max 3
          <sup>*</sup>
          <input className="input" type="number" id="number_max_3" name="number_max_3" max={3} />
        </label>
        {renderFieldErrors(errors.number_max_3)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="text_area">
          Text Area
          <sup>*</sup>
          <textarea className="input" id="text_area" name="text_area" required />
        </label>
        {renderFieldErrors(errors.text_area)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="checkbox" className="d-flex flex-align-center">
          <input className="input" type="checkbox" id="checkbox" name="checkbox" />
          <span>Checkbox</span>
        </label>
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="radio">
          Radio group
          <div className="d-flex flex-row">
            <label htmlFor="radio1" className="d-flex flex-align-center">
              <input className="input" type="radio" id="radio1" name="radio" value="radio1" />
              <span>Radio 1</span>
            </label>
            <label htmlFor="radio2" className="d-flex flex-align-center">
              <input className="input" type="radio" id="radio2" name="radio" value="radio2" />
              <span>Radio 2</span>
            </label>
            <label htmlFor="radio3" className="d-flex flex-align-center">
              <input className="input" type="radio" id="radio3" name="radio" value="radio3" />
              <span>Radio 3</span>
            </label>
          </div>
        </label>
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="select">
          Select
          <select className="input" id="select" name="select">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </label>
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="date" className="d-flex flex-align-center">
          Date
          <sup>*</sup>
          <input className="input" type="date" id="date" name="date" required />
        </label>
        {renderFieldErrors(errors.date)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="tel" className="d-flex flex-align-center">
          Tel
          <sup>*</sup>
          <input className="input" type="tel" id="tel" name="tel" required minLength={6} />
        </label>
        {renderFieldErrors(errors.tel)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="color" className="d-flex flex-align-center">
          Color
          <sup>*</sup>
          <input className="input" type="color" id="color" name="color" required minLength={6} />
        </label>
        {renderFieldErrors(errors.color)}
      </div>

      <div id="values">
        {JSON.stringify(values)}
      </div>

      <div id="errors">
        {JSON.stringify(errors)}
      </div>
      <div id="isFormValid">
        {isFormValid.toString()}
      </div>

      <div className="d-flex flex-col mt-10">
        <button id="resetForm" className="button" type="button" onClick={resetForm}>Clear</button>
        <button id="validateForm" className="button" type="button" onClick={validateForm}>Validate Form</button>
        <button className="button mt-5" type="submit" disabled={isFormValid === false}>Submit</button>
      </div>
    </Form>
  );
};
