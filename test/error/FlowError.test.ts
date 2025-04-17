import { describe, it, expect } from "vitest";
import { errorFlow as ErrorFlow, isError } from "@subflow/error";
import { errorFlow as ErrorFlowESM, ErrorManager as ErrorManagerESM } from "@build/index.cjs";
import { errorFlow as ErrorFlowJS, ErrorManager as ErrorManagerJS } from "@build/index";

const testFlowError = (errorFlow: typeof ErrorFlow<any>, ErrorManager: typeof ErrorManagerESM | typeof ErrorManagerJS) => {
  describe("FlowError", () => {
    it("FlowError 인스턴스를 생성해야 합니다", () => {
      const error = errorFlow({ type: "string", value: "test", message: "테스트 오류", code: "TEST_ERROR", timestamp: Date.now(), traceId: "traceId" });

      if (isError(error)) {
        expect(error.getError().type).toBe("string");
        expect(error.getError().value).toBe("test");
        expect(error.getError().message).toBe("테스트 오류");
        expect(error.getError().code).toBe("TEST_ERROR");
        expect(error.getError().timestamp).toBeLessThanOrEqual(Date.now());
        expect(error.getError().traceId).toBe("traceId");
      }
    });

    it("선택적 매개변수를 포함한 FlowError 인스턴스를 생성해야 합니다", () => {
      const cause = new Error("원인 오류");
      const error = errorFlow({ type: "number", value: 42, message: "숫자 오류", code: "NUMBER_ERROR", timestamp: Date.now(), traceId: "traceId", stack: "스택 트레이스", cause });

      if (isError(error)) {
        expect(error.getError().type).toBe("number");
        expect(error.getError().value).toBe(42);
        expect(error.getError().message).toBe("숫자 오류");
        expect(error.getError().code).toBe("NUMBER_ERROR");
        expect(error.getError().timestamp).toBeLessThanOrEqual(Date.now());
        expect(error.getError().traceId).toBe("traceId");
        expect(error.getError().stack).toBe("스택 트레이스");
        expect(error.getError().cause).toBe(cause);
      }
    });
  });

  describe("ErrorManager 메서드", () => {
    it("add: 오류를 추가해야 합니다", () => {
      const error = errorFlow({ type: "string", value: "test", message: "테스트 오류", code: "TEST_ERROR", timestamp: Date.now(), traceId: "traceId" });
      ErrorManager.add(error.getError());
      expect(ErrorManager.view()).toContain(error.getError());
    });

    it("clear: 오류를 초기화해야 합니다", () => {
      const error = errorFlow({ type: "string", value: "test", message: "테스트 오류", code: "TEST_ERROR", timestamp: Date.now(), traceId: "traceId" });
      ErrorManager.add(error.getError());
      ErrorManager.clear();
      expect(ErrorManager.view()).toEqual([]);
    });
  });
};

testFlowError(ErrorFlowESM as unknown as typeof ErrorFlow<any>, ErrorManagerESM);
testFlowError(ErrorFlowJS as unknown as typeof ErrorFlow<any>, ErrorManagerJS);
