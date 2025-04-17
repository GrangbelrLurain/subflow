import { Methods } from "@subflow/types/core";
import { FlowErrorParams, ErrorFlow } from "@subflow/types/error";
import { ErrorManager } from "./errorManager";
import { FLOW_TYPE, isErrorFlow } from "@subflow/meta/flowType";

export const errorFlow = <T, M extends Methods<T> = {}>(error: FlowErrorParams<T>) => {
  const enrichedError: FlowErrorParams<T> = {
    timestamp: Date.now(),
    traceId: crypto.randomUUID(),
    ...error,
  };

  const errorMonad = {
    _value: enrichedError.value,
    [FLOW_TYPE]: "error",
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
  }) as unknown as ErrorFlow<T> & M;
};

export function isError<E>(flow: ErrorFlow<any> | E): flow is ErrorFlow<any> {
  if (typeof flow === "object" && flow !== null && FLOW_TYPE in flow) {
    return isErrorFlow(flow);
  }
  return false;
}
