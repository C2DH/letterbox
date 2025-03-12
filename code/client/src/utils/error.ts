import { isNumber, isObject } from 'lodash';
import { isRouteErrorResponse } from 'react-router';

export class ApiError extends Error {
  code: number;
  name: string;
  constructor(e: { code: number; name: string; message?: string }) {
    super(e.message);
    this.code = e.code;
    this.name = e.name;
  }
}

export function getErrorData(error: unknown): { code: number; message?: string } {
  if (isRouteErrorResponse(error)) {
    return { code: error.status, message: error.data?.message };
  }
  const data: { code: number; message?: string } = { code: 500 };
  if (isObject(error) && 'code' in error && isNumber(error.code)) {
    data.code = error.code;
  }
  if (isObject(error) && 'message' in error) {
    data.message = `${error.message}`;
  }
  return data;
}
