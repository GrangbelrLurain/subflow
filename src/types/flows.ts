import { Flow, FlowErrorParams } from "./core";
import { FLOW_TYPE } from "@subflow/meta/flowType";
import { FlowType, SafeFlowType } from "./meta";

export type StringFlow = StringFlowMethods & Flow<string>;

export type StringFlowMethods = {
  [FLOW_TYPE]: Extract<FlowType, "string">;
  toUpper(this: Flow<string>): StringFlow;
  toLower(this: Flow<string>): StringFlow;
  length(this: Flow<string>): NumberFlow;
  reverse(this: Flow<string>): StringFlow;
  replace<S extends string | RegExp, R extends string>(this: Flow<string>, searchValue: S, replaceValue: R): StringFlow;
  trim(this: Flow<string>): StringFlow;
  padStart(this: Flow<string>, length: number, fillString?: string): StringFlow;
  padEnd(this: Flow<string>, length: number, fillString?: string): StringFlow;
  startsWith(this: Flow<string>, searchString: string): BooleanFlow;
  endsWith(this: Flow<string>, searchString: string): BooleanFlow;
  includes(this: Flow<string>, searchString: string): BooleanFlow;
  indexOf(this: Flow<string>, searchString: string): NumberFlow;
  lastIndexOf(this: Flow<string>, searchString: string): NumberFlow;
  charAt(this: Flow<string>, index: number): StringFlow;
  charCodeAt(this: Flow<string>, index: number): NumberFlow;
  concat(this: Flow<string>, ...strings: string[]): StringFlow;
  split<S extends string | RegExp>(this: Flow<string>, separator: S): ArrayFlow<string>;
  slice(this: Flow<string>, start?: number, end?: number): StringFlow;
  substring(this: Flow<string>, start: number, end?: number): StringFlow;
  equals(this: Flow<string>, other: string): BooleanFlow;
  notEqual(this: Flow<string>, other: string): BooleanFlow;
  flowNumber(this: Flow<string>): NumberFlow;
  flowFloatNumber(this: Flow<string>): NumberFlow;
  flowBoolean(this: Flow<string>): BooleanFlow;
  flowArray(this: Flow<string>): ArrayFlow<string>;
  flowObject(this: Flow<string>): ObjectFlow<Record<string, string>>;
};

export type NumberFlow = NumberFlowMethods & Flow<number>;

export type NumberFlowMethods = {
  [FLOW_TYPE]: Extract<FlowType, "number">;
  add(this: Flow<number>, num: number): NumberFlow;
  subtract(this: Flow<number>, num: number): NumberFlow;
  multiply(this: Flow<number>, num: number): NumberFlow;
  divide(this: Flow<number>, num: number): NumberFlow;
  modulo(this: Flow<number>, num: number): NumberFlow;
  power(this: Flow<number>, num: number): NumberFlow;
  sqrt(this: Flow<number>): NumberFlow;
  round(this: Flow<number>): NumberFlow;
  floor(this: Flow<number>): NumberFlow;
  ceil(this: Flow<number>): NumberFlow;
  abs(this: Flow<number>): NumberFlow;
  random(this: Flow<number>): NumberFlow;
  min(this: Flow<number>, num: number): NumberFlow;
  max(this: Flow<number>, num: number): NumberFlow;
  clamp(this: Flow<number>, min: number, max: number): NumberFlow;
  sign(this: Flow<number>): NumberFlow;
  toFixed(this: Flow<number>, digits?: number): StringFlow;
  toExponential(this: Flow<number>, digits?: number): StringFlow;
  toPrecision(this: Flow<number>, precision?: number): StringFlow;
  lessThan(this: Flow<number>, num: number): BooleanFlow;
  greaterThan(this: Flow<number>, num: number): BooleanFlow;
  lessThanOrEqual(this: Flow<number>, num: number): BooleanFlow;
  greaterThanOrEqual(this: Flow<number>, num: number): BooleanFlow;
  flowBoolean(this: Flow<number>): BooleanFlow;
  flowString(this: Flow<number>, radix?: number): StringFlow;
  flowLocaleString(this: Flow<number>, locales: string | string[], options?: Intl.NumberFormatOptions): StringFlow;
};

export type BigintFlow = BigintFlowMethods & Flow<bigint>;

export type BigintFlowMethods = {
  [FLOW_TYPE]: Extract<FlowType, "bigint">;
};

export type BooleanFlow = BooleanFlowMethods & Flow<boolean>;

export type BooleanFlowMethods = {
  [FLOW_TYPE]: Extract<FlowType, "boolean">;
  not(this: Flow<boolean>): BooleanFlow;
  and(this: Flow<boolean>, other: boolean): BooleanFlow;
  or(this: Flow<boolean>, other: boolean): BooleanFlow;
  xor(this: Flow<boolean>, other: boolean): BooleanFlow;
  nor(this: Flow<boolean>, other: boolean): BooleanFlow;
  notEqual(this: Flow<boolean>, other: boolean): BooleanFlow;
  equal(this: Flow<boolean>, other: boolean): BooleanFlow;
  flowString(this: Flow<boolean>): StringFlow;
  flowNumber(this: Flow<boolean>): NumberFlow;
};

