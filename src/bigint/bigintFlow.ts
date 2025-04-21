import { createFlow } from "@subflow/core";
import { errorFlow } from "@subflow/error";
import { Methods, BigintFlowMethods, FlowType, Flow } from "@subflow/types";
import { FLOW_TYPE } from "@subflow/meta/flowType";

export const bigIntMethods: BigintFlowMethods = {
  [FLOW_TYPE]: "bigint" satisfies FlowType,
};

export const bigintFlow = <M extends Methods<bigint>>(value: bigint, methods?: M): Flow<bigint> & M & BigintFlowMethods => {
  if (typeof value !== "bigint") {
    return errorFlow<bigint, M & typeof bigIntMethods>({
      type: "bigint",
      value,
      message: "Value must be a bigint",
      code: "BIGINT_FLOW_ERROR",
    });
  }

  return createFlow("bigint", value, methods);
};
