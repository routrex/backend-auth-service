export const registerValidation = (data) => {
  const { full_name, email, password, confirm_password } = data;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!full_name || full_name.trim() === "") {
    return new Error("Nama wajib diisi!");
  }

  if (!email || email.trim() === "") {
    return new Error("Email wajib diisi!");
  }

  if (!emailRegex.test(email)) {
    return new Error("Format email tidak valid!");
  }

  if (!password || password.trim() === "") {
    return new Error("Password wajib diisi!");
  }

  if (password.length < 6) {
    return new Error("Password minimal harus 6 karakter!");
  }

  if (!confirm_password || confirm_password.trim() === "") {
    return new Error("Confirm password wajib diisi!");
  }

  if (password != confirm_password) {
    return new Error("Confirm password harus sama dengan password");
  }
};
