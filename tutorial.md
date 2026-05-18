# 🚀 Panduan Lengkap Deploy Aplikasi Next.js di cPanel Hosting

Panduan ini memandu Anda langkah demi langkah untuk melakukan deploy aplikasi Next.js (App Router, MySQL, dan Email Routing) ke server cPanel Anda menggunakan fitur **Setup Node.js App** (Phusion Passenger).

---

## 📋 Prasyarat & Persiapan Kode
Semua file persiapan penting sudah dimasukkan ke dalam repositori utama:
1. **`server.js`**: Berkas entrypoint kustom yang memprogram Next.js agar berjalan di port dinamis cPanel Phusion Passenger.
2. **`.npmrc`**: Mengabaikan konflik dependensi opsional secara otomatis lewat konfigurasi `legacy-peer-deps=true` untuk kemudahan instalasi di server.

---

## 🛠️ Langkah-langkah Deployment di cPanel

### Langkah 1: Unggah Kode Aplikasi ke cPanel
Ada 2 metode utama untuk mengunggah file Anda. **Metode A (Git)** sangat direkomendasikan karena paling cepat dan bersih:

#### **Metode A: Menggunakan Git Version Control (Sangat Direkomendasikan)**
1. Masuk ke **cPanel** Anda, lalu cari dan buka menu **Git™ Version Control**.
2. Klik tombol **Create** di kanan atas.
3. Masukkan informasi berikut:
   * **Clone URL**: `https://github.com/Dimaspkg/starpackindahmaju.git`
   * **File Path**: Nama folder tempat proyek akan diletakkan (misal: `/home/username/starpack`). *Disarankan meletakkannya di luar `public_html` agar file sumber tidak bisa diakses publik secara mentah.*
   * **Repository Name**: `starpack`
4. Klik **Create**. cPanel akan mengkloning seluruh kode Anda dalam hitungan detik.

#### **Metode B: Menggunakan File Manager (ZIP Manual)**
1. Kompres seluruh folder kerja lokal Anda ke dalam format `.zip`.
   * **PENTING**: Jangan sertakan folder **`node_modules`** dan folder tersembunyi **`.next`** di dalam file `.zip` Anda agar ukuran file kecil dan tidak merusak instalasi server.
2. Masuk ke cPanel, buka **File Manager**, dan unggah file `.zip` tersebut ke direktori rumah Anda (misal: `/home/username/starpack`).
3. Ekstrak file zip tersebut di lokasi tersebut.

---

### Langkah 2: Buat Database MySQL & Impor Skema
Karena aplikasi Anda menggunakan MySQL untuk menyimpan data Leads, User Admin, dan Brosur:
1. Di cPanel, cari dan buka **MySQL® Database Wizard**.
2. **Langkah 1**: Buat Database baru (misal: `username_starpack_db`).
3. **Langkah 2**: Buat User Database baru beserta Kata Sandi yang aman (misal: `username_admin`).
4. **Langkah 3**: Centang **ALL PRIVILEGES** untuk memberikan izin penuh user tersebut ke database, lalu klik *Make Changes*.
5. Simpan nama database, username, dan password Anda untuk konfigurasi lingkungan nanti.
6. Kembali ke menu utama cPanel, buka **phpMyAdmin**.
7. Pilih database Anda di sebelah kiri, klik tab **Import** di bagian atas, pilih file `src/lib/schema.sql` dari folder proyek Anda, lalu klik **Go** untuk mengimpor tabel.

---

### Langkah 3: Konfigurasi Node.js App di cPanel
1. Cari dan buka menu **Setup Node.js App** di cPanel Anda.
2. Klik tombol **Create Application** di kanan atas.
3. Isi kolom konfigurasi sebagai berikut:
   * **Node.js version**: Pilih versi **20.x** atau **18.x**.
   * **Application Mode**: Pilih **Production**.
   * **Application root**: Path folder proyek Anda (misal: `starpack` jika diletakkan di `/home/username/starpack`).
   * **Application URL**: Pilih nama domain atau subdomain Anda (misal: `starpack.co.id` atau `admin.starpack.co.id`).
   * **Application startup file**: Ketik **`server.js`** *(ini sangat krusial agar Next.js berjalan lewat server.js kustom)*.
4. Klik tombol **Create** di kanan atas. Aplikasi Node.js Anda akan aktif namun masih dalam kondisi kosong.

---

### Langkah 4: Konfigurasi Environment Variables (`.env`)
Di halaman konfigurasi Node.js App yang sama, gulir ke bagian **Environment variables** untuk menambahkan semua konfigurasi rahasia dari berkas `.env.local` Anda.

Tambahkan variabel berikut satu per satu dengan mengklik **Add Variable**:
* `NEXTAUTH_SECRET` = *[Gunakan teks acak panjang]*
* `NEXTAUTH_URL` = `https://domainanda.com` *(Ganti dengan domain/subdomain produksi Anda)*
* `DB_HOST` = `localhost` *(Biasanya localhost untuk cPanel)*
* `DB_USER` = `username_admin_database_anda`
* `DB_PASSWORD` = `password_database_anda`
* `DB_NAME` = `username_starpack_db`
* `SMTP_HOST` = `mail.domainanda.com`
* `SMTP_PORT` = `465` (atau `587`)
* `SMTP_SECURE` = `true` (jika menggunakan SSL port 465)
* `SMTP_USER` = `notification@domainanda.com`
* `SMTP_PASS` = `password_email_smtp`
* `SMTP_FROM` = `notification@domainanda.com`

*Klik **Save** setelah selesai menginput semua variabel.*

---

### Langkah 5: Instalasi Dependensi & Proses Build
1. Di halaman **Setup Node.js App**, salin path virtual environment Node.js Anda yang muncul di bagian atas halaman. Contohnya terlihat seperti ini:
   ```bash
   source /home/username/nodevenv/starpack/20/bin/activate && cd /home/username/starpack
   ```
2. Hubungkan ke server hosting Anda menggunakan **SSH Terminal** (atau gunakan menu **Terminal** di dalam cPanel jika tersedia).
3. Jalankan perintah yang Anda salin tadi untuk masuk ke virtual environment Node.js.
4. Jalankan perintah instalasi dependensi:
   ```bash
   npm install
   ```
   *Berkat file `.npmrc` yang telah kita buat, perintah ini akan berjalan sukses tanpa ada konflik peer-dependency.*
5. Setelah instalasi selesai, lakukan kompilasi aplikasi Next.js ke versi produksi:
   ```bash
   npm run build
   ```
6. Kembali ke halaman cPanel **Setup Node.js App**, klik tombol **Restart Application** di bagian atas untuk memuat ulang server dengan versi produksi terbaru.

---

## 🎉 Selesai!
Buka domain/subdomain Anda di browser. Website PT. STARPACK INDAHMAJU Anda sekarang sudah berjalan dengan performa maksimal, database dinamis yang terhubung langsung, sistem email routing yang aman, serta fitur unduhan brosur, ekspor PDF, dan manajemen tambah user baru yang siap digunakan!

Anda bisa masuk ke dasbor admin menggunakan akun default bawaan Anda:
* **Username**: `admin`
* **Password**: `admin123`
*(Disarankan segera memperbarui kata sandi setelah login pertama kali di menu admin/settings).*
