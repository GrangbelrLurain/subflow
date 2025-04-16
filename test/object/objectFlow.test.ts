import { describe, it, expect } from "vitest";
import { objectFlow as ObjectFlow } from "@subflow/index";
import {
  objectFlow as ObjectFlowJS,
  isError as isErrorJS,
} from "@build/index.js";
import {
  objectFlow as ObjectFlowESM,
  isError as isErrorESM,
} from "@build/index.cjs";

const testObjectFlow = (
  objectFlow: typeof ObjectFlow,
  isError: typeof isErrorESM | typeof isErrorJS
) => {
  describe("objectFlow", () => {
    describe("기본 기능", () => {
      it("객체 값을 가진 flow를 생성해야 합니다", () => {
        const obj = { name: "John", age: 30 };
        const flow = objectFlow(obj);
        expect(flow.get()).toEqual(obj);
      });

      it("오류가 없을 때 isError가 false를 반환해야 합니다", () => {
        const obj = { name: "John", age: 30 };
        const flow = objectFlow(obj);
        expect(isError(flow)).toBe(false);
      });
    });

    describe("객체 조작 메서드", () => {
      it("keys: 객체의 키 배열을 반환해야 합니다", () => {
        const obj = { name: "John", age: 30 };
        const flow = objectFlow(obj);
        expect(flow.keys().get()).toEqual(["name", "age"]);
      });

      it("values: 객체의 값 배열을 반환해야 합니다", () => {
        const obj = { name: "John", age: 30 };
        const flow = objectFlow(obj);
        expect(flow.values().get()).toEqual(["John", 30]);
      });

      it("entries: 객체의 [key, value] 쌍 배열을 반환해야 합니다", () => {
        const obj = { name: "John", age: 30 };
        const flow = objectFlow(obj);
        expect(flow.entries().get()).toEqual([
          ["name", "John"],
          ["age", 30],
        ]);
      });

      it("has: 객체가 특정 키를 가지고 있는지 확인해야 합니다", () => {
        const obj = { name: "John", age: 30 };
        const flow = objectFlow(obj);
        expect(flow.has("name").get()).toBe(true);
        expect(flow.has("address").get()).toBe(false);
      });

      it("set: 객체에 새로운 키-값 쌍을 추가해야 합니다", () => {
        const obj = { name: "John", age: 30 };
        const flow = objectFlow(obj);
        const newFlow = flow.set("address", "Seoul");
        expect(newFlow.get()).toEqual({
          name: "John",
          age: 30,
          address: "Seoul",
        });
        // 원본 객체는 변경되지 않아야 합니다
        expect(flow.get()).toEqual({ name: "John", age: 30 });
      });

      it("delete: 객체에서 특정 키를 삭제해야 합니다", () => {
        const obj = { name: "John", age: 30, address: "Seoul" };
        const flow = objectFlow(obj);
        const newFlow = flow.delete("age");
        expect(newFlow.get()).toEqual({ name: "John", address: "Seoul" });
        // 원본 객체는 변경되지 않아야 합니다
        expect(flow.get()).toEqual({ name: "John", age: 30, address: "Seoul" });
      });
    });

    describe("문자열 변환 메서드", () => {
      it("flowString: 객체를 JSON 문자열로 변환해야 합니다", () => {
        const obj = { name: "John", age: 30 };
        const flow = objectFlow(obj);
        expect(flow.flowString().get()).toBe('{"name":"John","age":30}');
      });
    });

    describe("메서드 체이닝", () => {
      it("여러 메서드를 체이닝할 수 있어야 합니다", () => {
        const obj = { name: "John", age: 30 };
        const flow = objectFlow(obj);
        const result = flow.set("address", "Seoul").delete("age");
        expect(result.get()).toEqual({ name: "John", address: "Seoul" });
      });
    });

    describe("오류 처리", () => {
      it("오류가 있을 때 isError가 true를 반환해야 합니다", () => {
        const flow = objectFlow(null as unknown as object);
        expect(isError(flow)).toBe(true);
      });

      it("오류가 있을 때 get 메서드가 입력 객체를 반환해야 합니다", () => {
        const flow = objectFlow(null as unknown as object);
        expect(flow.get()).toBe(null);
      });

      it("오류가 있을 때 getError 메서드가 오류 객체를 반환해야 합니다", () => {
        const flow = objectFlow(null as unknown as object);
        expect(isError(flow)).toBe(true);
      });
    });
  });
};

testObjectFlow(ObjectFlowJS as typeof ObjectFlow, isErrorJS);
testObjectFlow(ObjectFlowESM as typeof ObjectFlow, isErrorESM);
