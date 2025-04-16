import { createFlow } from "@subflow/core/createFlow";
import { FlowReturn, Methods } from "@subflow/types/core";
import { booleanFlow } from "@subflow/boolean";
import { safer } from "@subflow/utils";
import { numberFlow } from "@subflow/number";
import { arrayFlow } from "@subflow/array";
import { objectFlow } from "@subflow/object";
import { StringFlowMethods } from "@subflow/types/flows";

export const stringFlow = <M extends Methods<string>>(value: string, methods?: M) => {
  const defaultMethods: StringFlowMethods = {
    toUpper(this: FlowReturn<string>) {
      return stringFlow(this.get().toUpperCase(), methods);
    },
    toLower(this: FlowReturn<string>) {
      return stringFlow(this.get().toLowerCase(), methods);
    },
    length(this: FlowReturn<string>) {
      return numberFlow(this.get().length);
    },
    reverse(this: FlowReturn<string>) {
      return stringFlow(this.get().split("").reverse().join(""), methods);
    },
    replace<S extends string | RegExp, R extends string>(this: FlowReturn<string>, searchValue: S, replaceValue: R) {
      return stringFlow(this.get().replace(searchValue, replaceValue), methods);
    },
    trim(this: FlowReturn<string>) {
      return stringFlow(this.get().trim(), methods);
    },
    padStart(this: FlowReturn<string>, length: number, fillString?: string) {
      return stringFlow(this.get().padStart(length, fillString), methods);
    },
    padEnd(this: FlowReturn<string>, length: number, fillString?: string) {
      return stringFlow(this.get().padEnd(length, fillString), methods);
    },
    startsWith(this: FlowReturn<string>, searchString: string) {
      return booleanFlow(this.get().startsWith(searchString));
    },
    endsWith(this: FlowReturn<string>, searchString: string) {
      return booleanFlow(this.get().endsWith(searchString));
    },
    includes(this: FlowReturn<string>, searchString: string) {
      return booleanFlow(this.get().includes(searchString));
    },
    indexOf(this: FlowReturn<string>, searchString: string) {
      return numberFlow(this.get().indexOf(searchString));
    },
    lastIndexOf(this: FlowReturn<string>, searchString: string) {
      return numberFlow(this.get().lastIndexOf(searchString));
    },
    charAt(this: FlowReturn<string>, index: number) {
      return stringFlow(this.get().charAt(index), methods);
    },
    charCodeAt(this: FlowReturn<string>, index: number) {
      return numberFlow(this.get().charCodeAt(index));
    },
    concat(this: FlowReturn<string>, ...strings: string[]) {
      return stringFlow(this.get().concat(...strings), methods);
    },
    split<S extends string | RegExp>(this: FlowReturn<string>, separator: S) {
      return arrayFlow(this.get().split(separator));
    },
    slice(this: FlowReturn<string>, start?: number, end?: number) {
      return stringFlow(this.get().slice(start, end), methods);
    },
    substring(this: FlowReturn<string>, start: number, end?: number) {
      return stringFlow(this.get().substring(start, end), methods);
    },
    substr(this: FlowReturn<string>, start: number, length?: number) {
      return stringFlow(this.get().substr(start, length), methods);
    },
    flowNumber(this: FlowReturn<string>) {
      return numberFlow(Number(this.get()));
    },
    flowFloatNumber(this: FlowReturn<string>) {
      return numberFlow(Number(this.get()));
    },
    flowBoolean(this: FlowReturn<string>) {
      return booleanFlow(Boolean(this.get()));
    },
    flowArray(this: FlowReturn<string>) {
      return arrayFlow(this.get().split(""));
    },
    flowObject(this: FlowReturn<string>) {
      return objectFlow(JSON.parse(this.get()));
    },
  };

  const init = safer<string, M & typeof defaultMethods>(
    value,
    (value: string): string => {
      if (typeof value !== "string") {
        throw new Error("Value must be a string");
      }

      return value;
    },
    {
      type: "string",
      value,
      message: "Value must be a string",
      code: "STRING_FLOW_ERROR",
      timestamp: Date.now(),
      traceId: crypto.randomUUID(),
    }
  );

  if (typeof init === "object" && "getError" in init && typeof init.isError === "boolean" && init.isError) {
    return init;
  }

  return createFlow(init as string, methods ? { ...defaultMethods, ...methods } : defaultMethods);
};
