import { arrayFlow } from "@subflow/array";
import { booleanFlow } from "@subflow/boolean";
import { createFlow } from "@subflow/core";
import { Extensions } from "@subflow/types/core";
import { FlowError } from "@subflow/error";
import { safer } from "@subflow/utils";

export const objectFlow = <T extends Record<string, unknown>, E extends Extensions<E>>(value: T, extensions?: E) => {
  type Flow = { get: () => T };

  const methods = {
    keys(this: Flow) {
      return arrayFlow(Object.keys(this.get()));
    },
    values(this: Flow) {
      return arrayFlow(Object.values(this.get()));
    },
    entries(this: Flow) {
      return arrayFlow(Object.entries(this.get()));
    },
    has(this: Flow, key: string) {
      return booleanFlow(this.get().hasOwnProperty(key));
    },
    get(this: Flow, key: string) {
      return this.get()[key];
    },
    set(this: Flow, key: string, value: unknown) {
      return objectFlow({ ...this.get(), [key]: value }, extensions);
    },
    delete(this: Flow, key: string) {
      const newObj = { ...this.get() };
      delete newObj[key];
      return objectFlow(newObj, extensions);
    },
    ...(extensions || {}),
  } as const;

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

export default objectFlow;
