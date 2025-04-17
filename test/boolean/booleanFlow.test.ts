import { describe, it, expect } from "vitest";
import { booleanFlow as BooleanFlow } from "@subflow/boolean";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { booleanFlow as BooleanFlowJS, isError as isErrorJS } from "@build/index";
import { booleanFlow as BooleanFlowESM, isError as isErrorESM } from "@build/index.cjs";

const testBooleanFlow = (booleanFlow: typeof BooleanFlow, isError: typeof isErrorESM | typeof isErrorJS) => {
  describe("booleanFlow", () => {
    describe("기본 기능", () => {
      it("불리언 값을 가진 flow를 생성해야 합니다", () => {
        const flowTrue = booleanFlow(true);
        const flowFalse = booleanFlow(false);

        expect(flowTrue.get()).toBe(true);
        expect(flowFalse.get()).toBe(false);
      });

      it("오류가 없을 때 isError가 false를 반환해야 합니다", () => {
        const flow = booleanFlow(true);
        expect(isError(flow)).toBe(false);
      });
    });

    describe("논리 연산 메서드", () => {
      it("not: 불리언 값을 부정해야 합니다", () => {
        const flowTrue = booleanFlow(true);
        const flowFalse = booleanFlow(false);

        expect(flowTrue.not().get()).toBe(false);
        expect(flowFalse.not().get()).toBe(true);
      });

      it("and: 논리 AND 연산을 수행해야 합니다", () => {
        const flowTrue = booleanFlow(true);
        const flowFalse = booleanFlow(false);

        expect(flowTrue.and(true).get()).toBe(true);
        expect(flowTrue.and(false).get()).toBe(false);
        expect(flowFalse.and(true).get()).toBe(false);
        expect(flowFalse.and(false).get()).toBe(false);
      });

      it("or: 논리 OR 연산을 수행해야 합니다", () => {
        const flowTrue = booleanFlow(true);
        const flowFalse = booleanFlow(false);

        expect(flowTrue.or(true).get()).toBe(true);
        expect(flowTrue.or(false).get()).toBe(true);
        expect(flowFalse.or(true).get()).toBe(true);
        expect(flowFalse.or(false).get()).toBe(false);
      });

      it("xor: 논리 XOR 연산을 수행해야 합니다", () => {
        const flowTrue = booleanFlow(true);
        const flowFalse = booleanFlow(false);

        expect(flowTrue.xor(true).get()).toBe(false);
        expect(flowTrue.xor(false).get()).toBe(true);
        expect(flowFalse.xor(true).get()).toBe(true);
        expect(flowFalse.xor(false).get()).toBe(false);
      });
    });

    describe("비교 연산 메서드", () => {
      it("equal: 두 불리언 값이 같은지 확인해야 합니다", () => {
        const flowTrue = booleanFlow(true);
        const flowFalse = booleanFlow(false);

        expect(flowTrue.equal(true).get()).toBe(true);
        expect(flowTrue.equal(false).get()).toBe(false);
        expect(flowFalse.equal(true).get()).toBe(false);
        expect(flowFalse.equal(false).get()).toBe(true);
      });

      it("notEqual: 두 불리언 값이 다른지 확인해야 합니다", () => {
        const flowTrue = booleanFlow(true);
        const flowFalse = booleanFlow(false);

        expect(flowTrue.notEqual(true).get()).toBe(false);
        expect(flowTrue.notEqual(false).get()).toBe(true);
        expect(flowFalse.notEqual(true).get()).toBe(true);
        expect(flowFalse.notEqual(false).get()).toBe(false);
      });
    });

    describe("타입 변환 메서드", () => {
      it("toString: 불리언 값을 문자열로 변환해야 합니다", () => {
        const flowTrue = booleanFlow(true);
        const flowFalse = booleanFlow(false);

        expect(flowTrue.flowString().get()).toBe("true");
        expect(flowFalse.flowString().get()).toBe("false");
      });

      it("toNumber: 불리언 값을 숫자로 변환해야 합니다", () => {
        const flowTrue = booleanFlow(true);
        const flowFalse = booleanFlow(false);

        expect(flowTrue.flowNumber().get()).toBe(1);
        expect(flowFalse.flowNumber().get()).toBe(0);
      });
    });

    describe("메서드 체이닝", () => {
      it("여러 메서드를 체이닝할 수 있어야 합니다", () => {
        const flow = booleanFlow(true);
        const result = flow.not().and(false).or(true);
        expect(result.get()).toBe(true);
      });
    });
  });
};

testBooleanFlow(BooleanFlowJS as unknown as typeof BooleanFlow, isErrorJS);
testBooleanFlow(BooleanFlowESM as unknown as typeof BooleanFlow, isErrorESM);
