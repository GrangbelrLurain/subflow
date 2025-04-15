import { describe, it, expect } from "vitest";
import { FlowError } from "@build/index.cjs";

describe("FlowError", () => {
  it("FlowError 인스턴스를 생성해야 합니다", () => {
    const error = new FlowError(
      "string",
      "test",
      "테스트 오류",
      "TEST_ERROR",
      Date.now(),
      "traceId"
    );

    expect(error.type).toBe("string");
    expect(error.value).toBe("test");
    expect(error.message).toBe("테스트 오류");
    expect(error.code).toBe("TEST_ERROR");
    expect(error.timestamp).toBeLessThanOrEqual(Date.now());
    expect(error.traceId).toBe("traceId");
  });

  it("선택적 매개변수를 포함한 FlowError 인스턴스를 생성해야 합니다", () => {
    const cause = new Error("원인 오류");
    const error = new FlowError(
      "number",
      42,
      "숫자 오류",
      "NUMBER_ERROR",
      Date.now(),
      "traceId",
      "스택 트레이스",
      cause
    );

    expect(error.type).toBe("number");
    expect(error.value).toBe(42);
    expect(error.message).toBe("숫자 오류");
    expect(error.code).toBe("NUMBER_ERROR");
    expect(error.timestamp).toBeLessThanOrEqual(Date.now());
    expect(error.traceId).toBe("traceId");
    expect(error.stack).toBe("스택 트레이스");
    expect(error.cause).toBe(cause);
  });
});
