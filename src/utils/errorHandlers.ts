export const handleModelError = (operation: string, error: unknown) => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : `Unknown error occurred during ${operation}`;
  console.error(`${operation} failed:`, errorMessage);
  throw new Error(errorMessage);
};

export const handleResolverError = (operation: string, error: unknown) => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : `Unknown error occurred during ${operation}`;
  console.error(`${operation} failed:`, errorMessage);
  throw new Error(errorMessage);
};