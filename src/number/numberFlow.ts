import { createFlow } from "@subflow/core/createFlow";
import { stringFlow } from "@subflow/string/stringFlow";
import { Methods, SafeFlow } from "@subflow/types/core";
import { NumberFlowMethods } from "@subflow/types/flows";
import { errorFlow } from "@subflow/error";
import { booleanFlow } from "@subflow/boolean";
import { FLOW_TYPE } from "@subflow/meta/flowType";

export const numberMethods: NumberFlowMethods = {
  [FLOW_TYPE]: "number",
  add(this: SafeFlow<number>, num: number) {
    return numberFlow(this.get() + num);
  },
  subtract(this: SafeFlow<number>, num: number) {
    return numberFlow(this.get() - num);
  },
  multiply(this: SafeFlow<number>, num: number) {
    return numberFlow(this.get() * num);
  },
  divide(this: SafeFlow<number>, num: number) {
    return numberFlow(this.get() / num);
  },
  modulo(this: SafeFlow<number>, num: number) {
    return numberFlow(this.get() % num);
  },
  power(this: SafeFlow<number>, num: number) {
    return numberFlow(this.get() ** num);
  },
  sqrt(this: SafeFlow<number>) {
    return numberFlow(Math.sqrt(this.get()));
  },
  round(this: SafeFlow<number>) {
    return numberFlow(Math.round(this.get()));
  },
  floor(this: SafeFlow<number>) {
    return numberFlow(Math.floor(this.get()));
  },
  ceil(this: SafeFlow<number>) {
    return numberFlow(Math.ceil(this.get()));
  },
  abs(this: SafeFlow<number>) {
    return numberFlow(Math.abs(this.get()));
  },
  random(this: SafeFlow<number>) {
    return numberFlow(Math.random());
  },
  min(this: SafeFlow<number>, num: number) {
    return numberFlow(Math.min(this.get(), num));
  },
  max(this: SafeFlow<number>, num: number) {
    return numberFlow(Math.max(this.get(), num));
  },
  clamp(this: SafeFlow<number>, min: number, max: number) {
    return numberFlow(Math.min(Math.max(this.get(), min), max));
  },
  sign(this: SafeFlow<number>) {
    return numberFlow(Math.sign(this.get()));
  },
  toFixed(this: SafeFlow<number>, digits?: number) {
    return stringFlow(this.get().toFixed(digits));
  },
  toExponential(this: SafeFlow<number>, digits?: number) {
    return stringFlow(this.get().toExponential(digits));
  },
  toPrecision(this: SafeFlow<number>, precision?: number) {
    return stringFlow(this.get().toPrecision(precision));
  },
  lessThan(this: SafeFlow<number>, num: number) {
    return booleanFlow(this.get() < num);
  },
  greaterThan(this: SafeFlow<number>, num: number) {
    return booleanFlow(this.get() > num);
  },
  lessThanOrEqual(this: SafeFlow<number>, num: number) {
    return booleanFlow(this.get() <= num);
  },
  greaterThanOrEqual(this: SafeFlow<number>, num: number) {
    return booleanFlow(this.get() >= num);
  },
  flowBoolean(this: SafeFlow<number>) {
    return booleanFlow(this.get() !== 0);
  },
  flowLocaleString(
    this: SafeFlow<number>,
    locales: string | string[],
    options?: Intl.NumberFormatOptions
  ) {
    return stringFlow(this.get().toLocaleString(locales, options));
  },
  flowString(this: SafeFlow<number>, radix?: number) {
    return stringFlow(this.get().toString(radix));
  },
};

export const numberFlow = <M extends Methods<number>>(
  value: number,
  methods?: M
) => {
  if (typeof value !== "number") {
    return errorFlow<number, M & typeof numberMethods>({
      type: "number",
      value,
      message: "Value must be a number",
      code: "NUMBER_FLOW_ERROR",
    });
  }

  return createFlow("number", value, methods);
};
