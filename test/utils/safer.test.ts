import { safer as Safer } from "@subflow/index";
import { safer as SaferJS, isError as isErrorJS } from "@build/index";
import { safer as SaferESM, isError as isErrorESM } from "@build/index.cjs";
import { describe, it, expect } from "vitest";

const testSafer = (safer: typeof Safer, isError: typeof isErrorESM | typeof isErrorJS) => {
  describe("safer", () => {
    describe("정상 케이스", () => {
      it("유효한 값을 전달하면 그 값을 반환해야 합니다", () => {
        const value = "test value";
        const validator = (value: string): string => {
          if (typeof value !== "string") {
            throw new Error("Value must be a string");
          }
          return value;
        };
        const result = safer(value, validator, {
          type: "string",
          value,
          message: "Value error",
          code: "TEST_ERROR",
          timestamp: Date.now(),
          traceId: "traceId",
        });
        expect(result).toBe("test value");
      });
    });

    describe("오류 케이스", () => {
      it("validator가 오류를 던지면 errorFallback을 반환해야 합니다", () => {
        const value = 123; // 문자열이 아닌 값
        const validator = (value: any): string => {
          if (typeof value !== "string") {
            throw new Error("Value must be a string");
          }
          return value;
        };

        const result = safer(value, validator, {
          type: "string",
          value,
          message: "Value error",
          code: "TEST_ERROR",
          timestamp: Date.now(),
          traceId: "traceId",
        });
        expect(isError(result)).toBe(true);
      });

      it("validator가 다른 오류 타입을 던져도 errorFallback을 반환해야 합니다", () => {
        const value = null; // undefined 값
        const validator = (value: any): string => {
          if (value === null) {
            throw new TypeError("Value cannot be null");
          }
          return value;
        };

        const result = safer(value, validator, {
          type: "string",
          value,
          message: "Value error",
          code: "TEST_ERROR",
          timestamp: Date.now(),
          traceId: "traceId",
        });
        expect(isError(result)).toBe(true);
      });
    });

    describe("다양한 타입", () => {
      it("숫자 타입에 대해 작동해야 합니다", () => {
        const value = 42;
        const validator = (value: number): number => {
          if (typeof value !== "number" || isNaN(value)) {
            throw new Error("Value must be a number");
          }
          return value;
        };

        const result = safer(value, validator, {
          type: "number",
          value,
          message: "Value error",
          code: "TEST_ERROR",
          timestamp: Date.now(),
          traceId: "traceId",
        });
        expect(result).toBe(42);
      });

      it("불리언 타입에 대해 작동해야 합니다", () => {
        const value = true;
        const validator = (value: boolean): boolean => {
          if (typeof value !== "boolean") {
            throw new Error("Value must be a boolean");
          }
          return value;
        };

        const result = safer(value, validator, {
          type: "boolean",
          value,
          message: "Value error",
          code: "TEST_ERROR",
          timestamp: Date.now(),
          traceId: "traceId",
        });
        expect(result).toBe(true);
      });

      it("객체 타입에 대해 작동해야 합니다", () => {
        const value = { name: "Test" };
        const validator = (value: any): object => {
          if (typeof value !== "object" || value === null) {
            throw new Error("Value must be an object");
          }
          return value;
        };

        const result = safer(value, validator, {
          type: "object",
          value,
          message: "Value error",
          code: "TEST_ERROR",
          timestamp: Date.now(),
          traceId: "traceId",
        });
        expect(result).toEqual({ name: "Test" });
      });
    });
  });
};

testSafer(SaferJS as typeof Safer, isErrorJS);
testSafer(SaferESM as typeof Safer, isErrorESM);
