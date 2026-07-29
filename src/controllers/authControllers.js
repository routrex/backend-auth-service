import { registerServices } from "../services/authServices.js";
import { registerValidation } from "../validations/authValidations.js";

export const registerControllers = (req, res) => {
  let data = [];
  req.on("data", (dataUsers) => {
    data.push(dataUsers);
  });

  req.on("end", async () => {
    const bufferData = Buffer.concat(data).toString();

    try {
      const parseData = JSON.parse(bufferData);
      const validationError = registerValidation(parseData);

      if (validationError) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: validationError.message }));
        return;
      }

      await registerServices(parseData);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Selamat Registrasi Berhasil, Silahkan login!",
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
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Format data JSON tidak valid!",
    }),
  );
};

export const logoutControllers = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Format data JSON tidak valid!",
    }),
  );
};
