import { FlowReturn, Methods } from "@subflow/types/core";
import { FlowErrorParams, ErrorFlow } from "@subflow/types/error";
import ErrorManager from "./errorManager";

export const IS_FLOW_ERROR = Symbol("isFlowError");

export const errorFlow = <T, M extends Methods<T> = {}>(
  error: FlowErrorParams<T>
) => {
  const enrichedError: FlowErrorParams<T> = {
    timestamp: Date.now(),
    traceId: crypto.randomUUID(),
    ...error,
  };

  ErrorManager.add(enrichedError);

  return new Proxy(
    {},
    {
      get(_, prop: string | symbol) {
        if (prop === "get") {
          return () => enrichedError.value;
        }
        if (prop === "getError") {
          return () => enrichedError;
        }
        if (prop === "isError") {
          return IS_FLOW_ERROR;
        }

        return () => undefined;
      },
    }
  ) as unknown as FlowReturn<T> & M;
};

export function isError<T>(flow: any): flow is ErrorFlow<T> {
  return flow?.isError === IS_FLOW_ERROR;
}
