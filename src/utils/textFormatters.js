const cleanDisplayText = (value) => {
  return String(value ?? "")
    .trim()
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, " ")
    .replace(/\s+/g, " ");
};

const capitalizeFirstLetter = (value) => {
  const text = cleanDisplayText(value);

  return text.replace(
    /[A-Za-z]/,
    (letter) => letter.toUpperCase()
  );
};

const formatDisplayLabel = (value) => {
  const text = cleanDisplayText(value)
    .replace(/^_+|_+$/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!text) {
    return "";
  }

  return text
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
    .replace(/\bDiy\b/g, "DIY")
    .replace(/\bAi\b/g, "AI")
    .replace(/\bId\b/g, "ID")
    .replace(/\bApi\b/g, "API");
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
  formatDisplayLabel,
  formatTitle,
};
