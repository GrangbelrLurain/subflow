import { safer } from "../../src/utils/safer";
import { FlowError } from "../../src/error/FlowError";
import { describe, it, expect } from "vitest";

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
      const errorFallback = new FlowError("string", value, "Value error", "TEST_ERROR", Date.now(), "traceId");

      const result = safer(value, validator, errorFallback);
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
      const errorFallback = new FlowError("string", value, "Value error", "TEST_ERROR", Date.now(), "traceId");

      const result = safer(value, validator, errorFallback);
      expect(result).toBe(errorFallback);
    });

    it("validator가 다른 오류 타입을 던져도 errorFallback을 반환해야 합니다", () => {
      const value = null; // undefined 값
      const validator = (value: any): string => {
        if (value === null) {
          throw new TypeError("Value cannot be null");
        }
        return value;
      };
      const errorFallback = new FlowError("string", value, "Value error", "TEST_ERROR", Date.now(), "traceId");

      const result = safer(value, validator, errorFallback);
      expect(result).toBe(errorFallback);
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
      const errorFallback = new FlowError("number", value, "Value error", "TEST_ERROR", Date.now(), "traceId");

      const result = safer(value, validator, errorFallback);
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
      const errorFallback = new FlowError("boolean", value, "Value error", "TEST_ERROR", Date.now(), "traceId");

      const result = safer(value, validator, errorFallback);
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
      const errorFallback = new FlowError("object", value, "Value error", "TEST_ERROR", Date.now(), "traceId");

      const result = safer(value, validator, errorFallback);
      expect(result).toEqual({ name: "Test" });
    });
  });
});
