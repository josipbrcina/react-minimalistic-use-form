<p align="center">
 <img src='https://raw.githubusercontent.com/josipbrcina/react-minimalistic-use-form/master/RMUF_logo.png' height='200' alt='RMUF Logo' aria-label='react minimalistic use form' />
</p>

<h1 align="center">React Minimalistic Use Form </h1> 

<div align="center">

![version][version-badge]
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/josipbrcina/react-minimalistic-use-form/blob/master/LICENSE)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![npm downloads](https://img.shields.io/npm/dt/react-minimalistic-use-form.svg?style=flat-square&label=npm%20downloads)](<>)
![](coverage-badges/badge-branches.svg)
![](coverage-badges/badge-functions.svg)
![](coverage-badges/badge-lines.svg)
![](coverage-badges/badge-statements.svg)

</div>

[version-badge]: https://img.shields.io/badge/version-1.2.0-blue.svg

# Table of contents
- [react-minimalistic-use-form](#minimalistic-react-hook-for-handling-forms-without-much-pain)
    + [Features](#features)
      - [Current Supported Form Fields](#current-supported-form-fields)
    + [Installation](#installation)
  * [Supported Validation Rules](#supported-validation-rules)
  + [Example Usage](#example-usage)
     - [Explicit Form Control](#explicit-form-control)
     - [Implicit Form Control](#implicit-form-control)
     - [Custom Controlled Inputs](#custom-controlled-inputs)
  * [API](#api)
      - [useForm](#useform)
        - [Scroll to Error](#scroll-to-error)
        - [Plugins](#plugins)
      - [Form](#form)
  * [Planned Upcoming Features](#planned-upcoming-features-and-todo)

# Minimalistic react hook for handling forms without much pain.

React-minimalistic-use-form provides minimalistic way to handle forms in react.
It takes care of form state and validation. Validation is based on [html5 form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation).
It uses [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) and
validates form based on input `validity`.
This library has just peer dependencies `"react": ">=16.13.1"`, `"react-dom": ">=16.13.1"` and absolutely **ZERO OTHER DEPENDENCIES**, it's lightweight and powerful! 

It provides ability to validate form fields on user input or on form submit.
It automatically adds or removes error class name to input field if field is valid or not.  
Form can be explicitly controlled by manually attaching event handlers or implicitly by combining `useForm` hook 
and `<Form />` component where Form component will bind values and event handlers automatically for you!

### Installation

+ NPM `npm i react-minimalistic-use-form`

+ YARN `yarn add react-minimalistic-use-form`

### Features
* Form state management
* Native html5 form validation
* Form validation `on input` or `on submit`
* Automatically toggles error and "is-dirty" input class names
* Scroll to error
* Very lightweight with no dependencies
* Typescript support

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
  * tel
  * date
  * search
  * url
  * color


### Supported validation rules
+ valid – Is `true` when the field passes validation.
+ valueMissing – Is `true` when the field is empty but `required`.
+ typeMismatch – Is `true` when the field type is `email` or `url` but the entered value is `not` the `correct type`.
+ tooShort – Is `true` when the field contains a `minLength attribute` and the entered value is `shorter than that length`.
+ tooLong – Is `true` when the field contains a `maxLength attribute` and the entered value is `longer than that length`.
+ patternMismatch – Is `true` when the field contains a `pattern attribute` and the entered value `does not match the pattern`.
+ badInput – Is `true` when the input type is `number` and the entered value is `not a number`.
+ stepMismatch – Is `true` when the field has a `step attribute` and the entered value `does not adhere to the step values`.
+ rangeOverflow – Is `true` when the field has a `max attribute` and the entered number value is `greater than the max`.
+ rangeUnderflow – Is `true` when the field has a `min attribute` and the entered number value is `lower than the min`.
---

### Example usage

###### EXPLICIT FORM CONTROL
 * import useForm hook
 * attach formRef to the form 
 * attach event handlers (needed form handling iternal state and validation)

```javascript
import React from 'react';
import { useForm } from 'react-minimalistic-use-form';

export const MyForm = () => {
    const {
        isFormValid, values, onChange, onBlur, onSubmit, errors, formRef
      } = useForm({ initialValues: { field1: 'foo', field2: 'bar'} });
    
    const submitForm = ({ event, values, errors, isFormValid }) => {
     event.preventDefault();
     /* do some logic here... */
    };

  return (
    <form onSubmit={onSubmit(submitForm)} noValidate ref={formRef}>
      <div>
        <label htmlFor="field1">Field1</label>
        <input id="field1" name="field1" type="email" required value={values.field1} onChange={onChange} onBlur={onBlur} />
        {errros.field1 && Object.values(errors.field1).map((error, index) => (
        <span key={index} className="text-error">
          {error}
          <br />
        </span>))}
      </div>
       
      <div>
        <label htmlFor="field2">Field2</label>
        <input id="field2" name="field2" type="text" minLength="5" required value={values.field2} onChange={onChange} onBlur={onBlur} />
        {errros.field2 && Object.values(errors.field2).map((error, index) => (
          <span key={index} className="text-error">
            {error}
            <br />
          </span>))}
      </div>

      <div>
        <button type="submit" disabled={isFormValid === false}>
          <span>Start!</span>
        </button>
      </div>
    </form>
  );
}
```

###### IMPLICIT FORM CONTROL

If you find adding `onChange` and `onBlur` event handlers painful and repetitive job, or you simply don't want to add any extra 
logic, it is possible to let useForm hook do that automatically for you by combining `useForm` and `<Form />` component.
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
    };
    
    return (
        <Form onSubmit={onSubmit(submitForm)} noValidate bindUseForm={bindUseForm}>
          <div>
            <label htmlFor="field1">Field1</label>
            <input id="field1" name="field1" type="text" required />
            {errors.field1 && Object.values(errors.field1).map((error, index) => (
                <span key={index} className="text-error">
                  {error}
                  <br />
                </span>
             ))}
          </div>
           
           <div>
            <label htmlFor="field2">Field2</label>
            <input id="field2" name="field2" type="text" required minLength={4} />
            {errors.field2 && Object.values(errors.field2).map((error, index) => (
              <span key={index} className="text-error">
                {error}
                <br />
              </span>))}
          </div>
           
          <div>
            <button type="submit" disabled={isFormValid === false}>
              <span>Start!</span>
            </button>
          </div>
         
        </Form>
    );
}
```

Form component needs `bindUseForm` prop from useForm hook otherwise an Error will be thrown. 
Form will automatically bind input values
and `onChange`, `onBlur` eventHandlers that will handle form validation properly.

**NOTE**: Form input elements must have `id` and `name` attributes set, otherwise `Form` will not consider it as an 
input field, hence it won't attach needed event handlers.

Either using just useForm hook or in a combination with Form component, useForm hook will handle validation automatically
for you. Optionally `validateOnInput (boolean)` or `validateOnSubmit (boolean)` can be configured.

In first case, on user input, useForm will automatically validate that field, update `errors` object properly and
it will toggle error className to input field. To provide the best user experience once input field is blurred,
useForm onBlur eventHandler will set className `is-dirty` (default value can be configured) and it will
trigger input validation. If field has validity: `false` an error className `has-error` (default value, can be configured) 
will be attached to input field. As soon as field validity is valid, error class is removed from the field.

`errors` object contains all form field errors in format:
```
errors: {
  [fieldName]: {
    [validityName]: 'Error message',
    [otherValidityName]: 'Another error message'
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
to attach them additionally.

Here are both examples.

```javascript
import React, { useState} from 'react';
import { useForm, Form } from 'react-minimalistic-use-form';

export const MyForm = () => {
  const {
    isFormValid, onChange, onBlur, onSubmit, formRef
  } = useForm();
  
  const [controlledField1, setControlledField1] = useState("field1");
  
  const _onChange = event => {
    setControlledField1(event.target.value);
    onChange(event); // useForm onChange needs to be called!
  };

  const _onBlur = event => {
    /* some logic goes here */
    onBlur(event); // useForm onBlur needs to be called!
  };

  const submitForm = ({ event, values, errors, isFormValid }) => {
    event.preventDefault();
    /* do some logic here... */
  };
    
  return (
    <form onSubmit={onSubmit(submitForm)} noValidate ref={formRef}>
      <div>
        <label htmlFor="field1">Field1</label>
          <input id="field1" name="field1" type="email" value={controlledField1} onChange={_onChange} onBlur={_onBlur} />
      </div>
           
      <div>
        <button type="submit" disabled={isFormValid === false}>
          <span>Start!</span>
        </button>
      </div>
    </form>
  );
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
  };

const submitForm = ({ event, values, errors, isFormValid }) => {
 event.preventDefault();
 /* do some logic here... */
};


return (
    <Form onSubmit={onSubmit(submitForm)} noValidate bindUseForm={bindUseForm}>
      <div className="col-12 mt-3">
        <label htmlFor="field1" className="m-0 mb-1 p-0">Field1</label>
        <input id="field1" name="field1" type="email" value={controlledField1} onChange={_onChange} />
      </div>
       
      <div className="col-12">
        <button type="submit" className="mt-3 mb-0" disabled={isFormValid === false}>
          <span>Start!</span>
        </button>
      </div>
    </Form>
  );
}
```


## API
#### useForm
useForm accepts configuration object with following options:

| property  	        |  description 	                                |   type  | default     |   	
|---	                |---	                                        |---	  |---	        |	
|`initialValues`        | Form initial values                           | object  | {}   	    |   	
|`errorClassName`       | Input field error class name                  | string  | "has-error" |   	
|`isFieldDirtyClassName`| Input field "touched" class name              | string  | "is-dirty"  |   	
|`scrollToError`  	    | Scroll to form input field that has an error. | boolean | false   	|   	
|`scrollToErrorOptions` | Scroll to error options                       | object  | undefined   |  	
|`validateOnInput`  	| Validate form on user input.  	            | boolean | true   	    |   	
|`validateOnSubmit`  	| Validate form on submit.   	                | boolean | false   	|
|`plugins`  	        | Plugins to opt-in with custom logic.          | object  | {}   	    |

##### Scroll to Error
- scrollToError - If enabled useForm will scroll to element in case input has an error.
It will try to find input label to scroll to or if no label found it will scroll to input field.
By default useForm is using `Element.ScrollIntoView()` with provided `scrollToErrorOptions`;

- scrollToErrorOptions - options to be passed in as an argument to `Element.ScrollIntoView()`.

- What options are supported and how scrollIntoView works, which browsers are supported etc. check out official
documentation on [MDN - Element.ScrollIntoView()](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)                      	

##### Plugins

Use Form offers possibility to opt-in via `plugins` prop and change default useForm capabilities.
Currently supported plugins:
- `scrollToError` - scrolltoError plugin is a function that will be called on input field error.
useForm calls a scrollToError plugin function with one argument, the DOM label element (if one found) or input element itself.
 If scrollToError plugin is provided the default `Element.ScrollIntoView()` is overridden and hence ignored.  



useForm in return provides:
+ resetForm - `function` - resets form to initial state.
+ onChange - `function` - event handler needed for handling validation and input state.
+ onBlur - `function` - event handler needed for handling form validation
+ onSubmit - `function` - Curry function that accepts callback as an argument. 
It returns an object with `{ event, errors, values, isFormValid }`
+ validateForm - `function` - validates form and returns `isFormValid (boolean)`
+ isFormValid - `boolean` - Boolean describing form validity.
+ formRef - react useRef instance - *required to be attached to `form`
+ values - `object` - form values
+ errors - `object` - form errors
+ bindUseForm - `object` - *required to be attached to `<Form />` to automatically bind formRef and event handlers

NOTE: `isFormValid` initial value === `validateOnSubmit`. By `default` validateOnSubmit value is `false` which means 
form initial `isFormValid` state is false as well. You can choose how to handle initial isFormValid state by combining 
`validateOnInput` and manually triggering `validateForm` once your component is mounted, by just validating on submit
or by turning ON both validations. 

#### Form
Form accepts all html5 form attributes along with one required:

| property  	        |  description 	                              |   type            |    	
|---	                |---	                                      |---	              |	
|`bindUseForm`          | Object - contains formRef and eventHandlers | object *required  |

#### Planned upcoming features and TODO
+ FormComponent - Display errors next to input fields out-of-the-box
+ Support for validator plugin
