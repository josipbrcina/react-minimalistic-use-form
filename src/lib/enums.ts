export enum htmlInputTypes {
  checkbox = 'checkbox',
  radio = 'radio',
  textarea = 'textarea',
  date = 'date',
}

export enum htmlAttributes {
  value= 'value',
  checked = 'checked',
  for = 'for',
}

export enum eventTypes {
  change = 'change',
  click = 'click',
  input = 'input',
  blur = 'blur',
}

export enum STATE_ACTIONS {
  SET_FIELD_VALUE = 'SET_FIELD_VALUE',
  SET_IS_FORM_VALID = 'SET_IS_FORM_VALID',
  SET_FIELD_ERRORS = 'SET_FIELD_ERRORS',
  SET_ERRORS = 'SET_ERRORS',
  RESET_FORM = 'RESET_FORM',
  SET_OVERRIDDEN_INITIAL_VALUES = 'SET_OVERRIDDEN_INITIAL_VALUES',
  SET_IS_SUBMITTING = 'SET_IS_SUBMITTING'
}

export enum eventHandlers {
  onChange = 'onChange',
  onBlur = 'onBlur',
}
