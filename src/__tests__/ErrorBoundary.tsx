import React, { Component, ReactNode } from 'react';
import Mock = jest.Mock;

interface IErrorBoundaryProps {
  spy: Mock,
  children: ReactNode
}

interface IState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<IErrorBoundaryProps, IState> {
  static getDerivedStateFromError(): IState {
    return {
      hasError: true,
    };
  }

  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error): void {
    const { spy } = this.props;
    spy(error.message);
  }

  render(): JSX.Element {
    const { children } = this.props;
    const { hasError } = this.state;
    return (
      <React.Fragment>
        {hasError ? 'Error' : children}
      </React.Fragment>
    );
  }
}
