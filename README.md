# react-minimalistic-use-form 
![version][version-badge]

[version-badge]: https://img.shields.io/badge/version-1.0.1-blue.svg
Minimalistic react hook for handling forms without tears.

React-minimalistic-use-form provides minimalistic way to handle forms in react.
It takes care of form state and validation. Validation is based on [html5 form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation).
It uses [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) and
validates form based on input `validity`.

## Supported validation rules:
+ valid – Is `true` when the field passes validation.
+ valueMissing – Is `true` when the field is empty but `required`.
+ typeMismatch – Is `true` when the field type is `email` or `url` but the entered value is `not` the `correct type`.
+ tooShort – Is `true` when the field contains a `minLength attribute` and the entered value is `shorter than that length`.
+ tooLong – Is `true` when the field contains a `maxLength attribute` and the entered value is `longer than that length`.
+ patternMismatch – Is `true` when the field contains a `pattern attribute` and the entered value `does not match the pattern`.
+ badInput – Is `true` when the input type is `number` and the entered value is `not a number`.
+ stepMismatch – Is `true` when the field has a `step attribute` and the entered value `does not adhere to the step values`.
+ rangeOverflow – Is `true` when the field has a `max attribute` and the entered number value is `greater than the max`.
+ rangeUnderflow – Is `true` when the field has a min attribute and the entered number value is `lower than the min`.

#### Example usage
1. EXPLICIT FORM CONTROL
 * import useForm hook
 * attach formRef to form 
 * attach event handlers

```javascript
import React from 'react';
import { useForm } from 'react-minimalistic-use-form';

export const MyForm = () => {
const {
    isFormValid, values, onChange, onBlur, onSubmit, errors
  } = useForm({ initialValues: { field1: 'foo', field2: 'bar'} });

const submitForm = ({ event, values, errors, isFormValid }) => {
 event.preventDefault();
 /* do some logic here... */
}


return {
    <form onSubmit={onSubmit(submitForm)} noValidate ref={formRef}>
       <div className="d-flex flex-row">
          <div className="col-12 mt-3">
            <label htmlFor="field1" className="m-0 mb-1 p-0">Field1</label>
            <input id="field1" name="field1" type="email" required value={values.field1} onChange={onChange} onBlur={oBlur} />
            {errros.field1 && Object.values(errors.field1).map((error, index) => (
            <span key={index} className="text-error">
              {error}
              <br />
            </span>}
          </div>
        </div>
       
       <div className="d-flex flex-row">
          <div className="col-12 mt-3">
            <label htmlFor="field2" className="m-0 mb-1 p-0">Field2</label>
            <input id="field2" name="field2" type="text" value={values.field2} onChange={onChange} onBlur={oBlur} />
            {errros.field2 && Object.values(errors.field2).map((error, index) => (
              <span key={index} className="text-error">
                {error}
                <br />
              </span>}
          </div>
        </div>

      <div className="d-flex flex-row">
        <div className="col-12">
          <button type="submit" className="mt-3 mb-0" outline disabled={isFormValid === false}>
            <span>Start!</span>
          </button>
        </div>
      </div>
</form>
}
}
```

2. IMPLICIT FORM CONTROL

If you find adding `onChange` and `onBlur` event handlers as painful and repetitive job, it is possible to let useForm hook
do that automatically for you by combining `useForm` and `<Form />` component.
 * import `useForm`
 * import `Form`
 * just attach `bindUseForm` to `Form`
 
```javascript
import React from 'react';
import { useForm, Form } from 'react-minimalistic-use-form';

export const MyForm = () => {
const {
    isFormValid, onSubmit, errors, bindUseForm
  } = useForm({ initialValues: { field1: 'foo', field2: 'bar'} });

const submitForm = ({ event, values, errors, isFormValid }) => {
 event.preventDefault();
 /* do some logic here... */
}

return {
    <Form onSubmit={onSubmit(submitForm)} noValidate bindUseForm={bindUseForm}>
       <div className="d-flex flex-row">
          <div className="col-12 mt-3">
            <label htmlFor="field1" className="m-0 mb-1 p-0">Field1</label>
            <input id="field1" name="field1" type="text" required />
            {errros.field1 && Object.values(errors.field1).map((error, index) => (
            <span key={index} className="text-error">
              {error}
              <br />
            </span>}
          </div>
        </div>
       
       <div className="d-flex flex-row">
          <div className="col-12 mt-3">
            <label htmlFor="field2" className="m-0 mb-1 p-0">Field2</label>
            <input id="field2" name="field1" type="text" required minLength={4} />
            {errros.field2 && Object.values(errors.field2).map((error, index) => (
              <span key={index} className="text-error">
                {error}
                <br />
              </span>}
          </div>
        </div>

      <div className="d-flex flex-row">
        <div className="col-12">
          <button type="submit" className="mt-3 mb-0" outline disabled={isFormValid === false}>
            <span>Start!</span>
          </button>
        </div>
      </div>
    </Form>
    }
}
```

