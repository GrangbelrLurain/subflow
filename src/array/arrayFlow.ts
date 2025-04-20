import { createFlow, CUSTOM_METHODS, VALUE } from "@subflow/core";
import { objectFlow } from "@subflow/object";
import { stringFlow } from "@subflow/string";
import { Flow, Methods, SafeFlow } from "@subflow/types/core";
import {
  ArrayFlowMethods,
  ElementOf,
  ArrayFlow,
  NumberFlow,
  BooleanFlow,
  StringFlow,
  ObjectFlow,
  ObjectFlowMethods,
} from "@subflow/types/flows";
import { numberFlow } from "@subflow/number";
import { booleanFlow } from "@subflow/boolean";
import { errorFlow } from "@subflow/error";
import { FLOW_TYPE } from "@subflow/meta/flowType";

const defaultMethods: ArrayFlowMethods = {
  [FLOW_TYPE]: "array",
  push<E>(this: SafeFlow<E[]>, ...items: E[]): ArrayFlow<E> {
    return arrayFlow([...this[VALUE], ...items], this[CUSTOM_METHODS]);
  },
  pop<E>(this: SafeFlow<E[]>): ArrayFlow<E> {
    const last = this[VALUE];
    return arrayFlow(last.slice(0, -1), this[CUSTOM_METHODS]);
  },
  shift<E>(this: SafeFlow<E[]>): ArrayFlow<E> {
    return arrayFlow(this[VALUE].slice(1), this[CUSTOM_METHODS]);
  },
  unshift<E>(this: SafeFlow<E[]>, ...items: E[]): ArrayFlow<E> {
    return arrayFlow([...items, ...this[VALUE]], this[CUSTOM_METHODS]);
  },
  join<E>(this: SafeFlow<E[]>, separator: string): StringFlow {
    return stringFlow(this[VALUE].join(separator));
  },
  map<E, U>(
    this: SafeFlow<E[]>,
    callback: (value: E, index: number, array: E[]) => U
  ): ArrayFlow<U> {
    return arrayFlow(this[VALUE].map(callback), this[CUSTOM_METHODS]);
  },
  filter<E>(
    this: SafeFlow<E[]>,
    callback: (value: E, index: number, array: E[]) => boolean
  ): ArrayFlow<E> {
    return arrayFlow(this[VALUE].filter(callback), this[CUSTOM_METHODS]);
  },
  reduce<E, U>(
    this: SafeFlow<E[]>,
    callback: (acc: U, value: E, index: number, array: E[]) => U,
    initialValue: U
  ): U {
    return this[VALUE].reduce(
      callback as unknown as (acc: U, value: E, index: number, array: E[]) => U,
      initialValue
    );
  },
  sort<E>(
    this: SafeFlow<E[]>,
    compareFunction?: (a: E, b: E) => number
  ): ArrayFlow<E> {
    return arrayFlow(
      this[VALUE].toSorted(compareFunction),
      this[CUSTOM_METHODS]
    );
  },
  reverse<E>(this: SafeFlow<E[]>): ArrayFlow<E> {
    return arrayFlow(
      this[VALUE].reduce((acc, item) => [item, ...acc], [] as E[]),
      this[CUSTOM_METHODS]
    );
  },
  concat<E>(this: SafeFlow<E[]>, ...arrays: E[]): ArrayFlow<E> {
    return arrayFlow(this[VALUE].concat(...arrays), this[CUSTOM_METHODS]);
  },
  slice<E>(this: SafeFlow<E[]>, start: number, end: number): ArrayFlow<E> {
    return arrayFlow(this[VALUE].slice(start, end), this[CUSTOM_METHODS]);
  },
  splice<E>(
    this: SafeFlow<E[]>,
    start: number,
    deleteCount: number,
    ...items: E[]
  ): ArrayFlow<E> {
    return arrayFlow(
      this[VALUE].reduce((acc, item, index) => {
        if (index === start) {
          return [...acc, ...items];
        }
        if (index > start && index < start + deleteCount) {
          return acc;
        }
        return [...acc, item];
      }, [] as E[]),
      this[CUSTOM_METHODS]
    );
  },
  indexOf<E>(
    this: SafeFlow<E[]>,
    searchElement: ElementOf<E[]>,
    fromIndex?: number
  ): NumberFlow {
    return numberFlow(this[VALUE].indexOf(searchElement, fromIndex));
  },
  findLastIndex<E>(
    this: SafeFlow<E[]>,
    searchElement: ElementOf<E[]>
  ): NumberFlow {
    const lastIndex = this[VALUE].findLastIndex(
      (item) => item === searchElement
    );
    return numberFlow(lastIndex);
  },
  includes<E>(
    this: SafeFlow<E[]>,
    searchElement: ElementOf<E[]>,
    fromIndex?: number
  ): BooleanFlow {
    return booleanFlow(this[VALUE].includes(searchElement, fromIndex));
  },
  find<E>(
    this: SafeFlow<E[]>,
    callback: (
      value: ElementOf<E[]>,
      index: number,
      array: ElementOf<E[]>[]
    ) => boolean
  ): ElementOf<E[]> {
    return this[VALUE].find(callback);
  },
  findIndex<E>(
    this: SafeFlow<E[]>,
    callback: (
      value: ElementOf<E[]>,
      index: number,
      array: ElementOf<E[]>[]
    ) => boolean
  ): NumberFlow {
    return numberFlow(this[VALUE].findIndex(callback));
  },
  forEach<E>(
    this: SafeFlow<E[]>,
    callback: (value: E, index: number, array: E[]) => void
  ): ArrayFlow<E> {
    this[VALUE].forEach(callback);
    return arrayFlow(this[VALUE], this[CUSTOM_METHODS]);
  },
  every<E>(
    this: SafeFlow<E[]>,
    callback: (
      value: ElementOf<E[]>,
      index: number,
      array: ElementOf<E[]>[]
    ) => boolean
  ): BooleanFlow {
    return booleanFlow(this[VALUE].every(callback));
  },
  some<E>(
    this: SafeFlow<E[]>,
    callback: (
      value: ElementOf<E[]>,
      index: number,
      array: ElementOf<E[]>[]
    ) => boolean
  ): BooleanFlow {
    return booleanFlow(this[VALUE].some(callback));
  },
  flowString<E>(this: SafeFlow<E[]>): StringFlow {
    return stringFlow(this[VALUE].toString());
  },
  flowLocaleString<E>(this: SafeFlow<E[]>): StringFlow {
    return stringFlow(this[VALUE].toLocaleString());
  },
  flowStringfy<E>(this: SafeFlow<E[]>): StringFlow {
    return stringFlow(JSON.stringify(this[VALUE]));
  },
  flowObject<E>(this: SafeFlow<E[]>): ObjectFlow<[number, E]> {
    try {
      return objectFlow(Object.fromEntries(Object.entries(this[VALUE])));
    } catch (e) {
      return errorFlow<E[], ObjectFlowMethods>({
        message: "Value must be entriesable of array",
        code: "ARRAY_FLOW_ERROR",
        type: "array",
        value: this[VALUE],
        cause: e as Error,
      });
    }
  },
  flowObjectEntries<E>(this: SafeFlow<E[]>): ObjectFlow<[number, E]> {
    try {
      return objectFlow(Object.fromEntries(this[VALUE]));
    } catch (e) {
      return errorFlow<E[], ObjectFlowMethods>({
        message: "Value must be entriesable of array",
        code: "ARRAY_FLOW_ERROR",
        type: "array",
        value: this[VALUE],
        cause: e as Error,
      });
    }
  },
  flowBoolean<E>(this: SafeFlow<E[]>): BooleanFlow {
    return booleanFlow(this[VALUE].length > 0);
  },
  flowNumber<E>(this: SafeFlow<E[]>): NumberFlow {
    return numberFlow(this[VALUE].length);
  },
};

export const arrayFlow = <T extends any[], M extends Methods<any[]>>(
  value: T,
  customMethods?: M
): Flow<T> & M & ArrayFlowMethods => {
  if (!Array.isArray(value)) {
    return errorFlow<T, M & typeof defaultMethods>({
      type: "array",
      value,
      message: "Value must be an array",
      code: "ARRAY_FLOW_ERROR",
    });
  }

  return createFlow("array", value, customMethods) as Flow<T> &
    M &
    ArrayFlowMethods;
};

export default arrayFlow;
