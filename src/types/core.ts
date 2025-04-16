import { FlowErrorParams, ErrorFlow } from "@subflow/types/error";
/**
 * 단일 확장 메서드의 타입 정의
 * @template T 확장 메서드가 적용될 객체 타입
 * @template Args 메서드 인자들의 타입
 * @template Return 메서드 반환값의 타입
 */
export type Method<T, Args extends any[] = any[], Return = any> = (this: DefaultExtensions<T>, ...args: Args) => Return;

/**
 * 확장 메서드들의 컬렉션 타입 정의
 * @template T 확장 메서드들이 적용될 객체 타입
 * @template EM 확장 메서드들의 맵 타입 (선택적)
 */
export type Methods<T, EM extends Record<string, Method<T>> = Record<string, Method<T>>> = EM;

export type DefaultExtensions<T> =
  | {
      get: () => T;
      getError: () => undefined;
      isError: false;
    }
  | ErrorFlow<T>;

export type FlowReturn<T> = DefaultExtensions<T>;

export type Flow<T> = (value: T) => FlowReturn<T>;

export type FlowType = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array";
