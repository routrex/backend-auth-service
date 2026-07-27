import http from "node:http";
import { testDatabaseConnection } from "./src/config/dbConfig.js";


const port = process.env.PORT;

async function startServer() {
  try {
    await testDatabaseConnection();
    const server = http.createServer((req, res) => {
      // beri tau data apa yang diterima beserta status code nya
      res.writeHead(200, { "Content-Type": "text/plain" });
      // akhiri proses
      res.end("Hello Node Js");
    });

    // Jalankan server
    server.listen(port, () => {
      console.log("Server running on port", port);
    });
  } catch (err) {
    console.error("Failed to start application! :", err.message);
    process.exit(1);
  }
}

startServer();
