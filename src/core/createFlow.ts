import { Methods } from "@subflow/types/core";
import { SafeFlowType } from "@subflow/types/meta";
import { FLOW_TYPE } from "@subflow/meta/flowType";
import { numberMethods } from "@subflow/number";
import { stringMethods } from "@subflow/string";
import { booleanMethods } from "@subflow/boolean";
import { SwitchMethods } from "@subflow/types";

export const VALUE = Symbol("value");
export const CUSTOM_METHODS = Symbol("customMethods");

const BaseMethods = Object.freeze({
  isError: false,
  get(this: { [VALUE]: any }) {
    return this[VALUE];
  },
  getError() {
    return undefined;
  },
});

const defaultMethodsCache: Record<SafeFlowType, SwitchMethods<SafeFlowType>> = {
  number: Object.freeze({
    ...BaseMethods,
    ...numberMethods,
    [FLOW_TYPE]: "number",
  }),
  string: Object.freeze({
    ...BaseMethods,
    ...stringMethods,
    [FLOW_TYPE]: "string",
  }),
  boolean: Object.freeze({
    ...BaseMethods,
    ...booleanMethods,
    [FLOW_TYPE]: "boolean",
  }),
  bigint: Object.freeze({
    ...BaseMethods,
    [FLOW_TYPE]: "bigint",
  }),
  object: Object.freeze({
    ...BaseMethods,
    ...objectMethods,
    [FLOW_TYPE]: "object",
  }),
  array: Object.freeze({
    ...BaseMethods,
    ...arrayMethods,
    [FLOW_TYPE]: "array",
  }),
};

const customMethodCache = new WeakMap<object, Record<string, any>>();

const mergeMethods = <T, F extends SafeFlowType, M extends Methods<T>>(
  flowType: F,
  customMethods?: M
) => {
  if (!customMethods) return defaultMethodsCache[flowType];
  if (customMethodCache.has(customMethods))
    return customMethodCache.get(customMethods)!;
  const merged = { ...defaultMethodsCache[flowType], ...customMethods };
  const frozen = Object.freeze(merged);
  customMethodCache.set(customMethods, frozen);
  return frozen;
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
