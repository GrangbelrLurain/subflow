# Subflow

![npm version](https://img.shields.io/npm/v/subflow)
![license](https://img.shields.io/npm/l/subflow)
![downloads](https://img.shields.io/npm/dm/subflow)

A Flow-based primitive library for safe data handling in TypeScript.

## Introduction

Subflow is a Flow-based primitive library designed for safely handling data in TypeScript. It follows functional programming principles, supporting immutability and chaining.

Subflow provides Flows for the following data types:

- `booleanFlow`: Flow for handling boolean values
- `numberFlow`: Flow for handling numeric values
- `stringFlow`: Flow for handling string values
- `arrayFlow`: Flow for handling arrays
- `objectFlow`: Flow for handling objects

Each Flow provides methods appropriate for its data type, allowing you to implement complex data processing concisely through method chaining.

## Installation

```bash
npm install subflow
# or
yarn add subflow
# or
pnpm add subflow
```

## Usage Examples

### Basic Usage

```typescript
import {
  numberFlow,
  stringFlow,
  arrayFlow,
  objectFlow,
  booleanFlow,
} from "subflow";

// Number Flow
const numFlow = numberFlow(42);
console.log(numFlow.get()); // 42
console.log(numFlow.add(10).multiply(2).get()); // 104

// String Flow
const strFlow = stringFlow("Hello");
console.log(strFlow.get()); // 'Hello'
console.log(strFlow.toUpperCase().concat(" World").get()); // 'HELLO World'

// Array Flow
const arrFlow = arrayFlow([1, 2, 3, 4, 5]);
console.log(arrFlow.get()); // [1, 2, 3, 4, 5]
console.log(
  arrFlow
    .filter((x) => x % 2 === 0)
    .map((x) => x * 2)
    .get()
); // [4, 8]

// Object Flow
const objFlow = objectFlow({ name: "John", age: 30 });
console.log(objFlow.get()); // { name: 'John', age: 30 }
console.log(objFlow.set("address", "Seoul").get()); // { name: 'John', age: 30, address: 'Seoul' }

// Boolean Flow
const boolFlow = booleanFlow(true);
console.log(boolFlow.get()); // true
console.log(boolFlow.not().and(false).or(true).get()); // true
```

### Error Handling

Subflow provides a `FlowError` class for error handling. Each Flow can check for errors using the `isError()` method.

```typescript
import { numberFlow, FlowError } from "subflow";

try {
  const flow = numberFlow("not a number"); // Error occurs
} catch (error) {
  console.log(error instanceof FlowError); // true
  console.log(error.message); // 'Value must be a number'
}
```

## API Documentation

### booleanFlow

Creates a Flow for handling boolean values.

```typescript
booleanFlow(value: boolean): BooleanFlowReturn
```

Key methods:

- `not()`: Negates the boolean value.
- `and(value: boolean)`: Performs logical AND operation.
- `or(value: boolean)`: Performs logical OR operation.
- `xor(value: boolean)`: Performs logical XOR operation.
- `equal(value: boolean)`: Checks if two boolean values are equal.
- `notEqual(value: boolean)`: Checks if two boolean values are different.
- `greaterThan(value: boolean)`: Checks if the boolean value is greater than another value.
- `lessThan(value: boolean)`: Checks if the boolean value is less than another value.
- `greaterThanOrEqual(value: boolean)`: Checks if the boolean value is greater than or equal to another value.
- `lessThanOrEqual(value: boolean)`: Checks if the boolean value is less than or equal to another value.
- `flowString()`: Converts the boolean value to a string.
- `flowNumber()`: Converts the boolean value to a number.

### numberFlow

Creates a Flow for handling numeric values.

```typescript
numberFlow(value: number): NumberFlowReturn
```

Key methods:

- `add(num: number)`: Adds two numbers.
- `subtract(num: number)`: Subtracts two numbers.
- `multiply(num: number)`: Multiplies two numbers.
- `divide(num: number)`: Divides two numbers.
- `modulo(num: number)`: Performs modulo operation.
- `power(num: number)`: Performs exponentiation.
- `sqrt()`: Calculates the square root.
- `round()`: Rounds to the nearest integer.
- `floor()`: Removes decimal places (rounds down).
- `ceil()`: Rounds up to the nearest integer.
- `abs()`: Returns the absolute value.
- `random()`: Generates a random number between 0 and 1.
- `min(num: number)`: Returns the smaller of two numbers.
- `max(num: number)`: Returns the larger of two numbers.
- `clamp(min: number, max: number)`: Restricts a value to a specified range.
- `sign()`: Returns the sign of the number.
- `toFixed(digits?: number)`: Returns a string with specified decimal places.
- `toExponential(digits?: number)`: Returns a string in exponential notation.
- `toPrecision(precision?: number)`: Returns a string with specified precision.
- `flowLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions)`: Returns a locale-specific string.
- `flowString(radix?: number)`: Converts to a string.

### stringFlow

Creates a Flow for handling string values.

```typescript
stringFlow(value: string): StringFlowReturn
```

Key methods:

- `toUpperCase()`: Converts the string to uppercase.
- `toLowerCase()`: Converts the string to lowercase.
- `trim()`: Removes whitespace from both ends of the string.
- `trimStart()`: Removes whitespace from the beginning of the string.
- `trimEnd()`: Removes whitespace from the end of the string.
- `replace(searchValue: string | RegExp, replaceValue: string)`: Replaces part of the string with another string.
- `replaceAll(searchValue: string | RegExp, replaceValue: string)`: Replaces all matching parts of the string.
- `split(separator: string | RegExp, limit?: number)`: Splits the string by a separator.
- `substring(start: number, end?: number)`: Extracts a part of the string.
- `slice(start?: number, end?: number)`: Extracts a part of the string.
- `charAt(index: number)`: Returns the character at a specified index.
- `charCodeAt(index: number)`: Returns the Unicode value of the character at a specified index.
- `indexOf(searchValue: string, fromIndex?: number)`: Returns the first index of a search string.
- `lastIndexOf(searchValue: string, fromIndex?: number)`: Returns the last index of a search string.
- `includes(searchValue: string, position?: number)`: Checks if the string contains a search string.
- `startsWith(searchValue: string, position?: number)`: Checks if the string starts with a search string.
- `endsWith(searchValue: string, position?: number)`: Checks if the string ends with a search string.
- `concat(...strings: string[])`: Concatenates strings.
- `repeat(count: number)`: Repeats the string a specified number of times.
- `padStart(targetLength: number, padString?: string)`: Pads the start of the string to a specified length.
- `padEnd(targetLength: number, padString?: string)`: Pads the end of the string to a specified length.
- `flowNumber(radix?: number)`: Converts to a number.
- `flowBoolean()`: Converts to a boolean.
- `flowArray()`: Converts to an array.
- `flowObject()`: Converts to an object.

### arrayFlow

Creates a Flow for handling arrays.

```typescript
arrayFlow<T extends any[]>(value: T): ArrayFlowReturn<T>
```

Key methods:

- `push(...items: any[])`: Adds elements to the end of the array.
- `pop()`: Removes and returns the last element of the array.
- `shift()`: Removes and returns the first element of the array.
- `unshift(...items: ElementOf<T>[])`: Adds elements to the beginning of the array.
- `join(separator: string)`: Joins array elements into a string.
- `map<U>(callback: (value: T[number], index: number, array: ElementOf<T>[]) => U)`: Applies a function to each element of the array.
- `filter(callback: (value: T[number], index: number, array: ElementOf<T>[]) => boolean)`: Filters elements that match a condition.
- `reduce(callback: (acc: ElementOf<T>, value: ElementOf<T>, index: number, array: ElementOf<T>[]) => ElementOf<T>, initialValue: ElementOf<T>)`: Reduces the array to a single value.
- `sort(compareFunction?: (a: ElementOf<T>, b: ElementOf<T>) => number)`: Sorts the array.
- `reverse()`: Reverses the order of the array.
- `concat(...arrays: ElementOf<T>[])`: Combines arrays.
- `slice(start: number, end: number)`: Extracts a portion of the array.
- `splice(start: number, deleteCount: number, ...items: ElementOf<T>[])`: Removes elements and adds new elements.
- `indexOf(searchElement: ElementOf<T>, fromIndex?: number)`: Finds the index of an element.
- `lastIndexOf(searchElement: ElementOf<T>, fromIndex?: number)`: Finds the last index of an element.
- `includes(searchElement: ElementOf<T>, fromIndex?: number)`: Checks if the array includes an element.
- `find(callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => boolean)`: Finds the first element that matches a condition.
- `findIndex(callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => boolean)`: Finds the index of the first element that matches a condition.
- `forEach(callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => void)`: Executes a function for each element.
- `every(callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => boolean)`: Checks if all elements satisfy a condition.
- `some(callback: (value: ElementOf<T>, index: number, array: ElementOf<T>[]) => boolean)`: Checks if at least one element satisfies a condition.
- `flowString()`: Converts the array to a string.
- `flowLocaleString()`: Converts the array to a locale-specific string.
- `flowStringfy()`: Converts the array to a JSON string.
- `flowObject()`: Converts the array to an object.
- `flowBoolean()`: Checks if the array is not empty.
- `flowNumber()`: Returns the length of the array.

### objectFlow

Creates a Flow for handling objects.

```typescript
objectFlow<T extends Record<string, unknown>>(value: T): ObjectFlowReturn<T>
```

Key methods:

- `keys()`: Returns an array of the object's keys.
- `values()`: Returns an array of the object's values.
- `entries()`: Returns an array of the object's [key, value] pairs.
- `has(key: string)`: Checks if the object has a specific key.
- `set(key: string, value: unknown)`: Adds a new key-value pair to the object.
- `delete(key: string)`: Deletes a specific key from the object.

### FlowError

A class for error handling.

```typescript
class FlowError<T extends any> {
  constructor(
    public type: FlowType,
    public value: T,
    public message: string,
    public code: string,
    public timestamp: number,
    public traceId: string,
    public stack?: string,
    public cause?: Error
  ) {}
}
```

## License

MIT

## Contributing

Contributions are always welcome! Please feel free to open an issue or submit a pull request.
