import { createFlow } from "@subflow/core";
import { objectFlow } from "@subflow/object";
import { stringFlow } from "@subflow/string";
import { Methods, SafeFlow } from "@subflow/types/core";
import { ArrayFlowMethods, ElementOf, ArrayFlowReturn, NumberFlowReturn, BooleanFlowReturn, StringFlowReturn, ObjectFlowReturn, ObjectFlowMethods } from "@subflow/types/flows";
import { numberFlow } from "@subflow/number";
import { safer } from "@subflow/utils";
import { booleanFlow } from "@subflow/boolean";
import { errorFlow, isError } from "@subflow/error";

export const arrayFlow = <T extends any[], M extends Methods<any[]>>(value: T, methods?: M) => {
  const defaultMethods: ArrayFlowMethods<any[]> = {
    push(this: SafeFlow<T>, ...items: any[]): ArrayFlowReturn<any[]> {
      return arrayFlow([...this.get(), ...items], methods);
    },
    pop(this: SafeFlow<T>): ArrayFlowReturn<T> {
      const last = this.get();
      return arrayFlow(last.slice(0, -1), methods);
    },
    shift(this: SafeFlow<T>): ArrayFlowReturn<T> {
      return arrayFlow(this.get().slice(1), methods);
    },
    unshift(this: SafeFlow<T>, items: ElementOf<T>[]): ArrayFlowReturn<T> {
      return arrayFlow([...items, ...this.get()], methods);
    },
    join(this: SafeFlow<T>, separator: string): StringFlowReturn {
      return stringFlow(this.get().join(separator));
    },
    map<U>(this: SafeFlow<T>, callback: (value: T[number], index: number, array: ElementOf<T>[]) => U): ArrayFlowReturn<U[]> {
      return arrayFlow(this.get().map(callback), methods);
    },
    filter(this: SafeFlow<T>, callback: (value: T[number], index: number, array: ElementOf<T>[]) => boolean): ArrayFlowReturn<ElementOf<T>[]> {
      return arrayFlow(this.get().filter(callback), methods);
    },
    reduce(this: SafeFlow<T>, callback: (acc: ElementOf<T>, value: ElementOf<T>, index: number, array: ElementOf<T>[]) => ElementOf<T>, initialValue: ElementOf<T>): ElementOf<T> {
      return this.get().reduce(callback, initialValue);
    },
    sort(this: SafeFlow<T>, compareFunction?: (a: ElementOf<T>, b: ElementOf<T>) => number): ArrayFlowReturn<T> {
      return arrayFlow(this.get().toSorted(compareFunction), methods);
    },
    reverse(this: SafeFlow<T>): ArrayFlowReturn<T> {
      return arrayFlow(
        this.get().reduce((acc, item) => [item, ...acc], []),
        methods
      );
    },
    concat(this: SafeFlow<T>, ...arrays: ElementOf<T>[]): ArrayFlowReturn<ElementOf<T>[]> {
      return arrayFlow(this.get().concat(...arrays), methods);
    },
    slice(this: SafeFlow<T>, start: number, end: number): ArrayFlowReturn<T> {
      return arrayFlow(this.get().slice(start, end), methods);
    },
    splice(this: SafeFlow<T>, start: number, deleteCount: number, ...items: ElementOf<T>[]): ArrayFlowReturn<ElementOf<T>[]> {
      return arrayFlow(
        this.get().reduce((acc, item, index) => {
          if (index === start) {
            return [...acc, ...items];
          }
          if (index > start && index < start + deleteCount) {
            return acc;
          }
          return [...acc, item];
        }, []),
        methods
      );
    },
    indexOf(this: SafeFlow<T>, searchElement: ElementOf<T>, fromIndex?: number): NumberFlowReturn {
      return numberFlow(this.get().indexOf(searchElement, fromIndex));
    },
    findLastIndex(this: SafeFlow<T>, searchElement: ElementOf<T>): NumberFlowReturn {
      const lastIndex = this.get().findLastIndex((item) => item === searchElement);
      return numberFlow(lastIndex);
    },
    includes(this: SafeFlow<T>, searchElement: ElementOf<T>, fromIndex?: number): BooleanFlowReturn {
      return booleanFlow(this.get().includes(searchElement, fromIndex));
    },
    find(this: SafeFlow<T>, callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => boolean): ElementOf<T> {
      return this.get().find(callback);
    },
    findIndex(this: SafeFlow<T>, callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => boolean): NumberFlowReturn {
      return numberFlow(this.get().findIndex(callback));
    },
    forEach(this: SafeFlow<T>, callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => void): ArrayFlowReturn<ElementOf<T>[]> {
      this.get().forEach(callback);
      return arrayFlow(this.get(), methods);
    },
    every(this: SafeFlow<T>, callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => boolean): BooleanFlowReturn {
      return booleanFlow(this.get().every(callback));
    },
    some(this: SafeFlow<T>, callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => boolean): BooleanFlowReturn {
      return booleanFlow(this.get().some(callback));
    },
    flowString(this: SafeFlow<T>): StringFlowReturn {
      return stringFlow(this.get().toString());
    },
    flowLocaleString(this: SafeFlow<T>): StringFlowReturn {
      return stringFlow(this.get().toLocaleString());
    },
    flowStringfy(this: SafeFlow<T>): StringFlowReturn {
      return stringFlow(JSON.stringify(this.get()));
    },
    flowObject(this: SafeFlow<T>): ObjectFlowReturn {
      try {
        return objectFlow(Object.fromEntries(Object.entries(this.get())));
      } catch (e) {
        return errorFlow<T, ObjectFlowMethods>({
          message: "Value must be entriesable of array",
          code: "ARRAY_FLOW_ERROR",
          type: "array",
          value: this.get(),
          cause: e as Error,
        });
      }
    },
    flowObjectEntries(this: SafeFlow<T>): ObjectFlowReturn {
      try {
        return objectFlow(Object.fromEntries(this.get()));
      } catch (e) {
        return errorFlow<T, ObjectFlowMethods>({
          message: "Value must be entriesable of array",
          code: "ARRAY_FLOW_ERROR",
          type: "array",
          value: this.get(),
          cause: e as Error,
        });
      }
    },
    flowBoolean(this: SafeFlow<T>): BooleanFlowReturn {
      return booleanFlow(this.get().length > 0);
    },
    flowNumber(this: SafeFlow<T>): NumberFlowReturn {
      return numberFlow(this.get().length);
    },
    ...(methods || {}),
  };

  const init = safer<T, M & typeof defaultMethods>(
    value,
    (value: T): T => {
      if (!Array.isArray(value)) {
        throw new Error("Value must be an array");
      }

      return value;
    },
    {
      type: "array",
      value,
      message: "Value must be an array",
      code: "ARRAY_FLOW_ERROR",
    }
  );

  if (isError(init)) {
    return init;
  }

  return createFlow("array", init, methods ? { ...defaultMethods, ...methods } : defaultMethods);
};

export default arrayFlow;
