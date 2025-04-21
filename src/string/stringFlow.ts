import { createFlow } from "@subflow/core/createFlow";
import { Flow, Methods, SafeFlow } from "@subflow/types/core";
import { booleanFlow } from "@subflow/boolean";
import { numberFlow } from "@subflow/number";
import { arrayFlow } from "@subflow/array";
import { objectFlow } from "@subflow/object";
import { StringFlowMethods } from "@subflow/types/flows";
import { errorFlow } from "@subflow/error";
import { CUSTOM_METHODS, FLOW_TYPE, VALUE } from "@subflow/meta/flowType";

export const stringMethods: StringFlowMethods = {
  [FLOW_TYPE]: "string",
  toUpper(this: SafeFlow<string>) {
    return stringFlow(this[VALUE].toUpperCase(), this[CUSTOM_METHODS]);
  },
  toLower(this: SafeFlow<string>) {
    return stringFlow(this[VALUE].toLowerCase(), this[CUSTOM_METHODS]);
  },
  length(this: SafeFlow<string>) {
    return numberFlow(this[VALUE].length);
  },
  reverse(this: SafeFlow<string>) {
    return stringFlow(this[VALUE].split("").reverse().join(""), this[CUSTOM_METHODS]);
  },
  replace<S extends string | RegExp, R extends string>(this: SafeFlow<string>, searchValue: S, replaceValue: R) {
    return stringFlow(this[VALUE].replace(searchValue, replaceValue), this[CUSTOM_METHODS]);
  },
  trim(this: SafeFlow<string>) {
    return stringFlow(this[VALUE].trim(), this[CUSTOM_METHODS]);
  },
  padStart(this: SafeFlow<string>, length: number, fillString?: string) {
    return stringFlow(this[VALUE].padStart(length, fillString), this[CUSTOM_METHODS]);
  },
  padEnd(this: SafeFlow<string>, length: number, fillString?: string) {
    return stringFlow(this[VALUE].padEnd(length, fillString), this[CUSTOM_METHODS]);
  },
  startsWith(this: SafeFlow<string>, searchString: string) {
    return booleanFlow(this[VALUE].startsWith(searchString));
  },
  endsWith(this: SafeFlow<string>, searchString: string) {
    return booleanFlow(this[VALUE].endsWith(searchString));
  },
  includes(this: SafeFlow<string>, searchString: string) {
    return booleanFlow(this[VALUE].includes(searchString));
  },
  indexOf(this: SafeFlow<string>, searchString: string) {
    return numberFlow(this[VALUE].indexOf(searchString));
  },
  lastIndexOf(this: SafeFlow<string>, searchString: string) {
    return numberFlow(this[VALUE].lastIndexOf(searchString));
  },
  charAt(this: SafeFlow<string>, index: number) {
    return stringFlow(this[VALUE].charAt(index), this[CUSTOM_METHODS]);
  },
  charCodeAt(this: SafeFlow<string>, index: number) {
    return numberFlow(this[VALUE].charCodeAt(index));
  },
  concat(this: SafeFlow<string>, ...strings: string[]) {
    return stringFlow(this[VALUE].concat(...strings), this[CUSTOM_METHODS]);
  },
  split<S extends string | RegExp>(this: SafeFlow<string>, separator: S) {
    return arrayFlow(this[VALUE].split(separator));
  },
  slice(this: SafeFlow<string>, start?: number, end?: number) {
    return stringFlow(this[VALUE].slice(start, end), this[CUSTOM_METHODS]);
  },
  substring(this: SafeFlow<string>, start: number, end?: number) {
    return stringFlow(this[VALUE].substring(start, end), this[CUSTOM_METHODS]);
  },
  equals(this: SafeFlow<string>, other: string) {
    return booleanFlow(this[VALUE] === other);
  },
  notEqual(this: SafeFlow<string>, other: string) {
    return booleanFlow(this[VALUE] !== other);
  },
  flowNumber(this: SafeFlow<string>) {
    return numberFlow(Number(this[VALUE]));
  },
  flowFloatNumber(this: SafeFlow<string>) {
    return numberFlow(Number(this[VALUE]));
  },
  flowBoolean(this: SafeFlow<string>) {
    return booleanFlow(Boolean(this[VALUE]));
  },
  flowArray(this: SafeFlow<string>) {
    return arrayFlow(this[VALUE].split(""));
  },
  flowObject(this: SafeFlow<string>) {
    return objectFlow(JSON.parse(this[VALUE]));
  },
};

export const stringFlow = <M extends Methods<string>>(value: string, methods?: M): Flow<string> & M & StringFlowMethods => {
  if (typeof value !== "string") {
    return errorFlow<string, M & typeof stringMethods>({
      type: "string",
      value,
      message: "Value must be a string",
      code: "STRING_FLOW_ERROR",
    });
  }

  return createFlow("string", value, methods);
};
