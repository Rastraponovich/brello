type ValidatorError = {
  text: string;
  type: string;
};

const EMAIL_PATTERN = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const validateEmail = new RegExp(EMAIL_PATTERN);

export const emailValidator = (email: string): ValidatorError | null => {
  if (!validateEmail.test(email)) {
    return {
      text: "Please enter a valid email address",
      type: "invalid",
    };
  }
  return null;
};
