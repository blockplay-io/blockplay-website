// Make every words uppercase
export const upperCaserText = (value) => {
  let text = value.toString();
  text = text.toLowerCase();
  text = text.toUpperCase();

  return text;
};

// Delete alphabetic charaters
export const deleteAlphabeticCharacters = (value) => {
  value = value.replace("-", "");
  value = value.replace("..", ".");

  return value
    .toString()
    .trim()
    .replace(/[^0-9-.]+/g, "");
};

// Add comma to numbers
export const thousands_separators = (x) => {
  return x.toString().replace(/^[+-]?\d+/, function (int) {
    return int.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  });
};

// Check if a variable has strings
export const checkIfContainsString = (variable) => {
  return /^\d+$/.test(variable);
};
