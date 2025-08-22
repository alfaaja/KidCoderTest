# KidCoderClub - Platform Belajar Coding untuk Anak

KidCoderClub adalah platform pembelajaran coding yang dirancang khusus untuk anak-anak dengan pendekatan yang menyenangkan dan interaktif.

## 🚀 Fitur Utama

### 🔐 Sistem Autentikasi
- **Login/Register** untuk 3 role: Admin, Student, dan Mentor
- **Form Register yang Lengkap** dengan field yang disesuaikan per role
- **Redirect otomatis** berdasarkan role setelah login

### 👨‍🎓 Form Register Murid (TK-SD)
Form register yang user-friendly untuk orang tua mendaftarkan anak mereka:

**Field Wajib:**
- Nama lengkap murid
- Tanggal lahir (untuk menentukan kelas sesuai umur)
- Kelas/jenjang (TK A, TK B, SD kelas 1-6)
- Nama orang tua/wali
- Email orang tua/wali
- Nomor HP orang tua/wali (untuk komunikasi via WA)
- Password akun

**Field Opsional:**
- Minat belajar (game, robotik, animasi, coding dasar)
- Alamat kota (untuk statistik/segmentasi)

### 👨‍🏫 Form Register Mentor
Form register yang detail untuk mentor yang akan mengajar:

**Field Wajib:**
- Nama lengkap
- Tanggal lahir
- Email
- Nomor HP
- Password akun
- Bidang keahlian (Scratch, Python, Robotics, Web, dll)
- Pengalaman mengajar/pengalaman coding

**Field Opsional:**
- Portfolio/link (LinkedIn, GitHub, personal site)
- Alamat kota
- Upload CV/sertifikat

### 🎯 Dashboard yang Disesuaikan
- **Student Dashboard**: Menampilkan informasi murid lengkap
- **Mentor Dashboard**: Menampilkan informasi mentor dan tombol ke dashboard mentor
- **Admin Dashboard**: Untuk manajemen platform

### 🔄 Routing Otomatis
- Student → `/dashboard` (UserDashboard)
- Mentor → `/mentor` (MentorApp)
- Admin → `/admin` (AdminDashboard)

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context
- **Routing**: React Router

## 📁 Struktur Project

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthFlow.tsx      # Flow autentikasi dengan role selection
│   │   └── AuthPage.tsx      # Form login/register yang lengkap
│   └── dashboard/
│       └── UserDashboard.tsx # Dashboard user dengan ProfileCard
├── contexts/
│   └── AuthContext.tsx       # Context untuk autentikasi
├── admin/                    # Dashboard admin
├── mentor/                   # Dashboard mentor
└── App.tsx                   # Routing utama
```

## 🎨 UI/UX Features

- **Responsive Design** untuk semua ukuran layar
- **Gradient Backgrounds** yang menarik dan modern
- **Card-based Layout** yang mudah dibaca
- **Icon Integration** untuk visual yang lebih baik
- **Form Validation** dengan error handling yang jelas
- **Loading States** untuk feedback user

## 🔒 Keamanan

- Validasi input yang ketat
- Password confirmation
- Role-based access control
- Secure routing

## 🚀 Cara Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka browser dan akses:
```
http://localhost:5173
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎯 Target User

- **Murid**: Anak-anak TK-SD (5-12 tahun)
- **Orang Tua**: Yang mendaftarkan anak mereka
- **Mentor**: Pengajar coding yang berpengalaman
- **Admin**: Pengelola platform

## 🌟 Keunggulan

1. **User Experience**: Form yang sederhana tapi lengkap
2. **Visual Appeal**: Design yang menarik untuk anak-anak
3. **Accessibility**: Mudah digunakan oleh orang tua
4. **Scalability**: Struktur yang mudah dikembangkan
5. **Security**: Validasi dan keamanan yang baik

## 🔮 Roadmap

- [ ] Integrasi dengan backend API
- [ ] Sistem pembayaran
- [ ] Video pembelajaran
- [ ] Progress tracking
- [ ] Gamification elements
- [ ] Mobile app

## 📞 Support

Untuk pertanyaan atau feedback, silakan hubungi tim development KidCoderClub.

---

**KidCoderClub** - Membuat coding menyenangkan untuk generasi masa depan! 🚀✨
