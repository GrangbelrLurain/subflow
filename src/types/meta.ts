export type FlowType =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "object"
  | "array"
  | "error";

export type SafeFlowType = Exclude<FlowType, "error">;
