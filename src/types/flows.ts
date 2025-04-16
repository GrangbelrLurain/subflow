import { FlowReturn } from "./core";
import { FlowErrorParams } from "./error";

export type StringFlowReturn = StringFlowMethods & FlowReturn<string>;

export type StringFlowMethods = {
  toUpper(this: FlowReturn<string>): StringFlowReturn;
  toLower(this: FlowReturn<string>): StringFlowReturn;
  length(this: FlowReturn<string>): NumberFlowReturn;
  reverse(this: FlowReturn<string>): StringFlowReturn;
  replace<S extends string | RegExp, R extends string>(this: FlowReturn<string>, searchValue: S, replaceValue: R): StringFlowReturn;
  trim(this: FlowReturn<string>): StringFlowReturn;
  padStart(this: FlowReturn<string>, length: number, fillString?: string): StringFlowReturn;
  padEnd(this: FlowReturn<string>, length: number, fillString?: string): StringFlowReturn;
  startsWith(this: FlowReturn<string>, searchString: string): BooleanFlowReturn;
  endsWith(this: FlowReturn<string>, searchString: string): BooleanFlowReturn;
  includes(this: FlowReturn<string>, searchString: string): BooleanFlowReturn;
  indexOf(this: FlowReturn<string>, searchString: string): NumberFlowReturn;
  lastIndexOf(this: FlowReturn<string>, searchString: string): NumberFlowReturn;
  charAt(this: FlowReturn<string>, index: number): StringFlowReturn;
  charCodeAt(this: FlowReturn<string>, index: number): NumberFlowReturn;
  concat(this: FlowReturn<string>, ...strings: string[]): StringFlowReturn;
  split<S extends string | RegExp>(this: FlowReturn<string>, separator: S): ArrayFlowReturn<string[]>;
  slice(this: FlowReturn<string>, start?: number, end?: number): StringFlowReturn;
  substring(this: FlowReturn<string>, start: number, end?: number): StringFlowReturn;
  substr(this: FlowReturn<string>, start: number, length?: number): StringFlowReturn;
  flowNumber(this: FlowReturn<string>): NumberFlowReturn;
  flowFloatNumber(this: FlowReturn<string>): NumberFlowReturn;
  flowBoolean(this: FlowReturn<string>): BooleanFlowReturn;
  flowArray(this: FlowReturn<string>): ArrayFlowReturn<string[]>;
  flowObject(this: FlowReturn<string>): ObjectFlowReturn;
};

export type NumberFlowReturn = NumberFlowMethods & FlowReturn<number>;

export type NumberFlowMethods = {
  add(this: FlowReturn<number>, num: number): NumberFlowReturn;
  subtract(this: FlowReturn<number>, num: number): NumberFlowReturn;
  multiply(this: FlowReturn<number>, num: number): NumberFlowReturn;
  divide(this: FlowReturn<number>, num: number): NumberFlowReturn;
  modulo(this: FlowReturn<number>, num: number): NumberFlowReturn;
  power(this: FlowReturn<number>, num: number): NumberFlowReturn;
  sqrt(this: FlowReturn<number>): NumberFlowReturn;
  round(this: FlowReturn<number>): NumberFlowReturn;
  floor(this: FlowReturn<number>): NumberFlowReturn;
  ceil(this: FlowReturn<number>): NumberFlowReturn;
  abs(this: FlowReturn<number>): NumberFlowReturn;
  random(this: FlowReturn<number>): NumberFlowReturn;
  min(this: FlowReturn<number>, num: number): NumberFlowReturn;
  max(this: FlowReturn<number>, num: number): NumberFlowReturn;
  clamp(this: FlowReturn<number>, min: number, max: number): NumberFlowReturn;
  sign(this: FlowReturn<number>): NumberFlowReturn;
  toFixed(this: FlowReturn<number>, digits?: number): StringFlowReturn;
  toExponential(this: FlowReturn<number>, digits?: number): StringFlowReturn;
  toPrecision(this: FlowReturn<number>, precision?: number): StringFlowReturn;
  flowString(this: FlowReturn<number>, radix?: number): StringFlowReturn;
  flowLocaleString(this: FlowReturn<number>, locales: string | string[], options?: Intl.NumberFormatOptions): StringFlowReturn;
};

export type BooleanFlowReturn = BooleanFlowMethods & FlowReturn<boolean>;

export type BooleanFlowMethods = {
  not(this: FlowReturn<boolean>): BooleanFlowReturn;
  and(this: FlowReturn<boolean>, other: boolean): BooleanFlowReturn;
  or(this: FlowReturn<boolean>, other: boolean): BooleanFlowReturn;
  xor(this: FlowReturn<boolean>, other: boolean): BooleanFlowReturn;
  notEqual(this: FlowReturn<boolean>, other: boolean): BooleanFlowReturn;
  equal(this: FlowReturn<boolean>, other: boolean): BooleanFlowReturn;
  greaterThan(this: FlowReturn<boolean>, other: boolean): BooleanFlowReturn;
  lessThan(this: FlowReturn<boolean>, other: boolean): BooleanFlowReturn;
  greaterThanOrEqual(this: FlowReturn<boolean>, other: boolean): BooleanFlowReturn;
  lessThanOrEqual(this: FlowReturn<boolean>, other: boolean): BooleanFlowReturn;
  flowString(this: FlowReturn<boolean>): StringFlowReturn;
  flowNumber(this: FlowReturn<boolean>): NumberFlowReturn;
};

