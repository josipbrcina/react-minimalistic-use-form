import React, {
  ChangeEvent, RefObject, ReactElement, ReactNode, FocusEvent,
} from 'react';
import { htmlAttributes } from './enums';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Obj = Record<string, any>;

export interface IPluginsObject {
    scrollToError?: (element: HTMLElement) => Promise<unknown> | void;
    validator?: ({
      name, value, values, target,
    } : { name: string, value: string | number | boolean, values: Obj, target: HTMLElement}) => Promise<Obj> | Obj
}

export interface IScrollToErrorOptions {
    behaviour?: 'auto' | 'smooth';
    block?: 'start' | 'center' | 'end' | 'nearest';
    inline?: 'start' | 'center' | 'end' | 'nearest';
}

export interface IUseForm {
    initialValues?: Obj;
    errorClassName?: string;
    touchedClassName?: string;
    scrollToError?: boolean;
    scrollToErrorOptions?: IScrollToErrorOptions;
    validateOnInput?: boolean;
    validateOnSubmit?: boolean;
    plugins?: IPluginsObject
    debounceValidation?: boolean;
    debounceTime?: number;
    validateOnMount?: boolean;
}

export interface ISetNativeValue {
    element: ReactNode;
    attributeToUpdate?: htmlAttributes;
    value?: unknown;
}

interface IValidityErrorMessageFunc {
    (input: HTMLInputElement): string;
}

export interface IValidityDefaultErrorMessages {
    badInput: () => string;
    [key: string]: IValidityErrorMessageFunc;
}

export interface IOnSubmitCallbackFn {
    ({
      event, isFormValid, errors, values,
    }: {
        event: React.FormEvent,
        isFormValid: boolean,
        errors: Obj,
        values: Obj
    }): void;
}

export type EventHandler = {
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void;
}

interface IBindUseFormProp {
    formRef: RefObject<HTMLFormElement> | undefined,
    onBlur: EventHandler,
    onChange: EventHandler,
    values: Obj,
    [key: string]: unknown
}

export interface IForm {
    children: ReactElement[];
    bindUseForm?: IBindUseFormProp;
    className: string;
    onSubmit: (event: React.FormEvent) => void;
    noValidate: boolean;
}

export interface IuseFormResponse {
    resetForm: () => void,
    onChange: EventHandler,
    onBlur: EventHandler,
    onSubmit: (callbackFn: IOnSubmitCallbackFn) => (event: React.FormEvent) => void,
    validateForm: ({ shouldTouchField, shouldScrollToError }: { shouldTouchField?: boolean, shouldScrollToError?: boolean}) => void,
    isFormValid: boolean,
    isSubmitting: boolean,
    formRef: RefObject<HTMLFormElement> | undefined,
    values: Obj,
    errors: Obj,
    bindUseForm: IBindUseFormProp,
    setIsSubmitting: (isSubmitting: boolean) => void
    touched: Obj,
    isTouched: (name: string) => boolean
}

export interface IonSubmitResponse {
    event: React.FormEvent,
    isFormValid: boolean,
    errors: Obj,
    values: Obj,
}

export interface IState {
    values: Obj;
    initialValues: Obj;
    overriddenInitialValues: Obj;
    errors: Obj;
    initialIsFormValid: boolean;
    isFormValid: boolean;
    isSubmitting: boolean;
}

interface IInputField {
    name: string;
    type: string;
    checked: boolean;
    value: string | boolean | number;
}

export interface ISetFieldValueAction extends Action {
    payload: IInputField;
}

export interface IResetFormAction extends Action {
    payload: undefined;
}

export interface ISetIsFormValidAction extends Action {
    payload: { isFormValid: boolean };
}

export interface ISetFieldErrorsAction extends Action {
    payload: { name: string, errors: Obj };
}

export interface ISetErrorsAction extends Action {
    payload: { errors: Obj }
}

export interface ISetOverriddenInitialValuesAction extends Action {
    payload: { overriddenInitialValues: Obj };
}

export interface ISetIsSubmittingAction extends Action {
    payload: { isSubmitting: boolean };
}

export interface Action {
    type: string;
    payload?: undefined | Obj
}

// eslint-disable-next-line import/no-cycle
export { useForm } from './useForm';
// eslint-disable-next-line import/no-cycle
export { Form } from './Form';
