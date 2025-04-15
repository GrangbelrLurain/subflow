import { createFlow } from "@subflow/core";
import { FlowError } from "@subflow/error";
import { objectFlow } from "@subflow/object";
import { stringFlow } from "@subflow/string";
import { Methods, FlowReturn } from "@subflow/types/core";
import { ArrayFlowMethods, ElementOf, ArrayFlowReturn, NumberFlowReturn, BooleanFlowReturn, StringFlowReturn, ObjectFlowReturn } from "@subflow/types/flows";
import { numberFlow } from "@subflow/number";
import { safer } from "@subflow/utils";
import { booleanFlow } from "@subflow/boolean";

export const arrayFlow = <T extends any[], M extends Methods<any[]>>(value: T, methods?: M) => {
  const defaultMethods: ArrayFlowMethods<any[]> = {
    push(this: FlowReturn<T>, ...items: any[]): ArrayFlowReturn<any[]> {
      return arrayFlow([...this.get(), ...items], methods);
    },
    pop(this: FlowReturn<T>): ArrayFlowReturn<T> {
      return arrayFlow(this.get().pop(), methods);
    },
    shift(this: FlowReturn<T>): ArrayFlowReturn<T> {
      return arrayFlow(this.get().shift(), methods);
    },
    unshift(this: FlowReturn<T>, ...items: ElementOf<T>[]): ArrayFlowReturn<T> {
      return arrayFlow([...items, ...this.get()], methods);
    },
    join(this: FlowReturn<T>, separator: string): StringFlowReturn {
      return stringFlow(this.get().join(separator));
    },
    map<U>(this: FlowReturn<T>, callback: (value: T[number], index: number, array: ElementOf<T>[]) => U): ArrayFlowReturn<U[]> {
      return arrayFlow(this.get().map(callback), methods);
    },
    filter(this: FlowReturn<T>, callback: (value: T[number], index: number, array: ElementOf<T>[]) => boolean): ArrayFlowReturn<ElementOf<T>[]> {
      return arrayFlow(this.get().filter(callback), methods);
    },
    reduce(this: FlowReturn<T>, callback: (acc: ElementOf<T>, value: ElementOf<T>, index: number, array: ElementOf<T>[]) => ElementOf<T>, initialValue: ElementOf<T>): ElementOf<T> {
      return this.get().reduce(callback, initialValue);
    },
    sort(this: FlowReturn<T>, compareFunction?: (a: ElementOf<T>, b: ElementOf<T>) => number): ArrayFlowReturn<T> {
      return arrayFlow(this.get().sort(compareFunction), methods);
    },
    reverse(this: FlowReturn<T>): ArrayFlowReturn<T> {
      return arrayFlow(this.get().reverse(), methods);
    },
    concat(this: FlowReturn<T>, ...arrays: ElementOf<T>[]): ArrayFlowReturn<ElementOf<T>[]> {
      return arrayFlow(this.get().concat(...arrays), methods);
    },
    slice(this: FlowReturn<T>, start: number, end: number): ArrayFlowReturn<T> {
      return arrayFlow(this.get().slice(start, end), methods);
    },
    splice(this: FlowReturn<T>, start: number, deleteCount: number, ...items: ElementOf<T>[]): ArrayFlowReturn<ElementOf<T>[]> {
      return arrayFlow(this.get().splice(start, deleteCount, ...items), methods);
    },
    indexOf(this: FlowReturn<T>, searchElement: ElementOf<T>, fromIndex?: number): NumberFlowReturn {
      return numberFlow(this.get().indexOf(searchElement, fromIndex));
    },
    lastIndexOf(this: FlowReturn<T>, searchElement: ElementOf<T>, fromIndex?: number): NumberFlowReturn {
      return numberFlow(this.get().lastIndexOf(searchElement, fromIndex));
    },
    includes(this: FlowReturn<T>, searchElement: ElementOf<T>, fromIndex?: number): BooleanFlowReturn {
      return booleanFlow(this.get().includes(searchElement, fromIndex));
    },
    find(this: FlowReturn<T>, callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => boolean): ElementOf<T> {
      return this.get().find(callback);
    },
    findIndex(this: FlowReturn<T>, callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => boolean): NumberFlowReturn {
      return numberFlow(this.get().findIndex(callback));
    },
    forEach(this: FlowReturn<T>, callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => void): ArrayFlowReturn<ElementOf<T>[]> {
      this.get().forEach(callback);
      return arrayFlow(this.get(), methods);
    },
    every(this: FlowReturn<T>, callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => boolean): BooleanFlowReturn {
      return booleanFlow(this.get().every(callback));
    },
    some(this: FlowReturn<T>, callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => boolean): BooleanFlowReturn {
      return booleanFlow(this.get().some(callback));
    },
    flowString(this: FlowReturn<T>): StringFlowReturn {
      return stringFlow(this.get().toString());
    },
    flowLocaleString(this: FlowReturn<T>): StringFlowReturn {
      return stringFlow(this.get().toLocaleString());
    },
    flowStringfy(this: FlowReturn<T>): StringFlowReturn {
      return stringFlow(JSON.stringify(this.get()));
    },
    flowObject(this: FlowReturn<T>): ObjectFlowReturn {
      return objectFlow(this.get() as unknown as Record<string, unknown>);
    },
    flowBoolean(this: FlowReturn<T>): BooleanFlowReturn {
      return booleanFlow(this.get().length > 0);
    },
    flowNumber(this: FlowReturn<T>): NumberFlowReturn {
      return numberFlow(this.get().length);
    },
    ...(methods || {}),
  };

  const init = safer(
    value,
    (value: T): T => {
      if (!Array.isArray(value)) {
        throw new Error("Value must be an array");
      }

      return value;
    },
    new FlowError("array", value, "Value must be an array", "ARRAY_FLOW_ERROR", Date.now(), "traceId")
  );

  return createFlow<T, typeof defaultMethods>(init, defaultMethods);
};

export default arrayFlow;
