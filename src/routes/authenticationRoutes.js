import {
  loginControllers,
  logoutControllers,
  registerControllers,
} from "../controllers/authenticationControllers.js";

const handleRoutes = (req, res) => {
  const url = req.url;

  switch (url) {
    case "/api/auth/register":
      registerControllers(req, res);
      break;
    case "/api/auth/login":
      loginControllers(req, res);
      break;
    case "/api/auth/logout":
      logoutControllers(req, res);
      break;
    default:
      console.log("Route tidak ditemukan!");
  }
};

export default handleRoutes;
