const cleanDisplayText = (value) => {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ");
};

const capitalizeFirstLetter = (value) => {
  const text = cleanDisplayText(value);

  return text.replace(
    /[A-Za-z]/,
    (letter) => letter.toUpperCase()
  );
};

const formatTitle = (value) => {
  const text = cleanDisplayText(value);

  return text.replace(
    /\b[a-z]/g,
    (letter) => letter.toUpperCase()
  );
};

export {
  capitalizeFirstLetter,
  cleanDisplayText,
  formatTitle,
};
