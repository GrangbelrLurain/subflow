import { VALUE, CUSTOM_METHODS } from "@subflow/core";
import { FLOW_TYPE } from "@subflow/meta/flowType";
import { ErrorFlow, FlowType } from "@subflow/types";
/**
 * 단일 확장 메서드의 타입 정의
 * @template T 확장 메서드가 적용될 객체 타입
 * @template Args 메서드 인자들의 타입
 * @template Return 메서드 반환값의 타입
 */
export type Method<T, Args extends any[] = any[], Return = any> = (
  this: DefaultExtensions<T>,
  ...args: Args
) => Return;

/**
 * 확장 메서드들의 컬렉션 타입 정의
 * @template T 확장 메서드들이 적용될 객체 타입
 * @template EM 확장 메서드들의 맵 타입 (선택적)
 */
export type Methods<
  T,
  EM extends Record<string, Method<T>> = Record<string, Method<T>>
> = EM;

export type SafeFlow<T> = {
  [FLOW_TYPE]: Exclude<FlowType, "error">;
  [VALUE]: T;
  [CUSTOM_METHODS]: Methods<T>;
  get: () => T;
  getError: () => undefined;
};

export type DefaultExtensions<T> = SafeFlow<T> | ErrorFlow<T>;

export type Flow<T> = DefaultExtensions<T>;

export type CreateFlow<T> = (value: T) => Flow<T>;
