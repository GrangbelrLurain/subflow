import { FlowError } from "@subflow/error";

export const createError = <T extends FlowError<T>>(error: T): FlowError<T> => error;
