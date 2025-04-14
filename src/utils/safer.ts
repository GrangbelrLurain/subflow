import { FlowError } from "@subflow/error";

export const safer = <T>(value: T, validate: (value: T) => T, error: FlowError<T>) => {
  try {
    return validate(value);
  } catch (e) {
    if (e instanceof Error) {
      error.message = e.message;
      error.stack = e.stack;
    }
    return error;
  }
};
