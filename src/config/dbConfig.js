import mysql2 from "mysql2/promise";
import dotenvJs from "../helpers/dotenv.js";

dotenvJs()

export const connectMysql = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

export const testDatabaseConnection = async () => {
  try {
    const connection = await connectMysql.getConnection();
    console.log("Database connected successfully");
    connection.release();
  } catch (err)    {
    throw new Error(err.message);
  }
};
