import { loginServices, registerServices } from "../services/authServices.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/authValidations.js";

export const registerControllers = (req, res) => {
  let data = [];
  req.on("data", (dataUsers) => {
    data.push(dataUsers);
  });

  req.on("end", async () => {
    const bufferData = Buffer.concat(data).toString();

    try {
      const parseData = JSON.parse(bufferData);
      const validationRegistr = registerValidation(parseData);

      if (validationRegistr) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: validationRegistr.message }));
        return;
      }

      await registerServices(parseData);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Registration successful. Please log in!",
        }),
      );
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: err.message,
        }),
      );
    }
  });
};

export const loginControllers = (req, res) => {
  let data = [];

  req.on("data", (user) => {
    data.push(user);
  });

  req.on("end", async () => {
    const bufferData = Buffer.concat(data).toString();

    try {
      const parseData = JSON.parse(bufferData);
      const validationLogn = loginValidation(parseData);

      if (validationLogn) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: validationLogn.message }));
        return;
      }

      const userData = await loginServices(parseData);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Login successful, Welcome",
          data: userData,
        }),
      );
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: err.message,
        }),
      );
    }
  });
};

export const logoutControllers = (req, res) => {
  try {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Logout berhasil!",
      }),
    );
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Gagal Logout!",
      }),
    );
  }
};
