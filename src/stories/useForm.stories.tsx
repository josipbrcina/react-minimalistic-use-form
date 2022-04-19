/* eslint-disable jsx-a11y/label-has-associated-control  */
import React from 'react';
import { useForm, IonSubmitResponse, Obj } from '../lib';
import '../style.css';
import { renderFieldErrors } from './renderFieldErrors';

export default {
  title: 'useForm',
};

export const useFormHook: React.FC = () => {
  const {
    values, errors, isFormValid, onChange, onBlur, onSubmit, formRef, resetForm,
  } = useForm({ initialValues: { email: '', date: '1986-12-28', tel: '491761110093' } });

  console.log({ errors, isFormValid });

  const submitValues = ({
    event, errors: onSubmitErrors, values: onSubmitValues, isFormValid: onSubmitIsFormValid,
  }: IonSubmitResponse) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log({ errors: onSubmitErrors, values: onSubmitValues, isFormValid: onSubmitIsFormValid });
  };

  return (
    <form onSubmit={onSubmit(submitValues)} noValidate ref={formRef} className="d-flex flex-col form">
      <div className="d-flex flex-col mb-10">
        <label htmlFor="email">Email</label>
        <input className="input" type="email" id="email" name="email" value={values.email} onChange={onChange} onBlur={onBlur} />
        {renderFieldErrors(errors.email)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="password">
          Password
          <sup>*</sup>
        </label>
        <input className="input" type="password" id="password" name="password" value={values.password} onChange={onChange} onBlur={onBlur} required />
        {renderFieldErrors(errors.password)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="text">
          Text
          <sup>*</sup>
        </label>
        <input className="input" type="text" id="text" name="text" value={values.text} onChange={onChange} onBlur={onBlur} required />
        {renderFieldErrors(errors.text)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="search" className="d-flex flex-align-center">
          Search
          <sup>*</sup>
        </label>
        <input className="input" type="search" id="search" name="search" value={values.search} onChange={onChange} onBlur={onBlur} required />
        {renderFieldErrors(errors.search)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="url" className="d-flex flex-align-center">
          Url
          <sup>*</sup>
        </label>
        <input className="input" type="url" id="url" name="url" value={values.url} onChange={onChange} onBlur={onBlur} required />
        {renderFieldErrors(errors.url)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="number">
          Number
          <sup>*</sup>
        </label>
        <input className="input" type="number" id="number" name="number" value={values.number} onChange={onChange} onBlur={onBlur} required />
        {renderFieldErrors(errors.number)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="text_area">
          Text Area
          <sup>*</sup>
        </label>
        <textarea className="input" id="text_area" name="text_area" value={values.text_area} onChange={onChange} onBlur={onBlur} required />
        {renderFieldErrors(errors.text_area)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="checkbox" className="d-flex flex-align-center">
          <input className="input" type="checkbox" id="checkbox" name="checkbox" value={values.checkbox} onChange={onChange} onBlur={onBlur} />
          <span>Checkbox</span>
        </label>
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="radio">
          Radio group
        </label>
        <div className="d-flex flex-row">
          <label htmlFor="radio1" className="d-flex flex-align-center">
            <input className="input" type="radio" id="radio1" name="radio" value="radio1" onChange={onChange} onBlur={onBlur} />
            <span>Radio 1</span>
          </label>
          <label htmlFor="radio2" className="d-flex flex-align-center">
            <input className="input" type="radio" id="radio2" name="radio" value="radio2" onChange={onChange} onBlur={onBlur} />
            <span>Radio 2</span>
          </label>
          <label htmlFor="radio3" className="d-flex flex-align-center">
            <input className="input" type="radio" id="radio3" name="radio" value="radio3" onChange={onChange} onBlur={onBlur} />
            <span>Radio 3</span>
          </label>
        </div>
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="select">
          Select
        </label>
        <select className="input" id="select" name="select" value={values.select} onChange={onChange} onBlur={onBlur}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="date" className="d-flex flex-align-center">
          Date
          <sup>*</sup>
        </label>
        <input className="input" type="date" id="date" name="date" value={values.date} onChange={onChange} onBlur={onBlur} required />
        {renderFieldErrors(errors.date)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="tel" className="d-flex flex-align-center">
          Tel
          <sup>*</sup>
        </label>
        <input className="input" type="tel" id="tel" name="tel" value={values.tel} onChange={onChange} onBlur={onBlur} required minLength={6} />
        {renderFieldErrors(errors.tel)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="color" className="d-flex flex-align-center">
          Color
          <sup>*</sup>
        </label>
        <input className="input" type="color" id="color" name="color" value={values.color} onChange={onChange} onBlur={onBlur} required minLength={6} />
        {renderFieldErrors(errors.color)}
      </div>

      <div className="d-flex flex-col mt-10">
        <button className="button" type="button" onClick={resetForm}>Clear</button>
        <button className="button mt-5" type="submit" disabled={isFormValid === false}>Submit</button>
      </div>
    </form>
  );
};
