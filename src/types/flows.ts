import { Flow } from "./core";
import { FlowErrorParams } from "./error";

export type StringFlowReturn = StringFlowMethods & Flow<string>;

export type StringFlowMethods = {
  toUpper(this: Flow<string>): StringFlowReturn;
  toLower(this: Flow<string>): StringFlowReturn;
  length(this: Flow<string>): NumberFlowReturn;
  reverse(this: Flow<string>): StringFlowReturn;
  replace<S extends string | RegExp, R extends string>(this: Flow<string>, searchValue: S, replaceValue: R): StringFlowReturn;
  trim(this: Flow<string>): StringFlowReturn;
  padStart(this: Flow<string>, length: number, fillString?: string): StringFlowReturn;
  padEnd(this: Flow<string>, length: number, fillString?: string): StringFlowReturn;
  startsWith(this: Flow<string>, searchString: string): BooleanFlowReturn;
  endsWith(this: Flow<string>, searchString: string): BooleanFlowReturn;
  includes(this: Flow<string>, searchString: string): BooleanFlowReturn;
  indexOf(this: Flow<string>, searchString: string): NumberFlowReturn;
  lastIndexOf(this: Flow<string>, searchString: string): NumberFlowReturn;
  charAt(this: Flow<string>, index: number): StringFlowReturn;
  charCodeAt(this: Flow<string>, index: number): NumberFlowReturn;
  concat(this: Flow<string>, ...strings: string[]): StringFlowReturn;
  split<S extends string | RegExp>(this: Flow<string>, separator: S): ArrayFlowReturn<string[]>;
  slice(this: Flow<string>, start?: number, end?: number): StringFlowReturn;
  substring(this: Flow<string>, start: number, end?: number): StringFlowReturn;
  equals(this: Flow<string>, other: string): BooleanFlowReturn;
  notEqual(this: Flow<string>, other: string): BooleanFlowReturn;
  flowNumber(this: Flow<string>): NumberFlowReturn;
  flowFloatNumber(this: Flow<string>): NumberFlowReturn;
  flowBoolean(this: Flow<string>): BooleanFlowReturn;
  flowArray(this: Flow<string>): ArrayFlowReturn<string[]>;
  flowObject(this: Flow<string>): ObjectFlowReturn;
};

export type NumberFlowReturn = NumberFlowMethods & Flow<number>;

export type NumberFlowMethods = {
  add(this: Flow<number>, num: number): NumberFlowReturn;
  subtract(this: Flow<number>, num: number): NumberFlowReturn;
  multiply(this: Flow<number>, num: number): NumberFlowReturn;
  divide(this: Flow<number>, num: number): NumberFlowReturn;
  modulo(this: Flow<number>, num: number): NumberFlowReturn;
  power(this: Flow<number>, num: number): NumberFlowReturn;
  sqrt(this: Flow<number>): NumberFlowReturn;
  round(this: Flow<number>): NumberFlowReturn;
  floor(this: Flow<number>): NumberFlowReturn;
  ceil(this: Flow<number>): NumberFlowReturn;
  abs(this: Flow<number>): NumberFlowReturn;
  random(this: Flow<number>): NumberFlowReturn;
  min(this: Flow<number>, num: number): NumberFlowReturn;
  max(this: Flow<number>, num: number): NumberFlowReturn;
  clamp(this: Flow<number>, min: number, max: number): NumberFlowReturn;
  sign(this: Flow<number>): NumberFlowReturn;
  toFixed(this: Flow<number>, digits?: number): StringFlowReturn;
  toExponential(this: Flow<number>, digits?: number): StringFlowReturn;
  toPrecision(this: Flow<number>, precision?: number): StringFlowReturn;
  lessThan(this: Flow<number>, num: number): BooleanFlowReturn;
  greaterThan(this: Flow<number>, num: number): BooleanFlowReturn;
  lessThanOrEqual(this: Flow<number>, num: number): BooleanFlowReturn;
  greaterThanOrEqual(this: Flow<number>, num: number): BooleanFlowReturn;
  flowBoolean(this: Flow<number>): BooleanFlowReturn;
  flowString(this: Flow<number>, radix?: number): StringFlowReturn;
  flowLocaleString(this: Flow<number>, locales: string | string[], options?: Intl.NumberFormatOptions): StringFlowReturn;
};

export type BooleanFlowReturn = BooleanFlowMethods & Flow<boolean>;

export type BooleanFlowMethods = {
  not(this: Flow<boolean>): BooleanFlowReturn;
  and(this: Flow<boolean>, other: boolean): BooleanFlowReturn;
  or(this: Flow<boolean>, other: boolean): BooleanFlowReturn;
  xor(this: Flow<boolean>, other: boolean): BooleanFlowReturn;
  nor(this: Flow<boolean>, other: boolean): BooleanFlowReturn;
  notEqual(this: Flow<boolean>, other: boolean): BooleanFlowReturn;
  equal(this: Flow<boolean>, other: boolean): BooleanFlowReturn;
  flowString(this: Flow<boolean>): StringFlowReturn;
  flowNumber(this: Flow<boolean>): NumberFlowReturn;
};

