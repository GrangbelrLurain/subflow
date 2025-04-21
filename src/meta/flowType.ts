import { FlowType } from "@subflow/types/meta";

export const FLOW_TYPE = Symbol("FLOW_TYPE");

export type FLOW_TYPE = typeof FLOW_TYPE;

export const VALUE = Symbol("value");

export type VALUE = typeof VALUE;

export const CUSTOM_METHODS = Symbol("customMethods");

export type CUSTOM_METHODS = typeof CUSTOM_METHODS;

export const isFlowOfType = <T extends FlowType>(flow: unknown, type: T): flow is { [FLOW_TYPE]: T } => {
  return typeof flow === "object" && flow !== null && FLOW_TYPE in flow && (flow as any)[FLOW_TYPE] === type;
};

export const isStringFlow = (flow: unknown): flow is { [FLOW_TYPE]: "string" } => isFlowOfType(flow, "string");

export const isNumberFlow = (flow: unknown): flow is { [FLOW_TYPE]: "number" } => isFlowOfType(flow, "number");

export const isBooleanFlow = (flow: unknown): flow is { [FLOW_TYPE]: "boolean" } => isFlowOfType(flow, "boolean");

export const isArrayFlow = (flow: unknown): flow is { [FLOW_TYPE]: "array" } => isFlowOfType(flow, "array");

export const isObjectFlow = (flow: unknown): flow is { [FLOW_TYPE]: "object" } => isFlowOfType(flow, "object");

export const isErrorFlow = (flow: unknown): flow is { [FLOW_TYPE]: "error" } => isFlowOfType(flow, "error");
