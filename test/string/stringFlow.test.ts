import { describe, it, expect } from "vitest";
import { stringFlow } from "@subflow/string";
import { FlowError } from "@subflow/error";

describe("stringFlow", () => {
  it("should wrap a string and unwrap the same string", () => {
    const m = stringFlow("hello");
    expect(m.get()).toBe("hello");
  });

  it("should not mutate the original value", () => {
    const obj = { count: 1 };
    const m = stringFlow(obj as unknown as string); // to be error;
    expect(m.get()).toBe(obj);
    expect(m.isError()).toBe(true);
    expect(m.getError()).toBeInstanceOf(FlowError);
  });

  it("should be able to chain methods", () => {
    const m = stringFlow("hello").toUpper();
    expect(m.get()).toBe("HELLO");
  });
});
