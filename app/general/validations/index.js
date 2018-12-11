/* Validations for create wallet step */

export const validateData = (event, value, name, password) => {
  event.preventDefault();
  let validationResult = '';
  if (name === 'accountName') {
    const regex = /^[a-zA-Z ]{2,30}$/;
    const result = regex.test(value);
    if (result) {
      validationResult = { errorText: '' };
    } else {
      validationResult = { errorText: 'Enter a valid name' };
    }
  } else if (name === 'password') {
    validationResult = validPass(value);
  } else if (name === 'confirmPassword') {
    validationResult = validRepass(value, password);
  }
  return validationResult;
};

/**
 * Password must be atleast of 8 characters
 */
const validPass = value => {
  const errorObj = {};
  if (value === '') {
    errorObj.errorText = "Password field can't be empty";
  } else if (value.length < 8) {
    errorObj.errorText =
      'Make your password with 8 characters or more. It can be any combination of letters, numbers, and symbols.';
  } else if (value.match(/[A-Z]/) === null) {
    errorObj.errorText = 'Password field should contain one Capital letter';
  } else if (value.match(/[0-9]/) === null) {
    errorObj.errorText = 'Password field should contain one number';
  } else {
    errorObj.errorText = '';
  }
  return errorObj;
};

export const validEmail = value => {
  const errorObj = {};
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value === '') {
    errorObj.errorText = "Account Name field can't be empty";
  } else if (re.test(String(value).toLowerCase())) {
    errorObj.errorText = '';
  } else {
    errorObj.errorText = 'You need to specify a valid account name';
  }
  return errorObj;
};

const validRepass = (value, password) => {
  const errorObj = {};
  if (value === '') {
    errorObj.errorText = "Re-enter password field can't be empty";
  } else if (value !== password) {
    errorObj.errorText =
      'Password and re-enter password fields must be the same.';
  } else {
    errorObj.errorText = '';
  }
  return errorObj;
};
