export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
});

export const isFormFieldValid = (value, rules) => {
  let isValid = true;

  // skip elements that do not have validation rules
  if (rules) {
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.email) {
      // this is obviously an oversimplified example
      isValid = value.includes('@') && isValid;
    }
  } // if rules

  return isValid;
}
