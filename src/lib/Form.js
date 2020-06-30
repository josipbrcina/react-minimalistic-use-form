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
      children: childChildren, onChange: childOnChange, onBlur: childOnBlur, ...childProps
    } = child.props;

    const isInputField = 'name' in childProps && 'id' in childProps;

    const cloneElementProps = {
      ...childProps,
      ...(isInputField
        ? {
          onChange: _getEventHandler({ callback: childOnChange }),
          onBlur: _getEventHandler({ callback: childOnBlur, handler: handlers.onBlur }),
        }
        : {}),
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
