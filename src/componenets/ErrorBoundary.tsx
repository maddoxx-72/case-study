import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { 
      hasError: true, 
      error,
      errorInfo: null 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
    
    // You can log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <Box sx={{ 
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center'
        }}>
          <Typography variant="h4" color="error" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            We're sorry for the inconvenience. An error occurred while rendering this page.
          </Typography>
          <Typography variant="caption" component="div" sx={{ 
            backgroundColor: 'rgba(0,0,0,0.1)', 
            p: 2, 
            mb: 3,
            borderRadius: 1,
            maxWidth: '600px',
            overflow: 'auto'
          }}>
            <Typography variant="subtitle2">Error Details:</Typography>
            <Typography component="pre" sx={{ fontSize: '0.8rem' }}>
              {this.state.error?.toString()}
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>Component Stack:</Typography>
            <Typography component="pre" sx={{ fontSize: '0.8rem' }}>
              {this.state.errorInfo?.componentStack}
            </Typography>
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={this.handleReset}
          >
            Try Again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;