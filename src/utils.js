const formatedFoodQuery = query => encodeURI(query.trim().toLowerCase());

const kCalSum = arr => arr.reduce((acc, curVal) => acc + +curVal.kcal, 0);

const handleMissingValue = field => {
  if (field.toString().indexOf("--") <= -1) {
    return field;
  } else {
    return "";
  }
};

export { formatedFoodQuery, kCalSum, handleMissingValue };
