import { Flow } from "@subflow/types/core";

// 메서드 캐싱 (커스텀 메서드 재사용)
const methodCache = new WeakMap<object, Record<string, (flow: Flow<any>, ...args: any[]) => any>>();

// 메서드 병합
export function mergeMethods<T>(baseMethods: Record<string, (flow: Flow<T>, ...args: any[]) => any>, customMethods?: Record<string, (flow: Flow<T>, ...args: any[]) => any>) {
  if (!customMethods) return baseMethods;
  if (methodCache.has(customMethods)) return methodCache.get(customMethods)!;
  const merged = { ...baseMethods, ...customMethods };
  methodCache.set(customMethods, merged);
  return merged;
}
