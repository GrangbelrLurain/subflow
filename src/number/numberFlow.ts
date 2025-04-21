import { createFlow } from "@subflow/core/createFlow";
import { stringFlow } from "@subflow/string/stringFlow";
import { Flow, Methods, SafeFlow } from "@subflow/types/core";
import { NumberFlowMethods } from "@subflow/types/flows";
import { errorFlow } from "@subflow/error";
import { booleanFlow } from "@subflow/boolean";
import { CUSTOM_METHODS, FLOW_TYPE, VALUE } from "@subflow/meta/flowType";

export const numberMethods: NumberFlowMethods = {
  [FLOW_TYPE]: "number",
  add(this: SafeFlow<number>, num: number) {
    return numberFlow(this[VALUE] + num, this[CUSTOM_METHODS]);
  },
  subtract(this: SafeFlow<number>, num: number) {
    return numberFlow(this[VALUE] - num, this[CUSTOM_METHODS]);
  },
  multiply(this: SafeFlow<number>, num: number) {
    return numberFlow(this[VALUE] * num, this[CUSTOM_METHODS]);
  },
  divide(this: SafeFlow<number>, num: number) {
    return numberFlow(this[VALUE] / num, this[CUSTOM_METHODS]);
  },
  modulo(this: SafeFlow<number>, num: number) {
    return numberFlow(this[VALUE] % num, this[CUSTOM_METHODS]);
  },
  power(this: SafeFlow<number>, num: number) {
    return numberFlow(this[VALUE] ** num, this[CUSTOM_METHODS]);
  },
  sqrt(this: SafeFlow<number>) {
    return numberFlow(Math.sqrt(this[VALUE]), this[CUSTOM_METHODS]);
  },
  round(this: SafeFlow<number>) {
    return numberFlow(Math.round(this[VALUE]), this[CUSTOM_METHODS]);
  },
  floor(this: SafeFlow<number>) {
    return numberFlow(Math.floor(this[VALUE]), this[CUSTOM_METHODS]);
  },
  ceil(this: SafeFlow<number>) {
    return numberFlow(Math.ceil(this[VALUE]), this[CUSTOM_METHODS]);
  },
  abs(this: SafeFlow<number>) {
    return numberFlow(Math.abs(this[VALUE]), this[CUSTOM_METHODS]);
  },
  random(this: SafeFlow<number>) {
    return numberFlow(Math.random(), this[CUSTOM_METHODS]);
  },
  min(this: SafeFlow<number>, num: number) {
    return numberFlow(Math.min(this[VALUE], num), this[CUSTOM_METHODS]);
  },
  max(this: SafeFlow<number>, num: number) {
    return numberFlow(Math.max(this[VALUE], num), this[CUSTOM_METHODS]);
  },
  clamp(this: SafeFlow<number>, min: number, max: number) {
    return numberFlow(Math.min(Math.max(this[VALUE], min), max), this[CUSTOM_METHODS]);
  },
  sign(this: SafeFlow<number>) {
    return numberFlow(Math.sign(this[VALUE]), this[CUSTOM_METHODS]);
  },
  toFixed(this: SafeFlow<number>, digits?: number) {
    return stringFlow(this[VALUE].toFixed(digits));
  },
  toExponential(this: SafeFlow<number>, digits?: number) {
    return stringFlow(this[VALUE].toExponential(digits));
  },
  toPrecision(this: SafeFlow<number>, precision?: number) {
    return stringFlow(this[VALUE].toPrecision(precision));
  },
  lessThan(this: SafeFlow<number>, num: number) {
    return booleanFlow(this[VALUE] < num);
  },
  greaterThan(this: SafeFlow<number>, num: number) {
    return booleanFlow(this[VALUE] > num);
  },
  lessThanOrEqual(this: SafeFlow<number>, num: number) {
    return booleanFlow(this[VALUE] <= num);
  },
  greaterThanOrEqual(this: SafeFlow<number>, num: number) {
    return booleanFlow(this[VALUE] >= num);
  },
  flowBoolean(this: SafeFlow<number>) {
    return booleanFlow(this[VALUE] !== 0);
  },
  flowLocaleString(this: SafeFlow<number>, locales: string | string[], options?: Intl.NumberFormatOptions) {
    return stringFlow(this[VALUE].toLocaleString(locales, options));
  },
  flowString(this: SafeFlow<number>, radix?: number) {
    return stringFlow(this[VALUE].toString(radix));
  },
};

export const numberFlow = <M extends Methods<number>>(value: number, methods?: M): Flow<number> & M & NumberFlowMethods => {
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