export type ElementOf<T> = T extends (infer E)[] ? E : never;

export type ArrayFlow<E> = ArrayFlowMethods & Flow<E[]>;

export type ArrayFlowMethods = {
  [FLOW_TYPE]: Extract<FlowType, "array">;
  push<E>(this: Flow<E[]>, ...items: E[]): ArrayFlow<E>;
  pop<E>(this: Flow<E[]>): ArrayFlow<E>;
  shift<E>(this: Flow<E[]>): ArrayFlow<E>;
  unshift<E>(this: Flow<E[]>, ...items: E[]): ArrayFlow<E>;
  join<E>(this: Flow<E[]>, separator: string): StringFlow;
  map<E, U>(this: Flow<E[]>, callback: (value: E, index: number, array: E[]) => U): ArrayFlow<U>;
  filter<E>(this: Flow<E[]>, callback: (value: E, index: number, array: E[]) => boolean): ArrayFlow<E>;
  reduce<E, U>(this: Flow<E[]>, callback: (acc: U, value: E, index: number, array: E[]) => U, initialValue: U): U;
  sort<E>(this: Flow<E[]>, compareFunction?: (a: E, b: E) => number): ArrayFlow<E>;
  reverse<E>(this: Flow<E[]>): ArrayFlow<E>;
  concat<E>(this: Flow<E[]>, ...arrays: E[]): ArrayFlow<E>;
  slice<E>(this: Flow<E[]>, start: number, end?: number): ArrayFlow<E>;
  splice<E>(this: Flow<E[]>, start: number, deleteCount: number, ...items: E[]): ArrayFlow<E>;
  indexOf<E>(this: Flow<E[]>, searchElement: E, fromIndex?: number): NumberFlow;
  findLastIndex<E>(this: Flow<E[]>, searchElement: E): NumberFlow;
  includes<E>(this: Flow<E[]>, searchElement: E, fromIndex?: number): BooleanFlow;
  find<E>(this: Flow<E[]>, callback: (value: E, index: number, array: E[]) => boolean): E | undefined;
  findIndex<E>(this: Flow<E[]>, callback: (value: E, index: number, array: E[]) => boolean): NumberFlow;
  forEach<E>(this: Flow<E[]>, callback: (value: E, index: number, array: E[]) => void): ArrayFlow<E>;
  every<E>(this: Flow<E[]>, callback: (value: E, index: number, array: E[]) => boolean): BooleanFlow;
  some<E>(this: Flow<E[]>, callback: (value: E, index: number, array: E[]) => boolean): BooleanFlow;
  flowString<E>(this: Flow<E[]>): StringFlow;
  flowLocaleString<E>(this: Flow<E[]>): StringFlow;
  flowStringfy<E>(this: Flow<E[]>): StringFlow;
  flowObject<E>(this: Flow<E[]>): ObjectFlow<{ [key: number]: E }>;
  flowObjectEntries<E>(this: Flow<E[]>): ObjectFlow<{ [key: string]: E }>;
  flowBoolean<E>(this: Flow<E[]>): BooleanFlow;
  flowNumber<E>(this: Flow<E[]>): NumberFlow;
};

export type ObjectFlow<O extends object> = ObjectFlowMethods & Flow<O>;

export type ObjectFlowMethods = {
  [FLOW_TYPE]: Extract<FlowType, "object">;
  keys<O extends object>(this: Flow<O>): ArrayFlow<keyof O>;
  values<O extends object, E>(this: Flow<O>): ArrayFlow<E>;
  entries<O extends object, K extends keyof O, E>(this: Flow<O>): ArrayFlow<[K, E]>;
  has<O extends object, K extends keyof O>(this: Flow<O>, key: K): BooleanFlow;
  set<O extends object, K extends PropertyKey, E>(this: Flow<O>, key: K, value: E): ObjectFlow<O | Record<K, E>>;
  delete<O extends object, K extends keyof O>(this: Flow<O>, key: K): ObjectFlow<O>;
  flowString<O extends object>(this: Flow<O>): StringFlow;
};

export type FlowErrorReturn<T> = FlowErrorMethods<T> & Flow<T>;

export type FlowErrorMethods<T> = {
  [FLOW_TYPE]: Extract<FlowType, "error">;
  getError(this: Flow<T>): FlowErrorParams<T>;
  isError(this: Flow<T>): true;
};

export type SwitchMethods<F extends SafeFlowType> = F extends "string"
  ? StringFlowMethods
  : F extends "number"
  ? NumberFlowMethods
  : F extends "boolean"
  ? BooleanFlowMethods
  : F extends "bigint"
  ? BigintFlowMethods
  : F extends "array"
  ? ArrayFlowMethods
  : F extends "object"
  ? ObjectFlowMethods
  : never;
