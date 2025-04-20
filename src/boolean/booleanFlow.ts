import { createFlow, CUSTOM_METHODS } from "@subflow/core/createFlow";
import { numberFlow } from "@subflow/number";
import { stringFlow } from "@subflow/string";
import { Methods, SafeFlow } from "@subflow/types/core";
import { BooleanFlowMethods } from "@subflow/types/flows";
import { Flow } from "@subflow/types/core";
import { errorFlow } from "@subflow/error";
import { FLOW_TYPE } from "@subflow/meta/flowType";

export const booleanMethods: BooleanFlowMethods = {
  [FLOW_TYPE]: "boolean",
  not(this: SafeFlow<boolean>) {
    return booleanFlow(!this.get(), this[CUSTOM_METHODS]);
  },
  and(this: SafeFlow<boolean>, other: boolean) {
    return booleanFlow(this.get() && other, this[CUSTOM_METHODS]);
  },
  or(this: SafeFlow<boolean>, other: boolean) {
    return booleanFlow(this.get() || other, this[CUSTOM_METHODS]);
  },
  nor(this: SafeFlow<boolean>, other: boolean) {
    return booleanFlow(!this.get() || !other, this[CUSTOM_METHODS]);
  },
  xor(this: SafeFlow<boolean>, other: boolean) {
    return booleanFlow(this.get() !== other, this[CUSTOM_METHODS]);
  },
  notEqual(this: SafeFlow<boolean>, other: boolean) {
    return booleanFlow(this.get() !== other, this[CUSTOM_METHODS]);
  },
  equal(this: SafeFlow<boolean>, other: boolean) {
    return booleanFlow(this.get() === other, this[CUSTOM_METHODS]);
  },
  flowString(this: SafeFlow<boolean>) {
    return stringFlow(this.get().toString());
  },
  flowNumber(this: SafeFlow<boolean>) {
    return numberFlow(this.get() ? 1 : 0);
  },
};

export const booleanFlow = <E extends Methods<boolean>>(
  value: boolean,
  methods?: E
) => {
  if (typeof value !== "boolean") {
    return errorFlow<boolean, E & typeof booleanMethods>({
      type: "boolean",
      value,
      message: "Value must be a boolean",
      code: "BOOLEAN_FLOW_ERROR",
    });
  }

  return createFlow("boolean", value, methods) as Flow<boolean> &
    E &
    BooleanFlowMethods;
};

export default booleanFlow;
