import React, {ReactElement, ReactNode} from 'react';
import {htmlAttributes, STATE_ACTIONS} from '../enums';

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

export interface IEventHandlerCallbackFn {
    (event: Event): void
}

export interface IForm {
    children: ReactElement[];
    bindUseForm: {
        formRef: React.Ref<HTMLFormElement>,
        onBlur: IEventHandlerCallbackFn,
        onChange: IEventHandlerCallbackFn,
        values: Obj,
        [key: string]: Value
    };
}

export interface IState {
    values: Obj;
    initialValues: Obj;
    overriddenInitialValues: Obj;
    errors: Obj;
    initialIsFormValid: boolean;
    isFormValid: boolean;
}

interface IHtmlField {
    name: string;
    type: string;
    checked: boolean;
    value: string | boolean | number;
}

interface ISetFieldValueAction {
    type: typeof STATE_ACTIONS.SET_FIELD_VALUE;
    payload: IHtmlField;
}

interface IResetFormAction {
    type: typeof STATE_ACTIONS.RESET_FORM;
    payload?: undefined;
}

interface ISetIsFormValidAction {
    type: typeof STATE_ACTIONS.SET_IS_FORM_VALID;
    payload: { isFormValid: boolean };
}

interface ISetFieldErrorsAction {
    type: typeof STATE_ACTIONS.SET_FIELD_ERRORS;
    payload: { name: string, errors: Obj };
}

interface ISetOverriddenInitialValuesAction {
    type: typeof STATE_ACTIONS.SET_OVERRIDDEN_INITIAL_VALUES;
    payload: { overriddenInitialValues: Obj };
}

export type Action = IResetFormAction | ISetFieldValueAction | ISetIsFormValidAction | ISetFieldErrorsAction | ISetOverriddenInitialValuesAction;

export interface IInitialState {
    initialValues?: Obj,
    validateOnSubmit?: boolean
}
