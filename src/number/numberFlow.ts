import { createFlow } from "@subflow/core/createFlow";
import { stringFlow } from "@subflow/string/stringFlow";
import { Extensions } from "@subflow/types/core";
import { FlowError } from "@subflow/error";
import { safer } from "@subflow/utils";

export const numberFlow = <T extends number, E extends Extensions<E>>(value: T, extensions?: E) => {
  type Flow = { get: () => T };

  const methods = {
    add(this: Flow, num: number) {
      return numberFlow(this.get() + num);
    },
    subtract(this: Flow, num: number) {
      return numberFlow(this.get() - num);
    },
    multiply(this: Flow, num: number) {
      return numberFlow(this.get() * num);
    },
    divide(this: Flow, num: number) {
      return numberFlow(this.get() / num);
    },
    modulo(this: Flow, num: number) {
      return numberFlow(this.get() % num);
    },
    power(this: Flow, num: number) {
      return numberFlow(this.get() ** num);
    },
    sqrt(this: Flow) {
      return numberFlow(Math.sqrt(this.get()));
    },
    round(this: Flow) {
      return numberFlow(Math.round(this.get()));
    },
    floor(this: Flow) {
      return numberFlow(Math.floor(this.get()));
    },
    ceil(this: Flow) {
      return numberFlow(Math.ceil(this.get()));
    },
    abs(this: Flow) {
      return numberFlow(Math.abs(this.get()));
    },
    random(this: Flow) {
      return numberFlow(Math.random());
    },
    min(this: Flow, num: number) {
      return numberFlow(Math.min(this.get(), num));
    },
    max(this: Flow, num: number) {
      return numberFlow(Math.max(this.get(), num));
    },
    clamp(this: Flow, min: number, max: number) {
      return numberFlow(Math.min(Math.max(this.get(), min), max));
    },
    sign(this: Flow) {
      return numberFlow(Math.sign(this.get()));
    },
    toFixed(this: Flow, digits: number) {
      return numberFlow(Number(this.get().toFixed(digits)));
    },
    toExponential(this: Flow, digits: number) {
      return numberFlow(Number(this.get().toExponential(digits)));
    },
    toPrecision(this: Flow, precision: number) {
      return numberFlow(Number(this.get().toPrecision(precision)));
    },
    toLocaleString(this: Flow, locales: string | string[], options?: Intl.NumberFormatOptions) {
      return stringFlow(this.get().toLocaleString(locales, options));
    },
    toString(this: Flow, radix?: number) {
      return stringFlow(this.get().toString(radix));
    },
    ...(extensions || {}),
  } as const;

  const init = safer(
    value,
    (value: T): T => {
      if (typeof value !== "number") {
        throw new Error("Value must be a number");
      }

      return value;
    },
    new FlowError("number", value, "Value must be a number", "NUMBER_FLOW_ERROR", Date.now(), "traceId")
  );

  return createFlow<T, typeof methods>(init, methods);
};
