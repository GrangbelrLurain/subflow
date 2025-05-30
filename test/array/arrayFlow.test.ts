import { describe, it, expect } from "vitest";

import {
  arrayFlow as ArrayFlowJS,
  isError as isErrorJS,
} from "@build/index.cjs.js";
import {
  arrayFlow as ArrayFlowESM,
  isError as isErrorESM,
} from "@build/index.es.js";

const testArrayFlow = (
  arrayFlow: typeof ArrayFlowJS | typeof ArrayFlowESM,
  isError: typeof isErrorESM | typeof isErrorJS
) => {
  describe("arrayFlow", () => {
    describe("기본 기능", () => {
      it("배열 값을 가진 flow를 생성해야 합니다", () => {
        const arr = [1, 2, 3];
        const flow = arrayFlow(arr);
        expect(flow.get()).toEqual(arr);
      });

      it("오류가 없을 때 isError가 false를 반환해야 합니다", () => {
        const arr = [1, 2, 3];
        const flow = arrayFlow(arr);
        expect(isError(flow)).toBe(false);
      });
    });

    describe("배열 조작 메서드", () => {
      it("push: 배열 끝에 요소를 추가해야 합니다", () => {
        const arr = [1, 2, 3];
        const flow = arrayFlow(arr);
        const newFlow = flow.push(4, 5);
        expect(newFlow.get()).toEqual([1, 2, 3, 4, 5]);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3]);
      });

      it("pop: 배열의 마지막 요소를 제거하고 반환해야 합니다", () => {
        const arr = [1, 2, 3];
        const flow = arrayFlow(arr);
        const newFlow = flow.pop();
        expect(newFlow.get()).toEqual([1, 2]);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3]);
      });

      it("shift: 배열의 첫 번째 요소를 제거하고 반환해야 합니다", () => {
        const arr = [1, 2, 3];
        const flow = arrayFlow(arr);
        const newFlow = flow.shift();
        expect(newFlow.get()).toEqual([2, 3]);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3]);
      });

      it("unshift: 배열의 시작 부분에 요소를 추가해야 합니다", () => {
        const arr = [1, 2, 3];
        const flow = arrayFlow(arr);
        const newFlow = flow.unshift(...[0, -1]);
        expect(newFlow.get()).toEqual([0, -1, 1, 2, 3]);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3]);
      });

      it("join: 배열 요소를 문자열로 결합해야 합니다", () => {
        const arr = ["a", "b", "c"];
        const flow = arrayFlow(arr);
        expect(flow.join("-").get()).toBe("a-b-c");
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual(["a", "b", "c"]);
      });

      it("map: 배열의 각 요소에 함수를 적용해야 합니다", () => {
        const arr = [1, 2, 3];
        const flow = arrayFlow(arr);
        const newFlow = flow.map((x) => x * 2);
        expect(newFlow.get()).toEqual([2, 4, 6]);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3]);
      });

      it("filter: 조건에 맞는 요소만 필터링해야 합니다", () => {
        const arr = [1, 2, 3, 4, 5];
        const flow = arrayFlow(arr);
        const newFlow = flow.filter((x) => x % 2 === 0);
        expect(newFlow.get()).toEqual([2, 4]);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3, 4, 5]);
      });

      it("reduce: 배열을 단일 값으로 줄여야 합니다", () => {
        const arr = [1, 2, 3, 4];
        const flow = arrayFlow(arr);
        const result = flow.reduce((acc, val) => acc + val, 0);
        expect(result).toBe(10);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3, 4]);
      });

      it("sort: 배열을 정렬해야 합니다", () => {
        const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
        const flow = arrayFlow(arr);
        const newFlow = flow.sort();
        expect(newFlow.get()).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]);
      });

      it("reverse: 배열의 순서를 뒤집어야 합니다", () => {
        const arr = [1, 2, 3, 4, 5];
        const flow = arrayFlow(arr);
        const newFlow = flow.reverse();
        expect(newFlow.get()).toEqual([5, 4, 3, 2, 1]);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3, 4, 5]);
      });

      it("concat: 배열을 결합해야 합니다", () => {
        const arr = [1, 2, 3];
        const flow = arrayFlow(arr);
        const newFlow = flow.concat(...[4, 5], ...[6, 7]);
        expect(newFlow.get()).toEqual([1, 2, 3, 4, 5, 6, 7]);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3]);
      });

      it("slice: 배열의 일부를 추출해야 합니다", () => {
        const arr = [1, 2, 3, 4, 5];
        const flow = arrayFlow(arr);
        const newFlow = flow.slice(1, 4);
        expect(newFlow.get()).toEqual([2, 3, 4]);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3, 4, 5]);
      });

      it("splice: 배열의 일부를 제거하고 새 요소를 추가해야 합니다", () => {
        const arr = [1, 2, 3, 4, 5];
        const flow = arrayFlow(arr);
        const newFlow = flow.splice(1, 2, 6, 7);
        expect(newFlow.get()).toEqual([1, 6, 7, 4, 5]);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3, 4, 5]);
      });

      it("indexOf: 요소의 인덱스를 찾아야 합니다", () => {
        const arr = [1, 2, 3, 2, 4];
        const flow = arrayFlow(arr);
        expect(flow.indexOf(2).get()).toBe(1);
        expect(flow.indexOf(5).get()).toBe(-1);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3, 2, 4]);
      });

      it("findLastIndex: 요소의 마지막 인덱스를 찾아야 합니다", () => {
        const arr = [1, 2, 3, 2, 4];
        const flow = arrayFlow(arr);
        expect(flow.findLastIndex(2).get()).toBe(3);
        expect(flow.findLastIndex(5).get()).toBe(-1);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3, 2, 4]);
      });

      it("includes: 배열에 요소가 포함되어 있는지 확인해야 합니다", () => {
        const arr = [1, 2, 3, 4, 5];
        const flow = arrayFlow(arr);
        expect(flow.includes(3).get()).toBe(true);
        expect(flow.includes(6).get()).toBe(false);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3, 4, 5]);
      });

      it("find: 조건에 맞는 첫 번째 요소를 찾아야 합니다", () => {
        const arr = [1, 2, 3, 4, 5];
        const flow = arrayFlow(arr);
        expect(flow.find((x) => x > 3)).toBe(4);
        expect(flow.find((x) => x > 5)).toBeUndefined();
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3, 4, 5]);
      });

      it("findIndex: 조건에 맞는 첫 번째 요소의 인덱스를 찾아야 합니다", () => {
        const arr = [1, 2, 3, 4, 5];
        const flow = arrayFlow(arr);
        expect(flow.findIndex((x) => x > 3).get()).toBe(3);
        expect(flow.findIndex((x) => x > 5).get()).toBe(-1);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3, 4, 5]);
      });

      it("forEach: 각 요소에 대해 함수를 실행해야 합니다", () => {
        const arr = [1, 2, 3];
        const flow = arrayFlow(arr);
        const result: number[] = [];
        flow.forEach((x) => result.push(x * 2));
        expect(result).toEqual([2, 4, 6]);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3]);
      });

      it("every: 모든 요소가 조건을 만족하는지 확인해야 합니다", () => {
        const arr = [2, 4, 6, 8];
        const flow = arrayFlow(arr);
        expect(flow.every((x) => x % 2 === 0).get()).toBe(true);

        const arr2 = [2, 3, 4, 6];
        const flow2 = arrayFlow(arr2);
        expect(flow2.every((x) => x % 2 === 0).get()).toBe(false);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([2, 4, 6, 8]);
        expect(flow2.get()).toEqual([2, 3, 4, 6]);
      });

      it("some: 하나 이상의 요소가 조건을 만족하는지 확인해야 합니다", () => {
        const arr = [1, 3, 5, 7];
        const flow = arrayFlow(arr);
        expect(flow.some((x) => x % 2 === 0).get()).toBe(false);

        const arr2 = [1, 2, 3, 5];
        const flow2 = arrayFlow(arr2);
        expect(flow2.some((x) => x % 2 === 0).get()).toBe(true);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 3, 5, 7]);
        expect(flow2.get()).toEqual([1, 2, 3, 5]);
      });
    });

    describe("타입 변환 메서드", () => {
      it("flowString: 배열을 문자열로 변환해야 합니다", () => {
        const arr = [1, 2, 3];
        const flow = arrayFlow(arr);
        expect(flow.flowString().get()).toBe("1,2,3");
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3]);
      });

      it("flowLocaleString: 배열을 로케일에 맞는 문자열로 변환해야 합니다", () => {
        const arr = [1, 2, 3];
        const flow = arrayFlow(arr);
        expect(flow.flowLocaleString().get()).toBe("1,2,3");
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3]);
      });

      it("flowStringfy: 배열을 JSON 문자열로 변환해야 합니다", () => {
        const arr = [1, 2, 3];
        const flow = arrayFlow(arr);
        expect(flow.flowStringfy().get()).toBe("[1,2,3]");
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3]);
      });

      it("flowObject: 배열을 객체로 변환해야 합니다", () => {
        const arr = [1, 2, 3];
        const flow = arrayFlow(arr);
        const objFlow = flow.flowObject();
        expect(objFlow.get()).toEqual({ 0: 1, 1: 2, 2: 3 });
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3]);
      });

      it("flowObjectEntries: 배열을 객체로 변환해야 합니다", () => {
        const arr = [
          ["a", 1],
          ["b", 2],
          ["c", 3],
        ];
        const flow = arrayFlow(arr);
        const objFlow = flow.flowObjectEntries();
        expect(objFlow.get()).toEqual({ a: 1, b: 2, c: 3 });
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([
          ["a", 1],
          ["b", 2],
          ["c", 3],
        ]);
      });

      it("flowObjectEntries: 잘못된 배열은 FlowError를 리턴하고 원본 배열은 변경되지 않아야 합니다", () => {
        const arr = [1, 2, 3];
        const flow = arrayFlow(arr);
        expect(isError(flow.flowObjectEntries())).toBe(true);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3]);
      });

      it("flowBoolean: 배열이 비어있지 않은지 확인해야 합니다", () => {
        const arr1 = [1, 2, 3];
        const flow1 = arrayFlow(arr1);
        expect(flow1.flowBoolean().get()).toBe(true);

        const arr2: number[] = [];
        const flow2 = arrayFlow(arr2);
        expect(flow2.flowBoolean().get()).toBe(false);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow2.get()).toEqual([]);
      });

      it("flowNumber: 배열의 길이를 반환해야 합니다", () => {
        const arr = [1, 2, 3, 4, 5];
        const flow = arrayFlow(arr);
        expect(flow.flowNumber().get()).toBe(5);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3, 4, 5]);
      });
    });

    describe("메서드 체이닝", () => {
      it("여러 메서드를 체이닝할 수 있어야 합니다", () => {
        const arr = [1, 2, 3, 4, 5];
        const flow = arrayFlow(arr);
        const result = flow
          .filter((x) => x % 2 !== 0)
          .map((x) => x * 2)
          .reverse();
        expect(result.get()).toEqual([10, 6, 2]);
        // 원본 배열은 변경되지 않아야 합니다
        expect(flow.get()).toEqual([1, 2, 3, 4, 5]);
      });
    });
  });
};

testArrayFlow(ArrayFlowJS, isErrorJS);
testArrayFlow(ArrayFlowESM, isErrorESM);
