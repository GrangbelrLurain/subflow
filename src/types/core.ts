import { FlowError } from "@subflow/error";

export type Extensions<E extends Record<string, unknown>> = {
  [K in keyof E]: (...args: [E[K]]) => FlowReturn<E[K], E>;
};

export type SafeFlow<T, E extends Record<string, unknown>> = {
  get: () => T;
  getError: () => undefined;
  isError: () => false;
} & E;

export type ErrorFlow<T, E extends Record<string, unknown>> = {
  get: () => T;
  getError: () => FlowError<T>;
  isError: () => true;
} & E;

export type FlowReturn<T, E extends Record<string, unknown>> = SafeFlow<T, E> | ErrorFlow<T, E>;

export type Flow<T, E extends Extensions<E>> = (value: T, extensions?: E) => FlowReturn<T, E>;

export type FlowType = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array";

export type FlowMethod<T, E extends Extensions<E>> = (flow: (...args: any[]) => (value: T) => FlowReturn<T, E>) => FlowReturn<T, E>;
