import { IS_FLOW_ERROR } from "@subflow/error";
import { FlowReturn, Methods } from "@subflow/types/core";

export const createFlow = <T extends any, E extends Methods<T> = {}>(init: T, methods?: E) => {
  const flowMonad = Object.create({
    get(this: { _value: T }) {
      return this._value;
    },
    ...(methods || {}),
  });

  if (methods && !("isError" in methods)) {
    flowMonad.isError = false;
  }

  if (methods && !("getError" in methods)) {
    flowMonad.getError = function (this: { _value: T }) {
      return undefined;
    };
  }

  return Object.create(flowMonad, {
    _value: {
      value: init,
      writable: false,
      configurable: false,
    },
  }) as FlowReturn<T> & E;
};
