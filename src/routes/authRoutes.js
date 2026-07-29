import {
  loginControllers,
  logoutControllers,
  registerControllers,
} from "../controllers/authControllers.js";

const handleRoutes = (req, res) => {
  const url = req.url;

  switch (url) {
    case "/api/auth/register":
      if (req.method === "POST") {
        registerControllers(req, res);
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Tidak diizinkan");
      }
      break;
    case "/api/auth/login":
      if (req.method === "POST") {
        loginControllers(req, res);
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Tidak diizinkan");
      }
      break;
    case "/api/auth/logout":
      if (req.method === "POST") {
        logoutControllers(req, res);
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Tidak diizinkan");
      }
      break;
    default:
      res.writeHead(404, {"Content-Type": "text/plain" })
      res.end("Route tidak ditemukan!")
  }
};

export default handleRoutes;
