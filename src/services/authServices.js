import bcryptjs from "bcryptjs";
import { createUser, findByEmail } from "../repository/users.js";

export const registerServices = async (data) => {
  const { full_name, email, password } = data;

  try {
    const existingUser = await findByEmail(email);
    if (existingUser) {
      throw new Error("Email sudah terdaftar!");
    }
    const saltRound = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRound);

    const user = {
      full_name,
      email,
      password: hashedPassword,
    };

    await createUser(user);
  } catch (err) {
    throw err;
  }
};
