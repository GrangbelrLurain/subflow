import { FlowType } from "@subflow/types/core";

export class FlowError<T extends any> {
  constructor(public type: FlowType, public value: T, public message: string, public code: string, public timestamp: number, public traceId: string, public stack?: string, public cause?: Error) {}
}
