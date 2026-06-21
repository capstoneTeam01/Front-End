const getEstimateValue = (...values) => {
  const validValue = values
    .map((value) => String(value || "").trim())
    .find((value) => {
      if (value === "") {
        return false;
      }

      if (value.toLowerCase() === "null") {
        return false;
      }

      if (value.toLowerCase() === "undefined") {
        return false;
      }

      if (value.toUpperCase() === "N/A") {
        return false;
      }

      return true;
    });

  if (validValue) {
    return validValue;
  }

  return "N/A";
};

export default getEstimateValue;