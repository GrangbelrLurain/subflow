import { FlowReturn } from "@subflow/types/core";
import { FlowError } from "@subflow/error";
import { safer } from "@subflow/utils";

export const createFlow = <T extends any, E extends Record<string, unknown> = {}>(init: ReturnType<typeof safer<T>>, extensions?: E): FlowReturn<T, E> => {
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
    });
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
      return { ...acc, [key]: { value: () => void 0, writable: true, configurable: true } };
    }, {}),
  });

  return Object.create(errorMonad, {
    _value: {
      value: init.value,
      writable: false,
      configurable: false,
    },
  });
};
