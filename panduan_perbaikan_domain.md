# 🌐 Panduan Perbaikan Domain, SSL, dan Deployment (Hostinger hPanel)

Panduan ini berisi langkah-langkah lengkap untuk menyelesaikan masalah domain (`www` ke `non-www`), SSL yang mati pada versi `www`, serta halaman placeholder *"Coming Soon"* bawaan Hostinger.

---

## 📋 Ringkasan Masalah & Penyebab

1. **Halaman "Coming Soon" Muncul:**
   * **Penyebab:** Hostinger membuat berkas placeholder statis (seperti `default.html`) secara otomatis saat website dibuat. Berkas ini memiliki prioritas pembacaan lebih tinggi dibandingkan aplikasi Node.js/Next.js.
2. **Alamat `www.starpack.co.id` Tidak Masuk ke Next.js:**
   * **Penyebab:** Pada hPanel Hostinger, aplikasi Node.js umumnya hanya terikat (*bind*) ke satu host utama (`starpack.co.id`). Trafik dari `www` tidak diteruskan ke port Node.js, melainkan ditangani sebagai folder web statis biasa.
3. **SSL Mati di `www.starpack.co.id`:**
   * **Penyebab:** Sertifikat SSL Let's Encrypt diterbitkan sebelum DNS untuk `www` terhubung/diarahkan ke Hostinger. Akibatnya, sertifikat hanya mencakup `starpack.co.id` (non-www).

---

## 🛠️ Langkah-langkah Solusi Mandiri

### Langkah 1: Hapus Berkas Placeholder Hostinger
Agar aplikasi Next.js Anda dapat tampil dan diakses publik:
1. Masuk ke **hPanel Hostinger** Anda.
2. Buka menu **File Manager** untuk website `starpack.co.id`.
3. Masuk ke dalam direktori **`public_html`**.
4. Cari berkas bernama **`default.html`** atau **`index.html` bawaan Hostinger**.
5. **Hapus (Delete)** berkas tersebut. 
6. Jika perlu, buka menu **Node.js Dashboard** di hPanel Anda dan lakukan **Restart Application**.

---

### Langkah 2: Buat Pengalihan (Redirect) WWW ke Non-WWW
Untuk memastikan semua trafik masuk secara seragam ke `https://starpack.co.id`, buat pengalihan langsung melalui server Hostinger:

#### Opsi A: Melalui Menu Pengalihan hPanel (Paling Mudah)
1. Di **hPanel Hostinger**, buka menu **Pengalihan (Redirects)**.
2. Buat pengalihan baru dengan konfigurasi:
   * **Alihkan Dari (Redirect from):** Pilih domain **`www.starpack.co.id`**.
   * **Jenis (Type):** Pilih **Permanen (301)**.
   * **Alihkan Ke (Redirect to):** Masukkan URL lengkap: **`https://starpack.co.id`**
3. Klik **Buat (Create)**.

#### Opsi B: Melalui Registrar Domain (Jika Domain Dibeli di Luar Hostinger)
1. Masuk ke dasbor registrar tempat Anda membeli domain.
2. Buka menu **DNS Management** ➡️ **URL Forwarding** / **URL Redirect**.
3. Arahkan host/source `www` ke URL tujuan `https://starpack.co.id` dengan tipe **301 (Permanent)**.
4. *Pastikan juga A Record untuk `www` di pengaturan DNS registrar Anda sudah mengarah ke IP Hostinger yang sama dengan domain utama.*

---

### Langkah 3: Instal Ulang SSL di hPanel Hostinger
Setelah DNS `www` dipastikan sudah tersambung dan mengarah ke IP Hostinger:
1. Masuk ke **hPanel Hostinger** ➡️ **Keamanan (Security)** ➡️ **SSL**.
2. Di sebelah SSL yang saat ini aktif, klik tombol **titik tiga (⋮)** lalu pilih **Instal Ulang (Reinstall)** atau **Hapus (Uninstall)** terlebih dahulu.
3. Klik **Instal SSL (Install SSL)** kembali untuk domain `starpack.co.id`. Let's Encrypt akan mendeteksi domain utama dan subdomain `www` yang sekarang sudah aktif, lalu menerbitkan sertifikat SSL gabungan yang mencakup kedua alamat tersebut.
4. Pastikan toggle **Paksa HTTPS (Force HTTPS)** di halaman SSL tersebut dalam keadaan **Aktif (ON)**.

---

## 🔒 Konfigurasi Tambahan yang Telah Kami Terapkan di Kode

Kami telah mengunggah perbaikan tingkat kode Next.js & Server untuk membantu menjaga kestabilan ini:
1. **Redirection di Middleware (`src/proxy.ts`):**
   Kami telah menyisipkan kode deteksi di tingkat Next.js Middleware untuk memotong request `www` dan mengalihkannya secara aman menggunakan 301 Redirect ke domain utama jika request tersebut lolos melewati web server Hostinger.
2. **Konfigurasi `.htaccess` (`public/.htaccess`):**
   Kami telah menaruh template `.htaccess` di folder `public/` agar saat di-build, berkas tersebut disalin ke server untuk memaksa pengalihan HTTPS dan WWW secara instan di tingkat web server Apache Hostinger.
