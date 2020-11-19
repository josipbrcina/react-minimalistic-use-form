import React, {
  ChangeEvent, MutableRefObject, ReactElement, ReactNode,
} from 'react';
import { htmlAttributes } from '../enums';

export type Obj = { [key: string]: Value };

export interface IHtmlInputElement extends HTMLInputElement {
    validity: Obj;
}

export interface IUseForm {
    initialValues?: Obj;
    errorClassName?: string;
    isFieldDirtyClassName?: string;
    scrollToError?: boolean;
    validateOnInput?: boolean;
    validateOnSubmit?: boolean;
}

export interface ISetNativeValue {
    element: ReactNode;
    attributeToUpdate?: htmlAttributes;
    value?: unknown;
}

interface IValidityErrorMessageFunc {
    (input: IHtmlInputElement): string;
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
    (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | FocusEvent<HTMLInputElement>): void;
}

interface IbindUseFormProp {
    formRef: MutableRefObject,
    onBlur: EventHandler,
    onChange: EventHandler,
    values: Obj,
    [key: string]: Value
}

export interface IForm {
    children: ReactElement[];
    bindUseForm?: IbindUseFormProp;
    className: string;
    onSubmit: (event: React.FormEvent) => void;
    noValidate: boolean;
}

export interface IuseFormResponse {
    resetForm: () => void,
    onChange: EventHandler,
    onBlur: EventHandler,
    onSubmit: (callbackFn: IOnSubmitCallbackFn) => (event: React.FormEvent) => void,
    validateForm: () => boolean,
    isFormValid: boolean,
    formRef: MutableRefObject,
    values: Obj,
    errors: Obj,
    bindUseForm: IbindUseFormProp,
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
    payload?: undefined;
}

export interface ISetIsFormValidAction extends Action {
    payload: { isFormValid: boolean };
}

export interface ISetFieldErrorsAction extends Action {
    payload: { name: string, errors: Obj };
}

export interface ISetOverriddenInitialValuesAction extends Action {
    payload: { overriddenInitialValues: Obj };
}

export interface Action {
    type: string;
    payload?: undefined | Obj
}

export interface IInitialState {
    initialValues?: Obj,
    validateOnSubmit?: boolean
}
