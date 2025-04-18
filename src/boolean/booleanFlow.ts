import { createFlow } from "@subflow/core/createFlow";
import { numberFlow } from "@subflow/number";
import { stringFlow } from "@subflow/string";
import { Methods, Flow } from "@subflow/types/core";
import { BooleanFlowMethods } from "@subflow/types/flows";
import { errorFlow } from "@subflow/error";

export const booleanFlow = <E extends Methods<boolean>>(value: boolean, methods?: E) => {
  const defaultMethods: BooleanFlowMethods = {
    not(this: Flow<boolean>) {
      return booleanFlow(!this.get(), methods);
    },
    and(this: Flow<boolean>, other: boolean) {
      return booleanFlow(this.get() && other, methods);
    },
    or(this: Flow<boolean>, other: boolean) {
      return booleanFlow(this.get() || other, methods);
    },
    nor(this: Flow<boolean>, other: boolean) {
      return booleanFlow(!this.get() || !other, methods);
    },
    xor(this: Flow<boolean>, other: boolean) {
      return booleanFlow(this.get() !== other, methods);
    },
    notEqual(this: Flow<boolean>, other: boolean) {
      return booleanFlow(this.get() !== other, methods);
    },
    equal(this: Flow<boolean>, other: boolean) {
      return booleanFlow(this.get() === other, methods);
    },
    flowString(this: Flow<boolean>) {
      return stringFlow(this.get().toString());
    },
    flowNumber(this: Flow<boolean>) {
      return numberFlow(this.get() ? 1 : 0);
    },
    ...(methods || {}),
  };

  const guard = booleanFlow(typeof value === "boolean");

  if (guard.not().get()) {
    return errorFlow<boolean, E & typeof defaultMethods>({
      type: "boolean",
      value,
      message: "Value must be a boolean",
      code: "BOOLEAN_FLOW_ERROR",
    });
  }

  return createFlow("boolean", value, defaultMethods);
};

export default booleanFlow;
