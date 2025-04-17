import { createFlow } from "@subflow/core/createFlow";
import { Methods, SafeFlow } from "@subflow/types/core";
import { booleanFlow } from "@subflow/boolean";
import { numberFlow } from "@subflow/number";
import { arrayFlow } from "@subflow/array";
import { objectFlow } from "@subflow/object";
import { StringFlowMethods } from "@subflow/types/flows";
import { errorFlow } from "@subflow/error";

export const stringFlow = <M extends Methods<string>>(value: string, methods?: M) => {
  const defaultMethods: StringFlowMethods = {
    toUpper(this: SafeFlow<string>) {
      return stringFlow(this.get().toUpperCase(), methods);
    },
    toLower(this: SafeFlow<string>) {
      return stringFlow(this.get().toLowerCase(), methods);
    },
    length(this: SafeFlow<string>) {
      return numberFlow(this.get().length);
    },
    reverse(this: SafeFlow<string>) {
      return stringFlow(this.get().split("").reverse().join(""), methods);
    },
    replace<S extends string | RegExp, R extends string>(this: SafeFlow<string>, searchValue: S, replaceValue: R) {
      return stringFlow(this.get().replace(searchValue, replaceValue), methods);
    },
    trim(this: SafeFlow<string>) {
      return stringFlow(this.get().trim(), methods);
    },
    padStart(this: SafeFlow<string>, length: number, fillString?: string) {
      return stringFlow(this.get().padStart(length, fillString), methods);
    },
    padEnd(this: SafeFlow<string>, length: number, fillString?: string) {
      return stringFlow(this.get().padEnd(length, fillString), methods);
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
      return stringFlow(this.get().charAt(index), methods);
    },
    charCodeAt(this: SafeFlow<string>, index: number) {
      return numberFlow(this.get().charCodeAt(index));
    },
    concat(this: SafeFlow<string>, ...strings: string[]) {
      return stringFlow(this.get().concat(...strings), methods);
    },
    split<S extends string | RegExp>(this: SafeFlow<string>, separator: S) {
      return arrayFlow(this.get().split(separator));
    },
    slice(this: SafeFlow<string>, start?: number, end?: number) {
      return stringFlow(this.get().slice(start, end), methods);
    },
    substring(this: SafeFlow<string>, start: number, end?: number) {
      return stringFlow(this.get().substring(start, end), methods);
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
    ...(methods || {}),
  };

  const guard = booleanFlow(typeof value === "string");

  if (guard.not().get()) {
    return errorFlow<string, M & typeof defaultMethods>({
      type: "string",
      value,
      message: "Value must be a string",
      code: "STRING_FLOW_ERROR",
    });
  }

  return createFlow("string", value, defaultMethods);
};
