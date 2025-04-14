import { createFlow } from "@subflow/core/createFlow";
import { numberFlow } from "@subflow/number";
import { stringFlow } from "@subflow/string";
import { Extensions } from "@subflow/types/core";
import { createError } from "@subflow/error";
import { FlowError } from "@subflow/error";
import { safer } from "@subflow/utils";

export const booleanFlow = <T extends boolean, E extends Extensions<E>>(value: T, extensions?: E) => {
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

  type Flow = { get: () => T };

  const methods = {
    not(this: Flow) {
      return booleanFlow(!this.get());
    },
    and(this: Flow, other: boolean) {
      return booleanFlow(this.get() && other);
    },
    or(this: Flow, other: boolean) {
      return booleanFlow(this.get() || other);
    },
    xor(this: Flow, other: boolean) {
      return booleanFlow(this.get() !== other);
    },
    notEqual(this: Flow, other: boolean) {
      return booleanFlow(this.get() !== other);
    },
    equal(this: Flow, other: boolean) {
      return booleanFlow(this.get() === other);
    },
    greaterThan(this: Flow, other: boolean) {
      return booleanFlow(this.get() > other);
    },
    lessThan(this: Flow, other: boolean) {
      return booleanFlow(this.get() < other);
    },
    greaterThanOrEqual(this: Flow, other: boolean) {
      return booleanFlow(this.get() >= other);
    },
    lessThanOrEqual(this: Flow, other: boolean) {
      return booleanFlow(this.get() <= other);
    },
    toString(this: Flow) {
      return stringFlow(this.get().toString());
    },
    toNumber(this: Flow) {
      return numberFlow(this.get() ? 1 : 0);
    },
    ...(extensions || {}),
  } as const;

  const init = safer(
    value,
    (value: T): T => {
      if (typeof value !== "boolean") {
        throw new Error("Value must be a boolean");
      }

      return value;
    },
    new FlowError("boolean", value, "Value must be a boolean", "BOOLEAN_FLOW_ERROR", Date.now(), "traceId")
  );

  return createFlow<T, typeof methods>(init, methods);
};

export default booleanFlow;
