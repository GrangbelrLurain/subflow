import { CUSTOM_METHODS, FLOW_TYPE, VALUE } from "@subflow/meta/flowType";
import { FlowType } from "@subflow/types";

export type Method<T, Args extends any[] = any[], Return = any> = (this: DefaultExtensions<T>, ...args: Args) => Return;

export type Methods<T, EM extends Record<string, Method<T>> | { [FLOW_TYPE]: FlowType } = Record<string, Method<T>>> = EM;

export interface FlowErrorParams<T> {
  readonly type: FlowType;
  readonly value: T;
  readonly message: string;
  readonly code?: string;
  readonly timestamp?: number;
  readonly traceId?: string;
  readonly stack?: string;
  readonly cause?: Error;
}

export type ErrorFlow<T> = {
  [FLOW_TYPE]: Extract<FlowType, "error">;
  [VALUE]: T;
  [CUSTOM_METHODS]?: Methods<T>;
  get: () => T;
  getError: () => FlowErrorParams<T>;
};

export type SafeFlow<T> = {
  [FLOW_TYPE]: Exclude<FlowType, "error">;
  [VALUE]: T;
  [CUSTOM_METHODS]?: Methods<T>;
  get: () => T;
  getError: () => undefined;
};

export type DefaultExtensions<T> = SafeFlow<T> | ErrorFlow<T>;

export type Flow<T> = DefaultExtensions<T>;

export type CreateFlow<T> = (value: T) => Flow<T>;
