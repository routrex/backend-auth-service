import http from "node:http";
import { testDatabaseConnection } from "./src/config/dbConfig.js";
import handleRoutes from "./src/routes/authRoutes.js";

const port = process.env.PORT;

async function startServer() {
  try {
    await testDatabaseConnection();
    const server = http.createServer((req, res) => {
      const handleAuthRoutes = handleRoutes(req, res);

      if (handleAuthRoutes) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route tidak ditemukan" }));
      }
    });

    // Jalankan server
    server.listen(port, () => {
      console.log("Server running on port", port);
    });
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
}

startServer();
