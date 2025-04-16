# 🌊 Subflow

![npm version](https://img.shields.io/npm/v/subflow)
![license](https://img.shields.io/npm/l/subflow)
![downloads](https://img.shields.io/npm/dm/subflow)

> A **type-safe**, **chainable**, and **monadic** utility library for safely manipulating data in TypeScript.

---

## ✨ Introduction

**Subflow** is a flow-based, monadic primitive library built for **safe**, **immutable**, and **composable** data handling in TypeScript.  
It enables declarative and functional-style operations on fundamental types like `string`, `number`, `boolean`, `array`, and `object`.

Each Flow provides **chainable methods** and **immutable returns**, ensuring predictable transformations and error-safe chaining.

---

## 📦 Installation

```bash
npm install subflow
# or
yarn add subflow
# or
pnpm add subflow
```

---

## 🚀 Usage Examples

```ts
import { numberFlow, stringFlow, arrayFlow, objectFlow, booleanFlow } from "subflow";

// Number Flow
numberFlow(42).add(8).multiply(2).get(); // 100

// String Flow
stringFlow(" Hello ").trim().toUpper().concat("WORLD").get(); // "HELLOWORLD"

// Array Flow
arrayFlow([1, 2, 3, 4])
  .filter((x) => x % 2 === 0)
  .map((x) => x * 10)
  .get(); // [20, 40]

// Object Flow
objectFlow({ name: "John" }).set("age", 30).get(); // { name: "John", age: 30 }

// Boolean Flow
booleanFlow(true).not().or(false).get(); // false
```

---

## 📌 Design Principles

- ✅ **Immutable**: All flows return new instances
- ✅ **Composable**: Chainable transformations
- ✅ **Safe**: Built-in validation and error fallback
- ✅ **Predictable**: No unexpected runtime throws
- ✅ **Type-safe**: Inferred types across the chain

---

## 🛠️ Contributing

Subflow is an open-source project and contributions are very welcome!

- Open an issue for bug reports or feature suggestions
- Submit a pull request for fixes or improvements
- Check out the roadmap and help us grow the flow 🌻

---

## 📄 License

[MIT](https://opensource.org/licenses/MIT)
