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

const limitWords = (value, maxWords) => {
  const text = cleanDisplayText(value);

  if (!text || !Number.isFinite(maxWords) || maxWords <= 0) {
    return text;
  }

  return text
    .split(" ")
    .slice(0, maxWords)
    .join(" ");
};

const formatTitleWithWordLimit = (value, maxWords) => {
  return formatTitle(limitWords(value, maxWords))
    .replace(/\bDiy\b/g, "DIY")
    .replace(/\bAi\b/g, "AI")
    .replace(/\bId\b/g, "ID")
    .replace(/\bApi\b/g, "API");
};

export {
  capitalizeFirstLetter,
  cleanDisplayText,
  formatDisplayLabel,
  formatTitle,
  formatTitleWithWordLimit,
  limitWords,
};
