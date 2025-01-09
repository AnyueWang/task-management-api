// check user name
const nameValidator = (name: string) => {
  if (name.length < 3) {
    throw new Error("Name must be at least 3 characters long.");
  }
};

// check email format
const emailValidator = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format.");
  }
};

// check password
const passwordValidator = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number."
    );
  }
};

// check password confirmation
const passwordConfirmationValidator = (
  password: string,
  password_confirmation: string
) => {
  if (password !== password_confirmation) {
    throw new Error("Passwords do not match.");
  }
};

export const registerValidators = (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) => {
  nameValidator(name);
  emailValidator(email);
  passwordValidator(password);
  passwordConfirmationValidator(password, password_confirmation);
};
