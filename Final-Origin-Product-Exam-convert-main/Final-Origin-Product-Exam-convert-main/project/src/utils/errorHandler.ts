export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'UNKNOWN_ERROR',
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, 'GENERIC_ERROR');
  }

  return new AppError('An unknown error occurred', 'UNKNOWN_ERROR');
};

export const logError = (error: AppError, context?: string) => {
  console.error(`[${context || 'APP'}] ${error.code}: ${error.message}`, error);
  
  // In production, you might want to send to error tracking service
  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    // Send to Sentry or other error tracking service
  }
};