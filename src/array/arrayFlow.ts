import { createFlow } from "@subflow/core";
import { Flow, Methods } from "@subflow/types/core";
import { ArrayFlowMethods } from "@subflow/types/flows";
import { errorFlow } from "@subflow/error";
import { arrayMethods } from "./arrayMethods";

export const arrayFlow = <T extends any[], M extends Methods<any[]>>(
  value: T,
  customMethods?: M
): Flow<T> & M & ArrayFlowMethods => {
  if (!Array.isArray(value)) {
    return errorFlow<T, M & typeof arrayMethods>({
      type: "array",
      value,
      message: "Value must be an array",
      code: "ARRAY_FLOW_ERROR",
    });
  }

  return createFlow("array", value, customMethods);
};

export default arrayFlow;
