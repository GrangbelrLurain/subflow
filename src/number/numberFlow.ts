import { createFlow } from "@subflow/core/createFlow";
import { stringFlow } from "@subflow/string/stringFlow";
import { Methods, FlowReturn } from "@subflow/types/core";
import { FlowError } from "@subflow/error";
import { safer } from "@subflow/utils";
import { NumberFlowMethods } from "@subflow/types/flows";

export const numberFlow = <M extends Methods<number>>(
  value: number,
  methods?: M
) => {
  const defaultMethods: NumberFlowMethods = {
    add(this: FlowReturn<number>, num: number) {
      return numberFlow(this.get() + num);
    },
    subtract(this: FlowReturn<number>, num: number) {
      return numberFlow(this.get() - num);
    },
    multiply(this: FlowReturn<number>, num: number) {
      return numberFlow(this.get() * num);
    },
    divide(this: FlowReturn<number>, num: number) {
      return numberFlow(this.get() / num);
    },
    modulo(this: FlowReturn<number>, num: number) {
      return numberFlow(this.get() % num);
    },
    power(this: FlowReturn<number>, num: number) {
      return numberFlow(this.get() ** num);
    },
    sqrt(this: FlowReturn<number>) {
      return numberFlow(Math.sqrt(this.get()));
    },
    round(this: FlowReturn<number>) {
      return numberFlow(Math.round(this.get()));
    },
    floor(this: FlowReturn<number>) {
      return numberFlow(Math.floor(this.get()));
    },
    ceil(this: FlowReturn<number>) {
      return numberFlow(Math.ceil(this.get()));
    },
    abs(this: FlowReturn<number>) {
      return numberFlow(Math.abs(this.get()));
    },
    random(this: FlowReturn<number>) {
      return numberFlow(Math.random());
    },
    min(this: FlowReturn<number>, num: number) {
      return numberFlow(Math.min(this.get(), num));
    },
    max(this: FlowReturn<number>, num: number) {
      return numberFlow(Math.max(this.get(), num));
    },
    clamp(this: FlowReturn<number>, min: number, max: number) {
      return numberFlow(Math.min(Math.max(this.get(), min), max));
    },
    sign(this: FlowReturn<number>) {
      return numberFlow(Math.sign(this.get()));
    },
    toFixed(this: FlowReturn<number>, digits?: number) {
      return stringFlow(this.get().toFixed(digits));
    },
    toExponential(this: FlowReturn<number>, digits?: number) {
      return stringFlow(this.get().toExponential(digits));
    },
    toPrecision(this: FlowReturn<number>, precision?: number) {
      return stringFlow(this.get().toPrecision(precision));
    },
    flowLocaleString(
      this: FlowReturn<number>,
      locales: string | string[],
      options?: Intl.NumberFormatOptions
    ) {
      return stringFlow(this.get().toLocaleString(locales, options));
    },
    flowString(this: FlowReturn<number>, radix?: number) {
      return stringFlow(this.get().toString(radix));
    },
  };

  const init = safer(
    value,
    (value: number): number => {
      if (typeof value !== "number") {
        throw new Error("Value must be a number");
      }

      return value;
    },
    new FlowError(
      "number",
      value,
      "Value must be a number",
      "NUMBER_FLOW_ERROR",
      Date.now(),
      "traceId"
    )
  );

  return createFlow(
    init,
    methods ? { ...defaultMethods, ...methods } : defaultMethods
  );
};
