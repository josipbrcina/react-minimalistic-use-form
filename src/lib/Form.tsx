import React, { ReactElement } from 'react';
import { eventHandlers } from '../enums';
import { Obj, IEventHandlerCallbackFn, IForm } from './index';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const Form = ({
  children = [], bindUseForm, ...props
} : IForm) => {
  if (bindUseForm === undefined) {
    throw new Error('Form is missing bindUseForm prop.');
  }

  const _getEventHandler = ({ callback = noop, handler = eventHandlers.onChange }: {callback: IEventHandlerCallbackFn, handler?: string}) => (event: Event) => {
    bindUseForm[handler](event);
    callback(event);
  };

  const addEventHandlersRecursively = (sourceElements: ReactElement[]): ReactElement[] => React.Children.map(sourceElements, (child: ReactElement) => {
    // If it's invalid react element element doesn't have props so no need to clone it
    if (React.isValidElement(child) === false) {
      return child;
    }

    const {
      children: childChildren, onChange: childOnChange, onBlur: childOnBlur, value: childValue, ...childProps
    } = child.props;

    const isInputField = 'name' in childProps && 'id' in childProps;

    let cloneElementInputProps: Obj = {};

    if (isInputField) {
      cloneElementInputProps = {
        onChange: _getEventHandler({ callback: childOnChange }),
        onBlur: _getEventHandler({ callback: childOnBlur, handler: eventHandlers.onBlur }),
        value: childValue,
      };

      if (cloneElementInputProps.value === undefined) {
        cloneElementInputProps.value = bindUseForm.values[childProps.name] === undefined ? '' : bindUseForm.values[childProps.name];
      }
    }

    const cloneElementProps = {
      ...childProps,
      ...cloneElementInputProps,
    };

    return React.cloneElement(child, cloneElementProps, childChildren === undefined ? undefined : addEventHandlersRecursively(childChildren));
  });

  const formElements = addEventHandlersRecursively(children);

  return <form {...props} ref={bindUseForm.formRef}>{formElements}</form>;
};
