# Authentication API

Backend Basic Authentication API untuk menangani proses registrasi, login, logout, dan autentikasi pengguna.

Project ini dibuat menggunakan Node.js Native HTTP Module tanpa menggunakan framework backend seperti Express.js

## Fitur

* Registrasi pengguna
* Login pengguna
* Logout pengguna

## Autentikasi & Keamanan

* Password hashing menggunakan `bcryptjs`
* Autentikasi berbasis JSON Web Token (JWT)
* JWT token memiliki masa berlaku selama 1 jam
* Middleware untuk memverifikasi JWT token
* Akses endpoint yang dilindungi menggunakan Bearer Token
* Password tidak disimpan dalam bentuk plain text

## Tech Stack

* Node.js v24
* Native HTTP Module (`node:http`)
* MySQL

## Libraries

* `mysql2` — Menghubungkan aplikasi Node.js dengan database MySQL
* `bcryptjs` — Melakukan hashing dan perbandingan password
* `jsonwebtoken` — Membuat dan memverifikasi JWT token
* `dotenv` — Mengelola environment variable

## Development & Testing Tools

* Laragon — Menjalankan MySQL pada lingkungan development lokal
* `nodemon` — Menjalankan ulang server secara otomatis ketika terjadi perubahan code
* Postman — Melakukan pengujian endpoint API

## Instalasi & Konfigurasi

### Prasyarat

Pastikan perangkat telah terinstal:

* Node.js v24
* npm
* Laragon
* Postman

> Project ini dikembangkan dan diuji menggunakan Node.js v24 serta MySQL yang dijalankan melalui Laragon.

### 1. Clone Repository

Clone repository ini ke komputer lokal:

```bash id="k7m0qu"
git clone <repository-url>
```

### 2. Masuk ke Direktori Project

```bash id="m2cd6r"
cd <Authentication-API>
```

### 3. Install Dependencies

Install seluruh package yang dibutuhkan:

```bash id="iopw8g"
npm install
```

### 4. Jalankan MySQL melalui Laragon

Buka aplikasi Laragon, kemudian jalankan service MySQL.

Pastikan service MySQL sudah aktif sebelum menjalankan aplikasi Node.js.

### 5. Konfigurasi Database

Buat database MySQL dengan nama:

```sql id="vljubg"
CREATE DATABASE authentication;
```

Kemudian gunakan database tersebut:

```sql id="3cliwv"
USE authentication;
```

Buat tabel `users`:

```sql id="q4tnzq"
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  confirm_password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6. Konfigurasi Environment Variables

Buat file `.env` pada root directory project.

Tambahkan environment variable berikut:

```env id="96omzz"
PORT=3000

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=authentication

JWT_SECRET=your_jwt_secret_key
```

Sesuaikan nilai environment variable dengan konfigurasi MySQL yang digunakan.


### 7. Jalankan Aplikasi

Jalankan aplikasi dalam mode development:

```bash id="t2hytj"
npm run dev
```

Jika server dan database berhasil terhubung, terminal akan menampilkan informasi bahwa database telah terhubung dan server sedang berjalan.

Server dapat diakses melalui:

```text id="qct6l2"
http://localhost:3000
```

## API Endpoints

Base URL:

```text id="6r0f9g"
http://localhost:3000
```

### 1. Registrasi Pengguna

**Endpoint**

```http id="6f5g8f"
POST /api/auth/register
```

**Request Body**

```json id="a6y8bo"
{
  "full_name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "confirm_password": "password123"
}
```

**Response Berhasil**

Status Code: `201 Created`

```json id="h8pd41"
{
  "message": "Registration successful. Please log in!"
}
```

### 2. Login Pengguna

**Endpoint**

```http id="1h68vc"
POST /api/auth/login
```

**Request Body**

```json id="c7a0f9"
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response Berhasil**

Status Code: `200 OK`

```json id="0rw0rt"
{
  "message": "Login successful, Welcome",
  "data": {
    "token": "<jwt-token>",
    "user": {
      "id_user": 1,
      "full_name": "John Doe",
      "email": "johndoe@example.com"
    }
  }
}
```

Simpan JWT token yang diterima dari proses login untuk digunakan pada endpoint yang membutuhkan autentikasi.

### 3. Logout Pengguna

**Endpoint**

```http id="plg7y6"
POST /api/auth/logout
```

Endpoint ini membutuhkan JWT token yang masih valid.

**Request Header**

```http id="b3rn56"
Authorization: Bearer <jwt-token>
```

**Response Berhasil**

Status Code: `200 OK`

```json id="tf7o0u"
{
  "message": "Logout successful!"
}
```

## Alur Autentikasi

```text id="ggrltt"
Registrasi Pengguna
        ↓
Data registrasi divalidasi
        ↓
Password di-hash menggunakan bcryptjs
        ↓
Data pengguna disimpan ke MySQL
        ↓
Login Pengguna
        ↓
Email dan password diverifikasi
        ↓
JWT token dibuat
        ↓
JWT token dikirim kepada client
        ↓
Client mengirimkan token melalui Authorization Header
        ↓
Middleware memverifikasi JWT token
        ↓
Client dapat mengakses endpoint yang dilindungi
```

## Struktur Project

```text id="p9hj1x"
.
├── src/
│   ├── config/
│   │   └── dbConfig.js
│   ├── controllers/
│   │   └── authControllers.js
│   ├── helpers/
│   │   └── dotenv.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── repository/
│   │   └── users.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── services/
│   │   └── authServices.js
│   └── validations/
│       └── authValidation.js
├── .env
├── app.js
├── package.json
└── README.md
```

## Catatan

* JWT token memiliki masa berlaku selama 1 jam.
* Password disimpan dalam bentuk hash dan tidak disimpan sebagai plain text.
* Endpoint logout membutuhkan JWT token yang valid.
* Project ini menggunakan Node.js Native HTTP Module dan tidak menggunakan framework backend seperti Express.js.
* MySQL dijalankan menggunakan Laragon pada lingkungan development lokal.
* Project ini dikembangkan dan diuji menggunakan Node.js v24.

## Pengembangan Selanjutnya

Beberapa fitur yang dapat ditambahkan pada pengembangan berikutnya:

* Forgot password
* Reset password
* Email verification
* Refresh token
* Role-based authorization

