import { Extensions, FlowMethod } from "@subflow/types/core";

export const createMethod = <T, E extends Extensions<E>>(method: FlowMethod<T, E>) => {
  return method;
};
