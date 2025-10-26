const passwordValidator = (password) => {
  let validPassword = {
    characters: false,
    number: false,
    specialChar: false,
  };
  const minLength = /^.{8,}$/;
  const hasNumber = /[0-9]/;
  const hasSpecialChar = /[!+,\-./:;<=>?@]/;

  if (minLength.test(password)) {
    validPassword = ({...validPassword, characters: true});
  } else {
    validPassword = ({...validPassword, characters: false});
  }

  if (hasNumber.test(password)) {
    validPassword = ({...validPassword, number: true});
  } else {
    validPassword = ({...validPassword, number: false});
  }

  if (hasSpecialChar.test(password)) {
    validPassword = ({...validPassword, specialChar: true});
  } else {
    validPassword = ({...validPassword, specialChar: false});
  }

  return validPassword;
};

export default passwordValidator;
