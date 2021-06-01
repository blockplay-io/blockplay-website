// Get unique value
// If it is an array, get first value from that array
export const getAsString = (value: string | string[]): string => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};