export type ElementOf<T> = T extends (infer E)[] ? E : never;

export type ArrayFlowReturn<T extends any[]> = ArrayFlowMethods<ElementOf<T>[]> & FlowReturn<ElementOf<T>[]>;

export type ArrayFlowMethods<T extends any[]> = {
  push(this: FlowReturn<T>, ...items: ElementOf<T>[]): ArrayFlowReturn<ElementOf<T>[]>;
  pop(this: FlowReturn<T>): ArrayFlowReturn<ElementOf<T>[]>;
  shift(this: FlowReturn<T>): ArrayFlowReturn<ElementOf<T>[]>;
  unshift(this: FlowReturn<T>, ...items: ElementOf<T>[]): ArrayFlowReturn<ElementOf<T>[]>;
  join(this: FlowReturn<T>, separator: string): StringFlowReturn;
  map<U>(this: FlowReturn<T>, callback: (value: ElementOf<T>, index: number, array: T) => U): ArrayFlowReturn<U[]>;
  filter(this: FlowReturn<T>, callback: (value: ElementOf<T>, index: number, array: T) => boolean): ArrayFlowReturn<ElementOf<T>[]>;
  reduce<U>(this: FlowReturn<T>, callback: (acc: ElementOf<T>, value: ElementOf<T>, index: number, array: T) => U, initialValue: U): U;
  sort(this: FlowReturn<T>, compareFunction?: (a: ElementOf<T>, b: ElementOf<T>) => number): ArrayFlowReturn<ElementOf<T>[]>;
  reverse(this: FlowReturn<T>): ArrayFlowReturn<ElementOf<T>[]>;
  concat(this: FlowReturn<T>, ...arrays: T[]): ArrayFlowReturn<ElementOf<T>[]>;
  slice(this: FlowReturn<T>, start: number, end: number): ArrayFlowReturn<ElementOf<T>[]>;
  splice(this: FlowReturn<T>, start: number, deleteCount: number, ...items: ElementOf<T>[]): ArrayFlowReturn<ElementOf<T>[]>;
  indexOf(this: FlowReturn<T>, searchElement: ElementOf<T>, fromIndex?: number): NumberFlowReturn;
  findLastIndex(this: FlowReturn<T>, searchElement: ElementOf<T>): NumberFlowReturn;
  includes(this: FlowReturn<T>, searchElement: ElementOf<T>, fromIndex?: number): BooleanFlowReturn;
  find(this: FlowReturn<T>, callback: (value: ElementOf<T>, index: number, array: T) => boolean): ElementOf<T>;
  findIndex(this: FlowReturn<T>, callback: (value: ElementOf<T>, index: number, array: T) => boolean): NumberFlowReturn;
  forEach(this: FlowReturn<T>, callback: (value: ElementOf<T>, index: number, array: T) => void): ArrayFlowReturn<ElementOf<T>[]>;
  every(this: FlowReturn<T>, callback: (value: ElementOf<T>, index: number, array: T) => boolean): BooleanFlowReturn;
  some(this: FlowReturn<T>, callback: (value: ElementOf<T>, index: number, array: T) => boolean): BooleanFlowReturn;
  flowString(this: FlowReturn<T>): StringFlowReturn;
  flowLocaleString(this: FlowReturn<T>): StringFlowReturn;
  flowStringfy(this: FlowReturn<T>): StringFlowReturn;
  flowObject(this: FlowReturn<T>): ObjectFlowReturn;
  flowObjectEntries(this: FlowReturn<T>): ObjectFlowReturn;
  flowBoolean(this: FlowReturn<T>): BooleanFlowReturn;
  flowNumber(this: FlowReturn<T>): NumberFlowReturn;
};

export type ObjectFlowReturn = ObjectFlowMethods & FlowReturn<Record<string, any>>;

export type ObjectFlowMethods = {
  keys(this: FlowReturn<Record<string, any>>): ArrayFlowReturn<string[]>;
  values(this: FlowReturn<Record<string, any>>): ArrayFlowReturn<any[]>;
  entries(this: FlowReturn<Record<string, any>>): ArrayFlowReturn<[string, any][]>;
  has(this: FlowReturn<Record<string, any>>, key: string): BooleanFlowReturn;
  set(this: FlowReturn<Record<string, any>>, key: string, value: any): ObjectFlowReturn;
  delete(this: FlowReturn<Record<string, any>>, key: string): ObjectFlowReturn;
  flowString(this: FlowReturn<Record<string, any>>): StringFlowReturn;
};

export type FlowErrorReturn<T> = FlowErrorMethods<T> & FlowReturn<T>;

export type FlowErrorMethods<T> = {
  getError(this: FlowReturn<T>): FlowErrorParams<T>;
  isError(this: FlowReturn<T>): true;
};
