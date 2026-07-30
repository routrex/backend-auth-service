import bcryptjs, { hash } from "bcryptjs";
import { createUser, findByEmail } from "../repository/users.js";
import jwt from "jsonwebtoken";

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

export const loginServices = async (data) => {
  const { email, password } = data;

  try {
    const existingUserLogn = await findByEmail(email);

    if (!existingUserLogn) {
      throw new Error("Email tidak terdaftar !, Silahkan daftar dulu");
    }

    const isMatchPassword = await bcryptjs.compare(password, existingUserLogn.password);

    if (!isMatchPassword) {
      throw new Error("Password salah !, Masukan password dengan benar");
    }

    const tokenPayload = {
      id_user: existingUserLogn.id,
      full_name: existingUserLogn.full_name,
      email: existingUserLogn.email,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SCREET);

    return {
      token,
      user: tokenPayload,
    };
  } catch (err) {
    throw err;
  }
};
