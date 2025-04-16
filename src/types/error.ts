import { FlowType } from "./core";
import { IS_FLOW_ERROR } from "@subflow/error";

export interface FlowErrorParams<T> {
  readonly type: FlowType;
  readonly value: T;
  readonly message: string;
  readonly code: string;
  readonly timestamp?: number;
  readonly traceId?: string;
  readonly stack?: string;
  readonly cause?: Error;
}

export type ErrorFlow<T> = {
  isError: typeof IS_FLOW_ERROR;
  getError: () => FlowErrorParams<T>;
  get: () => T;
};
