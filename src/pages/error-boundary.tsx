import { Component, type ReactNode } from 'react';
import { useToast } from '@contexts/toast-context.tsx';

function withToast<T extends object>(Component: React.ComponentType<T & { toast?: ReturnType<typeof useToast> }>) {
  const Wrapped = (props: T) => {
    const toast = useToast();
    return <Component {...props} toast={toast} />;
  };

  Wrapped.displayName = `withToast(${Component.displayName || Component.name || 'Component'})`;

  return Wrapped;
}

type ErrorBoundaryProps = {
  children: ReactNode;
  toast?: ReturnType<typeof useToast>;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundaryInner extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    const { toast } = this.props;
    if (toast) {
      toast.showToast(error.message, 'error');
    }
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export const ErrorBoundary = withToast(ErrorBoundaryInner);
