import { arrayFlow } from "@subflow/array";
import { booleanFlow } from "@subflow/boolean";
import { createFlow } from "@subflow/core";
import { CUSTOM_METHODS, FLOW_TYPE, VALUE } from "@subflow/meta/flowType";
import { Flow, Methods, SafeFlow } from "@subflow/types/core";
import { ObjectFlowMethods } from "@subflow/types/flows";
import { stringFlow } from "@subflow/string";
import { errorFlow } from "@subflow/error";

export const objectMethods: ObjectFlowMethods = {
  [FLOW_TYPE]: "object",
  keys<T extends object>(this: SafeFlow<T>) {
    return arrayFlow(Object.keys(this[VALUE]) as (keyof T)[]);
  },
  values<T extends object>(this: SafeFlow<T>) {
    return arrayFlow(Object.values(this[VALUE]));
  },
  entries<T extends object, K extends keyof T, E>(this: SafeFlow<T>) {
    return arrayFlow(Object.entries(this[VALUE]) as [K, E][]);
  },
  has<T extends object, K extends keyof T>(this: SafeFlow<T>, key: K) {
    return booleanFlow(this[VALUE].hasOwnProperty(key));
  },
  set<T extends object, K extends PropertyKey, E>(this: SafeFlow<T>, key: K, value: E) {
    return objectFlow({ ...this[VALUE], [key]: value } as T | Record<K, E>, this[CUSTOM_METHODS] as Methods<T | Record<K, E>>);
  },
  delete<T extends object, K extends keyof T>(this: SafeFlow<T>, key: K) {
    const newObj = { ...this[VALUE] };
    delete newObj[key];
    return objectFlow(newObj, this[CUSTOM_METHODS]);
  },
  flowString<T extends object>(this: SafeFlow<T>) {
    return stringFlow(JSON.stringify(this[VALUE]));
  },
};

export const objectFlow = <T extends object, M extends Methods<T>>(value: T, methods?: M): Flow<T> & M & ObjectFlowMethods => {
  const guard = booleanFlow(!!value).and(typeof value === "object");

  if (guard.not().get()) {
    return errorFlow<T, M & typeof objectMethods>({
      type: "object",
      value,
      message: "Value must be an object",
      code: "OBJECT_FLOW_ERROR",
    });
  }

  return createFlow("object", value, methods);
};
