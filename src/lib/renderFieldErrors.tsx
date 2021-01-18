import React from 'react';
import { Obj } from './global_typings';

export const renderFieldErrors = (errors: Obj = {}): JSX.Element[] => Object.values(errors).map((error: string, index) => (
  // eslint-disable-next-line react/no-array-index-key
  <span key={index} className="text-error">
    {error}
    <br />
  </span>
));
