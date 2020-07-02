import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from '../lib';
import { renderFieldErrors } from '../utils/renderFieldErrors';
import { withErrorBoundary } from './ErrorBoundary';

export const FormWithUseForm = ({ onSubmit: _onSubmit, addFormRef, ...props }) => {
  const {
    values, errors, isFormValid, onChange, onBlur, onSubmit, formRef, resetForm, validateForm,
  } = useForm({ ...props });

  const submitValues = ({
    // eslint-disable-next-line no-shadow
    event, errors, values, isFormValid,
  }) => {
    event.preventDefault();
    _onSubmit({
      event, errors, values, isFormValid,
    });
  };

  return (
    <form onSubmit={onSubmit(submitValues)} noValidate {...(addFormRef ? { ref: formRef } : {})} className="d-flex flex-col form">
      <div className="d-flex flex-col mb-10">
        <label htmlFor="email">
          Email
          <input className="input" type="email" id="email" name="email" value={values.email ?? ''} onChange={onChange} onBlur={onBlur} />
        </label>
        {renderFieldErrors(errors.email)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="password">
          Password
          <sup>*</sup>
          <input className="input" type="password" id="password" name="password" value={values.password ?? ''} onChange={onChange} onBlur={onBlur} required />
        </label>
        {renderFieldErrors(errors.password)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="text">
          Text
          <sup>*</sup>
          <input className="input" type="text" id="text" name="text" value={values.text ?? ''} onChange={onChange} onBlur={onBlur} required />
        </label>
        {renderFieldErrors(errors.text)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="pattern">
          Text Pattern
          <sup>*</sup>
          <input className="input" type="pattern" id="pattern" name="pattern" value={values.pattern ?? ''} onChange={onChange} onBlur={onBlur} pattern="^A\d+\.\d+$" />
        </label>
        {renderFieldErrors(errors.pattern)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="min_length_3">
          Text Min length 3
          <input className="input" type="text" id="min_length_3" name="min_length_3" value={values.min_length_3 ?? ''} onChange={onChange} onBlur={onBlur} minLength={3} />
        </label>
        {renderFieldErrors(errors.min_length_3)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="max_length_3">
          Text Max length 3
          <input className="input" type="text" id="max_length_3" name="max_length_3" value={values.max_length_3 ?? ''} onChange={onChange} onBlur={onBlur} maxLength={3} />
        </label>
        {renderFieldErrors(errors.max_length_3)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="search" className="d-flex flex-align-center">
          Search
          <sup>*</sup>
          <input className="input" type="search" id="search" name="search" value={values.search ?? ''} onChange={onChange} onBlur={onBlur} required />
        </label>
        {renderFieldErrors(errors.search)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="url" className="d-flex flex-align-center">
          Url
          <sup>*</sup>
          <input className="input" type="url" id="url" name="url" value={values.url ?? ''} onChange={onChange} onBlur={onBlur} required />
        </label>
        {renderFieldErrors(errors.url)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="number">
          Number With Step
          <sup>*</sup>
          <input className="input" type="number" id="number" name="number" value={values.number ?? ''} onChange={onChange} onBlur={onBlur} step="0.01" />
        </label>
        {renderFieldErrors(errors.number)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="number_min_3">
          Number Min 3
          <sup>*</sup>
          <input className="input" type="number" id="number_min_3" name="number_min_3" value={values.number_min_3 ?? ''} onChange={onChange} onBlur={onBlur} min={3} />
        </label>
        {renderFieldErrors(errors.number_min_3)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="number_max_3">
          Number Max 3
          <sup>*</sup>
          <input className="input" type="number" id="number_max_3" name="number_max_3" value={values.number_max_3 ?? ''} onChange={onChange} onBlur={onBlur} max={3} />
        </label>
        {renderFieldErrors(errors.number_max_3)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="text_area">
          Text Area
          <sup>*</sup>
          <textarea className="input" id="text_area" name="text_area" value={values.text_area ?? ''} onChange={onChange} onBlur={onBlur} required />
        </label>
        {renderFieldErrors(errors.text_area)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="checkbox" className="d-flex flex-align-center">
          <input className="input" type="checkbox" id="checkbox" name="checkbox" value={values.checkbox ?? ''} onChange={onChange} onBlur={onBlur} />
          <span>Checkbox</span>
        </label>
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="radio">
          Radio group
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
        </label>
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="select">
          Select
          <select className="input" id="select" name="select" value={values.select ?? ''} onChange={onChange} onBlur={onBlur}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </label>
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="date" className="d-flex flex-align-center">
          Date
          <sup>*</sup>
          <input className="input" type="date" id="date" name="date" value={values.date ?? ''} onChange={onChange} onBlur={onBlur} required />
        </label>
        {renderFieldErrors(errors.date)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="tel" className="d-flex flex-align-center">
          Tel
          <sup>*</sup>
          <input className="input" type="tel" id="tel" name="tel" value={values.tel ?? ''} onChange={onChange} onBlur={onBlur} required minLength={6} />
        </label>
        {renderFieldErrors(errors.tel)}
      </div>

      <div className="d-flex flex-col mb-10">
        <label htmlFor="color" className="d-flex flex-align-center">
          Color
          <sup>*</sup>
          <input className="input" type="color" id="color" name="color" value={values.color ?? ''} onChange={onChange} onBlur={onBlur} required minLength={6} />
        </label>
        {renderFieldErrors(errors.color)}
      </div>

      <div id="values" values={values} />
      <div id="errors" errors={errors} />
      <div id="isFormValid" isformvalid={isFormValid.toString()} />

      <div className="d-flex flex-col mt-10">
        <button id="resetForm" className="button" type="button" onClick={resetForm}>Clear</button>
        <button id="validateForm" className="button" type="button" onClick={validateForm}>Validate Form</button>
        <button className="button mt-5" type="submit" disabled={isFormValid === false}>Submit</button>
      </div>
    </form>
  );
};

FormWithUseForm.defaultProps = {
  onSubmit: () => {},
  addFormRef: true,
};

FormWithUseForm.propTypes = {
  onSubmit: PropTypes.func,
  addFormRef: PropTypes.bool,
};
