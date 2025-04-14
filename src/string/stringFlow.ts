import { createFlow } from "@subflow/core/createFlow";
import { Extensions, FlowMethod } from "@subflow/types/core";
import { booleanFlow } from "@subflow/boolean";
import { safer } from "@subflow/utils";
import { FlowError } from "@subflow/error";
import { createMethod } from "@subflow/method";

export const stringFlow = <T extends string, E extends Extensions<E>>(value: T, extensions?: E) => {
  type Flow = { get: () => T };

  const methods: Record<string, FlowMethod<T, E>> = {
    toUpper: createMethod(() => (flow) => stringFlow(flow.get().toUpperCase(), extensions)),
    toLower: createMethod((flow) => stringFlow(flow.get().toLowerCase(), extensions)),
    length: createMethod((flow) => flow.get().length),
    reverse: createMethod((flow) => stringFlow(flow.get().split("").reverse().join(""), extensions)),
    replace: createMethod((searchValue, replaceValue) => (flow) => stringFlow(flow.get().replace(searchValue, replaceValue), extensions)),
    trim: createMethod((flow) => stringFlow(flow.get().trim(), extensions)),
    padStart: createMethod((length, fillString) => (flow) => stringFlow(flow.get().padStart(length, fillString), extensions)),
    padEnd: createMethod((length, fillString) => (flow) => stringFlow(flow.get().padEnd(length, fillString), extensions)),
    startsWith: createMethod((searchString) => (flow) => flow.get().startsWith(searchString)),
    endsWith: createMethod((searchString) => (flow) => flow.get().endsWith(searchString)),
    includes: createMethod((searchString) => (flow) => flow.get().includes(searchString)),
    indexOf: createMethod((searchString) => (flow) => flow.get().indexOf(searchString)),
    lastIndexOf: createMethod((searchString) => (flow) => flow.get().lastIndexOf(searchString)),
    charAt: createMethod((index) => (flow) => flow.get().charAt(index)),
    charCodeAt: createMethod((index) => (flow) => flow.get().charCodeAt(index)),
    concat: createMethod(
      (...strings) =>
        (flow) =>
          stringFlow(flow.get().concat(...strings), extensions)
    ),
    split: createMethod((separator) => (flow) => flow.get().split(separator)),
    slice: createMethod((start, end) => (flow) => flow.get().slice(start, end)),
    substring: createMethod((start, end) => (flow) => flow.get().substring(start, end)),
    substr: createMethod((start, length) => (flow) => flow.get().substr(start, length)),
    toNumber: createMethod((flow) => Number(flow.get())),
    toFloat: createMethod((flow) => Number(flow.get())),
    toBoolean: createMethod((flow) => booleanFlow(Boolean(flow.get()))),
    toArray: createMethod((flow) => flow.get().split("")),
    toObject: createMethod((flow) => JSON.parse(flow.get())),
    ...(extensions || {}),
  } as const;

  const init = safer(
    value,
    (value: T): T => {
      if (typeof value !== "string") {
        throw new Error("Value must be a string");
      }

      return value;
    },
    new FlowError("string", value, "Value must be a string", "STRING_FLOW_ERROR", Date.now(), "traceId")
  );

  return createFlow<T, typeof methods>(init, methods);
};
