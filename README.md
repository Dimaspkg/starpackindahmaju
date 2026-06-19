# 🌐 PT STARPACK INDAHMAJU - Official Web Portal

Situs web resmi dan sistem manajemen portal **PT STARPACK INDAHMAJU** (Spesialis UV Coating & Vacuum Metallizing Plastik). Sistem ini mencakup landing page multi-bahasa yang interaktif, halaman portofolio dinamis, formulir kontak terintegrasi, serta **Dashboard Admin Premium** untuk pengelolaan prospek (leads), logo mitra, dokumen brosur, dan pengaturan SMTP email.

---

## 🛠️ Tumpukan Teknologi (Technology Stack)

### Core Frontend & UI
* **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) dengan compiler **Turbopack** untuk performa build yang super cepat.
* **Library UI:** [React 19](https://react.dev/) (Server & Client Components).
* **Styling:** Vanilla CSS menggunakan **CSS Modules** (`*.module.css`) untuk modularitas gaya tanpa konflik class global.
* **Animasi:** CSS Transitions & Keyframes, diintegrasikan dengan komponen kustom scroll reveal untuk efek visual premium.

### Backend, Auth & Database
* **API Engine:** Next.js Route Handlers (RESTful API).
* **Database:** [MySQL](https://www.mysql.com/) menggunakan package `mysql2/promise` dengan sistem Connection Pooling.
* **Autentikasi:** [NextAuth.js](https://next-auth.js.org/) menggunakan JWT Session untuk melindungi rute dan data sensitif di Dashboard Admin.
* **Email Routing:** [Nodemailer](https://nodemailer.com/) untuk pengiriman notifikasi otomatis prospek masuk via SMTP cPanel/hPanel ke email pemasaran perusahaan.

---

## 📁 Struktur Folder Proyek (Folder Structure)

```bash
Starpack/
├── public/                     # Aset statis yang diakses langsung melalui root URL
│   ├── images/                 # Gambar produk, kategori industri, dan sertifikasi
│   │   └── portofolio/         # Gambar logo brand mitra portofolio (dibaca dinamis)
│   ├── uploads/                # Berkas unggahan dinamis (misal: logo admin, PDF brosur)
│   ├── .htaccess               # Aturan Apache untuk memaksa HTTPS dan redirect www ke non-www
│   ├── robots.txt              # Aturan crawler mesin pencari
│   └── sitemap.xml             # Peta situs web untuk SEO
│
├── src/                        # Direktori utama kode aplikasi
│   ├── app/                    # Next.js App Router (Halaman & API Routes)
│   │   ├── [lang]/             # Rute halaman dinamis berbasis Bahasa (ID, EN, ZH, JP)
│   │   │   ├── admin/          # Dasbor Admin (dashboard, leads, customers, settings, dll.)
│   │   │   ├── portfolio/      # Halaman portofolio utama
│   │   │   ├── login/          # Halaman masuk untuk admin
│   │   │   └── layout.tsx      # Tata letak dasar (HTML, Head, LanguageProvider)
│   │   │
│   │   └── api/                # Rute API Backend
│   │       ├── admin/          # API khusus Dashboard (Brochures, Customers, Leads, Settings)
│   │       ├── auth/           # Konfigurasi masuk & otorisasi NextAuth.js
│   │       ├── customers/      # API untuk mengambil logo di halaman utama
│   │       └── portfolio/      # API pembacaan berkas gambar portofolio secara otomatis
│   │
│   ├── components/             # Komponen React modular yang dapat digunakan kembali
│   │   ├── admin/              # Komponen khusus panel admin (AdminSidebar, dll.)
│   │   ├── Header.tsx          # Navigasi utama & Off-Canvas Mobile Drawer
│   │   ├── Footer.tsx          # Kaki halaman dengan SEO links & info kontak
│   │   ├── CustomersSection.tsx# Grid logo brand klien yang terhubung ke database
│   │   └── LocalizedLink.tsx   # Pembungkus Link Next.js untuk menjaga bahasa aktif tetap konsisten
│   │
│   ├── context/                # React Context Providers
│   │   └── LanguageContext.tsx # Manajemen state bahasa (i18n) global
│   │
│   ├── lib/                    # File konfigurasi library backend
│   │   ├── db.ts               # Inisialisasi pool koneksi database MySQL
│   │   ├── mail.ts             # Logika pengiriman email SMTP menggunakan Nodemailer
│   │   └── schema.sql          # Skema database MySQL untuk inisialisasi tabel pertama kali
│   │
│   ├── locales/                # Kamus lokalisasi bahasa (JSON format)
│   │   ├── id.json             # Bahasa Indonesia (Default)
│   │   ├── en.json             # Bahasa Inggris
│   │   ├── zh.json             # Bahasa Mandarin
│   │   └── jp.json             # Bahasa Jepang
│   │
│   └── proxy.ts                # Middleware kustom untuk deteksi i18n & proteksi Admin (Auth)
│
├── .env                        # Konfigurasi environment lokal (Database, SMTP, Auth Secret)
├── package.json                # Dependensi proyek & definisi scripts
├── server.js                   # Entrypoint kustom untuk deploy di server Phusion Passenger (cPanel/hPanel)
└── tsconfig.json               # Konfigurasi aturan compiler TypeScript
```

---

## 🚀 Instalasi & Jalankan Secara Lokal

### 1. Prasyarat
Pastikan Anda sudah menginstal **Node.js (versi minimal 18.x)** dan memiliki database **MySQL** yang berjalan aktif di komputer lokal Anda.

### 2. Kloning & Instal Dependensi
```bash
git clone https://github.com/Dimaspkg/starpackindahmaju.git
cd starpackindahmaju
npm install
```

### 3. Konfigurasi Environment (`.env`)
Buat berkas bernama `.env` di direktori utama proyek, lalu isikan konfigurasi berikut sesuai dengan server lokal Anda:
```env
NEXTAUTH_SECRET="buat_key_acak_bebas_disini"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

MYSQL_HOST="localhost"
MYSQL_USER="root"
MYSQL_PASSWORD="password_database_lokal"
MYSQL_DATABASE="starpack_db"

SMTP_HOST="smtp.mailtrap.io"
SMTP_PORT="2525"
SMTP_SECURE="false"
SMTP_USER="username_smtp_anda"
SMTP_PASS="password_smtp_anda"
SMTP_FROM="no-reply@starpack.co.id"
```

### 4. Setup Database
Impor berkas [src/lib/schema.sql](file:///Users/macbook/Desktop/WEB%20CODE/Starpack/src/lib/schema.sql) ke dalam database MySQL Anda untuk membuat tabel-tabel utama (`users`, `settings`, `leads`, `brochures`, `customer_logos`).

### 5. Jalankan Mode Pengembangan (Dev Server)
```bash
npm run dev
```
Buka browser Anda dan akses: **`http://localhost:3000`**

---

## 🔒 Akun Admin Default
Untuk mengakses Dasbor Admin di `/admin/dashboard`, gunakan kredensial bawaan berikut:
* **Username:** `admin`
* **Password:** `admin123`
*(Disarankan untuk langsung mengubah password di menu Settings setelah login pertama kali)*

---

## 🌐 Panduan Deployment di Hosting
Untuk panduan langkah-demi-langkah deploy di server produksi (seperti cPanel / hPanel menggunakan Phusion Passenger Node.js), silakan merujuk pada:
* 📄 **[tutorial.md](file:///Users/macbook/Desktop/WEB%20CODE/Starpack/tutorial.md)**: Panduan langkah deployment awal Node.js.
* 📄 **[panduan_perbaikan_domain.md](file:///Users/macbook/Desktop/WEB%20CODE/Starpack/panduan_perbaikan_domain.md)**: Panduan troubleshooting domain, SSL, dan redirect WWW ke non-WWW di Hostinger.
