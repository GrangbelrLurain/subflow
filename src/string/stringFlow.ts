import { createFlow, CUSTOM_METHODS } from "@subflow/core/createFlow";
import { Flow, Methods, SafeFlow } from "@subflow/types/core";
import { booleanFlow } from "@subflow/boolean";
import { numberFlow } from "@subflow/number";
import { arrayFlow } from "@subflow/array";
import { objectFlow } from "@subflow/object";
import { StringFlowMethods } from "@subflow/types/flows";
import { errorFlow } from "@subflow/error";
import { FLOW_TYPE } from "@subflow/meta/flowType";

export const stringMethods: StringFlowMethods = {
  [FLOW_TYPE]: "string",
  toUpper(this: SafeFlow<string>) {
    return stringFlow(this.get().toUpperCase(), this[CUSTOM_METHODS]);
  },
  toLower(this: SafeFlow<string>) {
    return stringFlow(this.get().toLowerCase(), this[CUSTOM_METHODS]);
  },
  length(this: SafeFlow<string>) {
    return numberFlow(this.get().length);
  },
  reverse(this: SafeFlow<string>) {
    return stringFlow(
      this.get().split("").reverse().join(""),
      this[CUSTOM_METHODS]
    );
  },
  replace<S extends string | RegExp, R extends string>(
    this: SafeFlow<string>,
    searchValue: S,
    replaceValue: R
  ) {
    return stringFlow(
      this.get().replace(searchValue, replaceValue),
      this[CUSTOM_METHODS]
    );
  },
  trim(this: SafeFlow<string>) {
    return stringFlow(this.get().trim(), this[CUSTOM_METHODS]);
  },
  padStart(this: SafeFlow<string>, length: number, fillString?: string) {
    return stringFlow(
      this.get().padStart(length, fillString),
      this[CUSTOM_METHODS]
    );
  },
  padEnd(this: SafeFlow<string>, length: number, fillString?: string) {
    return stringFlow(
      this.get().padEnd(length, fillString),
      this[CUSTOM_METHODS]
    );
  },
  startsWith(this: SafeFlow<string>, searchString: string) {
    return booleanFlow(this.get().startsWith(searchString));
  },
  endsWith(this: SafeFlow<string>, searchString: string) {
    return booleanFlow(this.get().endsWith(searchString));
  },
  includes(this: SafeFlow<string>, searchString: string) {
    return booleanFlow(this.get().includes(searchString));
  },
  indexOf(this: SafeFlow<string>, searchString: string) {
    return numberFlow(this.get().indexOf(searchString));
  },
  lastIndexOf(this: SafeFlow<string>, searchString: string) {
    return numberFlow(this.get().lastIndexOf(searchString));
  },
  charAt(this: SafeFlow<string>, index: number) {
    return stringFlow(this.get().charAt(index), this[CUSTOM_METHODS]);
  },
  charCodeAt(this: SafeFlow<string>, index: number) {
    return numberFlow(this.get().charCodeAt(index));
  },
  concat(this: SafeFlow<string>, ...strings: string[]) {
    return stringFlow(this.get().concat(...strings), this[CUSTOM_METHODS]);
  },
  split<S extends string | RegExp>(this: SafeFlow<string>, separator: S) {
    return arrayFlow(this.get().split(separator));
  },
  slice(this: SafeFlow<string>, start?: number, end?: number) {
    return stringFlow(this.get().slice(start, end), this[CUSTOM_METHODS]);
  },
  substring(this: SafeFlow<string>, start: number, end?: number) {
    return stringFlow(this.get().substring(start, end), this[CUSTOM_METHODS]);
  },
  equals(this: SafeFlow<string>, other: string) {
    return booleanFlow(this.get() === other);
  },
  notEqual(this: SafeFlow<string>, other: string) {
    return booleanFlow(this.get() !== other);
  },
  flowNumber(this: SafeFlow<string>) {
    return numberFlow(Number(this.get()));
  },
  flowFloatNumber(this: SafeFlow<string>) {
    return numberFlow(Number(this.get()));
  },
  flowBoolean(this: SafeFlow<string>) {
    return booleanFlow(Boolean(this.get()));
  },
  flowArray(this: SafeFlow<string>) {
    return arrayFlow(this.get().split(""));
  },
  flowObject(this: SafeFlow<string>) {
    return objectFlow(JSON.parse(this.get()));
  },
};

export const stringFlow = <M extends Methods<string>>(
  value: string,
  methods?: M
) => {
  if (typeof value !== "string") {
    return errorFlow<string, M & typeof stringMethods>({
      type: "string",
      value,
      message: "Value must be a string",
      code: "STRING_FLOW_ERROR",
    });
  }

  return createFlow("string", value, methods) as Flow<string> &
    M &
    StringFlowMethods;
};
