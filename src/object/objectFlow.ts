import { arrayFlow } from "@subflow/array";
import { booleanFlow } from "@subflow/boolean";
import { createFlow } from "@subflow/core";
import { Methods, FlowReturn } from "@subflow/types/core";
import { FlowError } from "@subflow/error";
import { safer } from "@subflow/utils";
import { ObjectFlowMethods } from "@subflow/types/flows";

export const objectFlow = <T extends Record<string, unknown>, E extends Methods<T>>(value: T, extensions?: E) => {
  const methods: ObjectFlowMethods = {
    keys(this: FlowReturn<T>) {
      return arrayFlow(Object.keys(this.get()));
    },
    values(this: FlowReturn<T>) {
      return arrayFlow(Object.values(this.get()));
    },
    entries(this: FlowReturn<T>) {
      return arrayFlow(Object.entries(this.get()));
    },
    has(this: FlowReturn<T>, key: string) {
      return booleanFlow(this.get().hasOwnProperty(key));
    },
    set(this: FlowReturn<T>, key: string, value: unknown) {
      return objectFlow({ ...this.get(), [key]: value }, extensions);
    },
    delete(this: FlowReturn<T>, key: string) {
      const newObj = { ...this.get() };
      delete newObj[key];
      return objectFlow(newObj, extensions);
    },
    ...(extensions || {}),
  };

  const init = safer(
    value,
    (value: T): T => {
      if (typeof value !== "object" || value === null) {
        throw new Error("Value must be an object");
      }

      return value;
    },
    new FlowError("object", value, "Value must be an object", "OBJECT_FLOW_ERROR", Date.now(), "traceId")
  );

  return createFlow<T, typeof methods>(init, methods);
};
