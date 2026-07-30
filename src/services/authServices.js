import bcryptjs from "bcryptjs";
import { createUser, findByEmail } from "../repository/users.js";
import jwt from "jsonwebtoken";

export const registerServices = async (data) => {
  const { full_name, email, password } = data;

  const existingUser = await findByEmail(email);
  if (existingUser) {
    throw new Error("Email is already registered!");
  }
  const saltRound = 10;
  const hashedPassword = await bcryptjs.hash(password, saltRound);

  const user = {
    full_name,
    email,
    password: hashedPassword,
  };

  await createUser(user);
};

export const loginServices = async (data) => {
  const { email, password } = data;

  const existingUserLogn = await findByEmail(email);

  if (!existingUserLogn) {
    throw new Error("Email not registered. Please sign up first!");
  }

  const isMatchPassword = await bcryptjs.compare(
    password,
    existingUserLogn.password,
  );

  if (!isMatchPassword) {
    throw new Error("Incorrect password. Please enter the correct password!");
  }

  const tokenPayload = {
    id_user: existingUserLogn.id,
    full_name: existingUserLogn.full_name,
    email: existingUserLogn.email,
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token,
    user: tokenPayload,
  };
};
