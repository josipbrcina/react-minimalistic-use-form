import React from 'react';
import {
  shape, arrayOf, oneOfType, object, func, node,
} from 'prop-types';

const handlers = {
  onChange: 'onChange',
  onBlur: 'onBlur',
};

const noop = () => {};

export const Form = ({
  children, bindUseForm, ...props
}) => {
  if (bindUseForm === undefined) {
    throw new Error('Form is missing bindUseForm prop.');
  }

  const _getEventHandler = ({ callback = noop, handler = handlers.onChange }) => event => {
    bindUseForm[handler](event);
    callback(event);
  };

  const addEventHandlersRecursively = sourceElements => React.Children.map(sourceElements, child => {
    // If it's invalid react element element doesn't have props so no need to clone it
    if (React.isValidElement(child) === false) {
      return child;
    }

    const {
      children: childChildren, onChange: childOnChange, onBlur: childOnBlur, value: childValue, ...childProps
    } = child.props;

    const isInputField = 'name' in childProps && 'id' in childProps;

    let cloneElementInputProps = {};

    if (isInputField) {
      cloneElementInputProps = {
        onChange: _getEventHandler({ callback: childOnChange }),
        onBlur: _getEventHandler({ callback: childOnBlur, handler: handlers.onBlur }),
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

Form.defaultProps = {
  children: [],
};

Form.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]),
  bindUseForm: shape({
    // eslint-disable-next-line react/forbid-prop-types
    formRef: object,
    onChange: func,
    onInput: func,
    oBlur: func,
  }).isRequired,
};
