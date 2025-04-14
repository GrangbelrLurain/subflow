import { createFlow } from "@subflow/core";
import { objectFlow } from "@subflow/object";
import { stringFlow } from "@subflow/string";
import { Extensions } from "@subflow/types/core";

export const arrayFlow = <T extends any[], E extends Extensions<E>>(value: T, extensions?: E) => {
  if (!Array.isArray(value)) {
    throw new Error("Value must be an array");
  }

  type Flow = { get: () => T };

  const methods = {
    push(this: Flow, ...items: T) {
      return arrayFlow([...this.get(), ...items], extensions);
    },
    pop(this: Flow) {
      return arrayFlow(this.get().pop(), extensions);
    },
    shift(this: Flow) {
      return arrayFlow(this.get().shift(), extensions);
    },
    unshift(this: Flow, ...items: T) {
      return arrayFlow([...items, ...this.get()], extensions);
    },
    join(this: Flow, separator: string) {
      return stringFlow(this.get().join(separator), extensions);
    },
    map(this: Flow, callback: Array<T[number]>["map"]) {
      return arrayFlow(this.get().map(callback), extensions);
    },
    filter(this: Flow, callback: Array<T[number]>["filter"]) {
      return arrayFlow(this.get().filter(callback), extensions);
    },
    reduce(this: Flow, callback: Array<T[number]>["reduce"], initialValue: T[number]) {
      return arrayFlow(this.get().reduce(callback, initialValue), extensions);
    },
    sort(this: Flow, compareFunction?: (a: T[number], b: T[number]) => number) {
      return arrayFlow(this.get().sort(compareFunction), extensions);
    },
    reverse(this: Flow) {
      return arrayFlow(this.get().reverse(), extensions);
    },
    concat(this: Flow, ...arrays: T[]) {
      return arrayFlow(this.get().concat(...arrays), extensions);
    },
    slice(this: Flow, start: number, end: number) {
      return arrayFlow(this.get().slice(start, end), extensions);
    },
    splice(this: Flow, start: number, deleteCount: number, ...items: T[]) {
      return arrayFlow(this.get().splice(start, deleteCount, ...items), extensions);
    },
    indexOf(this: Flow, searchElement: T[number], fromIndex?: number) {
      return this.get().indexOf(searchElement, fromIndex);
    },
    lastIndexOf(this: Flow, searchElement: T[number], fromIndex?: number) {
      return this.get().lastIndexOf(searchElement, fromIndex);
    },
    includes(this: Flow, searchElement: T[number], fromIndex?: number) {
      return this.get().includes(searchElement, fromIndex);
    },
    find(this: Flow, callback: Array<T[number]>["find"]) {
      return this.get().find(callback);
    },
    findIndex(this: Flow, callback: Array<T[number]>["findIndex"]) {
      return this.get().findIndex(callback);
    },
    forEach(this: Flow, callback: Array<T[number]>["forEach"]) {
      return this.get().forEach(callback);
    },
    every(this: Flow, callback: Array<T[number]>["every"]) {
      return this.get().every(callback);
    },
    some(this: Flow, callback: Array<T[number]>["some"]) {
      return this.get().some(callback);
    },
    toString(this: Flow) {
      return stringFlow(this.get().toString());
    },
    toLocaleString(this: Flow) {
      return stringFlow(this.get().toLocaleString());
    },
    toStringify(this: Flow) {
      return stringFlow(JSON.stringify(this.get()));
    },
    toObject(this: Flow) {
      return objectFlow(this.get() as Record<string, unknown>);
    },
    ...(extensions || {}),
  } as const;

  return createFlow<T, typeof methods>(value, methods);
};

export default arrayFlow;
