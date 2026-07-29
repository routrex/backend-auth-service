import { connectMysql } from "../config/dbConfig.js";

export const findByEmail = async (email) => {
  try {
    const query =
      "SELECT full_name, email, password FROM users WHERE email = ?";
    const values = [email];
    const [result] = await connectMysql.execute(query, values);

    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

export const createUser = async (user) => {
  const { full_name, email, password } = user;
  try {
    const query =
      "INSERT INTO users(full_name, email, password) values(?, ?, ?)";
    const values = [full_name, email, password];
    const [result] = await connectMysql.execute(query, values);
    return result;
  } catch (err) {
    throw err;
  }
};
