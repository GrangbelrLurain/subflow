// test/createMonad.test.ts
import { describe, it, expect } from "vitest";
import { createFlow } from "@subflow/core";
import { safer } from "@subflow/utils";
import { FlowError } from "@subflow/error";

describe("createFlow", () => {
  it("should wrap a value and unwrap the same value", () => {
    const m = createFlow(42);
    expect(m.get()).toBe(42);
  });

  it("should not mutate the original value", () => {
    const obj = { count: 1 };

    const init = safer(
      obj,
      (value: typeof obj) => {
        if (typeof value !== "object" || value === null) {
          throw new Error("Value must be an object");
        }

        return value;
      },
      new FlowError("object", obj, "Value must be an object", "OBJECT_FLOW_ERROR", Date.now(), "traceId")
    );

    const m = createFlow(init);

    expect(m.get().count).toBe(1);
  });
});
