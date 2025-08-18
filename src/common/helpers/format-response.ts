export function formatResponse<T>(message: string, data: T | null) {
  return { message, data };
}