export type ElementOf<T> = T extends (infer E)[] ? E : never;

export type ArrayFlowReturn<T extends any[]> = ArrayFlowMethods<ElementOf<T>[]> & Flow<ElementOf<T>[]>;

export type ArrayFlowMethods<T extends any[]> = {
  push(this: Flow<T>, ...items: ElementOf<T>[]): ArrayFlowReturn<ElementOf<T>[]>;
  pop(this: Flow<T>): ArrayFlowReturn<ElementOf<T>[]>;
  shift(this: Flow<T>): ArrayFlowReturn<ElementOf<T>[]>;
  unshift(this: Flow<T>, ...items: ElementOf<T>[]): ArrayFlowReturn<ElementOf<T>[]>;
  join(this: Flow<T>, separator: string): StringFlowReturn;
  map<U>(this: Flow<T>, callback: (value: ElementOf<T>, index: number, array: T) => U): ArrayFlowReturn<U[]>;
  filter(this: Flow<T>, callback: (value: ElementOf<T>, index: number, array: T) => boolean): ArrayFlowReturn<ElementOf<T>[]>;
  reduce<U>(this: Flow<T>, callback: (acc: ElementOf<T>, value: ElementOf<T>, index: number, array: T) => U, initialValue: U): U;
  sort(this: Flow<T>, compareFunction?: (a: ElementOf<T>, b: ElementOf<T>) => number): ArrayFlowReturn<ElementOf<T>[]>;
  reverse(this: Flow<T>): ArrayFlowReturn<ElementOf<T>[]>;
  concat(this: Flow<T>, ...arrays: T[]): ArrayFlowReturn<ElementOf<T>[]>;
  slice(this: Flow<T>, start: number, end: number): ArrayFlowReturn<ElementOf<T>[]>;
  splice(this: Flow<T>, start: number, deleteCount: number, ...items: ElementOf<T>[]): ArrayFlowReturn<ElementOf<T>[]>;
  indexOf(this: Flow<T>, searchElement: ElementOf<T>, fromIndex?: number): NumberFlowReturn;
  findLastIndex(this: Flow<T>, searchElement: ElementOf<T>): NumberFlowReturn;
  includes(this: Flow<T>, searchElement: ElementOf<T>, fromIndex?: number): BooleanFlowReturn;
  find(this: Flow<T>, callback: (value: ElementOf<T>, index: number, array: T) => boolean): ElementOf<T>;
  findIndex(this: Flow<T>, callback: (value: ElementOf<T>, index: number, array: T) => boolean): NumberFlowReturn;
  forEach(this: Flow<T>, callback: (value: ElementOf<T>, index: number, array: T) => void): ArrayFlowReturn<ElementOf<T>[]>;
  every(this: Flow<T>, callback: (value: ElementOf<T>, index: number, array: T) => boolean): BooleanFlowReturn;
  some(this: Flow<T>, callback: (value: ElementOf<T>, index: number, array: T) => boolean): BooleanFlowReturn;
  flowString(this: Flow<T>): StringFlowReturn;
  flowLocaleString(this: Flow<T>): StringFlowReturn;
  flowStringfy(this: Flow<T>): StringFlowReturn;
  flowObject(this: Flow<T>): ObjectFlowReturn;
  flowObjectEntries(this: Flow<T>): ObjectFlowReturn;
  flowBoolean(this: Flow<T>): BooleanFlowReturn;
  flowNumber(this: Flow<T>): NumberFlowReturn;
};

export type ObjectFlowReturn = ObjectFlowMethods & Flow<Record<string, any>>;

export type ObjectFlowMethods = {
  keys(this: Flow<Record<string, any>>): ArrayFlowReturn<string[]>;
  values(this: Flow<Record<string, any>>): ArrayFlowReturn<any[]>;
  entries(this: Flow<Record<string, any>>): ArrayFlowReturn<[string, any][]>;
  has(this: Flow<Record<string, any>>, key: string): BooleanFlowReturn;
  set(this: Flow<Record<string, any>>, key: string, value: any): ObjectFlowReturn;
  delete(this: Flow<Record<string, any>>, key: string): ObjectFlowReturn;
  flowString(this: Flow<Record<string, any>>): StringFlowReturn;
};

export type FlowErrorReturn<T> = FlowErrorMethods<T> & Flow<T>;

export type FlowErrorMethods<T> = {
  getError(this: Flow<T>): FlowErrorParams<T>;
  isError(this: Flow<T>): true;
};
