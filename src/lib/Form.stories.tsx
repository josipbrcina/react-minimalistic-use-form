/* eslint-disable jsx-a11y/label-has-associated-control  */
import React from 'react';
import { useForm, Form, IonSubmitResponse } from './index';
import '../style.css';
import { renderFieldErrors } from '../utils/renderFieldErrors';

export default {
  title: 'Form component',
};

export const FormComponent: React.FC = () => {
  const {
    errors, isFormValid, onSubmit, bindUseForm, resetForm,
  } = useForm({ initialValues: { email: '' } });

  const submitValues = ({
    // eslint-disable-next-line no-shadow
    event, errors, values, isFormValid,
  }: IonSubmitResponse) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log({ errors, values, isFormValid });
  };

  return (
    <Form onSubmit={onSubmit(submitValues)} noValidate bindUseForm={bindUseForm} className="d-flex flex-col form">
      <div className="d-flex flex-col mb-10">
        <label htmlFor="email">Email</label>
        <input className="input" type="email" id="email" name="email" />
        {renderFieldErrors(errors.email)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="password">
          Password
          <sup>*</sup>
        </label>
        <input className="input" type="password" id="password" name="password" required />
        {renderFieldErrors(errors.password)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="text">
          Text
          <sup>*</sup>
        </label>
        <input className="input" type="text" id="text" name="text" required />
        {renderFieldErrors(errors.text)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="search" className="d-flex flex-align-center">
          Search
          <sup>*</sup>
        </label>
        <input className="input" type="search" id="search" name="search" required />
        {renderFieldErrors(errors.search)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="url" className="d-flex flex-align-center">
          Url
          <sup>*</sup>
        </label>
        <input className="input" type="url" id="url" name="url" required />
        {renderFieldErrors(errors.url)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="number">
          Number
          <sup>*</sup>
        </label>
        <input className="input" type="number" id="number" name="number" required />
        {renderFieldErrors(errors.number)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="text_area">
          Text Area
          <sup>*</sup>
        </label>
        <textarea className="input" id="text_area" name="text_area" required />
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
        </label>
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
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="select">
          Select
        </label>
        <select className="input" id="select" name="select">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="date" className="d-flex flex-align-center">
          Date
          <sup>*</sup>
        </label>
        <input className="input" type="date" id="date" name="date" required />
        {renderFieldErrors(errors.date)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="tel" className="d-flex flex-align-center">
          Tel
          <sup>*</sup>
        </label>
        <input className="input" type="tel" id="tel" name="tel" required minLength={6} />
        {renderFieldErrors(errors.tel)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="color" className="d-flex flex-align-center">
          Color
          <sup>*</sup>
        </label>
        <input className="input" type="color" id="color" name="color" required minLength={6} />
        {renderFieldErrors(errors.color)}
      </div>

      <div className="d-flex flex-col mt-10">
        <button className="button" type="button" onClick={resetForm}>Clear</button>
        <button className="button mt-5" type="submit" disabled={isFormValid === false}>Submit</button>
      </div>
    </Form>
  );
};
