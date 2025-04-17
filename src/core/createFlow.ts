import { FlowReturn, Methods } from "@subflow/types/core";
import { FlowType } from "@subflow/types/meta";
import { FLOW_TYPE } from "@subflow/meta/flowType";

export const createFlow = <F extends Exclude<FlowType, "error">, T extends any, E extends Methods<T> = {}>(flowType: F, init: T, methods?: E) => {
  const flowMonad = Object.create({
    ...(methods || {}),
    [FLOW_TYPE]: flowType,
    get(this: { _value: T }) {
      return this._value;
    },
    isError: false,
    getError(this: { _value: T }) {
      return undefined;
    },
  });

  return Object.create(flowMonad, {
    _value: {
      value: init,
      writable: false,
      configurable: false,
    },
  }) as FlowReturn<T> & E;
};
