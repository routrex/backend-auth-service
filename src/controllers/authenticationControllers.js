export const registerControllers = (req, res) => {
  if (req.method === "POST") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Selamat datang ini halaman register");
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Tidak diizinkan");
  }
};

export const loginControllers = (req, res) => {
  if (req.method === "POST") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Selamat datang ini halaman login");
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method tidak diizinkan");
  }
};

export const logoutControllers = (req, res) => {
  if (req.method === "POST") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Logout Success");
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method tidak diizinkan");
  }
};