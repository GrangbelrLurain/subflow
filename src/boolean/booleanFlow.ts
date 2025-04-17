import { createFlow } from "@subflow/core/createFlow";
import { numberFlow } from "@subflow/number";
import { stringFlow } from "@subflow/string";
import { Methods, FlowReturn } from "@subflow/types/core";
import { safer } from "@subflow/utils";
import { BooleanFlowMethods, BooleanFlowReturn } from "@subflow/types/flows";
import { isError } from "@subflow/error";

export const booleanFlow = <E extends Methods<boolean>>(value: boolean, methods?: E) => {
  const defaultMethods: BooleanFlowMethods = {
    not(this: FlowReturn<boolean>) {
      return booleanFlow(!this.get(), methods);
    },
    and(this: FlowReturn<boolean>, other: boolean) {
      return booleanFlow(this.get() && other, methods);
    },
    or(this: FlowReturn<boolean>, other: boolean) {
      return booleanFlow(this.get() || other, methods);
    },
    nor(this: FlowReturn<boolean>, other: boolean) {
      return booleanFlow(!this.get() || !other, methods);
    },
    xor(this: FlowReturn<boolean>, other: boolean) {
      return booleanFlow(this.get() !== other, methods);
    },
    notEqual(this: FlowReturn<boolean>, other: boolean) {
      return booleanFlow(this.get() !== other, methods);
    },
    equal(this: FlowReturn<boolean>, other: boolean) {
      return booleanFlow(this.get() === other, methods);
    },
    flowString(this: FlowReturn<boolean>) {
      return stringFlow(this.get().toString());
    },
    flowNumber(this: FlowReturn<boolean>) {
      return numberFlow(this.get() ? 1 : 0);
    },
  };

  const init = safer<boolean, E & typeof defaultMethods>(
    value,
    (value: boolean): boolean => {
      if (typeof value !== "boolean") {
        throw new Error("Value must be a boolean");
      }

      return value;
    },
    {
      type: "boolean",
      value,
      message: "Value must be a boolean",
      code: "BOOLEAN_FLOW_ERROR",
    }
  );

  if (isError(init)) {
    return init;
  }

  return createFlow("boolean", init, methods ? { ...defaultMethods, ...methods } : defaultMethods);
};

export default booleanFlow;
