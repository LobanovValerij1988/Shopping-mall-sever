function isCategoryValid(category) {
  let errMsg = "";
  if (!category.name) {
    errMsg += "category name is required ";
  }
  return errMsg;
}

module.exports = {
  isCategoryValid,
};
