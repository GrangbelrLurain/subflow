import { FLOW_TYPE } from "@subflow/meta/flowType";
import { FlowType } from "./meta";

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
  [FLOW_TYPE]: "error";
  getError: () => FlowErrorParams<T>;
  get: () => T;
};
