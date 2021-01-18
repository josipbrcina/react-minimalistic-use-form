// eslint-disable-next-line max-classes-per-file
export class ElementClassList {
  classList: Array<string>;

  constructor() {
    this.classList = [];
  }

  add(className: string): ElementClassList {
    this.classList.push(className);
    return this;
  }

  remove(className: string): ElementClassList {
    this.classList = this.classList.filter(_classname => _classname !== className);
    return this;
  }

  contains(className: string): boolean {
    return this.classList.some(_className => _className === className);
  }
}

export class ElementValidity {
  valid: boolean;

  badInput: boolean;

  patternMismatch: boolean;

  rangeOverflow: boolean;

  rangeUnderflow: boolean;

  stepMismatch: boolean;

  tooLong: boolean;

  tooShort: boolean;

  typeMismatch: boolean;

  valueMissing: boolean;

  constructor({
    valid = true,
    badInput = false,
    patternMismatch = false,
    rangeOverflow = false,
    rangeUnderflow = false,
    stepMismatch = false,
    tooLong = false,
    tooShort = false,
    typeMismatch = false,
    valueMissing = false,
  } = {}) {
    this.valid = valid;
    this.badInput = badInput;
    this.patternMismatch = patternMismatch;
    this.rangeOverflow = rangeOverflow;
    this.rangeUnderflow = rangeUnderflow;
    this.stepMismatch = stepMismatch;
    this.tooLong = tooLong;
    this.tooShort = tooShort;
    this.typeMismatch = typeMismatch;
    this.valueMissing = valueMissing;
  }

  setValidity({ name, value }: {name: string, value: boolean}): void {
    // @ts-ignore
    this[name] = value;
  }
}

export const IS_DIRTY_CLASS_NAME = 'is-dirty';
export const ERROR_CLASS_NAME = 'has-error';
export const initialValues = {
  email: 'test@test.com',
  password: 'password',
  text: 'text',
  search: 'search',
  url: 'http://example.com',
  number: 11,
  text_area: 'foobar',
  checkbox: true,
  select: 'option2',
  date: '2020-06-29',
  tel: '+12345678',
  color: '#ffffff',
};
