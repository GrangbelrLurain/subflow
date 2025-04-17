import { arrayFlow } from "@subflow/array";
import { booleanFlow } from "@subflow/boolean";
import { createFlow } from "@subflow/core";
import { Methods, SafeFlow } from "@subflow/types/core";
import { safer } from "@subflow/utils";
import { ObjectFlowMethods } from "@subflow/types/flows";
import { stringFlow } from "@subflow/string";
import { isError } from "@subflow/error";

export const objectFlow = <T extends object, M extends Methods<T>>(value: T, methods?: M) => {
  const defaultMethods: ObjectFlowMethods = {
    keys(this: SafeFlow<T>) {
      return arrayFlow(Object.keys(this.get()));
    },
    values(this: SafeFlow<T>) {
      return arrayFlow(Object.values(this.get()));
    },
    entries(this: SafeFlow<T>) {
      return arrayFlow(Object.entries(this.get()));
    },
    has(this: SafeFlow<T>, key: string) {
      return booleanFlow(this.get().hasOwnProperty(key));
    },
    set(this: SafeFlow<T>, key: string, value: unknown) {
      return objectFlow({ ...this.get(), [key]: value }, methods);
    },
    delete(this: SafeFlow<T>, key: string) {
      const newObj = { ...this.get() };
      delete newObj[key as keyof T];
      return objectFlow(newObj, methods);
    },
    flowString(this: SafeFlow<T>) {
      return stringFlow(JSON.stringify(this.get()));
    },
    ...(methods || {}),
  };

  const init = safer<T, M & typeof defaultMethods>(
    value,
    (value: T): T => {
      if (!value || typeof value !== "object") {
        throw new Error("Value must be an object");
      }

      return value;
    },
    {
      type: "object",
      value,
      message: "Value must be an object",
      code: "OBJECT_FLOW_ERROR",
    }
  );

  if (isError(init)) {
    return init;
  }

  return createFlow("object", init, methods ? { ...defaultMethods, ...methods } : defaultMethods);
};
