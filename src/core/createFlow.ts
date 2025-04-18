import { Flow, Methods } from "@subflow/types/core";
import { FlowType } from "@subflow/types/meta";
import { FLOW_TYPE } from "@subflow/meta/flowType";

export const VALUE = Symbol("value");

export const createFlow = <F extends Exclude<FlowType, "error">, T extends any, E extends Methods<T> = {}>(flowType: F, init: T, methods?: E) => {
  const flowMonad = {
    ...(methods || {}),
    [FLOW_TYPE]: flowType,
    get(this: { [VALUE]: T }) {
      return this[VALUE];
    },
    isError: false,
    getError(this: { [VALUE]: T }) {
      return undefined;
    },
  };

  return Object.create(flowMonad, {
    [VALUE]: {
      value: init,
      writable: false,
      configurable: false,
    },
  }) as Flow<T> & E;
};
