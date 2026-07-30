export const registerValidation = (data) => {
  const { full_name, email, password, confirm_password } = data;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!full_name || full_name.trim() === "") {
    return new Error("Name is required!");
  }

  if (!email || email.trim() === "") {
    return new Error("Email is required!");
  }

  if (!emailRegex.test(email)) {
    return new Error("Invalid email format!");
  }

  if (!password || password.trim() === "") {
    return new Error("Password is required!");
  }

  if (password.length < 6) {
    return new Error("Password must be at least 6 characters long!");
  }

  if (!confirm_password || confirm_password.trim() === "") {
    return new Error("Confirm password is required!");
  }

  if (password != confirm_password) {
    return new Error("Confirm password must match the password");
  }
};

export const loginValidation = (data) => {
  const { email, password } = data;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || email.trim() === "") {
    return new Error("Email is required!");
  }

  if (!emailRegex.test(email)) {
    return new Error("Invalid email format!");
  }

  if (!password || password.trim() === "") {
    return new Error("Password is required!");
  }
};
