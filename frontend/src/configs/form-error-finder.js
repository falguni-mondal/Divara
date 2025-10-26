const formErrorFinder = (data) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  let formErrors = {
    email: false,
    password: false,
    newPassword: false,
    firstname: false,
    lastname: false,
  };

  if (!data.email || !emailRegex.test(data.email)) {
    formErrors = { ...formErrors, email: true };
  } else {
    formErrors = { ...formErrors, email: false };
  }

  if (data.firstname.length < 3) {
    formErrors = { ...formErrors, firstname: true };
  } else {
    formErrors = { ...formErrors, firstname: false };
  }

  if (data.lastname.length < 3) {
    formErrors = { ...formErrors, lastname: true };
  } else {
    formErrors = { ...formErrors, lastname: false };
  }

  return formErrors;
};

export default formErrorFinder;