Form component needs `bindUseForm` prop from useForm hook otherwise an Error will be thrown. 
Form will automatically bind input values
and `onChange`, `onBlur` eventHandlers that will handle form validation properly.

Either using just useForm hook or in a combination with Form component, useForm hook will handle validation automatically
for you. Optionally `validateOnInput` or `validateOnSubmit` can be configured.
In first case on user input form will automatically validate field and update `errors` object and
it will toggle error className to input field. To provide best user experience once input field is blurred,
useForm onBlur eventHandler will set className `is-dirty` (default value can be configured) and it will
trigger input validation. If field has validity: `false` an error className `has-error` (default value, can be configured) 
will be attached to input field.
It's up to consumer to style input field freely.
`errors` object contains all form field errors in format
```javascript
errors: {
  [fieldName]: {
    [validityName]: 'Error message'
  }
}
``` 
Validity names are native html5 [ValidityState interface](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
properties.
It's up to consumer how error messages will be displayed/styled/translated...

### Custom controlled inputs
It's fully possible to have custom controlled inputs either by just using useForm hook or 
with `<Form />` component as well. Only difference is that useForm hook without Form component
requires onChange and onBlur handlers to be called in order to track form internal state and validation,
where Form component automatically binds those so custom controlled inputs don't need
to attach or take care of anything extra.

Here are both examples.

```javascript
import React, { useState} from 'react';
import { useForm, Form } from 'react-minimalistic-use-form';

export const MyForm = () => {
const {
    isFormValid, onChange, onBlur, onSubmit,
  } = useForm();
  
  const [controlledField1, setControlledField1] = useState("field1");
  const _onChange = event => {
    setControlledField1(event.target.value);
    onChange(event)
  }

const submitForm = ({ event, values, errors, isFormValid }) => {
 event.preventDefault();
 /* do some logic here... */
}

return {
    <form onSubmit={onSubmit(submitForm)} noValidate ref={formRef}>
       <div className="d-flex flex-row">
          <div className="col-12 mt-3">
            <label htmlFor="field1" className="m-0 mb-1 p-0">Field1</label>
            <input id="field1" name="field1" type="email" value={controlledField1} onChange={onChange} onBlur={oBlur} />
          </div>
        </div>

      <div className="d-flex flex-row">
        <div className="col-12">
          <button type="submit" className="mt-3 mb-0" outline disabled={isFormValid === false}>
            <span>Start!</span>
          </button>
        </div>
      </div>
</form>
}
}
```

```javascript
import React, { useState} from 'react';
import { useForm, Form } from 'react-minimalistic-use-form';

export const MyForm = () => {
const {
    isFormValid, onSubmit, bindUseForm
  } = useForm();
  
  const [controlledField1, setControlledField1] = useState("field1");
  const _onChange = event => {
    setControlledField1(event.target.value);
  }

const submitForm = ({ event, values, errors, isFormValid }) => {
 event.preventDefault();
 /* do some logic here... */
}


return {
    <Form onSubmit={onSubmit(submitForm)} noValidate bindUseForm={bindUseForm}>
       <div className="d-flex flex-row">
          <div className="col-12 mt-3">
            <label htmlFor="field1" className="m-0 mb-1 p-0">Field1</label>
            <input id="field1" name="field1" type="email" value={controlledField1} onChange={onChange} />
          </div>
        </div>

      <div className="d-flex flex-row">
        <div className="col-12">
          <button type="submit" className="mt-3 mb-0" outline disabled={isFormValid === false}>
            <span>Start!</span>
          </button>
        </div>
      </div>
</Form>
}
}
```


## API
#### useForm
useForm accepts configuration object with following options: 
+ `initialValues` | `optional` - type: `object` - default: `{}`
+ `errorClassName` | `optional` - type: `string` - default: `has-error`
+ `isFieldDirtyClassName` | `optional` - type: `string` - default: `is-dirty`
+ `scrollToError` | `optional` - type: `boolean` - default: `false`
+ `validateOnInput` | `optional` - type: `boolean` - default: `true` 
+ `validateOnSubmit` | `optional` - type: `boolean` - default: `false`

#### Form
Form accepts all html5 form attributes along with some required:
`bindUseForm` | `required` - type: `object` - bindUseForm is exposed via useForm hook 


### FEATURES
* Form state management
* Native html5 form validation
* Form validation on input or on submit

#### Planned upcoming features and TODO's
+ Display errors next to input fields out-of-the-box
+ Custom validation
+ Test coverage

#### Current supported form fields
+ input
  * text
  * number
  * email
  * password
  * textarea
  * checkbox
  * radio
  * select

