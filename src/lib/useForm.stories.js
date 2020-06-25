/* eslint-disable jsx-a11y/label-has-associated-control  */
import React from 'react';
import { useForm } from './useForm';
import '../style.css';
import { renderFieldErrors } from '../utils/renderFieldErrors';

export default {
  title: 'useForm hook',
};

export function useFormHook() {
  const {
    values, errors, isFormValid, onChange, onBlur, onSubmit, formRef, resetForm,
  } = useForm({ initialValues: { email: '' } });

  const submitValues = ({
    // eslint-disable-next-line no-shadow
    event, errors, values, isFormValid,
  }) => {
    event.preventDefault();
    console.log({ errors, values, isFormValid });
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

      <div className="d-flex flex-col mt-10">
        <button className="button" type="button" onClick={resetForm}>Clear</button>
        <button className="button mt-5" type="submit" disabled={isFormValid === false}>Submit</button>
      </div>
    </form>
  );
}
