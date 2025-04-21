import { Methods } from "@subflow/types/core";
import { SafeFlowType } from "@subflow/types/meta";
import { CUSTOM_METHODS, FLOW_TYPE, VALUE } from "@subflow/meta/flowType";
import { numberMethods } from "@subflow/number";
import { stringMethods } from "@subflow/string";
import { booleanMethods } from "@subflow/boolean";
import { SwitchMethods } from "@subflow/types";
import { bigIntMethods } from "@subflow/bigint";
import { objectMethods } from "@subflow/object";
import { arrayMethods } from "@subflow/array";

const BaseMethods = Object.freeze({
  isError: false,
  get(this: { [VALUE]: any }) {
    return this[VALUE];
  },
  getError() {
    return undefined;
  },
});

const defaultMethodsCache: Record<
  SafeFlowType,
  SwitchMethods<SafeFlowType> & typeof BaseMethods
> = {
  number: Object.freeze({
    ...BaseMethods,
    ...numberMethods,
  }),
  string: Object.freeze({
    ...BaseMethods,
    ...stringMethods,
  }),
  boolean: Object.freeze({
    ...BaseMethods,
    ...booleanMethods,
  }),
  bigint: Object.freeze({
    ...BaseMethods,
    ...bigIntMethods,
  }),
  array: Object.freeze({
    ...BaseMethods,
    ...arrayMethods,
  }),
  object: Object.freeze({
    ...BaseMethods,
    ...objectMethods,
  }),
};

const customMethodCache = new WeakMap<object, Record<string, any>>();

const mergeMethods = <T, F extends SafeFlowType, M extends Methods<T>>(
  flowType: F,
  customMethods?: M
): typeof BaseMethods & SwitchMethods<F> & M => {
  if (!customMethods)
    return defaultMethodsCache[flowType] as typeof BaseMethods &
      SwitchMethods<F> &
      M;
  if (customMethodCache.has(customMethods))
    return customMethodCache.get(customMethods)! as typeof BaseMethods &
      SwitchMethods<F> &
      M;
  const merged = { ...defaultMethodsCache[flowType], ...customMethods };
  const frozen = Object.freeze(merged);
  customMethodCache.set(customMethods, frozen);
  return frozen as typeof BaseMethods & SwitchMethods<F> & M;
};

export const createFlow = <F extends SafeFlowType, T, M extends Methods<T>>(
  flowType: F,
  init: T,
  methods?: M
) => {
  const allMethods = mergeMethods<T, F, M>(flowType, methods);
  const flow = Object.freeze({
    ...allMethods,
    [VALUE]: init,
    [FLOW_TYPE]: flowType,
    [CUSTOM_METHODS]: methods,
  });
  return flow;
};
