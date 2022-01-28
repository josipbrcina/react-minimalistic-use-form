/* eslint-disable jsx-a11y/label-has-associated-control  */
import React from 'react';
import { IonSubmitResponse, useForm } from '../lib';
import { renderFieldErrors } from '../lib/renderFieldErrors';
import { noop } from '../utils/noop';
import { IFormComponentProps } from './FormComponent';

export const FormWithUseFormPlugins: React.FC<IFormComponentProps> = ({
  onSubmit: _onSubmit = noop,
  addFormRef = true,
  initialValues = {},
  validateOnSubmit = false,
  validateOnInput = true,
  scrollToError = false,
  plugins = {},
  ...props
}) => {
  const {
    values, errors, isFormValid, onChange, onBlur, onSubmit, formRef, resetForm, validateForm, isSubmitting, setIsSubmitting,
  } = useForm({
    initialValues, validateOnInput, validateOnSubmit, scrollToError, plugins, ...props,
  });

  const submitValues = ({
    event, errors: onSubmitErrors, values: onSubmitValues, isFormValid: onSubmitIsFormValid,
  }: IonSubmitResponse) => {
    event.preventDefault();
    return _onSubmit({
      event, errors: onSubmitErrors, values: onSubmitValues, isFormValid: onSubmitIsFormValid,
    });
  };

  const _setIsSubmitting = (_isSubmitting: boolean) => setIsSubmitting(_isSubmitting);

  return (
    <form onSubmit={onSubmit(submitValues)} noValidate {...(addFormRef ? { ref: formRef } : {})} className="d-flex flex-col form">
      <div className="d-flex flex-col mb-10">
        <label htmlFor="email">Email</label>
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
        {renderFieldErrors(errors.email)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="password">
          Password
          <sup>*</sup>
        </label>
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
        {renderFieldErrors(errors.password)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="password_confirm">
          Confirm Password
          <sup>*</sup>
        </label>
        <input
          className="input"
          type="password"
          id="password_confirm"
          name="password_confirm"
          value={values.password_confirm}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
        {renderFieldErrors(errors.password_confirm)}
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

      <div id="isSubmitting">
        {isSubmitting.toString()}
      </div>

      <div className="d-flex flex-col mt-10">
        <button id="resetForm" className="button" type="button" onClick={resetForm}>Clear</button>
        <button id="validateForm" className="button" type="button" onClick={validateForm}>Validate Form</button>
        <button className="button mt-5" type="submit" disabled={isFormValid === false}>Submit</button>
        <button id="setIsSubmitting" type="button" onClick={() => _setIsSubmitting(false)}>Set is submitting to false</button>
      </div>
    </form>
  );
};
