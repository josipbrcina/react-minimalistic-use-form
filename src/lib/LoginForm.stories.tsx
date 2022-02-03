/* eslint-disable jsx-a11y/label-has-associated-control  */
import React from 'react';
import {
  useForm, Form, IonSubmitResponse, Obj,
} from './index';
import '../style.css';
import { renderFieldErrors } from './renderFieldErrors';

export default {
  title: 'Login Form component',
};

const validate = async ({ name, value, values } : { name: string, value: string | number | boolean, values: Obj}) : Promise<Obj | undefined> => {
  if (name === 'password_confirm' && value !== values.password) {
    return ({ passwordMismatch: 'Passwords do not match!' });
  }

  return undefined;
};

export const FormComponent: React.FC = () => {
  const {
    errors, isFormValid, onSubmit, bindUseForm, resetForm, values,
  } = useForm({ initialValues: { email: '' }, plugins: { validate }, debounceValidation: true });

  const submitValues = ({
    event, errors: onSubmitErrors, values: _values, isFormValid: onSubmitIsFormValid,
  }: IonSubmitResponse) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log({ errors: onSubmitErrors, _values, isFormValid: onSubmitIsFormValid });
  };

  return (
    <Form onSubmit={onSubmit(submitValues)} noValidate bindUseForm={bindUseForm} className="d-flex flex-col form">
      <div className="d-flex flex-col mb-10">
        <label htmlFor="email">Email</label>
        <input className="input" type="email" id="email" name="email" value={values.email} />
        {renderFieldErrors(errors.email)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="password">
          Password
          <sup>*</sup>
        </label>
        <input className="input" type="password" id="password" name="password" value={values.password} required />
        {renderFieldErrors(errors.password)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="password_confirm">
          Confirm Password
          <sup>*</sup>
        </label>
        <input className="input" type="password" id="password_confirm" name="password_confirm" value={values.password_confirm} required />
        {renderFieldErrors(errors.password_confirm)}
      </div>

      <div className="d-flex flex-col mt-10">
        <button className="button" type="button" onClick={resetForm}>Clear</button>
        <button className="button mt-5" type="submit" disabled={isFormValid === false}>Submit</button>
      </div>
    </Form>
  );
};
