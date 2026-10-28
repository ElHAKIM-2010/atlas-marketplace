# ATLAS

ATLAS adalah marketplace e-commerce tujuan umum. Tagline: **Everything You Need. One Destination.**

Dokumen ini menjelaskan cara menjalankan proyek **saat ini** (Milestone 3: homepage dan sistem desain). Fitur toko lengkap belum dibangun.

## Teknologi

- Frontend: Vue 3 (Composition API), Vite, Vue Router, Pinia, Tailwind CSS
- Backend: Python, Django, Django REST Framework
- Database: PostgreSQL (akan dikoneksikan di Milestone 4). Sementara itu Django memakai SQLite lokal agar server bisa dicek tanpa database Postgres.
- Git untuk versi kode

## Prasyarat (Windows)

Sudah terpasang di mesin ini saat inspeksi:

- Python 3.13 (perintah: `python`)
- Node.js dan npm
- Git
- PostgreSQL 18 (layanan berjalan; `psql` ada di `C:\Program Files\PostgreSQL\18\bin\psql.exe`)

Buka PowerShell di folder proyek:

```powershell
cd C:\atlas-marketplace
```

## Backend

1. Buat dan aktifkan virtual environment (folder paket Python khusus proyek ini):

```powershell
cd C:\atlas-marketplace\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Jika Windows menolak skrip aktivasi, jalankan sekali (hanya untuk sesi ini):

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

2. Pasang dependensi:

```powershell
python -m pip install -r requirements.txt
```

3. Salin file lingkungan:

```powershell
Copy-Item .env.example .env
```

4. Cek konfigurasi Django:

```powershell
python manage.py check
```

5. Jalankan server API (mode pengembangan, bukan produksi):

```powershell
python manage.py runserver
```

API kesehatan: [http://127.0.0.1:8000/api/health/](http://127.0.0.1:8000/api/health/)

Admin Django dan model produk belum dikonfigurasi. Migrasi PostgreSQL belum dijalankan.

## Frontend

Di PowerShell **baru** (biarkan backend tetap berjalan):

```powershell
cd C:\atlas-marketplace\frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Buka alamat yang dicetak Vite, biasanya [http://127.0.0.1:5173/](http://127.0.0.1:5173/).

Halaman awal ATLAS memakai sistem desain editorial: tipografi Source Sans 3 dan Source Serif 4, palet krem dan tinta, navigasi kategori bernomor, serta header yang hanya lengket di layar lebar.

Pratinjau katalog memakai data contoh di `frontend/public/data/sample-products.json`. Data diambil secara asinkron supaya keadaan memuat, gagal, dan kosong benar-benar berfungsi. Tidak ada harga atau foto produk, dan setiap baris diberi label "Contoh". Pencarian dan filter kategori disimpan di URL (`?q=`, `?kategori=`), jadi hasilnya bisa dimuat ulang atau dibagikan.

Halaman Masuk dan Keranjang masih berupa halaman "segera hadir". Tidak ada formulir palsu dan tidak ada transaksi.

## Variabel lingkungan

Jangan mengunggah file `.env` ke Git. File `.env.example` adalah contoh tanpa rahasia asli.

Backend (`backend/.env`):

- `SECRET_KEY`: kunci rahasia Django (hanya di server)
- `DEBUG`: `True` untuk komputer lokal
- `ALLOWED_HOSTS`: host yang diizinkan, misalnya `127.0.0.1,localhost`
- `CORS_ALLOWED_ORIGINS`: asal frontend, misalnya `http://127.0.0.1:5173,http://localhost:5173`
- `CSRF_TRUSTED_ORIGINS`: sama seperti asal frontend (untuk cookie nanti)
- `DATABASE_URL`: kosong dulu (SQLite). Postgres di Milestone 4.

Frontend (`frontend/.env`):

- `VITE_API_BASE_URL`: `http://127.0.0.1:8000/api`

Hanya variabel yang diawali `VITE_` yang bisa dibaca browser. Jangan taruh `SECRET_KEY` di frontend.

## Tes

Tes otomatis yang sudah ada:

- Backend: `python manage.py test` di folder `backend` (satu tes untuk endpoint `/api/health/`).

Pemeriksaan yang dipakai setiap milestone:

- `python manage.py check`
- `npm run build` di `frontend`
- Pemeriksaan manual di browser pada lebar 1440px dan 390px: pencarian, filter, keadaan memuat/gagal/kosong, serta menu mobile dengan keyboard.

Tes frontend otomatis belum ada.

## Deployment

Belum. Jangan anggap situs ini sudah publik.

## Milestone berikutnya

Milestone 4: menyambungkan PostgreSQL dan menyiapkan data produk di backend.
