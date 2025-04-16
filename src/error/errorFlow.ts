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

  const errorMonad = {
    _value: enrichedError.value,
    isError: IS_FLOW_ERROR,
    getError: () => enrichedError,
    get: () => enrichedError.value,
  };

  ErrorManager.add(enrichedError);

  return new Proxy(errorMonad, {
    get(_, prop: string | symbol) {
      if (prop in errorMonad) {
        return errorMonad[prop as keyof typeof errorMonad];
      }
      return () => undefined;
    },
  }) as unknown as FlowReturn<T> & M;
};

export function isError<T>(flow: any): flow is ErrorFlow<T> {
  return flow?.isError === IS_FLOW_ERROR;
}
