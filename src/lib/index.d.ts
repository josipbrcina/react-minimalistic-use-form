import React, { ReactNode } from 'react';
import { htmlAttributes } from '../enums';

export type Obj = Record<string, unknown>;

export interface IHtmlInputElement extends HTMLInputElement {
    validity: { [key: string]: Value };
}

export interface IUseForm {
    initialValues?: Record<string, unknown>;
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
    badInput(): string;
    [key: string]: IValidityErrorMessageFunc;
}

interface IOnSubmitCallbackFn {
    ({
      event, isFormValid, errors, values,
    }: {
        event: React.FormEvent,
        isFormValid: boolean,
        errors: Obj,
        values: Obj
    }): void;
}
