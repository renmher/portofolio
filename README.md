# Portofolio Digital - Renaldy Imran Hermawan

Aplikasi ini adalah platform portofolio digital pribadi interaktif yang dirancang untuk menampilkan kualifikasi profesional, proyek teknik, sertifikasi terverifikasi, serta pemetaan keahlian dari **Renaldy Imran Hermawan** sebagai **Junior DevOps & Cloud Engineer**.

---

## 🎯 Tujuan Aplikasi
1. **Representasi Profesional**: Menampilkan rekam jejak karir di bidang DevOps, Cloud Computing, dan IT Networking secara dinamis dan modern.
2. **Pemetaan Personal Branding**: Menyajikan keahlian utama, kekuatan inti, ketertarikan karir, dan nilai (values) yang dibawa secara visual dan berstruktur.
3. **Showcase Proyek Berkonsep Storytelling**: Menjelaskan penyelesaian masalah (problem-solving) pada proyek integrasi pipeline CI/CD yang aman dan implementasi stack monitoring/observabilitas.
4. **Asisten Virtual Interaktif**: Menyediakan fitur chatbot virtual asisten cerdas (RenBot) untuk menjawab pertanyaan rekruter seputar kualifikasi Renaldy secara otomatis dan responsif dalam dua bahasa (Indonesian/English).

---

## 🌐 Akses Web Live
Aplikasi ini sudah dideploy dan dapat diakses langsung secara online melalui tautan berikut:
👉 **[https://renaldyportofolio.vercel.app/](https://renaldyportofolio.vercel.app/)**

---

## 🛠️ Cara Membuka & Menjalankan Aplikasi Secara Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi di komputer lokal Anda:

### Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) (versi 18 ke atas disarankan) dan Git pada sistem Anda.

### Langkah-langkah
1. **Clone Repositori**
   Jalankan perintah ini di terminal untuk mengunduh kode sumber:
   ```bash
   git clone https://github.com/renmher/portofolio.git
   ```

2. **Masuk ke Direktori Proyek**
   ```bash
   cd portofolio
   ```

3. **Instal Dependensi**
   Unduh pustaka-pustaka React yang diperlukan:
   ```bash
   npm install
   ```

4. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

5. **Buka di Browser**
   Setelah server dev berjalan, buka peramban web Anda dan akses alamat berikut:
   👉 **`http://localhost:5173`**

---

## 📂 Struktur Direktori Utama
- `src/App.jsx`: Komponen utama yang mengatur terjemahan bahasa, state aplikasi, dan tata letak bagian portofolio (Branding, About, Projects, Reflection, Contact).
- `src/components/Certifications.jsx`: Komponen untuk menampilkan sertifikat terverifikasi (MTCNA, BNSP, AWS re/Start, dll.) menggunakan lightbox modal preview.
- `src/components/Chatbot.jsx`: Komponen chatbot asisten virtual interaktif (RenBot).
- `src/data/experiences.js`: Data jejak karir historis dan durasi kerja.
- `src/index.css`: Desain sistem CSS custom (variabel tema dark/light, glassmorphism, responsive grid).
- `public/`: Direktori aset publik (PDF sertifikat, mockup visual proyek, gambar profil, dan favicon).
