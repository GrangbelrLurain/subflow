// test/createMonad.test.ts
import { describe, it, expect } from "vitest";
import {
  createFlow as CreateFlow,
  safer as Safer,
  FlowReturn,
} from "@subflow/index";
import {
  createFlow as CreateFlowJS,
  safer as SaferJS,
  isError as isErrorJS,
  errorFlow as ErrorFlowJS,
} from "@build/index.js";
import {
  createFlow as CreateFlowESM,
  safer as SaferESM,
  isError as isErrorESM,
  errorFlow as ErrorFlowESM,
} from "@build/index.cjs";
import { errorFlow as ErrorFlow } from "@subflow/error";

const testCreateFlow = (
  createFlow: typeof CreateFlow,
  safer: typeof Safer,
  isError: typeof isErrorESM | typeof isErrorJS,
  errorFlow: typeof ErrorFlow
) => {
  describe("createFlow", () => {
    describe("기본 기능", () => {
      it("값을 가진 flow를 생성해야 합니다", () => {
        const value = "test value";
        const init = safer(value, (value: string): string => value, {
          type: "string",
          value,
          message: "Value error",
          code: "TEST_ERROR",
          timestamp: Date.now(),
          traceId: "traceId",
        });

        const flow = createFlow(init, {});
        expect(flow.get()).toBe("test value");
      });

      it("오류가 없을 때 isError가 false를 반환해야 합니다", () => {
        const value = "test value";
        const init = safer(value, (value: string): string => value, {
          type: "string",
          value,
          message: "Value error",
          code: "TEST_ERROR",
          timestamp: Date.now(),
          traceId: "traceId",
        });

        const flow = createFlow(init, {});
        expect(isError(flow)).toBe(false);
      });

      it("오류가 있을 때 isError가 true를 반환해야 합니다", () => {
        const value = 123; // 문자열 타입을 기대하지만 숫자를 전달
        const error = errorFlow({
          type: "string",
          value,
          message: "Value error",
          code: "TEST_ERROR",
          timestamp: Date.now(),
          traceId: "traceId",
        });

        expect(isError(error)).toBe(true);
      });

      it("오류가 없을 때 getError가 undefined를 반환해야 합니다", () => {
        const value = "test value";
        const init = safer(value, (value: string): string => value, {
          type: "string",
          value,
          message: "Value error",
          code: "TEST_ERROR",
          timestamp: Date.now(),
          traceId: "traceId",
        });

        const flow = createFlow(init, {});
        expect(flow.getError()).toBe(undefined);
      });
    });

    describe("확장 기능", () => {
      it("확장 메서드를 적용해야 합니다", () => {
        const value = "test value";
        const extensions = {
          customMethod(this: FlowReturn<string>) {
            return this.get().length;
          },
        };

        const init = safer(value, (value: string): string => value, {
          type: "string",
          value,
          message: "Value error",
          code: "TEST_ERROR",
          timestamp: Date.now(),
          traceId: "traceId",
        });

        const flow = createFlow(init, extensions as any);
        expect(flow.customMethod()).toBe(10); // 'test value'의 길이
      });

      it("오류 상태에서는 확장 메서드가 void 0을 반환해야 합니다", () => {
        const value = 123;

        const extensions = {
          customMethod(this: FlowReturn<string>) {
            return this.get();
          },
        };

        const flow = errorFlow<string, typeof extensions>({
          type: "string",
          value: value as unknown as string,
          message: "Value error",
          code: "TEST_ERROR",
          timestamp: Date.now(),
          traceId: "traceId",
        });
        expect(flow.customMethod()).toBe(undefined);
      });
    });

    describe("불변성", () => {
      it("flow 값이 불변해야 합니다", () => {
        const value = "test value";
        const init = safer(value, (value: string): string => value, {
          type: "string",
          value,
          message: "Value error",
          code: "TEST_ERROR",
          timestamp: Date.now(),
          traceId: "traceId",
        });

        const flow = createFlow(init, {});

        // flow 내부의 _value 속성은 writable: false로 설정되어 있음
        try {
          // @ts-ignore - 테스트를 위해 타입 오류 무시
          flow._value = "changed value";
          // 이 줄까지 실행된다면 테스트는 실패해야 함
          expect(true).toBe(false);
        } catch (e) {
          // TypeError: Cannot assign to read only property '_value' of object '#<Object>'
          expect(e).toBeInstanceOf(TypeError);
        }

        expect(flow.get()).toBe("test value");
      });
    });
  });
};

testCreateFlow(
  CreateFlowJS as typeof CreateFlow,
  SaferJS as typeof Safer,
  isErrorJS,
  ErrorFlowJS as typeof ErrorFlow
);
testCreateFlow(
  CreateFlowESM as typeof CreateFlow,
  SaferESM as typeof Safer,
  isErrorESM,
  ErrorFlowESM as typeof ErrorFlow
);
