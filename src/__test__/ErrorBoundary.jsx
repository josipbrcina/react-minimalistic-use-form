import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ErrorBoundary extends Component {
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    const { spy } = this.props;
    spy(error.message);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    return (
      <React.Fragment>
        {hasError ? 'Error' : children}
      </React.Fragment>
    );
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  spy: PropTypes.func.isRequired,
};
