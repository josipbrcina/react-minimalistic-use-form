import React from 'react';

export const renderFieldErrors = (errors = {}) => Object.values(errors).map((error, index) => (
  // eslint-disable-next-line react/no-array-index-key
  <span key={index} className="text-error">
    {error}
    <br />
  </span>
));
