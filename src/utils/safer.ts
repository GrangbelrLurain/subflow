import { errorFlow } from "@subflow/error";
import { Methods } from "@subflow/types";
import { ErrorFlow, FlowErrorParams } from "@subflow/types/error";

export const safer = <T, M extends Methods<T> = {}>(value: T, validate: (value: T) => T, error: FlowErrorParams<T>): T | (ErrorFlow<T> & M) => {
  try {
    return validate(value);
  } catch (e) {
    if (e instanceof Error) {
      return errorFlow<T, M>({
        ...error,
        value,
        message: e.message,
        stack: e.stack,
        cause: e,
      });
    }
    return errorFlow<T, M>({
      ...error,
      value,
    });
  }
};
