import { arrayFlow } from "@subflow/array";
import { booleanFlow } from "@subflow/boolean";
import { createFlow } from "@subflow/core";
import { Methods, SafeFlow } from "@subflow/types/core";
import { ObjectFlowMethods } from "@subflow/types/flows";
import { stringFlow } from "@subflow/string";
import { errorFlow } from "@subflow/error";

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

  const guard = booleanFlow(!!value).and(typeof value === "object");

  if (guard.not().get()) {
    return errorFlow<T, M & typeof defaultMethods>({
      type: "object",
      value,
      message: "Value must be an object",
      code: "OBJECT_FLOW_ERROR",
    });
  }

  return createFlow("object", value, defaultMethods);
};
