import { FlowReturn, Methods } from "@subflow/types/core";
import { FlowErrorParams, ErrorFlow } from "@subflow/types/error";
import ErrorManager from "./errorManager";

export const IS_FLOW_ERROR = Symbol("isFlowError");

export const errorFlow = <T, M extends Methods<T> = {}>(error: FlowErrorParams<T>) => {
  const enrichedError: FlowErrorParams<T> = {
    timestamp: Date.now(),
    traceId: crypto.randomUUID(),
    ...error,
  };

  const base = {
    _value: error.value,
    get() {
      return error.value;
    },
    getError() {
      return error;
    },
    isError: IS_FLOW_ERROR,
  };

  ErrorManager.add(enrichedError);

  return new Proxy(base, {
    get(target, prop: string | symbol) {
      if (prop in target) return Reflect.get(target, prop);

      return () => undefined;
    },
  }) as unknown as FlowReturn<T> & M;
};

export function isError<T>(flow: any): flow is ErrorFlow<T> {
  return flow?.isError === IS_FLOW_ERROR;
}
