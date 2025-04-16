import { stringFlow as StringFlow } from "@subflow/string";
import { stringFlow as StringFlowJS } from "@build/index.js";
import { stringFlow as StringFlowESM } from "@build/index.cjs";
import { describe, it, expect } from "vitest";
import { isError } from "@subflow/error";

const testStringFlow = (stringFlow: typeof StringFlow) => {
  describe("stringFlow", () => {
    describe("기본 기능", () => {
      it("문자열 값을 가진 flow를 생성해야 합니다", () => {
        const flow = stringFlow("hello");
        expect(flow.get()).toBe("hello");
      });

      it("오류가 없을 때 isError가 false를 반환해야 합니다", () => {
        const flow = stringFlow("hello");
        expect(isError(flow)).toBe(false);
      });
    });

    describe("문자열 변환 메서드", () => {
      it("toUpper: 문자열을 대문자로 변환해야 합니다", () => {
        const flow = stringFlow("hello");
        const result = flow.toUpper();
        expect(result.get()).toBe("HELLO");
      });

      it("toLower: 문자열을 소문자로 변환해야 합니다", () => {
        const flow = stringFlow("HELLO");
        const result = flow.toLower();
        expect(result.get()).toBe("hello");
      });

      it("trim: 문자열의 앞뒤 공백을 제거해야 합니다", () => {
        const flow = stringFlow("  hello  ");
        const result = flow.trim();
        expect(result.get()).toBe("hello");
      });

      it("reverse: 문자열을 뒤집어야 합니다", () => {
        const flow = stringFlow("hello");
        const result = flow.reverse();
        expect(result.get()).toBe("olleh");
      });

      it("replace: 문자열의 일부를 대체해야 합니다", () => {
        const flow = stringFlow("hello world");
        const result = flow.replace("world", "javascript");
        expect(result.get()).toBe("hello javascript");
      });

      it("padStart: 문자열의 시작 부분에 문자를 채워야 합니다", () => {
        const flow = stringFlow("5");
        const result = flow.padStart(3, "0");
        expect(result.get()).toBe("005");
      });

      it("padEnd: 문자열의 끝 부분에 문자를 채워야 합니다", () => {
        const flow = stringFlow("5");
        const result = flow.padEnd(3, "0");
        expect(result.get()).toBe("500");
      });

      it("concat: 문자열을 연결해야 합니다", () => {
        const flow = stringFlow("hello");
        const result = flow.concat(" ", "world");
        expect(result.get()).toBe("hello world");
      });
    });

    describe("문자열 탐색 메서드", () => {
      it("startsWith: 문자열이 특정 문자열로 시작하는지 확인해야 합니다", () => {
        const flow = stringFlow("hello world");
        expect(flow.startsWith("hello").get()).toBe(true);
        expect(flow.startsWith("world").get()).toBe(false);
      });

      it("endsWith: 문자열이 특정 문자열로 끝나는지 확인해야 합니다", () => {
        const flow = stringFlow("hello world");
        expect(flow.endsWith("world").get()).toBe(true);
        expect(flow.endsWith("hello").get()).toBe(false);
      });

      it("includes: 문자열이 특정 문자열을 포함하는지 확인해야 합니다", () => {
        const flow = stringFlow("hello world");
        expect(flow.includes("llo world").get()).toBe(true);
        expect(flow.includes("goodbye").get()).toBe(false);
      });

      it("indexOf: 문자열에서 특정 문자열의 인덱스를 반환해야 합니다", () => {
        const flow = stringFlow("hello world");
        expect(flow.indexOf("world").get()).toBe(6);
        expect(flow.indexOf("goodbye").get()).toBe(-1);
      });

      it("lastIndexOf: 문자열에서 특정 문자열의 마지막 인덱스를 반환해야 합니다", () => {
        const flow = stringFlow("hello world hello");
        expect(flow.lastIndexOf("hello").get()).toBe(12);
      });
    });

    describe("문자열 추출 메서드", () => {
      it("charAt: 특정 위치의 문자를 반환해야 합니다", () => {
        const flow = stringFlow("hello");
        expect(flow.charAt(1).get()).toBe("e");
      });

      it("charCodeAt: 특정 위치의 문자 코드를 반환해야 합니다", () => {
        const flow = stringFlow("hello");
        expect(flow.charCodeAt(1).get()).toBe("e".charCodeAt(0));
      });

      it("slice: 문자열의 일부를 추출해야 합니다", () => {
        const flow = stringFlow("hello world");
        expect(flow.slice(0, 5).get()).toBe("hello");
      });

      it("substring: 문자열의 일부를 추출해야 합니다", () => {
        const flow = stringFlow("hello world");
        expect(flow.substring(6, 11).get()).toBe("world");
      });

      it("substr: 문자열의 일부를 추출해야 합니다", () => {
        const flow = stringFlow("hello world");
        expect(flow.substr(6, 5).get()).toBe("world");
      });

      it("split: 문자열을 특정 구분자로 분할해야 합니다", () => {
        const flow = stringFlow("hello,world");
        expect(flow.split(",").get()).toEqual(["hello", "world"]);
      });
    });

    describe("타입 변환 메서드", () => {
      it("toNumber: 문자열을 숫자로 변환해야 합니다", () => {
        const flow = stringFlow("42");
        expect(flow.flowNumber().get()).toBe(42);
      });

      it("toFloat: 문자열을 부동 소수점 숫자로 변환해야 합니다", () => {
        const flow = stringFlow("3.14");
        expect(flow.flowFloatNumber().get()).toBe(3.14);
      });

      it("toBoolean: 문자열을 불리언으로 변환해야 합니다", () => {
        const flowTrue = stringFlow("true");
        expect(flowTrue.flowBoolean().get()).toBe(true);

        const flowFalse = stringFlow("");
        expect(flowFalse.flowBoolean().get()).toBe(false);
      });

      it("toArray: 문자열을 문자 배열로 변환해야 합니다", () => {
        const flow = stringFlow("hello");
        expect(flow.flowArray().get()).toEqual(["h", "e", "l", "l", "o"]);
      });

      it("toObject: 문자열을 객체로 변환해야 합니다", () => {
        const flow = stringFlow('{"name":"John","age":30}');
        expect(flow.flowObject().get()).toEqual({ name: "John", age: 30 });
      });
    });

    describe("메서드 체이닝", () => {
      it("여러 메서드를 체이닝할 수 있어야 합니다", () => {
        const flow = stringFlow("  hello world  ");
        const result = flow.trim().toUpper().replace("WORLD", "JAVASCRIPT");
        expect(result.get()).toBe("HELLO JAVASCRIPT");
      });
    });
  });
};

testStringFlow(StringFlowJS as typeof StringFlow);
testStringFlow(StringFlowESM as typeof StringFlow);
