const handleCheckEmail = (value, setEmail, setCheckValidEmail) => {
  setEmail(value);
  let re = /\S+@\S+\.\S+/;
  let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (re.test(value) || regex.test(value)) {
    setCheckValidEmail(false);
  } else if (value === "") {
    setCheckValidEmail(false);
  } else {
    setCheckValidEmail(true);
  }
};

const checkPasswordValidity = (value, setPassword, setCheckValidPassword, setErrPassword) => {
  setPassword(value);
  const isNonWhiteSpace = /^\S*$/;
  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  const isContainsNumber = /^(?=.*[0-9]).*$/;
  const isContainsLowercase = /^(?=.*[a-z]).*$/;
  const isValidLength = /^.{8,16}$/;
  if (!isNonWhiteSpace.test(value)) {
    setCheckValidPassword(true);
    setErrPassword("Password must not contain Whitespaces.");
  } else if (!isContainsUppercase.test(value)) {
    setCheckValidPassword(true);
    setErrPassword("Password must have at least one Uppercase Character.");
  } else if (!isContainsLowercase.test(value)) {
    setCheckValidPassword(true);
    setErrPassword("Password must have at least one Lowercase Character.");
  } else if (!isContainsNumber.test(value)) {
    setCheckValidPassword(true);
    setErrPassword("Password must contain at least one Digit.");
  } else if (!isValidLength.test(value)) {
    setCheckValidPassword(true);
    setErrPassword("Password must be 8-16 Characters Long.");
  } else {
    setCheckValidPassword(false);
    setErrPassword("");
  }
};

export { handleCheckEmail, checkPasswordValidity };
