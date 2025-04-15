import { describe, it, expect } from "vitest";
import { numberFlow as NumberFlow } from "@subflow/number";
import { numberFlow as NumberFlowJS } from "@build/index.js";
import { numberFlow as NumberFlowESM } from "@build/index.cjs";

const testNumberFlow = (numberFlow: typeof NumberFlow) => {
  describe("numberFlow", () => {
    describe("기본 기능", () => {
      it("숫자 값을 가진 flow를 생성해야 합니다", () => {
        const flow = numberFlow(42);
        expect(flow.get()).toBe(42);
      });

      it("오류가 없을 때 isError가 false를 반환해야 합니다", () => {
        const flow = numberFlow(42);
        expect(flow.isError()).toBe(false);
      });
    });

    describe("산술 연산 메서드", () => {
      it("add: 두 숫자를 더해야 합니다", () => {
        const flow = numberFlow(5);
        expect(flow.add(3).get()).toBe(8);
      });

      it("subtract: 두 숫자를 빼야 합니다", () => {
        const flow = numberFlow(10);
        expect(flow.subtract(4).get()).toBe(6);
      });

      it("multiply: 두 숫자를 곱해야 합니다", () => {
        const flow = numberFlow(6);
        expect(flow.multiply(7).get()).toBe(42);
      });

      it("divide: 두 숫자를 나눠야 합니다", () => {
        const flow = numberFlow(20);
        expect(flow.divide(5).get()).toBe(4);
      });

      it("modulo: 나머지 연산을 수행해야 합니다", () => {
        const flow = numberFlow(17);
        expect(flow.modulo(5).get()).toBe(2);
      });

      it("power: 거듭제곱 연산을 수행해야 합니다", () => {
        const flow = numberFlow(2);
        expect(flow.power(3).get()).toBe(8);
      });

      it("sqrt: 제곱근을 계산해야 합니다", () => {
        const flow = numberFlow(16);
        expect(flow.sqrt().get()).toBe(4);
      });
    });

    describe("반올림 메서드", () => {
      it("round: 가장 가까운 정수로 반올림해야 합니다", () => {
        const flow = numberFlow(3.7);
        expect(flow.round().get()).toBe(4);
      });

      it("floor: 소수점 이하를 버려야 합니다", () => {
        const flow = numberFlow(3.7);
        expect(flow.floor().get()).toBe(3);
      });

      it("ceil: 소수점 이하를 올려야 합니다", () => {
        const flow = numberFlow(3.2);
        expect(flow.ceil().get()).toBe(4);
      });
    });

    describe("유틸리티 메서드", () => {
      it("abs: 절대값을 반환해야 합니다", () => {
        const flow = numberFlow(-42);
        expect(flow.abs().get()).toBe(42);
      });

      it("random: 0과 1 사이의 난수를 생성해야 합니다", () => {
        const flow = numberFlow(42);
        const randomValue = flow.random().get();
        expect(randomValue).toBeGreaterThanOrEqual(0);
        expect(randomValue).toBeLessThan(1);
      });

      it("min: 두 숫자 중 작은 값을 반환해야 합니다", () => {
        const flow = numberFlow(10);
        expect(flow.min(5).get()).toBe(5);
      });

      it("max: 두 숫자 중 큰 값을 반환해야 합니다", () => {
        const flow = numberFlow(5);
        expect(flow.max(10).get()).toBe(10);
      });

      it("clamp: 값을 주어진 범위 내로 제한해야 합니다", () => {
        const flow = numberFlow(15);
        expect(flow.clamp(0, 10).get()).toBe(10);
      });

      it("sign: 숫자의 부호를 반환해야 합니다", () => {
        expect(numberFlow(5).sign().get()).toBe(1);
        expect(numberFlow(-5).sign().get()).toBe(-1);
        expect(numberFlow(0).sign().get()).toBe(0);
      });
    });

    describe("문자열 변환 메서드", () => {
      it("toFixed: 지정된 소수점 자리수로 문자열을 반환해야 합니다", () => {
        const flow = numberFlow(3.14159);
        expect(flow.toFixed(2).get()).toBe("3.14");
      });

      it("toExponential: 지수 표기법으로 문자열을 반환해야 합니다", () => {
        const flow = numberFlow(1234);
        expect(flow.toExponential(2).get()).toBe("1.23e+3");
      });

      it("toPrecision: 지정된 정밀도로 문자열을 반환해야 합니다", () => {
        const flow = numberFlow(3.14159);
        expect(flow.toPrecision(3).get()).toBe("3.14");
      });

      it("flowLocaleString: 로케일에 맞는 문자열을 반환해야 합니다", () => {
        const flow = numberFlow(1234.56);
        expect(flow.flowLocaleString("ko-KR").get()).toBe("1,234.56");
      });

      it("flowString: 문자열로 변환해야 합니다", () => {
        const flow = numberFlow(42);
        expect(flow.flowString().get()).toBe("42");
      });
    });

    describe("메서드 체이닝", () => {
      it("여러 메서드를 체이닝할 수 있어야 합니다", () => {
        const flow = numberFlow(5);
        const result = flow.add(3).multiply(2).subtract(1);
        expect(result.get()).toBe(15);
      });
    });
  });
};

testNumberFlow(NumberFlowJS);
testNumberFlow(NumberFlowESM);
