import { createFlow } from "@subflow/core/createFlow";
import { numberFlow } from "@subflow/number";
import { stringFlow } from "@subflow/string";
import { Methods, SafeFlow } from "@subflow/types/core";
import { BooleanFlowMethods } from "@subflow/types/flows";
import { errorFlow } from "@subflow/error";
import { CUSTOM_METHODS, FLOW_TYPE, VALUE } from "@subflow/meta/flowType";
import { Flow, FlowType } from "@subflow/types";

export const booleanMethods: BooleanFlowMethods = {
  [FLOW_TYPE]: "boolean" satisfies FlowType,
  not(this: SafeFlow<boolean>) {
    return booleanFlow(!this[VALUE], this[CUSTOM_METHODS]);
  },
  and(this: SafeFlow<boolean>, other: boolean) {
    return booleanFlow(this[VALUE] && other, this[CUSTOM_METHODS]);
  },
  or(this: SafeFlow<boolean>, other: boolean) {
    return booleanFlow(this[VALUE] || other, this[CUSTOM_METHODS]);
  },
  nor(this: SafeFlow<boolean>, other: boolean) {
    return booleanFlow(!this[VALUE] || !other, this[CUSTOM_METHODS]);
  },
  xor(this: SafeFlow<boolean>, other: boolean) {
    return booleanFlow(this[VALUE] !== other, this[CUSTOM_METHODS]);
  },
  notEqual(this: SafeFlow<boolean>, other: boolean) {
    return booleanFlow(this[VALUE] !== other, this[CUSTOM_METHODS]);
  },
  equal(this: SafeFlow<boolean>, other: boolean) {
    return booleanFlow(this[VALUE] === other, this[CUSTOM_METHODS]);
  },
  flowString(this: SafeFlow<boolean>) {
    return stringFlow(this[VALUE].toString());
  },
  flowNumber(this: SafeFlow<boolean>) {
    return numberFlow(this[VALUE] ? 1 : 0);
  },
};

export const booleanFlow = <E extends Methods<boolean>>(value: boolean, methods?: E): Flow<boolean> & E & BooleanFlowMethods => {
  if (typeof value !== "boolean") {
    return errorFlow<boolean, E & typeof booleanMethods>({
      type: "boolean",
      value,
      message: "Value must be a boolean",
      code: "BOOLEAN_FLOW_ERROR",
    });
  }

  return createFlow("boolean", value, methods);
};

export default booleanFlow;
