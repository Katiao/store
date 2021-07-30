//built in method in JavaScript: Intl.NumberFormat:
//this is just to showcase the price to users.
//all calculations will take place in cents
export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  //for each item, we're accessing the property dynamically, e.g. one case willbe category, then company then colors.
  //goal is to only get unique values.
  let unique = data.map((item) => item[type]);
  //sizes are arrays of arrays so we need to flatten them so that we just get that array.
  if (type === "sizes") {
    unique = unique.flat();
  }
  //return a new array starting with 'all', spread out new set, data type that only gives me unique values
  return ["all", ...new Set(unique)];
};
