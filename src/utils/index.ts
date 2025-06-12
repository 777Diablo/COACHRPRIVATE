// Utility function to filter out undefined and optionally null properties from an object
export function filterUndefinedProperties<T extends Record<string, unknown>>(
  obj: T,
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined),
  ) as Partial<T>;
}

export const snakeToNormal = (str: string) => {
  return str.replace(/_/g, " ");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getUpdatedValuesDeep<T extends Record<string, any>>(
  original: T,
  updated: T,
): Partial<T> {
  const result = {} as Partial<T>;

  for (const key in updated) {
    if (
      typeof updated[key] === "object" &&
      updated[key] !== null &&
      typeof original[key] === "object" &&
      original[key] !== null
    ) {
      // Recursive call for nested objects
      const nestedDiff = getUpdatedValuesDeep(original[key], updated[key]);
      if (Object.keys(nestedDiff).length > 0) {
        result[key] = nestedDiff as T[Extract<keyof T, string>];
      }
    } else if (updated[key] !== original[key]) {
      result[key] = updated[key];
    }
  }

  return result;
}
