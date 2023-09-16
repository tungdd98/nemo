import get from 'lodash.get';

import { isArray, isObject } from './convert-object-keys';

export function trimValue<T>(d: T): T | Record<string, unknown> {
  if (typeof d === 'string') {
    return d.trim() as T;
  }

  if (isObject(d)) {
    const o: Record<string, unknown> = {};
    Object.keys(d as Record<string, unknown>).forEach((k) => {
      o[k] = trimValue(get(d, k) as T);
    });

    return o;
  }

  if (isArray(d)) {
    return (d as Array<unknown>).map((i: unknown) => trimValue(i)) as T;
  }

  return d;
}
