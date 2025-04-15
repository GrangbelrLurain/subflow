import { createFlow } from "@subflow/core/createFlow";
import { numberFlow } from "@subflow/number";
import { stringFlow } from "@subflow/string";
import { Methods, FlowReturn } from "@subflow/types/core";
import { createError } from "@subflow/error";
import { FlowError } from "@subflow/error";
import { safer } from "@subflow/utils";
import { BooleanFlowMethods } from "@subflow/types/flows";

console.log(stringFlow, numberFlow);

export const booleanFlow = <E extends Methods<FlowReturn<boolean>>>(value: boolean, methods?: E) => {
  if (typeof value !== "boolean") {
    throw createError({
      type: "boolean",
      value,
      code: "BOOLEAN_FLOW_ERROR",
      message: "Value must be a boolean",
      stack: new Error().stack,
      cause: new Error("Value must be a boolean"),
      timestamp: Date.now(),
      traceId: "traceId",
    });
  }

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
    xor(this: FlowReturn<boolean>, other: boolean) {
      return booleanFlow(this.get() !== other, methods);
    },
    notEqual(this: FlowReturn<boolean>, other: boolean) {
      return booleanFlow(this.get() !== other, methods);
    },
    equal(this: FlowReturn<boolean>, other: boolean) {
      return booleanFlow(this.get() === other, methods);
    },
    greaterThan(this: FlowReturn<boolean>, other: boolean) {
      return booleanFlow(this.get() > other, methods);
    },
    lessThan(this: FlowReturn<boolean>, other: boolean) {
      return booleanFlow(this.get() < other, methods);
    },
    greaterThanOrEqual(this: FlowReturn<boolean>, other: boolean) {
      return booleanFlow(this.get() >= other, methods);
    },
    lessThanOrEqual(this: FlowReturn<boolean>, other: boolean) {
      return booleanFlow(this.get() <= other, methods);
    },
    flowString(this: FlowReturn<boolean>) {
      return stringFlow(this.get().toString());
    },
    flowNumber(this: FlowReturn<boolean>) {
      return numberFlow(this.get() ? 1 : 0);
    },
  };

  const init = safer(
    value,
    (value: boolean): boolean => {
      if (typeof value !== "boolean") {
        throw new Error("Value must be a boolean");
      }

      return value;
    },
    new FlowError("boolean", value, "Value must be a boolean", "BOOLEAN_FLOW_ERROR", Date.now(), "traceId")
  );

  return createFlow<boolean, typeof defaultMethods>(init, methods ? { ...defaultMethods, ...methods } : defaultMethods);
};

export default booleanFlow;
