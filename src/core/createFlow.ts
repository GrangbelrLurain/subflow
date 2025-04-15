import { FlowReturn, Methods } from "@subflow/types/core";
import { FlowError } from "@subflow/error";

export const createFlow = <T extends any, E extends Methods<T> = {}>(init: T | FlowError<T>, extensions?: E) => {
  const flowMonad = Object.create({
    get(this: { _value: T }) {
      return this._value;
    },
    getError(this: { _value: T }) {
      return undefined;
    },
    isError(this: { _value: T }) {
      return false;
    },
    ...(extensions || {}),
  });

  if (!(init instanceof FlowError)) {
    return Object.create(flowMonad, {
      _value: {
        value: init,
        writable: false,
        configurable: false,
      },
    }) as FlowReturn<T> & E;
  }

  const errorMonad = Object.create({
    getError(this: { _value: T }) {
      return init;
    },
    isError(this: { _value: T }) {
      return true;
    },
    get(this: { _value: T }) {
      return init.value;
    },
    ...Object.keys(extensions || {}).reduce<PropertyDescriptorMap>((acc, key) => {
      return { ...acc, [key]: () => void 0 } as unknown as PropertyDescriptorMap;
    }, {}),
  });

  return Object.create(errorMonad, {
    _value: {
      value: init.value,
      writable: false,
      configurable: false,
    },
  }) as FlowReturn<T> & E;
};
