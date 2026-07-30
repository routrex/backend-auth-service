import {
  loginControllers,
  logoutControllers,
  registerControllers,
} from "../controllers/authControllers.js";
import verifyToken from "../middleware/authMiddleware.js";

const handleRoutes = (req, res) => {
  const url = req.url;

  if (req.method === "POST") {
    switch (url) {
      case "/api/auth/register":
        registerControllers(req, res);
        break;
      case "/api/auth/login":
        loginControllers(req, res);
        break;
      case "/api/auth/logout":
        verifyToken(req, res, () => {
          logoutControllers(req, res);
        });
        break;
      default:
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Route not found!",
          }),
        );
    }
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Method not allowed!",
      }),
    );
  }
};

export default handleRoutes;
